/* Renderizado de listas (Uso de .map())
En JSX no usamos bucles for. En su lugar, transformamos arrays de datos en elementos visuales usando el método .map(). 
Es obligatorio pasar una key única para que React sepa qué elemento actualizar si la lista cambia. */


const ShoppingList = () => {
  const items = ["Leche", "Pan", "Huevos", "Café"];

  return (
    <ul>
      {items.map((product, index) => (
        <li key={index} className="product-item">
          {product}
        </li>
      ))}
    </ul>
  );
};

// Punto clave: Fíjate que usamos className en lugar de class, porque class es una palabra reservada en JavaScript.

