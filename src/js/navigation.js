document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    let lastScrollTop = 0;
    let isScrolling;
    function setActiveNavItem() {
        const navLinks = document.querySelectorAll('.nav-list a');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        const currentPath = window.location.pathname;
        const currentPageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        console.log('Current path:', currentPath);
        console.log('Current page name:', currentPageName);
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            const linkPageName = linkPath.substring(linkPath.lastIndexOf('/') + 1);
            console.log('Checking link:', linkPath, 'Page name:', linkPageName);
            if (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/KITTLFALTN/') || currentPageName === '' || currentPageName === 'index.html') {
                if (linkPath === '#home' || linkPath.includes('index.html') || linkPath === '/') {
                    link.classList.add('active');
                    console.log('Home page active');
                }
            }
            else if (currentPageName === 'about-kathi.html' || currentPageName === 'about-peter.html' || currentPageName === 'about.html') {
                if (link.classList.contains('dropdown-toggle')) {
                    link.classList.add('active');
                    console.log('About dropdown active');
                }
            }
            else if (currentPageName === linkPageName) {
                link.classList.add('active');
                console.log('Page active by filename match:', currentPageName);
            }
            else if (currentPath.includes('gallery.html') && linkPath.includes('gallery.html')) {
                link.classList.add('active');
                console.log('Gallery page active');
            }
            else if (currentPath.includes('music.html') && linkPath.includes('music.html')) {
                link.classList.add('active');
                console.log('Music page active');
            }
            else if (currentPath.includes('events.html') && linkPath.includes('events.html')) {
                link.classList.add('active');
                console.log('Events page active');
            }
            else if (currentPath.includes('supporters.html') && linkPath.includes('supporters.html')) {
                link.classList.add('active');
                console.log('Supporters page active');
            }
            else if (currentPath.includes('contact.html') && linkPath.includes('contact.html')) {
                link.classList.add('active');
                console.log('Contact page active');
            }
        });
    }
    setActiveNavItem();
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.parentElement;
            document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            dropdown.classList.toggle('active');
        });
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    const backToTopButton = document.createElement('a');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '&#8679;'; 
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        clearTimeout(isScrolling);
        if (currentScroll > 100) { 
            if (currentScroll > lastScrollTop) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
        }
        if (currentScroll > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        isScrolling = setTimeout(() => {
            navbar.classList.remove('hidden');
        }, 500);
    });
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});