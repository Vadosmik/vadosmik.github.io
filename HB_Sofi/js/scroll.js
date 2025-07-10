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