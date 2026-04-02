/* Atributos dinámicos y estilos en línea 
Puedes pasar objetos enteros a los atributos. Los estilos en línea no se escriben como una cadena de texto (como en HTML), 
sino como un objeto de JavaScript con nombres de propiedades en camelCase */

const StatusBadge = () => {
  const isActive = true;
  const imagePath = "/assets/icon.png";

  const styles = {
    backgroundColor: isActive ? 'green' : 'red',
    color: 'white',
    padding: '10px',
    borderRadius: '5px'
  };

  return (
    <section>
      <img src={imagePath} alt="Icono de estado" width={50} />
      <div style={styles}>
        {isActive ? "Conectado" : "Desconectado"}
      </div>
    </section>
  );
};


/* Punto clave: Las propiedades CSS que llevan guion (como background-color) se convierten a camelCase (backgroundColor) dentro del objeto de estilo.

Resumen para tu teoría:
Un solo padre: Todo el JSX debe estar envuelto en una sola etiqueta (o un Fragmento <>...</>).

Cierre estricto: Todas las etiquetas deben cerrarse, incluso las que no tienen contenido (ej: <img /> o <br />).

CamelCase: Los atributos de HTML pasan a ser camelCase (onClick, onChange, tabIndex). */