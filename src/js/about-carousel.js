let aboutSlideIndex = 0;
let aboutPrevIndex = 0;
let aboutSlides = [];
let aboutDots = [];
let aboutCarouselTimer;
const aboutAutoRotateDelay = 5000;
function initAboutCarousel() {
    aboutSlides = document.querySelectorAll('.about-carousel .carousel-item');
    aboutDots = document.querySelectorAll('.carousel-dots .dot');
    if (aboutSlides.length === 0) return;
    for (let i = 0; i < aboutSlides.length; i++) {
        aboutSlides[i].classList.remove('active', 'prev-slide', 'next-slide');
        if (i === 0) {
            aboutSlides[i].classList.add('active');
        } else {
            aboutSlides[i].classList.add('next-slide');
        }
    }
    updateActiveDot();
    startAboutAutoRotateTimer();
}
function updateActiveDot() {
    if (aboutDots.length === 0) return;
    aboutDots.forEach(dot => dot.classList.remove('active'));
    if (aboutDots[aboutSlideIndex]) {
        aboutDots[aboutSlideIndex].classList.add('active');
    }
}
function showAboutSlide(n, direction = 'next') {
    if (aboutSlides.length === 0) return;
    aboutPrevIndex = aboutSlideIndex;
    if (n >= aboutSlides.length) {
        aboutSlideIndex = 0;
    } else if (n < 0) {
        aboutSlideIndex = aboutSlides.length - 1;
    } else {
        aboutSlideIndex = n;
    }
    for (let i = 0; i < aboutSlides.length; i++) {
        aboutSlides[i].classList.remove('active', 'prev-slide', 'next-slide');
        if (i !== aboutSlideIndex && i !== aboutPrevIndex) {
            if (direction === 'next') {
                aboutSlides[i].classList.add('next-slide');
            } else {
                aboutSlides[i].classList.add('prev-slide');
            }
        }
    }
    if (aboutPrevIndex !== aboutSlideIndex) {
        if (direction === 'next') {
            aboutSlides[aboutPrevIndex].classList.add('prev-slide');
        } else {
            aboutSlides[aboutPrevIndex].classList.add('next-slide');
        }
    }
    aboutSlides[aboutSlideIndex].classList.add('active');
    updateActiveDot();
}
function currentAboutSlide(n) {
    const targetIndex = n - 1;
    const direction = targetIndex > aboutSlideIndex ? 'next' : 'prev';
    showAboutSlide(targetIndex, direction);
    startAboutAutoRotateTimer();
}
function startAboutAutoRotateTimer() {
    clearTimeout(aboutCarouselTimer);
    aboutCarouselTimer = setTimeout(nextAboutSlide, aboutAutoRotateDelay);
}
function nextAboutSlide() {
    let next = aboutSlideIndex + 1;
    if (next >= aboutSlides.length) next = 0;
    showAboutSlide(next, 'next');
    startAboutAutoRotateTimer();
}
function prevAboutSlide() {
    let prev = aboutSlideIndex - 1;
    if (prev < 0) prev = aboutSlides.length - 1;
    showAboutSlide(prev, 'prev');
    startAboutAutoRotateTimer();
}
function addAboutCarouselClickHandlers() {
    if (aboutSlides.length === 0) return;
    aboutSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (index !== aboutSlideIndex) {
                const direction = index > aboutSlideIndex ? 'next' : 'prev';
                showAboutSlide(index, direction);
                startAboutAutoRotateTimer();
            }
        });
        slide.style.cursor = 'pointer';
    });
}
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initAboutCarousel();
        addAboutCarouselClickHandlers();
    }, 100);
});
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearTimeout(aboutCarouselTimer);
    } else {
        startAboutAutoRotateTimer();
    }
});
