document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('nav a');
    function initNavigation() {
        burger.addEventListener('click', toggleMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    function toggleMenu() {
        nav.classList.toggle('active');
    }
    function closeMenu() {
        nav.classList.remove('active');
    }
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    });
    initNavigation();
});