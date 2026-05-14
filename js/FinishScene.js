class FinishScene extends Phaser.Scene {
    constructor() {
        super('FinishScene');
    }

    preload() {
        this.load.image('backgroundImage', 'img/fondo_inicio.jpg');
    }

    create() {
        // ── Recibir datos del nivel ──────────────────────────
        const score          = this.scene.settings.data.score          || 0;
        const correctAnswers = this.scene.settings.data.correctAnswers || 0;
        const totalQuestions = this.scene.settings.data.totalQuestions || 0;
        const levelNumber    = this.scene.settings.data.levelNumber    || 0;

        // ── Actualizar mejor score del nivel ─────────────────
        const levelsCompleted = this.registry.get('levelsCompleted') || {};
        if (levelNumber > 0) {
            const previousBest = levelsCompleted[levelNumber] || 0;
            if (score > previousBest) {
                levelsCompleted[levelNumber] = score;
                this.registry.set('levelsCompleted', levelsCompleted);
            }
        }

        // ── Recalcular score total acumulado ─────────────────
        const totalScore = Object.values(levelsCompleted)
            .reduce((sum, s) => sum + s, 0);
        this.registry.set('totalScore', totalScore);

        // ── Guardar en localStorage ──────────────────────────
        this.saveToRanking(totalScore);

        // ── Verificar si completó todos los niveles ──────────
        const TOTAL_LEVELS = 6;
        const allDone = Object.keys(levelsCompleted).length >= TOTAL_LEVELS;

        // ── Renderizar UI ────────────────────────────────────
        this.add.image(0, 0, 'backgroundImage').setOrigin(0, 0);
        const box = this.createQuestionBox();
        this.showResults(box, score, correctAnswers, totalQuestions, totalScore, levelsCompleted);
        this.showButtons(box, allDone);
    }

    saveToRanking(totalScore) {
        const playerName = this.registry.get('playerName');
        if (!playerName) return;

        let rankings = [];
        try {
            rankings = JSON.parse(localStorage.getItem('pmRankings') || '[]');
        } catch (e) {
            rankings = [];
        }

        const existing = rankings.find(r => r.name === playerName);
        if (existing) {
            if (totalScore > existing.score) {
                existing.score = totalScore;
                existing.date  = new Date().toISOString();
            }
        } else {
            rankings.push({
                name:  playerName,
                score: totalScore,
                date:  new Date().toISOString()
            });
        }

        rankings.sort((a, b) => b.score - a.score);
        // Limitar a top 50 para no llenar el storage
        rankings = rankings.slice(0, 50);
        localStorage.setItem('pmRankings', JSON.stringify(rankings));
    }

    createQuestionBox() {
        const boxWidth  = 700;
        const boxHeight = 440;
        const boxX = this.sys.game.config.width  / 2 - boxWidth / 2;
        const boxY = 60;
        const box = this.add.graphics();
        box.fillStyle(0xA8B8A9, 0.92);
        box.lineStyle(3, 0x514A8B, 1);
        box.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 15);
        box.strokeRoundedRect(boxX, boxY, boxWidth, boxHeight, 15);
        return { x: boxX, y: boxY, width: boxWidth, height: boxHeight };
    }

    showResults(box, score, correctAnswers, totalQuestions, totalScore, levelsCompleted) {
        // Título
        this.add.text(
            box.x + box.width / 2,
            box.y + 40,
            '¡Nivel Completado!',
            {
                fontSize: '24px',
                fontFamily: '"Press Start 2P"',
                fill: '#2B2B2B',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Nombre del jugador
        const playerName = this.registry.get('playerName') || 'Jugador';
        this.add.text(
            box.x + box.width / 2,
            box.y + 80,
            `Jugador: ${playerName}`,
            {
                fontSize: '13px',
                fontFamily: '"Press Start 2P"',
                fill: '#514A8B',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Score del nivel actual
        this.add.text(
            box.x + box.width / 2,
            box.y + 130,
            `Score del nivel: ${score}`,
            {
                fontSize: '16px',
                fontFamily: '"Press Start 2P"',
                fill: '#1a1a1a',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Respuestas correctas
        this.add.text(
            box.x + box.width / 2,
            box.y + 170,
            `Correctas: ${correctAnswers} / ${totalQuestions}`,
            {
                fontSize: '14px',
                fontFamily: '"Press Start 2P"',
                fill: '#1A942C',
                align: 'center'
            }
        ).setOrigin(0.5);

        // ── Score TOTAL acumulado destacado ─────────────────
        const totalBox = this.add.graphics();
        totalBox.fillStyle(0x282a1d, 0.85);
        totalBox.lineStyle(3, 0xDED947, 1);
        totalBox.fillRoundedRect(box.x + 130, box.y + 210, box.width - 260, 80, 10);
        totalBox.strokeRoundedRect(box.x + 130, box.y + 210, box.width - 260, 80, 10);

        this.add.text(
            box.x + box.width / 2,
            box.y + 232,
            'SCORE TOTAL',
            {
                fontSize: '11px',
                fontFamily: '"Press Start 2P"',
                fill: '#FFE600',
                align: 'center'
            }
        ).setOrigin(0.5);

        this.add.text(
            box.x + box.width / 2,
            box.y + 268,
            `${totalScore}`,
            {
                fontSize: '28px',
                fontFamily: '"Press Start 2P"',
                fill: '#FFE600',
                stroke: '#000',
                strokeThickness: 4,
                align: 'center'
            }
        ).setOrigin(0.5);

        // Progreso de niveles (puntos)
        const completed = Object.keys(levelsCompleted).length;
        const TOTAL_LEVELS = 6;
        this.add.text(
            box.x + box.width / 2,
            box.y + 315,
            `Niveles completados: ${completed} / ${TOTAL_LEVELS}`,
            {
                fontSize: '11px',
                fontFamily: '"Press Start 2P"',
                fill: '#514A8B',
                align: 'center'
            }
        ).setOrigin(0.5);

        // Mensaje motivacional
        let mensaje;
        const ratio = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
        if (ratio === 1) {
            mensaje = '¡Perfecto!';
        } else if (ratio >= 0.6) {
            mensaje = '¡Buen trabajo!';
        } else {
            mensaje = 'Sigue intentándolo';
        }

        this.add.text(
            box.x + box.width / 2,
            box.y + 350,
            mensaje,
            {
                fontSize: '13px',
                fontFamily: '"Press Start 2P"',
                fill: '#000',
                align: 'center'
            }
        ).setOrigin(0.5);
    }

    showButtons(box, allDone) {
        const btnY = box.y + box.height - 35;

        if (allDone) {
            // Si completó todos los niveles, mostrar botón al RANKING
            this.add.text(
                box.x + box.width / 2,
                btnY,
                '🏆  Ver Ranking Final  🏆',
                {
                    fontSize: '14px',
                    fontFamily: '"Press Start 2P"',
                    fill: '#fff',
                    backgroundColor: '#1A942C',
                    padding: { left: 18, right: 18, top: 12, bottom: 12 }
                }
            )
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('RankingScene'))
            .on('pointerover', function () {
                this.setStyle({ backgroundColor: '#127921' });
            })
            .on('pointerout', function () {
                this.setStyle({ backgroundColor: '#1A942C' });
            });
        } else {
            // Botón normal: volver al mapa
            this.add.text(
                box.x + box.width / 2,
                btnY,
                'Ir al Mapa',
                {
                    fontSize: '14px',
                    fontFamily: '"Press Start 2P"',
                    fill: '#fff',
                    backgroundColor: '#282a1d',
                    padding: { left: 18, right: 18, top: 12, bottom: 12 }
                }
            )
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MapaScene'))
            .on('pointerover', function () {
                this.setStyle({ fill: '#ffff00', backgroundColor: '#666666' });
            })
            .on('pointerout', function () {
                this.setStyle({ fill: '#fff', backgroundColor: '#282a1d' });
            });
        }
    }
}