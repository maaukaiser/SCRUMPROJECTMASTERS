// ============================================================
//  RankingScene.js  —  Tabla de mejores puntajes (Hall of Fame)
//  Se muestra cuando el jugador completa todos los niveles
// ============================================================
class RankingScene extends Phaser.Scene {
    constructor() {
        super('RankingScene');
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
        this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.7);

        // ── Título ───────────────────────────────────────────
        this.add.text(W / 2, 45, 'RANKING', {
            fontSize: '36px',
            fontFamily: '"Press Start 2P"',
            fill: '#FFE600',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(W / 2, 88, 'Project Masters Hall of Fame', {
            fontSize: '11px',
            fontFamily: '"Press Start 2P"',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // ── Caja del ranking ─────────────────────────────────
        const boxW = 660;
        const boxH = 380;
        const boxX = W / 2 - boxW / 2;
        const boxY = 115;

        const box = this.add.graphics();
        box.fillStyle(0xA8B8A9, 0.95);
        box.lineStyle(3, 0x514A8B, 1);
        box.fillRoundedRect(boxX, boxY, boxW, boxH, 15);
        box.strokeRoundedRect(boxX, boxY, boxW, boxH, 15);

        // ── Encabezados ──────────────────────────────────────
        const colPosX   = boxX + 50;
        const colNameX  = boxX + 130;
        const colScoreX = boxX + boxW - 60;

        this.add.text(colPosX, boxY + 22, 'POS', {
            fontSize: '13px', fontFamily: '"Press Start 2P"', fill: '#514A8B'
        }).setOrigin(0.5, 0);

        this.add.text(colNameX, boxY + 22, 'JUGADOR', {
            fontSize: '13px', fontFamily: '"Press Start 2P"', fill: '#514A8B'
        }).setOrigin(0, 0);

        this.add.text(colScoreX, boxY + 22, 'SCORE', {
            fontSize: '13px', fontFamily: '"Press Start 2P"', fill: '#514A8B'
        }).setOrigin(1, 0);

        // Línea divisora
        const div = this.add.graphics();
        div.lineStyle(2, 0x514A8B, 0.8);
        div.lineBetween(boxX + 25, boxY + 55, boxX + boxW - 25, boxY + 55);

        // ── Obtener y ordenar rankings ───────────────────────
        let rankings = [];
        try {
            rankings = JSON.parse(localStorage.getItem('pmRankings') || '[]');
        } catch (e) {
            rankings = [];
        }
        rankings.sort((a, b) => b.score - a.score);
        const top = rankings.slice(0, 10);

        const currentPlayer = this.registry.get('playerName');
        const currentScore  = this.registry.get('totalScore') || 0;

        // ── Entradas del ranking ─────────────────────────────
        if (top.length === 0) {
            this.add.text(W / 2, boxY + boxH / 2, 'Aún no hay\npuntuaciones', {
                fontSize: '14px',
                fontFamily: '"Press Start 2P"',
                fill: '#1a1a1a',
                align: 'center',
                lineSpacing: 8
            }).setOrigin(0.5);
        } else {
            top.forEach((entry, i) => {
                const y = boxY + 80 + i * 28;
                const isMe = entry.name === currentPlayer;
                const color = isMe ? '#1A942C' : (i < 3 ? '#8B0000' : '#1a1a1a');

                // Resaltado de fila del jugador actual
                if (isMe) {
                    const hl = this.add.graphics();
                    hl.fillStyle(0xFFE600, 0.25);
                    hl.fillRoundedRect(boxX + 20, y - 12, boxW - 40, 26, 4);
                }

                // Medallas para top 3
                let posLabel = `${i + 1}.`;
                if (i === 0) posLabel = '1°';
                else if (i === 1) posLabel = '2°';
                else if (i === 2) posLabel = '3°';

                this.add.text(colPosX, y, posLabel, {
                    fontSize: '13px',
                    fontFamily: '"Press Start 2P"',
                    fill: color
                }).setOrigin(0.5, 0.5);

                const nameDisplay = entry.name + (isMe ? '  (tú)' : '');
                this.add.text(colNameX, y, nameDisplay, {
                    fontSize: '13px',
                    fontFamily: '"Press Start 2P"',
                    fill: color
                }).setOrigin(0, 0.5);

                this.add.text(colScoreX, y, `${entry.score}`, {
                    fontSize: '13px',
                    fontFamily: '"Press Start 2P"',
                    fill: color
                }).setOrigin(1, 0.5);
            });
        }

        // ── Score del jugador actual destacado ──────────────
        if (currentPlayer) {
            this.add.text(W / 2, boxY + boxH - 22,
                `Tu puntaje final: ${currentScore}`,
                {
                    fontSize: '12px',
                    fontFamily: '"Press Start 2P"',
                    fill: '#514A8B',
                    align: 'center'
                }
            ).setOrigin(0.5);
        }

        // ── Botones ──────────────────────────────────────────
        const btnY = boxY + boxH + 45;

        // Botón Inicio
        this.add.text(W / 2 - 130, btnY, 'Inicio', {
            fontSize: '13px',
            fontFamily: '"Press Start 2P"',
            fill: '#eee3cf',
            backgroundColor: '#282a1d',
            padding: { left: 18, right: 18, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('StartScene'))
        .on('pointerover', function () {
            this.setStyle({ fill: '#ffff00', backgroundColor: '#666' });
        })
        .on('pointerout', function () {
            this.setStyle({ fill: '#eee3cf', backgroundColor: '#282a1d' });
        });

        // Botón Jugar de nuevo
        this.add.text(W / 2 + 130, btnY, 'Jugar de nuevo', {
            fontSize: '13px',
            fontFamily: '"Press Start 2P"',
            fill: '#eee3cf',
            backgroundColor: '#1A942C',
            padding: { left: 18, right: 18, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('NombreScene'))
        .on('pointerover', function () {
            this.setStyle({ backgroundColor: '#127921' });
        })
        .on('pointerout', function () {
            this.setStyle({ backgroundColor: '#1A942C' });
        });
    }
}
