class BaseNivelScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
        this.questionStartTime = 0;
    }

    init() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0; // Contador de respuestas correctas
        this.questionTexts = [];
    }

    preload() {
        this.load.image(this.config.bgKey, this.config.bgPath);
        this.load.image('personaje1', 'img/personaje1.png');
        this.load.image('personaje2', './img/personaje2.png');
        this.load.image(this.config.villanoKey, this.config.villanoPath);
        this.load.image('fireball', 'img/fuego.png');
        this.load.image('espada', 'img/espada.png');
    }

    create() {
        const background = this.add.image(0, 0, this.config.bgKey).setOrigin(0, 0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

        this.scoreText = this.add.text(20, 20, 'Score: 0', { 
            fontSize: '32px', 
            fill: '#FFF', 
            fontFamily: '"Press Start 2P"',
            stroke: '#000',
            strokeThickness: 4
        });

        this.feedbackText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 50, "", { 
            fontSize: '24px', 
            fill: '#000',
            wordWrap: { width: 350 },
            align: 'left' 
        }).setOrigin(0.5);

        const personajeValue = this.registry.get('personaje');
        this.personaje = this.add.image(150, 500, personajeValue);
        this.personaje.setScale(0.5);

        this.villano = this.add.image(650, 510, this.config.villanoKey).setScale(this.config.villanoScale);

        const total = this.config.questions.length;
        this.questionCounterText = this.add.text(
            650, 420, `1 de ${total}`,
            {
                fontSize: '18px',
                fontFamily: '"Press Start 2P"',
                fill: '#FFE600',
                stroke: '#000',
                strokeThickness: 5,
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionBox = this.createQuestionBox();
        this.showQuestion(this.questionBox);
        this.drawOvals(this.questionBox);

        this.add.text(this.questionBox.x / 2, this.questionBox.y + 20, this.config.levelTitle, {
            fontSize: '10px', fontFamily: '"Press Start 2P"', fill: '#DED947', align: 'center'
        }).setOrigin(0.5);
    }

    createQuestionBox() {
        const boxWidth = this.sys.game.config.width * 0.75;
        const boxHeight = this.sys.game.config.height * 0.45;
        const boxX = this.sys.game.config.width / 2 - boxWidth / 2;
        const boxY = 50;
        const box = this.add.graphics();
        box.fillStyle(0xA8B8A9, 0.88);
        box.lineStyle(3, 0x514A8B, 1);
        box.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 15);
        box.strokeRoundedRect(boxX, boxY, boxWidth, boxHeight, 15);
        return { x: boxX, y: boxY, width: boxWidth, height: boxHeight };
    }

    showQuestion(questionBox) {
        const question = this.config.questions[this.currentQuestionIndex];

        const questionText = this.add.text(
            questionBox.x + questionBox.width / 2,
            questionBox.y + questionBox.height / 4,
            question.question,
            {
                fontSize: '24px',
                fill: '#000',
                wordWrap: { width: questionBox.width - 40 },
                align: 'center'
            }
        ).setOrigin(0.5);

        this.questionTexts.push(questionText);

        const total = this.config.questions.length;
        this.questionCounterText.setText(`${this.currentQuestionIndex + 1} de ${total}`);

        this.questionStartTime = this.time.now;
    }

    drawOvals(questionBox) {
        const ovalWidth = 180;
        const ovalHeight = 70;
        const spacing = 10;
        const startX = questionBox.x + (questionBox.width - (ovalWidth * 3 + spacing * 2)) / 2;
        const startY = questionBox.y + questionBox.height - ovalHeight - 10;

        const opciones = this.config.questions[this.currentQuestionIndex].options;

        for (let i = 0; i < 3; i++) {
            const graphics = this.add.graphics();
            graphics.fillStyle(0xA8B8A9, 1);
            graphics.fillRoundedRect(startX + i * (ovalWidth + spacing), startY - ovalHeight / 2, ovalWidth, ovalHeight, ovalHeight / 2);
            graphics.lineStyle(2, 0x514A8B, 0.98);
            graphics.strokeRoundedRect(startX + i * (ovalWidth + spacing), startY - ovalHeight / 2, ovalWidth, ovalHeight, ovalHeight / 2);

            const text = this.add.text(
                startX + i * (ovalWidth + spacing) + ovalWidth / 2,
                startY,
                opciones[i],
                { fontSize: '13px', fill: '#000', align: 'center', wordWrap: { width: ovalWidth - 20 } }
            ).setOrigin(0.5)
             .setInteractive({ useHandCursor: true })
             .on('pointerdown', () => this.checkAnswer(i))
             .on('pointerout', () => text.setStyle({ fill: '#000' }));
            
            this.questionTexts.push(text);
        }
    }

    checkAnswer(selectedIndex) {
        const question = this.config.questions[this.currentQuestionIndex];
        const correctAnswerIndex = question.answer;
        const selectedText = this.questionTexts[selectedIndex + 1];

        this.questionTexts.slice(1).forEach(text => text.removeInteractive());

        if (selectedIndex === correctAnswerIndex - 1) {
            const timeTaken = this.time.now - this.questionStartTime;
            let calculatedScore = 50; 
            if (timeTaken < 10000) { 
                calculatedScore += Math.floor((10000 - timeTaken) / 200); 
            }
            this.score += calculatedScore;
            this.correctAnswers++; // Sumar respuesta correcta
            this.scoreText.setText('Score: ' + this.score);

            selectedText.setStyle({ fill: '#1A942C' });
            this.lanzarEspada();
            this.currentQuestionIndex++;
            this.time.delayedCall(3200, this.nextQuestion, [], this);
        } else {
            selectedText.setStyle({ fill: '#F91010' });
            this.launchFireball(); 
            this.currentQuestionIndex++;
            this.time.delayedCall(2500, this.nextQuestion, [], this);
        }
    }

    launchFireball() {
        const fireball = this.add.image(650, 500, 'fireball').setScale(2);
        this.tweens.add({
            targets: fireball,
            x: 150, y: 500,
            duration: 2000,
            onComplete: () => fireball.destroy()
        });
    }

    lanzarEspada() {
        const espada = this.add.image(this.personaje.x + 40, this.personaje.y + 20, 'espada').setScale(0.1);
        this.tweens.add({
            targets: espada,
            x: 630, y: this.villano.y,
            duration: 1200,
            onComplete: () => {
                this.tweens.add({
                    targets: espada,
                    x: this.personaje.x + 35, y: this.personaje.y + 20,
                    angle: -740,
                    duration: 1500,
                    onComplete: () => espada.destroy()
                });
            }
        });
    }

    nextQuestion() {
        this.questionTexts.forEach(text => text.destroy());
        this.questionTexts = [];

        if (this.currentQuestionIndex < this.config.questions.length) {
            this.showQuestion(this.questionBox);
            this.drawOvals(this.questionBox);
        } else {
            // Enviar score, respuestas correctas y total a FinishScene
            this.scene.start('FinishScene', { 
                score: this.score,
                correctAnswers: this.correctAnswers,
                totalQuestions: this.config.questions.length 
            });
        }
    }
}

