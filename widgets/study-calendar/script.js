document.addEventListener('DOMContentLoaded', function() {
    // 캘린더 변수
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    // 과목별 색상
    const subjectColors = {
        '基礎看護学': '#FFAEC9',
        '成人看護学': '#AEDEE0',
        '小児看護学': '#D8BFD8',
        '老年看護学': '#FFFACD',
        '精神看護学': '#FF6F61',
        '母性看護学': '#87CEEB',
        '在宅看護論': '#98FB98',
        '必修問題': '#FFA07A'
    };
    
    // 학습 일정 데이터 (실제 서비스에서는 데이터베이스에서 가져올 것)
    const studySchedule = {
        '2025-04-26': [
            { time: '09:00-10:30', subject: '基礎看護学', activity: 'の復習' },
            { time: '13:00-14:30', subject: '成人看護学', activity: 'の問題演習' },
            { time: '19:00-20:00', subject: '小児看護学', activity: 'の暗記' }
        ],
        '2025-04-27': [
            { time: '10:00-11:30', subject: '老年看護学', activity: 'の復習' },
            { time: '14:00-15:30', subject: '精神看護学', activity: 'の問題演習' }
        ],
        '2025-04-28': [
            { time: '09:00-10:30', subject: '母性看護学', activity: 'の復習' },
            { time: '13:00-14:30', subject: '在宅看護論', activity: 'の問題演習' }
        ],
        '2025-04-29': [
            { time: '10:00-12:00', subject: '必修問題', activity: 'の総合演習' }
        ],
        '2025-04-30': [
            { time: '13:00-15:00', subject: '基礎看護学', activity: 'の模擬試験' },
            { time: '18:00-19:00', subject: '成人看護学', activity: 'の復習' }
        ],
        '2025-05-01': [
            { time: '09:00-10:30', subject: '小児看護学', activity: 'の復習' },
            { time: '14:00-16:00', subject: '老年看護学', activity: 'の問題演習' }
        ],
        '2025-05-02': [
            { time: '10:00-12:00', subject: '精神看護学', activity: 'の総合演習' },
            { time: '15:00-16:30', subject: '母性看護学', activity: 'の復習' }
        ]
    };
    
    // DOM 요소
    const monthYear = document.getElementById('month-year');
    const calendarDays = document.getElementById('calendar-days');
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');
    const todaySchedule = document.getElementById('today-schedule');
    const addScheduleBtn = document.getElementById('add-schedule');
    
    // 월 이름 배열
    const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    
    // 이전 달로 이동
    prevMonth.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        showCalendar(currentMonth, currentYear);
    });
    
    // 다음 달로 이동
    nextMonth.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        showCalendar(currentMonth, currentYear);
    });
    
    // 일정 추가 버튼 클릭 이벤트
    addScheduleBtn.addEventListener('click', function() {
        // 실제 서비스에서는 일정 추가 모달 표시
        const randomSound = [
            'ぽよん♪',
            'わくわく！',
            'がんばるぞー！',
            'よっしゃー！',
            'きゅぴーん！'
        ];
        
        const randomIndex = Math.floor(Math.random() * randomSound.length);
        alert(`新しい学習予定を追加しましょう！ ${randomSound[randomIndex]}`);
    });
    
    // 캘린더 표시 함수
    function showCalendar(month, year) {
        // 월 제목 업데이트
        monthYear.textContent = `${year}年 ${months[month]}`;
        
        // 해당 월의 첫 날과 마지막 날 구하기
        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = 32 - new Date(year, month, 32).getDate();
        
        // 캘린더 비우기
        calendarDays.innerHTML = '';
        
        // 이전 달의 날짜 채우기
        for (let i = 0; i < firstDay; i++) {
            const prevMonthDay = document.createElement('div');
            prevMonthDay.classList.add('day', 'inactive');
            calendarDays.appendChild(prevMonthDay);
        }
        
        // 현재 달의 날짜 채우기
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            
            // 오늘 날짜인지 확인
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            
            // 일정이 있는지 확인
            if (studySchedule[dateStr]) {
                dayDiv.classList.add('has-event');
                
                // 날짜 표시
                const dayNumber = document.createElement('div');
                dayNumber.classList.add('day-number');
                dayNumber.textContent = day;
                dayDiv.appendChild(dayNumber);
                
                // 일정 표시 (색상 점)
                const daySubjects = document.createElement('div');
                daySubjects.classList.add('day-subjects');
                
                // 각 일정의 과목별로 색상 점 추가
                const subjectsShown = new Set();
                studySchedule[dateStr].forEach(schedule => {
                    if (!subjectsShown.has(schedule.subject)) {
                        const subjectDot = document.createElement('div');
                        subjectDot.classList.add('day-subject');
                        subjectDot.style.backgroundColor = subjectColors[schedule.subject];
                        daySubjects.appendChild(subjectDot);
                        subjectsShown.add(schedule.subject);
                    }
                });
                
                dayDiv.appendChild(daySubjects);
                
                // 클릭 이벤트
                dayDiv.addEventListener('click', function() {
                    showDaySchedule(dateStr);
                });
            } else {
                // 일정이 없는 날짜는 숫자만 표시
                dayDiv.textContent = day;
            }
            
            calendarDays.appendChild(dayDiv);
        }
        
        // 오늘의 일정 업데이트
        updateTodaySchedule();
    }
    
    // 특정 날짜의 일정 표시 함수
    function showDaySchedule(dateStr) {
        if (!studySchedule[dateStr]) return;
        
        // 실제 서비스에서는 모달이나 별도 영역에 일정 표시
        let scheduleStr = `${dateStr}の学習予定:\n\n`;
        
        studySchedule[dateStr].forEach(schedule => {
            scheduleStr += `▶ ${schedule.time}: ${schedule.subject}${schedule.activity}\n`;
        });
        
        alert(scheduleStr);
    }
    
    // 오늘의 일정 업데이트 함수
    function updateTodaySchedule() {
        todaySchedule.innerHTML = '';
        
        const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        
        if (studySchedule[todayStr]) {
            studySchedule[todayStr].forEach(schedule => {
                const item = document.createElement('div');
                item.classList.add('schedule-item');
                
                const time = document.createElement('span');
                time.classList.add('schedule-time');
                time.textContent = schedule.time;
                
                const subject = document.createElement('span');
                subject.classList.add('schedule-subject');
                subject.style.backgroundColor = subjectColors[schedule.subject];
                subject.textContent = `${schedule.subject}${schedule.activity}`;
                
                item.appendChild(time);
                item.appendChild(subject);
                todaySchedule.appendChild(item);
            });
        } else {
            // 오늘 일정이 없는 경우
            const noSchedule = document.createElement('div');
            noSchedule.classList.add('no-schedule');
            noSchedule.textContent = '今日の予定はまだありません。新しい学習予定を追加しましょう！';
            todaySchedule.appendChild(noSchedule);
        }
    }
    
    // 초기 캘린더 표시
    showCalendar(currentMonth, currentYear);
    
    // 재미 요소: 응원 메시지 랜덤 표시
    const encouragements = [
        '今日も頑張りましょう！',
        '小さな一歩が大きな成果へ！',
        '継続は力なり！',
        '諦めなければ、必ず合格できる！',
        'あなたならできる！信じて！',
        '今の努力は未来の笑顔につながる！',
        '休憩も大事！無理せず頑張って！',
        'ミスは成長のチャンス！前向きに！'
    ];
    
    // 5-10초마다 랜덤 응원 메시지 표시 (실제 사용 시 활성화)
    /*
    setInterval(() => {
        const tipText = document.querySelector('.tip-text');
        const randomIndex = Math.floor(Math.random() * encouragements.length);
        
        // 애니메이션 효과로 텍스트 변경
        tipText.style.opacity = 0;
        
        setTimeout(() => {
            tipText.textContent = encouragements[randomIndex];
            tipText.style.opacity = 1;
        }, 500);
    }, Math.floor(Math.random() * 5000) + 5000); // 5-10초 랜덤
    */
});