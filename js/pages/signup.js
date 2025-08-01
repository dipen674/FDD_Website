// Join Community form validation
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation logic
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            
            if (password.value !== confirmPassword.value) {
                alert('Passwords do not match!');
                return;
            }
            
            // Form submission logic would go here
            console.log('Form submitted successfully');
            alert('Thank you for joining our community!');
        });
    }
});