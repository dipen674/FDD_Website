// Sobriety tracker functionality
document.addEventListener('DOMContentLoaded', function() {
    const daysSoberElement = document.getElementById('days-sober');
    const moneySavedElement = document.getElementById('money-saved');
    const healthImprovedElement = document.getElementById('health-improved');
    const progressPercentElement = document.getElementById('progress-percent');
    const progressBar = document.querySelector('.progress-bar');
    const addDayBtn = document.getElementById('add-day-btn');
    
    // Initialize values from localStorage or set defaults
    let daysSober = parseInt(localStorage.getItem('sobrietyDays')) || 0;
    let moneyPerDay = 15; // Average money saved per day
    
    // Update the display
    function updateTracker() {
        daysSoberElement.textContent = daysSober;
        moneySavedElement.textContent = `$${(daysSober * moneyPerDay).toLocaleString()}`;
        
        // Health improvement calculation
        const healthImprovement = Math.min(100, Math.floor(daysSober * 0.5));
        healthImprovedElement.textContent = `${healthImprovement}%`;
        
        // Progress circle (90-day goal)
        const progress = Math.min(100, Math.floor((daysSober / 90) * 100));
        progressPercentElement.textContent = `${progress}%`;
        progressBar.style.background = `conic-gradient(var(--accent) ${progress * 3.6}deg, transparent 0deg)`;
        
        // Save to localStorage
        localStorage.setItem('sobrietyDays', daysSober);
    }
    
    // Add a day button
    addDayBtn.addEventListener('click', function() {
        daysSober++;
        updateTracker();
        
        // Show celebration after milestones
        if (daysSober % 30 === 0) {
            showMilestoneMessage(daysSober);
        }
    });
    
    // Show milestone celebration
    function showMilestoneMessage(days) {
        const message = document.createElement('div');
        message.className = 'milestone-message';
        message.innerHTML = `
            <div class="milestone-content">
                <i class="fas fa-medal"></i>
                <h3>Congratulations!</h3>
                <p>You've reached ${days} days of sobriety!</p>
                <p>That's an incredible achievement!</p>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(message);
            }, 500);
        }, 4000);
    }
    
    // Initialize the tracker
    updateTracker();
    
    // Add animation to resource cards on scroll
    const resourceCards = document.querySelectorAll('.resource-card');
    
    function animateOnScroll() {
        resourceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        });
    }
    
    // Set initial state for animation
    resourceCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});