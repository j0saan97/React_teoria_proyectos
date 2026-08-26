import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import "./advanced_form-registrer.css";

const PREFIJOS = [
  { code: "+34", label: "+34 España" },
  { code: "+1", label: "+1 EEUU/Canadá" },
  { code: "+52", label: "+52 México" },
  { code: "+54", label: "+54 Argentina" },
  { code: "+57", label: "+57 Colombia" },
  { code: "+56", label: "+56 Chile" },
  { code: "+51", label: "+51 Perú" },
  { code: "+598", label: "+598 Uruguay" },
  { code: "+44", label: "+44 Reino Unido" },
  { code: "+33", label: "+33 Francia" },
  { code: "+49", label: "+49 Alemania" },
  { code: "+39", label: "+39 Italia" },
  { code: "+55", label: "+55 Brasil" },
];

export interface AdvancedFormRegistrerData {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  email: string;
  prefijo: string;
  telefono: string;
  ciudad: string;
  pais: string;
  usuario: string;
  contrasena: string;
  confirmarContrasena: string;
}

interface AdvancedFormRegistrerProps {
  onSubmit?: (data: AdvancedFormRegistrerData) => void;
}

const INITIAL_DATA: AdvancedFormRegistrerData = {
  nombre: "",
  apellidos: "",
  fechaNacimiento: "",
  email: "",
  prefijo: PREFIJOS[0].code,
  telefono: "",
  ciudad: "",
  pais: "",
  usuario: "",
  contrasena: "",
  confirmarContrasena: "",
};

export function AdvancedFormRegistrer({ onSubmit }: AdvancedFormRegistrerProps) {
  const [formData, setFormData] = useState<AdvancedFormRegistrerData>(INITIAL_DATA);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData(INITIAL_DATA);
  };

  return (
    <form className="advanced-form-registrer" onSubmit={handleSubmit}>
      <h2 className="advanced-form-registrer__title">Crear cuenta</h2>

      <fieldset className="advanced-form-registrer__group">
        <legend>Datos personales</legend>

        <div className="advanced-form-registrer__field">
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

        <div className="advanced-form-registrer__field">
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

        <div className="advanced-form-registrer__field">
          <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
          <input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            autoComplete="bday"
            required
          />
        </div>
      </fieldset>

      <fieldset className="advanced-form-registrer__group">
        <legend>Datos de contacto</legend>

        <div className="advanced-form-registrer__field">
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

        <div className="advanced-form-registrer__field">
          <label htmlFor="telefono">Teléfono</label>
          <div className="advanced-form-registrer__phone-row">
            <select
              id="prefijo"
              name="prefijo"
              value={formData.prefijo}
              onChange={handleChange}
              autoComplete="tel-country-code"
              aria-label="Prefijo telefónico"
            >
              {PREFIJOS.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="600 123 456"
              value={formData.telefono}
              onChange={handleChange}
              autoComplete="tel-national"
              required
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="advanced-form-registrer__group">
        <legend>Ubicación</legend>

        <div className="advanced-form-registrer__field">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            id="ciudad"
            name="ciudad"
            type="text"
            placeholder="Madrid"
            value={formData.ciudad}
            onChange={handleChange}
            autoComplete="address-level2"
            required
          />
        </div>

        <div className="advanced-form-registrer__field">
          <label htmlFor="pais">País</label>
          <input
            id="pais"
            name="pais"
            type="text"
            placeholder="España"
            value={formData.pais}
            onChange={handleChange}
            autoComplete="country-name"
            required
          />
        </div>
      </fieldset>

      <fieldset className="advanced-form-registrer__group">
        <legend>Datos de acceso</legend>

        <div className="advanced-form-registrer__field">
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

        <div className="advanced-form-registrer__field">
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

        <div className="advanced-form-registrer__field">
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

      <button type="submit" className="advanced-form-registrer__submit">
        Registrarse
      </button>
    </form>
  );
}

export default AdvancedFormRegistrer;
