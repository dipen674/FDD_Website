document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            const tabContainer = button.closest('.resources-tabs');
            
            // Remove active class from all buttons
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all content and show new content
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const newContent = document.getElementById(tabId);
            if (newContent) {
                newContent.classList.add('active');
            }
        });
    });

    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;

    if (testimonialCards.length > 0) {
        // Initialize testimonials
        function initTestimonials() {
            testimonialCards.forEach((card, index) => {
                card.classList.remove('active');
                if (index === 0) {
                    card.classList.add('active');
                }
            });
        }

        function showTestimonial(newIndex) {
            if (newIndex === currentIndex) return;
            
            testimonialCards[currentIndex].classList.remove('active');
            testimonialCards[newIndex].classList.add('active');
            currentIndex = newIndex;
        }

        // Initialize
        initTestimonials();

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
                showTestimonial(newIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
                showTestimonial(newIndex);
            });
        }

        // Auto-rotate testimonials
        setInterval(() => {
            const newIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(newIndex);
        }, 5000);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && prevBtn) {
                e.preventDefault();
                prevBtn.click();
            }
            if (e.key === 'ArrowRight' && nextBtn) {
                e.preventDefault();
                nextBtn.click();
            }
        });
    }

    // Animation on scroll (simplified)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Staggered animation for grid items
                if (entry.target.classList.contains('programs-grid') || 
                    entry.target.classList.contains('quiz-grid') || 
                    entry.target.classList.contains('features-grid')) {
                    
                    const cards = entry.target.querySelectorAll('.program-card, .quiz-card, .feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('in-view');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.program-card, .quiz-card, .feature-card, .programs-grid, .quiz-grid, .features-grid').forEach(el => {
        observer.observe(el);
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Reset previous states
            emailInput.classList.remove('error', 'success');
            
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
            submitBtn.innerHTML = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                emailInput.classList.add('success');
                submitBtn.innerHTML = 'Subscribed!';
                showFormMessage(`Thank you for subscribing!`, 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    emailInput.classList.remove('success');
                    submitBtn.innerHTML = 'Subscribe';
                    submitBtn.disabled = false;
                    hideFormMessage();
                }, 2000);
            }, 1000);
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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(42, 157, 143, 0.3);
    `;
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Form validation
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
            
            if (this.validity.valueMissing) {
                this.setCustomValidity(`Please fill out the ${this.name || 'field'}.`);
            } else if (this.validity.typeMismatch) {
                this.setCustomValidity('Please enter a valid format.');
            }
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
            this.setCustomValidity('');
        });
    });

    // Mobile detection
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-view');
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    });

    // Accessibility improvements
    document.querySelectorAll('.slider-prev, .slider-next').forEach(button => {
        button.setAttribute('aria-label', button.classList.contains('slider-prev') ? 'Previous testimonial' : 'Next testimonial');
    });

    document.querySelectorAll('.tab-btn').forEach((button, index) => {
        button.setAttribute('aria-label', `Tab ${index + 1}: ${button.textContent}`);
        button.setAttribute('role', 'tab');
    });

    // Keyboard navigation for tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
        
        const tabButtons = document.querySelectorAll('.tab-btn');
        const numberKey = parseInt(e.key);
        if (numberKey >= 1 && numberKey <= tabButtons.length) {
            e.preventDefault();
            tabButtons[numberKey - 1].click();
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // Loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 100);
    });

    console.log('✨ HealSpace initialized successfully!');
});