var font = new FontFaceObserver('Press Start 2P');
font.load().then(function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-canvas',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600,
            min: { width: 320, height: 240 },
            max: { width: 1600, height: 1200 }
        },
        scene: [
            StartScene,
            NombreScene,        // ← NUEVO: captura de nombre
            SeleccionarScene,
            MapaScene,
            // Teoría → Práctica para cada nivel
            Teoria1Scene, Nivel1Scene,
            Teoria2Scene, Nivel2Scene,
            Teoria3Scene, Nivel3Scene,
            Teoria4Scene, Nivel4Scene,
            Teoria5Scene, Nivel5Scene,
            Teoria6Scene, Nivel6Scene,
            GameOverScene,
            FinishScene,
            RankingScene        // ← NUEVO: tabla de mejores puntajes
        ]
    };

    new Phaser.Game(config);
});