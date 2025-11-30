# PathFinder AI 🚀

![Pathfinding Visualizer](https://img.shields.io/badge/Pathfinding-Visualizer-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**PathFinder AI** is an interactive and powerful pathfinding visualization tool built with React and Vite. It allows users to visualize how various pathfinding algorithms work in real-time, compare their performance, and experiment with different maze configurations.

## ✨ Features

- **🔍 Multiple Algorithms**: Visualize classic pathfinding algorithms including:
  - **Dijkstra's Algorithm**: The father of pathfinding algorithms; guarantees the shortest path.
  - **A* Search**: A smart algorithm that uses heuristics to find the shortest path faster.
  - **Greedy Best-First Search**: A faster, more heuristic-heavy version of A*.
  - **Breadth-First Search (BFS)**: Guarantees the shortest path in unweighted graphs.
  - **Depth-First Search (DFS)**: A fundamental algorithm that explores as far as possible along each branch before backtracking (does not guarantee shortest path).

- **⚔️ Comparison Mode**: Run two algorithms side-by-side on identical grids to directly compare their performance, speed, and efficiency.

- **🧱 Interactive Grid**:
  - **Draw Walls**: Click and drag to create barriers.
  - **Move Nodes**: Drag the Start and Finish nodes to new positions (planned/if implemented).

- **🧩 Maze Generation**: Automatically generate random mazes to test algorithms in complex scenarios.

- **⚡ Real-Time Stats**: View detailed statistics for each run:
  - Visited Nodes
  - Path Length
  - Time Taken (ms)
  - Efficiency Score

- **⏩ Speed Control**: Adjust the visualization speed to understand the step-by-step process or see instant results.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Samarth-3910/PathFinder-AI.git
    cd PathFinder-AI
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Vanilla CSS
- **Algorithms**: Custom JavaScript implementations

## 🎮 Usage

1.  **Select an Algorithm**: Choose an algorithm from the dropdown menu (e.g., Dijkstra, A*).
2.  **Draw Walls**: Click and drag on the grid to draw walls that the pathfinder must avoid.
3.  **Visualize**: Click the **Visualize!** button to start the animation.
4.  **Compare**: Toggle **Compare Mode** to select a second algorithm and see them race!
5.  **Reset**: Use **Clear Board** to remove paths or **Random Maze** to generate a new challenge.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by Samarth
</p>
