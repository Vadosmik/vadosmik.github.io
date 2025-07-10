document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 0;
  const pages = document.querySelectorAll('.page');
  const totalPages = pages.length;
  const scroller = document.getElementById('scroller');
  let isScrolling = false;

  function scrollToPage(index) {
    isScrolling = true;
    scroller.style.transform = `translateY(-${index * 100}vh)`;
    scroller.style.transition = 'transform 0.7s ease';
    setTimeout(() => isScrolling = false, 800);
  }

  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 50 && currentPage < totalPages - 1) {
      currentPage++;
      scrollToPage(currentPage);
    } else if (e.deltaY < -50 && currentPage > 0) {
      currentPage--;
      scrollToPage(currentPage);
    }
  });

  window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
});

let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleGesture();
});

function handleGesture() {
  if (isScrolling) return;

  const swipeDistance = touchStartY - touchEndY;
  const threshold = 50; // minimalna odległość do uznania gestu

  if (swipeDistance > threshold && currentPage < totalPages - 1) {
    // swipe up
    currentPage++;
    scrollToPage(currentPage);
  } else if (swipeDistance < -threshold && currentPage > 0) {
    // swipe down
    currentPage--;
    scrollToPage(currentPage);
  }
}