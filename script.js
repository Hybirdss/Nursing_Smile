document.addEventListener('DOMContentLoaded', function() {
    // Base URL for GitHub Pages
    const baseUrl = 'https://hybirdss.github.io/Nursing_Smile/';
    
    // Copy buttons functionality
    const copyBtns = document.querySelectorAll('.copy-btn');
    const copyModal = document.getElementById('copyModal');
    const copyUrlInput = document.getElementById('copyUrlInput');
    const copyUrlBtn = document.getElementById('copyUrlBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Handle widget copy buttons
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const widgetType = this.getAttribute('data-widget');
            const embedUrl = `${baseUrl}widgets/${widgetType}/index.html`;
            
            // Show modal with the URL
            copyUrlInput.value = embedUrl;
            copyModal.style.display = 'flex';
            
            // Select the URL in the input
            copyUrlInput.select();
        });
    });
    
    // Copy URL button in modal
    copyUrlBtn.addEventListener('click', function() {
        copyUrlInput.select();
        document.execCommand('copy');
        
        // Change button text temporarily to show it was copied
        const originalText = this.textContent;
        this.textContent = 'コピーしました！';
        this.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 2000);
    });
    
    // Close modal button
    closeModalBtn.addEventListener('click', function() {
        copyModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === copyModal) {
            copyModal.style.display = 'none';
        }
    });
    
    // Add a placeholder image if logo not found
    const logoImg = document.getElementById('logo-img');
    logoImg.onerror = function() {
        this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="%23FFAEC9" stroke="%23FFF" stroke-width="2"/><text x="30" y="38" font-family="Arial" font-size="24" fill="%23FFF" text-anchor="middle">NS</text></svg>';
    };
    
    // Create assets directory and logo placeholder
    createLogoPlaceholder();
    
    // Add page transitions
    document.querySelectorAll('section, header, footer').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animations on load
    setTimeout(() => {
        let delay = 0;
        document.querySelectorAll('section, header, footer').forEach(section => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, delay);
            delay += 150;
        });
    }, 200);
    
    // Add hover effects to widget cards
    document.querySelectorAll('.widget-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const preview = card.querySelector('.widget-preview');
            preview.style.transition = 'transform 0.3s ease';
            preview.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            const preview = card.querySelector('.widget-preview');
            preview.style.transform = 'scale(1)';
        });
    });
});

// Function to create a logo placeholder SVG
function createLogoPlaceholder() {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="56" fill="#FFAEC9" stroke="#FFF" stroke-width="3"/>
        <text x="60" y="48" font-family="Arial" font-size="22" fill="#FFF" text-anchor="middle" font-weight="bold">看護</text>
        <text x="60" y="80" font-family="Arial" font-size="22" fill="#FFF" text-anchor="middle" font-weight="bold">スマイル</text>
    </svg>`;
    
    // In a real environment, we would create a file, but for this example we just set it to use the placeholder
    const logoImg = document.getElementById('logo-img');
    logoImg.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
}
