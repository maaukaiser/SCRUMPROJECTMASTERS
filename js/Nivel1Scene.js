class Nivel1Scene extends BaseNivelScene {
    constructor() {
        super('Nivel1Scene', {
            bgKey: 'nivel1',
            bgPath: 'img/Nivel1.jpg',
            villanoKey: 'villano1',
            villanoPath: 'img/villano1.png',
            villanoScale: 0.5,
            levelTitle: "Scrum\nNivel 1",
            questions: questions // Asumiendo que tus preguntas de nivel 1 están en la variable 'questions'
        });
    }
}
