document.addEventListener('DOMContentLoaded', () => {
    // Retrieve scores from localStorage
    const storedScores = localStorage.getItem('healthScores');
    const noDataMessage = document.getElementById('no-data-message');
    const planContainer = document.querySelector('.plan-container');
    const headerActions = document.querySelector('.content-header .header-actions');

    if (!storedScores) {
        noDataMessage.style.display = 'block';
        planContainer.style.display = 'none';
        headerActions.style.display = 'none';
        return;
    }

    const scores = JSON.parse(storedScores);
    const { totalPercentage, categories } = scores;

    // Update Hero Stats
    document.getElementById('overall-percentage').textContent = `${totalPercentage}%`;
    document.getElementById('physical-percentage').textContent = `${categories.physical.perc}%`;
    document.getElementById('nutrition-percentage').textContent = `${categories.nutrition.perc}%`;
    document.getElementById('mental-percentage').textContent = `${categories.mental.perc}%`;

    // Helper to determine score level and color
    function getOverallLevel(percentage) {
        if (percentage >= 80) return { level: 'Excellent', color: '#27ae60' };
        if (percentage >= 60) return { level: 'Good', color: '#f39c12' };
        if (percentage >= 40) return { level: 'Fair', color: '#e67e22' };
        return { level: 'Needs Improvement', color: '#e74c3c' };
    }

    // Update Section Scores with colors
    function setScoreWithColor(elId, perc) {
        const el = document.getElementById(elId);
        const { color } = getOverallLevel(perc);
        el.textContent = `${perc}%`;
        el.style.color = color;
    }

    setScoreWithColor('physical-score', categories.physical.perc);
    setScoreWithColor('nutrition-score', categories.nutrition.perc);
    setScoreWithColor('mental-score', categories.mental.perc);
    setScoreWithColor('lifestyle-score', categories.lifestyle.perc);

    // Generate Goals Dynamically
    function generateGoals(category, perc) {
        const goals = [];
        if (perc < 50) {
            goals.push({
                icon: 'fa-exclamation-triangle',
                title: 'Priority Improvement',
                desc: 'Focus on basics to build foundation.',
                steps: ['Assess current limitations', 'Set micro-goals', 'Track daily']
            });
            goals.push({
                icon: 'fa-walking',
                title: 'Daily Activity',
                desc: 'Start with 15-min walks daily.',
                steps: ['Choose a time', 'Wear comfortable shoes', 'Increase duration gradually']
            });
            goals.push({
                icon: 'fa-bed',
                title: 'Sleep Hygiene',
                desc: 'Establish consistent sleep schedule.',
                steps: ['Set bedtime alarm', 'Avoid screens before bed', 'Create relaxing routine']
            });
        } else if (perc < 70) {
            goals.push({
                icon: 'fa-chart-line',
                title: 'Consistent Progress',
                desc: 'Aim for gradual improvements weekly.',
                steps: ['Review weekly', 'Adjust as needed', 'Celebrate small wins']
            });
            goals.push({
                icon: 'fa-dumbbell',
                title: 'Strength Training',
                desc: 'Add 2 sessions per week.',
                steps: ['Learn proper form', 'Start with bodyweight', 'Progress to weights']
            });
            goals.push({
                icon: 'fa-heartbeat',
                title: 'Cardio Boost',
                desc: 'Incorporate 20-min cardio 3x/week.',
                steps: ['Choose fun activities', 'Monitor heart rate', 'Build endurance']
            });
        } else {
            goals.push({
                icon: 'fa-trophy',
                title: 'Advanced Goals',
                desc: 'Challenge yourself with new activities.',
                steps: ['Try new sports', 'Set performance targets', 'Compete friendly']
            });
            goals.push({
                icon: 'fa-running',
                title: 'Endurance Building',
                desc: 'Try longer workouts.',
                steps: ['Plan routes', 'Hydrate properly', 'Recover actively']
            });
            goals.push({
                icon: 'fa-yoga',
                title: 'Flexibility Training',
                desc: 'Daily yoga sessions.',
                steps: ['Follow videos', 'Focus on breath', 'Track flexibility']
            });
        }

        // Category-specific goals
        if (category === 'physical') {
            goals.push({
                icon: 'fa-bed',
                title: 'Sleep Optimization',
                desc: 'Aim for 7-9 hours nightly.',
                steps: ['Dark room', 'Consistent schedule', 'No caffeine evening']
            });
        } else if (category === 'nutrition') {
            goals.push({
                icon: 'fa-carrot',
                title: 'Veggie Boost',
                desc: '5+ servings of fruits/veggies daily.',
                steps: ['Meal prep', 'Variety colors', 'Seasonal choices']
            });
            goals.push({
                icon: 'fa-glass-water',
                title: 'Hydration',
                desc: 'Drink 8 glasses of water daily.',
                steps: ['Carry bottle', 'Set reminders', 'Infuse flavors']
            });
            goals.push({
                icon: 'fa-balance-scale',
                title: 'Portion Control',
                desc: 'Mindful eating practices.',
                steps: ['Use smaller plates', 'Eat slowly', 'Listen to hunger']
            });
        } else if (category === 'mental') {
            goals.push({
                icon: 'fa-medkit',
                title: 'Stress Management',
                desc: 'Practice 10-min meditation daily.',
                steps: ['Find quiet spot', 'Use app guidance', 'Journal after']
            });
            goals.push({
                icon: 'fa-book-open',
                title: 'Journaling',
                desc: 'Write daily reflections.',
                steps: ['Set time', 'Prompt questions', 'Review weekly']
            });
            goals.push({
                icon: 'fa-smile',
                title: 'Positive Affirmations',
                desc: 'Daily positive self-talk.',
                steps: ['Mirror practice', 'Write notes', 'Share with others']
            });
        } else if (category === 'lifestyle') {
            goals.push({
                icon: 'fa-ban',
                title: 'Habit Breaking',
                desc: 'Reduce screen time by 1 hour daily.',
                steps: ['Set limits', 'Alternative activities', 'Track usage']
            });
            goals.push({
                icon: 'fa-users',
                title: 'Social Connection',
                desc: 'Connect with friends weekly.',
                steps: ['Schedule calls', 'Meet in person', 'Join groups']
            });
            goals.push({
                icon: 'fa-calendar-check',
                title: 'Time Management',
                desc: 'Prioritize tasks daily.',
                steps: ['Make lists', 'Use timers', 'Review end of day']
            });
        }

        return goals;
    }

    function renderGoals(category, perc) {
        const goalsList = document.querySelector(`#${category}-section .goals-list`);
        const goals = generateGoals(category, perc);
        goalsList.innerHTML = ''; // Clear existing content
        goals.forEach((goal, index) => {
            const goalId = `${category}-goal-${index}`;
            const completed = localStorage.getItem(goalId) === 'true';
            const goalHtml = `
                <div class="goal-item ${completed ? 'completed' : ''}" data-goal-id="${goalId}" 
                     data-title="${goal.title}" data-desc="${goal.desc}" 
                     data-steps="${goal.steps.join('|')}">
                    <input type="checkbox" class="goal-checkbox" ${completed ? 'checked' : ''}>
                    <i class="fas ${goal.icon}"></i>
                    <div class="goal-content">
                        <h4>${goal.title}</h4>
                        <p>${goal.desc}</p>
                    </div>
                </div>
            `;
            goalsList.insertAdjacentHTML('beforeend', goalHtml);
        });

        // Update initial progress
        updateSectionProgress(category);
    }

    function updateSectionProgress(category) {
        const goals = document.querySelectorAll(`#${category}-section .goal-item`);
        const completed = Array.from(goals).filter(g => g.classList.contains('completed')).length;
        const progress = goals.length ? (completed / goals.length) * 100 : 0;
        const progressFill = document.getElementById(`${category}-progress`);
        progressFill.style.width = `${progress}%`;
        if (progress === 100) {
            celebrate();
        }
    }

    // Render goals for each category
    renderGoals('physical', categories.physical.perc);
    renderGoals('nutrition', categories.nutrition.perc);
    renderGoals('mental', categories.mental.perc);
    renderGoals('lifestyle', categories.lifestyle.perc);

    // Radar Chart
    const ctx = document.getElementById('healthRadarChart')?.getContext('2d');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Physical', 'Nutrition', 'Mental', 'Lifestyle'],
                datasets: [
                    {
                        label: 'Your Scores',
                        data: [
                            categories.physical.perc,
                            categories.nutrition.perc,
                            categories.mental.perc,
                            categories.lifestyle.perc
                        ],
                        backgroundColor: 'rgba(42, 157, 143, 0.2)',
                        borderColor: 'var(--primary)',
                        borderWidth: 2,
                        pointBackgroundColor: 'var(--primary)'
                    },
                    {
                        label: 'Target',
                        data: [100, 100, 100, 100],
                        backgroundColor: 'rgba(233, 196, 106, 0.2)',
                        borderColor: 'var(--accent)',
                        borderWidth: 1,
                        pointBackgroundColor: 'var(--accent)'
                    }
                ]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20 }
                    }
                },
                elements: {
                    line: { tension: 0.4 }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw}%`
                        }
                    }
                }
            }
        });
    }

    // Expand/Collapse Sections
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
            const section = header.closest('.plan-section');
            section.classList.toggle('collapsed');
        });
    });

    // Goal Checkboxes
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('goal-checkbox')) {
            const goalItem = e.target.closest('.goal-item');
            const goalId = goalItem.dataset.goalId;
            const completed = e.target.checked;
            goalItem.classList.toggle('completed', completed);
            localStorage.setItem(goalId, completed);
            const category = goalId.split('-')[0];
            updateSectionProgress(category);
        }
    });

    // Goal Click for Modal
    document.addEventListener('click', (e) => {
        const goalItem = e.target.closest('.goal-item');
        if (goalItem && !e.target.classList.contains('goal-checkbox')) {
            const modal = document.getElementById('goal-modal');
            const title = document.getElementById('modal-title');
            const desc = document.getElementById('modal-desc');
            const steps = document.getElementById('modal-steps');
            const markBtn = document.getElementById('mark-complete');

            title.textContent = goalItem.dataset.title;
            desc.textContent = goalItem.dataset.desc;
            const stepsArray = goalItem.dataset.steps.split('|');
            steps.innerHTML = `<h4>Steps to Achieve:</h4><ul>${stepsArray.map(s => `<li>${s}</li>`).join('')}</ul>`;

            markBtn.onclick = () => {
                const checkbox = goalItem.querySelector('.goal-checkbox');
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                modal.style.display = 'none';
            };

            modal.style.display = 'flex';
        }
    });

    // Close Modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('goal-modal').style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('goal-modal')) {
            e.target.style.display = 'none';
        }
    });

    // Print Plan
    document.getElementById('print-plan').addEventListener('click', () => {
        window.print();
    });

    // Share Plan (simulated)
    document.getElementById('share-plan').addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Plan link copied to clipboard!'))
            .catch(() => alert('Failed to copy link. Please try again.'));
    });

    // Regenerate Plan
    document.getElementById('regenerate-plan').addEventListener('click', () => {
        localStorage.removeItem('healthScores');
        window.location.href = 'self_assessment.html';
    });

    // Join Challenge (simulated)
    document.getElementById('join-challenge').addEventListener('click', () => {
        alert('You\'ve joined the 30-Day Challenge! Check your email for details.');
        celebrate();
    });

    // Celebration Confetti
    function celebrate() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
});