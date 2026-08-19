import { useState } from "react";

export default function App() {
  const articulos = [
    "React para principiantes",
    "Guía completa de JavaScript",
    "Aprende CSS Grid y Flexbox",
    "Cómo usar Hooks en React",
    "Introducción a Tailwind CSS",
    "Manejo de estado con Zustand",
  ];

  const [busqueda, setBusqueda] = useState("");

  const articulosFiltrados = articulos.filter((articulo) =>
    articulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="buscador-container">
      <h2>Buscador de Artículos</h2>

      <input
        type="text"
        placeholder="Buscar artículo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador-input"
      />

      <ul className="buscador-lista">
        {articulosFiltrados.length > 0 ? (
          articulosFiltrados.map((nombre, index) => (
            <li key={index}>{nombre}</li>
          ))
        ) : (
          <li>No se encontraron resultados</li>
        )}
      </ul>
    </div>
  );
}
