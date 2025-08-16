// personalized_plan.js

document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('start-date').textContent = now.toLocaleDateString('en-US', options);
    
    // Print plan functionality
    const printButton = document.getElementById('print-plan');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Animate progress bars on page load
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
    
    // Update health score based on progress
    const healthScoreElement = document.getElementById('health-score');
    if (healthScoreElement) {
        // In a real app, this would come from backend/database
        // For demo, we'll calculate based on progress
        const progressElements = document.querySelectorAll('.progress-fill');
        let totalProgress = 0;
        
        progressElements.forEach(p => {
            const width = parseFloat(p.style.width);
            if (!isNaN(width)) {
                totalProgress += width;
            }
        });
        
        // Calculate average progress as health score
        const avgProgress = totalProgress / progressElements.length;
        const healthScore = Math.min(100, Math.max(0, Math.round(avgProgress * 0.8)));
        
        healthScoreElement.textContent = healthScore;
    }
    
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});