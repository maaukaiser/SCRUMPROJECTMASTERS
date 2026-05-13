class Nivel1Scene extends Phaser.Scene {
    constructor() {
        super('Nivel1Scene');
        this.box = null;
        this.villano = null;
        this.personaje = null;
        this.questionBox = null;
        // Variable para guardar el tiempo en que inicia la pregunta
        this.questionStartTime = 0;
    }

    init() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questionTexts = [];
        this.hearts = [];
    }

    preload() {
        this.load.image('nivel1', 'img/Nivel1.jpg');
        this.load.image('personaje1', 'img/personaje1.png');
        this.load.image('personaje2', './img/personaje2.png'); // Ojo con la ruta ./
        this.load.image('villano1', 'img/villano1.png');
        this.load.image('corazon', 'img/corazon.png');
        this.load.image('fireball', 'img/fuego.png');
        this.load.image('espada', 'img/espada.png');
    }

    create() {
        const background = this.add.image(0, 0, 'nivel1');
        background.setOrigin(0, 0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;

        // --- NUEVO: Texto para el Score en pantalla ---
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

        // --- ELIMINADO: this.corazonPersonaje (ya no lo necesitas) ---

        this.villano = this.add.image(650, 500, 'villano1');
        this.villano.setScale(0.5);

        this.drawHearts();
        this.questionBox = this.createQuestionBox();
        this.showQuestion(this.questionBox);
        this.drawOvals(this.questionBox);

        const scrumText = this.add.text(this.questionBox.x / 2, this.questionBox.y + 20, "Scrum\nNivel 1", {
            fontSize: '10px',
            fontFamily: '"Press Start 2P"',
            fill: '#DED947',
            align: 'center'
        }).setOrigin(0.5);
    }

    drawHearts() {
        const heartWidth = 30;
        const heartHeight = 30;
        const spacing = 10;
        const startX = 550;
        const startY = 400;
        for (let i = 0; i < 5; i++) {
            const heart = this.add.image(startX + i * (heartWidth + spacing), startY, 'corazon');
            heart.setScale(0.4);
            this.hearts.push(heart);
        }
    }

    removeHeart() {
        if (this.hearts.length > 0) {
            const heart = this.hearts.pop();
            heart.destroy();
        }
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

    drawOvals(questionBox) {
        const ovalWidth = 180;
        const ovalHeight = 70;
        const spacing = 10;
        const startX = questionBox.x + (questionBox.width - (ovalWidth * 3 + spacing * 2)) / 2;
        const startY = questionBox.y + questionBox.height - ovalHeight - 10;

        const graphics = this.add.graphics();
        const opciones = questions[this.currentQuestionIndex].options;

        for (let i = 0; i < 3; i++) {
            graphics.fillStyle(0xA8B8A9, 1);
            graphics.fillRoundedRect(startX + i * (ovalWidth + spacing), startY - ovalHeight / 2, ovalWidth, ovalHeight, ovalHeight / 2);
            graphics.lineStyle(2, 0x514A8B, 0.98);
            graphics.strokeRoundedRect(startX + i * (ovalWidth + spacing), startY - ovalHeight / 2, ovalWidth, ovalHeight, ovalHeight / 2);

            const text = this.add.text(
                startX + i * (ovalWidth + spacing) + ovalWidth / 2,
                startY,
                opciones[i],
                {
                    fontSize: '13px',
                    fill: '#000',
                    align: 'center',
                    padding: { x: 10, y: 5 },
                    wordWrap: { width: ovalWidth - 20 }
                }
            ).setOrigin(0.5)
             .setInteractive({ useHandCursor: true })
             .on('pointerdown', () => this.checkAnswer(i))
             .on('pointerout', () => text.setStyle({ fill: '#000' }));
            this.questionTexts.push(text);
        }
    }

    showQuestion(questionBox) {
        const question = questions[this.currentQuestionIndex];
        
        const questionText = this.add.text(questionBox.x + questionBox.width / 2, questionBox.y + questionBox.height / 4, question.question, {
            fontSize: '24px',
            fill: '#000',
            wordWrap: { width: questionBox.width - 40 },
            align: 'center'
        }).setOrigin(0.5);

        this.questionTexts.push(questionText);

        // --- NUEVO: Guardamos el tiempo actual al mostrar la pregunta ---
        this.questionStartTime = this.time.now;
    }

    checkAnswer(selectedIndex) {
        const question = questions[this.currentQuestionIndex];
        const correctAnswerIndex = question.answer;
        const selectedText = this.questionTexts[selectedIndex + 1];

        // Desactivar interactividad
        this.questionTexts.slice(1).forEach(text => text.removeInteractive());

        if (selectedIndex === correctAnswerIndex - 1) {
            // --- CÁLCULO DE PUNTAJE POR TIEMPO ---
            const timeTaken = this.time.now - this.questionStartTime; // Tiempo en milisegundos
            
            // Lógica: Base de 50 puntos. 
            // Bono máximo de 50 puntos si respondes instantáneamente.
            // Pierdes puntos de bono por cada segundo que tardas.
            // Mínimo de 10 puntos si aciertas (aunque tardes mucho).
            
            let timeBonus = Math.max(0, 5000 - timeTaken) / 100; // Ejemplo simple
            // O una fórmula más estándar:
            // Puntos base: 50
            // Puntos extra: Entre 0 y 50 dependiendo de la velocidad (ref 10 segs)
            
            let calculatedScore = 50; // Puntos base por acertar
            if (timeTaken < 10000) { // Si tardó menos de 10 segundos
                 calculatedScore += Math.floor((10000 - timeTaken) / 200); 
            }
            
            this.score += calculatedScore;
            
            // Actualizar texto del score visualmente
            this.scoreText.setText('Score: ' + this.score);

            // Marca respuesta correcta
            selectedText.setStyle({ fill: '#1A942C' });
            this.lanzarEspada();
            this.time.delayedCall(1400, this.removeHeart, [], this);
            this.currentQuestionIndex++;
            this.time.delayedCall(3200, this.nextQuestion, [], this);

        } else {
            // --- RESPUESTA INCORRECTA ---
            selectedText.setStyle({ fill: '#F91010' });
            
            // Animación de ataque enemigo (feedback visual)
            this.launchFireball(); 
            
            // Ya NO matamos al personaje ni restamos score, solo avanzamos.
            this.currentQuestionIndex++;
            
            // Esperamos a que termine la animación de fuego para cambiar de pregunta
            this.time.delayedCall(2500, this.nextQuestion, [], this);
        }

        this.feedbackText.setPosition(400, 500);
    }

    launchFireball() {
        const fireball = this.add.image(650, 500, 'fireball');
        fireball.setScale(2);
        this.tweens.add({
            targets: fireball,
            x: 150,
            y: 500,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                fireball.destroy();
                // Aquí ya no destruimos this.corazonPersonaje porque no existe
            }
        });
    }

    lanzarEspada() {
        const espada = this.add.image(this.personaje.x + 40, this.personaje.y + 20, 'espada');
        espada.setScale(0.1);
        this.tweens.add({
            targets: espada,
            x: 630,
            y: this.villano.y, // Corregido: this.villano es un objeto, necesitamos su Y
            duration: 1200,
            ease: 'Linear',
            onComplete: () => {
                this.tweens.add({
                    targets: espada,
                    x: this.personaje.x + 35,
                    y: this.personaje.y + 20,
                    angle: -740,
                    duration: 1500,
                    ease: 'Linear',
                    onComplete: () => {
                        espada.destroy();
                    }
                });
            }
        });
    }

    nextQuestion() {
        this.questionTexts.forEach(text => text.destroy());
        this.questionTexts = [];

        if (this.currentQuestionIndex < questions.length) {
            this.showQuestion(this.questionBox);
            this.drawOvals(this.questionBox);
        } else {
            this.scene.start('FinishScene', { 
                score: this.score,
                totalQuestions: this.currentQuestionIndex 
            });
        }
    }
}