import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import "./menu-dropdown.css";

export interface MenuLink {
  label: string;
  href: string;
}

export interface MenuDropdownItem {
  label: string;
  /** Enlace directo (si no tiene `children`). */
  href?: string;
  /** Opciones que se despliegan al hacer clic. */
  children?: MenuLink[];
}

export interface MenuDropdownProps {
  brand: ReactNode;
  /** URL del logo de la empresa; se muestra a la izquierda del nombre. */
  logo?: string;
  items: MenuDropdownItem[];
  variant?: "light" | "dark";
  /** Color de resaltado al pasar el ratón o con el foco. */
  hoverColor?: string;
  /** Componente de enlace de la web que lo use (NavLink, Link...). Por defecto `<a>`. */
  linkAs?: ElementType;
}

/**
 * Menú con desplegables hecho con clases de Bootstrap 5.
 * Requiere que la web cargue el CSS de Bootstrap una vez (p. ej. en main.tsx).
 */
export function MenuDropdown({ brand, logo, items, variant = "light", hoverColor, linkAs: Link = "a" }: MenuDropdownProps) {
  const [abierto, setAbierto] = useState(false);
  const [desplegado, setDesplegado] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  // Cierra el desplegable al hacer clic fuera del menú.
  useEffect(() => {
    const fuera = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setDesplegado(null);
    document.addEventListener("click", fuera);
    return () => document.removeEventListener("click", fuera);
  }, []);

  const cerrar = () => {
    setAbierto(false);
    setDesplegado(null);
  };

  return (
    <nav
      ref={ref}
      className="menu-dropdown navbar navbar-expand-lg bg-body-tertiary border-bottom py-lg-3"
      data-bs-theme={variant}
      style={{ fontSize: "clamp(1rem, 0.6rem + 0.5vw, 1.4rem)", ...(hoverColor && { "--menu-hover": hoverColor }) }}
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
          <ul className="navbar-nav ms-auto gap-lg-2">
            {items.map(({ label, href, children }, i) => (
              <li className={`nav-item ${children ? "dropdown" : ""}`} key={label}>
                {children ? (
                  <>
                    <button
                      className={`nav-link dropdown-toggle rounded px-3 w-100 text-start ${desplegado === i ? "show" : ""}`}
                      type="button"
                      aria-expanded={desplegado === i}
                      onClick={() => setDesplegado(desplegado === i ? null : i)}
                    >
                      {label}
                    </button>
                    <ul className={`dropdown-menu shadow ${desplegado === i ? "show" : ""}`}>
                      {children.map((c) => (
                        <li key={c.href}>
                          <Link className="dropdown-item py-2" href={c.href} to={c.href} onClick={cerrar}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link className="nav-link rounded px-3" href={href} to={href} onClick={cerrar}>
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuDropdown;
