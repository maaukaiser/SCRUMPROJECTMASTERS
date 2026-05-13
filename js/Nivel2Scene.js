class Nivel2Scene extends BaseNivelScene {
    constructor() {
        // Pasamos la llave de la escena y el objeto de configuración a BaseNivelScene
        super('Nivel2Scene', {
            bgKey: 'nivel2',
            bgPath: 'img/Nivel2.jpg',
            villanoKey: 'villano2',
            villanoPath: 'img/villano2.png',
            villanoScale: 0.35, // Ajusta según el tamaño de tu imagen
            levelTitle: "Kanban\nNivel 2",
            questions: questions2 // Asegúrate de que este array exista en tu archivo de preguntas
        });
    }
}
