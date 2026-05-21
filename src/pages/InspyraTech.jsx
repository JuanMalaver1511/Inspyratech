import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import "./pages.css";
import juanImg from "../assets/juan.jpeg";
import sebasImg from "../assets/sebastian.jpeg";
import logo from "../assets/logo.png";

const EN = {
  nav: ["Home", "Services", "Projects", "About", "Contact"],
  hero: {
    badge: "Available for new projects",
    title: ["Software that", "inspires", "real results."],
    subtitle: "We build custom digital products — from idea to deployment — with minimalist design and modern technology.",
    cta1: "Start a project",
    cta2: "View services",
    stats: [
      { number: "10+", label: "Projects delivered" },
      { number: "98%", label: "Satisfied clients" },
      { number: "5+", label: "Years in market" },
    ],
  },
  services: {
    label: "Services",
    title: "What we do.",
    subtitle: "Complete digital solutions to grow your business with cutting-edge technology.",
    cta: "View all →",
    items: [
      { icon: "</>", tag: "Web", title: "Web Development", desc: "Fast, secure, and scalable websites and platforms built with modern technologies." },
      { icon: "◉", tag: "Mobile", title: "Mobile Apps", desc: "Native iOS and Android with a fluid experience. User-centered design from day one." },
      { icon: "◈", tag: "Enterprise", title: "Custom Systems", desc: "ERPs, dashboards, and internal tools that fit your workflow perfectly." },
      { icon: "⬡", tag: "Design", title: "UX/UI Design", desc: "Interfaces that delight. User research, prototyping, and cohesive design systems." },
      { icon: "⟳", tag: "Strategy", title: "Tech Consulting", desc: "Digital strategy, software architecture, and tech transformation guidance." },
      { icon: "◈", tag: "Cloud", title: "Cloud & DevOps", desc: "Scalable infrastructure, CI/CD pipelines, and 24/7 monitoring for maximum uptime." },
    ],
  },
  projects: {
    label: "Projects",
    title: "Recent work.",
    subtitle: "Some of the products we've built for our clients.",
    link: "View case →",
    items: [
      { name: "KyboApp", type: "Mobile · Finance", year: "2026", color: "#008CFA", desc: "Personal finance app to manage income, expenses, goals, and debts.", url: "https://kyboapp.com/" },
      { name: "7Nnoticias", type: "News Platform", year: "2026", color: "#108975", desc: "Digital news platform with real-time integrations and modern design.", url: "https://www.7nnoticias.com/new" },
      { name: "REM", type: "Health", year: "2026", color: "#0a7fc2", desc: "Comprehensive management system for biomedical companies.", url: "https://www.remequipos.com.co/" },
    ],
  },
  about: {
    label: "About",
    title: "A team that turns ideas into code.",
    p1: "We are a boutique software studio passionate about building digital products with soul. We are not a code factory — we are strategic partners.",
    p2: "Every project is an opportunity to push the boundaries of design and technology. We work closely with our clients to understand the business, the user, and the goal.",
    stats: [
      { number: "2", label: "Countries" },
      { number: "10+", label: "Projects" },
      { number: "8", label: "Experts" },
    ],
    teamTitle: "The team.",
  },
  contact: {
    label: "Contact",
    title: "Let's talk about your project.",
    name: "Name",
    company: "Company",
    email: "Email",
    select: "Select a service",
    web: "Web Development",
    mobile: "Mobile App",
    custom: "Custom System",
    consulting: "Consulting",
    other: "Other",
    message: "Tell us about your project...",
    send: "Send message →",
  },
  footer: {
    tagline: "Software that inspires real results.",
    copyright: "© 2025 InspyraTech. All rights reserved.",
  },
  terminal: {
    lines: [
      { text: "$ inspyra init --project=your-idea", delay: 0, type: "default" },
      { text: "> Analyzing requirements...", delay: 800, type: "muted" },
      { text: "> Designing optimal architecture...", delay: 1800, type: "muted" },
      { text: "> Assigning specialized team...", delay: 2800, type: "muted" },
      { text: "✓ Project initialized successfully", delay: 3800, type: "success" },
      { text: "✓ Stack: React + Node + PostgreSQL", delay: 4400, type: "success" },
      { text: "✓ First sprint: next Monday", delay: 5000, type: "success" },
      { text: "", delay: 5600, type: "default" },
      { text: "$ Ready to build something amazing?", delay: 6000, type: "default" },
    ],
  },
};

