document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소
    const optionsContainer = document.getElementById('options-container');
    const explanationContainer = document.getElementById('explanation-container');
    const nextBtn = document.getElementById('next-btn');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const progressBar = document.getElementById('quiz-progress-bar');
    const correctRateEl = document.getElementById('correct-rate');
    const timeLeftEl = document.getElementById('time-left');
    const questionTextEl = document.getElementById('question-text');
    const explanationTextEl = document.getElementById('explanation-text');
    const characterSpeech = document.getElementById('character-speech');
    const nurseImage = document.getElementById('nurse-image');
    
    // 퀴즈 상태 관리
    let currentQuestionIndex = 0;
    let score = 0;
    let isAnswerRevealed = false;
    let timeLeft = 60;
    let timerInterval;
    
    // 퀴즈 데이터 (실제 서비스에서는 데이터베이스에서 가져올 것)
    const quizData = [
        {
            category: '循環器疾患',
            difficulty: '普通',
            question: '心不全患者のアセスメントにおいて、以下のうち正しい観察項目はどれか？',
            options: [
                { text: '脈拍の増加と血圧の上昇', correct: false },
                { text: '頸静脈の怒張と下肢の浮腫', correct: true },
                { text: '体温の上昇と発汗の減少', correct: false },
                { text: '意識レベルの上昇と瞳孔散大', correct: false }
            ],
            explanation: '心不全では、心臓のポンプ機能低下により、血液が心臓から十分に送り出せなくなります。その結果、静脈系にうっ血が生じ、頸静脈の怒張や下肢の浮腫などの症状が現れます。これらは心不全の重要な観察項目です。',
            memoryTip: '覚え方：「心臓がポンプ機能を<strong>怠る</strong>と、血液が<strong>溜まって</strong>首の血管が膨らみ、足がむくむ」'
        },
        {
            category: '呼吸器疾患',
            difficulty: '簡単',
            question: '慢性閉塞性肺疾患（COPD）の特徴的な症状として最も適切なものはどれか？',
            options: [
                { text: '乾性咳嗽と胸痛', correct: false },
                { text: '息切れと労作時呼吸困難', correct: true },
                { text: '多量の血痰と発熱', correct: false },
                { text: '胸水貯留と意識障害', correct: false }
            ],
            explanation: 'COPDの主な症状は、気道閉塞による息切れと労作時呼吸困難です。特に進行性であり、初期には運動時のみに症状が現れますが、進行すると安静時にも症状が見られるようになります。',
            memoryTip: '覚え方：「COPDは<strong>詰まる</strong>病気、だから<strong>息が切れる</strong>。CO(息が)P(ふーっと)D(出ない)」'
        },
        {
            category: '消化器疾患',
            difficulty: '難しい',
            question: '肝硬変患者に見られる身体所見として、最も適切な組み合わせはどれか？',
            options: [
                { text: 'クモ状血管腫・腹水・黄疸', correct: true },
                { text: '蒼白・多尿・高血圧', correct: false },
                { text: '発熱・頭痛・関節痛', correct: false },
                { text: '皮膚乾燥・多汗・視力低下', correct: false }
            ],
            explanation: '肝硬変では、門脈圧亢進症による側副血行路の発達によるクモ状血管腫、アルブミン産生低下による腹水、ビリルビン代謝障害による黄疸などの症状が特徴的に見られます。',
            memoryTip: '覚え方：「肝臓が<strong>硬く</strong>なると、お腹に<strong>水</strong>がたまり、体が<strong>黄色く</strong>なって、皮膚に<strong>クモの巣</strong>ができる」'
        },
        {
            category: '内分泌代謝疾患',
            difficulty: '普通',
            question: '2型糖尿病に特徴的な病態メカニズムとして最も適切なものはどれか？',
            options: [
                { text: '膵β細胞の完全な破壊によるインスリン欠乏', correct: false },
                { text: 'インスリン抵抗性とインスリン分泌低下の複合的要因', correct: true },
                { text: '自己免疫反応による膵島細胞の破壊', correct: false },
                { text: '膵α細胞の過剰活性化によるグルカゴン過剰', correct: false }
            ],
            explanation: '2型糖尿病は、インスリン抵抗性（インスリンの作用が十分に発揮されない状態）と、膵β細胞からのインスリン分泌低下という2つの要因が複合的に関与する疾患です。生活習慣や肥満、遺伝的要因が発症に関わります。',
            memoryTip: '覚え方：「2型糖尿病は<strong>二重苦</strong>の病気。効きにくい（抵抗性）＆出にくい（分泌低下）」'
        },
        {
            category: '神経系疾患',
            difficulty: '難しい',
            question: '脳梗塞の臨床症状として、中大脳動脈領域の梗塞で最も特徴的なものはどれか？',
            options: [
                { text: '両下肢の対麻痺と感覚障害', correct: false },
                { text: '意識障害と両側瞳孔散大', correct: false },
                { text: '対側の片麻痺と失語（優位半球の場合）', correct: true },
                { text: '小脳性運動失調と眩暈', correct: false }
            ],
            explanation: '中大脳動脈は大脳半球の外側面の大部分に血液を供給しており、この領域の梗塞では対側（反対側）の上下肢の片麻痺が生じます。また、優位半球（多くは左半球）の場合は言語中枢があるため、失語症を伴うことが特徴的です。',
            memoryTip: '覚え方：「中大脳動脈は脳の<strong>真ん中</strong>の動脈、だから<strong>体の半分</strong>が動かなくなる。左脳なら<strong>言葉</strong>も出なくなる」'
        }
    ];
    
    // 총 문제 수 표시
    totalQuestionsEl.textContent = quizData.length;
    
    // 문제 표시 함수
    function loadQuestion() {
        const currentQuiz = quizData[currentQuestionIndex];
        
        // 문제 제목, 카테고리, 난이도 업데이트
        questionTextEl.textContent = currentQuiz.question;
        document.querySelector('.quiz-category').textContent = currentQuiz.category;
        document.querySelector('.difficulty-level').textContent = `難易度: ${currentQuiz.difficulty}`;
        
        // 선택지 생성
        optionsContainer.innerHTML = '';
        currentQuiz.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.dataset.correct = option.correct;
            
            const optionLetter = document.createElement('span');
            optionLetter.classList.add('option-letter');
            optionLetter.textContent = String.fromCharCode(65 + index); // A, B, C, D...
            
            const optionText = document.createElement('span');
            optionText.classList.add('option-text');
            optionText.textContent = option.text;
            
            optionElement.appendChild(optionLetter);
            optionElement.appendChild(optionText);
            optionsContainer.appendChild(optionElement);
            
            // 선택지 클릭 이벤트
            optionElement.addEventListener('click', selectOption);
        });
        
        // 해설 숨기기
        explanationContainer.style.display = 'none';
        
        // 버튼 텍스트 업데이트
        nextBtn.textContent = '回答を確認';
        
        // 현재 문제 번호 업데이트
        currentQuestionEl.textContent = currentQuestionIndex + 1;
        
        // 진행 바 업데이트
        progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
        
        // 타이머 리셋
        resetTimer();
        
        // 캐릭터 상태 리셋
        updateCharacterState('normal', 'がんばって考えてみよう！');
        
        // 버튼 상태 업데이트
        isAnswerRevealed = false;
        
        // 해설 내용 업데이트
        explanationTextEl.textContent = currentQuiz.explanation;
        document.querySelector('.tip-text').innerHTML = currentQuiz.memoryTip;
    }
    
    // 선택지 선택 함수
    function selectOption(e) {
        // 답이 이미 공개되었으면 선택 불가
        if (isAnswerRevealed) return;
        
        // 기존 선택 해제
        const allOptions = document.querySelectorAll('.option');
        allOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // 현재 선택 표시
        const selectedOption = e.currentTarget;
        selectedOption.classList.add('selected');
    }
    
    // 다음 버튼 클릭 이벤트
    nextBtn.addEventListener('click', function() {
        // 답 확인 모드
        if (!isAnswerRevealed) {
            revealAnswer();
        } 
        // 다음 문제 모드
        else {
            // 마지막 문제였는지 확인
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                // 퀴즈 종료
                showFinalResult();
            }
        }
    });
    
    // 답 공개 함수
    function revealAnswer() {
        isAnswerRevealed = true;
        clearInterval(timerInterval); // 타이머 정지
        
        const selectedOption = document.querySelector('.option.selected');
        const allOptions = document.querySelectorAll('.option');
        
        // 정답과 오답 표시
        allOptions.forEach(option => {
            const isCorrect = option.dataset.correct === 'true';
            
            if (isCorrect) {
                option.classList.add('correct');
                option.classList.add('correct-answer-animation');
            } else if (option === selectedOption) {
                option.classList.add('incorrect');
                option.classList.add('incorrect-answer-animation');
            }
            
            // 이벤트 리스너 제거
            option.removeEventListener('click', selectOption);
        });
        
        // 선택한 답이 맞는지 확인
        let isSelectedCorrect = false;
        if (selectedOption && selectedOption.dataset.correct === 'true') {
            score++;
            isSelectedCorrect = true;
        }
        
        // 정답률 업데이트
        const correctRate = Math.round((score / (currentQuestionIndex + 1)) * 100);
        correctRateEl.textContent = `${correctRate}%`;
        
        // 버튼 텍스트 변경
        nextBtn.textContent = currentQuestionIndex < quizData.length - 1 ? '次の問題へ' : '結果を見る';
        
        // 해설 표시
        explanationContainer.style.display = 'block';
        
        // 캐릭터 상태 업데이트
        if (selectedOption) {
            if (isSelectedCorrect) {
                updateCharacterState('happy', 'その通り！よく頑張りました！');
            } else {
                updateCharacterState('sad', 'ざんねん！でも、次はきっと大丈夫！');
            }
        } else {
            updateCharacterState('surprised', '選択してみましょう！');
        }
    }
    
    // 최종 결과 표시 함수
    function showFinalResult() {
        const correctRate = Math.round((score / quizData.length) * 100);
        
        // 결과 메시지 생성
        let resultMessage, characterState;
        
        if (correctRate >= 80) {
            resultMessage = `素晴らしい！${correctRate}%の正解率です！このまま頑張れば、試験に合格できますよ！`;
            characterState = 'happy';
        } else if (correctRate >= 60) {
            resultMessage = `良くがんばりました！${correctRate}%の正解率です。まだ改善の余地がありますね！`;
            characterState = 'normal';
        } else {
            resultMessage = `残念ながら${correctRate}%の正解率でした。もう一度復習して、再挑戦しましょう！`;
            characterState = 'sad';
        }
        
        // 컨텐츠 영역 변경
        document.querySelector('.quiz-content').innerHTML = `
            <div class="result-container">
                <h3 class="result-title">クイズ結果</h3>
                <div class="result-score">
                    <div class="score-circle">
                        <span class="score-number">${score}</span>
                        <span class="score-total">/${quizData.length}</span>
                    </div>
                    <div class="score-text">
                        <p>正解率: <strong>${correctRate}%</strong></p>
                    </div>
                </div>
                
                <div class="character-container">
                    <div class="nurse-character">
                        <img src="../../assets/Nurse${characterState === 'surprised' ? '_Surised' : ''}.PNG" alt="看護師キャラクター">
                        <div class="speech-bubble">
                            <p>${resultMessage}</p>
                        </div>
                    </div>
                </div>
                
                <div class="result-tips">
                    <p>次のステップ：</p>
                    <ul>
                        <li>間違えた問題を復習しましょう</li>
                        <li>関連する内容を深く学びましょう</li>
                        <li>定期的に問題を解いて知識を定着させましょう</li>
                    </ul>
                </div>
            </div>
        `;
        
        // 버튼 변경
        nextBtn.textContent = '最初からやり直す';
        nextBtn.removeEventListener('click', nextBtn.onclick);
        nextBtn.addEventListener('click', resetQuiz);
    }
    
    // 퀴즈 리셋 함수
    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
        correctRateEl.textContent = '0%';
    }
    
    // 타이머 함수
    function startTimer() {
        timerInterval = setInterval(function() {
            timeLeft--;
            timeLeftEl.textContent = timeLeft;
            
            // 시간 종료 시
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                
                // 아직 답을 선택하지 않았다면 자동 공개
                if (!isAnswerRevealed) {
                    updateCharacterState('surprised', '時間切れ！答えを確認しましょう！');
                    revealAnswer();
                }
            }
            
            // 시간이 10초 미만일 때 경고
            if (timeLeft <= 10 && !isAnswerRevealed) {
                updateCharacterState('surprised', `あと${timeLeft}秒！急いで！`);
                timeLeftEl.style.color = '#ff4d4d';
            }
        }, 1000);
    }
    
    // 타이머 리셋 함수
    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 60;
        timeLeftEl.textContent = timeLeft;
        timeLeftEl.style.color = '';
        startTimer();
    }
    
    // 캐릭터 상태 업데이트 함수
    function updateCharacterState(state, message) {
        // 이미지 업데이트
        if(state === 'surprised') {
            nurseImage.src = `../../assets/Nurse_Surised.PNG`;
        } else {
            nurseImage.src = `../../assets/Nurse.PNG`;
        }
        
        // 메시지 업데이트
        characterSpeech.textContent = message;
        
        // 캐릭터 애니메이션
        const character = document.getElementById('nurse-character');
        character.classList.remove('character-animated');
        void character.offsetWidth; // 리플로우 강제 (애니메이션 리셋)
        character.classList.add('character-animated');
        
        // 랜덤 움직임 추가 (재미 요소)
        if (state === 'happy') {
            character.style.animation = 'bounce 0.6s ease';
        } else if (state === 'sad') {
            character.style.animation = 'shake 0.5s ease';
        } else if (state === 'surprised') {
            character.style.animation = 'pulse 0.4s ease';
        } else {
            character.style.animation = '';
        }
        
        // 애니메이션 종료 후 스타일 제거
        setTimeout(() => {
            character.style.animation = '';
        }, 600);
    }
    
    // 재미 요소: 학습 팁 랜덤 생성
    const studyTips = [
        '問題を解く前に、問題文を二回読むと理解が深まります！',
        '似た言葉や概念は対比して覚えると混同を防げます！',
        'イメージを作りながら学ぶと記憶に残りやすいです！',
        '学習後すぐに復習すると、記憶の定着率が上がります！',
        '難しい概念は例え話で理解すると覚えやすいです！',
        '定期的に小テストを行うと、記憶の保持力がアップします！',
        '覚えにくい用語は語源から理解すると覚えやすくなります！',
        'ポジティブな気持ちで学ぶと、学習効率が高まります！'
    ];
    
    // 초기 문제 로드
    loadQuestion();
    
    // 랜덤 팁 표시 (5분마다) - 실제 서비스 시 활성화
    /*
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * studyTips.length);
        
        // 답을 확인 중이 아닐 때만 팁 표시
        if (!isAnswerRevealed) {
            updateCharacterState('normal', studyTips[randomIndex]);
            
            // 3초 후 원래 메시지로 복귀
            setTimeout(() => {
                updateCharacterState('normal', 'がんばって考えてみよう！');
            }, 5000);
        }
    }, 300000); // 5분
    */
});