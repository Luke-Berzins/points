document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('dot-container');
    const squareButton = document.getElementById('square-button');
    const spiralButton = document.getElementById('spiral-button');
    const fibonacciButton = document.getElementById('fibonacci-button');
    const numberOfDots = 500;
    let dots = [];
    let tails = [];
    let squareSize = Math.ceil(Math.sqrt(numberOfDots));
    let spacing = container.offsetWidth / squareSize;

    // Create dots

    for (let i = 0; i < numberOfDots; i++) {
        let dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        container.appendChild(dot);
        dots.push(dot);
        moveDot(dot);
    }

    squareButton.addEventListener('click', () => {
        dots.forEach((dot, index) => {
            let x = (index % squareSize) * spacing;
            let y = Math.floor(index / squareSize) * spacing;
            dot.style.transition = 'transform 1s ease';
            dot.style.transform = `translate(${x - dot.offsetLeft}px, ${y - dot.offsetTop}px)`;
        });
    });
     spiralButton.addEventListener('click', () => {
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        const spread = spacing; // Adjust the spread to control the spiral density
        let angle = 0;
        let step = 2 * Math.PI / numberOfDots;

        dots.forEach((dot, index) => {
            let x = centerX + (spread * angle) * Math.cos(angle);
            let y = centerY + (spread * angle) * Math.sin(angle);
            dot.style.transition = 'transform 1s ease';
            dot.style.transform = `translate(${x - dot.offsetLeft}px, ${y - dot.offsetTop}px)`;

            angle += step;
        });
    });
    fibonacciButton.addEventListener('click', () => {
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        let radius = spacing / 3; // Starting radius
        let angle = 0;
        const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // About 137.5 degrees in radians

        dots.forEach((dot, index) => {
            let x = centerX + radius * Math.cos(angle);
            let y = centerY + radius * Math.sin(angle);
            dot.style.transition = 'transform 1s ease';
            dot.style.transform = `translate(${x - dot.offsetLeft}px, ${y - dot.offsetTop}px)`;

            radius += 5; // Increase the radius at each step
            angle += goldenAngle; // Increment the angle
        });
    });

    document.getElementById('lissajous-button').addEventListener('click', () => {
        const A = 100, B = 100, a = 5, b = 4, delta = Math.PI / 2;
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
    
        dots.forEach((dot, index) => {
            const t = index / numberOfDots * 2 * Math.PI;
            const x = centerX + A * Math.sin(a * t + delta);
            const y = centerY + B * Math.sin(b * t);
            dot.style.transition = 'transform 1s ease';
            dot.style.transform = `translate(${x - dot.offsetLeft}px, ${y - dot.offsetTop}px)`;
        });
    });
    
    document.getElementById('phyllotaxis-button').addEventListener('click', () => {
        const angleIncrement = Math.PI * (3 - Math.sqrt(5)); // golden angle
        const c = 4; // scale factor
    
        dots.forEach((dot, index) => {
            const r = c * Math.sqrt(index);
            const angle = index * angleIncrement * spacing * 4;
            const x = r * Math.cos(angle) + container.offsetWidth / 2;
            const y = r * Math.sin(angle) + container.offsetHeight / 2;
            dot.style.transition = 'transform 1s ease';
            dot.style.transform = `translate(${x - dot.offsetLeft}px, ${y - dot.offsetTop}px)`;
        });
    });
    
    document.getElementById('harmonograph-button').addEventListener('click', () => {
        const A = [100, 100], f = [2, 3], p = [Math.PI/16, Math.PI/16], d = [0.02, 0.0315];
        const timeScale = 10;
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
    
        dots.forEach((dot, index) => {
            const t = index / numberOfDots * 2 * Math.PI * timeScale;
            const x = centerX + (A[0] * Math.sin(f[0] * t + p[0]) * Math.exp(-d[0] * t));
            const y = centerY + (A[1] * Math.sin(f[1] * t + p[1]) * Math.exp(-d[1] * t));
            dot.style.transition = 'transform 1s ease';
            dot.style.transform = `translate(${x - dot.offsetLeft}px, ${y - dot.offsetTop}px)`;
        });
    });

    container.addEventListener('mousedown', function(event) {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        dots.forEach(dot => {
            dot.style.transition = 'transform 0.5s ease';
            let dotX = dot.offsetLeft + dot.offsetWidth / 2;
            let dotY = dot.offsetTop + dot.offsetHeight / 2;
            let deltaX = x - dotX;
            let deltaY = y - dotY;
            dot.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        tails.forEach(tail => tail.remove());
        tails = [];
    });

    container.addEventListener('mouseup', () => {
        dots.forEach(dot => {
            dot.style.transition = 'transform 0.5s ease';
            dot.style.transform = '';
        });

        dots.forEach(dot => createTail(dot));
        
    });

    // Function to move each dot slowly in a random direction
    function moveDot(dot) {
        const duration = 5000
        const xMove = Math.random() * 100 - 50; // Move up to 50px in x
        const yMove = Math.random() * 100 - 50; // Move up to 50px in y

        dot.style.transition = `transform ${duration}ms linear`;
        dot.style.transform = `translate(${xMove}px, ${yMove}px)`;

        // After the movement completes, call moveDot again to continue movement
        setTimeout(() => moveDot(dot), duration);
    }

    function createTail(dot) {
        let tail = document.createElement('div');
        tail.className = 'tail';
        tail.style.left = dot.style.left;
        tail.style.top = dot.style.top;
        container.appendChild(tail);
        tails.push(tail);

        setTimeout(() => {
            tail.remove();
            tails.splice(tails.indexOf(tail), 1);
        }, 1000); // Tail disappears after 1 second
    }
});