const ES = {
  nav: ["Inicio", "Servicios", "Proyectos", "Nosotros", "Contacto"],
  hero: {
    badge: "Disponibles para nuevos proyectos",
    title: ["Software que", "inspira", "resultados reales."],
    subtitle: "Construimos productos digitales a medida — desde la idea hasta el deploy — con diseño minimalista y tecnología moderna.",
    cta1: "Iniciar proyecto",
    cta2: "Ver servicios",
    stats: [
      { number: "10+", label: "Proyectos entregados" },
      { number: "98%", label: "Clientes satisfechos" },
      { number: "5+", label: "Años en el mercado" },
    ],
  },
  services: {
    label: "Servicios",
    title: "Lo que hacemos.",
    subtitle: "Soluciones digitales completas para hacer crecer tu negocio con tecnología de punta.",
    cta: "Ver todo →",
    items: [
      { icon: "</>", tag: "Web", title: "Desarrollo Web", desc: "Sitios y plataformas rápidas, seguras y escalables construidas con tecnologías modernas." },
      { icon: "◉", tag: "Mobile", title: "Apps Móviles", desc: "iOS y Android nativos con experiencia fluida. Diseño centrado en el usuario." },
      { icon: "◈", tag: "Enterprise", title: "Sistemas a Medida", desc: "ERPs, dashboards y herramientas internas que se adaptan a tu flujo de trabajo." },
      { icon: "⬡", tag: "Design", title: "Diseño UX/UI", desc: "Interfaces que enamoran. Investigación de usuarios, prototipado y sistemas de diseño." },
      { icon: "⟳", tag: "Strategy", title: "Consultoría Tech", desc: "Estrategia digital, arquitectura de software y transformación tecnológica." },
      { icon: "◈", tag: "Cloud", title: "Cloud & DevOps", desc: "Infraestructura escalable, pipelines CI/CD y monitoreo 24/7 para máximo uptime." },
    ],
  },
  projects: {
    label: "Proyectos",
    title: "Trabajo reciente.",
    subtitle: "Algunos de los productos que hemos construido para nuestros clientes.",
    link: "Ver caso →",
    items: [
      { name: "KyboApp", type: "Móvil · Finanzas", year: "2026", color: "#008CFA", desc: "App para gestionar tus finanzas personales: controla ingresos, gastos, metas y deudas.", url: "https://kyboapp.com/" },
      { name: "7Nnoticias", type: "Plataforma de Noticias", year: "2026", color: "#108975", desc: "Plataforma digital de noticias con integraciones en tiempo real y diseño moderno.", url: "https://www.7nnoticias.com/new" },
      { name: "REM", type: "Salud", year: "2026", color: "#0a7fc2", desc: "Sistema integral de gestión para empresas biomédicas.", url: "https://www.remequipos.com.co/" },
    ],
  },
  about: {
    label: "Nosotros",
    title: "Un equipo que convierte ideas en código.",
    p1: "Somos un estudio de software boutique apasionado por construir productos digitales con alma. No somos una fábrica de código — somos socios estratégicos.",
    p2: "Cada proyecto es una oportunidad para empujar los límites del diseño y la tecnología. Trabajamos de cerca con nuestros clientes para entender el negocio, el usuario y el objetivo.",
    stats: [
      { number: "2", label: "Países" },
      { number: "10+", label: "Proyectos" },
      { number: "8", label: "Expertos" },
    ],
    teamTitle: "El equipo.",
  },
  contact: {
    label: "Contacto",
    title: "Hablemos de tu proyecto.",
    name: "Nombre",
    company: "Empresa",
    email: "Email",
    select: "Selecciona un servicio",
    web: "Desarrollo Web",
    mobile: "App Móvil",
    custom: "Sistema a Medida",
    consulting: "Consultoría",
    other: "Otro",
    message: "Cuéntanos sobre tu proyecto...",
    send: "Enviar mensaje →",
  },
  footer: {
    tagline: "Software que inspira resultados reales.",
    copyright: "© 2025 InspyraTech. Todos los derechos reservados.",
  },
  terminal: {
    lines: [
      { text: "$ inspyra init --project=tu-idea", delay: 0, type: "default" },
      { text: "> Analizando requerimientos...", delay: 800, type: "muted" },
      { text: "> Diseñando arquitectura óptima...", delay: 1800, type: "muted" },
      { text: "> Asignando equipo especializado...", delay: 2800, type: "muted" },
      { text: "✓ Proyecto inicializado con éxito", delay: 3800, type: "success" },
      { text: "✓ Stack: React + Node + PostgreSQL", delay: 4400, type: "success" },
      { text: "✓ Primer sprint: próximo lunes", delay: 5000, type: "success" },
      { text: "", delay: 5600, type: "default" },
      { text: "$ Listo para construir algo increíble?", delay: 6000, type: "default" },
    ],
  },
};

