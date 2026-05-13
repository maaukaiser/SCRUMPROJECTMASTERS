class Nivel3Scene extends BaseNivelScene {
    constructor() {
        super('Nivel3Scene', {
            bgKey: 'nivel3',
            bgPath: 'img/Nivel3.jpg',
            villanoKey: 'villano3',
            villanoPath: 'img/villano3.png',
            villanoScale: 0.4,
            levelTitle: "PMI\nNivel 3",
            questions: questions3 // Tus preguntas para nivel 3
        });
    }
}
