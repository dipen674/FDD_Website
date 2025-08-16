// Events Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const viewBtns = document.querySelectorAll('.view-btn');
    const eventsList = document.querySelector('.events-list');
    const eventsCalendar = document.querySelector('.events-calendar');
    const categoryFilter = document.getElementById('category-filter');
    const dateFilter = document.getElementById('date-filter');
    const eventCards = document.querySelectorAll('.event-card');
    const proposeEventBtn = document.getElementById('proposeEventBtn');
    const modal = document.getElementById('eventProposalModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const eventForm = document.getElementById('eventProposalForm');
    const addToCalendarBtns = document.querySelectorAll('.add-to-calendar-btn');
    const toast = document.getElementById('notificationToast');
    
    // View Toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide views
            if(viewType === 'list') {
                eventsList.style.display = 'block';
                eventsCalendar.style.display = 'none';
            } else {
                eventsList.style.display = 'none';
                eventsCalendar.style.display = 'block';
                generateCalendar();
            }
        });
    });
    
    // Filter Events
    function filterEvents() {
        const category = categoryFilter.value;
        const dateFilterVal = dateFilter.value;
        const today = new Date();
        
        eventCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardDate = new Date(card.getAttribute('data-date'));
            
            let showCard = true;
            
            // Category filter
            if(category !== 'all' && cardCategory !== category) {
                showCard = false;
            }
            
            // Date filter
            if(dateFilterVal !== 'all') {
                if(dateFilterVal === 'upcoming' && cardDate < today) {
                    showCard = false;
                } else if(dateFilterVal === 'this-week') {
                    const nextWeek = new Date();
                    nextWeek.setDate(today.getDate() + 7);
                    if(cardDate < today || cardDate > nextWeek) {
                        showCard = false;
                    }
                } else if(dateFilterVal === 'this-month') {
                    const nextMonth = new Date();
                    nextMonth.setMonth(today.getMonth() + 1);
                    if(cardDate < today || cardDate > nextMonth) {
                        showCard = false;
                    }
                } else if(dateFilterVal === 'past' && cardDate >= today) {
                    showCard = false;
                }
            }
            
            card.style.display = showCard ? 'flex' : 'none';
        });
    }
    
    // Apply filters when selection changes
    categoryFilter.addEventListener('change', filterEvents);
    dateFilter.addEventListener('change', filterEvents);
    
    // Generate calendar
    function generateCalendar() {
        const calendarDays = document.querySelector('.calendar-days');
        calendarDays.innerHTML = '';
        
        // Sample calendar generation for June 2023
        const daysInMonth = 30;
        const startDay = 4; // Thursday (0=Sun, 1=Mon, etc.)
        
        // Add empty days for start of month
        for(let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days with events
        const eventDates = [15, 20, 25];
        
        for(let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            
            if(eventDates.includes(day)) {
                dayElement.classList.add('event-day');
                dayElement.innerHTML = `${day} <span class="event-dot"></span>`;
            }
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Initialize calendar
    generateCalendar();
    
    // Event card interaction
    eventCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if user clicked on a button or link
            if(e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            // In a real app, this would navigate to the event details page
            const eventTitle = this.querySelector('h3').textContent;
            alert(`This would open the details page for: ${eventTitle}`);
        });
    });
    
    // Modal functionality
    proposeEventBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('eventTitle').value;
        const category = document.getElementById('eventCategory').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const location = document.getElementById('eventLocation').value;
        const description = document.getElementById('eventDescription').value;
        
        // In a real app, this would send data to a server
        console.log('Event proposal submitted:', {
            title, category, date, time, location, description
        });
        
        // Show success message and close modal
        alert(`Thank you! Your "${title}" event proposal has been submitted for review.`);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        eventForm.reset();
    });
    
    // Add to calendar functionality
    addToCalendarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventName = this.getAttribute('data-event');
            
            // Show toast notification
            toast.style.display = 'block';
            toast.querySelector('.toast-message').textContent = `"${eventName}" added to your calendar!`;
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        });
    });
});