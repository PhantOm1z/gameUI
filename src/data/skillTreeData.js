// Procedural generation of a massive skill tree

const NUM_BRANCHES = 6;
const CLUSTERS_PER_BRANCH = 4;
const NODES_PER_CLUSTER = 8;
const RADIUS_STEP = 600;

export const generateSkillTree = () => {
  const nodes = [];
  const connections = [];

  // Start Node
  nodes.push({
    id: 'start',
    x: 0,
    y: 0,
    type: 'start', // 'start', 'minor', 'notable', 'keystone'
    label: 'Awakening',
    description: 'Begin your journey.',
    stat: '+10 All Attributes',
    cost: 0,
  });

  const clusterCenters = [];

  for (let branch = 0; branch < NUM_BRANCHES; branch++) {
    const angle = (branch * 2 * Math.PI) / NUM_BRANCHES;
    let prevClusterCenterNodeId = 'start';

    for (let c = 1; c <= CLUSTERS_PER_BRANCH; c++) {
      const dist = c * RADIUS_STEP;
      const waveOffset = (c % 2 === 0 ? 1 : -1) * 200; // Zigzag slightly
      
      const cx = Math.cos(angle + (waveOffset/dist)) * dist;
      const cy = Math.sin(angle + (waveOffset/dist)) * dist;

      const clusterHeadId = `b${branch}-c${c}-head`;
      
      // The Notable or Keystone at the center of the cluster
      const isKeystone = c === CLUSTERS_PER_BRANCH;
      nodes.push({
        id: clusterHeadId,
        x: cx,
        y: cy,
        type: isKeystone ? 'keystone' : 'notable',
        label: isKeystone ? `Ascension ${branch}` : `Mastery ${branch}-${c}`,
        description: isKeystone ? 'A massive shift in power.' : 'A significant boost.',
        stat: isKeystone ? 'Special Unique Effect' : '+20 Primary Stat',
        cost: 1,
      });

      // Connect to previous cluster center (or start)
      connections.push({ from: prevClusterCenterNodeId, to: clusterHeadId });
      
      // Generate minor nodes around this cluster head
      const clusterNodeIds = [];
      for (let n = 0; n < NODES_PER_CLUSTER; n++) {
        const nAngle = (n * 2 * Math.PI) / NODES_PER_CLUSTER;
        const nDist = 180; // Distance from cluster center
        
        const nx = cx + Math.cos(nAngle) * nDist;
        const ny = cy + Math.sin(nAngle) * nDist;

        const minorId = `b${branch}-c${c}-n${n}`;
        nodes.push({
          id: minorId,
          x: nx,
          y: ny,
          type: 'minor',
          label: 'Minor Node',
          description: 'A small boost.',
          stat: '+5 Stat',
          cost: 1,
        });

        clusterNodeIds.push(minorId);
        
        // Connect minor to cluster head
        connections.push({ from: clusterHeadId, to: minorId });

        // Connect minor to adjacent minor to form a ring
        if (n > 0) {
            connections.push({ from: `b${branch}-c${c}-n${n - 1}`, to: minorId });
        }
      }
      // Close the ring
      connections.push({ from: clusterNodeIds[clusterNodeIds.length - 1], to: clusterNodeIds[0] });

      prevClusterCenterNodeId = clusterHeadId;
    }
  }

  return { nodes, connections };
};
