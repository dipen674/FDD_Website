// recovery_resources.js

document.addEventListener('DOMContentLoaded', function() {
    // Resource category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            // Filter resources
            resourceCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientHeight)
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.resource-card, .contact-card, .community-card');
        
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check on load
    handleScrollAnimations();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimations);
});