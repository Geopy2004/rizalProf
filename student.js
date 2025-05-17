document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Elements
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');
    const overlay = document.getElementById('overlay');
    
    // Theme Toggle Elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Mobile Menu Toggle Function
    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Event Listeners for Mobile Menu
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on nav links (mobile)
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Theme Toggle Functionality
    function getPreferredTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    
    // Initialize theme
    applyTheme(getPreferredTheme());
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Close menu when resizing to desktop
    function handleResize() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    window.addEventListener('resize', handleResize);
});