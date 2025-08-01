document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    const isMobile = window.innerWidth <= 992;
    let dropdownTimeout;
    const HOVER_DELAY = 300;
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (isMobile) {
            dropdownLink.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = dropdown.classList.contains('open');
                dropdowns.forEach(d => {
                    d.classList.remove('open');
                    d.querySelector('a').setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    dropdown.classList.add('open');
                    dropdownLink.setAttribute('aria-expanded', 'true');
                }
            });
        } else {
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(dropdownTimeout);
                dropdowns.forEach(d => {
                    d.classList.remove('open');
                    d.querySelector('a').setAttribute('aria-expanded', 'false');
                });
                dropdown.classList.add('open');
                dropdownLink.setAttribute('aria-expanded', 'true');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                clearTimeout(dropdownTimeout);
                dropdownTimeout = setTimeout(() => {
                    dropdown.classList.remove('open');
                    dropdownLink.setAttribute('aria-expanded', 'false');
                }, HOVER_DELAY);
            });
            
            if (dropdownContent) {
                dropdownContent.addEventListener('mouseenter', () => {
                    clearTimeout(dropdownTimeout);
                    dropdown.classList.add('open');
                    dropdownLink.setAttribute('aria-expanded', 'true');
                });
                
                dropdownContent.addEventListener('mouseleave', () => {
                    clearTimeout(dropdownTimeout);
                    dropdownTimeout = setTimeout(() => {
                        dropdown.classList.remove('open');
                        dropdownLink.setAttribute('aria-expanded', 'false');
                    }, HOVER_DELAY);
                });
            }
        }
        
        // Keyboard navigation
        dropdownLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = dropdown.classList.contains('open');
                dropdowns.forEach(d => {
                    d.classList.remove('open');
                    d.querySelector('a').setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    dropdown.classList.add('open');
                    dropdownLink.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-menu-btn')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
                const dropdownLink = dropdown.querySelector('a');
                if (dropdownLink) dropdownLink.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    // Update mobile detection on resize
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 992;
        if (newIsMobile !== isMobile) {
            location.reload(); // Reload to reapply correct event listeners
        }
    });
    
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
            
            // Hide all tab content
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Testimonial slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    
    if(testimonialCards.length > 0) {
        function showTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialCards[index].classList.add('active');
        }
        
        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
                showTestimonial(currentIndex);
            });
        }
        
        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
                showTestimonial(currentIndex);
            });
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.program-card, .quiz-card, .feature-card, .blog-card').forEach(el => {
        observer.observe(el);
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // In a real app, you would send this to your server
            alert(`Thank you for subscribing with: ${email}`);
            this.reset();
        });
    }
});