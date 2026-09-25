import type { ElementType, ReactNode } from "react";

export interface CardBasicaProps {
  titulo: string;
  texto: ReactNode;
  /** URL de la imagen superior. Sin ella se muestra un hueco gris "Image cap". */
  imagen?: string;
  /** Texto alternativo de la imagen. */
  alt?: string;
  boton?: { label: string; href: string };
  variant?: "light" | "dark";
  /** Ancho de la card. Por defecto 18rem, como el ejemplo de Bootstrap. */
  ancho?: string;
  /** Componente de enlace de la web que lo use (NavLink, Link...). Por defecto `<a>`. */
  linkAs?: ElementType;
}

/**
 * Card básica de Bootstrap 5: imagen arriba, título, texto y botón.
 * Requiere que la web cargue el CSS de Bootstrap una vez (p. ej. en main.tsx).
 */
export function CardBasica({ titulo, texto, imagen, alt = "", boton, variant = "light", ancho = "18rem", linkAs: Link = "a" }: CardBasicaProps) {
  return (
    <div className="card h-100" data-bs-theme={variant} style={{ width: ancho, maxWidth: "100%" }}>
      {imagen ? (
        <img src={imagen} className="card-img-top object-fit-cover" alt={alt} style={{ aspectRatio: "16 / 10" }} />
      ) : (
        <div className="card-img-top bg-secondary text-light d-flex align-items-center justify-content-center" style={{ aspectRatio: "16 / 10" }}>
          Image cap
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{texto}</p>
        {boton && (
          <Link href={boton.href} to={boton.href} className="btn btn-primary mt-auto align-self-start">
            {boton.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export default CardBasica;
