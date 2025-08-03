// Veganism Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeTabs();
    initializeComparisonTabs();
    initializeScrollAnimations();
    initializeCounters();
    initializeParallaxEffects();
});

// Tab functionality for Benefits section
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Trigger animation for newly shown content
                animateTabContent(targetContent);
            }
        });
    });
}

// Tab functionality for Comparison section
function initializeComparisonTabs() {
    const compTabButtons = document.querySelectorAll('.comp-tab-btn');
    const compTabContents = document.querySelectorAll('.comparison-content');

    compTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-comparison');
            
            // Remove active class from all buttons and contents
            compTabButtons.forEach(btn => btn.classList.remove('active'));
            compTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Trigger animation for newly shown content
                animateTabContent(targetContent);
            }
        });
    });
}

// Animate tab content when it becomes visible
function animateTabContent(content) {
    const elements = content.querySelectorAll('.benefit-card, .impact-stat, .ethical-card, .health-metric, .env-metric, .myth-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('benefit-card')) {
                    animateBenefitCard(entry.target);
                } else if (entry.target.classList.contains('myth-card')) {
                    animateMythCard(entry.target);
                } else if (entry.target.classList.contains('step')) {
                    animateStep(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.definition-card, .benefit-card, .impact-stat, .ethical-card, .myth-card, .step, .env-metric');
    elementsToAnimate.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
    });
}

// Animate benefit cards
function animateBenefitCard(card) {
    const icon = card.querySelector('.benefit-icon');
    const stat = card.querySelector('.benefit-stat .number');
    
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        }, 200);
    }
    
    if (stat) {
        animateCounter(stat);
    }
}

// Animate myth cards
function animateMythCard(card) {
    const mythHeader = card.querySelector('.myth-header');
    const truthHeader = card.querySelector('.truth-header');
    
    if (mythHeader && truthHeader) {
        setTimeout(() => {
            truthHeader.style.transform = 'translateX(0)';
            truthHeader.style.opacity = '1';
        }, 500);
    }
}

// Animate steps
function animateStep(step) {
    const stepNumber = step.querySelector('.step-number');
    const listItems = step.querySelectorAll('li');
    
    if (stepNumber) {
        setTimeout(() => {
            stepNumber.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                stepNumber.style.transform = 'scale(1) rotate(360deg)';
            }, 600);
        }, 200);
    }
    
    listItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
}

// Initialize counters and statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .benefit-stat .number, .savings-amount');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber) {
            counter.textContent = '0';
        }
    });
}

// Animate counters
function animateCounter(element) {
    const target = element.getAttribute('data-target') || element.textContent;
    const isNumber = !isNaN(parseFloat(target));
    
    if (!isNumber) return;
    
    const finalValue = parseFloat(target);
    const duration = 2000;
    const step = finalValue / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
        }
        
        // Format the number based on the original format
        if (target.includes('%')) {
            element.textContent = Math.round(current) + '%';
        } else if (target.includes(',')) {
            element.textContent = Math.round(current).toLocaleString();
        } else if (target.includes('.')) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Parallax effects for hero section
function initializeParallaxEffects() {
    const floatingCard = document.querySelector('.floating-card');
    const heroStats = document.querySelectorAll('.stat');
    
    if (floatingCard) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            
            floatingCard.style.transform = `translateY(-${parallax}px)`;
        });
    }
    
    // Floating animation for hero stats
    heroStats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
        stat.classList.add('floating-stat');
    });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Interactive hover effects for cards
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.definition-card, .benefit-card, .ethical-card, .myth-card, .step')) {
        const card = e.target.closest('.definition-card, .benefit-card, .ethical-card, .myth-card, .step');
        card.style.transform = 'translateY(-10px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.definition-card, .benefit-card, .ethical-card, .myth-card, .step')) {
        const card = e.target.closest('.definition-card, .benefit-card, .ethical-card, .myth-card, .step');
        card.style.transform = 'translateY(0) scale(1)';
    }
});

// Dynamic progress bars for environmental impact
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.env-bar-fill, .metric-bar, .cost-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width || '0%';
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 200);
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize progress bar animations
animateProgressBars();

// Add loading states for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.tab-btn.active, .comp-tab-btn.active');
        if (activeTab) {
            const tabs = activeTab.parentNode.querySelectorAll('.tab-btn, .comp-tab-btn');
            const currentIndex = Array.from(tabs).indexOf(activeTab);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs[newIndex].click();
            tabs[newIndex].focus();
        }
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .floating-stat {
        animation: gentleFloat 3s ease-in-out infinite;
    }
    
    @keyframes gentleFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    .myth-card .truth-header {
        transform: translateX(-20px);
        opacity: 0;
        transition: all 0.6s ease;
    }
    
    .step li {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.4s ease;
    }
    
    img.lazy {
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;

document.head.appendChild(style);