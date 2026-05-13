// ============================================================
//  Teoria2Scene.js  —  Teoría de Kanban antes del Nivel 2
// ============================================================
class Teoria2Scene extends BaseTeoriaScene {
    constructor() {
        super('Teoria2Scene', {
            bgKey:      'nivel2',
            bgPath:     'img/Nivel2.jpg',
            levelTitle: 'Kanban — Teoría',
            teoria:     teorias.teoria2,
            nextScene:  'Nivel2Scene'
        });
    }
}
