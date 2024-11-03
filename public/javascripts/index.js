document.addEventListener('DOMContentLoaded', (event) => {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Network Effect
function createNetwork() {
    const network = document.querySelector('.network');
    const nodeCount = 50;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        network.appendChild(node);
        nodes.push({
            element: node,
            x: parseFloat(node.style.left),
            y: parseFloat(node.style.top),
            vx: Math.random() * 0.2 - 0.1, // Normal speed
            vy: Math.random() * 0.2 - 0.1  // Normal speed
        });
    }

    let lastTime = 0;
    const targetFPS = 120;
    const targetFrameTime = 1000 / targetFPS;

    function updateNetwork(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= targetFrameTime) {
            const connections = network.querySelectorAll('.connection');
            connections.forEach(conn => conn.remove());

            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > 100) node.vx *= -1;
                if (node.y < 0 || node.y > 100) node.vy *= -1;

                node.element.style.left = `${node.x}%`;
                node.element.style.top = `${node.y}%`;

                nodes.forEach(otherNode => {
                    if (node !== otherNode) {
                        const dx = otherNode.x - node.x;
                        const dy = otherNode.y - node.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 20) {
                            const connection = document.createElement('div');
                            connection.classList.add('connection');
                            connection.style.left = `${node.x}%`;
                            connection.style.top = `${node.y}%`;
                            connection.style.width = `${distance}%`;
                            connection.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
                            network.appendChild(connection);
                        }
                    }
                });
            });

            lastTime = currentTime;
        }

        requestAnimationFrame(updateNetwork);
    }

    requestAnimationFrame(updateNetwork);
}

createNetwork();