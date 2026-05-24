class BaseNivelScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
        this.questionStartTime = 0;
    }

    init() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
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
        this.initAudio();

        const background = this.add.image(0, 0, this.config.bgKey).setOrigin(0, 0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

        // ── Score del nivel actual ───────────────────────────
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: '"Press Start 2P"',
            stroke: '#000',
            strokeThickness: 4
        });

        // ── Score TOTAL acumulado + nombre del jugador ──────
        const playerName = this.registry.get('playerName') || 'Jugador';
        const totalScore = this.registry.get('totalScore') || 0;
        this.playerInfoText = this.add.text(
            this.sys.game.config.width - 20, 20,
            `${playerName}\nTotal: ${totalScore}`,
            {
                fontSize: '14px',
                fontFamily: '"Press Start 2P"',
                fill: '#FFE600',
                stroke: '#000',
                strokeThickness: 3,
                align: 'right',
                lineSpacing: 6
            }
        ).setOrigin(1, 0);

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
        const boxY = 70;
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
            this.correctAnswers++;
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
        if (this.fireballSynth) {
            this.fireballSynth.triggerAttackRelease("C2", "8n");
        }
        const fireball = this.add.image(650, 500, 'fireball').setScale(2);
        this.tweens.add({
            targets: fireball,
            x: 150, y: 500,
            duration: 2000,
            onComplete: () => fireball.destroy()
        });
    }

    lanzarEspada() {
        if (this.swordSynth) {
            this.swordSynth.triggerAttackRelease("C5", "16n");
            setTimeout(() => { if(this.swordSynth) this.swordSynth.triggerAttackRelease("E5", "8n"); }, 150);
        }
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

    // Extrae el número de nivel desde el key de la escena: "Nivel3Scene" → 3
    getLevelNumber() {
        const match = this.scene.key.match(/Nivel(\d+)Scene/);
        return match ? parseInt(match[1]) : 0;
    }

    nextQuestion() {
        this.questionTexts.forEach(text => text.destroy());
        this.questionTexts = [];

        if (this.currentQuestionIndex < this.config.questions.length) {
            this.showQuestion(this.questionBox);
            this.drawOvals(this.questionBox);
        } else {
            // Enviar score, respuestas correctas, total Y número de nivel a FinishScene
            this.scene.start('FinishScene', {
                score: this.score,
                correctAnswers: this.correctAnswers,
                totalQuestions: this.config.questions.length,
                levelNumber: this.getLevelNumber()
            });
        }
    }

    initAudio() {
        if (typeof Tone !== 'undefined') {
            if (!window.bgmPlaying) {
                Tone.start();
                const reverb = new Tone.Reverb(3).toDestination();
                const bgSynth = new Tone.PolySynth(Tone.Synth, {
                    oscillator: { type: "sine" },
                    envelope: { attack: 2, decay: 1, sustain: 0.5, release: 2 }
                }).connect(reverb);
                bgSynth.volume.value = -18; // Música tranquila, volumen bajo

                const chordProgression = [
                    ["C4", "E4", "G4"],
                    ["A3", "C4", "E4"],
                    ["F3", "A3", "C4"],
                    ["G3", "B3", "D4"]
                ];
                let step = 0;
                Tone.Transport.scheduleRepeat(time => {
                    const chord = chordProgression[step % chordProgression.length];
                    bgSynth.triggerAttackRelease(chord, "1m", time);
                    step++;
                }, "2m");
                
                Tone.Transport.start();
                window.bgmPlaying = true;
            }

            this.swordSynth = new Tone.Synth({
                oscillator: { type: "square" },
                envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 }
            }).toDestination();
            this.swordSynth.volume.value = -12;

            this.fireballSynth = new Tone.MembraneSynth({
                pitchDecay: 0.05,
                octaves: 4,
                oscillator: { type: "sine" },
                envelope: { attack: 0.01, decay: 0.4, sustain: 0.01, release: 1.4 }
            }).toDestination();
            this.fireballSynth.volume.value = -8;
        }
    }
}