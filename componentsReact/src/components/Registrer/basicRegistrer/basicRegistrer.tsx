import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import "./basicRegistrer.css";
import { validarPassword, validarVacios, type ErroresForm } from "../../FORMs/validarCamposForm";

const OBLIGATORIOS = ["nombre", "apellidos", "email", "telefono", "usuario", "contrasena", "confirmarContrasena"];

export interface BasicRegistrerData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  usuario: string;
  contrasena: string;
  confirmarContrasena: string;
}

interface BasicRegistrerProps {
  onSubmit?: (data: BasicRegistrerData) => void;
}

const INITIAL_DATA: BasicRegistrerData = {
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  usuario: "",
  contrasena: "",
  confirmarContrasena: "",
};

export function BasicRegistrer({ onSubmit }: BasicRegistrerProps) {
  const [formData, setFormData] = useState<BasicRegistrerData>(INITIAL_DATA);
  const [errores, setErrores] = useState<ErroresForm>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined })); // el error se quita al corregir
  };

  // Props de accesibilidad y mensaje de error de un campo.
  const aria = (campo: string) => ({
    "aria-invalid": !!errores[campo],
    "aria-describedby": errores[campo] ? `${campo}-error` : undefined,
  });
  const error = (campo: string) =>
    errores[campo] && <p id={`${campo}-error`} className="basic-registrer__error">{errores[campo]}</p>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nuevos = validarVacios(formData, OBLIGATORIOS);
    // Solo se comparan las contraseñas si la confirmación no está ya vacía.
    nuevos.confirmarContrasena ??= validarPassword(formData.contrasena, formData.confirmarContrasena);
    const primero = OBLIGATORIOS.find((campo) => nuevos[campo]);
    if (primero) {
      setErrores(nuevos);
      (e.currentTarget.elements.namedItem(primero) as HTMLElement | null)?.focus();
      return;
    }
    onSubmit?.(formData);
    setFormData(INITIAL_DATA);
  };

  return (
    <form className="basic-registrer" onSubmit={handleSubmit} noValidate>
      <h2 className="basic-registrer__title">Crear cuenta</h2>

      <fieldset className="basic-registrer__group">
        <legend>Datos personales</legend>

        <div className="basic-registrer__field">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ana"
            value={formData.nombre}
            onChange={handleChange}
            autoComplete="given-name"
            {...aria("nombre")}
            required
          />
          {error("nombre")}
        </div>

        <div className="basic-registrer__field">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            id="apellidos"
            name="apellidos"
            type="text"
            placeholder="García López"
            value={formData.apellidos}
            onChange={handleChange}
            autoComplete="family-name"
            {...aria("apellidos")}
            required
          />
          {error("apellidos")}
        </div>
      </fieldset>

      <fieldset className="basic-registrer__group">
        <legend>Datos de contacto</legend>

        <div className="basic-registrer__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ana@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            {...aria("email")}
            required
          />
          {error("email")}
        </div>

        <div className="basic-registrer__field">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="600 123 456"
            value={formData.telefono}
            onChange={handleChange}
            autoComplete="tel"
            {...aria("telefono")}
            required
          />
          {error("telefono")}
        </div>
      </fieldset>

      <fieldset className="basic-registrer__group">
        <legend>Datos de acceso</legend>

        <div className="basic-registrer__field">
          <label htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            name="usuario"
            type="text"
            placeholder="ana_garcia"
            value={formData.usuario}
            onChange={handleChange}
            autoComplete="username"
            {...aria("usuario")}
            required
          />
          {error("usuario")}
        </div>

        <div className="basic-registrer__field">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            placeholder="••••••••"
            value={formData.contrasena}
            onChange={handleChange}
            autoComplete="new-password"
            {...aria("contrasena")}
            required
          />
          {error("contrasena")}
        </div>

        <div className="basic-registrer__field">
          <label htmlFor="confirmarContrasena">Confirmar contraseña</label>
          <input
            id="confirmarContrasena"
            name="confirmarContrasena"
            type="password"
            placeholder="••••••••"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            autoComplete="new-password"
            {...aria("confirmarContrasena")}
            required
          />
          {error("confirmarContrasena")}
        </div>
      </fieldset>

      <button type="submit" className="basic-registrer__submit">
        Registrarse
      </button>
    </form>
  );
}

export default BasicRegistrer;
