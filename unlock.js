let startY;
let currentY;
let moving = false;

const page = document.querySelector('.slide-page');

page.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
    moving = true;
});

page.addEventListener('touchmove', function(e) {
    if (!moving) {
        return;
    }

    currentY = e.touches[0].clientY;
    let diff = startY - currentY;

    if (diff > 0) { // if we are moving up the screen
        page.style.bottom = `${diff}px`;
    }
});

page.addEventListener('touchend', function(e) {
    moving = false;
    if (parseInt(page.style.bottom) > window.innerHeight / 2) { // if the page has been moved more than halfway up the screen
        page.style.bottom = '100vh'; // animate the rest of the way off the screen
        setTimeout(function() {
            window.location.href = "home.html"; // then navigate to the home page
        }, 200); // this delay should match the transition time in the CSS
    } else {
        page.style.bottom = '0'; // animate back to the original position
    }
});


const pages = document.querySelector('.pages');
let currentPage = 0;

document.getElementById('slide').addEventListener('click', () => {
    currentPage = (currentPage + 1) % 2; // This should be the number of pages
    pages.style.transform = `translateX(-${currentPage * 100}vw)`;
});