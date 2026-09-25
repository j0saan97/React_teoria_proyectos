import { useEffect, useRef, useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import "./SelectorPais.css";
import { PAISES, buscarPais } from "./paises";

interface SelectorPaisProps {
  id: string;
  /** Código ISO del país seleccionado (p. ej. "es"). */
  value: string;
  onChange: (codigo: string) => void;
  /** "pais": bandera + nombre. "prefijo": bandera + prefijo telefónico. */
  modo: "pais" | "prefijo";
  "aria-label"?: string;
}

/**
 * Desplegable con bandera de cada país y buscador.
 * No es un <select> nativo porque sus opciones no pueden mostrar imágenes.
 */
export function SelectorPais({ id, value, onChange, modo, ...aria }: SelectorPaisProps) {
  const [abierto, setAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const actual = buscarPais(value);

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

  // Búsqueda sin tildes ni mayúsculas: "mex" encuentra "México".
  const normalizar = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const texto = normalizar(busqueda.trim());
  const filtrados = PAISES.filter((p) => normalizar(p.nombre).includes(texto) || p.prefijo.includes(texto));

  const elegir = (codigo: string) => {
    onChange(codigo);
    setAbierto(false);
    setBusqueda("");
  };

  return (
    <div ref={ref} className={`selector-pais selector-pais--${modo}`}>
      <button
        id={id}
        type="button"
        className="selector-pais__boton"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        {...aria}
        onClick={() => setAbierto(!abierto)}
      >
        {actual && <span className={`fi fi-${actual.codigo}`} />}
        <span className="selector-pais__texto">{modo === "pais" ? actual?.nombre : actual?.prefijo}</span>
      </button>

      {abierto && (
        <div className="selector-pais__menu">
          <input
            className="selector-pais__buscar"
            type="search"
            placeholder={modo === "pais" ? "Buscar país…" : "Buscar país o prefijo…"}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            autoFocus
          />
          <ul role="listbox" className="selector-pais__lista">
            {filtrados.map((p) => (
              <li
                key={p.codigo}
                role="option"
                aria-selected={p.codigo === value}
                tabIndex={0}
                onClick={() => elegir(p.codigo)}
                onKeyDown={(e) => e.key === "Enter" && elegir(p.codigo)}
              >
                <span className={`fi fi-${p.codigo}`} />
                <span className="selector-pais__nombre">{p.nombre}</span>
                {modo === "prefijo" && <span className="selector-pais__prefijo">{p.prefijo}</span>}
              </li>
            ))}
            {filtrados.length === 0 && <li className="selector-pais__vacio">Sin resultados</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectorPais;
