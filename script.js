const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

const nodes = [
    { x: 100, y: 200, visited: false },
    { x: 250, y: 100, visited: false },
    { x: 400, y: 200, visited: false },
    { x: 250, y: 300, visited: false }
];

const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], [0, 2]
];

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
    });

    // Draw nodes
    nodes.forEach((node, index) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = node.visited ? '#4CAF50' : '#333';
        ctx.fill();
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText(index, node.x - 5, node.y + 5);
    });
}

function resetVisited() {
    nodes.forEach(node => node.visited = false);
    drawGraph();
}

function bfs() {
    resetVisited();
    const queue = [0];
    nodes[0].visited = true;
    drawGraph();

    const interval = setInterval(() => {
        if (queue.length === 0) {
            clearInterval(interval);
            return;
        }

        const nodeIndex = queue.shift();
        nodes[nodeIndex].visited = true;
        drawGraph();

        edges.forEach(([i, j]) => {
            if (i === nodeIndex && !nodes[j].visited) {
                queue.push(j);
                nodes[j].visited = true;
            } else if (j === nodeIndex && !nodes[i].visited) {
                queue.push(i);
                nodes[i].visited = true;
            }
        });
    }, 1000);
}

function dfs() {
    resetVisited();
    const stack = [0];
    nodes[0].visited = true;
    drawGraph();

    const interval = setInterval(() => {
        if (stack.length === 0) {
            clearInterval(interval);
            return;
        }

        const nodeIndex = stack.pop();
        nodes[nodeIndex].visited = true;
        drawGraph();

        edges.forEach(([i, j]) => {
            if (i === nodeIndex && !nodes[j].visited) {
                stack.push(j);
                nodes[j].visited = true;
            } else if (j === nodeIndex && !nodes[i].visited) {
                stack.push(i);
                nodes[i].visited = true;
            }
        });
    }, 1000);
}

// Draw initial graph
drawGraph();
