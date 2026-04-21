import { useState, useEffect, useRef } from "react";
import "./pages.css";
import juanImg from "../assets/juan.jpeg";
import sebasImg from "../assets/sebastian.jpeg"
import logo from "../assets/logo.png"
import logo_footer from "../assets/logo_footer.png"

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Inicio", "Servicios", "Proyectos", "Nosotros", "Contacto"];

const SERVICES = [
  {
    icon: "</>",
    tag: "Web",
    title: "Desarrollo Web",
    desc: "Sitios y plataformas rápidas, seguras y escalables construidas con las mejores tecnologías modernas.",
  },
  {
    icon: "◉",
    tag: "Mobile",
    title: "Apps Móviles",
    desc: "iOS y Android nativos con experiencia fluida. Diseño centrado en el usuario desde el primer día.",
  },
  {
    icon: "◈",
    tag: "Enterprise",
    title: "Sistemas a Medida",
    desc: "ERPs, dashboards y herramientas internas que se adaptan exactamente a tu flujo de trabajo.",
  },
  {
    icon: "⬡",
    tag: "Design",
    title: "Diseño UX/UI",
    desc: "Interfaces que enamoran. Investigación de usuarios, prototipado y sistemas de diseño cohesivos.",
  },
  {
    icon: "⟳",
    tag: "Strategy",
    title: "Consultoría Tech",
    desc: "Estrategia digital, arquitectura de software y acompañamiento en transformación tecnológica.",
  },
  {
    icon: "◈",
    tag: "Cloud",
    title: "Cloud & DevOps",
    desc: "Infraestructura escalable, pipelines CI/CD y monitoreo 24/7 para que nunca pierdas uptime.",
  },
];

const PROJECTS = [
  {
    name: "KyboApp",
    type: "Mobile - finance",
    year: "2026",
    color: "#008CFA",
    desc: "App para gestionar tus finanzas personales: controla ingresos, gastos, metas y deudas.",
    url: "https://kyboapp.com/",
  },
  {
    name: "7Nnoticias",
    type: "news platform",
    year: "2026",
    color: "#108975",
    desc: "Plataforma digital de noticias de Tunja, Boyacá, con diseño moderno, experiencia intuitiva e integraciones en tiempo real.",
    url: "https://www.7nnoticias.com/",
  },
  {
    name: "REM",
    type: "Salud",
    year: "2026",
    color: "#0a7fc2",
    desc: "Sistema integral de gestión para empresas biomédicas, diseñado para administrar usuarios, cronogramas y documentación de forma eficiente.",
    url: "https://www.remequipos.com.co/",
  },
];

const TEAM = [
  { name: "Juan Malaver", role: "Founder", initials: "JM", image: juanImg },
  { name: "Sebastian Guevara", role: "Founder", initials: "JG", image: sebasImg },
];

const HERO_STATS = [
  { number: "10+", label: "Proyectos entregados" },
  { number: "98%", label: "Clientes satisfechos" },
  { number: "5 años", label: "En el mercado" },
];

const ABOUT_STATS = [
  { number: "2", label: "Países" },
  { number: "10+", label: "Proyectos" },
  { number: "8", label: "Expertos" },
];

const TERMINAL_LINES = [
  { text: "$ inspyra init --project=tu-idea", delay: 0, type: "default" },
  { text: "> Analizando requerimientos...", delay: 800, type: "muted" },
  { text: "> Diseñando arquitectura óptima...", delay: 1800, type: "muted" },
  { text: "> Asignando equipo especializado...", delay: 2800, type: "muted" },
  { text: "✓ Proyecto inicializado con éxito", delay: 3800, type: "success" },
  { text: "✓ Stack: React + Node + PostgreSQL", delay: 4400, type: "success" },
  { text: "✓ Primer sprint: lunes próximo", delay: 5000, type: "success" },
  { text: "", delay: 5600, type: "default" },
  { text: "$ Ready to build something amazing?", delay: 6000, type: "default" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useInView(ref, threshold = 0.3) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return inView;
}

function useTypewriter(lines, active) {
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    if (!active) return;
    setVisible([]);
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisible((prev) => [...prev, i]), line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);
  return visible;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Navbar({ activeSection, onNav }) {
  const scrolled = useScrolled();

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <button className="navbar__logo" onClick={() => onNav("inicio")}>
        <div className="navbar__logo-icon">
            <img src= {logo} alt="Inspyratech" />
        </div>
        
      </button>

      <ul className="navbar__links">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <button
              className={`navbar__link ${activeSection === link ? "active" : ""}`}
              onClick={() => onNav(link.toLowerCase())}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      <button className="navbar__cta" onClick={() => onNav("contacto")}>
        Cotizar
      </button>
    </nav>
  );
}

