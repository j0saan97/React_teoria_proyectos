import { useCallback, useEffect, useRef, useState } from "react";

type Fase = "idle" | "principal" | "extra";

export interface UseTimebankHoldemOptions {
  /** Segundos del contador extra que arranca al agotarse el principal. */
  extraTimebank?: number;
  /** Se llama al terminar el turno (sin extra, o al agotarse el extra). */
  onFinTurno?: () => void;
}

export interface TimebankHoldemEstado {
  /** Segundos restantes del contador en curso. */
  segundos: number;
  /** El contador en curso es el tiempo extra. */
  enExtra: boolean;
  /** Está visible el aviso de fin de turno. */
  avisoFinTurno: boolean;
  /** Programa (o reinicia) el timebank principal con estos segundos. */
  programar: (segundos: number) => void;
  /** Detiene y limpia el contador. */
  reiniciar: () => void;
}

const DURACION_AVISO_MS = 3000;

/**
 * Lógica del timebank fuera del componente: cuenta atrás, salto automático
 * al tiempo extra y aviso de fin de turno. Devuelve el estado listo para
 * pasárselo a `<TimebankHoldem />` y una función `programar()` para fijar
 * el tiempo desde donde haga falta (un input, un valor fijo, el motor del
 * juego...).
 */
export function useTimebankHoldem(
  options: UseTimebankHoldemOptions = {},
): TimebankHoldemEstado {
  const { extraTimebank = 30, onFinTurno } = options;

  const [segundos, setSegundos] = useState(0);
  const [fase, setFase] = useState<Fase>("idle");
  const [avisoFinTurno, setAvisoFinTurno] = useState(false);

  const onFinTurnoRef = useRef(onFinTurno);
  useEffect(() => {
    onFinTurnoRef.current = onFinTurno;
  }, [onFinTurno]);

  useEffect(() => {
    if (fase === "idle") return;

    if (segundos <= 0) {
      if (fase === "principal" && extraTimebank > 0) {
        // Al agotarse el timebank principal arranca el contador extra.
        setFase("extra");
        setSegundos(extraTimebank);
      } else {
        // Se acabó el turno: sin extra, o el extra ya ha terminado.
        setFase("idle");
        setAvisoFinTurno(true);
        onFinTurnoRef.current?.();
      }
      return;
    }

    const id = setTimeout(() => setSegundos((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [fase, segundos, extraTimebank]);

  useEffect(() => {
    if (!avisoFinTurno) return;
    const id = setTimeout(() => setAvisoFinTurno(false), DURACION_AVISO_MS);
    return () => clearTimeout(id);
  }, [avisoFinTurno]);

  const programar = useCallback((s: number) => {
    if (s <= 0) return;
    setAvisoFinTurno(false);
    setSegundos(Math.floor(s));
    setFase("principal");
  }, []);

  const reiniciar = useCallback(() => {
    setFase("idle");
    setSegundos(0);
    setAvisoFinTurno(false);
  }, []);

  return {
    segundos,
    enExtra: fase === "extra",
    avisoFinTurno,
    programar,
    reiniciar,
  };
}
