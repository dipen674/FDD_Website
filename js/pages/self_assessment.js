document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('assessment-form');
    const questions = document.querySelectorAll('.question-block');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const resultsContainer = document.getElementById('results-container');
    const overallScoreEl = document.getElementById('overall-score');
    const categoryScoresEl = document.getElementById('category-scores');
    const recommendationsEl = document.getElementById('recommendations');

    let currentQuestion = 0;
    const totalQuestions = questions.length;
    const categories = {
        physical: { questions: [1,2,3,4,5], score: 0, max: 20 },
        nutrition: { questions: [6,7,8,9,10], score: 0, max: 20 },
        mental: { questions: [11,12,13,14,15], score: 0, max: 20 },
        lifestyle: { questions: [16,17,18,19,20], score: 0, max: 20 }
    };

    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });

        prevBtn.disabled = index === 0;
        if (index === totalQuestions - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }

        updateProgress(index + 1);
    }

    function updateProgress(current) {
        const progress = (current / totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Question ${current}/${totalQuestions}`;
    }

    function getSelectedValue(name) {
        const selected = form.querySelector(`input[name="${name}"]:checked`);
        return selected ? parseInt(selected.value) : 0;
    }

    function calculateScores() {
        let totalScore = 0;

        Object.keys(categories).forEach(cat => {
            categories[cat].score = 0;
            categories[cat].questions.forEach(qNum => {
                const value = getSelectedValue(`q${qNum}`);
                categories[cat].score += value;
                totalScore += value;
            });
        });

        return totalScore;
    }

    function getScorePercentage(score, max) {
        return Math.round((score / max) * 100);
    }

    function getOverallLevel(percentage) {
        if (percentage >= 80) return { level: 'Excellent', color: '#27ae60' };
        if (percentage >= 60) return { level: 'Good', color: '#f39c12' };
        if (percentage >= 40) return { level: 'Fair', color: '#e67e22' };
        return { level: 'Needs Improvement', color: '#e74c3c' };
    }

    function generateRecommendations(totalPercentage) {
        const recs = [];

        if (totalPercentage < 50) {
            recs.push('Consider consulting a healthcare professional for personalized advice.');
            recs.push('Start with small changes: add one healthy habit per week.');
        } else if (totalPercentage < 70) {
            recs.push('Focus on consistency in your routines to see better results.');
            recs.push('Join our community forum for support and motivation.');
        } else {
            recs.push('Maintain your great habits and challenge yourself further.');
            recs.push('Share your success story in our blog section.');
        }

        // Category-specific
        Object.keys(categories).forEach(cat => {
            const perc = getScorePercentage(categories[cat].score, categories[cat].max);
            if (perc < 60) {
                let tip = '';
                switch (cat) {
                    case 'physical':
                        tip = 'Incorporate more movement: try our beginner workout plans.';
                        break;
                    case 'nutrition':
                        tip = 'Explore our vegan recipes for healthier meal options.';
                        break;
                    case 'mental':
                        tip = 'Start a daily meditation practice with our resources.';
                        break;
                    case 'lifestyle':
                        tip = 'Reduce screen time and build stronger social connections.';
                        break;
                }
                recs.push(tip);
            }
        });

        return recs;
    }

    function displayResults(totalScore) {
        const maxTotal = 80;
        const percentage = getScorePercentage(totalScore, maxTotal);
        const { level, color } = getOverallLevel(percentage);

        overallScoreEl.innerHTML = `<span style="color: ${color};">${percentage}% - ${level}</span>`;

        categoryScoresEl.innerHTML = '';
        Object.keys(categories).forEach(cat => {
            const catPerc = getScorePercentage(categories[cat].score, categories[cat].max);
            const catLevel = getOverallLevel(catPerc);
            const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
            const scoreHtml = `
                <div class="category-score">
                    <h4>${catName}</h4>
                    <div class="score" style="color: ${catLevel.color};">${catPerc}%</div>
                </div>
            `;
            categoryScoresEl.innerHTML += scoreHtml;
        });

        const recs = generateRecommendations(percentage);
        recommendationsEl.innerHTML = `
            <h3>Personalized Recommendations</h3>
            <ul>
                ${recs.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;

        form.style.display = 'none';
        resultsContainer.style.display = 'block';
        window.scrollTo({ top: resultsContainer.offsetTop - 100, behavior: 'smooth' });
    }

    nextBtn.addEventListener('click', () => {
        if (getSelectedValue(`q${currentQuestion + 1}`) > 0) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            alert('Please select an option to proceed.');
        }
    });

    prevBtn.addEventListener('click', () => {
        currentQuestion--;
        showQuestion(currentQuestion);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (getSelectedValue(`q${totalQuestions}`) > 0) {
            const totalScore = calculateScores();
            displayResults(totalScore);
        } else {
            alert('Please select an option to submit.');
        }
    });

    // Auto-select if already answered when navigating
    form.addEventListener('change', (e) => {
        if (e.target.type === 'radio' && currentQuestion < totalQuestions - 1) {
            setTimeout(() => {
                currentQuestion++;
                showQuestion(currentQuestion);
            }, 300);
        }
    });

    showQuestion(0);
});