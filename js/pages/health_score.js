// Health Score JavaScript Functions

// Health data storage (in memory)
let healthData = {
    overall: 85,
    categories: {
        activity: 90,
        nutrition: 75,
        sleep: 80,
        mental: 85,
        hydration: 95,
        fitness: 78
    },
    history: [
        { date: '2025-08-09', score: 78 },
        { date: '2025-08-10', score: 80 },
        { date: '2025-08-11', score: 82 },
        { date: '2025-08-12', score: 84 },
        { date: '2025-08-13', score: 83 },
        { date: '2025-08-14', score: 85 },
        { date: '2025-08-15', score: 85 }
    ],
    lastUpdated: new Date().toLocaleDateString()
};

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHealthScore();
    animateProgressBars();
    initializeMoodSelector();
    drawProgressChart();
    updateRecommendations();
});

// Initialize health score display
function initializeHealthScore() {
    updateOverallScore();
    updateCategoryScores();
    updateLastUpdated();
}

// Update overall score circle
function updateOverallScore() {
    const scoreElement = document.getElementById('overallScore');
    const scoreCircle = document.getElementById('scoreCircle');
    const statusElement = document.getElementById('scoreStatus');
    
    const score = healthData.overall;
    scoreElement.textContent = score;
    
    // Calculate circle progress (565.48 is the circumference)
    const circumference = 565.48;
    const offset = circumference - (score / 100) * circumference;
    scoreCircle.style.strokeDashoffset = offset;
    
    // Update status message
    let status, color;
    if (score >= 90) {
        status = "Outstanding! You're in excellent health!";
        color = "#10b981";
    } else if (score >= 80) {
        status = "Excellent! Keep up the great work!";
        color = "#20b2aa";
    } else if (score >= 70) {
        status = "Good progress! Small improvements can help.";
        color = "#f59e0b";
    } else if (score >= 60) {
        status = "Fair. Focus on key areas for better health.";
        color = "#ef4444";
    } else {
        status = "Let's work together to improve your health!";
        color = "#dc2626";
    }
    
    statusElement.textContent = status;
    statusElement.style.color = color;
    scoreCircle.style.stroke = color;
}

// Update category scores
function updateCategoryScores() {
    Object.entries(healthData.categories).forEach(([category, score]) => {
        const card = document.querySelector(`[data-category="${category}"]`);
        if (card) {
            const progressFill = card.querySelector('.progress-fill');
            const scoreElement = card.querySelector('.category-score');
            const statusElement = card.querySelector('.category-status');
            
            // Update progress bar
            progressFill.setAttribute('data-progress', score);
            scoreElement.textContent = `${score}/100`;
            
            // Update status
            let status, color;
            if (score >= 90) {
                status = "Excellent";
                color = "#10b981";
            } else if (score >= 80) {
                status = "Good";
                color = "#20b2aa";
            } else if (score >= 70) {
                status = "Fair";
                color = "#f59e0b";
            } else {
                status = "Needs Improvement";
                color = "#ef4444";
            }
            
            statusElement.textContent = status;
            statusElement.style.color = color;
        }
    });
}

// Animate progress bars
function animateProgressBars() {
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        });
    }, 500);
}

// Initialize mood selector
function initializeMoodSelector() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    moodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            moodButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
}

