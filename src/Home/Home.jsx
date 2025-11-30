import React from 'react';
import { useNavigate } from 'react-router-dom';
import GithubButton from '../components/GithubButton';
import GradientButton from '../components/GradientButton';
import GradientCard from '../components/GradientCard';
import Checkbox from '../components/Checkbox';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="title-container">
                <Checkbox />
            </div>

            <div className="github-btn-container">
                <GithubButton />
            </div>

            <div className="hero-section">
                {/* Title replaced by Checkbox at top-left */}
                <p className="hero-subtitle">
                    Visualize, Compare, and Master Pathfinding Algorithms
                </p>
                <div className="hero-buttons">
                    <GradientButton onClick={() => navigate('/visualizer')} text="Try now" />
                </div>
            </div>

            <div className="features-section">
                <GradientCard
                    title="Interactive Visualization"
                    description="Watch algorithms like Dijkstra, A*, BFS, and DFS explore the grid in real-time. Understand their behavior visually."
                />
                <GradientCard
                    title="Algorithm Comparison"
                    description="Run two algorithms side-by-side on identical grids. Compare their speed, efficiency, and visited nodes directly."
                />
                <GradientCard
                    title="Real-Time Analytics"
                    description="Get instant feedback on path length, time taken, and efficiency scores. Perfect for analyzing algorithm performance."
                />
            </div>

            <div className="info-section">
                <h2>Why PathFinder AI?</h2>
                <p>
                    Designed for students, developers, and interview preppers. PathFinder AI turns
                    abstract concepts into concrete visual experiences. Whether you're learning
                    Graph Theory or preparing for a coding interview, this tool helps you build
                    intuition for how pathfinding algorithms work under the hood.
                </p>
            </div>
        </div>
    );
};

export default Home;
