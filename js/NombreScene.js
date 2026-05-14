// ============================================================
//  NombreScene.js  —  Captura el nombre del jugador
//  Se ejecuta entre StartScene y SeleccionarScene
// ============================================================
class NombreScene extends Phaser.Scene {
    constructor() {
        super('NombreScene');
        this.playerName = '';
        this.maxLength = 12;
    }

    preload() {
        this.load.image('backgroundImage', 'img/fondo_inicio.jpg');
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        // ── Fondo ────────────────────────────────────────────
        const bg = this.add.image(W / 2, H / 2, 'backgroundImage');
        bg.setDisplaySize(W, H);

        // Overlay oscuro
        this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.55);

        // ── Caja principal ───────────────────────────────────
        const boxW = 600;
        const boxH = 360;
        const boxX = W / 2 - boxW / 2;
        const boxY = H / 2 - boxH / 2;

        const box = this.add.graphics();
        box.fillStyle(0xA8B8A9, 0.92);
        box.lineStyle(3, 0x514A8B, 1);
        box.fillRoundedRect(boxX, boxY, boxW, boxH, 15);
        box.strokeRoundedRect(boxX, boxY, boxW, boxH, 15);

        // ── Título ───────────────────────────────────────────
        this.add.text(W / 2, boxY + 50, 'INGRESA TU NOMBRE', {
            fontSize: '22px',
            fontFamily: '"Press Start 2P"',
            fill: '#514A8B',
            align: 'center',
            stroke: '#fff',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Subtítulo
        this.add.text(W / 2, boxY + 90, 'Project Masters', {
            fontSize: '12px',
            fontFamily: '"Press Start 2P"',
            fill: '#282a1d',
            align: 'center'
        }).setOrigin(0.5);

        // ── Caja de entrada (estilo input retro) ─────────────
        const inputX = boxX + 80;
        const inputY = boxY + 130;
        const inputW = boxW - 160;
        const inputH = 70;

        const inputBox = this.add.graphics();
        inputBox.fillStyle(0x282a1d, 1);
        inputBox.lineStyle(3, 0xDED947, 1);
        inputBox.fillRoundedRect(inputX, inputY, inputW, inputH, 8);
        inputBox.strokeRoundedRect(inputX, inputY, inputW, inputH, 8);

        // Texto del nombre
        this.nameText = this.add.text(W / 2, inputY + inputH / 2, '', {
            fontSize: '24px',
            fontFamily: '"Press Start 2P"',
            fill: '#FFE600',
            align: 'center'
        }).setOrigin(0.5);

        // Cursor parpadeante
        this.cursor = this.add.text(W / 2, inputY + inputH / 2, '_', {
            fontSize: '24px',
            fontFamily: '"Press Start 2P"',
            fill: '#FFE600'
        }).setOrigin(0, 0.5);

        this.tweens.add({
            targets: this.cursor,
            alpha: { from: 1, to: 0 },
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        // ── Instrucciones ────────────────────────────────────
        this.add.text(W / 2, boxY + 240, 'Usa el teclado para escribir', {
            fontSize: '10px',
            fontFamily: '"Press Start 2P"',
            fill: '#1a1a1a',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(W / 2, boxY + 262, 'ENTER para confirmar', {
            fontSize: '10px',
            fontFamily: '"Press Start 2P"',
            fill: '#1a1a1a',
            align: 'center'
        }).setOrigin(0.5);

        // ── Botón continuar ──────────────────────────────────
        this.continueBtn = this.add.text(W / 2, boxY + 310, 'CONTINUAR  ▶', {
            fontSize: '14px',
            fontFamily: '"Press Start 2P"',
            fill: '#666',
            backgroundColor: '#333',
            padding: { left: 20, right: 20, top: 12, bottom: 12 }
        }).setOrigin(0.5);

        // ── Entrada por teclado ──────────────────────────────
        this.input.keyboard.on('keydown', (event) => this.handleKey(event));

        this.updateName();
    }

    handleKey(event) {
        const key = event.key;

        if (key === 'Backspace') {
            this.playerName = this.playerName.slice(0, -1);
            this.updateName();
            event.preventDefault?.();
        } else if (key === 'Enter') {
            if (this.playerName.trim().length > 0) {
                this.confirmName();
            }
        } else if (key.length === 1 && this.playerName.length < this.maxLength) {
            // Solo letras, números y espacios
            if (/^[a-zA-Z0-9 ]$/.test(key)) {
                this.playerName += key.toUpperCase();
                this.updateName();
            }
        }
    }

    updateName() {
        this.nameText.setText(this.playerName);

        // Posicionar cursor al final del texto
        this.cursor.x = this.nameText.x + this.nameText.width / 2 + 4;

        // Habilitar/deshabilitar botón
        if (this.playerName.trim().length > 0) {
            this.continueBtn.setStyle({ fill: '#eee3cf', backgroundColor: '#282a1d' });
            if (!this.continueBtn.input || !this.continueBtn.input.enabled) {
                this.continueBtn.setInteractive({ useHandCursor: true });
                this.continueBtn.removeAllListeners();
                this.continueBtn
                    .on('pointerdown', () => this.confirmName())
                    .on('pointerover', function () {
                        this.setStyle({ fill: '#ffff00', backgroundColor: '#666666' });
                    })
                    .on('pointerout', function () {
                        this.setStyle({ fill: '#eee3cf', backgroundColor: '#282a1d' });
                    });
            }
        } else {
            this.continueBtn.setStyle({ fill: '#666', backgroundColor: '#333' });
            if (this.continueBtn.input) {
                this.continueBtn.disableInteractive();
                this.continueBtn.removeAllListeners();
            }
        }
    }

    confirmName() {
        // Guardar nombre y resetear progreso de la sesión
        this.registry.set('playerName', this.playerName.trim());
        this.registry.set('totalScore', 0);
        this.registry.set('levelsCompleted', {});
        this.scene.start('SeleccionarScene');
    }
}
