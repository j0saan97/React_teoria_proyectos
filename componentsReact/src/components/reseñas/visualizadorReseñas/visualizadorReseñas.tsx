import "./visualizadorReseñas.css";

export interface Reseña {
  autor: string;
  /** URL de la foto de perfil. Si no hay, se muestra la inicial. */
  foto?: string;
  /** De 1 a 5. */
  puntuacion: number;
  /** Texto relativo tal como lo da Google, p. ej. "hace 2 semanas". */
  fecha: string;
  texto: string;
}

export interface VisualizadorReseñasProps {
  reseñas: Reseña[];
  /** Segundos que tarda en dar una vuelta completa. Por defecto 6s por reseña. */
  duracion?: number;
}

/**
 * Carrusel infinito de reseñas que se mueve de derecha a izquierda.
 * Se para mientras el ratón está encima de una tarjeta.
 * Usa clases de Bootstrap 5 (la web debe cargar su CSS una vez).
 */
export function VisualizadorReseñas({ reseñas, duracion = reseñas.length * 6 }: VisualizadorReseñasProps) {
  // La lista se pinta dos veces para que el bucle no tenga saltos.
  const tarjetas = [...reseñas, ...reseñas];

  return (
    <div className="visualizador-resenas overflow-hidden py-3">
      <ul className="visualizador-resenas__pista d-flex list-unstyled m-0" style={{ animationDuration: `${duracion}s` }}>
        {tarjetas.map((r, i) => (
          <li key={i} className="visualizador-resenas__item" aria-hidden={i >= reseñas.length}>
            <article className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  {r.foto ? (
                    <img src={r.foto} alt="" className="rounded-circle" width={40} height={40} />
                  ) : (
                    <span className="visualizador-resenas__inicial rounded-circle d-inline-flex align-items-center justify-content-center fw-bold text-white bg-primary">
                      {r.autor[0]}
                    </span>
                  )}
                  <div className="lh-sm">
                    <div className="fw-semibold">{r.autor}</div>
                    <small className="text-body-secondary">{r.fecha}</small>
                  </div>
                </div>
                <div className="visualizador-resenas__estrellas" aria-label={`${r.puntuacion} de 5 estrellas`}>
                  {"★".repeat(r.puntuacion)}
                  <span className="text-body-tertiary">{"★".repeat(5 - r.puntuacion)}</span>
                </div>
                <p className="visualizador-resenas__texto card-text mb-0">{r.texto}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VisualizadorReseñas;
