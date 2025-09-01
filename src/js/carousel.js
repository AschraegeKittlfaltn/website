let slideIndex = 0;
let prevIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
function showSlide(n, direction = 'next') {
    prevIndex = slideIndex; 
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active', 'prev-slide', 'next-slide');
        if (i !== slideIndex && i !== prevIndex) {
            if (direction === 'next') {
                slides[i].classList.add('next-slide');
            } else {
                slides[i].classList.add('prev-slide');
            }
        }
    }
    if (prevIndex !== slideIndex) {
        if (direction === 'next') {
            slides[prevIndex].classList.add('prev-slide');
        } else {
            slides[prevIndex].classList.add('next-slide');
        }
    }
    slides[slideIndex].classList.add('active');
}
let carouselTimer;
const autoRotateDelay = 8000;
function startAutoRotateTimer() {
    clearTimeout(carouselTimer);
    carouselTimer = setTimeout(nextSlide, autoRotateDelay);
}
function nextSlide() {
    let next = slideIndex + 1;
    if (next >= slides.length) next = 0;
    showSlide(next, 'next');
    startAutoRotateTimer();
}
function prevSlide() {
    let prev = slideIndex - 1;
    if (prev < 0) prev = slides.length - 1;
    showSlide(prev, 'prev');
    startAutoRotateTimer();
}
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < slides.length; i++) {
        if (i === 0) {
            slides[i].classList.add('active');
        } else {
            slides[i].classList.add('next-slide');
        }
    }
    startAutoRotateTimer();
});