function Hero({ onNav }) {
  return (
    <section id="inicio" className="hero">
      <div className="hero__badge fade-up fade-up-1">
        <span className="hero__badge-dot" />
        Disponibles para nuevos proyectos
      </div>

      <h1 className="hero__title fade-up fade-up-2">
        Software que <span className="gradient-text">inspira</span>
        <br />
        resultados reales.
      </h1>

      <p className="hero__subtitle fade-up fade-up-3">
        Construimos productos digitales a medida — desde la idea hasta el deploy
        — con diseño minimalista y tecnología moderna.
      </p>

      <div className="hero__buttons fade-up fade-up-4">
        <button className="btn btn--primary" onClick={() => onNav("contacto")}>
          Iniciar proyecto
        </button>
        <button className="btn btn--outline" onClick={() => onNav("servicios")}>
          Ver servicios
        </button>
      </div>

      <div className="hero__stats fade-up fade-up-4">
        {HERO_STATS.map(({ number, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div className="hero__stat-number gradient-text">{number}</div>
            <div className="hero__stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services({ onNav }) {
  return (
    <section id="servicios" className="section">
      <div className="section__header">
        <div>
          <p className="section__label">SERVICIOS</p>
          <h2 className="section__title">Lo que hacemos.</h2>
          <p className="section__subtitle">
            Soluciones digitales completas para hacer crecer tu negocio con
            tecnología de punta.
          </p>
        </div>
        <button
          className="btn btn--outline-sm"
          onClick={() => onNav("contacto")}
        >
          Ver todo →
        </button>
      </div>

      <div className="services__grid">
        {SERVICES.map(({ icon, tag, title, desc }) => (
          <div key={title} className="service-card">
            <div className="service-card__icon">{icon}</div>
            <p className="service-card__tag">{tag}</p>
            <h3 className="service-card__title">{title}</h3>
            <p className="service-card__desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="proyectos" className="section section--alt">
      <p className="section__label">PROYECTOS</p>
      <h2 className="section__title">Trabajo reciente.</h2>
      <p className="section__subtitle">
        Algunos de los productos que hemos construido para nuestros clientes.
      </p>

      <div className="projects__grid">
        {PROJECTS.map(({ name, type, year, color, desc, url }) => (
          <div
            key={name}
            className="project-card"
            style={{ border: `1px solid ${color}33` }}
          >
            <div
              className="project-card__accent"
              style={{ background: `${color}22` }}
            />
            <p className="project-card__type" style={{ color }}>
              {type} · {year}
            </p>
            <h3 className="project-card__title">{name}</h3>
            <p className="project-card__desc">{desc}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              style={{ color }}
            >
              Ver caso →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Terminal() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const visibleLines = useTypewriter(TERMINAL_LINES, inView);

  return (
    <div className="terminal-wrap" ref={ref}>
      <div className="terminal">
        <div className="terminal__header">
          <span className="terminal__dot" style={{ background: "#ff5f57" }} />
          <span className="terminal__dot" style={{ background: "#febe2e" }} />
          <span className="terminal__dot" style={{ background: "#28ca41" }} />
          <span className="terminal__title">inspyra — bash</span>
        </div>

        <div className="terminal__body">
          {TERMINAL_LINES.map((line, i) =>
            visibleLines.includes(i) ? (
              <span
                key={i}
                className={`terminal__line terminal__line--${line.type}`}
              >
                {line.text}
                {i === visibleLines[visibleLines.length - 1] &&
                  line.type !== "muted" && (
                    <span className="terminal__cursor">▌</span>
                  )}
              </span>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="nosotros" className="section">
      <div className="about__layout">
        <div className="about__text">
          <p className="section__label">NOSOTROS</p>
          <h2 className="section__title">
            Un equipo que convierte ideas en código.
          </h2>
          <p>
            Somos un estudio de software boutique apasionado por construir
            productos digitales con alma. No somos una fábrica de código — somos
            socios estratégicos.
          </p>
          <p>
            Cada proyecto es una oportunidad para empujar los límites del diseño
            y la tecnología. Trabajamos de cerca con nuestros clientes para
            entender el negocio, el usuario y el objetivo.
          </p>

          <div className="about__stats">
            {ABOUT_STATS.map(({ number, label }) => (
              <div key={label}>
                <div className="about__stat-number gradient-text">{number}</div>
                <div className="about__stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <Terminal />
      </div>

      <h3 className="team__title">El equipo.</h3>
<div className="team__grid">
  {TEAM.map(({ name, role, initials, image }) => (
    <div key={name} className="team-card">
      <div className="team-card__avatar">
        <img src={image} alt={name} />
      </div>

      <div className="team-card__content">
        <p className="team-card__name">{name}</p>
        <p className="team-card__role">{role}</p>
      </div>
    </div>
  ))}
</div>
    </section>
  );
}

function Contact() {

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recargar

    const form = e.target;

    // valida automáticamente los campos required
    if (!form.checkValidity()) {
      form.reportValidity(); // muestra errores nativos
      return;
    }

    const nombre = form.nombre.value;
    const empresa = form.empresa.value;
    const email = form.email.value;
    const servicio = form.servicio.value;
    const mensaje = form.mensaje.value;

    const texto = `Hola, soy ${nombre}%0AEmpresa: ${empresa}%0AEmail: ${email}%0AServicio: ${servicio}%0AMensaje: ${mensaje}`;
    const telefono = "573202594521";

    window.open(`https://wa.me/${telefono}?text=${texto}`, "_blank");
  };

  return (
    <section id="contacto" className="section section--alt contact">
      <p className="section__label">CONTACTO</p>
      <h2 className="section__title">Hablemos de tu proyecto.</h2>

      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__row">
          <input name="nombre" className="contact__input" placeholder="Nombre" required />
          <input name="empresa" className="contact__input" placeholder="Empresa" required />
        </div>

        <input
          name="email"
          className="contact__input"
          type="email"
          placeholder="Email"
          required
        />

        <select name="servicio" className="contact__select" required>
          <option value="">Selecciona un servicio</option>
          <option>Desarrollo Web</option>
          <option>App Móvil</option>
          <option>Sistema a Medida</option>
          <option>Consultoría</option>
          <option>Otro</option>
        </select>

        <textarea
          name="mensaje"
          className="contact__textarea"
          placeholder="Cuéntanos sobre tu proyecto..."
          required
        />

        <button type="submit" className="btn btn--gradient">
          Enviar mensaje →
        </button>
      </form>
    </section>
  );
}

function Footer({ onNav }) {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <div className="footer__logo-icon">
            <img src={logo_footer} alt="" />
        </div>
      </div>
      <p className="footer__tagline">Software que inspira resultados reales.</p>

      <nav className="footer__nav">
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            className="footer__nav-link"
            onClick={() => onNav(link.toLowerCase())}
          >
            {link}
          </button>
        ))}
      </nav>

      <hr className="footer__divider" />
      <p className="footer__copy">
        © 2025 InspyraTech. Todos los derechos reservados.
      </p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InspyraTech() {
  const [activeSection, setActiveSection] = useState("Inicio");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const match = NAV_LINKS.find((l) => l.toLowerCase() === id);
    if (match) setActiveSection(match);
  };

  return (
    <>
      <Navbar activeSection={activeSection} onNav={scrollTo} />
      <main>
        <Hero onNav={scrollTo} />
        <Services onNav={scrollTo} />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer onNav={scrollTo} />
    </>
  );
}
