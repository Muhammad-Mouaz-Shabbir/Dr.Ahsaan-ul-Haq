document.addEventListener('DOMContentLoaded', function() {
    console.log('Case Studies JS loaded');
    
    // Initialize slider elements
    const caseSlider = document.querySelector('.case-slider');
    const caseCards = document.querySelectorAll('.case-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const counterDots = document.querySelectorAll('.counter-dot');
    
    // Set initial state
    let currentIndex = 0;
    let isAnimating = false;
    const animationDuration = 800; // Match this with CSS transition duration (in ms)
    
    // Display first card and hide others initially
    caseCards.forEach((card, index) => {
        if (index === 0) {
            card.classList.add('active');
            card.style.transform = 'translateX(0) rotateY(0)';
            card.style.opacity = '1';
        } else {
            card.style.transform = 'translateX(100px) rotateY(10deg)';
            card.style.opacity = '0';
        }
    });
    
    // Make sure first dot is active
    counterDots[0].classList.add('active');
    
    // Function to update slider
    function updateSlider() {
        // Prevent rapid clicking during animation
        if (isAnimating) return;
        isAnimating = true;
        
        // Add animation class to slider
        caseSlider.classList.add('animating');
        
        // Hide all cards first
        caseCards.forEach((card, index) => {
            if (index !== currentIndex) {
                card.classList.remove('active');
                
                // Direction based animation
                if (index < currentIndex) {
                    card.style.transform = 'translateX(-100px) rotateY(-10deg)';
                } else {
                    card.style.transform = 'translateX(100px) rotateY(10deg)';
                }
                
                card.style.opacity = '0';
                card.style.zIndex = '1';
            }
        });
        
        // Show current card with animation
        setTimeout(() => {
            caseCards[currentIndex].classList.add('active');
            caseCards[currentIndex].style.transform = 'translateX(0) rotateY(0)';
            caseCards[currentIndex].style.opacity = '1';
            caseCards[currentIndex].style.zIndex = '5';
            
            // Add ripple effect to buttons
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            if (currentIndex > 0) {
                prevBtn.appendChild(ripple.cloneNode(true));
                setTimeout(() => {
                    if (prevBtn.querySelector('.ripple-effect')) {
                        prevBtn.removeChild(prevBtn.querySelector('.ripple-effect'));
                    }
                }, 700);
            }
            
            // Update counter dots with animation
            counterDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                    dot.style.transform = 'scale(1.2)';
                } else {
                    dot.classList.remove('active');
                    dot.style.transform = 'scale(1)';
                }
            });
            
            // Animation complete
            setTimeout(() => {
                isAnimating = false;
                caseSlider.classList.remove('animating');
            }, animationDuration);
        }, 50);
    }
    
    // Next button click with enhanced animation
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Next button clicked');
        
        if (isAnimating) return;
        
        // Add click animation to button
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        
        setTimeout(() => {
            if (this.querySelector('.ripple-effect')) {
                this.removeChild(this.querySelector('.ripple-effect'));
            }
        }, 700);
        
        currentIndex = (currentIndex + 1) % caseCards.length;
        updateSlider();
    });
    
    // Previous button click with enhanced animation
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Previous button clicked');
        
        if (isAnimating) return;
        
        // Add click animation to button
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        
        setTimeout(() => {
            if (this.querySelector('.ripple-effect')) {
                this.removeChild(this.querySelector('.ripple-effect'));
            }
        }, 700);
        
        currentIndex = (currentIndex - 1 + caseCards.length) % caseCards.length;
        updateSlider();
    });
    
    // Counter dots click with enhanced animation
    counterDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (isAnimating || currentIndex === index) return;
            
            console.log('Dot clicked, new index:', index);
            
            // Add click animation
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
            
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Optional: Auto-slide
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % caseCards.length;
            updateSlider();
        }, 7000); // Change slide every 7 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover
    caseSlider.addEventListener('mouseenter', stopAutoSlide);
    caseSlider.addEventListener('mouseleave', startAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });
    
    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    caseSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    caseSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next
            nextBtn.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous
            prevBtn.click();
        }
    }
    
    // Add box shadow effect on card hover
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('active')) {
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                this.style.transform = 'translateY(-5px) rotateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('active')) {
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
                this.style.transform = 'translateY(0) rotateY(0)';
            }
        });
    });
}); 