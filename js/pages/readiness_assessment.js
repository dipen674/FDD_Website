// Readiness Assessment Quiz JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('readinessAssessment');
    const questionCards = document.querySelectorAll('.question-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const resultsContainer = document.getElementById('resultsContainer');
    const retakeBtn = document.getElementById('retakeBtn');
    
    let currentQuestion = 1;
    const totalQuestions = 15;
    let answers = {};

    // Initialize the assessment
    init();

    function init() {
        showQuestion(1);
        updateProgress();
        updateNavigation();
        
        // Add event listeners
        nextBtn.addEventListener('click', nextQuestion);
        prevBtn.addEventListener('click', prevQuestion);
        form.addEventListener('submit', calculateResults);
        retakeBtn.addEventListener('click', resetAssessment);
        
        // Add change listeners to radio buttons
        questionCards.forEach((card, index) => {
            const radioButtons = card.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    answers[`q${index + 1}`] = parseInt(this.value);
                    updateNavigation();
                });
            });
        });
    }

    function showQuestion(questionNum) {
        questionCards.forEach(card => {
            card.classList.remove('active');
            if (parseInt(card.dataset.question) === questionNum) {
                card.classList.add('active');
            }
        });
        currentQuestion = questionNum;
    }

    function nextQuestion() {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateProgress();
            updateNavigation();
            
            // Scroll to top of form
            document.querySelector('.assessment-container').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    function prevQuestion() {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateProgress();
            updateNavigation();
            
            // Scroll to top of form
            document.querySelector('.assessment-container').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    function updateProgress() {
        const progressPercentage = (currentQuestion / totalQuestions) * 100;
        progressFill.style.width = progressPercentage + '%';
        progressText.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
    }

    function updateNavigation() {
        // Update previous button
        prevBtn.disabled = currentQuestion === 1;
        
        // Update next/submit buttons
        if (currentQuestion === totalQuestions) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            
            // Check if current question is answered
            const currentAnswer = answers[`q${currentQuestion}`];
            submitBtn.disabled = !currentAnswer;
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
            
            // Check if current question is answered
            const currentAnswer = answers[`q${currentQuestion}`];
            nextBtn.disabled = !currentAnswer;
        }
    }

    function calculateResults(e) {
        e.preventDefault();
        
        // Calculate total score
        const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
        const maxScore = totalQuestions * 5;
        const percentageScore = Math.round((totalScore / maxScore) * 100);
        
        // Determine readiness level
        let readinessLevel, levelClass, recommendations, nextSteps;
        
        if (percentageScore < 40) {
            readinessLevel = {
                title: "Pre-Contemplation Stage",
                description: "You may not be fully aware of the need for change or may be resistant to making changes at this time. This is completely normal and part of the change process.",
                class: "level-low"
            };
            
            recommendations = [
                "Start by learning more about the benefits of healthy lifestyle changes",
                "Consider the impact of your current habits on your daily life",
                "Talk to friends or family members who have made positive changes",
                "Focus on building awareness without pressure to change immediately",
                "Explore resources that provide gentle introduction to healthy living"
            ];
            
            nextSteps = [
                "Read educational content about health and wellness",
                "Join our community forum to learn from others' experiences",
                "Consider speaking with a healthcare professional",
                "Take small steps to increase your health awareness"
            ];
            
        } else if (percentageScore < 65) {
            readinessLevel = {
                title: "Contemplation Stage",
                description: "You're thinking about making changes and weighing the pros and cons. You recognize the benefits of change but may still have some reservations or barriers to overcome.",
                class: "level-medium"
            };
            
            recommendations = [
                "Continue gathering information about healthy lifestyle changes",
                "Identify and address specific barriers that concern you",
                "Start with small, manageable changes to build confidence",
                "Connect with supportive friends, family, or community members",
                "Set a tentative date to begin making changes"
            ];
            
            nextSteps = [
                "Create a list of pros and cons for making changes",
                "Start with one small healthy habit (like drinking more water)",
                "Join support groups or online communities",
                "Develop a preliminary action plan with realistic goals"
            ];
            
        } else {
            readinessLevel = {
                title: "Action/Preparation Stage",
                description: "You're ready to take action and make meaningful changes to your lifestyle. You have the motivation, confidence, and support needed to succeed in your health journey.",
                class: "level-high"
            };
            
            recommendations = [
                "Start implementing specific, measurable health goals",
                "Create a structured plan with daily and weekly targets",
                "Build a strong support network of like-minded individuals",
                "Track your progress regularly to stay motivated",
                "Be prepared for setbacks and have coping strategies ready"
            ];
            
            nextSteps = [
                "Create a detailed personalized health plan",
                "Use our habit tracker to monitor your daily progress",
                "Join our active community for ongoing support and motivation",
                "Consider working with health professionals for guidance"
            ];
        }
        
        // Display results
        displayResults(percentageScore, totalScore, maxScore, readinessLevel, recommendations, nextSteps);
    }

    function displayResults(percentageScore, totalScore, maxScore, readinessLevel, recommendations, nextSteps) {
        // Hide assessment form
        document.querySelector('.assessment-container').style.display = 'none';
        
        // Show results container
        resultsContainer.style.display = 'block';
        
        // Update score display
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.textContent = percentageScore + '%';
        scoreDisplay.className = `score-display ${getScoreClass(percentageScore)}`;
        
        // Update readiness level
        const readinessLevelEl = document.getElementById('readinessLevel');
        readinessLevelEl.innerHTML = `
            <h3>${readinessLevel.title}</h3>
            <p>${readinessLevel.description}</p>
            <p><strong>Your Score:</strong> ${totalScore} out of ${maxScore} points (${percentageScore}%)</p>
        `;
        readinessLevelEl.className = `readiness-level ${readinessLevel.class}`;
        
        // Update recommendations
        const recommendationsEl = document.getElementById('recommendations');
        recommendationsEl.innerHTML = `
            <h4><i class="fas fa-lightbulb"></i> Personalized Recommendations</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
        
        // Update next steps
        const nextStepsEl = document.getElementById('nextSteps');
        nextStepsEl.innerHTML = `
            <h4><i class="fas fa-arrow-right"></i> Your Next Steps</h4>
            <ul>
                ${nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        `;
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Store results in local storage for potential use in personalized plan
        try {
            const resultsData = {
                score: percentageScore,
                level: readinessLevel.title,
                timestamp: new Date().toISOString(),
                answers: answers
            };
            // Note: Using in-memory storage since localStorage is not supported
            window.readinessResults = resultsData;
        } catch (error) {
            console.log('Results stored in memory for this session');
        }
    }

    function getScoreClass(score) {
        if (score < 40) return 'score-low';
        if (score < 65) return 'score-medium';
        return 'score-high';
    }

    function resetAssessment() {
        // Reset all variables
        currentQuestion = 1;
        answers = {};
        
        // Clear all radio button selections
        questionCards.forEach(card => {
            const radioButtons = card.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.checked = false;
            });
        });
        
        // Show first question
        showQuestion(1);
        updateProgress();
        updateNavigation();
        
        // Hide results and show assessment
        resultsContainer.style.display = 'none';
        document.querySelector('.assessment-container').style.display = 'block';
        
        // Scroll to top
        document.querySelector('.content-header').scrollIntoView({ behavior: 'smooth' });
    }

    // Add smooth transitions for better UX
    function addTransitionEffects() {
        const style = document.createElement('style');
        style.textContent = `
            .question-card.active {
                animation: slideIn 0.3s ease-in-out;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize transition effects
    addTransitionEffects();

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (resultsContainer.style.display !== 'none') return;
        
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            if (currentQuestion < totalQuestions && !nextBtn.disabled) {
                nextQuestion();
            } else if (currentQuestion === totalQuestions && !submitBtn.disabled) {
                calculateResults(e);
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentQuestion > 1) {
                prevQuestion();
            }
        }
    });

    // Add auto-save functionality (in memory)
    function autoSave() {
        window.assessmentProgress = {
            currentQuestion: currentQuestion,
            answers: answers,
            timestamp: new Date().toISOString()
        };
    }

    // Load saved progress if available
    function loadProgress() {
        if (window.assessmentProgress) {
            const saved = window.assessmentProgress;
            // Only load if saved within last hour
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
            if (new Date(saved.timestamp) > oneHourAgo) {
                answers = saved.answers || {};
                
                // Restore radio button selections
                Object.keys(answers).forEach(questionKey => {
                    const questionNum = questionKey.replace('q', '');
                    const radio = document.querySelector(`input[name="${questionKey}"][value="${answers[questionKey]}"]`);
                    if (radio) {
                        radio.checked = true;
                    }
                });
                
                updateNavigation();
            }
        }
    }

    // Save progress on each answer
    questionCards.forEach((card, index) => {
        const radioButtons = card.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', autoSave);
        });
    });

    // Load any existing progress
    loadProgress();
});