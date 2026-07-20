// 1: Etiqueta simple: El uso más elemental: guardar HTML dentro de una variable. 
const saludo = <h1>¡Hola, mundo desde JSX!</h1>;

const nombre = "María";
const edad = 25;

// 2: Insertar variables y expresiones: Usamos las llaves {} para  meter código JavaScript ejecutable directamente dentro de las etiquetas HTML.
const tarjetaUsuario = (
  <div>
    <h2>{nombre}</h2>
    <p>Edad: {edad} años</p>
    <p>En 5 años tendrás: {edad + 5} años</p>
  </div>
);

// 3: Usar atributos y estilos : En JSX los atributos HTML cambian a estilo camelCase (por ejemplo, class pasa a ser className).
const estiloTexto = { color: 'royalblue', fontSize: '18px' };

const botonSencillo = (
  <button 
    className="btn-principal" 
    style={estiloTexto}
    onClick={() => alert('¡Hiciste clic!')}
  >
    Haz clic aquí
  </button>
);

// 4: Renderizado condicional (Operador ternario):

const estaLogueado = true;

const barraNavegacion = (
  <nav>
    {estaLogueado ? (
      <p>Bienvenido de nuevo, usuario</p>
    ) : (
      <button>Iniciar sesión</button>
    )}
  </nav>
);

// 5: Renderizado de listas: Usamos el método map() para iterar sobre un array y generar elementos JSX.
const frutas = ['Manzana', 'Banana', 'Cereza'];
const listaFrutas = (
  <ul>
    {frutas.map((fruta, index) => ( 
        <li key={index}>{fruta}</li>
    ))}
  </ul>
);      

// 6. Tu primer componente con Props:

// Definición del componente
function TarjetaProducto(props) {
  return (
    <div className="card">
      <h3>{props.titulo}</h3>
      <p>Precio: ${props.precio}</p>
      {props.enStock ? <span>Disponible</span> : <span>Agotado</span>}
    </div>
  );
}

// Uso del componente
const catalogo = (
  <div>
    <TarjetaProducto titulo="Teclado Mecánico" precio={80} enStock={true} />
    <TarjetaProducto titulo="Ratón Gamer" precio={45} enStock={false} />
  </div>
);

// 7. Manejo de Estado con useState: Añadimos reactividad: el JSX cambia automáticamente en pantalla cuando cambia el estado interno del componente

import { useState } from 'react';

function Contador() {
  const [num, setNum] = useState(0);

  return (
    <div className="contador">
      <h2>Clics: {num}</h2>
      <button onClick={() => setNum(num + 1)}>Incrementar</button>
      <button onClick={() => setNum(0)}>Resetear</button>
    </div>
  );
}

// 8. Fragments <> y composición limpia Para devolver varios elementos hermanos sin añadir nodos HTML innecesarios al DOM (<div>), usamos los Fragments <>...</>.

function PerfilUsuario({ usuario }) {
  return (
    <>
      <header>
        <img src={usuario.avatarUrl} alt={usuario.nombre} />
        <h1>{usuario.nombre}</h1>
      </header>
      <section>
        <p>Bio: {usuario.bio || "Sin biografía disponible."}</p>
      </section>
    </>
  );
}

// 9. Formulario interactivo (Input controlado): Vinculamos lo que el usuario escribe directamente al estado de React, mostrando los cambios en tiempo real dentro del mismo JSX:

import { useState } from 'react';

function FormularioSaludo() {
  const [nombre, setNombre] = useState('');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Tu nombre:</label>
      <input 
        type="text" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
        placeholder="Escribe algo..."
      />
      <p>{nombre ? `¡Hola, ${nombre}!` : 'Escribe tu nombre arriba.'}</p>
    </form>
  );
}


// 10. Iteración de Objetos Complejos con Lógica Condicional (&&): Renderizamos una lista de objetos más elaborados, usando el operador && para mostrar elementos solo si se cumple una condición previa.
const tareas = [
  { id: 1, texto: 'Aprender JSX', completada: true, prioritaria: false },
  { id: 2, texto: 'Dominar Hooks', completada: false, prioritaria: true },
  { id: 3, texto: 'Crear un proyecto', completada: false, prioritaria: false },
];

function ListaTareas() {
  return (
    <ul className="lista-tareas">
      {tareas.map((tarea) => (
        <li key={tarea.id} className={tarea.completada ? 'tachado' : ''}>
          <span>{tarea.texto}</span>
          {/* Muestra la etiqueta solo si es prioritaria y no está completada */}
          {tarea.prioritaria && !tarea.completada && (
            <strong style={{ color: 'red', marginLeft: '8px' }}>¡Urgente!</strong>
          )}
        </li>
      ))}
    </ul>
  );
}



