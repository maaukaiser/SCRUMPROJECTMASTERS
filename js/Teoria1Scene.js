// ============================================================
//  Teoria1Scene.js  —  Teoría de Scrum antes del Nivel 1
// ============================================================
class Teoria1Scene extends BaseTeoriaScene {
    constructor() {
        super('Teoria1Scene', {
            bgKey:      'nivel1',
            bgPath:     'img/Nivel1.jpg',
            levelTitle: 'Scrum — Teoría',
            teoria:     teorias.teoria1,
            nextScene:  'Nivel1Scene'
        });
    }
}
