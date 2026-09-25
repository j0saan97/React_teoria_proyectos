import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import "./advanced_form-registrer.css";
import { SelectorPais } from "../../selectores/SelectorPais/SelectorPais";
import { buscarPais } from "../../selectores/SelectorPais/paises";
import { validarPassword, validarVacios, type ErroresForm } from "../../FORMs/validarCamposForm";

const OBLIGATORIOS = [
  "nombre", "apellidos", "fechaNacimiento", "email", "telefono",
  "calle", "ciudad", "pais", "usuario", "contrasena", "confirmarContrasena",
];

/** Mensaje de error de un campo (enlazado al input con aria-describedby). */
const MensajeError = ({ campo, texto }: { campo: string; texto?: string }) =>
  texto ? <p id={`${campo}-error`} className="advanced-form-registrer__error">{texto}</p> : null;

/** Props de accesibilidad de un campo según tenga error o no. */
const ariaError = (campo: string, texto?: string) => ({
  "aria-invalid": !!texto,
  "aria-describedby": texto ? `${campo}-error` : undefined,
});

/** Input de contraseña con un botón de ojo para mostrar u ocultar lo escrito. */
function CampoContrasena(props: {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
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
          {...ariaError(props.id, props.error)}
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
      <MensajeError campo={props.id} texto={props.error} />
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
  const [errores, setErrores] = useState<ErroresForm>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined })); // el error se quita al corregir
  };

  const aria = (campo: string) => ariaError(campo, errores[campo]);
  const error = (campo: string) => <MensajeError campo={campo} texto={errores[campo]} />;

  const handlePrefijo = (codigo: string) => {
    setPaisPrefijo(codigo);
    setFormData((prev) => ({ ...prev, prefijo: buscarPais(codigo)?.prefijo ?? prev.prefijo }));
  };

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
    setPaisPrefijo("es");
  };

  return (
    <form className="advanced-form-registrer" onSubmit={handleSubmit} noValidate>
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
            {...aria("nombre")}
            required
          />
          {error("nombre")}
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
            {...aria("apellidos")}
            required
          />
          {error("apellidos")}
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
            {...aria("fechaNacimiento")}
            required
          />
          {error("fechaNacimiento")}
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
            {...aria("email")}
            required
          />
          {error("email")}
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
              {...aria("telefono")}
              required
            />
          </div>
          {error("telefono")}
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
            {...aria("calle")}
            required
          />
          {error("calle")}
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
            {...aria("ciudad")}
            required
          />
          {error("ciudad")}
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
            {...aria("pais")}
            required
          />
          {error("pais")}
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
            {...aria("usuario")}
            required
          />
          {error("usuario")}
        </div>

        <CampoContrasena
          id="contrasena"
          label="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
          error={errores.contrasena}
        />
        <CampoContrasena
          id="confirmarContrasena"
          label="Confirmar contraseña"
          value={formData.confirmarContrasena}
          onChange={handleChange}
          error={errores.confirmarContrasena}
        />
      </fieldset>

      <button type="submit" className="advanced-form-registrer__submit">
        Registrarse
      </button>
    </form>
  );
}

export default AdvancedFormRegistrer;
