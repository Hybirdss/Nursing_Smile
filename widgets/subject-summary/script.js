document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소
    const subjectSelector = document.getElementById('subject-selector');
    const subjectIcon = document.getElementById('subject-icon');
    const subjectTitle = document.getElementById('subject-title');
    const examRate = document.getElementById('exam-rate');
    const difficultyStars = document.getElementById('difficulty-stars');
    const conceptList = document.getElementById('concept-list');
    const diagramContainer = document.getElementById('diagram-container');
    const keyPoints = document.getElementById('key-points');
    const memoryTips = document.getElementById('memory-tips');
    const masteryBar = document.getElementById('mastery-bar');
    const masteryPercentage = document.getElementById('mastery-percentage');
    const relatedTags = document.getElementById('related-tags');
    const correctRate = document.getElementById('correct-rate');
    const studyTime = document.getElementById('study-time');
    const lastStudied = document.getElementById('last-studied');
    const solvedProblems = document.getElementById('solved-problems');
    const studyBtn = document.getElementById('study-btn');
    
    // 과목 데이터
    const subjectData = {
        circulation: {
            icon: '🫀',
            title: '循環器疾患',
            examRate: '15%',
            difficulty: 4, // 5점 만점
            concepts: [
                { name: '心不全', importance: 'high' },
                { name: '心筋梗塞', importance: 'high' },
                { name: '狭心症', importance: 'medium' },
                { name: '不整脈', importance: 'medium' },
                { name: '高血圧', importance: 'low' }
            ],
            diagram: {
                main: '循環器疾患',
                nodes: [
                    { text: '心臓疾患', position: { top: '20%', left: '30%' } },
                    { text: '血管疾患', position: { top: '20%', right: '30%' } },
                    { text: '先天性疾患', position: { bottom: '20%', left: '30%' } },
                    { text: '後天性疾患', position: { bottom: '20%', right: '30%' } }
                ]
            },
            keyPoints: [
                '心機能の低下は「前負荷」と「後負荷」の概念で理解する',
                '急性心不全と慢性心不全の症状の違いを比較して覚える',
                '心電図の基本波形（P波、QRS群、T波）の意味を理解する'
            ],
            memoryTips: [
                { text: '「心不全」は「心臓が<strong>不参加</strong>で試験に<strong>全滅</strong>」と覚える(しん-ふ-ぜん)' },
                { text: '「狭心症」は胸が<strong>狭く</strong>なって<strong>心</strong>が痛い(きょう-しん-しょう)' }
            ],
            mastery: 65,
            relatedSubjects: ['基礎看護学', '薬理学', '病態生理学', '成人看護学'],
            performance: {
                correctRate: '75%',
                studyTime: '3.5h',
                lastStudied: '昨日',
                solvedProblems: '42問'
            }
        },
        respiratory: {
            icon: '🫁',
            title: '呼吸器疾患',
            examRate: '12%',
            difficulty: 3,
            concepts: [
                { name: '慢性閉塞性肺疾患', importance: 'high' },
                { name: '気管支喘息', importance: 'high' },
                { name: '肺炎', importance: 'high' },
                { name: '肺結核', importance: 'medium' },
                { name: '肺がん', importance: 'medium' }
            ],
            diagram: {
                main: '呼吸器疾患',
                nodes: [
                    { text: '閉塞性疾患', position: { top: '20%', left: '30%' } },
                    { text: '拘束性疾患', position: { top: '20%', right: '30%' } },
                    { text: '感染症', position: { bottom: '20%', left: '30%' } },
                    { text: '腫瘍性疾患', position: { bottom: '20%', right: '30%' } }
                ]
            },
            keyPoints: [
                '呼吸機能検査の解釈方法を理解する',
                '酸素療法と人工呼吸器管理の基本を押さえる',
                '呼吸音の聴診と異常音の鑑別が重要'
            ],
            memoryTips: [
                { text: '「COPD」は「<strong>Co</strong>ffee <strong>P</strong>owder <strong>D</strong>isease」＝「コーヒーのように<strong>詰まる</strong>病気」' },
                { text: '「気管支喘息」は「<strong>気</strong>になって<strong>管</strong>理できない<strong>支</strong>出が<strong>喘</strong>ぐほど多い」' }
            ],
            mastery: 58,
            relatedSubjects: ['基礎看護学', '薬理学', '病態生理学', '成人看護学'],
            performance: {
                correctRate: '68%',
                studyTime: '2.8h',
                lastStudied: '3日前',
                solvedProblems: '35問'
            }
        },
        digestive: {
            icon: '�胃',
            title: '消化器疾患',
            examRate: '13%',
            difficulty: 3,
            concepts: [
                { name: '肝硬変', importance: 'high' },
                { name: '胃潰瘍・十二指腸潰瘍', importance: 'high' },
                { name: '大腸がん', importance: 'medium' },
                { name: '肝炎', importance: 'medium' },
                { name: '胆石症', importance: 'low' }
            ],
            diagram: {
                main: '消化器疾患',
                nodes: [
                    { text: '上部消化管', position: { top: '20%', left: '30%' } },
                    { text: '下部消化管', position: { top: '20%', right: '30%' } },
                    { text: '肝胆膵疾患', position: { bottom: '20%', left: '30%' } },
                    { text: '機能性疾患', position: { bottom: '20%', right: '30%' } }
                ]
            },
            keyPoints: [
                '肝機能検査値の解釈と異常値の意味を理解する',
                '消化器症状と疾患の関連を系統的に覚える',
                '消化管出血の緊急対応と看護介入を押さえる'
            ],
            memoryTips: [
                { text: '「肝硬変」の症状は「<strong>硬</strong>い<strong>変</strong>わり者」＝「腹水、黄疸、クモ状血管腫」' },
                { text: '「胃潰瘍」は「<strong>居</strong>眠りしてると<strong>潰</strong>される」＝「じっとしていても痛みがある」' }
            ],
            mastery: 72,
            relatedSubjects: ['基礎看護学', '薬理学', '病態生理学', '成人看護学'],
            performance: {
                correctRate: '82%',
                studyTime: '4.2h',
                lastStudied: '今日',
                solvedProblems: '47問'
            }
        },
        endocrine: {
            icon: '🦠',
            title: '内分泌代謝疾患',
            examRate: '10%',
            difficulty: 4,
            concepts: [
                { name: '糖尿病', importance: 'high' },
                { name: '甲状腺機能亢進症', importance: 'high' },
                { name: '副腎皮質機能障害', importance: 'medium' },
                { name: '下垂体機能障害', importance: 'medium' },
                { name: '脂質異常症', importance: 'low' }
            ],
            diagram: {
                main: '内分泌代謝疾患',
                nodes: [
                    { text: '糖代謝異常', position: { top: '20%', left: '30%' } },
                    { text: '甲状腺疾患', position: { top: '20%', right: '30%' } },
                    { text: '副腎疾患', position: { bottom: '20%', left: '30%' } },
                    { text: '下垂体疾患', position: { bottom: '20%', right: '30%' } }
                ]
            },
            keyPoints: [
                'ホルモンのフィードバック機構を理解する',
                '血糖値の調節機構と異常時の対応を押さえる',
                '代謝性アシドーシスとアルカローシスの鑑別が重要'
            ],
            memoryTips: [
                { text: '「2型糖尿病」は「<strong>2</strong>つの<strong>型</strong>の問題」＝「インスリン分泌低下とインスリン抵抗性」' },
                { text: '「バセドウ病」の症状は「<strong>ハ</strong>ンサムに<strong>セ</strong>カセカ<strong>ド</strong>キドキ<strong>ウ</strong>デが震える」' }
            ],
            mastery: 60,
            relatedSubjects: ['基礎看護学', '薬理学', '病態生理学', '成人看護学'],
            performance: {
                correctRate: '70%',
                studyTime: '3.0h',
                lastStudied: '2日前',
                solvedProblems: '38問'
            }
        },
        psychiatric: {
            icon: '🧠',
            title: '精神疾患',
            examRate: '8%',
            difficulty: 4,
            concepts: [
                { name: 'うつ病', importance: 'high' },
                { name: '統合失調症', importance: 'high' },
                { name: '双極性障害', importance: 'medium' },
                { name: '不安障害', importance: 'medium' },
                { name: '認知症', importance: 'medium' }
            ],
            diagram: {
                main: '精神疾患',
                nodes: [
                    { text: '気分障害', position: { top: '20%', left: '30%' } },
                    { text: '思考障害', position: { top: '20%', right: '30%' } },
                    { text: '認知障害', position: { bottom: '20%', left: '30%' } },
                    { text: '人格障害', position: { bottom: '20%', right: '30%' } }
                ]
            },
            keyPoints: [
                '主な向精神薬の作用機序と副作用を理解する',
                '精神症状の客観的評価方法を押さえる',
                '患者との治療的コミュニケーション技法が重要'
            ],
            memoryTips: [
                { text: '「統合失調症」の陽性症状と陰性症状は「<strong>陽</strong>気な妄想と<strong>陰</strong>気な意欲低下」' },
                { text: '「うつ病」の症状は「<strong>う</strong>なだれて<strong>つ</strong>らそう」＝「不眠、食欲低下、興味喪失」' }
            ],
            mastery: 55,
            relatedSubjects: ['基礎看護学', '薬理学', '病態生理学', '精神看護学'],
            performance: {
                correctRate: '65%',
                studyTime: '2.5h',
                lastStudied: '4日前',
                solvedProblems: '30問'
            }
        }
    };
    
    // 과목 데이터 표시 함수
    function displaySubjectData(subject) {
        const data = subjectData[subject];
        
        // 아이콘 및 제목 업데이트
        subjectIcon.textContent = data.icon;
        subjectTitle.textContent = data.title;
        
        // 출제율 및 난이도 업데이트
        examRate.textContent = data.examRate;
        
        // 난이도 별점 업데이트
        const stars = difficultyStars.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < data.difficulty) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        
        // 중요 개념 목록 업데이트
        conceptList.innerHTML = '';
        data.concepts.forEach(concept => {
            const li = document.createElement('li');
            li.classList.add('concept-item');
            
            const nameSpan = document.createElement('span');
            nameSpan.classList.add('concept-name');
            nameSpan.textContent = concept.name;
            
            const importanceSpan = document.createElement('span');
            importanceSpan.classList.add('concept-importance', concept.importance);
            
            // 중요도 라벨 설정
            switch(concept.importance) {
                case 'high':
                    importanceSpan.textContent = '必須';
                    break;
                case 'medium':
                    importanceSpan.textContent = '重要';
                    break;
                case 'low':
                    importanceSpan.textContent = '一般';
                    break;
            }
            
            li.appendChild(nameSpan);
            li.appendChild(importanceSpan);
            conceptList.appendChild(li);
        });
        
        // 관계도 업데이트
        const mainNode = diagramContainer.querySelector('.main-node');
        mainNode.textContent = data.diagram.main;
        
        data.diagram.nodes.forEach((node, index) => {
            const nodeEl = diagramContainer.querySelector(`.node-${index + 1}`);
            nodeEl.textContent = node.text;
            
            // 위치 조정이 필요하면 여기에 추가
            if (node.position) {
                for (const [prop, value] of Object.entries(node.position)) {
                    nodeEl.style[prop] = value;
                }
            }
        });
        
        // 핵심 포인트 업데이트
        keyPoints.innerHTML = '';
        data.keyPoints.forEach(point => {
            const p = document.createElement('p');
            p.classList.add('point-item');
            p.textContent = point;
            keyPoints.appendChild(p);
        });
        
        // 암기 팁 업데이트
        memoryTips.innerHTML = '';
        data.memoryTips.forEach(tip => {
            const div = document.createElement('div');
            div.classList.add('tip-item');
            
            const icon = document.createElement('span');
            icon.classList.add('tip-icon');
            icon.textContent = '💡';
            
            const text = document.createElement('p');
            text.classList.add('tip-text');
            text.innerHTML = tip.text;
            
            div.appendChild(icon);
            div.appendChild(text);
            memoryTips.appendChild(div);
        });
        
        // 습득도 업데이트
        masteryBar.style.width = `${data.mastery}%`;
        masteryPercentage.textContent = `${data.mastery}%`;
        
        // 관련 과목 업데이트
        relatedTags.innerHTML = '';
        data.relatedSubjects.forEach(tag => {
            const span = document.createElement('span');
            span.classList.add('related-tag');
            span.textContent = tag;
            relatedTags.appendChild(span);
        });
        
        // 성적 업데이트
        correctRate.textContent = data.performance.correctRate;
        studyTime.textContent = data.performance.studyTime;
        lastStudied.textContent = data.performance.lastStudied;
        solvedProblems.textContent = data.performance.solvedProblems;
        
        // 버튼 텍스트 업데이트
        studyBtn.textContent = `この${data.title}を学習する`;
        
        // 카드 애니메이션 효과
        const card = document.getElementById('subject-card');
        card.style.animation = 'none';
        void card.offsetWidth; // 리플로우 강제 (애니메이션 리셋)
        card.style.animation = 'fadeIn 0.5s ease-out';
    }
    
    // 과목 선택 변경 이벤트
    subjectSelector.addEventListener('change', function() {
        displaySubjectData(this.value);
    });
    
    // 학습 버튼 클릭 이벤트
    studyBtn.addEventListener('click', function() {
        const subject = subjectSelector.value;
        alert(`${subjectData[subject].title}の学習ページに移動します！`);
        // 실제 서비스에서는 해당 과목 페이지로 이동
    });
    
    // 관련 과목 클릭 이벤트 (재미 요소)
    relatedTags.addEventListener('click', function(e) {
        if (e.target.classList.contains('related-tag')) {
            const tag = e.target.textContent;
            alert(`「${tag}」のページに移動します！`);
            // 실제 서비스에서는 관련 과목 페이지로 이동
        }
    });
    
    // 재미 요소: 아이콘 클릭 시 특수 효과
    subjectIcon.addEventListener('click', function() {
        const subject = subjectSelector.value;
        
        // 과목별 특수 효과
        switch(subject) {
            case 'circulation':
                this.style.animation = 'pulse 0.5s ease 3';
                this.style.color = '#ff4d4d';
                setTimeout(() => {
                    this.style.animation = '';
                    this.style.color = '';
                }, 1500);
                alert('ドキドキ・・・心臓が鼓動しています！');
                break;
            case 'respiratory':
                this.style.animation = 'pulse 2s ease 3';
                setTimeout(() => {
                    this.style.animation = '';
                }, 6000);
                alert('スーハースーハー・・・深呼吸しましょう！');
                break;
            case 'digestive':
                this.style.animation = 'shake 0.3s ease 3';
                setTimeout(() => {
                    this.style.animation = '';
                }, 1000);
                alert('グルグル・・・お腹が鳴っています！');
                break;
            case 'endocrine':
                this.style.animation = 'bounce 0.5s ease 3';
                setTimeout(() => {
                    this.style.animation = '';
                }, 1500);
                alert('ホルモンがバランスよく分泌されています！');
                break;
            case 'psychiatric':
                this.style.animation = 'fadeIn 1s ease 3';
                this.style.opacity = 0.5;
                setTimeout(() => {
                    this.style.animation = '';
                    this.style.opacity = 1;
                }, 3000);
                alert('考え中・・・脳が活性化しています！');
                break;
        }
    });
    
    // 재미 요소: 랜덤 학습 팁
    const randomTips = [
        '定期的に休憩を取ることで、学習効率がアップします！',
        '同じ内容を音読すると、記憶の定着率が30%も上がります！',
        '問題を解く前に、問題文を2回読むと理解が深まります！',
        '睡眠不足は記憶力を低下させます。しっかり寝ましょう！',
        '1つのテーマを25分間集中して学習し、5分休憩する「ポモドーロ・テクニック」が効果的です！',
        '学習内容を誰かに教えるつもりで復習すると、理解度が格段に上がります！',
        '試験直前の徹夜勉強より、毎日少しずつ学習する方が効果的です！',
        '色ペンを使って情報を分類すると、脳が情報を整理しやすくなります！'
    ];
    
    // 페이지 로드 후 3초 후에 랜덤 팁 표시 (실제 서비스 시 활성화)
    /*
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * randomTips.length);
        alert(`📝 学習ワンポイントアドバイス:\n${randomTips[randomIndex]}`);
    }, 3000);
    */
    
    // 초기 데이터 표시
    displaySubjectData('circulation');
});