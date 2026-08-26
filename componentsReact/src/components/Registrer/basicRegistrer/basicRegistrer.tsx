import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import "./basicRegistrer.css";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData(INITIAL_DATA);
  };

  return (
    <form className="basic-registrer" onSubmit={handleSubmit}>
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
            required
          />
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
            required
          />
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
            required
          />
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
            required
          />
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
            required
          />
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
            required
          />
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
            required
          />
        </div>
      </fieldset>

      <button type="submit" className="basic-registrer__submit">
        Registrarse
      </button>
    </form>
  );
}

export default BasicRegistrer;
