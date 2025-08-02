document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinksContainer.classList.contains('active') ?
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
});