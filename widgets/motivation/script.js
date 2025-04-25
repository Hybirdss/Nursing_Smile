document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title') || 'モチベーションコーナー';
    const emoji = urlParams.get('emoji') || '💪';
    const message = urlParams.get('message') || 'お疲れ様です！今日も一歩ずつ前進していますね。小さな積み重ねが大きな成果につながります。自分のペースを守って、無理せず頑張りましょう！';
    const quote = urlParams.get('quote') || '「千里の道も一歩から」';
    const quoteAuthor = urlParams.get('quoteAuthor') || '- 老子';
    const advice = urlParams.get('advice') || '「国試で高得点を取るコツは、基本をしっかり理解すること。暗記だけでなく、『なぜそうなるのか』を考えながら学習すると、似た問題にも対応できるようになります。私もそうやって合格しました！」';
    const adviceAuthor = urlParams.get('adviceAuthor') || '- 佐藤看護師 (第112回合格)';
    
    // Update DOM elements with parameters
    document.querySelector('.motivation-title').textContent = title;
    document.querySelector('.motivation-emoji').textContent = emoji;
    document.querySelector('.nurse-message').textContent = message;
    document.querySelector('.quote-text').textContent = quote;
    document.querySelector('.quote-author').textContent = quoteAuthor;
    document.querySelector('.advice-text').textContent = advice;
    document.querySelector('.advice-author').textContent = adviceAuthor;
    
    // Arrays of encouraging messages, quotes, and advice
    const nurseMessages = [
        'お疲れ様です！今日も一歩ずつ前進していますね。小さな積み重ねが大きな成果につながります。自分のペースを守って、無理せず頑張りましょう！',
        '今日の勉強、お疲れ様！どんな小さな進歩も、合格への確実な一歩です。明日もまた一緒に頑張りましょうね！',
        '調子はどうですか？難しい内容でも、繰り返し学ぶことで必ず理解できるようになります。あなたならできます！',
        '今日も勉強を続けているあなたは素晴らしいです！コツコツと積み重ねた努力は、必ず試験本番で力を発揮します。明日も頑張りましょう！',
        '少し疲れていませんか？適度な休息も大切ですよ。リフレッシュして、また勉強に取り組みましょう。あなたの頑張りは必ず報われます！'
    ];
    
    const quotes = [
        { text: '「千里の道も一歩から」', author: '- 老子' },
        { text: '「継続は力なり」', author: '- アリストテレス' },
        { text: '「今日の準備が明日の自信につながる」', author: '- ラルフ・マーストン' },
        { text: '「どんな天才も努力には勝てない」', author: '- 坂本龍馬' },
        { text: '「人間の偉大さは失敗からの立ち直りにある」', author: '- ラルフ・エマーソン' }
    ];
    
    const seniorAdvice = [
        { text: '「国試で高得点を取るコツは、基本をしっかり理解すること。暗記だけでなく、『なぜそうなるのか』を考えながら学習すると、似た問題にも対応できるようになります。私もそうやって合格しました！」', author: '- 佐藤看護師 (第112回合格)' },
        { text: '「過去問を解くときは、間違えた問題を単に覚えるのではなく、その背景にある概念を理解することが大切です。私は間違えた問題を別ノートにまとめて、定期的に見直していました。」', author: '- 田中看護師 (第113回合格)' },
        { text: '「私のおすすめは、学習内容を誰かに説明するつもりで声に出して復習すること。自分の言葉で説明できるようになると、理解度が格段に上がります。」', author: '- 鈴木看護師 (第112回合格)' },
        { text: '「緊張しやすい人は、試験前日まで勉強せず、リラックスする時間を作ることも大切です。私は前日は散歩をして気分転換しました。当日は自信を持って臨めましたよ。」', author: '- 高橋看護師 (第111回合格)' },
        { text: '「私のモットーは『笑いながら覚える』でした。難しい医学用語も、語呂合わせや面白いイメージで覚えると記憶に残りやすいんです。楽しみながら勉強するのが一番ですよ！」', author: '- 山田看護師 (第113回合格)' }
    ];
    
    // Function to refresh content with animation
    function refreshContent() {
        // Select random items from arrays
        const randomMessage = nurseMessages[Math.floor(Math.random() * nurseMessages.length)];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const randomAdvice = seniorAdvice[Math.floor(Math.random() * seniorAdvice.length)];
        
        // Elements to update
        const messageElement = document.querySelector('.nurse-message');
        const quoteTextElement = document.querySelector('.quote-text');
        const quoteAuthorElement = document.querySelector('.quote-author');
        const adviceTextElement = document.querySelector('.advice-text');
        const adviceAuthorElement = document.querySelector('.advice-author');
        
        // Add fade-out class
        [messageElement, quoteTextElement, quoteAuthorElement, adviceTextElement, adviceAuthorElement].forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            el.style.transition = 'all 0.3s ease-out';
        });
        
        // After fade out, update content and fade in
        setTimeout(() => {
            messageElement.textContent = randomMessage;
            quoteTextElement.textContent = randomQuote.text;
            quoteAuthorElement.textContent = randomQuote.author;
            adviceTextElement.textContent = randomAdvice.text;
            adviceAuthorElement.textContent = randomAdvice.author;
            
            // Fade in
            [messageElement, quoteTextElement, quoteAuthorElement, adviceTextElement, adviceAuthorElement].forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 300);
        
        // Add animation to nurse avatar
        const nurseAvatar = document.querySelector('.nurse-avatar');
        nurseAvatar.style.animation = 'none';
        setTimeout(() => {
            nurseAvatar.style.animation = 'bounce 2s ease infinite';
        }, 10);
    }
    
    // Add click event listener to refresh button
    document.querySelector('.refresh-btn').addEventListener('click', refreshContent);
    
    // Add hover effect to advice and quote containers
    const containers = document.querySelectorAll('.quote-container, .senior-advice');
    containers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'translateY(-3px)';
            container.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
            container.style.transition = 'all 0.3s ease';
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'translateY(0)';
            container.style.boxShadow = 'none';
        });
    });
    
    // Add a sparkle effect to the nurse avatar on click
    const nurseAvatar = document.querySelector('.nurse-avatar');
    nurseAvatar.addEventListener('click', () => {
        // Create sparkle elements
        for (let i = 0; i < 5; i++) {
            createSparkle(nurseAvatar);
        }
    });
    
    function createSparkle(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'absolute';
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.backgroundColor = '#FFD700';
        sparkle.style.boxShadow = '0 0 10px 2px #FFD700';
        
        // Random position around the element
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 80;
        const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 80;
        
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.zIndex = '1000';
        sparkle.style.opacity = '0';
        sparkle.style.transform = 'scale(0)';
        sparkle.style.animation = 'sparkle 1s ease-in-out forwards';
        
        // Add keyframe animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes sparkle {
                0% {
                    opacity: 0;
                    transform: scale(0);
                }
                50% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});
