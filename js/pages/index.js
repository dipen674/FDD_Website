document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    // This toggles the mobile navigation menu when the button is clicked
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle the 'active' class to show/hide the menu
            navLinks.classList.toggle('active');
            // Change the button icon between bars and times based on menu state
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Dropdown functionality
    // Handles the behavior of dropdown menus based on screen size
    const dropdowns = document.querySelectorAll('.dropdown');
    const isMobile = window.innerWidth <= 992; // Detects if screen is mobile (≤ 992px)
    let dropdownTimeout; // Stores timeout for hover delay
    const HOVER_DELAY = 250; // Delay in ms before closing dropdown on mouse leave

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a'); // The link that triggers the dropdown
        const dropdownContent = dropdown.querySelector('.dropdown-content'); // The dropdown menu

        if (isMobile) {
            // Mobile behavior: Click to toggle dropdown
            dropdownLink.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                const isOpen = dropdown.classList.contains('open');
                // Close all other dropdowns
                dropdowns.forEach(d => {
                    d.classList.remove('open');
                    d.querySelector('a').setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    // Open the clicked dropdown
                    dropdown.classList.add('open');
                    dropdownLink.setAttribute('aria-expanded', 'true');
                }
            });
        } else {
            // Desktop behavior: Hover to open/close dropdown
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(dropdownTimeout); // Cancel any pending close
                // Close all other dropdowns
                dropdowns.forEach(d => {
                    d.classList.remove('open');
                    d.querySelector('a').setAttribute('aria-expanded', 'false');
                });
                dropdown.classList.add('open');
                dropdownLink.setAttribute('aria-expanded', 'true');
            });

            dropdown.addEventListener('mouseleave', () => {
                clearTimeout(dropdownTimeout);
                // Schedule dropdown to close after delay
                dropdownTimeout = setTimeout(() => {
                    dropdown.classList.remove('open');
                    dropdownLink.setAttribute('aria-expanded', 'false');
                }, HOVER_DELAY);
            });

            if (dropdownContent) {
                // Keep dropdown open while hovering over content
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

        // Keyboard navigation for accessibility
        dropdownLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = dropdown.classList.contains('open');
                // Close all other dropdowns
                dropdowns.forEach(d => {
                    d.classList.remove('open');
                    d.querySelector('a').setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    dropdown.classList.add('open');
                    dropdownLink.setAttribute('aria-expanded', 'true');
                    dropdownContent.querySelector('a')?.focus(); // Focus first link
                }
            }
        });

        // Focus events to keep dropdown open during tab navigation
        dropdownContent.addEventListener('focusin', () => {
            clearTimeout(dropdownTimeout);
            dropdown.classList.add('open');
            dropdownLink.setAttribute('aria-expanded', 'true');
        }, true);

        dropdownContent.addEventListener('focusout', (e) => {
            if (!dropdownContent.contains(e.relatedTarget)) {
                // Close if focus moves outside dropdown content
                dropdownTimeout = setTimeout(() => {
                    dropdown.classList.remove('open');
                    dropdownLink.setAttribute('aria-expanded', 'false');
                }, HOVER_DELAY);
            }
        }, true);
    });

    // Close dropdowns when clicking outside
    // Ensures dropdowns close when user clicks elsewhere
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
    // Reloads page to reapply correct event listeners on screen size change
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 992;
        if (newIsMobile !== isMobile) {
            location.reload();
        }
    });

    // Tab functionality
    // Handles switching between tabbed content
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
    // Manages the cycling of testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;

    if (testimonialCards.length > 0) {
        function showTestimonial(index) {
            // Remove active class from all cards and add to the current one
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialCards[index].classList.add('active');
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
                showTestimonial(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
                showTestimonial(currentIndex);
            });
        }

        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        }, 5000);
    }

    // Animation on scroll
    // Adds 'in-view' class when elements enter the viewport
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
    // Handles form submission with a simple alert
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // In a real app, send this to a server
            alert(`Thank you for subscribing with: ${email}`);
            this.reset(); // Clear the form
        });
    }
});