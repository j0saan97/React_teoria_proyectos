import { useState, FormEvent, ChangeEvent } from "react";
import "./ContactForm.css";

export interface ContactFormData {
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  country: string;
  email: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}

const INITIAL_DATA: ContactFormData = {
  nombre: "",
  apellidos: "",
  telefono: "",
  direccion: "",
  country: "",
  email: "",
};

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA);

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
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__field">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
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
          value={formData.apellidos}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="direccion">Dirección</label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="country">País</label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
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

export default ContactForm;
