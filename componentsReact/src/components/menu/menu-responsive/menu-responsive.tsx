import { useState, type ElementType, type ReactNode } from "react";

export interface MenuItem {
  label: string;
  href: string;
}

export interface MenuResponsiveProps {
  brand: ReactNode;
  /** URL del logo de la empresa; se muestra a la izquierda del nombre. */
  logo?: string;
  items: MenuItem[];
  cta?: MenuItem;
  variant?: "light" | "dark";
  /** Componente de enlace de la web que lo use (NavLink, Link...). Por defecto `<a>`. */
  linkAs?: ElementType;
}

/**
 * Menú reutilizable hecho solo con clases de Bootstrap 5.
 * Requiere que la web cargue el CSS de Bootstrap una vez (p. ej. en main.tsx).
 */
export function MenuResponsive({ brand, logo, items, cta, variant = "light", linkAs: Link = "a" }: MenuResponsiveProps) {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary border-bottom py-lg-3"
      data-bs-theme={variant}
      style={{ fontSize: "clamp(1rem, 0.6rem + 0.5vw, 1.4rem)" }}
    >
      <div className="container-fluid px-3 px-lg-5">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4" href="/" to="/" onClick={cerrar}>
          {logo && <img src={logo} alt="" style={{ height: "1.5em" }} />}
          {brand}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={abierto}
          aria-label="Abrir menú"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${abierto ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto gap-lg-3">
            {items.map(({ label, href }) => (
              <li className="nav-item" key={href}>
                <Link className="nav-link py-3 py-lg-2" href={href} to={href} onClick={cerrar}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {cta && (
            <Link className="btn btn-primary d-block d-lg-inline-block ms-lg-4 my-2 my-lg-0" href={cta.href} to={cta.href} onClick={cerrar}>
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MenuResponsive;
