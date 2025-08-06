document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resetButton = document.querySelector('.reset-btn');
    const planCards = document.querySelectorAll('.plan-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter plan cards
            planCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    resetButton.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterButtons[0].classList.add('active'); // 'All' button
        planCards.forEach(card => {
            card.style.display = 'block';
        });
    });


    
    // Modal functionality
    const modal = document.getElementById('plan-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    const viewPlanButtons = document.querySelectorAll('.view-plan-btn');

    const planDetails = {
        'beginner-strength': {
            title: 'Beginner Strength Plan',
            description: 'Kickstart your fitness journey with this beginner-friendly strength plan.',
            details: [
                'Duration: 4 weeks',
                'Equipment: Bodyweight, Dumbbells (optional)',
                'Workouts: 3 per week',
                'Focus: Build muscle, improve form'
            ],
            weeklyBreakdown: [
                'Week 1: Bodyweight basics (Squats, Push-ups)',
                'Week 2: Introduce light weights',
                'Week 3: Increase reps and sets',
                'Week 4: Full-body circuit'
            ],
            sampleExercises: [
                'Bodyweight Squats: 3 sets of 12',
                'Push-ups: 3 sets of 10',
                'Plank: 3 sets of 30 seconds'
            ]
        },
        'cardio-blast': {
            title: 'Cardio Blast Plan',
            description: 'Boost your endurance with high-energy cardio workouts.',
            details: [
                'Duration: 6 weeks',
                'Equipment: None',
                'Workouts: 4 per week',
                'Focus: Cardiovascular health, calorie burn'
            ],
            weeklyBreakdown: [
                'Week 1: Steady-state running',
                'Week 2: Interval sprints',
                'Week 3: Cardio circuits',
                'Week 4-6: Increase intensity'
            ],
            sampleExercises: [
                'Jumping Jacks: 3 sets of 30 seconds',
                'Burpees: 3 sets of 10',
                'Mountain Climbers: 3 sets of 20'
            ]
        },
        'yoga-flexibility': {
            title: 'Yoga & Flexibility Plan',
            description: 'Enhance mobility and reduce stress with yoga and stretching.',
            details: [
                'Duration: 8 weeks',
                'Equipment: Yoga mat',
                'Workouts: 3-4 per week',
                'Focus: Flexibility, relaxation'
            ],
            weeklyBreakdown: [
                'Week 1-2: Basic yoga poses',
                'Week 3-4: Dynamic stretching',
                'Week 5-6: Flow sequences',
                'Week 7-8: Advanced poses'
            ],
            sampleExercises: [
                'Downward Dog: 3 sets of 30 seconds',
                'Child’s Pose: 3 sets of 30 seconds',
                'Cat-Cow Stretch: 3 sets of 10'
            ]
        },
        'recovery-flow': {
            title: 'Recovery Flow Plan',
            description: 'Gentle exercises to support physical and mental recovery.',
            details: [
                'Duration: 4 weeks',
                'Equipment: None',
                'Workouts: 3 per week',
                'Focus: Recovery, mobility'
            ],
            weeklyBreakdown: [
                'Week 1: Gentle stretching',
                'Week 2: Light mobility',
                'Week 3: Restorative yoga',
                'Week 4: Mindfulness integration'
            ],
            sampleExercises: [
                'Neck Rolls: 3 sets of 10',
                'Seated Forward Fold: 3 sets of 30 seconds',
                'Breathing Exercises: 5 minutes'
            ]
        },
        'advanced-strength': {
            title: 'Advanced Strength Plan',
            description: 'Intense weightlifting and functional training for experienced fitness enthusiasts.',
            details: [
                'Duration: 12 weeks',
                'Equipment: Barbells, Dumbbells',
                'Workouts: 5 per week',
                'Focus: Muscle growth, strength'
            ],
            weeklyBreakdown: [
                'Week 1-3: Compound lifts',
                'Week 4-6: Progressive overload',
                'Week 7-9: Functional training',
                'Week 10-12: Peak performance'
            ],
            sampleExercises: [
                'Deadlifts: 4 sets of 8',
                'Bench Press: 4 sets of 8',
                'Pull-ups: 3 sets of 10'
            ]
        },
        'hiit-cardio': {
            title: 'HIIT Cardio Plan',
            description: 'Maximize fat burn with High-Intensity Interval Training.',
            details: [
                'Duration: 6 weeks',
                'Equipment: None',
                'Workouts: 4 per week',
                'Focus: Fat loss, endurance'
            ],
            weeklyBreakdown: [
                'Week 1-2: Short intervals',
                'Week 3-4: Mixed circuits',
                'Week 5-6: High-intensity intervals'
            ],
            sampleExercises: [
                'High Knees: 3 sets of 30 seconds',
                'Burpees: 3 sets of 12',
                'Squat Jumps: 3 sets of 15'
            ]
        },
        'strength-cardio-hybrid': {
            title: 'Strength & Cardio Hybrid Plan',
            description: 'Combine strength and cardio for a balanced fitness routine.',
            details: [
                'Duration: 8 weeks',
                'Equipment: Dumbbells, Jump Rope',
                'Workouts: 4 per week',
                'Focus: Muscle building, endurance'
            ],
            weeklyBreakdown: [
                'Week 1-2: Strength focus',
                'Week 3-4: Cardio integration',
                'Week 5-6: Hybrid circuits',
                'Week 7-8: Full-body challenge'
            ],
            sampleExercises: [
                'Kettlebell Swings: 3 sets of 15',
                'Jump Rope: 3 sets of 1 minute',
                'Lunges: 3 sets of 12'
            ]
        },
        'pilates-core': {
            title: 'Pilates Core Plan',
            description: 'Strengthen your core and improve flexibility with Pilates-inspired workouts.',
            details: [
                'Duration: 6 weeks',
                'Equipment: Yoga mat',
                'Workouts: 3 per week',
                'Focus: Core strength, flexibility'
            ],
            weeklyBreakdown: [
                'Week 1-2: Core fundamentals',
                'Week 3-4: Dynamic movements',
                'Week 5-6: Advanced core work'
            ],
            sampleExercises: [
                'Hundred: 3 sets of 10 breaths',
                'Single Leg Stretch: 3 sets of 12',
                'Plank to Pike: 3 sets of 10'
            ]
        },
        'mindful-recovery': {
            title: 'Mindful Recovery Plan',
            description: 'Restorative exercises with meditation to support mental and physical healing.',
            details: [
                'Duration: 4 weeks',
                'Equipment: None',
                'Workouts: 3 per week',
                'Focus: Recovery, mindfulness'
            ],
            weeklyBreakdown: [
                'Week 1: Gentle stretches',
                'Week 2: Guided meditation',
                'Week 3: Restorative flow',
                'Week 4: Mindful movement'
            ],
            sampleExercises: [
                'Seated Meditation: 5 minutes',
                'Gentle Spinal Twist: 3 sets of 30 seconds',
                'Legs Up the Wall: 5 minutes'
            ]
        },
        'ultimate-fitness': {
            title: 'Ultimate Fitness Challenge',
            description: 'A high-intensity hybrid plan for peak performance and total body transformation.',
            details: [
                'Duration: 12 weeks',
                'Equipment: Dumbbells, Pull-up Bar',
                'Workouts: 5 per week',
                'Focus: Strength, endurance, agility'
            ],
            weeklyBreakdown: [
                'Week 1-3: Strength and cardio',
                'Week 4-6: Agility training',
                'Week 7-9: High-intensity circuits',
                'Week 10-12: Peak performance'
            ],
            sampleExercises: [
                'Box Jumps: 3 sets of 12',
                'Pull-ups: 3 sets of 8',
                'Burpee Tuck Jumps: 3 sets of 10'
            ]
        }
    };

    viewPlanButtons.forEach(button => {
        button.addEventListener('click', () => {
            const planId = button.getAttribute('data-plan');
            const plan = planDetails[planId];

            // Populate modal content
            modalBody.innerHTML = `
                <h3>${plan.title}</h3>
                <p>${plan.description}</p>
                <ul>
                    ${plan.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
                <h4>Weekly Breakdown</h4>
                <ul>
                    ${plan.weeklyBreakdown.map(week => `<li>${week}</li>`).join('')}
                </ul>
                <h4>Sample Exercises</h4>
                <ul>
                    ${plan.sampleExercises.map(exercise => `<li>${exercise}</li>`).join('')}
                </ul>
            `;

            // Load progress from localStorage
            const progress = localStorage.getItem(`progress-${planId}`) || 0;
            const progressFill = modal.querySelector('.progress-fill');
            const progressText = modal.querySelector('.progress-text');
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${progress}% Complete`;

            // Show modal
            modal.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Progress tracking (simulated)
    const startPlanBtn = document.querySelector('.start-plan-btn');
    startPlanBtn.addEventListener('click', () => {
        const planId = modalBody.querySelector('h3').textContent.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
        const progressFill = modal.querySelector('.progress-fill');
        const progressText = modal.querySelector('.progress-text');
        let progress = parseInt(progressFill.style.width) || 0;
        progress = Math.min(progress + 10, 100); // Smaller increments for realism
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Complete`;
        localStorage.setItem(`progress-${planId}`, progress);
    });

    // Save plan functionality
    const savePlanBtn = document.querySelector('.save-plan-btn');
    savePlanBtn.addEventListener('click', () => {
        const planId = modalBody.querySelector('h3').textContent.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
        localStorage.setItem(`saved-plan-${planId}`, 'true');
        alert('Plan saved to your profile!');
    });

    // Featured workouts slider
    const workoutCards = document.querySelectorAll('.workout-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;

    function showWorkout(index) {
        workoutCards.forEach(card => card.classList.remove('active'));
        workoutCards[index].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : workoutCards.length - 1;
        showWorkout(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < workoutCards.length - 1) ? currentIndex + 1 : 0;
        showWorkout(currentIndex);
    });

    // Auto-rotate slider
    setInterval(() => {
        currentIndex = (currentIndex < workoutCards.length - 1) ? currentIndex + 1 : 0;
        showWorkout(currentIndex);
    }, 10000);

    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    planCards.forEach(card => observer.observe(card));
    workoutCards.forEach(card => observer.observe(card));
});