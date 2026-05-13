// ============================================================
//  Teoria6Scene.js  —  Teoría de Scrum Avanzado antes del Nivel 6
// ============================================================
class Teoria6Scene extends BaseTeoriaScene {
    constructor() {
        super('Teoria6Scene', {
            bgKey:      'nivel6',
            bgPath:     'img/Nivel6.jpg',
            levelTitle: 'Scrum Avanz. — Teoría',
            teoria:     teorias.teoria6,
            nextScene:  'Nivel6Scene'
        });
    }
}
