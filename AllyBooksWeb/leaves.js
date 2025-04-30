function spawnLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.textContent = '🍂';
    leaf.style.left = `${Math.random() * 90}vw`;
    leaf.style.top = '0px';
    document.body.appendChild(leaf);
  
    let y = 0;
    const fall = setInterval(() => {
      y += 2;
      leaf.style.top = `${y}px`;
      leaf.style.transform = `rotate(${Math.sin(y / 20) * 10}deg)`;
  
      // Sprawdź, czy liść dotknął któregoś przycisku
      const leafRect = leaf.getBoundingClientRect();
      const buttons = document.querySelectorAll('.buttons a');
  
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
          }, 2000);
          return;
        }
      }
  
      // Jeśli spadł poza ekran
      if (y > window.innerHeight) {
        clearInterval(fall);
        setTimeout(() => {
          leaf.classList.add('fade-out');
          setTimeout(() => leaf.remove(), 1000);
        }, 2000);
      }
    }, 20);
  }
  
  setInterval(spawnLeaf, 1000);