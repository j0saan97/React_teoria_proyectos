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
        <input
          id="contrasena"
          name="contrasena"
          type="password"
          value={formData.contrasena}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
      </div>

      <button type="submit" className="login-basico__submit">
        Entrar
      </button>
    </form>
  );
}

export default LoginBasico;