// Update health score based on form inputs
function updateHealthScore() {
    const exercise = document.getElementById('exerciseUpdate').value;
    const sleep = parseFloat(document.getElementById('sleepHours').value);
    const water = document.getElementById('waterIntake').value;
    const activeMood = document.querySelector('.mood-btn.active');
    
    if (!exercise || !sleep || !water || !activeMood) {
        alert('Please fill in all fields to update your health score.');
        return;
    }
    
    // Calculate new scores based on inputs
    let activityScore = healthData.categories.activity;
    let sleepScore = healthData.categories.sleep;
    let hydrationScore = healthData.categories.hydration;
    let mentalScore = healthData.categories.mental;
    
    // Update activity score
    switch(exercise) {
        case 'none': activityScore = Math.max(50, activityScore - 10); break;
        case 'light': activityScore = Math.min(100, activityScore + 2); break;
        case 'moderate': activityScore = Math.min(100, activityScore + 5); break;
        case 'intense': activityScore = Math.min(100, activityScore + 8); break;
    }
    
    // Update sleep score
    if (sleep >= 7 && sleep <= 9) {
        sleepScore = Math.min(100, sleepScore + 5);
    } else if (sleep >= 6 || sleep <= 10) {
        sleepScore = Math.max(60, sleepScore - 2);
    } else {
        sleepScore = Math.max(40, sleepScore - 8);
    }
    
    // Update hydration score
    switch(water) {
        case 'low': hydrationScore = Math.max(40, hydrationScore - 15); break;
        case 'moderate': hydrationScore = Math.min(100, hydrationScore + 2); break;
        case 'good': hydrationScore = Math.min(100, hydrationScore + 5); break;
        case 'excellent': hydrationScore = Math.min(100, hydrationScore + 8); break;
    }
    
    // Update mental score based on mood
    const moodValue = parseInt(activeMood.getAttribute('data-mood'));
    if (moodValue >= 4) {
        mentalScore = Math.min(100, mentalScore + 5);
    } else if (moodValue === 3) {
        mentalScore = Math.max(70, mentalScore - 2);
    } else {
        mentalScore = Math.max(40, mentalScore - 8);
    }
    
    // Update health data
    healthData.categories.activity = Math.round(activityScore);
    healthData.categories.sleep = Math.round(sleepScore);
    healthData.categories.hydration = Math.round(hydrationScore);
    healthData.categories.mental = Math.round(mentalScore);
    
    // Calculate new overall score
    const categoryScores = Object.values(healthData.categories);
    const newOverallScore = Math.round(categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length);
    healthData.overall = newOverallScore;
    
    // Update history
    const today = new Date().toISOString().split('T')[0];
    const existingEntry = healthData.history.find(entry => entry.date === today);
    if (existingEntry) {
        existingEntry.score = newOverallScore;
    } else {
        healthData.history.push({ date: today, score: newOverallScore });
        // Keep only last 7 days
        if (healthData.history.length > 7) {
            healthData.history = healthData.history.slice(-7);
        }
    }
    
    healthData.lastUpdated = new Date().toLocaleDateString();
    
    // Refresh displays
    updateOverallScore();
    updateCategoryScores();
    updateLastUpdated();
    animateProgressBars();
    updateRecommendations();
    drawProgressChart();
    
    // Reset form
    document.getElementById('exerciseUpdate').value = '';
    document.getElementById('sleepHours').value = '';
    document.getElementById('waterIntake').value = '';
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show success message
    showNotification('Health score updated successfully!', 'success');
}

// Update last updated date
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    lastUpdatedElement.textContent = healthData.lastUpdated;
}

// Draw progress chart
function drawProgressChart() {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart settings
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxScore = 100;
    const minScore = 0;
    
    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        ctx.fillStyle = '#718096';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        const score = maxScore - (maxScore / 5) * i;
        ctx.fillText(score.toString(), padding - 10, y + 4);
    }
    
    // Vertical grid lines and X-axis labels
    const data = healthData.history;
    for (let i = 0; i < data.length; i++) {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        
        ctx.strokeStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
        
        // X-axis labels
        ctx.fillStyle = '#718096';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        const date = new Date(data[i].date);
        const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        ctx.fillText(dateLabel, x, height - padding + 20);
    }
    
    // Draw the line chart
    if (data.length > 1) {
        ctx.strokeStyle = '#20b2aa';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = padding + (chartWidth / (data.length - 1)) * i;
            const y = padding + chartHeight - ((data[i].score - minScore) / (maxScore - minScore)) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#20b2aa';
        for (let i = 0; i < data.length; i++) {
            const x = padding + (chartWidth / (data.length - 1)) * i;
            const y = padding + chartHeight - ((data[i].score - minScore) / (maxScore - minScore)) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add score labels on hover points
            ctx.fillStyle = '#2d3748';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(data[i].score.toString(), x, y - 10);
            ctx.fillStyle = '#20b2aa';
        }
    }
}

