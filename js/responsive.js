/**
 * Responsive Website Layout with Modern Effects
 * This script handles responsive behavior and cursor effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize responsive features
    setupResponsiveMenu();
    // setupCustomCursor(); // Disabled as per client request
    setupScrollAnimations();
    
    // Handle window resize events with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Update responsive elements on resize
            updateResponsiveElements();
        }, 250);
    });
});

/**
 * Setup responsive mobile menu
 */
function setupResponsiveMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

/**
 * Setup custom cursor - Re-enabled
 */
function setupCustomCursor() {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    cursor.className = 'cursor-outline';
    cursorDot.className = 'cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, .clickable');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'rgba(var(--primary-rgb), 0.8)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'rgba(var(--primary-rgb), 0.5)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/**
 * Setup scroll animations using Intersection Observer
 */
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Optional: Uncomment to keep animations applied once they've triggered
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: Uncomment to reset animations when elements scroll out of view
                    // entry.target.classList.remove('animate');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

/**
 * Update responsive elements on window resize
 */
function updateResponsiveElements() {
    // Update any elements that need to be adjusted on resize
    const windowWidth = window.innerWidth;
    
    // Example: Adjust elements based on window width
    if (windowWidth < 768) {
        // Mobile adjustments
    } else if (windowWidth < 992) {
        // Tablet adjustments
    } else {
        // Desktop adjustments
    }
}

/**
 * Add smooth parallax effect to elements
 * @param {string} selector - CSS selector for elements
 * @param {number} speed - Parallax speed (0-1)
 */
function addParallaxEffect(selector, speed = 0.1) {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementVisible = rect.height + elementTop;
            
            if (scrollY > elementTop - window.innerHeight && scrollY < elementVisible) {
                const yPos = (scrollY - elementTop) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

/**
 * Add tilt effect to elements
 * @param {string} selector - CSS selector for elements
 */
function addTiltEffect(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        element.addEventListener('mousemove', e => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
} 