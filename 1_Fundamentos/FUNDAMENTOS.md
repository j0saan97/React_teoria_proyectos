FUNDAMENTOS

1. El Virtual DOM
React no actualiza toda la página cada vez que algo cambia. Crea una copia ligera del DOM real en memoria (el Virtual DOM).

Cómo funciona: Cuando hay un cambio, React compara esa copia con la versión anterior (proceso llamado diffing).

Resultado: Solo aplica en el navegador los cambios estrictamente necesarios, lo que hace que la interfaz sea muy rápida.

2. Componentes: Los "Legos"
Un componente es una pieza de la interfaz independiente y reutilizable. Puede ser tan pequeño como un botón o tan grande como una página entera.

Funcionales: Hoy en día se usan casi exclusivamente funciones de JavaScript que devuelven HTML (escrito en JSX).

3. JSX (JavaScript XML)
Es una extensión de sintaxis que te permite escribir HTML directamente dentro de JavaScript.

Importante: No es un string. Se transforma en objetos de JavaScript que React entiende.

Regla de oro: Siempre debes devolver un único elemento padre (o usar un Fragmento <> ... </>).

4. Props vs. State
Esta es la distinción que más suele liar al principio:

Props (Propiedades): Es la información que le pasas a un componente desde fuera (como los atributos de una etiqueta HTML). Son inmutables: el componente que las recibe no puede cambiarlas, solo leerlas.

State (Estado): Es la "memoria" interna del componente. Datos que pueden cambiar con el tiempo (ej. lo que alguien escribe en un input). Cuando el estado cambia, el componente se vuelve a renderizar automáticamente.

5. Flujo de datos unidireccional
En React, la información fluye en una sola dirección: de padres a hijos.

Los padres pasan datos a los hijos mediante props.

Si un hijo necesita avisar al padre de algo, lo hace ejecutando una función que el padre le pasó previamente.

6. Hooks (el famoso useState y useEffect)
Son funciones que te permiten "engancharte" a las funcionalidades de React en componentes funcionales.

useState: Para manejar el estado.

useEffect: Para ejecutar código cuando el componente aparece, desaparece o se actualiza (ej. llamar a una API).