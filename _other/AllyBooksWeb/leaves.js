const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let animacji_status = 0;
let leafTimeout = null;

const leafImages = [
    'leaf1.png',
    'leaf2.png',
    'leaf3.png',
    'leaf4.png',
    'leaf5.png',
    'leaf6.png',
    'leaf7.png',
    'leaf8.png',
    'leaf9.PNG'
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
    const speed = 0.5 + Math.random() * 1.5;
    const amplitude = 30 + Math.random() * 20;
    const frequency = 0.01 + Math.random() * 0.02;
    const rotationSpeed = Math.random() * 2 - 1;

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



function toggleAnimation(mode) {
    if (leafTimeout) {
      clearTimeout(leafTimeout);
      leafTimeout = null;
    }

    if (mode === 1 && animacji_status !== 1) {
      animacji_status = 1;
      spawnLeafRandom();
    } else if (mode === 2 && animacji_status !== 2) {
      animacji_status = 2;
      spawnWindLeafRandom();
    } else {
      animacji_status = 0;
    }
  }

  function spawnLeafRandom() {
    if (animacji_status !== 1) return;
    spawnLeaf(); // twoja funkcja generująca liścia
    const delay = Math.random() * 700 + 300; // losowo 300–1000ms
    leafTimeout = setTimeout(spawnLeafRandom, delay);
  }
  
  function spawnWindLeafRandom() {
    if (animacji_status !== 2) return;
    spawnWindLeaf(); // inna wersja liścia
    const delay = Math.random() * 700 + 300; // 300–1000ms
    leafTimeout = setTimeout(spawnWindLeafRandom, delay);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const randomMode = Math.random() < 0.5 ? 1 : 2;
    toggleAnimation(randomMode);
  });
