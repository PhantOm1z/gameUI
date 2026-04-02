// Procedural generation of a massive, highly symmetrical skill tree

const NUM_BRANCHES = 12; // Doubled from 6 to 12 main branches
const CLUSTERS_PER_BRANCH = 5; // Added more clusters per branch
const NODES_PER_CLUSTER = 10; // Increased minor nodes per cluster
const RADIUS_STEP = 320; // Tighter rings, originally 600

export const generateSkillTree = () => {
  const nodes = [];
  const connections = [];

  // Start Node
  nodes.push({
    id: 'start',
    x: 0,
    y: 0,
    type: 'start',
    label: 'Awakening',
    description: 'Begin your journey.',
    stat: '+10 All Attributes',
    cost: 0,
  });

  // INNER RING (12 nodes around the start forming a central hub)
  const innerRing = [];
  for(let i = 0; i < NUM_BRANCHES; i++) {
     const iAngle = (i * 2 * Math.PI) / NUM_BRANCHES;
     const idist = 180;
     const ix = Math.cos(iAngle) * idist;
     const iy = Math.sin(iAngle) * idist;
     const iId = `inner-${i}`;
     
     nodes.push({
         id: iId,
         x: ix,
         y: iy,
         type: 'minor',
         label: `Central Path ${i+1}`,
         description: 'Choose your early calling.',
         stat: '+5 Stat',
         cost: 1
     });
     innerRing.push(iId);
     connections.push({ from: 'start', to: iId });
     
     // Connect inner ring to itself to form a perfect circle
     if(i > 0) {
         connections.push({ from: innerRing[i-1], to: iId });
     }
  }
  connections.push({ from: innerRing[NUM_BRANCHES-1], to: innerRing[0] }); // close inner ring

  // MAJOR TIERED BRANCHES
  for (let branch = 0; branch < NUM_BRANCHES; branch++) {
    const angle = (branch * 2 * Math.PI) / NUM_BRANCHES;
    let prevClusterCenterNodeId = innerRing[branch]; // Start branch from corresponding inner ring node

    for (let c = 1; c <= CLUSTERS_PER_BRANCH; c++) {
      // The distance radiates outward symmetrically
      const dist = c * RADIUS_STEP + 180; 
      
      const cx = Math.cos(angle) * dist;
      const cy = Math.sin(angle) * dist;

      const clusterHeadId = `b${branch}-c${c}-head`;
      
      // The Notable or Keystone at the center of the cluster
      const isKeystone = c === CLUSTERS_PER_BRANCH;
      nodes.push({
        id: clusterHeadId,
        x: cx,
        y: cy,
        type: isKeystone ? 'keystone' : 'notable',
        label: isKeystone ? `Divine Ascension ${branch}` : `Mastery Matrix ${branch}-${c}`,
        description: isKeystone ? 'A massive shift in power.' : 'A significant stat boost.',
        stat: isKeystone ? 'Special Unique Effect' : '+20 Primary Stat',
        cost: 1,
      });

      // Connect to previous cluster center (or parent ring node)
      connections.push({ from: prevClusterCenterNodeId, to: clusterHeadId });
      
      // Cross-connect clusters in the same ring layer with bridge nodes filling the space
      if (branch > 0) {
        const prevBranchAngle = ((branch - 1) * 2 * Math.PI) / NUM_BRANCHES;
        const currentBranchAngle = angle;
        
        let prevNodeId = `b${branch-1}-c${c}-head`;
        const numBridgeNodes = c * 2; // Increases as radius increases (2, 4, 6, 8...)
        
        for (let b = 1; b <= numBridgeNodes; b++) {
          const t = b / (numBridgeNodes + 1);
          const bridgeAngle = prevBranchAngle + (currentBranchAngle - prevBranchAngle) * t;
          const bridgeX = Math.cos(bridgeAngle) * dist;
          const bridgeY = Math.sin(bridgeAngle) * dist;
          
          const shapes = ['minor', 'minor-square', 'minor-triangle'];
          const nodeType = (c >= CLUSTERS_PER_BRANCH - 1) ? shapes[b % 3] : 'minor';

          const bridgeId = `bridge-b${branch}-c${c}-n${b}`;
          nodes.push({
            id: bridgeId,
            x: bridgeX,
            y: bridgeY,
            type: nodeType,
            label: 'Void Pathway',
            description: 'Connecting pathways spanning the void.',
            stat: '+2 Stat',
            cost: 1
          });
          
          connections.push({ from: prevNodeId, to: bridgeId });
          prevNodeId = bridgeId;
        }
        connections.push({ from: prevNodeId, to: clusterHeadId });
      }
      
      // Generate minor nodes surrounding this cluster head
      const clusterNodeIds = [];
      const isOuter = c >= CLUSTERS_PER_BRANCH - 1;
      const polyK = isOuter ? ((branch + c) % 2 === 0 ? 4 : 3) : 0; // 4=square layout, 3=triangle layout, 0=circle layout

      for (let n = 0; n < NODES_PER_CLUSTER; n++) {
        // Compute angle relative to the cluster head
        const localTheta = (n * 2 * Math.PI) / NODES_PER_CLUSTER;
        const nAngle = angle + localTheta;
        let finalDist = 110; // Default circle radius
        
        if (polyK > 0) {
            // Polar polygon formula to trace squares and triangles natively
            const segment = (2 * Math.PI) / polyK;
            const modTheta = (localTheta + Math.PI/polyK) % segment;
            const baseR = 150; // Slightly larger to fit 10 nodes cleanly on edges
            finalDist = (baseR * Math.cos(Math.PI / polyK)) / Math.cos(modTheta - Math.PI / polyK);
        }
        
        const nx = cx + Math.cos(nAngle) * finalDist;
        const ny = cy + Math.sin(nAngle) * finalDist;

        // Match the node HTML shape to the cluster structural shape
        let nodeType = 'minor';
        if (polyK === 4) nodeType = 'minor-square';
        if (polyK === 3) nodeType = 'minor-triangle';

        const minorId = `b${branch}-c${c}-n${n}`;
        nodes.push({
          id: minorId,
          x: nx,
          y: ny,
          type: nodeType,
          label: polyK > 0 ? 'Geometric Node' : 'Skill Node',
          description: 'A small boost.',
          stat: '+5 Stat',
          cost: 1,
        });

        clusterNodeIds.push(minorId);
        
        // Connect minor node to cluster head (hub and spoke)
        connections.push({ from: clusterHeadId, to: minorId });

        // Connect minor to adjacent minor to form a continuous ring
        if (n > 0) {
            connections.push({ from: clusterNodeIds[n - 1], to: minorId });
        }
      }
      // Close the minor ring loop
      connections.push({ from: clusterNodeIds[clusterNodeIds.length - 1], to: clusterNodeIds[0] });

      // Update pointer for the next layer
      prevClusterCenterNodeId = clusterHeadId;
    }
  }

  // Close the outermost concentric branch layer connections (tie branch n back to branch 0)
  for (let c = 1; c <= CLUSTERS_PER_BRANCH; c++) {
    const prevBranchAngle = ((NUM_BRANCHES - 1) * 2 * Math.PI) / NUM_BRANCHES;
    const currentBranchAngle = 2 * Math.PI;
    const dist = c * RADIUS_STEP + 180;

    let prevNodeId = `b${NUM_BRANCHES-1}-c${c}-head`;
    const numBridgeNodes = c * 2;
    
    for (let b = 1; b <= numBridgeNodes; b++) {
      const t = b / (numBridgeNodes + 1);
      const bridgeAngle = prevBranchAngle + (currentBranchAngle - prevBranchAngle) * t;
      const bridgeX = Math.cos(bridgeAngle) * dist;
      const bridgeY = Math.sin(bridgeAngle) * dist;
      
      const shapes = ['minor', 'minor-square', 'minor-triangle'];
      const nodeType = (c >= CLUSTERS_PER_BRANCH - 1) ? shapes[b % 3] : 'minor';

      const bridgeId = `bridge-b0-c${c}-n${b}`;
      nodes.push({
        id: bridgeId,
        x: bridgeX,
        y: bridgeY,
        type: nodeType,
        label: 'Void Pathway',
        description: 'Connecting pathways spanning the void.',
        stat: '+2 Stat',
        cost: 1
      });
      
      connections.push({ from: prevNodeId, to: bridgeId });
      prevNodeId = bridgeId;
    }
    connections.push({ from: prevNodeId, to: `b0-c${c}-head` });
  }

  return { nodes, connections };
};
