// Expert Q&A Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const specialtyFilter = document.getElementById('specialty-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const expertCards = document.querySelectorAll('.expert-card');
    const askQuestionBtns = document.querySelectorAll('.ask-question-btn');
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const modal = document.getElementById('questionModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const questionForm = document.getElementById('questionForm');
    const questionExpert = document.getElementById('questionExpert');
    const toast = document.getElementById('notificationToast');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    
    let currentTestimonial = 0;
    
    // Filter Experts
    function filterExperts() {
        const specialty = specialtyFilter.value;
        const availability = availabilityFilter.value;
        
        expertCards.forEach(card => {
            const cardSpecialty = card.getAttribute('data-specialty');
            const cardAvailability = card.getAttribute('data-availability');
            
            let showCard = true;
            
            // Specialty filter
            if(specialty !== 'all' && cardSpecialty !== specialty) {
                showCard = false;
            }
            
            // Availability filter
            if(availability !== 'all' && cardAvailability !== availability) {
                showCard = false;
            }
            
            card.style.display = showCard ? 'block' : 'none';
        });
    }
    
    // Apply filters when selection changes
    specialtyFilter.addEventListener('change', filterExperts);
    availabilityFilter.addEventListener('change', filterExperts);
    
    // Modal functionality
    function openModal(expertName) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        if(expertName) {
            document.getElementById('modal-title').textContent = `Ask ${expertName} a Question`;
            questionExpert.value = expertName;
        } else {
            document.getElementById('modal-title').textContent = 'Ask Your Question';
        }
    }
    
    askQuestionBtn.addEventListener('click', () => {
        openModal();
    });
    
    askQuestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const expertName = this.getAttribute('data-expert');
            openModal(expertName);
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const expert = questionExpert.value;
        const topic = document.getElementById('questionTopic').value;
        const details = document.getElementById('questionDetails').value;
        
        // In a real app, this would send data to a server
        console.log('Question submitted:', {
            expert, topic, details
        });
        
        // Show success toast
        toast.style.display = 'block';
        toast.querySelector('.toast-message').textContent = 'Your question has been submitted successfully!';
        
        // Hide toast after 3 seconds and close modal
        setTimeout(() => {
            toast.style.display = 'none';
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            questionForm.reset();
        }, 3000);
    });
    
    // Testimonial slider
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    prevTestimonialBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextTestimonialBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
});