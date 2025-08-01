// Basic Analytics Tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track page views
    function trackPageView() {
        const pageTitle = document.title;
        const pageUrl = window.location.pathname;
        const timestamp = new Date().toISOString();
        
        // In a real implementation, this would send to an analytics service
        console.log(`[Analytics] Page View: ${pageTitle} | ${pageUrl} | ${timestamp}`);
        
        // Example: Send to a mock API endpoint
        /*
        fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: 'page_view',
                page_title: pageTitle,
                page_url: pageUrl,
                timestamp: timestamp
            })
        });
        */
    }

    // Track button clicks
    function setupButtonTracking() {
        document.querySelectorAll('[data-track]').forEach(button => {
            button.addEventListener('click', function() {
                const eventName = this.getAttribute('data-track');
                console.log(`[Analytics] Button Click: ${eventName}`);
                
                // Example: Send to analytics service
                /*
                fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'button_click',
                        event_name: eventName,
                        timestamp: new Date().toISOString()
                    })
                });
                */
            });
        });
    }

    // Track form submissions
    function setupFormTracking() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const formId = this.id || 'anonymous_form';
                console.log(`[Analytics] Form Submitted: ${formId}`);
                
                // Example: Send to analytics service
                /*
                fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'form_submission',
                        form_id: formId,
                        timestamp: new Date().toISOString()
                    })
                });
                */
            });
        });
    }

    // Track external links
    function setupExternalLinkTracking() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (link.hostname !== window.location.hostname) {
                link.addEventListener('click', function() {
                    console.log(`[Analytics] Outbound Link: ${this.href}`);
                    
                    // Example: Send to analytics service
                    /*
                    fetch('/api/analytics', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            event: 'outbound_link',
                            link_url: this.href,
                            timestamp: new Date().toISOString()
                        })
                    });
                    */
                });
            }
        });
    }

    // Initialize tracking
    trackPageView();
    setupButtonTracking();
    setupFormTracking();
    setupExternalLinkTracking();

    // User session tracking (example)
    function trackUserSession() {
        const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('analytics_session_id', sessionId);
        
        console.log(`[Analytics] Session Started: ${sessionId}`);
        
        // Track session duration
        window.addEventListener('beforeunload', function() {
            const sessionStart = new Date();
            const sessionEnd = new Date();
            const duration = (sessionEnd - sessionStart) / 1000; // in seconds
            
            console.log(`[Analytics] Session Ended: ${sessionId} | Duration: ${duration}s`);
            
            /*
            fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'session_end',
                    session_id: sessionId,
                    duration: duration,
                    timestamp: sessionEnd.toISOString()
                })
            });
            */
        });
    }

    trackUserSession();
});