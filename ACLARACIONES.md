story book corre en: 
http://localhost:6006/

como y donde debo guardar los componentes que cree en adelante?
Dónde guardar

Dentro de src/components/, crea una carpeta por componente:

src/
  components/
    ContactForm/
      ContactForm.tsx
      ContactForm.stories.tsx
      ContactForm.css
    Boton/              ← nuevo componente
      Boton.tsx
      Boton.stories.tsx
      Boton.css
    Carta/              ← otro nuevo
      Carta.tsx
      Carta.stories.tsx
      Carta.css

      Regla simple

Por cada componente nuevo: 1 carpeta con su nombre, y dentro 3 archivos con ese mismo nombre:

NombreComponente.tsx → el componente en sí
NombreComponente.stories.tsx → las variantes para Storybook
NombreComponente.css → sus estilos
Sobre la carpeta stories/ que ya tienes

Esa carpeta (src/stories/) es la que trae Storybook por defecto al instalarlo, con los ejemplos genéricos (Button, Header, Page). Te sirve para consultarla como referencia de cómo escribir un .stories.tsx, pero no metas ahí tus componentes nuevos — usa siempre src/components/. Cuando ya no la necesites de referencia, puedes borrarla sin problema.

Por qué esta estructura funciona bien
Storybook detecta automáticamente cualquier archivo *.stories.tsx en el proyecto, sin importar dónde esté — así que en cuanto crees Boton.stories.tsx aparecerá solo en el sidebar
Tener el .css junto al componente evita que los estilos de un componente se mezclen con los de otro (nada de un styles.css gigante compartido)
Es el estándar que usa la mayoría de proyectos React reales, así que te acostumbras a lo que verás en el trabajo/otros repos