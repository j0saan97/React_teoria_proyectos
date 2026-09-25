/** Errores de un formulario: nombre del campo → mensaje. */
export type ErroresForm = Partial<Record<string, string>>;

/**
 * Devuelve un error por cada campo obligatorio vacío (los espacios no cuentan).
 * Si el campo se llama "email", además comprueba que tenga formato válido.
 */
export function validarVacios(datos: object, campos: string[]): ErroresForm {
  const errores: ErroresForm = {};
  for (const campo of campos) {
    const valor = String((datos as Record<string, unknown>)[campo] ?? "").trim();
    if (!valor) errores[campo] = "Este campo es obligatorio";
    else if (campo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) errores[campo] = "Introduce un email válido";
  }
  return errores;
}

/** Devuelve un error si las dos contraseñas no son iguales. */
export const validarPassword = (contrasena: string, confirmar: string) =>
  contrasena === confirmar ? undefined : "Las contraseñas no coinciden";
