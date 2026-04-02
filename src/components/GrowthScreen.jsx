import React, { useState, useEffect, useRef, useMemo } from 'react';
import './GrowthScreen.css';
import { generateSkillTree } from '../data/skillTreeData';

const GrowthScreen = () => {
  const [nodesData, setNodesData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);
  
  const [unlockedNodes, setUnlockedNodes] = useState(new Set(['start']));
  const [skillPoints, setSkillPoints] = useState(5); // Start with some points for demo
  
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  
  const selectedNode = selectedNodeId ? nodesData.find(n => n.id === selectedNodeId) : null;
  const containerRef = useRef(null);
  const lastPanPos = useRef({ x: 0, y: 0 });

  // Initialize Data
  useEffect(() => {
    const { nodes, connections } = generateSkillTree();
    setNodesData(nodes);
    setConnectionsData(connections);
  }, []);

  // Panning & Zooming Handlers
  const handlePointerDown = (e) => {
    // Only pan on left click or touch, and not if clicking a node (event bubbling handled in node onClick)
    if (e.target.closest('.skill-node') || e.target.closest('.node-detail-panel')) return;
    setIsPanning(true);
    lastPanPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isPanning) return;
    const dx = e.clientX - lastPanPos.current.x;
    const dy = e.clientY - lastPanPos.current.y;
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPanPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e) => {
    // Determine zoom change based on wheel delta
    const zoomSensitivity = 0.001;
    let delta = -e.deltaY * zoomSensitivity;
    
    setZoom(prevZoom => {
      let newZoom = prevZoom + delta;
      // Clamp zoom
      if (newZoom < 0.1) newZoom = 0.1;
      if (newZoom > 2.5) newZoom = 2.5;
      return newZoom;
    });
  };

  // Helper to find unlockable status
  const canUnlock = (nodeId) => {
    if (unlockedNodes.has(nodeId)) return false;
    // Check if connected to an already unlocked node
    const isAdjacent = connectionsData.some(c => 
      (c.from === nodeId && unlockedNodes.has(c.to)) || 
      (c.to === nodeId && unlockedNodes.has(c.from))
    );
    return isAdjacent && skillPoints > 0;
  };

  const isConnectedToUnlocked = (nodeId) => {
    return connectionsData.some(c => 
        (c.from === nodeId && unlockedNodes.has(c.to)) || 
        (c.to === nodeId && unlockedNodes.has(c.from))
      );
  }

  const handleNodeClick = (e, nodeId) => {
    e.stopPropagation(); // prevent panning
    setSelectedNodeId(nodeId);
  };

  const handleUnlock = () => {
    if (selectedNodeId && canUnlock(selectedNodeId)) {
      setUnlockedNodes(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedNodeId);
        return newSet;
      });
      setSkillPoints(prev => prev - 1);
    }
  };

  return (
    <div 
      className="growth-screen-container"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
    >
      <div className="growth-header">
        <div className="skill-points">
          <span className="point-label">Skill Points</span>
          <span className="point-value">{skillPoints}</span>
        </div>
      </div>

      <div 
        className="tree-canvas"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
        }}
      >
        <svg className="tree-connections">
          {connectionsData.map((conn, idx) => {
            const fromNode = nodesData.find(n => n.id === conn.from);
            const toNode = nodesData.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isUnlocked = unlockedNodes.has(conn.from) && unlockedNodes.has(conn.to);
            const isPathToLocked = (unlockedNodes.has(conn.from) && !unlockedNodes.has(conn.to)) ||
                                   (!unlockedNodes.has(conn.from) && unlockedNodes.has(conn.to));

            let className = "connection-line";
            if (isUnlocked) className += " unlocked";
            else if (isPathToLocked) className += " unlocked path-to-locked";

            return (
              <line 
                key={`${conn.from}-${conn.to}-${idx}`}
                x1={fromNode.x} 
                y1={fromNode.y} 
                x2={toNode.x} 
                y2={toNode.y}
                className={className}
              />
            );
          })}
        </svg>

        <div className="tree-nodes">
          {nodesData.map(node => {
            const isUnlocked = unlockedNodes.has(node.id);
            const unlockable = canUnlock(node.id);
            
            let className = `skill-node node-${node.type}`;
            if (isUnlocked) className += ' unlocked';
            else if (unlockable) className += ' can-unlock';
            if (selectedNodeId === node.id) className += ' selected';

            return (
              <div 
                key={node.id}
                className={className}
                style={{ left: node.x, top: node.y }}
                onClick={(e) => handleNodeClick(e, node.id)}
                title={node.label}
              >
                {/* Node icon or content handled in CSS */}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`node-detail-panel ${selectedNode ? 'visible' : ''}`} onPointerDown={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={() => setSelectedNodeId(null)}>×</button>
        {selectedNode && (
          <>
            <div className="detail-header">
              <h3>{selectedNode.label}</h3>
              <span className="detail-type">{selectedNode.type} Node</span>
            </div>
            <p className="detail-desc">"{selectedNode.description}"</p>
            <div className="detail-stat">{selectedNode.stat}</div>
            
            <div className="detail-actions">
              {unlockedNodes.has(selectedNode.id) ? (
                <button className="action-btn btn-locked" disabled>Allocated</button>
              ) : canUnlock(selectedNode.id) ? (
                <button className="action-btn btn-unlock" onClick={handleUnlock}>
                  Allocate (-1 Point)
                </button>
              ) : isConnectedToUnlocked(selectedNode.id) && skillPoints === 0 ? (
                <button className="action-btn btn-locked" disabled>Not Enough Points</button>
              ) : (
                <button className="action-btn btn-locked" disabled>Not Connected to Tree</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GrowthScreen;
