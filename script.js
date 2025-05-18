document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with smooth rotation
        const icon = this.querySelector('i');
        icon.style.transition = 'transform 0.3s ease';
        icon.style.transform = 'rotate(180deg)';
        
        setTimeout(() => {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.transform = 'rotate(0deg)';
        }, 150);
    });

    // Set initial icon based on theme
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        this.setAttribute('aria-expanded', this.classList.contains('active'));
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Gallery Lightbox
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    const images = [];
    
    // Initialize gallery
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption').textContent;
        images.push({ src: img.src, caption: caption });
        
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        lightbox.style.display = 'block';
        updateLightbox();
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function updateLightbox() {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
});