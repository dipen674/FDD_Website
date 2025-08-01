// Habit Tracker Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Calendar generation
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.querySelector('.calendar-header h3');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Initialize calendar
    function generateCalendar(month, year) {
        calendarGrid.innerHTML = '';
        
        // Set month/year display
        monthYearDisplay.textContent = new Date(year, month).toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
        });

        // Get first day and total days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add empty cells for days before the first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyCell);
        }

        // Add day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = day;
            
            // Mark current day
            if (day === currentDate.getDate() && 
                month === currentDate.getMonth() && 
                year === currentDate.getFullYear()) {
                dayCell.classList.add('current-day');
            }

            // Add click event to toggle habit completion
            dayCell.addEventListener('click', function() {
                this.classList.toggle('active');
                updateStreakCounter();
            });

            calendarGrid.appendChild(dayCell);
        }
    }

    // Update streak counter
    function updateStreakCounter() {
        const activeDays = document.querySelectorAll('.calendar-day.active').length;
        document.getElementById('current-streak').textContent = calculateCurrentStreak();
        document.getElementById('total-days').textContent = activeDays;
    }

    // Calculate current streak
    function calculateCurrentStreak() {
        const days = document.querySelectorAll('.calendar-day:not(.empty)');
        let streak = 0;
        let todayFound = false;
        
        // Check backwards from today
        for (let i = days.length - 1; i >= 0; i--) {
            if (days[i].classList.contains('active')) {
                streak++;
                if (days[i].classList.contains('current-day')) {
                    todayFound = true;
                }
            } else if (todayFound) {
                break;
            }
        }
        
        return streak;
    }

    // Month navigation
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Initialize
    generateCalendar(currentMonth, currentYear);
    updateStreakCounter();

    // Sample data for demo (would be API calls in production)
    function loadSampleHabits() {
        const habits = [
            { name: "Meditation", currentStreak: 7, totalDays: 15 },
            { name: "Exercise", currentStreak: 3, totalDays: 12 },
            { name: "Water Intake", currentStreak: 5, totalDays: 18 }
        ];

        const habitContainer = document.getElementById('habit-container');
        habitContainer.innerHTML = '';

        habits.forEach(habit => {
            const habitCard = document.createElement('div');
            habitCard.className = 'habit-card';
            habitCard.innerHTML = `
                <h3>${habit.name}</h3>
                <div class="habit-stats">
                    <div><span>${habit.currentStreak}</span> day streak</div>
                    <div><span>${habit.totalDays}</span> total days</div>
                </div>
                <div class="habit-progress">
                    <div class="progress-bar" style="width: ${(habit.totalDays / 30) * 100}%"></div>
                </div>
            `;
            habitContainer.appendChild(habitCard);
        });
    }

    loadSampleHabits();
});