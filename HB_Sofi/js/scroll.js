let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;

let isScrolling = false;

function scrollToPage(index) {
  isScrolling = true;
  window.scrollTo({
    top: index * window.innerHeight,
    behavior: 'smooth'
  });
  setTimeout(() => isScrolling = false, 1000);
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

// Zapewnia start od góry po odświeżeniu
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));