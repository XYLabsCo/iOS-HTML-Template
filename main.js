const pages = document.querySelector('.pages');
let currentPage = 0;
let startX;
let currentX;
let movingPages = false;

pages.addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX;
  movingPages = true;
});

pages.addEventListener('touchmove', function (e) {
  if (!movingPages) {
    return;
  }

  currentX = e.touches[0].clientX;
  let diff = startX - currentX;

  if (diff > 0) { // Swiping to the left
    pages.style.transform = `translateX(calc(-${currentPage * 100}vw - ${diff}px))`;
  } else if (diff < 0) { // Swiping to the right
    pages.style.transform = `translateX(calc(-${currentPage * 100}vw - ${diff}px))`;
  }

  e.preventDefault(); // Prevent vertical scrolling on touchmove
});

pages.addEventListener('touchend', function (e) {
  movingPages = false;
  let diff = startX - currentX;
  let threshold = window.innerWidth * 0.25; // Adjust the threshold for determining a valid swipe

  if (diff > threshold && currentPage < 1) { // Swiped to the left
    currentPage++;
  } else if (diff < -threshold && currentPage > 0) { // Swiped to the right
    currentPage--;
  }

  pages.style.transition = 'transform 0.3s ease-in-out'; // Add CSS transition property
  pages.style.transform = `translateX(-${currentPage * 100}vw)`; // Set the final position using CSS transition

  // Reset transition after the transition is complete
  setTimeout(function () {
    pages.style.transition = '';
  }, 300);
});

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('open');
}
