1. ¿Formato .js o .ts?
En 2026, la industria estándar es .ts (TypeScript) o .tsx si contiene JSX.

Por qué: TypeScript detecta errores de escritura antes de que ejecutes el código. Si estás aprendiendo, empezar con .js es más rápido, pero para cualquier proyecto serio o laboral, TypeScript es el requisito.

¿Por qué TypeScript se convirtió en el estándar?
Auto-documentación en tiempo real: No necesitas adivinar qué propiedades tiene un objeto o qué parámetros recibe una función. Tu editor (como VS Code) te lo dice al instante con el autocompletado (IntelliSense).

Refactorización sin miedo: Si renombras una variable o cambias la estructura de un componente en una mini app, TypeScript te marcará en rojo exactamente en qué otros archivos se rompió algo antes de que abras el navegador.

Mantenibilidad en equipo: En proyectos donde trabajan varios desarrolladores (o cuando vuelves a revisar tu propio código meses después), las interfaces y tipos te dicen exactamente cómo debe fluir la información

2. Enrutamiento next.js
Enrutamiento automático: Creas una carpeta y la ruta nace sola (File-system Routing), sin configurar librerías externas.

SEO perfecto y carga ultra rápida: Renderiza el contenido en el servidor (SSR) y manda HTML listo al navegador.

Full-stack en un solo lugar: Puedes crear APIs internas (backend) y frontend en el mismo proyecto sin montar un servidor aparte.

Rendimiento optimizado de caja: Optimiza imágenes, fuentes y código automáticamente para que la web sea extremadamente ligera.

El estándar del mercado laboral: Es el framework de React más demandado por empresas para crear aplicaciones modernas y escalables.

Server Components: Reduce la cantidad de JavaScript que descarga el usuario, ejecutando la lógica pesada directamente en el servidor

3. ¿Clases en 2026?
Quedaron 100% obsoletas: Desde 2019 los componentes funcionales con Hooks son el estándar único y absoluto de la industria.

Sin enredos con this: Las funciones evitan los confusos errores de contexto y bindings que provocaban las clases.

Lógica unificada y limpia: Con Hooks como useEffect organizas tu código en un solo bloque, sin dividirlo en ciclos de vida.

Fáciles de reutilizar: Permiten crear Custom Hooks para compartir lógica entre componentes en un par de líneas.

Cero clases en el día a día: Solo sobreviven en proyectos antiguos (legacy) o en librerías internas para manejo de errores (Error Boundaries).

4. Flujo de datos: ¿Padre a hijo y viceversa?
Padre a Hijo: El flujo principal pasa datos hacia abajo de forma directa a través de las props.

Hijo a Padre: El hijo no envía datos directamente; ejecuta una función que el padre le pasó por props.

El "Truco": Los datos suben como argumentos dentro de esa función, manteniendo el control en el padre.

Flujo Unidireccional: El estado siempre fluye en un solo sentido, evitando comportamientos impredecibles.

Escalabilidad: Si hay muchos niveles intermedios (Prop Drilling), se usan herramientas como Context API o Zustand.

5. Evitar el paso por muchos elementos (Prop Drilling):
El Problema: Pasar props por componentes intermedios que no las usan (Prop Drilling) ensucia y fragiliza el código.

La Regla: Si más de 3 niveles de componentes solo transportan datos sin usarlos, es momento de usar un estado global.

Context API: La opción nativa de React perfecta para datos globales y estables como idioma o tema visual.

Zustand: La biblioteca moderna y ligera más recomendada hoy por su simplicidad y excelente rendimiento.

El Resultado: Componentes más limpios, desacoplados y fáciles de mantener sin cadenas infinitas de props.

