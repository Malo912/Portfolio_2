
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Network Visualization
    function createNetworkVisualization() {
        const visual = document.getElementById('networkVisual');
        if (!visual) return;
        
        // Clear existing nodes
        visual.innerHTML = '';
        
        const numNodes = 15;
        const nodes = [];
        
        // Create nodes
        for (let i = 0; i < numNodes; i++) {
            const node = document.createElement('div');
            node.className = 'node';
            
            // Random position
            const top = Math.random() * 100 + '%';
            const left = Math.random() * 100 + '%';
            
            node.style.top = top;
            node.style.left = left;
            
            visual.appendChild(node);
            nodes.push({
                element: node,
                top: parseFloat(top),
                left: parseFloat(left)
            });
        }
        
        // Create connections between nodes
        for (let i = 0; i < nodes.length; i++) {
            const nodeA = nodes[i];
            
            // Connect to 1-3 random nodes
            const connectionsCount = Math.floor(Math.random() * 3) + 1;
            
            for (let j = 0; j < connectionsCount; j++) {
                // Select a random node that's not the current one
                let nodeB;
                do {
                    nodeB = nodes[Math.floor(Math.random() * nodes.length)];
                } while (nodeB === nodeA);
                
                // Create connection line
                const connection = document.createElement('div');
                connection.className = 'connection';
                
                // Calculate position and angle
                const a = nodeA.element.getBoundingClientRect();
                const b = nodeB.element.getBoundingClientRect();
                
                // Position at first node center
                connection.style.left = nodeA.left + '%';
                connection.style.top = nodeA.top + '%';
                
                // Calculate length and angle
                const dx = b.left - a.left;
                const dy = b.top - a.top;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                // Set length and rotation
                connection.style.width = length + 'px';
                connection.style.transform = `rotate(${angle}deg)`;
                
                visual.appendChild(connection);
            }
        }
        
        // Animate nodes slightly
        setInterval(() => {
            const nodes = document.querySelectorAll('.node');
            nodes.forEach(node => {
                const currentTop = parseFloat(node.style.top);
                const currentLeft = parseFloat(node.style.left);
                
                // Small random movement
                const newTop = currentTop + (Math.random() - 0.5) * 0.5;
                const newLeft = currentLeft + (Math.random() - 0.5) * 0.5;
                
                // Keep within bounds
                if (newTop >= 0 && newTop <= 100) {
                    node.style.top = newTop + '%';
                }
                
                if (newLeft >= 0 && newLeft <= 100) {
                    node.style.left = newLeft + '%';
                }
            });
        }, 2000);
    }
    
    // Create network visualization on load
    window.addEventListener('load', createNetworkVisualization);
    
    // Scroll animations
    function checkScrollAnimation() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.8;
            
            if (elementPosition < screenPosition) {
                element.classList.add('active');
            }
        });
    }
    
    // Check animations on load
    window.addEventListener('load', checkScrollAnimation);
    
    // Check animations on scroll
    window.addEventListener('scroll', checkScrollAnimation);
    
    // Terminal typing animation restart
    function restartTypingAnimation() {
        const typingElement = document.querySelector('.typing');
        if (typingElement) {
            typingElement.classList.remove('typing');
            void typingElement.offsetWidth; // Force reflow
            typingElement.classList.add('typing');
        }
    }
    
    // Restart typing animation periodically
    setInterval(restartTypingAnimation, 8000);
