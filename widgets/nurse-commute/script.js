document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소
    const currentTimeEl = document.getElementById('current-time');
    const scene = document.getElementById('scene');
    const nurse = document.getElementById('nurse');
    const nurseImage = document.getElementById('nurse-image');
    const background = document.getElementById('background');
    const speechBubble = document.getElementById('speech-bubble');
    const speechText = document.getElementById('speech-text');
    const train = document.getElementById('train');
    const hospital = document.getElementById('hospital');
    const home = document.getElementById('home');
    const station = document.getElementById('station');
    const timeButtons = document.querySelectorAll('.time-btn');
    const nextFactBtn = document.getElementById('next-fact-btn');
    const funFactEl = document.getElementById('fun-fact');
    
    // 시간대별 설정
    const timeSettings = {
        morning: {
            time: '07:30',
            background: 'morning-bg', // 아침 배경
            nursePosition: { left: '20%', bottom: '0' }, // 바닥으로 내리기
            nurseState: 'normal',
            speechPosition: 'right', // 말풍선 오른쪽 배치
            speech: [
                'おはようございます！今日も頑張ります！',
                '電車、混んでますね～',
                '今日の病棟は忙しいかな？',
                '朝ごはん食べてきて良かった！'
            ],
            objects: {
                train: false,
                hospital: false,
                home: false,
                station: false
            }
        },
        day: {
            time: '14:30',
            background: 'day-bg', // 낮 배경
            nursePosition: { left: '70%', bottom: '0' }, // 바닥으로 내리기
            nurseState: 'happy',
            speechPosition: 'left', // 말풍선 왼쪽 배치
            speech: [
                '患者さんの回復が順調で良かった！',
                'バイタルチェック完了！',
                '先輩ナース、いつも優しくて助かります',
                '今日の昼ごはん、美味しかった！'
            ],
            objects: {
                train: false,
                hospital: false,
                home: false,
                station: false
            }
        },
        evening: {
            time: '19:00',
            background: 'afternoon-bg', // 오후 배경
            nursePosition: { left: '30%', bottom: '0' }, // 바닥으로 내리기
            nurseState: 'normal',
            speechPosition: 'right', // 말풍선 오른쪽 배치
            speech: [
                '今日も一日お疲れ様でした！',
                '明日の試験勉強、頑張らなきゃ！',
                '帰ったらゆっくりお風呂に入ろう',
                '今日の患者さん、笑顔が見れて良かった'
            ],
            objects: {
                train: false,
                hospital: false,
                home: false,
                station: false
            }
        },
        night: {
            time: '23:45',
            background: 'evening-bg', // 저녁/퇴근 배경
            nursePosition: { left: '70%', bottom: '0' }, // 바닥으로 내리기
            nurseState: 'surprised',
            speechPosition: 'left', // 말풍선 왼쪽 배치
            speech: [
                '夜勤、がんばります！',
                'コーヒー飲んで目を覚まそう',
                '患者さん、ぐっすり眠れますように',
                '星がきれいな夜ですね'
            ],
            objects: {
                train: false,
                hospital: false,
                home: false,
                station: false
            }
        }
    };
    
    // 간호사 지식 데이터
    const nursingFacts = [
        '日本の看護師国家試験の合格率は約90%で、毎年約6万人が受験しています。頑張れば、あなたも合格できます！',
        '看護師さんは、一日に平均6～8キロも歩くそうです。まさに「足腰が強い」職業ですね！',
        '「白衣の天使」という言葉は、19世紀にクリミア戦争で負傷兵を看護したフローレンス・ナイチンゲールに由来するという説があります。',
        '「看護の日」は、フローレンス・ナイチンゲールの誕生日である5月12日に制定されています。',
        '看護師国家試験では、必修問題で一定の正答率に達しないと、他の問題の得点がどれだけ高くても不合格になります。必修問題は基本中の基本です！',
        '日本では、看護師の約95%が女性ですが、近年は男性看護師も増加傾向にあります。',
        '看護師の制服「ナースキャップ」は、感染予防の観点から現在ではほとんど使用されなくなりました。でも、かわいいですよね！',
        '「循環器疾患」は看護師国家試験でよく出題される分野の一つです。心臓や血管の働きをしっかり理解しておきましょう！',
        '看護師国家試験の問題数は全部で240問！時間配分が重要です。',
        '看護師国家試験の試験時間は1日で合計5時間45分。体力勝負の一面もあります！',
        '「アセスメント」「インターベンション」「エバリュエーション」は看護過程の重要なステップです。これを押さえれば、多くの状況設定問題に対応できます！',
        '看護学生にとって「解剖生理」の理解は全ての土台。特に「人体の構造と機能」は重点的に学習しましょう！'
    ];
    
    // 랜덤 요소 (재미 요소)
    const randomEvents = [
        {
            trigger: 'morning',
            chance: 0.3, // 30% 확률
            action: function() {
                speechText.textContent = 'あっ！電車に財布忘れた！...と思ったけど、ポケットにあった。よかった～';
                updateNurseState('surprised');
                nurse.style.animation = 'bounce 0.5s ease 3';
                setTimeout(() => {
                    nurse.style.animation = 'walk 0.6s infinite';
                    updateNurseState('happy');
                }, 1500);
            }
        },
        {
            trigger: 'day',
            chance: 0.25, // 25% 확률
            action: function() {
                speechText.textContent = 'わっ！担当医とバッタリ！緊張して敬語がぐちゃぐちゃに...恥ずかしい～';
                updateNurseState('surprised');
                nurse.style.animation = 'shake 0.3s ease 2';
                setTimeout(() => {
                    nurse.style.animation = 'walk 0.6s infinite';
                    updateNurseState(timeSettings['day'].nurseState);
                }, 1000);
            }
        },
        {
            trigger: 'evening',
            chance: 0.3, // 30% 확률
            action: function() {
                speechText.textContent = 'あ！駅の階段で転びそうになった！危ない危ない...';
                updateNurseState('surprised');
                nurse.style.animation = 'shake 0.4s ease 2';
                setTimeout(() => {
                    nurse.style.animation = 'walk 0.6s infinite';
                    updateNurseState('normal');
                }, 1000);
            }
        },
        {
            trigger: 'night',
            chance: 0.4, // 40% 확률
            action: function() {
                speechText.textContent = 'ふわぁ～...眠い...あっ！寝ちゃダメダメ！カフェイン補給！';
                updateNurseState('sad');
                nurse.style.animation = 'bounce 0.8s ease 1';
                setTimeout(() => {
                    nurse.style.animation = 'walk 0.6s infinite';
                    updateNurseState('surprised');
                }, 1000);
            }
        }
    ];
    
    // 현재 시간대
    let currentTimeOfDay = 'morning';
    let currentFactIndex = 0;
    
    // 간호사 상태 업데이트 함수
    function updateNurseState(state) {
        // PNG 이미지로 업데이트 (SVG 대신)
        if(state === 'surprised') {
            nurseImage.src = `../../assets/Nurse_Surised.PNG`;
        } else {
            nurseImage.src = `../../assets/Nurse.PNG`;
        }
        
        // 말풍선 표시 (상태가 변경된 경우)
        speechBubble.style.display = 'block';
        speechBubble.style.animation = 'fadeIn 0.5s ease';
    }
    
    // 시간대 변경 함수
    function changeTimeOfDay(timeOfDay) {
        // 기존 활성 버튼 비활성화
        document.querySelector('.time-btn.active')?.classList.remove('active');
        
        // 새 버튼 활성화
        document.querySelector(`.time-btn[data-time="${timeOfDay}"]`).classList.add('active');
        
        // 현재 시간대 업데이트
        currentTimeOfDay = timeOfDay;
        const settings = timeSettings[timeOfDay];
        
        // 시간 표시 업데이트
        currentTimeEl.textContent = settings.time;
        
        // 배경 변경
        const backgroundEl = document.getElementById('scene-background');
        // 모든 배경 클래스 제거
        backgroundEl.classList.remove('morning-bg', 'day-bg', 'afternoon-bg', 'evening-bg');
        // 새 배경 클래스 추가
        backgroundEl.classList.add(settings.background);
        
        // 간호사 위치 및 상태 변경
        nurse.style.left = settings.nursePosition.left;
        nurse.style.bottom = settings.nursePosition.bottom;
        updateNurseState(settings.nurseState);
        
        // 말풍선 위치 설정
        if (settings.speechPosition === 'right') {
            speechBubble.classList.add('right-position');
        } else {
            speechBubble.classList.remove('right-position');
        }
        
        // 말풍선 표시
        showSpeechBubble(timeOfDay);
        
        // 랜덤 이벤트 발생 확률 계산
        triggerRandomEvent(timeOfDay);
    }
    
    // 말풍선 표시 함수
    function showSpeechBubble(timeOfDay) {
        // 랜덤 대사 선택
        const speeches = timeSettings[timeOfDay].speech;
        const randomIndex = Math.floor(Math.random() * speeches.length);
        speechText.textContent = speeches[randomIndex];
        
        // 말풍선 표시
        speechBubble.style.display = 'block';
        speechBubble.style.animation = 'fadeIn 0.5s ease';
        
        // 5초 후 자동 숨김
        setTimeout(() => {
            speechBubble.style.animation = 'fadeIn 0.5s ease reverse';
            setTimeout(() => {
                speechBubble.style.display = 'none';
            }, 500);
        }, 5000);
    }
    
    // 기차 애니메이션 함수는 이제 사용하지 않음
    function animateTrain() {
        // 빈 함수로 남겨둠 (호출은 되지만 아무 동작 안함)
    }
    
    // 랜덤 이벤트 발생 함수
    function triggerRandomEvent(timeOfDay) {
        // 해당 시간대의 랜덤 이벤트 찾기
        const possibleEvents = randomEvents.filter(event => event.trigger === timeOfDay);
        
        if (possibleEvents.length > 0) {
            // 랜덤 선택
            const randomEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
            
            // 확률에 따른 발생
            if (Math.random() < randomEvent.chance) {
                // 일정 시간 후 이벤트 실행 (연출용)
                setTimeout(() => {
                    speechBubble.style.display = 'block';
                    randomEvent.action();
                }, 3000);
            }
        }
    }
    
    // 다음 지식 표시 함수
    function showNextFact() {
        // 다음 인덱스로 이동 (순환)
        currentFactIndex = (currentFactIndex + 1) % nursingFacts.length;
        
        // 텍스트 업데이트 애니메이션
        funFactEl.style.opacity = 0;
        
        setTimeout(() => {
            document.querySelector('.fact-text').textContent = nursingFacts[currentFactIndex];
            funFactEl.style.opacity = 1;
        }, 300);
    }
    
    // 이벤트 리스너 설정
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            changeTimeOfDay(this.dataset.time);
        });
    });
    
    nextFactBtn.addEventListener('click', showNextFact);
    
    // 간호사 캐릭터 클릭 시 말풍선 표시
    nurse.addEventListener('click', function() {
        // 말풍선 토글 (이미 표시 중이면 숨기고, 아니면 표시)
        if (speechBubble.style.display === 'block') {
            speechBubble.style.animation = 'fadeIn 0.5s ease reverse';
            setTimeout(() => {
                speechBubble.style.display = 'none';
            }, 500);
        } else {
            showSpeechBubble(currentTimeOfDay);
        }
        
        // 간호사 애니메이션
        nurse.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            nurse.style.animation = 'walk 0.6s infinite';
        }, 500);
    });
    
    // 재미 요소: 화면 클릭 시 간호사 점프
    scene.addEventListener('click', function(e) {
        // 간호사가 아닌 다른 영역 클릭 시
        if (e.target !== nurseImage && !nurse.contains(e.target)) {
            nurse.style.animation = 'bounce 0.5s ease';
            
            setTimeout(() => {
                nurse.style.animation = 'walk 0.6s infinite';
            }, 500);
            
            // 가끔 랜덤 멘트 (20% 확률)
            if (Math.random() < 0.2) {
                const randomComments = [
                    'きゃっ！びっくりした！',
                    'わ！何ですか？',
                    'ふふ、くすぐったいです！',
                    'ん？何か呼びましたか？',
                    'あら、こんにちは！'
                ];
                
                speechText.textContent = randomComments[Math.floor(Math.random() * randomComments.length)];
                speechBubble.style.display = 'block';
                
                setTimeout(() => {
                    speechBubble.style.display = 'none';
                }, 2000);
            }
        }
    });
    
    // 재미 요소: 병원이나 집 클릭 시 반응
    hospital.addEventListener('click', function() {
        if (hospital.style.display === 'block') {
            speechText.textContent = '今日も患者さんのために頑張ります！';
            speechBubble.style.display = 'block';
            updateNurseState('happy');
            
            setTimeout(() => {
                speechBubble.style.display = 'none';
                updateNurseState(timeSettings[currentTimeOfDay].nurseState);
            }, 2000);
        }
    });
    
    home.addEventListener('click', function() {
        if (home.style.display === 'block') {
            speechText.textContent = 'やっと帰れる～！お風呂入って寝よう♪';
            speechBubble.style.display = 'block';
            updateNurseState('happy');
            
            setTimeout(() => {
                speechBubble.style.display = 'none';
                updateNurseState(timeSettings[currentTimeOfDay].nurseState);
            }, 2000);
        }
    });
    
    // 초기 시간대 설정
    document.querySelector('.time-btn[data-time="morning"]').classList.add('active');
    changeTimeOfDay('morning');
    
    // 자동 시간 업데이트 (실제 서비스에서는 사용 가능)
    /*
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours();
        
        // 시간대 자동 변경
        if (hours >= 6 && hours < 12) {
            changeTimeOfDay('morning');
        } else if (hours >= 12 && hours < 18) {
            changeTimeOfDay('day');
        } else if (hours >= 18 && hours < 22) {
            changeTimeOfDay('evening');
        } else {
            changeTimeOfDay('night');
        }
    }, 60000); // 1분마다 체크
    */
});