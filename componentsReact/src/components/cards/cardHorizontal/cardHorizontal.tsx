import type { ElementType, ReactNode } from "react";

export interface CardHorizontalProps {
  titulo: string;
  texto: ReactNode;
  /** URL de la imagen de la izquierda. Sin ella se muestra un hueco gris "Image". */
  imagen?: string;
  /** Texto alternativo de la imagen. */
  alt?: string;
  /** Texto pequeño y gris al final, p. ej. "Actualizado hace 3 min". */
  nota?: string;
  boton?: { label: string; href: string };
  variant?: "light" | "dark";
  /** Ancho máximo de la card. Por defecto 540px, como el ejemplo de Bootstrap. */
  ancho?: string;
  /** Componente de enlace de la web que lo use (NavLink, Link...). Por defecto `<a>`. */
  linkAs?: ElementType;
}

/**
 * Card horizontal de Bootstrap 5: imagen a la izquierda y texto a la derecha.
 * En pantallas pequeñas (< 768px) la imagen pasa arriba.
 * Requiere que la web cargue el CSS de Bootstrap una vez (p. ej. en main.tsx).
 */
export function CardHorizontal({ titulo, texto, imagen, alt = "", nota, boton, variant = "light", ancho = "540px", linkAs: Link = "a" }: CardHorizontalProps) {
  return (
    <div className="card overflow-hidden" data-bs-theme={variant} style={{ maxWidth: ancho }}>
      <div className="row g-0">
        <div className="col-md-4" style={{ minHeight: "12rem" }}>
          {imagen ? (
            <img src={imagen} alt={alt} className="w-100 h-100 object-fit-cover" />
          ) : (
            <div className="w-100 h-100 bg-secondary text-light d-flex align-items-center justify-content-center">Image</div>
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex flex-column h-100">
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{texto}</p>
            {nota && (
              <p className="card-text">
                <small className="text-body-secondary">{nota}</small>
              </p>
            )}
            {boton && (
              <Link href={boton.href} to={boton.href} className="btn btn-primary mt-auto align-self-start">
                {boton.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardHorizontal;
