class FinishScene extends Phaser.Scene {
    constructor() {
        super('FinishScene');
    }

    preload() {
        this.load.image('backgroundImage', 'img/fondo_inicio.jpg');
    }

    create() {
        // Recibir datos del nivel
        const score          = this.scene.settings.data.score          || 0;
        const correctAnswers = this.scene.settings.data.correctAnswers || 0;
        const totalQuestions = this.scene.settings.data.totalQuestions || 0;

        const background = this.add.image(0, 0, 'backgroundImage').setOrigin(0, 0);
        const box = this.createQuestionBox();
        this.showResults(box, score, correctAnswers, totalQuestions);
        this.showRestartButton(box);
    }

    createQuestionBox() {
        const boxWidth  = 700;
        const boxHeight = 380; // Un poco más alto para caber todo
        const boxX = this.sys.game.config.width  / 2 - boxWidth / 2;
        const boxY = 50;
        const box = this.add.graphics();
        box.fillStyle(0xA8B8A9, 0.88);
        box.lineStyle(3, 0x514A8B, 1);
        box.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 15);
        box.strokeRoundedRect(boxX, boxY, boxWidth, boxHeight, 15);
        return { x: boxX, y: boxY, width: boxWidth, height: boxHeight };
    }

    showResults(box, score, correctAnswers, totalQuestions) {
        // Título
        this.add.text(
            box.x + box.width / 2,
            box.y + 45,
            '¡Nivel completado!',
            {
                fontSize: '30px',
                fontFamily: '"Press Start 2P"',
                fill: '#2B2B2B',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Score obtenido
        this.add.text(
            box.x + box.width / 2,
            box.y + 120,
            `Puntuación: ${score}`,
            {
                fontSize: '22px',
                fontFamily: '"Press Start 2P"',
                fill: '#514A8B',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Respuestas correctas
        this.add.text(
            box.x + box.width / 2,
            box.y + 185,
            `Correctas: ${correctAnswers} / ${totalQuestions}`,
            {
                fontSize: '20px',
                fontFamily: '"Press Start 2P"',
                fill: '#1A942C',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Mensaje motivacional según el desempeño
        let mensaje;
        const ratio = correctAnswers / totalQuestions;
        if (ratio === 1) {
            mensaje = '¡Perfecto! Eres un\nexperto en este tema.';
        } else if (ratio >= 0.6) {
            mensaje = '¡Buen trabajo!\nSigue practicando.';
        } else {
            mensaje = 'Sigue intentándolo,\n¡puedes mejorar!';
        }

        this.add.text(
            box.x + box.width / 2,
            box.y + 265,
            mensaje,
            {
                fontSize: '16px',
                fontFamily: '"Press Start 2P"',
                fill: '#000',
                align: 'center',
                wordWrap: { width: box.width - 60 }
            }
        ).setOrigin(0.5);
    }

    showRestartButton(box) {
        const restartButton = this.add.text(
            box.x + box.width / 2, 
            box.y + box.height - 35,
            'Ir al Mapa', 
            { 
                fontSize: '24px', 
                fill: '#fff',
                backgroundColor: '#282a1d',
                padding: { left: 15, right: 15, top: 10, bottom: 10 }
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('MapaScene'))
        .on('pointerover', function() {
            this.setStyle({ fill: '#ffff00', backgroundColor: '#666666' });
        })
        .on('pointerout', function() {
            this.setStyle({ fill: '#fff', backgroundColor: '#282a1d' });
        });
    }
}