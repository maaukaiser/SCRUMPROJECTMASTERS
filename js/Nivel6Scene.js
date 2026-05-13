class Nivel6Scene extends BaseNivelScene {
    constructor() {
        // Pasamos la configuración específica para el Nivel 4
        super('Nivel6Scene', {
            bgKey: 'nivel6',
            bgPath: 'img/Nivel6.jpg', // Asegúrate de que esta ruta sea correcta
            villanoKey: 'villano6',
            villanoPath: 'img/villano6.png',
            villanoScale: 0.5, // Aplicamos el ajuste de escala que pediste
            levelTitle: "Nivel 4\nFinal Boss", // Título personalizado
            questions: questions4 // Array de preguntas para este nivel
        });
    }
}
