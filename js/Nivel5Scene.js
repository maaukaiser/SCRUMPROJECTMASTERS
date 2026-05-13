class Nivel5Scene extends BaseNivelScene {
    constructor() {
        // Pasamos la configuración específica para el Nivel 4
        super('Nivel5Scene', {
            bgKey: 'nivel5',
            bgPath: 'img/Nivel5.jpg', // Asegúrate de que esta ruta sea correcta
            villanoKey: 'villano5',
            villanoPath: 'img/villano5.png',
            villanoScale: 0.35, // Aplicamos el ajuste de escala que pediste
            levelTitle: "Nivel 5\nFinal Boss", // Título personalizado
            questions: questions5 // Array de preguntas para este nivel
        });
    }
}
