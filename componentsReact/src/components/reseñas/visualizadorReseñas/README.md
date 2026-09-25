# VisualizadorReseñas

Carrusel infinito de tarjetas de reseñas (pensado para reseñas de Google).
Por ahora solo es el diseño: las reseñas se pasan por props.

## Especificaciones recibidas

1. Tarjetas pequeñas con reseñas importadas de Google (de momento, solo diseño).
2. Se mueven de derecha a izquierda.
3. Si el ratón está encima de una tarjeta, el carrusel se para hasta que se quite.

## Cómo funciona

- La lista se pinta **dos veces** seguidas y la pista se desplaza un `-50%` con
  una animación CSS infinita: al terminar, la segunda copia está justo donde
  empezó la primera, así que el bucle no tiene saltos. La copia lleva
  `aria-hidden` para que el lector de pantalla no lea las reseñas dos veces.
- **Pausa:** `.pista:has(.card:hover) { animation-play-state: paused }`. Solo se
  para con el ratón encima de una tarjeta, no en el hueco entre ellas.
- **Responsive:** cada tarjeta mide el 85% de la pantalla en móvil y entre
  260px y 380px en escritorio y monitores grandes.
- Texto limitado a 4 líneas. Los bordes del carrusel se difuminan.
- Si el sistema pide "reducir movimiento", no hay animación y se desliza a mano.

## Uso

Requiere Bootstrap 5 cargado una vez en la web (`import "bootstrap/dist/css/bootstrap.min.css"`).

```tsx
<VisualizadorReseñas
  reseñas={[
    { autor: "María López", puntuacion: 5, fecha: "hace 2 semanas", texto: "Atención de 10." },
  ]}
/>
```

## Props

| Prop | Tipo | Req. | Descripción |
| --- | --- | --- | --- |
| `reseñas` | `Reseña[]` | Sí | Lista de reseñas. |
| `duracion` | `number` | No | Segundos por vuelta completa (por defecto 6s por reseña). |

`Reseña`: `{ autor, foto?, puntuacion (1-5), fecha, texto }`.

## Para cuando se conecte con Google

Correspondencia con la API de Google Places (New), campo `reviews`:

| `Reseña` | Google |
| --- | --- |
| `autor` | `authorAttribution.displayName` |
| `foto` | `authorAttribution.photoUri` |
| `puntuacion` | `rating` |
| `fecha` | `relativePublishTimeDescription` |
| `texto` | `text.text` |
