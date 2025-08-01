// Health Score Quiz functionality
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;

    const options = quizContainer.querySelectorAll('.option');
    const progressBar = quizContainer.querySelector('.progress');
    const questions = quizContainer.querySelectorAll('.question');
    let currentQuestion = 0;
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            this.parentNode.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            setTimeout(() => {
                if(currentQuestion < questions.length - 1) {
                    questions[currentQuestion].classList.remove('active');
                    currentQuestion++;
                    questions[currentQuestion].classList.add('active');
                    
                    const progress = ((currentQuestion + 1) / questions.length) * 100;
                    progressBar.style.width = `${progress}%`;
                }
            }, 500);
        });
    });
});