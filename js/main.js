document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission and show success popup
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        
        // Create success popup elements only if it doesn't already exist
        let successPopup = document.querySelector('.success-popup');
        
        if (!successPopup) {
            successPopup = document.createElement('div');
            successPopup.className = 'success-popup';
            
            const successPopupContent = document.createElement('div');
            successPopupContent.className = 'success-popup-content';
            
            successPopupContent.innerHTML = `
                <div class="success-popup-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p><span class="sender-name"></span> Your message has been sent. We will contact you as soon as possible.</p>
                <button class="success-popup-close">OK</button>
            `;
            
            successPopup.appendChild(successPopupContent);
            document.body.appendChild(successPopup);
            
            // Close popup when button is clicked
            const closeButton = successPopup.querySelector('.success-popup-close');
            closeButton.addEventListener('click', () => {
                successPopup.classList.remove('active');
            });
        }
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');
                const serviceInput = document.getElementById('service');
                const messageInput = document.getElementById('message');
                
                // Validate form
                if (!nameInput.value || !emailInput.value || !phoneInput.value || !serviceInput.value || !messageInput.value) {
                    showStatus('error', 'Please fill in all fields.');
                    return;
                }
                
                // Show loading state
                showStatus('loading', 'Sending message...');
                
                // Disable submit button
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.disabled = true;
                
                // Prepare form data
                const formData = new FormData(contactForm);
                
                // Send form data using fetch
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Reset form
                    contactForm.reset();
                    
                    // Hide status message
                    formStatus.style.display = 'none';
                    
                    // Get the sender's name
                    const senderName = nameInput.value;
                    
                    // Set sender name in popup
                    const senderNameElement = successPopup.querySelector('.sender-name');
                    senderNameElement.textContent = senderName + ',';
                    
                    // Show success popup
                    successPopup.classList.add('active');
                    
                    // Enable submit button
                    submitBtn.disabled = false;
                })
                .catch(error => {
                    console.error('Error:', error);
                    showStatus('error', 'There was a problem sending your message. Please try again.');
                    
                    // Enable submit button
                    submitBtn.disabled = false;
                });
            });
        }
        
        function showStatus(type, message) {
            if (formStatus) {
                formStatus.className = 'form-status';
                formStatus.classList.add(type);
                
                let icon = '';
                if (type === 'success') {
                    icon = '<i class="fas fa-check-circle"></i>';
                } else if (type === 'error') {
                    icon = '<i class="fas fa-times-circle"></i>';
                } else if (type === 'loading') {
                    icon = '<div class="loading-spinner"></div>';
                }
                
                formStatus.innerHTML = `${icon} <span>${message}</span>`;
                formStatus.style.display = 'flex';
                
                if (type !== 'loading') {
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            }
        }
    }

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-menu')) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('header nav a, .hero-buttons a, .about-cta a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            if (scrollDownBtn) {
                scrollDownBtn.style.opacity = '0';
            }
        } else {
            header.classList.remove('scrolled');
            if (scrollDownBtn) {
                scrollDownBtn.style.opacity = '1';
            }
        }
    });

    // Back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // WhatsApp button hover effect
    const whatsappButton = document.querySelector('.whatsapp-button a');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('mouseenter', function() {
            this.querySelector('i').classList.add('fa-beat');
        });
        
        whatsappButton.addEventListener('mouseleave', function() {
            this.querySelector('i').classList.remove('fa-beat');
        });
    }

    // Counter Animation for About Section with improved animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.innerText.replace('+', ''));
            const duration = 2000; // Animation duration in milliseconds
            const startTime = performance.now();
            let currentCount = 0;
            
            const easeOutQuart = t => 1 - Math.pow(1 - t, 4); // Easing function for smoother animation
            
            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeOutQuart(progress);
                
                currentCount = Math.floor(target * easedProgress);
                counter.innerText = currentCount + (counter.innerText.includes('+') ? '+' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
                }
            };
            
            requestAnimationFrame(updateCounter);
        });
    }

    // Scroll Animation for About Section
    function setupScrollAnimations() {
        const aboutCards = document.querySelectorAll('.about-card');
        const counterItems = document.querySelectorAll('.counter-item');
        const qualificationItems = document.querySelectorAll('.qualification-item');
        
        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const observer = new IntersectionObserver(animateOnScroll, {
            root: null,
            threshold: 0.2,
            rootMargin: '0px'
        });
        
        // Add animation classes and observe elements
        aboutCards.forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.animationDelay = `${index * 0.2}s`;
            observer.observe(card);
        });
        
        counterItems.forEach((item, index) => {
            item.classList.add('fade-in-up');
            item.style.animationDelay = `${0.4 + (index * 0.15)}s`;
            observer.observe(item);
        });
        
        qualificationItems.forEach((item, index) => {
            item.classList.add('fade-in-right');
            item.style.animationDelay = `${0.6 + (index * 0.15)}s`;
            observer.observe(item);
        });
    }

    // Intersection Observer for About Section
    function setupIntersectionObserver() {
        const aboutSection = document.querySelector('#about');
        
        if (!aboutSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    setupScrollAnimations();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(aboutSection);
    }

    setupIntersectionObserver();

    // 3D hover effect for practice cards
    function setup3DCardEffect() {
        const cards = document.querySelectorAll('.practice-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the card
                const y = e.clientY - rect.top; // y position within the card
                
                // Calculate rotation based on mouse position
                // We divide by 25 to limit the rotation angle
                const rotateY = ((x - rect.width / 2) / 25);
                const rotateX = -((y - rect.height / 2) / 25);
                
                // Apply the rotation and translation
                card.style.transform = `translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                
                // Move the icon based on mouse position for parallax effect
                const icon = card.querySelector('.practice-icon');
                if (icon) {
                    icon.style.transform = `translateZ(50px) translateX(${rotateY}px) translateY(${-rotateX}px)`;
                }
                
                // Add a subtle light reflection effect
                const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
                card.style.backgroundImage = shine;
            });
            
            // Reset the card when mouse leaves
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
                card.style.backgroundImage = 'none';
                
                const icon = card.querySelector('.practice-icon');
                if (icon) {
                    icon.style.transform = 'translateZ(30px)';
                }
            });
            
            // Add a click effect
            card.addEventListener('mousedown', () => {
                card.style.transform = 'translateZ(10px) rotateX(0) rotateY(0) scale(0.98)';
            });
            
            card.addEventListener('mouseup', () => {
                card.style.transform = 'translateZ(20px) rotateX(0) rotateY(0)';
            });
        });
    }

    // Setup 3D card effect
    setup3DCardEffect();

    // Testimonials Animation
    function setupTestimonialsAnimation() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        // Add animation classes to testimonial cards
        testimonialCards.forEach((card, index) => {
            // Add animation delay based on index
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Add star rating animation
            const stars = card.querySelectorAll('.testimonial-rating i');
            stars.forEach((star, i) => {
                // Set custom property for staggered animation
                star.style.setProperty('--i', i + 1);
            });
            
            // Add hover effect for quote icon
            const quoteIcon = card.querySelector('.quote-icon');
            if (quoteIcon) {
                card.addEventListener('mouseenter', () => {
                    quoteIcon.style.transform = 'scale(1.2) rotate(10deg)';
                    quoteIcon.style.opacity = '0.15';
                });
                
                card.addEventListener('mouseleave', () => {
                    quoteIcon.style.transform = 'scale(1) rotate(0deg)';
                    quoteIcon.style.opacity = '0.1';
                });
            }
        });
        
        // Setup intersection observer for testimonial cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate', 'fadeInUp');
                    observer.unobserve(entry.target);
                    
                    // Animate stars when card comes into view
                    const stars = entry.target.querySelectorAll('.testimonial-rating i');
                    stars.forEach((star, i) => {
                        setTimeout(() => {
                            star.classList.add('star-animate');
                        }, i * 150);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        testimonialCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Setup testimonials animation
    setupTestimonialsAnimation();

    // Setup contact form only once
    setupContactForm();
});
