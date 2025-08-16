// Community Forum JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const newDiscussionBtn = document.getElementById('newDiscussionBtn');
    const newDiscussionModal = document.getElementById('newDiscussionModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const discussionForm = document.getElementById('newDiscussionForm');
    const categoryFilters = document.querySelectorAll('.category-filters li');
    const discussionCards = document.querySelectorAll('.discussion-card');
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Open new discussion modal
    if(newDiscussionBtn) {
        newDiscussionBtn.addEventListener('click', function() {
            newDiscussionModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            newDiscussionModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === newDiscussionModal) {
            newDiscussionModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    if(discussionForm) {
        discussionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('discussionTitle').value;
            const category = document.getElementById('discussionCategory').value;
            const content = document.getElementById('discussionContent').value;
            const tags = document.getElementById('discussionTags').value;
            
            // In a real app, you would send this data to the server
            console.log('New Discussion:', { title, category, content, tags });
            
            // Show success message
            alert('Discussion created successfully!');
            
            // Reset form and close modal
            discussionForm.reset();
            newDiscussionModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Category filtering
    if(categoryFilters.length > 0) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active filter
                categoryFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Filter discussions
                discussionCards.forEach(card => {
                    if(category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Highlight category cards
                if(category !== 'all') {
                    categoryCards.forEach(card => {
                        if(card.getAttribute('data-category') === category) {
                            card.style.transform = 'scale(1.03)';
                            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                            setTimeout(() => {
                                card.style.transform = '';
                                card.style.boxShadow = '';
                            }, 500);
                        }
                    });
                }
            });
        });
    }
    
    // Category card interaction
    if(categoryCards.length > 0) {
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active filter
                categoryFilters.forEach(f => f.classList.remove('active'));
                document.querySelector(`.category-filters li[data-category="${category}"]`).classList.add('active');
                
                // Filter discussions
                discussionCards.forEach(card => {
                    if(card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Discussion card interaction
    if(discussionCards.length > 0) {
        discussionCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't navigate if user clicked on a button or link inside the card
                if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
                
                // In a real app, this would navigate to the discussion page
                alert('This would open the discussion page in a real application.');
            });
        });
    }
});