// Update recommendations based on current scores
function updateRecommendations() {
    const recommendations = [];
    const categories = healthData.categories;
    
    // Generate recommendations based on lowest scoring categories
    const sortedCategories = Object.entries(categories).sort((a, b) => a[1] - b[1]);
    
    sortedCategories.slice(0, 3).forEach(([category, score]) => {
        let rec = getRecommendationForCategory(category, score);
        if (rec) recommendations.push(rec);
    });
    
    // Update recommendations display
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    if (recommendationsGrid && recommendations.length > 0) {
        recommendationsGrid.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="rec-icon">${rec.icon}</div>
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <button class="rec-action" onclick="${rec.action}">${rec.actionText}</button>
            </div>
        `).join('');
    }
}

// Get recommendation for specific category
function getRecommendationForCategory(category, score) {
    const recommendations = {
        activity: {
            icon: '💪',
            title: 'Boost Physical Activity',
            description: 'Try a 30-minute walk or your favorite workout to improve your activity score.',
            action: 'showActivityTips()',
            actionText: 'Get Exercise Tips'
        },
        nutrition: {
            icon: '🥗',
            title: 'Improve Nutrition',
            description: 'Add more fruits and vegetables to your meals for better nutritional balance.',
            action: 'showNutritionTips()',
            actionText: 'View Meal Plans'
        },
        sleep: {
            icon: '😴',
            title: 'Better Sleep Quality',
            description: 'Aim for 7-9 hours of quality sleep to boost your overall health score.',
            action: 'showSleepTips()',
            actionText: 'Sleep Better'
        },
        mental: {
            icon: '🧠',
            title: 'Mental Wellness',
            description: 'Practice mindfulness or meditation to improve your mental health score.',
            action: 'showMentalHealthTips()',
            actionText: 'Try Meditation'
        },
        hydration: {
            icon: '💧',
            title: 'Stay Hydrated',
            description: 'Drink more water throughout the day to maintain optimal hydration.',
            action: 'showHydrationTips()',
            actionText: 'Water Reminders'
        },
        fitness: {
            icon: '🏋️‍♂️',
            title: 'Improve Fitness Level',
            description: 'Try strength training or cardio exercises to boost your overall fitness score.',
            action: 'showFitnessTips()',
            actionText: 'View Workouts'
        }
    };
    
    return recommendations[category];
}

// Recommendation action functions
function showFitnessTips() {
    // Redirect to your actual fitness page
    window.location.href = '../pages/fitness.html';
}

function showNutritionTips() {
    // Redirect to your actual vegan recipes page
    window.location.href = '../pages/vegan_recipes.html';
}

function showSleepTips() {
    showNotification('Loading sleep improvement tips...', 'info');
    // In a real app, this would navigate to sleep tips page
}

function showMentalHealthTips() {
    // Redirect to your recovery resources page for mental wellness
    window.location.href = '../pages/recovery_resources.html';
}

function showHydrationTips() {
    // Redirect to habit tracker for hydration tracking
    window.location.href = '../pages/habit_tracker.html';
}

function showActivityTips() {
    // Redirect to your fitness page
    window.location.href = '../pages/fitness.html';
}

// Export health data function
function exportHealthData() {
    const dataStr = JSON.stringify(healthData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `health_data_${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Health data exported successfully!', 'success');
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#20b2aa',
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Category card click handlers
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showCategoryDetails(category);
        });
    });
});

// Show category details
function showCategoryDetails(category) {
    const score = healthData.categories[category];
    const categoryNames = {
        activity: 'Physical Activity',
        nutrition: 'Nutrition',
        sleep: 'Sleep Quality',
        mental: 'Mental Wellness',
        hydration: 'Hydration',
        heart: 'Heart Health'
    };
    
    const categoryTips = {
        activity: 'Regular physical activity helps maintain a healthy weight, strengthens muscles and bones, and improves mental health.',
        nutrition: 'A balanced diet rich in fruits, vegetables, whole grains, and lean proteins supports overall health and energy levels.',
        sleep: 'Quality sleep is essential for physical recovery, mental clarity, and immune system function.',
        mental: 'Mental wellness includes stress management, emotional balance, and maintaining positive relationships.',
        hydration: 'Proper hydration supports every body function, from temperature regulation to joint lubrication.',
        fitness: 'Fitness level includes cardiovascular endurance, strength training, and overall physical performance.'
    };
    
    showNotification(`${categoryNames[category]}: ${score}/100. ${categoryTips[category]}`, 'info');
}

// Initialize animations when elements come into view
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.category-card, .recommendation-card, .score-card').forEach(el => {
        observer.observe(el);
    });
}

// Call scroll animations on load
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);