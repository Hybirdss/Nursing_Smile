document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title') || '第114回看護師国家試験まで';
    const examDate = urlParams.get('examDate') || '2026-02-15';
    const message = urlParams.get('message') || '今日も一歩、合格へ近づいています！';
    const emoji = urlParams.get('emoji') || '⏱️';
    
    // Update DOM elements with parameters
    document.querySelector('.countdown-title').textContent = title;
    document.querySelector('.countdown-emoji').textContent = emoji;
    document.querySelector('.countdown-message').textContent = message;
    
    // Format the date for display
    const examDateObj = new Date(examDate);
    const examDateDisplay = `試験日: ${examDateObj.getFullYear()}年${examDateObj.getMonth() + 1}月${examDateObj.getDate()}日(${getDayOfWeekJapanese(examDateObj)})`;
    document.querySelector('.exam-date').textContent = examDateDisplay;
    
    // Initialize and start countdown
    countdown(examDateObj);
    
    // Update countdown every second
    setInterval(() => {
        countdown(examDateObj);
    }, 1000);
    
    // Function to get day of week in Japanese
    function getDayOfWeekJapanese(date) {
        const daysJapanese = ['日', '月', '火', '水', '木', '金', '土'];
        return daysJapanese[date.getDay()];
    }
    
    // Function to update countdown
    function countdown(targetDate) {
        const now = new Date();
        const diff = targetDate - now;
        
        // If target date is in the past
        if (diff <= 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            document.querySelector('.countdown-message').textContent = '試験日が過ぎました！';
            return;
        }
        
        // Calculate time left
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update with animation if changed
        updateWithAnimation('days', days);
        updateWithAnimation('hours', hours);
        updateWithAnimation('minutes', minutes);
        updateWithAnimation('seconds', seconds);
    }
    
    // Function to update element with animation if value changed
    function updateWithAnimation(id, newValue) {
        const element = document.getElementById(id);
        const currentValue = parseInt(element.textContent);
        
        if (currentValue !== newValue) {
            // Add changed class for animation
            element.classList.add('changed');
            
            // Update the value
            element.textContent = newValue.toString().padStart(2, '0');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                element.classList.remove('changed');
            }, 500);
        }
    }
    
    // Add a subtle shimmering effect to timer blocks
    const timerBlocks = document.querySelectorAll('.timer-number');
    timerBlocks.forEach(block => {
        // Create shimmer element
        const shimmer = document.createElement('div');
        shimmer.style.position = 'absolute';
        shimmer.style.top = '0';
        shimmer.style.left = '-100%';
        shimmer.style.width = '50%';
        shimmer.style.height = '100%';
        shimmer.style.background = 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)';
        shimmer.style.transform = 'skewX(-25deg)';
        shimmer.style.animation = 'shimmer 3s infinite';
        
        // Add shimmer animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 200%; }
            }
        `;
        document.head.appendChild(style);
        
        // Add shimmer to the block
        block.appendChild(shimmer);
    });
});
