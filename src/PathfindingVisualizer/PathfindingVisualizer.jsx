import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { astar } from '../algorithms/astar';
import { greedyBestFirst } from '../algorithms/greedyBestFirst';
import './PathfindingVisualizer.css';
import AlgorithmInfoSidebar from './AlgorithmInfoSidebar';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathfindingVisualizer = () => {
    const navigate = useNavigate();
    const [grid, setGrid] = useState([]);
    const [gridB, setGridB] = useState([]); // Second grid for comparison
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
    const [secondAlgorithm, setSecondAlgorithm] = useState('bfs'); // Default second algo
    const [isRunning, setIsRunning] = useState(false);
    const [isComparisonMode, setIsComparisonMode] = useState(false);
    const [speed, setSpeed] = useState(10); // Default speed (ms delay)

    const [stats, setStats] = useState({
        visitedNodes: 0,
        pathLength: 0,
        timeTaken: 0,
        cost: 0,
        efficiency: 0,
    });

    const [statsB, setStatsB] = useState({
        visitedNodes: 0,
        pathLength: 0,
        timeTaken: 0,
        cost: 0,
        efficiency: 0,
    });

    useEffect(() => {
        const initialGrid = getInitialGrid();
        setGrid(initialGrid);
        setGridB(getInitialGrid()); // Initialize second grid
    }, []);

    // Sync walls between grids
    const handleMouseDown = (row, col) => {
        if (isRunning) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);

        // Always sync walls to gridB
        const newGridB = getNewGridWithWallToggled(gridB, row, col);
        setGridB(newGridB);

        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row, col) => {
        if (isRunning || !mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);

        const newGridB = getNewGridWithWallToggled(gridB, row, col);
        setGridB(newGridB);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    // Handle mouse up globally to prevent sticky selection
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setMouseIsPressed(false);
        };

        document.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder, gridId, setStatsFn, startTime) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder, gridId, setStatsFn, startTime, visitedNodesInOrder.length);
                }, speed * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const nodeElement = document.getElementById(`node-${gridId}-${node.row}-${node.col}`);
                if (nodeElement) nodeElement.className = 'node node-visited';
            }, speed * i);
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder, gridId, setStatsFn, startTime, visitedCount) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const nodeElement = document.getElementById(`node-${gridId}-${node.row}-${node.col}`);
                if (nodeElement) nodeElement.className = 'node node-shortest-path';
            }, 50 * i);
        }

        // Finalize stats after animation
        setTimeout(() => {
            const endTime = performance.now();
            const timeTaken = (endTime - startTime).toFixed(2);
            const pathLength = nodesInShortestPathOrder.length;
            const efficiency = visitedCount > 0 ? ((pathLength / visitedCount) * 100).toFixed(1) : 0;

            setStatsFn(prev => ({
                ...prev,
                timeTaken,
                pathLength,
                visitedNodes: visitedCount,
                cost: pathLength, // Using path length as cost for unweighted
                efficiency
            }));

            setIsRunning(false);
        }, 50 * nodesInShortestPathOrder.length);
    };

    const runAlgorithm = (algorithm, currentGrid, gridId, setStatsFn) => {
        const startNode = currentGrid[START_NODE_ROW][START_NODE_COL];
        const finishNode = currentGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let visitedNodesInOrder;

        const startTime = performance.now();

        // Reset previous stats slightly to show it's running
        setStatsFn({ visitedNodes: 0, pathLength: 0, timeTaken: 0, cost: 0, efficiency: 0 });

        switch (algorithm) {
            case 'dijkstra': visitedNodesInOrder = dijkstra(currentGrid, startNode, finishNode); break;
            case 'bfs': visitedNodesInOrder = bfs(currentGrid, startNode, finishNode); break;
            case 'dfs': visitedNodesInOrder = dfs(currentGrid, startNode, finishNode); break;
            case 'astar': visitedNodesInOrder = astar(currentGrid, startNode, finishNode); break;
            case 'greedy': visitedNodesInOrder = greedyBestFirst(currentGrid, startNode, finishNode); break;
            default: visitedNodesInOrder = dijkstra(currentGrid, startNode, finishNode);
        }

        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, gridId, setStatsFn, startTime);
    };

    const resetGridPreservingWalls = (grid) => {
        const newGrid = grid.map(row =>
            row.map(node => ({
                ...node,
                distance: Infinity,
                isVisited: false,
                previousNode: null,
                isStart: node.isStart,
                isFinish: node.isFinish,
                isWall: node.isWall,
            }))
        );
        return newGrid;
    };

    const clearVisuals = () => {
        ['A', 'B'].forEach(gridId => {
            const nodes = document.getElementsByClassName(`node-${gridId}`);
            // This selector is wrong, nodes don't have gridId class.
            // We need to iterate by ID or clear all 'node-visited' and 'node-shortest-path'
            // But we need to be careful not to clear the other grid if not in comparison mode?
            // Actually, clearing by iterating the grid is safer.
        });

        // Better approach: Iterate over the grid dimensions
        ['A', isComparisonMode ? 'B' : null].forEach(gridId => {
            if (!gridId) return;
            for (let row = 0; row < 20; row++) {
                for (let col = 0; col < 50; col++) {
                    const element = document.getElementById(`node-${gridId}-${row}-${col}`);
                    if (element) {
                        element.classList.remove('node-visited', 'node-shortest-path');
                    }
                }
            }
        });
    };

    const visualize = () => {
        if (isRunning) return;
        setIsRunning(true);

        // Clear previous visuals
        clearVisuals();

        // Create fresh grids with walls preserved
        const cleanGrid = resetGridPreservingWalls(grid);
        setGrid(cleanGrid);

        let cleanGridB = [];
        if (isComparisonMode) {
            cleanGridB = resetGridPreservingWalls(gridB);
            setGridB(cleanGridB);
        }

        // Run algorithms on clean grids
        // We use setTimeout to allow React state to update? 
        // No, we pass the cleanGrid directly to runAlgorithm.
        // But runAlgorithm uses the state setter setStats.

        runAlgorithm(selectedAlgorithm, cleanGrid, 'A', setStats);

        if (isComparisonMode) {
            runAlgorithm(secondAlgorithm, cleanGridB, 'B', setStatsB);
        }
    };

    const clearBoard = () => {
        if (isRunning) return;
        const newGrid = getInitialGrid();
        setGrid(newGrid);
        setGridB(getInitialGrid());
        setStats({ visitedNodes: 0, pathLength: 0, timeTaken: 0, cost: 0, efficiency: 0 });
        setStatsB({ visitedNodes: 0, pathLength: 0, timeTaken: 0, cost: 0, efficiency: 0 });

        // Reset CSS classes for both grids
        ['A', isComparisonMode ? 'B' : null].forEach(gridId => {
            if (!gridId) return;
            for (let row = 0; row < 20; row++) {
                for (let col = 0; col < 50; col++) {
                    const node = newGrid[row][col];
                    let extraClassName = '';
                    if (node.isFinish) extraClassName = 'node-finish';
                    else if (node.isStart) extraClassName = 'node-start';
                    else if (node.isWall) extraClassName = 'node-wall';

                    const element = document.getElementById(`node-${gridId}-${row}-${col}`);
                    if (element) element.className = `node ${extraClassName}`;
                }
            }
        });
    };

    const generateRandomMaze = () => {
        if (isRunning) return;
        clearBoard();
        const newGrid = getInitialGrid();
        const newGridB = getInitialGrid(); // Sync walls

        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                if (Math.random() < 0.3 && !newGrid[row][col].isStart && !newGrid[row][col].isFinish) {
                    newGrid[row][col].isWall = true;
                    newGridB[row][col].isWall = true;
                }
            }
        }
        setGrid(newGrid);
        setGridB(newGridB);
    };

    return (
        <div className="pathfinding-visualizer">
            {!isComparisonMode && <AlgorithmInfoSidebar selectedAlgorithm={selectedAlgorithm} />}
            <header className="header">
                <div className="header-top">
                    <button className="btn-back" onClick={() => navigate('/')}>
                        ← Home
                    </button>
                    {/* Title removed as per request */}
                </div>

                <div className="controls-row">
                    <div className="control-group">
                        <label>Algorithm A:</label>
                        <select
                            value={selectedAlgorithm}
                            onChange={(e) => setSelectedAlgorithm(e.target.value)}
                            disabled={isRunning}
                            className="algorithm-select"
                        >
                            <option value="dijkstra">Dijkstra's Algorithm</option>
                            <option value="astar">A* Search</option>
                            <option value="greedy">Greedy Best-First</option>
                            <option value="bfs">BFS</option>
                            <option value="dfs">DFS</option>
                        </select>
                    </div>

                    {isComparisonMode && (
                        <div className="control-group">
                            <label>Algorithm B:</label>
                            <select
                                value={secondAlgorithm}
                                onChange={(e) => setSecondAlgorithm(e.target.value)}
                                disabled={isRunning}
                                className="algorithm-select"
                            >
                                <option value="dijkstra">Dijkstra's Algorithm</option>
                                <option value="astar">A* Search</option>
                                <option value="greedy">Greedy Best-First</option>
                                <option value="bfs">BFS</option>
                                <option value="dfs">DFS</option>
                            </select>
                        </div>
                    )}

                    <div className="control-group">
                        <label>Speed: {speed}ms</label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            disabled={isRunning}
                            className="speed-slider"
                        />
                    </div>

                    <button className="btn-visualize" onClick={visualize} disabled={isRunning}>
                        {isComparisonMode ? 'Compare!' : 'Visualize!'}
                    </button>

                    <button className="btn-secondary" onClick={() => setIsComparisonMode(!isComparisonMode)} disabled={isRunning}>
                        {isComparisonMode ? 'Single Mode' : 'Compare Mode'}
                    </button>

                    <button className="btn-secondary" onClick={generateRandomMaze} disabled={isRunning}>
                        Random Maze
                    </button>
                    <button className="btn-secondary" onClick={clearBoard} disabled={isRunning}>
                        Clear Board
                    </button>
                </div>

                <div className="stats-container">
                    <div className="stats-group">
                        <h3>{isComparisonMode ? 'Algorithm A Stats' : 'Statistics'}</h3>
                        <div className="stat-item"><span className="stat-label">Visited:</span> <span className="stat-value">{stats.visitedNodes}</span></div>
                        <div className="stat-item"><span className="stat-label">Path:</span> <span className="stat-value">{stats.pathLength}</span></div>
                        <div className="stat-item"><span className="stat-label">Time:</span> <span className="stat-value">{stats.timeTaken} ms</span></div>
                        <div className="stat-item"><span className="stat-label">Efficiency:</span> <span className="stat-value">{stats.efficiency}%</span></div>
                    </div>

                    {isComparisonMode && (
                        <div className="stats-group">
                            <h3>Algorithm B Stats</h3>
                            <div className="stat-item"><span className="stat-label">Visited:</span> <span className="stat-value">{statsB.visitedNodes}</span></div>
                            <div className="stat-item"><span className="stat-label">Path:</span> <span className="stat-value">{statsB.pathLength}</span></div>
                            <div className="stat-item"><span className="stat-label">Time:</span> <span className="stat-value">{statsB.timeTaken} ms</span></div>
                            <div className="stat-item"><span className="stat-label">Efficiency:</span> <span className="stat-value">{statsB.efficiency}%</span></div>
                        </div>
                    )}
                </div>
            </header>

            <div className={`grids-container ${isComparisonMode ? 'comparison-mode' : ''}`}>
                <div className="grid-wrapper">
                    {isComparisonMode && <div className="grid-label">Algorithm A</div>}
                    <div className="grid">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx} className="row">
                                    {row.map((node, nodeIdx) => {
                                        const { row, col, isFinish, isStart, isWall } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                col={col}
                                                isFinish={isFinish}
                                                isStart={isStart}
                                                isWall={isWall}
                                                mouseIsPressed={mouseIsPressed}
                                                onMouseDown={(row, col) => handleMouseDown(row, col)}
                                                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                                onMouseUp={() => handleMouseUp()}
                                                row={row}
                                                gridId="A"
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {isComparisonMode && (
                    <div className="grid-wrapper">
                        <div className="grid-label">Algorithm B</div>
                        <div className="grid">
                            {gridB.map((row, rowIdx) => {
                                return (
                                    <div key={rowIdx} className="row">
                                        {row.map((node, nodeIdx) => {
                                            const { row, col, isFinish, isStart, isWall } = node;
                                            return (
                                                <Node
                                                    key={nodeIdx}
                                                    col={col}
                                                    isFinish={isFinish}
                                                    isStart={isStart}
                                                    isWall={isWall}
                                                    mouseIsPressed={mouseIsPressed}
                                                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                                                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                                    onMouseUp={() => handleMouseUp()}
                                                    row={row}
                                                    gridId="B"
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

export default PathfindingVisualizer;
