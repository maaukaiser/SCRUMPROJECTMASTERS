// ============================================================
//  Teoria3Scene.js  —  Teoría de PMI antes del Nivel 3
// ============================================================
class Teoria3Scene extends BaseTeoriaScene {
    constructor() {
        super('Teoria3Scene', {
            bgKey:      'nivel3',
            bgPath:     'img/Nivel3.jpg',
            levelTitle: 'PMI — Teoría',
            teoria:     teorias.teoria3,
            nextScene:  'Nivel3Scene'
        });
    }
}
