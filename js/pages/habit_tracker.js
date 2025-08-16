document.addEventListener('DOMContentLoaded', function() {
    // Initialize date
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    // DOM Elements
    const monthYearElement = document.getElementById('current-month');
    const calendarDaysElement = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    // Habit items
    const habitItems = document.querySelectorAll('.habit-item');
    const habitDetailTitle = document.getElementById('selected-habit-title');
    
    // Charts
    const completionChart = new Chart(
        document.getElementById('completionChart'),
        getCompletionChartConfig()
    );
    
    const performanceChart = new Chart(
        document.getElementById('performanceChart'),
        getPerformanceChartConfig()
    );
    
    // Functions
    function renderCalendar(month, year) {
        // Update month/year display
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous calendar
        calendarDaysElement.innerHTML = '';
        
        // Get first day of month and days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarDaysElement.appendChild(emptyDay);
        }
        
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            
            // Highlight today
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Add date
            const dateSpan = document.createElement('span');
            dateSpan.classList.add('date');
            dateSpan.textContent = day;
            dayElement.appendChild(dateSpan);
            
            // Add status indicators (random for demo)
            const statusDiv = document.createElement('div');
            statusDiv.classList.add('status');
            
            // Generate random status for demo
            const statusTypes = ['completed', 'missed', 'partial', 'none'];
            const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];
            
            if (status !== 'none') {
                const statusDot = document.createElement('div');
                statusDot.classList.add('status-dot', status);
                statusDiv.appendChild(statusDot);
                
                // Add additional dots for multiple habits
                if (Math.random() > 0.5) {
                    const statusDot2 = document.createElement('div');
                    statusDot2.classList.add('status-dot', 
                        statusTypes[Math.floor(Math.random() * 3)]
                    );
                    statusDiv.appendChild(statusDot2);
                }
            }
            
            dayElement.appendChild(statusDiv);
            calendarDaysElement.appendChild(dayElement);
        }
    }
    
    function getCompletionChartConfig() {
        return {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Habit Completion',
                    data: [65, 75, 80, 90],
                    borderColor: '#2a9d8f',
                    backgroundColor: 'rgba(42, 157, 143, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: 10,
                        titleFont: {
                            family: "'Poppins', sans-serif"
                        },
                        bodyFont: {
                            family: "'Poppins', sans-serif"
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        };
    }
    
    function getPerformanceChartConfig() {
        return {
            type: 'radar',
            data: {
                labels: ['Consistency', 'Impact', 'Effort', 'Motivation', 'Progress'],
                datasets: [{
                    label: 'Exercise',
                    data: [85, 90, 70, 80, 75],
                    fill: true,
                    backgroundColor: 'rgba(42, 157, 143, 0.2)',
                    borderColor: '#2a9d8f',
                    pointBackgroundColor: '#2a9d8f',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#2a9d8f'
                }, {
                    label: 'Average',
                    data: [70, 75, 65, 70, 68],
                    fill: true,
                    backgroundColor: 'rgba(231, 111, 81, 0.2)',
                    borderColor: '#e76f51',
                    pointBackgroundColor: '#e76f51',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#e76f51'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        pointLabels: {
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 12
                            }
                        },
                        ticks: {
                            display: false,
                            stepSize: 20
                        }
                    }
                }
            }
        };
    }
    
    // Event Listeners
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    habitItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            habitItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update habit detail title
            const habitName = this.querySelector('h3').textContent;
            habitDetailTitle.textContent = habitName;
        });
    });
    
    // Form submission
    document.getElementById('new-habit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would send this data to your backend
        alert('New habit created successfully!');
        this.reset();
    });
    
    document.getElementById('habit-entry-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would save this entry
        alert('Daily entry saved!');
    });
    
    // Toggle buttons
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize calendar
    renderCalendar(currentMonth, currentYear);
    
    // Activate first habit by default
    if (habitItems.length > 0) {
        habitItems[0].classList.add('active');
    }
});