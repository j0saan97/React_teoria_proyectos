import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import "./login_basico.css";

export interface LoginBasicoData {
  usuario: string;
  contrasena: string;
}

interface LoginBasicoProps {
  onSubmit?: (data: LoginBasicoData) => void;
}

const INITIAL_DATA: LoginBasicoData = {
  usuario: "",
  contrasena: "",
};

export function LoginBasico({ onSubmit }: LoginBasicoProps) {
  const [formData, setFormData] = useState<LoginBasicoData>(INITIAL_DATA);
  const [verContrasena, setVerContrasena] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData(INITIAL_DATA);
    setVerContrasena(false);
  };

  return (
    <form className="login-basico" onSubmit={handleSubmit}>
      <h2 className="login-basico__title">Iniciar sesión</h2>

      <div className="login-basico__field">
        <label htmlFor="usuario">Usuario</label>
        <input
          id="usuario"
          name="usuario"
          type="text"
          value={formData.usuario}
          onChange={handleChange}
          autoComplete="username"
          required
        />
      </div>

      <div className="login-basico__field">
        <label htmlFor="contrasena">Contraseña</label>
        <div className="login-basico__password">
          <input
            id="contrasena"
            name="contrasena"
            type={verContrasena ? "text" : "password"}
            value={formData.contrasena}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          {/* Botón de ojo para mostrar u ocultar la contraseña. */}
          <button
            type="button"
            className="login-basico__ojo"
            aria-label={verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={verContrasena}
            onClick={() => setVerContrasena(!verContrasena)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {verContrasena && <path d="M3 3l18 18" />}
            </svg>
          </button>
        </div>
      </div>

      <button type="submit" className="login-basico__submit">
        Entrar
      </button>
    </form>
  );
}

export default LoginBasico;
