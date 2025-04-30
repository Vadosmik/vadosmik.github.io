const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let animacji_status = false;

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
    const leaf = document.createElement('img');
    leaf.classList.add('leaf');
    leaf.style.zIndex = '0';
  
    const randomImage = leafImages[Math.floor(Math.random() * leafImages.length)];
    leaf.src = `img/${randomImage}`;
  
    leaf.style.left = `${Math.random() * 90}vw`;
    leaf.style.top = `-30px`; // zaczyna poza ekranem
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
  
      // Sprawdzenie kolizji z przyciskami
      const leafRect = leaf.getBoundingClientRect();
      const buttons = document.querySelectorAll('.buttons a');
      if (!isMobile) {
        for (const btn of buttons) {
          const btnRect = btn.getBoundingClientRect();
          const collision =
            leafRect.bottom >= btnRect.top &&
            leafRect.top <= btnRect.bottom &&
            leafRect.left >= btnRect.left &&
            leafRect.right <= btnRect.right;
      
          if (collision) {
            clearInterval(fall);
            setTimeout(() => {
              leaf.classList.add('fade-out');
              setTimeout(() => leaf.remove(), 1000);
            }, 1500);
            return;
          }
        }
      }
  
      if (y > window.innerHeight + 40) {
        clearInterval(fall);
        setTimeout(() => {
          leaf.classList.add('fade-out');
          setTimeout(() => leaf.remove(), 1000);
        }, 2000);
      }
    }, 20);
  }

  function toggleAnimationStatus() {
    if (!animacji_status) {
      leafInterval = setInterval(spawnLeaf, 1000);
      animacji_status = true;
    } else {
      clearInterval(leafInterval);
      animacji_status = false;
    }
  }

