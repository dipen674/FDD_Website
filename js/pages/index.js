document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Tab functionality with smooth transitions
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            const tabContainer = button.closest('.resources-tabs');
            
            // Remove active class from all buttons with animation
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all content with fade out
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                if (content.classList.contains('active')) {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        content.classList.remove('active');
                        
                        // Show new content with fade in
                        const newContent = document.getElementById(tabId);
                        newContent.classList.add('active');
                        
                        // Trigger reflow
                        newContent.offsetHeight;
                        
                        newContent.style.opacity = '1';
                        newContent.style.transform = 'translateY(0)';
                    }, 200);
                } else {
                    content.classList.remove('active');
                }
            });
            
            // If no content was active, show immediately
            if (!tabContainer.querySelector('.tab-content.active')) {
                const newContent = document.getElementById(tabId);
                newContent.classList.add('active');
                newContent.style.opacity = '1';
                newContent.style.transform = 'translateY(0)';
            }
        });
    });

    // Enhanced Testimonial slider with smooth transitions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    let isTransitioning = false;

    if (testimonialCards.length > 0) {
        function showTestimonial(index, direction = 'next') {
            if (isTransitioning) return;
            isTransitioning = true;
            
            const currentCard = document.querySelector('.testimonial-card.active');
            const nextCard = testimonialCards[index];
            
            // Animate out current card
            if (currentCard) {
                currentCard.style.opacity = '0';
                currentCard.style.transform = direction === 'next' ? 
                    'translateX(-50px) scale(0.95)' : 'translateX(50px) scale(0.95)';
                
                setTimeout(() => {
                    currentCard.classList.remove('active');
                    currentCard.style.transform = '';
                    currentCard.style.opacity = '';
                }, 300);
            }
            
            // Animate in next card
            setTimeout(() => {
                nextCard.classList.add('active');
                nextCard.style.opacity = '0';
                nextCard.style.transform = direction === 'next' ? 
                    'translateX(50px) scale(0.95)' : 'translateX(-50px) scale(0.95)';
                
                // Trigger reflow
                nextCard.offsetHeight;
                
                nextCard.style.opacity = '1';
                nextCard.style.transform = 'translateX(0) scale(1)';
                
                setTimeout(() => {
                    nextCard.style.transform = '';
                    nextCard.style.opacity = '';
                    isTransitioning = false;
                }, 400);
            }, currentCard ? 150 : 0);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (isTransitioning) return;
                const newIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
                currentIndex = newIndex;
                showTestimonial(currentIndex, 'prev');
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (isTransitioning) return;
                const newIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
                currentIndex = newIndex;
                showTestimonial(currentIndex, 'next');
            });
        }

        // Enhanced auto-rotate with pause on hover
        let autoRotateInterval;
        
        function startAutoRotate() {
            autoRotateInterval = setInterval(() => {
                if (!isTransitioning) {
                    currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
                    showTestimonial(currentIndex, 'next');
                }
            }, 6000);
        }
        
        function stopAutoRotate() {
            clearInterval(autoRotateInterval);
        }
        
        // Start auto-rotation
        startAutoRotate();
        
        // Pause on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', stopAutoRotate);
            testimonialSlider.addEventListener('mouseleave', startAutoRotate);
        }
    }

    // Enhanced Animation on scroll with staggered effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('programs-grid') || 
                    entry.target.classList.contains('quiz-grid') || 
                    entry.target.classList.contains('features-grid')) {
                    
                    const cards = entry.target.querySelectorAll('.program-card, .quiz-card, .feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('in-view');
                        }, index * 150);
                    });
                }
                
                // Special animation for blog and event cards
                if (entry.target.classList.contains('blog-grid') || 
                    entry.target.classList.contains('events-grid')) {
                    
                    const cards = entry.target.querySelectorAll('.blog-card, .event-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.program-card, .quiz-card, .feature-card, .blog-card, .event-card, .programs-grid, .quiz-grid, .features-grid, .blog-grid, .events-grid').forEach(el => {
        observer.observe(el);
    });

    // Enhanced Newsletter form with validation and animation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        // Add floating label effect
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            emailInput.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        }
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Reset previous states
            emailInput.classList.remove('error', 'success');
            submitBtn.classList.remove('loading');
            
            if (!email) {
                showFormMessage('Please enter your email address.', 'error');
                emailInput.classList.add('error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                emailInput.classList.add('error');
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            
            // Simulate API call
            setTimeout(() => {
                emailInput.classList.add('success');
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                
                showFormMessage(`Thank you for subscribing with: ${email}`, 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    emailInput.classList.remove('success');
                    submitBtn.innerHTML = 'Subscribe';
                    hideFormMessage();
                }, 3000);
            }, 2000);
        });
    }
    
    function showFormMessage(message, type) {
        let messageEl = document.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            newsletterForm.parentNode.insertBefore(messageEl, newsletterForm.nextSibling);
        }
        
        messageEl.textContent = message;
        messageEl.className = `form-message ${type} show`;
    }
    
    function hideFormMessage() {
        const messageEl = document.querySelector('.form-message');
        if (messageEl) {
            messageEl.classList.remove('show');
        }
    }

    // Enhanced hover effects for cards
    function addAdvancedHoverEffects() {
        const cards = document.querySelectorAll('.program-card, .quiz-card, .feature-card, .blog-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'hover-ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
            
            // Add tilt effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);
                
                const rotateX = deltaY * -5;
                const rotateY = deltaX * 5;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Initialize advanced hover effects
    addAdvancedHoverEffects();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const caption = this.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const caption = this.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(100%)';
                caption.style.opacity = '0';
            }
        });
    });

    // Parallax effect for hero section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .cta-section::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Add CSS for enhanced animations
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        .hover-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(42, 157, 143, 0.1);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .form-message {
            margin-top: 15px;
            padding: 12px 20px;
            border-radius: 25px;
            text-align: center;
            font-weight: 500;
            transform: translateY(-10px);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .form-message.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .form-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .newsletter-form input.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
        
        .newsletter-form input.success {
            border-color: #28a745;
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        }
        
        .newsletter-form button.loading {
            background: #6c757d;
            cursor: not-allowed;
        }
        
        .gallery-caption {
            transform: translateY(100%);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .blog-card, .event-card {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Smooth focus states for accessibility */
        .btn:focus,
        .tab-btn:focus,
        .newsletter-form input:focus,
        .newsletter-form button:focus {
            outline: 3px solid rgba(42, 157, 143, 0.3);
            outline-offset: 2px;
        }
        
        /* Reduced motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    `;
    
    document.head.appendChild(enhancedStyles);

    // Initialize intersection observer for performance
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only animate elements that are visible
                entry.target.style.willChange = 'transform, opacity';
            } else {
                // Remove will-change for better performance
                entry.target.style.willChange = 'auto';
            }
        });
    }, { threshold: 0 });

    // Observe all animated elements for performance optimization
    document.querySelectorAll('[class*="card"], [class*="grid"]').forEach(el => {
        performanceObserver.observe(el);
    });

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 100);
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Tab key for focus management
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
        
        // Arrow keys for testimonial navigation
        if (e.key === 'ArrowLeft' && prevBtn) {
            prevBtn.click();
        }
        if (e.key === 'ArrowRight' && nextBtn) {
            nextBtn.click();
        }
        
        // Number keys for tab navigation
        const tabButtons = document.querySelectorAll('.tab-btn');
        const numberKey = parseInt(e.key);
        if (numberKey >= 1 && numberKey <= tabButtons.length) {
            tabButtons[numberKey - 1].click();
        }
    });
    
    // Remove keyboard navigation class on mouse interaction
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    console.log('✨ Enhanced HealSpace interactions initialized!');
});