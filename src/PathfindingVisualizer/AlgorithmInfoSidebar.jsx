import React from 'react';
import styled, { keyframes } from 'styled-components';

const algorithmData = {
    dijkstra: {
        name: "Dijkstra's Algorithm",
        description: "The father of pathfinding algorithms. It guarantees the shortest path by exploring nodes in all directions, prioritizing those with the smallest known distance from the start.",
        timeComplexity: "O(E + V log V)",
        bestFor: "Guaranteed shortest path",
        color: "#4ecdc4"
    },
    astar: {
        name: "A* Search",
        description: "A smart algorithm that uses heuristics (educated guesses) to guide its search towards the target. It's much faster than Dijkstra's while still guaranteeing the shortest path.",
        timeComplexity: "O(E)",
        bestFor: "Fastest shortest path",
        color: "#ff6b6b"
    },
    greedy: {
        name: "Greedy Best-First",
        description: "A very fast algorithm that always moves towards the goal. However, it can get stuck in dead ends and does NOT guarantee the shortest path.",
        timeComplexity: "O(N)",
        bestFor: "Speed (but not accuracy)",
        color: "#feca57"
    },
    bfs: {
        name: "Breadth-First Search",
        description: "Explores the grid layer by layer, like ripples in a pond. It guarantees the shortest path in unweighted graphs (like this one) but can be slow.",
        timeComplexity: "O(V + E)",
        bestFor: "Unweighted shortest path",
        color: "#45b7d1"
    },
    dfs: {
        name: "Depth-First Search",
        description: "Explores as far as possible along each branch before backtracking. It's terrible for pathfinding as it doesn't guarantee the shortest path, but useful for maze generation.",
        timeComplexity: "O(V + E)",
        bestFor: "Maze solving (not shortest path)",
        color: "#ff9ff3"
    }
};

const AlgorithmInfoSidebar = ({ selectedAlgorithm }) => {
    const info = algorithmData[selectedAlgorithm] || algorithmData.dijkstra;

    return (
        <SidebarContainer>
            <ContentWrapper>
                <Title color={info.color}>{info.name}</Title>
                <Description>{info.description}</Description>

                <StatsCard>
                    <StatLabel>Time Complexity</StatLabel>
                    <StatValue color={info.color}>{info.timeComplexity}</StatValue>
                </StatsCard>

                <StatsCard>
                    <StatLabel>Best For</StatLabel>
                    <StatValue color={info.color}>{info.bestFor}</StatValue>
                </StatsCard>
            </ContentWrapper>
        </SidebarContainer>
    );
};

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 100px; /* Below header */
  right: 20px;
  width: 300px;
  background: rgba(22, 27, 34, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  color: white;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  animation: ${slideIn} 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 100;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  background: linear-gradient(to right, ${props => props.color}, white);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #8b949e;
  margin: 0;
`;

const StatsCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.color};
`;

export default AlgorithmInfoSidebar;
