class Nivel4Scene extends BaseNivelScene {
    constructor() {
        // Pasamos la configuración específica para el Nivel 4
        super('Nivel4Scene', {
            bgKey: 'nivel4',
            bgPath: 'img/Nivel4.jpg', // Asegúrate de que esta ruta sea correcta
            villanoKey: 'villano4',
            villanoPath: 'img/villano4.png',
            villanoScale: 0.35, // Aplicamos el ajuste de escala que pediste
            levelTitle: "XP\nNivel 4", // Título personalizado
            questions: questions4 // Array de preguntas para este nivel
        });
    }
}
