import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import "./ContactFormBasic.css";
import { SelectorPais } from "../SelectorPais/SelectorPais";
import { buscarPais } from "../SelectorPais/paises";

export interface ContactFormData {
  nombre: string;
  apellidos: string;
  /** Prefijo internacional, p. ej. "+34". */
  prefijo: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  /** Código ISO del país, p. ej. "es". */
  country: string;
  email: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}

const INITIAL_DATA: ContactFormData = {
  nombre: "",
  apellidos: "",
  prefijo: "+34",
  telefono: "",
  direccion: "",
  ciudad: "",
  country: "es",
  email: "",
};

export function ContactFormBasic({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA);
  // País de la bandera del prefijo (varios países comparten prefijo: +1, +7...).
  const [paisPrefijo, setPaisPrefijo] = useState(INITIAL_DATA.country);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Al elegir país, el prefijo del teléfono se pone el de ese país (se puede cambiar después).
  const handlePrefijo = (codigo: string) => {
    setPaisPrefijo(codigo);
    setFormData((prev) => ({ ...prev, prefijo: buscarPais(codigo)?.prefijo ?? prev.prefijo }));
  };

  const handleCountry = (codigo: string) => {
    setFormData((prev) => ({ ...prev, country: codigo }));
    handlePrefijo(codigo);
  };

  const handleSubmit =(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData(INITIAL_DATA);
    setPaisPrefijo(INITIAL_DATA.country);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__field">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Ej.: María"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="apellidos">Apellidos</label>
        <input
          id="apellidos"
          name="apellidos"
          type="text"
          placeholder="Ej.: García López"
          value={formData.apellidos}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="telefono">Teléfono</label>
        <div className="contact-form__telefono">
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
            inputMode="tel"
            placeholder="Ej.: 600 123 456"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="direccion">Dirección</label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          placeholder="Ej.: Calle Mayor 12, 3º B"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="ciudad">Ciudad</label>
        <input
          id="ciudad"
          name="ciudad"
          type="text"
          placeholder="Ej.: Madrid"
          value={formData.ciudad}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="country">País</label>
        <SelectorPais id="country" modo="pais" value={formData.country} onChange={handleCountry} />
      </div>

      <div className="contact-form__field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Ej.: maria@correo.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="contact-form__submit">
        Enviar
      </button>
    </form>
  );
}

export default ContactFormBasic;
