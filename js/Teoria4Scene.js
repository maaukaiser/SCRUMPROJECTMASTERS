// ============================================================
//  Teoria4Scene.js  —  Teoría de XP antes del Nivel 4
// ============================================================
class Teoria4Scene extends BaseTeoriaScene {
    constructor() {
        super('Teoria4Scene', {
            bgKey:      'nivel4',
            bgPath:     'img/Nivel4.jpg',
            levelTitle: 'XP — Teoría',
            teoria:     teorias.teoria4,
            nextScene:  'Nivel4Scene'
        });
    }
}
