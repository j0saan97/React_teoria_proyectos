import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import "./advanced_form-registrer.css";
import { SelectorPais } from "../../FORMs/SelectorPais/SelectorPais";
import { buscarPais } from "../../FORMs/SelectorPais/paises";

/** Input de contraseña con un botón de ojo para mostrar u ocultar lo escrito. */
function CampoContrasena(props: {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="advanced-form-registrer__field">
      <label htmlFor={props.id}>{props.label}</label>
      <div className="advanced-form-registrer__password">
        <input
          id={props.id}
          name={props.id}
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          value={props.value}
          onChange={props.onChange}
          autoComplete="new-password"
          required
        />
        <button
          type="button"
          className="advanced-form-registrer__ojo"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
            {visible && <path d="M3 3l18 18" />}
          </svg>
        </button>
      </div>
    </div>
  );
}

export interface AdvancedFormRegistrerData {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  email: string;
  prefijo: string;
  telefono: string;
  calle: string;
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
  prefijo: "+34",
  telefono: "",
  calle: "",
  ciudad: "",
  pais: "",
  usuario: "",
  contrasena: "",
  confirmarContrasena: "",
};

export function AdvancedFormRegistrer({ onSubmit }: AdvancedFormRegistrerProps) {
  const [formData, setFormData] = useState<AdvancedFormRegistrerData>(INITIAL_DATA);
  // País de la bandera del prefijo (varios países comparten prefijo: +1, +7...).
  const [paisPrefijo, setPaisPrefijo] = useState("es");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrefijo = (codigo: string) => {
    setPaisPrefijo(codigo);
    setFormData((prev) => ({ ...prev, prefijo: buscarPais(codigo)?.prefijo ?? prev.prefijo }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData(INITIAL_DATA);
    setPaisPrefijo("es");
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
            <SelectorPais
              id="prefijo"
              modo="prefijo"
              aria-label={`Prefijo telefónico: ${formData.prefijo}`}
              value={paisPrefijo}
              onChange={handlePrefijo}
            />
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
          <label htmlFor="calle">Calle</label>
          <input
            id="calle"
            name="calle"
            type="text"
            placeholder="Calle Mayor 12, 3º B"
            value={formData.calle}
            onChange={handleChange}
            autoComplete="street-address"
            required
          />
        </div>

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

        <CampoContrasena id="contrasena" label="Contraseña" value={formData.contrasena} onChange={handleChange} />
        <CampoContrasena
          id="confirmarContrasena"
          label="Confirmar contraseña"
          value={formData.confirmarContrasena}
          onChange={handleChange}
        />
      </fieldset>

      <button type="submit" className="advanced-form-registrer__submit">
        Registrarse
      </button>
    </form>
  );
}

export default AdvancedFormRegistrer;
