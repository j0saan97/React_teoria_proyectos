import { useEffect, useRef, useState, type ElementType, type FormEvent, type ReactNode } from "react";
import "./navbar-busqueda.css";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarItem {
  label: string;
  href?: string;
  /** Marca el enlace de la página actual. */
  activo?: boolean;
  deshabilitado?: boolean;
  /** Opciones del desplegable. `"separador"` pinta una línea divisoria. */
  children?: (NavbarLink | "separador")[];
}

export interface NavbarBusquedaProps {
  brand: ReactNode;
  /** URL del logo de la empresa; se muestra a la izquierda del nombre. */
  logo?: string;
  items: NavbarItem[];
  /** Aspecto: clásico (Bootstrap tal cual), moderno (claro con píldoras) u oscuro. */
  estilo?: "clasico" | "moderno" | "oscuro";
  placeholder?: string;
  /** Se llama al enviar la búsqueda con el texto escrito. */
  onSearch?: (texto: string) => void;
  /** Componente de enlace de la web que lo use (NavLink, Link...). Por defecto `<a>`. */
  linkAs?: ElementType;
}

/**
 * Navbar de Bootstrap 5 con enlaces, desplegable y barra de búsqueda, con 3 estilos de CSS.
 * La controla React (no necesita el JS de Bootstrap).
 * Requiere que la web cargue el CSS de Bootstrap una vez (p. ej. en main.tsx).
 */
export function NavbarBusqueda({ brand, logo, items, estilo = "clasico", placeholder = "Buscar", onSearch, linkAs: Link = "a" }: NavbarBusquedaProps) {
  const [abierto, setAbierto] = useState(false);
  const [desplegado, setDesplegado] = useState<number | null>(null);
  const [texto, setTexto] = useState("");
  const ref = useRef<HTMLElement>(null);

  // Cierra el desplegable al hacer clic fuera.
  useEffect(() => {
    if (desplegado === null) return;
    const fuera = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setDesplegado(null);
    document.addEventListener("click", fuera);
    return () => document.removeEventListener("click", fuera);
  }, [desplegado]);

  const cerrar = () => {
    setAbierto(false);
    setDesplegado(null);
  };

  const buscar = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(texto.trim());
  };

  return (
    <nav
      ref={ref}
      className={`navbar navbar-expand-lg navbar-busqueda navbar-busqueda--${estilo} ${estilo === "clasico" ? "bg-body-tertiary" : ""}`}
      data-bs-theme={estilo === "oscuro" ? "dark" : "light"}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/" to="/" onClick={cerrar}>
          {logo && <img src={logo} alt="" style={{ height: "1.6em" }} />}
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {items.map(({ label, href = "#", activo, deshabilitado, children }, i) =>
              children ? (
                <li className="nav-item dropdown" key={label}>
                  <button
                    className={`nav-link dropdown-toggle ${desplegado === i ? "show" : ""}`}
                    type="button"
                    aria-expanded={desplegado === i}
                    onClick={() => setDesplegado(desplegado === i ? null : i)}
                  >
                    {label}
                  </button>
                  <ul className={`dropdown-menu ${desplegado === i ? "show" : ""}`}>
                    {children.map((c, j) =>
                      c === "separador" ? (
                        <li key={j}><hr className="dropdown-divider" /></li>
                      ) : (
                        <li key={j}>
                          <Link className="dropdown-item" href={c.href} to={c.href} onClick={cerrar}>{c.label}</Link>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ) : (
                <li className="nav-item" key={label}>
                  {deshabilitado ? (
                    <span className="nav-link disabled" aria-disabled="true">{label}</span>
                  ) : (
                    <Link
                      className={`nav-link ${activo ? "active" : ""}`}
                      aria-current={activo ? "page" : undefined}
                      href={href}
                      to={href}
                      onClick={cerrar}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              )
            )}
          </ul>

          <form className="d-flex navbar-busqueda__form" role="search" onSubmit={buscar}>
            <input
              className="form-control me-2"
              type="search"
              placeholder={placeholder}
              aria-label={placeholder}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit" aria-label="Buscar">
              <svg className="navbar-busqueda__lupa" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span className="navbar-busqueda__texto-boton">Buscar</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavbarBusqueda;
