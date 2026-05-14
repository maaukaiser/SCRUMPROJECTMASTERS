class MapaScene extends Phaser.Scene {
    constructor() {
        super('MapaScene');
        this.nivel1Button = null;
    }

    preload() {
        this.load.image('Mapa', 'img/mapa.png');
    }

    // Método para crear/actualizar textos y personajes
    updateTexts(width, height) {
        if (this.Nivel1Button) this.Nivel1Button.destroy();
        if (this.Nivel2Button) this.Nivel2Button.destroy();
        if (this.Nivel3Button) this.Nivel3Button.destroy();
        if (this.Nivel4Button) this.Nivel4Button.destroy();
        if (this.Nivel5Button) this.Nivel5Button.destroy();
        if (this.Nivel6Button) this.Nivel6Button.destroy();
        if (this.InicioButton) this.InicioButton.destroy();
        if (this.playerInfoText) this.playerInfoText.destroy();
        if (this.playerInfoBg) this.playerInfoBg.destroy();

        this.InicioButton = this.homeButton(width / 1.23, height * 0.9, "Home", "StartScene", width, height);

        // Los botones ahora llevan a la escena de Teoría correspondiente
        this.Nivel1Button = this.createLevelButton(width / 12,   height * 0.90, "1", "Teoria1Scene", width, height);
        this.Nivel2Button = this.createLevelButton(width / 2.15, height * 0.72, "2", "Teoria2Scene", width, height);
        this.Nivel3Button = this.createLevelButton(width / 1.23, height * 0.53, "3", "Teoria3Scene", width, height);
        this.Nivel4Button = this.createLevelButton(width / 2.1,  height * 0.45, "4", "Teoria4Scene", width, height);
        this.Nivel5Button = this.createLevelButton(width / 3.7,  height * 0.21, "5", "Teoria5Scene", width, height);
        this.Nivel6Button = this.createLevelButton(width / 1.55, height * 0.07, "6", "Teoria6Scene", width, height);

        // ── Panel de información del jugador ─────────────────
        const playerName  = this.registry.get('playerName')  || 'Jugador';
        const totalScore  = this.registry.get('totalScore')  || 0;
        const levelsDone  = Object.keys(this.registry.get('levelsCompleted') || {}).length;

        // Fondo del panel
        this.playerInfoBg = this.add.graphics();
        this.playerInfoBg.fillStyle(0x282a1d, 0.85);
        this.playerInfoBg.lineStyle(2, 0xDED947, 1);
        this.playerInfoBg.fillRoundedRect(10, 10, 260, 70, 8);
        this.playerInfoBg.strokeRoundedRect(10, 10, 260, 70, 8);

        // Texto del jugador
        this.playerInfoText = this.add.text(
            20, 22,
            `${playerName}\nScore: ${totalScore}  |  ${levelsDone}/6`,
            {
                fontSize: '13px',
                fontFamily: '"Press Start 2P"',
                fill: '#FFE600',
                stroke: '#000',
                strokeThickness: 3,
                lineSpacing: 8
            }
        );
    }

    create() {
        const width  = this.scale.width;
        const height = this.scale.height;

        const background = this.add.image(width / 2, height / 2, "Mapa");
        background.setDisplaySize(width, height);

        this.updateTexts(width, height);

        this.scale.on('resize', (gameSize) => {
            const newWidth  = gameSize.width;
            const newHeight = gameSize.height;
            background.setPosition(newWidth / 2, newHeight / 2);
            background.setDisplaySize(newWidth, newHeight);
            this.updateTexts(newWidth, newHeight);
        });
    }

    createLevelButton(x, y, text, Scene, width, height) {
        const button = this.add.text(x, y, text, {
            fontSize: Math.min(width * 0.03, 40) + 'px',
            fill: '#fff',
            fontFamily: '"Press Start 2P"',
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start(Scene))
        .on('pointerover', function () { this.setStyle({ fill: '#ffff00' }); })
        .on('pointerout',  function () { this.setStyle({ fill: '#fff' }); });
        return button;
    }

    homeButton(x, y, text, Scene, width, height) {
        const button = this.add.text(x, y, text, {
            fontSize: Math.min(width * 0.03, 20) + 'px',
            fill: '#fff',
            fontFamily: '"Press Start 2P"',
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start(Scene))
        .on('pointerover', function () { this.setStyle({ fill: '#ffff00' }); })
        .on('pointerout',  function () { this.setStyle({ fill: '#fff' }); });
        return button;
    }
}