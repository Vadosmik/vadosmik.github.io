document.querySelector('.tab-view button').addEventListener('click', () => {
    const panel = document.querySelector('#animation .tab-content');
    panel.classList.toggle('open');
  });