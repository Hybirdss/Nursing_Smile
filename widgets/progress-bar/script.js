document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const percentage = urlParams.get('percentage') || 50;
    const title = urlParams.get('title') || '学習進捗状況';
    const message = urlParams.get('message') || '頑張れば、きっと合格できる！';
    const emoji = urlParams.get('emoji') || '📚';
    
    // Update DOM elements with parameters
    document.querySelector('.progress-title').textContent = title;
    document.querySelector('.progress-percentage').textContent = `${percentage}%`;
    document.querySelector('.progress-bar').style.width = `${percentage}%`;
    document.querySelector('.progress-text').textContent = message;
    document.querySelector('.progress-emoji').textContent = emoji;
    
    // Add animation for loading effect
    setTimeout(() => {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
        }, 300);
    }, 500);
});
