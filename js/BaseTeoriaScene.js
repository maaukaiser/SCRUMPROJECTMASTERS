// ============================================================
//  BaseTeoríaScene.js  —  Escena de teoría paginada
//  Hereda de Phaser.Scene. Cada NivelTeoríaX pasa su config.
// ============================================================

class BaseTeoriaScene extends Phaser.Scene {

    /**
     * @param {string} key         - nombre de la escena, e.g. 'Teoria1Scene'
     * @param {object} config      - { bgKey, bgPath, teoria, nextScene, levelTitle }
     */
    constructor(key, config) {
        super(key);
        this.config = config;
    }

    init() {
        this.currentPage = 0;
        this.pageObjects = []; // objetos Phaser de la página actual
    }

    preload() {
        this.load.image(this.config.bgKey, this.config.bgPath);
        this.load.image('personaje1', 'img/personaje1.png');
        this.load.image('personaje2', 'img/personaje2.png');
    }

    create() {
        const W = this.sys.game.config.width;
        const H = this.sys.game.config.height;

        // ── Fondo ──────────────────────────────────────────────
        const bg = this.add.image(0, 0, this.config.bgKey)
            .setOrigin(0, 0)
            .setDisplaySize(W, H);

        // Overlay oscuro semitransparente para mejorar legibilidad
        this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.45);

        // ── Personaje decorativo (el elegido por el jugador) ───
        const personajeKey = this.registry.get('personaje') || 'personaje1';
        this.add.image(90, H - 60, personajeKey).setScale(0.4).setAlpha(0.85);

        // ── Caja principal (mismo estilo que la caja de preguntas) ─
        const BOX_W = W * 0.80;
        const BOX_H = H * 0.70;
        const BOX_X = W / 2 - BOX_W / 2;
        const BOX_Y = H * 0.08;

        const boxGfx = this.add.graphics();
        boxGfx.fillStyle(0xA8B8A9, 0.92);
        boxGfx.lineStyle(3, 0x514A8B, 1);
        boxGfx.fillRoundedRect(BOX_X, BOX_Y, BOX_W, BOX_H, 16);
        boxGfx.strokeRoundedRect(BOX_X, BOX_Y, BOX_W, BOX_H, 16);

        // Guarda posición de la caja para usarla en renderPage()
        this.box = { x: BOX_X, y: BOX_Y, w: BOX_W, h: BOX_H };

        // ── Título de nivel (esquina superior izquierda de la caja) ─
        this.add.text(
            BOX_X + BOX_W / 2,
            BOX_Y + 28,
            this.config.levelTitle,
            {
                fontSize: '11px',
                fontFamily: '"Press Start 2P"',
                fill: '#DED947',
                align: 'center',
                stroke: '#000',
                strokeThickness: 3
            }
        ).setOrigin(0.5, 0);

        // ── Renderizar primera página ──────────────────────────
        this.renderPage();
    }

    // ── Renderiza el contenido de la página actual ─────────────
    renderPage() {
        // Destruir objetos de página anterior
        this.pageObjects.forEach(o => o.destroy());
        this.pageObjects = [];

        const { x: BX, y: BY, w: BW, h: BH } = this.box;
        const teoria = this.config.teoria;
        const pagina = teoria.paginas[this.currentPage];
        const totalPages = teoria.paginas.length;
        const W = this.sys.game.config.width;

        // ── Subtítulo de la página ─────────────────────────────
        const subTitle = this.add.text(
            BX + BW / 2,
            BY + 68,
            pagina.subtitulo,
            {
                fontSize: '16px',
                fontFamily: '"Press Start 2P"',
                fill: '#514A8B',
                align: 'center',
                stroke: '#fff',
                strokeThickness: 2,
                wordWrap: { width: BW - 60 }
            }
        ).setOrigin(0.5, 0);
        this.pageObjects.push(subTitle);

        // ── Párrafos ───────────────────────────────────────────
        let cursorY = BY + 68 + subTitle.height + 22;
        pagina.parrafos.forEach((texto) => {
            // Bullet decorativo
            const bullet = this.add.text(BX + 38, cursorY, '▸', {
                fontSize: '14px',
                fontFamily: 'sans-serif',
                fill: '#514A8B'
            });
            this.pageObjects.push(bullet);

            const p = this.add.text(
                BX + 60, cursorY,
                texto,
                {
                    fontSize: '14px',
                    fontFamily: 'sans-serif',
                    fill: '#1a1a1a',
                    wordWrap: { width: BW - 80 },
                    lineSpacing: 4
                }
            );
            this.pageObjects.push(p);
            cursorY += p.height + 20;
        });

        // ── Indicador de página (puntos) ───────────────────────
        const DOT_SIZE = 10;
        const DOT_GAP = 18;
        const totalDotW = totalPages * DOT_GAP - (DOT_GAP - DOT_SIZE);
        let dotX = BX + BW / 2 - totalDotW / 2;
        const dotY = BY + BH - 55;

        for (let i = 0; i < totalPages; i++) {
            const dot = this.add.circle(dotX + DOT_SIZE / 2, dotY, DOT_SIZE / 2,
                i === this.currentPage ? 0x514A8B : 0xCCCCCC);
            this.pageObjects.push(dot);
            dotX += DOT_GAP;
        }

        // ── Botón de acción ────────────────────────────────────
        const isLast = this.currentPage === totalPages - 1;
        const btnLabel = isLast ? '¡Comenzar Nivel!  ▶' : 'Siguiente  ▶';
        const btnColor = isLast ? '#1A942C' : '#514A8B';

        const btn = this.add.text(
            BX + BW / 2,
            BY + BH - 28,
            btnLabel,
            {
                fontSize: '13px',
                fontFamily: '"Press Start 2P"',
                fill: '#fff',
                backgroundColor: btnColor,
                padding: { left: 18, right: 18, top: 9, bottom: 9 }
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', function () {
            this.setStyle({ backgroundColor: '#282a1d' });
        })
        .on('pointerout', function () {
            this.setStyle({ backgroundColor: btnColor });
        })
        .on('pointerdown', () => {
            if (isLast) {
                this.scene.start(this.config.nextScene);
            } else {
                this.currentPage++;
                this.renderPage();
            }
        });
        this.pageObjects.push(btn);

        // ── Botón "Saltar al nivel" (pequeño, esquina inferior derecha) ─
        if (!isLast) {
            const skip = this.add.text(
                BX + BW - 12,
                BY + BH - 14,
                'Saltar »',
                {
                    fontSize: '9px',
                    fontFamily: '"Press Start 2P"',
                    fill: '#777'
                }
            )
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', function () { this.setStyle({ fill: '#514A8B' }); })
            .on('pointerout', function () { this.setStyle({ fill: '#777' }); })
            .on('pointerdown', () => this.scene.start(this.config.nextScene));
            this.pageObjects.push(skip);
        }
    }
}
