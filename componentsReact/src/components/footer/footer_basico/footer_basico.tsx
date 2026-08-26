import "./footer_basico.css";

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconWhatsapp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export interface FooterBasicoProps {
  empresa?: string;
  email?: string;
  telefono?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  direccion?: string;
}

export function FooterBasico({
  empresa = "Mi Empresa",
  email = "contacto@miempresa.com",
  telefono = "+34 600 123 456",
  whatsapp = "34600123456",
  instagram = "https://instagram.com",
  facebook = "https://facebook.com",
  twitter = "https://twitter.com",
  linkedin = "https://linkedin.com",
  direccion = "Puerta del Sol, Madrid, España",
}: FooterBasicoProps) {
  const year = new Date().getFullYear();
  const telHref = telefono.replace(/[^\d+]/g, "");
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`;
  const mapOpenHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;

  return (
    <footer className="footer-basico">
      <div className="footer-basico__inner">
        <div className="footer-basico__brand">
          <p className="footer-basico__empresa">{empresa}</p>
          <p className="footer-basico__copy">
            © {year} {empresa}. Todos los derechos reservados.
          </p>
        </div>

        <div className="footer-basico__contact">
          <p className="footer-basico__col-title">Contacto</p>
          <a className="footer-basico__contact-item" href={`mailto:${email}`}>
            <IconMail />
            <span>{email}</span>
          </a>

          <a className="footer-basico__contact-item" href={`tel:${telHref}`}>
            <IconPhone />
            <span>{telefono}</span>
          </a>

          <a
            className="footer-basico__whatsapp"
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsapp />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="footer-basico__map">
          <p className="footer-basico__col-title">Ubicación</p>
          <div className="footer-basico__map-frame">
            <iframe
              className="footer-basico__map-iframe"
              src={mapEmbedSrc}
              title={`Mapa de ${direccion}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              className="footer-basico__map-link"
              href={mapOpenHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${direccion} en Google Maps`}
            />
          </div>
        </div>

        <div className="footer-basico__social">
          <p className="footer-basico__col-title">Síguenos</p>
          <div className="footer-basico__social-icons">
            <a href={instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <IconInstagram />
            </a>
            <a href={facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <IconFacebook />
            </a>
            <a href={twitter} aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
              <IconTwitter />
            </a>
            <a href={linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <IconLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterBasico;
