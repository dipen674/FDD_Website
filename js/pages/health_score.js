// health_score.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the circular progress
    const progressElement = document.querySelector('.circle-progress');
    const percent = parseInt(progressElement.getAttribute('data-percent'));
    const rotation = (percent / 100) * 360;
    
    // Set rotation after a short delay to trigger animation
    setTimeout(() => {
        progressElement.style.transform = `rotate(${rotation}deg)`;
    }, 300);
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
    
    // Initialize chart
    const ctx = document.getElementById('healthScoreChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Health Score',
                data: [65, 59, 70, 68, 72, 75, 72],
                backgroundColor: 'rgba(42, 157, 143, 0.1)',
                borderColor: '#2a9d8f',
                borderWidth: 3,
                tension: 0.3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#2a9d8f',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif",
                        size: 13
                    },
                    padding: 10,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });
    
    // Time filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would fetch new data
            // For demo, we'll just show a message
            console.log(`Filter changed to: ${this.textContent}`);
        });
    });
    
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