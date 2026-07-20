JSX:

## JSX en resumen

JSX es una extensión de sintaxis que te permite escribir HTML dentro de JavaScript. Se transforma por debajo en llamadas a `React.createElement()`.

**Reglas básicas:**

1. **Un solo elemento raíz** — todo debe estar envuelto en un tag padre (o usa un Fragment `<>...</>` si no quieres un div extra)
```jsx
return (
  <>
    <h1>Título</h1>
    <p>Texto</p>
  </>
)
```

2. **Cierra todos los tags** — incluso los que en HTML normal no llevan cierre
```jsx
<img src="foto.jpg" />
<br />
<input type="text" />
```

3. **`className` en vez de `class`** (porque `class` es palabra reservada en JS)
```jsx
<div className="contenedor">
```

4. **camelCase para atributos** que en HTML son multi-palabra
```jsx
<button onClick={...}>  // no "onclick"
<label htmlFor="nombre">  // no "for"
```

5. **`{}` para insertar JavaScript** dentro del JSX
```jsx
const nombre = "Josan";
return <h1>Hola, {nombre}</h1>;
```

6. **Solo expresiones, no statements** — dentro de `{}` puedes poner algo que devuelva un valor (variables, funciones, ternarios, `.map()`), pero no `if`, `for`, etc. directamente
```jsx
{condicion ? <p>Sí</p> : <p>No</p>}
{lista.map(item => <li key={item.id}>{item.nombre}</li>)}
```

7. **Estilos inline como objeto**, no string
```jsx
<div style={{ color: "red", fontSize: "16px" }}>
```

8. **Comentarios** van dentro de `{}`
```jsx
{/* esto es un comentario */}
```

9. **`key` obligatoria** al renderizar listas con `.map()` (para que React identifique cada elemento)

Eso es prácticamente todo lo esencial — el resto es JavaScript normal metido entre llaves.
