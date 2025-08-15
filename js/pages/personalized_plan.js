// Personalized Plan JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize floating bubbles
    function initBubbles() {
        anime({
            targets: '.bubble',
            translateY: [0, -20],
            translateX: [0, 15],
            duration: 3000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
            delay: anime.stagger(200)
        });
    }

    // Tab switching
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const planSections = document.querySelectorAll('.plan-section');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and sections
                tabBtns.forEach(b => b.classList.remove('active'));
                planSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding section
                const tabId = btn.getAttribute('data-tab');
                const activeSection = document.getElementById(tabId);
                if (activeSection) {
                    activeSection.classList.add('active');
                    // Animate section entrance
                    anime({
                        targets: activeSection,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
    }

    // Initialize charts
    function initCharts() {
        // Weekly Progress Chart
        const weeklyCtx = document.getElementById('weeklyChart');
        if (weeklyCtx) {
            const weeklyChart = new Chart(weeklyCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Plan Completion %',
                        data: [45, 60, 75, 70, 80, 65, 90],
                        borderColor: '#2a9d8f',
                        backgroundColor: 'rgba(42, 157, 143, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(42, 157, 143, 0.9)',
                            titleFont: {
                                size: 14,
                                family: "'Poppins', sans-serif"
                            },
                            bodyFont: {
                                size: 13,
                                family: "'Poppins', sans-serif"
                            },
                            padding: 12,
                            displayColors: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                },
                                font: {
                                    family: "'Poppins', sans-serif"
                                }
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
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
        }
        
        // Goals Completion Chart
        const goalsCtx = document.getElementById('goalsChart');
        if (goalsCtx) {
            const goalsChart = new Chart(goalsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In Progress', 'Not Started'],
                    datasets: [{
                        data: [7, 3, 2],
                        backgroundColor: [
                            '#2ecc71',
                            '#f39c12',
                            '#e74c3c'
                        ],
                        borderWidth: 0,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    family: "'Poppins', sans-serif",
                                    size: 13
                                },
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(42, 157, 143, 0.9)',
                            titleFont: {
                                size: 14,
                                family: "'Poppins', sans-serif"
                            },
                            bodyFont: {
                                size: 13,
                                family: "'Poppins', sans-serif"
                            },
                            padding: 12,
                            displayColors: false
                        }
                    }
                }
            });
        }
        
        // Step Chart for Fitness Goal
        const stepCtx = document.getElementById('stepChart');
        if (stepCtx) {
            const stepChart = new Chart(stepCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Daily Steps',
                        data: [8450, 9200, 7800, 10250, 9500, 11200, 8245],
                        backgroundColor: 'rgba(42, 157, 143, 0.7)',
                        borderColor: '#2a9d8f',
                        borderWidth: 1,
                        borderRadius: 6,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
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
        }
    }

    // Goal card interactions
    function initGoalInteractions() {
        const goalCards = document.querySelectorAll('.goal-card');
        
        goalCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // Update progress button animation
    function initUpdateButton() {
        const updateBtn = document.getElementById('updateProgressBtn');
        
        if (updateBtn) {
            updateBtn.addEventListener('click', function() {
                anime({
                    targets: this,
                    rotate: 360,
                    duration: 800,
                    easing: 'easeInOutQuad',
                    complete: function() {
                        // Simulate progress update
                        const progressFill = document.querySelector('.progress-fill');
                        const newWidth = Math.min(100, parseFloat(progressFill.style.width) + 5);
                        progressFill.style.width = newWidth + '%';
                        
                        // Show notification
                        const notification = document.createElement('div');
                        notification.className = 'notification';
                        notification.innerHTML = '<i class="fas fa-check-circle"></i> Progress updated successfully!';
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                            notification.classList.add('show');
                            setTimeout(() => {
                                notification.classList.remove('show');
                                setTimeout(() => {
                                    document.body.removeChild(notification);
                                }, 300);
                            }, 3000);
                        }, 10);
                    }
                });
            });
        }
    }

    // Initialize everything
    initBubbles();
    initTabs();
    initCharts();
    initGoalInteractions();
    initUpdateButton();

    // Add animation to summary cards on page load
    anime({
        targets: '.summary-card',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuad'
    });
});