const SECTION_IDS = ["home", "services", "projects", "about", "contact"];

const TEAM = [
  { name: "Juan Malaver", role: "Founder", image: juanImg },
  { name: "Sebastian Guevara", role: "Founder", image: sebasImg },
];

const LangContext = createContext();
function useLang() { return useContext(LangContext); }

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useInView(ref, threshold = 0.3) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
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

function Cursor({ theme }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onLeave = () => {
      mouse.current = { x: -100, y: -100 };
      ringPos.current = { x: -100, y: -100 };
    };
    document.addEventListener("mouseleave", onLeave);

    const hoverable = { cursor: "pointer" };
    const grow = () => ringRef.current?.classList.add("cursor__ring--grow");
    const shrink = () => ringRef.current?.classList.remove("cursor__ring--grow");
    document.querySelectorAll("a, button, input, select, textarea, .hub__tab, .hub__panel, .project-card, .team-card").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.querySelectorAll("a, button, input, select, textarea, .hub__tab, .hub__panel, .project-card, .team-card").forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor__dot cursor__dot--${theme}`} />
      <div ref={ringRef} className={`cursor__ring cursor__ring--${theme}`} />
    </>
  );
}

function Stars() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.2,
      base: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.015 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId;
    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        const a = s.base * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="stars" />;
}

function LangToggle({ lang, onToggle }) {
  return (
    <button className="lang-toggle" onClick={onToggle} aria-label="Toggle language">
      <span className={`lang-toggle__opt ${lang === "en" ? "active" : ""}`}>EN</span>
      <span className="lang-toggle__sep">/</span>
      <span className={`lang-toggle__opt ${lang === "es" ? "active" : ""}`}>ES</span>
    </button>
  );
}

function Navbar({ activeSection, onNav, theme, onThemeToggle, lang, onLangToggle }) {
  const scrolled = useScrolled();
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id) => {
    onNav(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "navbar--menu-open" : ""}`}>
      <button className="navbar__logo" onClick={() => handleNav("home")}>
        <div className="navbar__logo-icon">
          <img src={logo} alt="Inspyratech" />
        </div>
      </button>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {t("nav").map((link, i) => (
          <li key={i}>
            <button
              className={`navbar__link ${activeSection === i ? "active" : ""}`}
              onClick={() => handleNav(SECTION_IDS[i])}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      <div className="navbar__right">
        <LangToggle lang={lang} onToggle={onLangToggle} />
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <button className="navbar__cta navbar__cta--desktop" onClick={() => handleNav("contact")}>
          {t("hero").cta1}
        </button>
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

// Separate to avoid hooks-in-hooks issue
function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}

function Hero({ onNav }) {
  const { t } = useLang();
  const h = t("hero");

  return (
    <section id="home" className="hero">
      <div className="hero__grid" />
      <div className="hero__badge fade-up fade-up-1">
        <span className="hero__badge-dot" />
        {h.badge}
      </div>

      <h1 className="hero__title fade-up fade-up-2">
        {h.title[0]} <span className="hero__title-accent">{h.title[1]}</span>
        <br />
        {h.title[2]}
      </h1>

      <p className="hero__subtitle fade-up fade-up-3">{h.subtitle}</p>

      <div className="hero__buttons fade-up fade-up-4">
        <button className="btn btn--primary" onClick={() => onNav("contact")}>
          {h.cta1}
        </button>
        <button className="btn btn--outline" onClick={() => onNav("services")}>
          {h.cta2}
        </button>
      </div>

      <div className="hero__stats fade-up fade-up-4">
        {h.stats.map((s, i) => (
          <div key={i}>
            <div className="hero__stat-number">{s.number}</div>
            <div className="hero__stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-text">SCROLL</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}

function ServiceAnim({ type }) {
  switch (type) {
    case "terminal":
      return (
        <div className="sa sa--laptop">
          <div className="sa__laptop">
            <div className="sa__laptop-screen">
              <div className="sa__laptop-bar" />
              <div className="sa__laptop-bar" />
              <div className="sa__laptop-bar" />
              <div className="sa__laptop-bar" />
            </div>
          </div>
          <div className="sa__laptop-base" />
        </div>
      );
    case "phone":
      return (
        <div className="sa sa--phone">
          <div className="sa__phone">
            <div className="sa__phone-notch" />
            <div className="sa__phone-screen">
              {[1, 2, 3].map(i => <span key={i} className="sa__phone-bar" />)}
            </div>
          </div>
        </div>
      );
    case "server":
      return (
        <div className="sa sa--server">
          {[1, 2, 3].map(i => (
            <div key={i} className="sa__tray">
              <span className="sa__led" /><span className="sa__tray-bar" />
            </div>
          ))}
        </div>
      );
    case "design":
      return (
        <div className="sa sa--design">
          <div className="sa__frame">
            <div className="sa__frame-side" />
            <div className="sa__frame-main">
              <div className="sa__frame-block" />
              <div className="sa__frame-block" />
            </div>
          </div>
        </div>
      );
    case "graph":
      return (
        <div className="sa sa--graph">
          <div className="sa__graph-bg">
            {Array.from({length: 15}).map((_, i) => <span key={i} />)}
          </div>
          <svg viewBox="0 0 180 100" className="sa__svg">
            <defs>
              <linearGradient id="graphGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon className="sa__svg-area" points="0,100 0,70 22,52 38,58 58,35 75,40 95,20 120,28 140,10 180,10 180,100" />
            <polyline className="sa__svg-line"
              points="0,70 22,52 38,58 58,35 75,40 95,20 120,28 140,10 180,10"
            />
          </svg>
        </div>
      );
    case "cloud":
      return (
        <div className="sa sa--cloud">
          <div className="sa__cloud-orbit" />
          <svg viewBox="0 0 100 60" className="sa__svg-cloud">
            <path className="sa__svg-cloud-body"
              d="M20 45Q5 45 5 32Q5 18 22 18Q25 8 45 8Q62 8 65 20Q75 20 80 28Q80 45 65 45Z"
            />
            <circle className="sa__svg-dot" cx="40" cy="30" r="3" />
            <circle className="sa__svg-dot" cx="55" cy="32" r="2.5" />
            <circle className="sa__svg-dot" cx="65" cy="28" r="2" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

function Services({ onNav }) {
  const { t } = useLang();
  const s = t("services");
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [active]);

  return (
    <section id="services" className="section section--alt">
      <div className="section__header" style={{ marginBottom: 0 }}>
        <div>
          <p className="section__label">{s.label}</p>
          <h2 className="section__title">{s.title}</h2>
        </div>
      </div>

      <div className="hub">
        <div className="hub__tabs">
          {s.items.map((item, i) => (
            <button
              key={i}
              className={`hub__tab ${active === i ? "hub__tab--on" : ""}`}
              onClick={() => setActive(i)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="hub__panel" key={active} ref={panelRef}>
          <div className="hub__panel-shine" />
          <div className="hub__panel-inner">
            <div className="hub__panel-vis">
              <ServiceAnim type={["terminal", "phone", "server", "design", "graph", "cloud"][active]} />
            </div>
            <div className="hub__panel-info">
              <div className="hub__panel-head">
                <span className="hub__panel-icon">{s.items[active].icon}</span>
                <span className="hub__panel-tag">{s.items[active].tag}</span>
              </div>
              <h3 className="hub__panel-title">{s.items[active].title}</h3>
              <p className="hub__panel-desc">{s.items[active].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { t } = useLang();
  const p = t("projects");

  return (
    <section id="projects" className="section section--alt">
      <p className="section__label">{p.label}</p>
      <h2 className="section__title">{p.title}</h2>
      <p className="section__subtitle">{p.subtitle}</p>

      <div className="projects__grid">
        {p.items.map((item, i) => (
          <div key={i} className="project-card">
            <div className="project-card__bar" style={{ background: item.color }} />
            <p className="project-card__type" style={{ color: item.color }}>
              {item.type} · {item.year}
            </p>
            <h3 className="project-card__title">{item.name}</h3>
            <p className="project-card__desc">{item.desc}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              style={{ color: item.color }}
            >
              {p.link}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Terminal({ lines }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const visibleLines = useTypewriter(lines, inView);

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
          {lines.map((line, i) =>
            visibleLines.includes(i) ? (
              <span key={i} className={`terminal__line terminal__line--${line.type}`}>
                {line.text}
                {i === visibleLines[visibleLines.length - 1] && line.type !== "muted" && (
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
  const { t } = useLang();
  const a = t("about");

  return (
    <section id="about" className="section">
      <div className="about__layout">
        <div className="about__text">
          <p className="section__label">{a.label}</p>
          <h2 className="section__title">{a.title}</h2>
          <p>{a.p1}</p>
          <p>{a.p2}</p>

          <div className="about__stats">
            {a.stats.map((s, i) => (
              <div key={i}>
                <div className="about__stat-number">{s.number}</div>
                <div className="about__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <Terminal lines={t("terminal").lines} />
      </div>

      <h3 className="team__title">{a.teamTitle}</h3>
      <div className="team__grid">
        {TEAM.map((member) => (
          <div key={member.name} className="team-card" data-cursor>
            <div className="team-card__avatar">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="team-card__content">
              <p className="team-card__name">{member.name}</p>
              <p className="team-card__role">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLang();
  const c = t("contact");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const nombre = form.nombre.value;
    const empresa = form.empresa.value;
    const email = form.email.value;
    const servicio = form.servicio.value;
    const mensaje = form.mensaje.value;
    const texto = `Hi, I'm ${nombre}%0ACompany: ${empresa}%0AEmail: ${email}%0AService: ${servicio}%0AMessage: ${mensaje}`;
    window.open(`https://wa.me/573054681323?text=${texto}`, "_blank");
  };

  return (
    <section id="contact" className="section section--alt contact">
      <p className="section__label">{c.label}</p>
      <h2 className="section__title">{c.title}</h2>

      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__row">
          <input name="nombre" className="contact__input" placeholder={c.name} required />
          <input name="empresa" className="contact__input" placeholder={c.company} required />
        </div>
        <input name="email" className="contact__input" type="email" placeholder={c.email} required />
        <select name="servicio" className="contact__select" required>
          <option value="">{c.select}</option>
          <option>{c.web}</option>
          <option>{c.mobile}</option>
          <option>{c.custom}</option>
          <option>{c.consulting}</option>
          <option>{c.other}</option>
        </select>
        <textarea name="mensaje" className="contact__textarea" placeholder={c.message} required />
        <button type="submit" className="btn btn--primary">{c.send}</button>
      </form>
    </section>
  );
}

function Footer({ onNav }) {
  const { t } = useLang();
  const f = t("footer");

  return (
    <footer className="footer">
      <div className="footer__logo">
        <div className="footer__logo-icon">
          <img src={logo} alt="Inspyratech" />
        </div>
      </div>
      <p className="footer__tagline">{f.tagline}</p>
      <nav className="footer__nav">
        {useLang().t("nav").map((link, i) => (
          <button key={i} className="footer__nav-link" onClick={() => onNav(SECTION_IDS[i])}>
            {link}
          </button>
        ))}
      </nav>
      <hr className="footer__divider" />
      <p className="footer__copy">{f.copyright}</p>
    </footer>
  );
}

function WhatsappFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const show = () => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    };
    show();
    const interval = setInterval(show, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="whatsapp-float-wrap">
      <div className={`whatsapp-float__tooltip ${showTooltip ? "whatsapp-float__tooltip--show" : ""}`}>
        Habla con Inspy
      </div>
      <a
        href="https://wa.me/573054681323"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="whatsapp-float__icon">
          <rect x="4" y="6" width="16" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
          <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
          <rect x="10" y="14" width="4" height="2" rx="1" fill="currentColor" opacity="0.5"/>
          <path d="M9 19v2M15 19v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 9h16" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
          <rect x="7" y="4" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.2"/>
          <circle cx="12" cy="5" r="1" fill="currentColor" opacity="0.3"/>
        </svg>
      </a>
    </div>
  );
}

export default function InspyraTech() {
  const [activeSection, setActiveSection] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem("inspyra-theme") || "dark");
  const [lang, setLang] = useState(() => localStorage.getItem("inspyra-lang") || "en");

  const t = useCallback((key) => {
    return (lang === "en" ? EN : ES)[key];
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("inspyra-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("inspyra-lang", lang);
  }, [lang]);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((p) => (p === "en" ? "es" : "en"));

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const idx = SECTION_IDS.indexOf(id);
    if (idx >= 0) setActiveSection(idx);
  };

  return (
    <LangContext.Provider value={{ t, lang, toggleLang }}>
      <Cursor theme={theme} />
      <Stars />
      <Navbar
        activeSection={activeSection}
        onNav={scrollTo}
        theme={theme}
        onThemeToggle={toggleTheme}
        lang={lang}
        onLangToggle={toggleLang}
      />
      <main>
        <Hero onNav={scrollTo} />
        <Services onNav={scrollTo} />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer onNav={scrollTo} />
      <WhatsappFloat />
    </LangContext.Provider>
  );
}
