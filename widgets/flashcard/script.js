document.addEventListener('DOMContentLoaded', function() {
    const flashcard = document.getElementById('flashcard');
    const flipBtns = document.querySelectorAll('.flashcard-flip-btn');
    const navBtns = document.querySelectorAll('.nav-btn');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const term = urlParams.get('term') || '心不全';
    const pronunciation = urlParams.get('pronunciation') || 'しんふぜん';
    const category = urlParams.get('category') || '循環器疾患';
    const emoji = urlParams.get('emoji') || '🫀';
    const definition = urlParams.get('definition') || '心臓のポンプ機能低下による循環障害';
    const symptoms = urlParams.get('symptoms') || '呼吸困難、浮腫、倦怠感';
    const keywords = urlParams.get('keywords') || 'うっ血性、前負荷、後負荷';
    const memoryTip = urlParams.get('memoryTip') || '「心臓が不参加（ふさんか）で、試験に全滅（ぜんめつ）」';
    
    // Update DOM elements with parameters
    document.querySelectorAll('.flashcard-tag').forEach(el => el.textContent = category);
    document.querySelectorAll('.flashcard-emoji').forEach(el => el.textContent = emoji);
    document.querySelector('.flashcard-title').textContent = term;
    document.querySelector('.flashcard-pronunciation').textContent = pronunciation;
    
    // Update back side content
    const contentDivs = document.querySelector('.flashcard-back .flashcard-content').children;
    contentDivs[1].textContent = definition; // Definition paragraph
    contentDivs[3].textContent = symptoms;   // Symptoms paragraph
    contentDivs[5].textContent = keywords;   // Keywords paragraph
    document.querySelector('.flashcard-memory-tip p').textContent = memoryTip;
    
    // Flip card functionality
    flipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
            // Add sound effect
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-mouse-click-close-1113.mp3');
            audio.volume = 0.5;
            audio.play();
        });
    });
    
    // Add wiggle animation to the card when hovering
    flashcard.addEventListener('mouseenter', () => {
        flashcard.style.animation = 'wiggle 0.5s ease';
        setTimeout(() => {
            flashcard.style.animation = '';
        }, 500);
    });
    
    // Navigation buttons functionality
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Here you would typically send data to a backend
            // For now, we'll just show a visual confirmation
            btn.classList.add('selected');
            
            // Add a temporary visual feedback
            const originalText = btn.textContent;
            btn.textContent = '✓ 記録済み';
            btn.style.backgroundColor = '#C8E6C9';
            btn.style.borderColor = '#81C784';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.classList.remove('selected');
                
                // In a real app, we'd load the next card here
                // For demo, just flip the card back to front
                if (flashcard.classList.contains('flipped')) {
                    flashcard.classList.remove('flipped');
                }
            }, 2000);
        });
    });
    
    // Add keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            flashcard.classList.toggle('flipped');
        } else if (e.code === 'Digit1' || e.code === 'Numpad1') {
            navBtns[0].click(); // Hard
        } else if (e.code === 'Digit2' || e.code === 'Numpad2') {
            navBtns[1].click(); // Medium
        } else if (e.code === 'Digit3' || e.code === 'Numpad3') {
            navBtns[2].click(); // Easy
        } else if (e.code === 'Digit4' || e.code === 'Numpad4') {
            navBtns[3].click(); // Perfect
        }
    });
    
    // Add wiggle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wiggle {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(1deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(-1deg); }
            100% { transform: rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
});
