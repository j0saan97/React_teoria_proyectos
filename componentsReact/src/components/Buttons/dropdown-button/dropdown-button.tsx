import { useEffect, useId, useRef, useState } from "react";
import "./dropdown-button.css";

export interface DropdownOpcion {
  label: string;
  /** Si tiene `href` se pinta como enlace; si no, como botón que llama a `onSelect`. */
  href?: string;
}

export interface DropdownButtonProps {
  label: string;
  opciones: DropdownOpcion[];
  /** Aspecto: sólido (Bootstrap clásico), contorno (minimalista) o degradado (píldora). */
  estilo?: "solido" | "contorno" | "degradado";
  onSelect?: (opcion: DropdownOpcion, indice: number) => void;
}

/**
 * Botón con menú desplegable, con clases de Bootstrap 5 y 3 estilos de CSS.
 * Se cierra al elegir una opción, al hacer clic fuera o con Escape.
 * Requiere que la web cargue el CSS de Bootstrap una vez (p. ej. en main.tsx).
 */
export function DropdownButton({ label, opciones, estilo = "solido", onSelect }: DropdownButtonProps) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setAbierto(false);
    const escape = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("click", fuera);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", fuera);
      document.removeEventListener("keydown", escape);
    };
  }, [abierto]);

  const elegir = (opcion: DropdownOpcion, i: number) => {
    onSelect?.(opcion, i);
    setAbierto(false);
  };

  return (
    <div ref={ref} className={`dropdown d-inline-block dropdown-button dropdown-button--${estilo}`}>
      <button
        className="btn dropdown-toggle"
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto(!abierto)}
      >
        {label}
      </button>
      <ul id={id} className={`dropdown-menu ${abierto ? "show" : ""}`}>
        {opciones.map((o, i) => (
          <li key={i}>
            {o.href ? (
              <a className="dropdown-item" href={o.href} onClick={() => elegir(o, i)}>{o.label}</a>
            ) : (
              <button className="dropdown-item" type="button" onClick={() => elegir(o, i)}>{o.label}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownButton;
