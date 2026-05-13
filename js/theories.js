// ============================================================
//  theories.js  —  Contenido teórico para cada nivel
// ============================================================

const teorias = {

    // ── NIVEL 1 ─ Scrum ──────────────────────────────────────
    teoria1: {
        titulo: "Scrum\nNivel 1",
        paginas: [
            {
                subtitulo: "¿Qué es Scrum?",
                parrafos: [
                    "Scrum es un marco ágil que permite gestionar proyectos de manera flexible, entregando valor incremental al cliente.",
                    "Un rol clave es el Scrum Master, encargado de facilitar el proceso y eliminar impedimentos para que el equipo funcione eficientemente."
                ]
            },
            {
                subtitulo: "Artefactos y Sprints",
                parrafos: [
                    "El trabajo se organiza en Sprints, períodos de tiempo fijo (generalmente de 1 a 4 semanas) destinados a completar incrementos funcionales del producto.",
                    "Todas las tareas y requisitos del proyecto se recopilan en el Product Backlog, un artefacto central que se prioriza continuamente."
                ]
            },
            {
                subtitulo: "El Product Owner",
                parrafos: [
                    "El Product Owner es responsable de maximizar el valor del producto, priorizando el trabajo y representando las necesidades del cliente.",
                    "En conjunto, estos elementos hacen de Scrum un enfoque eficaz para la gestión ágil de proyectos."
                ]
            }
        ]
    },

    // ── NIVEL 2 ─ Kanban ─────────────────────────────────────
    teoria2: {
        titulo: "Kanban\nNivel 2",
        paginas: [
            {
                subtitulo: "¿Qué es Kanban?",
                parrafos: [
                    "Kanban es un sistema visual de gestión de trabajo diseñado para optimizar procesos, mejorar la eficiencia y garantizar un flujo continuo de tareas.",
                    "Su origen se encuentra en las prácticas de producción de Toyota, donde se utilizó para gestionar el flujo de materiales y producción."
                ]
            },
            {
                subtitulo: "El Tablero Kanban",
                parrafos: [
                    "Un tablero Kanban incluye columnas que representan las etapas del flujo de trabajo: Por hacer, En progreso y Terminado.",
                    "Las tareas, representadas por tarjetas, se mueven entre las columnas a medida que avanzan.",
                    "El término WIP (Work in Progress) se refiere a las tareas que están siendo atendidas en un momento dado."
                ]
            },
            {
                subtitulo: "Principios y Beneficios",
                parrafos: [
                    "Limitar el WIP es crucial para evitar la sobrecarga de trabajo y garantizar que el equipo se enfoque en completar tareas antes de iniciar nuevas.",
                    "Kanban mejora la claridad y transparencia, incrementa la productividad al reducir la multitarea, y facilita la identificación de cuellos de botella."
                ]
            }
        ]
    },

    // ── NIVEL 3 ─ PMI / PMBOK ────────────────────────────────
    teoria3: {
        titulo: "PMI\nNivel 3",
        paginas: [
            {
                subtitulo: "El PMBOK® Guide",
                parrafos: [
                    "La Guía PMBOK® es un estándar reconocido internacionalmente para la gestión de proyectos, publicado por el PMI.",
                    "Proporciona un marco estructurado con buenas prácticas para planificar, ejecutar y supervisar proyectos en cualquier industria."
                ]
            },
            {
                subtitulo: "Éxito y Certificaciones",
                parrafos: [
                    "Para el PMI, el éxito de un proyecto depende de cumplir con el alcance, el tiempo y el presupuesto establecidos.",
                    "El PMP® (Project Management Professional) es una certificación altamente valorada que evalúa conocimientos en enfoques tradicionales y ágiles."
                ]
            },
            {
                subtitulo: "Gestión de Riesgos y Ciclo de Vida",
                parrafos: [
                    "La gestión de riesgos se centra en anticipar, evaluar y mitigar factores que puedan influir en los objetivos del proyecto.",
                    "El ciclo de vida del proyecto según el PMI incluye: Inicio, Planificación, Ejecución, Monitoreo y Cierre."
                ]
            }
        ]
    },

    // ── NIVEL 4 ─ XP (Extreme Programming) ──────────────────
    teoria4: {
        titulo: "XP\nNivel 4",
        paginas: [
            {
                subtitulo: "¿Qué es XP?",
                parrafos: [
                    "Extreme Programming (XP) es una metodología ágil enfocada en entregar software funcional de forma continua y eficiente.",
                    "Su pilar clave es la entrega continua, que asegura versiones funcionales frecuentes para adaptarse a las necesidades del cliente."
                ]
            },
            {
                subtitulo: "Prácticas Clave",
                parrafos: [
                    "La programación en pareja consiste en dos desarrolladores trabajando juntos en el mismo código, mejorando su calidad y fomentando el aprendizaje mutuo.",
                    "La refactorización mejora el diseño del código constantemente, reduciendo errores y la deuda técnica."
                ]
            },
            {
                subtitulo: "Integración Continua y Roles",
                parrafos: [
                    "La integración continua consiste en fusionar y probar el código con frecuencia para detectar problemas temprano y mantener un ritmo constante.",
                    "En los equipos de XP, los roles básicos son el Programador y el Cliente. Figuras como el Scrum Master son propias de otras metodologías y NO forman parte de XP."
                ]
            }
        ]
    },

    // ── NIVEL 5 ─ PRINCE2 ────────────────────────────────────
    teoria5: {
        titulo: "PRINCE2\nNivel 5",
        paginas: [
            {
                subtitulo: "¿Qué es PRINCE2?",
                parrafos: [
                    "PRINCE2 es una metodología de gestión de proyectos cuyo objetivo principal es proporcionar un marco estructurado adaptable a diferentes tipos de proyectos.",
                    "No se limita a un enfoque rígido, sino que se ajusta según las necesidades y características de cada proyecto."
                ]
            },
            {
                subtitulo: "Temas y Director de Proyecto",
                parrafos: [
                    "PRINCE2 se basa en 7 temas principales que abordan la planificación, la calidad, los riesgos, la comunicación y otras áreas de gestión.",
                    "El Director del Proyecto es la persona encargada de gestionar el proyecto día a día, tomando decisiones clave y supervisando a los equipos."
                ]
            },
            {
                subtitulo: "Justificación de Negocio y Principios",
                parrafos: [
                    "La Justificación de Negocio es central en PRINCE2: siempre debe existir una razón clara y los beneficios que traerá el proyecto a la organización.",
                    "Un principio fundamental es que los objetivos deben ser claros y definidos desde el inicio. La flexibilidad en los objetivos NO es un principio de PRINCE2."
                ]
            }
        ]
    },

    // ── NIVEL 6 ─ Scrum Avanzado ─────────────────────────────
    teoria6: {
        titulo: "Scrum Avanz.\nNivel 6",
        paginas: [
            {
                subtitulo: "Scrum Master y Conflictos",
                parrafos: [
                    "El Scrum Master actúa como mediador y fomenta un ambiente de confianza, facilitando la comunicación entre los miembros del equipo.",
                    "Ante cambios inesperados en los requisitos durante un Sprint, el Scrum Master debe evaluar el impacto en el Sprint Backlog y discutirlo con el Product Owner."
                ]
            },
            {
                subtitulo: "Retrospectiva e Incremento",
                parrafos: [
                    "Cuando un miembro del equipo no contribuye adecuadamente, es fundamental abordarlo durante la retrospectiva del Sprint de forma constructiva.",
                    "El Incremento en Scrum es la suma de todos los elementos del Product Backlog completados durante un Sprint más los incrementos anteriores."
                ]
            },
            {
                subtitulo: "Daily Scrum",
                parrafos: [
                    "La reunión diaria (Daily Scrum) permite a cada miembro compartir su progreso, planes e impedimentos, manteniendo al equipo alineado y enfocado.",
                    "No debe durar más de 15 minutos y su propósito es la sincronización del equipo, no la resolución detallada de problemas."
                ]
            }
        ]
    }
};
