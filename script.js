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
    
    // Widget Preview Loading Animation
    document.querySelectorAll('.widget-preview iframe').forEach(iframe => {
        // Add loading overlay to each iframe
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loader"></div>';
        iframe.parentNode.appendChild(loadingOverlay);
        
        // Remove overlay when iframe loads
        iframe.addEventListener('load', function() {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        });
        
        // If iframe takes too long to load, remove overlay anyway
        setTimeout(() => {
            if (document.body.contains(loadingOverlay)) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }
        }, 5000);
    });
    
    // Random Fun Facts for widgets
    const funFacts = [
        '看護師国家試験の合格率は約90%です！',
        'フローレンス・ナイチンゲールは近代看護教育の創始者として知られています。',
        '看護師の日（5月12日）はナイチンゲールの誕生日です。',
        '日本の看護師資格は世界40ヶ国以上で通用します！',
        '看護師国家試験の問題数は合計240問！持久力も必要です！',
        '循環器疾患は看護師国家試験でよく出題される分野の一つです。'
    ];
    
    // Randomly display a fun fact on page load
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    const funFactElement = document.createElement('div');
    funFactElement.className = 'fun-fact-popup';
    funFactElement.innerHTML = `
        <div class="fun-fact-content">
            <span class="fun-fact-icon">💡</span>
            <p>${randomFact}</p>
            <button class="fun-fact-close">×</button>
        </div>
    `;
    
    // Add fun fact after a delay
    setTimeout(() => {
        document.body.appendChild(funFactElement);
        
        // Fade in
        setTimeout(() => {
            funFactElement.style.opacity = '1';
        }, 100);
        
        // Add close button functionality
        funFactElement.querySelector('.fun-fact-close').addEventListener('click', () => {
            funFactElement.style.opacity = '0';
            setTimeout(() => {
                funFactElement.remove();
            }, 500);
        });
        
        // Auto close after 8 seconds
        setTimeout(() => {
            if (document.body.contains(funFactElement)) {
                funFactElement.style.opacity = '0';
                setTimeout(() => {
                    funFactElement.remove();
                }, 500);
            }
        }, 8000);
    }, 3000);
    
    // Add example parameter functionality to help users
    document.querySelectorAll('.widget-params code').forEach(code => {
        code.style.cursor = 'pointer';
        code.title = 'クリックしてURLに追加';
        
        code.addEventListener('click', function() {
            const param = this.textContent;
            const parent = this.closest('.widget-info');
            const embedBtn = parent.querySelector('.copy-btn');
            const widgetType = embedBtn.getAttribute('data-widget');
            
            // Get sample value from the text next to the code
            let sampleValue = this.parentNode.textContent.split('例: ')[1];
            if (sampleValue) {
                sampleValue = sampleValue.split(')')[0].trim();
            } else {
                sampleValue = 'sample';
            }
            
            const embedUrl = `${baseUrl}widgets/${widgetType}/index.html?${param.replace(':', '')}=${encodeURIComponent(sampleValue)}`;
            
            // Show modal with the URL
            copyUrlInput.value = embedUrl;
            copyModal.style.display = 'flex';
            
            // Select the URL in the input
            copyUrlInput.select();
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