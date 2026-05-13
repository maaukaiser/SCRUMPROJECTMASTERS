// ============================================================
//  Teoria5Scene.js  —  Teoría de PRINCE2 antes del Nivel 5
// ============================================================
class Teoria5Scene extends BaseTeoriaScene {
    constructor() {
        super('Teoria5Scene', {
            bgKey:      'nivel5',
            bgPath:     'img/Nivel5.jpg',
            levelTitle: 'PRINCE2 — Teoría',
            teoria:     teorias.teoria5,
            nextScene:  'Nivel5Scene'
        });
    }
}
