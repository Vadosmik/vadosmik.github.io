const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let animacji_status = true;
//let leafInterval = setInterval(spawnLeaf, 1000);
let leafInterval = setInterval(spawnWindLeaf, 800);

const leafImages = [
    'leaf1.png',
    'leaf2.png',
    'leaf3.png',
    'leaf4.png',
    'leaf5.png',
    'leaf6.png',
    'leaf7.png',
    'leaf8.png'
];

function spawnLeaf() {
    const container = document.getElementById('leaf-container');
    const leaf = document.createElement('img');
    leaf.classList.add('leaf');
    leaf.style.zIndex = '0';

    const randomImage = leafImages[Math.floor(Math.random() * leafImages.length)];
    leaf.src = `img/${randomImage}`;

    leaf.style.left = `${Math.random() * 90}vw`;
    leaf.style.top = `-50px`;
    document.body.appendChild(leaf);

    // Losowe parametry wiatru i fali
    const speed = 0.5 + Math.random() * 1.5;         // Prędkość opadania
    const amplitude = 30 + Math.random() * 20;       // Amplituda fali w px
    const frequency = 0.01 + Math.random() * 0.02;   // Częstotliwość fali
    const rotationSpeed = Math.random() * 2 - 1;     // Kierunek obrotu

    let x = parseFloat(leaf.style.left);
    let y = 0;
    let angle = 0;

    const fall = setInterval(() => {
        y += speed;
        angle += rotationSpeed;

        // Oscylacja na boki
        const offsetX = amplitude * Math.sin(y * frequency);

        leaf.style.top = `${y}px`;
        leaf.style.left = `calc(${x}vw + ${offsetX}px)`;
        leaf.style.transform = `rotate(${angle}deg)`;

        if (y > window.innerHeight + 40) {
            clearInterval(fall);
            setTimeout(() => {
                leaf.classList.add('fade-out');
                setTimeout(() => leaf.remove(), 1000);
            }, 2000);
        }
    }, 20);
}


function toggleAnimation(mode) {
    if (leafInterval) {
        clearInterval(leafInterval);
        leafInterval = null;
    }

    if (mode === 1 && animacji_status !== 1) {
        leafInterval = setInterval(spawnLeaf, 1000);
        animacji_status = 1;
    } else if (mode === 2 && animacji_status !== 2) {
        leafInterval = setInterval(spawnWindLeaf, 800);
        animacji_status = 2;
    } else {
        animacji_status = 0;
    }
}

function spawnWindLeaf() {
    const leaf = document.createElement('img');
    leaf.classList.add('leaf');
    leaf.src = `img/${leafImages[Math.floor(Math.random() * leafImages.length)]}`;
    leaf.style.position = 'absolute';
    leaf.style.zIndex = '0';
    leaf.style.top = '0px';
    leaf.style.left = '0px';
    document.body.appendChild(leaf);


    // Losowe parametry ruchu po trajektorii matematycznej
    const a = 0.05 + Math.random() * 0.6;
    const k = 1.5 + Math.random() * 4.5;
    const b = 0.05 + Math.random() * 0.3;
    const speed = 0.05 + Math.random() * 0.8;
    const rotationSpeed = Math.random() * 4 - 2;

    const n = 600 + Math.floor(Math.random() * 300); // zamiast 400–700
    const t = Array.from({ length: n }, (_, i) => i * 3 * Math.PI / (n - 1));
    const xPath = t.map(ti => ti - k * Math.sin(ti));
    const yPath = t.map(ti => a * ti - k * (1 - Math.cos(ti)) + b * Math.max(ti - 2 * Math.PI, 0));

    const xMin = Math.min(...xPath), xMax = Math.max(...xPath);
    const yMin = Math.min(...yPath), yMax = Math.max(...yPath);

    let i = 0;
    let angle = 0;

    function animate() {
        if (i >= xPath.length) {
            leaf.classList.add('fade-out');
            setTimeout(() => leaf.remove(), 1000);
            return;
        }

        const xNorm = (xPath[i] - xMin) / (xMax - xMin);
        const yNorm = (yPath[i] - yMin) / (yMax - yMin);

        let xPx, yPx;
        if (isMobile) {
            xPx = (1 - yNorm) * window.innerWidth;
            yPx = xNorm * window.innerHeight;

            yPx *= 1.2;
        } else {
            xPx = xNorm * window.innerWidth;
            yPx = (1 - yNorm) * window.innerHeight;

            xPx *= 1.2;
        }


        leaf.style.left = `${xPx}px`;
        leaf.style.top = `${yPx}px`;
        angle += rotationSpeed;
        leaf.style.transform = `rotate(${angle}deg)`;

        i += Math.ceil(speed * 2);
        requestAnimationFrame(animate);
    }

    animate();
}
