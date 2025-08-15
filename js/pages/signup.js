// Signup Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const successModal = document.getElementById('successModal');

    // Form data storage (since no backend)
    let users = JSON.parse(localStorage.getItem('healspaceUsers') || '[]');

    // Initialize page animations
    initializeAnimations();

    // Password toggle functionality
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? 
            '<i class="fas fa-eye"></i>' : 
            '<i class="fas fa-eye-slash"></i>';
    });

    // Password strength checker
    passwordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });

    // Real-time validation
    const formFields = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        age: document.getElementById('age'),
        location: document.getElementById('location'),
        password: passwordInput,
        confirmPassword: confirmPasswordInput
    };

    // Add event listeners for real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        field.addEventListener('blur', () => validateField(fieldName, field.value));
        field.addEventListener('input', () => clearError(fieldName));
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Password strength checker function
    function checkPasswordStrength(password) {
        const strengthIndicator = passwordStrength;
        let strength = 0;
        let feedback = '';

        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        switch (strength) {
            case 0:
            case 1:
                strengthIndicator.textContent = 'Weak password';
                strengthIndicator.className = 'password-strength weak';
                break;
            case 2:
            case 3:
                strengthIndicator.textContent = 'Medium password';
                strengthIndicator.className = 'password-strength medium';
                break;
            case 4:
            case 5:
                strengthIndicator.textContent = 'Strong password';
                strengthIndicator.className = 'password-strength strong';
                break;
            default:
                strengthIndicator.textContent = '';
                strengthIndicator.className = 'password-strength';
        }
    }

    // Field validation function
    function validateField(fieldName, value) {
        const errorElement = document.getElementById(fieldName + 'Error');
        const fieldElement = document.getElementById(fieldName);
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'fullName':
                if (!value.trim()) {
                    errorMessage = 'Full name is required';
                    isValid = false;
                } else if (value.trim().length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'Name can only contain letters and spaces';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                } else if (users.some(user => user.email === value)) {
                    errorMessage = 'This email is already registered';
                    isValid = false;
                }
                break;

            case 'phone':
                const phoneRegex = /^[0-9]{10}$/;
                if (!value) {
                    errorMessage = 'Phone number is required';
                    isValid = false;
                } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    errorMessage = 'Please enter a valid 10-digit phone number';
                    isValid = false;
                }
                break;

            case 'age':
                if (!value) {
                    errorMessage = 'Please select your age range';
                    isValid = false;
                }
                break;

            case 'location':
                if (!value.trim()) {
                    errorMessage = 'Location is required';
                    isValid = false;
                } else if (value.trim().length < 2) {
                    errorMessage = 'Please enter a valid location';
                    isValid = false;
                }
                break;

            case 'password':
                if (!value) {
                    errorMessage = 'Password is required';
                    isValid = false;
                } else if (value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters';
                    isValid = false;
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    errorMessage = 'Password must contain uppercase, lowercase, and numbers';
                    isValid = false;
                }
                break;

            case 'confirmPassword':
                if (!value) {
                    errorMessage = 'Please confirm your password';
                    isValid = false;
                } else if (value !== passwordInput.value) {
                    errorMessage = 'Passwords do not match';
                    isValid = false;
                }
                break;
        }

        // Update UI
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
        
        const formGroup = fieldElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('success', 'error');
            if (value) {
                formGroup.classList.add(isValid ? 'success' : 'error');
            }
        }

        return isValid;
    }

    // Clear error function
    function clearError(fieldName) {
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        const fieldElement = document.getElementById(fieldName);
        const formGroup = fieldElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
        }
    }

    // Validate interests
    function validateInterests() {
        const interests = document.querySelectorAll('input[name="interests"]:checked');
        const errorElement = document.getElementById('interestsError');
        
        if (interests.length === 0) {
            errorElement.textContent = 'Please select at least one health goal';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }

    // Validate terms
    function validateTerms() {
        const terms = document.querySelector('input[name="terms"]');
        const errorElement = document.getElementById('termsError');
        
        if (!terms.checked) {
            errorElement.textContent = 'You must agree to the terms and conditions';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }

    // Handle form submission
    function handleFormSubmission() {
        const formData = new FormData(signupForm);
        let isFormValid = true;

        // Validate all fields
        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];
            if (!validateField(fieldName, field.value)) {
                isFormValid = false;
            }
        });

        // Validate interests and terms
        if (!validateInterests()) isFormValid = false;
        if (!validateTerms()) isFormValid = false;

        if (!isFormValid) {
            showError('Please fix the errors above and try again.');
            return;
        }

        // Show loading state
        const submitButton = signupForm.querySelector('.btn-signup');
        const btnText = submitButton.querySelector('.btn-text');
        const btnLoading = submitButton.querySelector('.btn-loading');
        
        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';

        // Simulate API call delay
        setTimeout(() => {
            // Collect form data
            const userData = {
                id: Date.now(),
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                age: formData.get('age'),
                location: formData.get('location'),
                interests: formData.getAll('interests'),
                newsletter: formData.get('newsletter') === 'on',
                registrationDate: new Date().toISOString(),
                status: 'active'
            };

            // Store user data
            users.push(userData);
            localStorage.setItem('healspaceUsers', JSON.stringify(users));
            
            // Store current user session
            localStorage.setItem('currentUser', JSON.stringify(userData));

            // Reset loading state
            submitButton.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';

            // Show success modal
            showSuccessModal();

            // Send welcome email simulation
            simulateWelcomeEmail(userData);

        }, 2000);
    }

    // Show success modal
    function showSuccessModal() {
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    window.closeModal = function() {
        successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        window.location.href = '../index.html';
    };

    // Redirect to profile function
    window.redirectToProfile = function() {
        successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        // Simulate redirect to profile/dashboard
        alert('Welcome to HealSpace! Your profile setup would start here.');
        window.location.href = 'health_score.html';
    };

    // Show error message
    function showError(message) {
        // Create or update error display
        let errorDisplay = document.querySelector('.form-error-display');
        if (!errorDisplay) {
            errorDisplay = document.createElement('div');
            errorDisplay.className = 'form-error-display';
            errorDisplay.style.cssText = `
                background: #fee;
                color: #e74c3c;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 1px solid #fcc;
                text-align: center;
                animation: shake 0.5s ease-in-out;
            `;
            signupForm.insertBefore(errorDisplay, signupForm.firstChild);
        }
        errorDisplay.textContent = message;
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            if (errorDisplay) {
                errorDisplay.remove();
            }
        }, 5000);
    }

    // Simulate welcome email
    function simulateWelcomeEmail(userData) {
        console.log(`Welcome email sent to: ${userData.email}`);
        console.log('Email content: Welcome to HealSpace! Your wellness journey starts now.');
    }

    // Initialize page animations
    function initializeAnimations() {
        const animatedElements = document.querySelectorAll('.signup-info, .signup-form-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Add shake animation for errors
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        e.target.value = value;
    });

    // Handle form reset if needed
    window.resetForm = function() {
        signupForm.reset();
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('success', 'error');
        });
        passwordStrength.textContent = '';
        passwordStrength.className = 'password-strength';
    };

    // Development helper - log stored users
    console.log('Current registered users:', users);
});