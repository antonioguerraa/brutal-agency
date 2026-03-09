"use client";

import { useState } from "react";
import Image from "next/image";

type Lang = "es" | "en";

const t = {
  es: {
    badge: "Agencia Digital",
    heroH1: (
      <>
        HACEMOS<br />QUE TE<br /><span className="highlight-red">ENCUENTREN</span>
      </>
    ),
    heroP: "Posicionamiento web (SEO & AEO), gestión estratégica de redes y campañas de publicidad digital para hacer crecer tu negocio.",
    viewWork: "Analiza tu empresa gratis",
    contact: "Contactar",
    navWork: "Trabajos",
    navServices: "Servicios",
    navAbout: "Nosotros",
    navContact: "Contacto",
    cta: "Háblanos",
    resultsLabel: "Resultados Reales",
    resultsH2: (<>CASOS DE <span className="highlight-blue">ÉXITO</span></>),
    resultsSubH: (<>— <span className="highlight-yellow">RESULTADOS</span> EN NÚMEROS —</>),
    stat1Title: "Tráfico orgánico",
    stat1Sub: "Clínica Médica · 6 meses",
    stat2Title: "Seguidores",
    stat2Sub: "Marca de Moda · 8 meses",
    stat3Sub: "E-commerce · Conversión",
    stat4Title: "Resultado en ChatGPT",
    stat4Sub: "Despacho de Abogados",
    servicesLabel: "Lo Que Hacemos",
    servicesH2: (<>NUESTROS <span className="highlight-yellow">SERVICIOS</span></>),
    servicesTagline: "Social media, done right. Tres pilares para que tu negocio crezca de forma sostenible en el mundo digital.",
    s1Title: "Posicionamiento SEO & AEO",
    s1Desc: "Ni Google ni los motores de IA buscan al azar. Se lo ponemos tan fácil y comprensible para encontrar info, que seleccionan el contenido antes que ningún otro de manera consistente.",
    s2Title: "Contenido & Redes Sociales",
    s2Desc: "El contenido que ha funcionado en 2025 no es el que funciona en 2026, las interacciones en Instagram no son ninguna casualidad tampoco. El foco no es enseñar lo que haces, sino transmitir tu autoridad a la persona que mira.",
    s3Title: "Escalado & Publicidad",
    s3Desc: "Meta te deja invertir en contarle una historia al usuario, midiendo quiénes interactúan y quiénes no. Según su comportamiento, se le enseña un contenido u otro.",
    aboutLabel: "Sobre Nosotros",
    aboutH2: (<>SOMOS <span className="highlight-red">BRUTAL</span></>),
    aboutP1: "Fundados en 2023, somos un equipo de estrategas digitales, creadores de contenido y desarrolladores especializados en posicionamiento web, redes sociales y publicidad digital.",
    aboutP2: "No seguimos tendencias—las anticipamos. Te ponemos delante de todos en Google, motores de IA y redes sociales.",
    projects: "Proyectos",
    awards: "Premios",
    years: "Años",
    team: "EL EQUIPO",
    role1: "Director Creativo",
    role2: "Diseñadora Principal",
    role3: "Desarrollador",
    role4: "Estratega",
    contactLabel: "Contacta con Nosotros",
    contactH2: (<>CREA Y ESCALA<br />DE MANERA <span className="highlight-red">BRUTAL</span></>),
    phone: "Teléfono:",
    location: "Ubicación:",
    formName: "Nombre",
    formMessage: "Mensaje",
    formSend: "Enviar Mensaje",
    namePlaceholder: "Tu nombre",
    msgPlaceholder: "Cuéntanos sobre tu proyecto",
    footerDesc: "Agencia digital especializada en SEO, AEO, redes sociales y publicidad digital. Te ponemos delante de todos.",
    links: "Enlaces",
    social: "Redes Sociales",
    copyright: "© 2025 BRUTAL. Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
  },
  en: {
    badge: "Digital Agency",
    heroH1: (
      <>
        WE MAKE<br />THEM<br /><span className="highlight-red">FIND YOU</span>
      </>
    ),
    heroP: "Web positioning (SEO & AEO), social media management, and digital ad campaigns to grow your business.",
    viewWork: "Analyze your business free",
    contact: "Get in Touch",
    navWork: "Work",
    navServices: "Services",
    navAbout: "About",
    navContact: "Contact",
    cta: "Let's Talk",
    resultsLabel: "Real Results",
    resultsH2: (<>SUCCESS <span className="highlight-blue">STORIES</span></>),
    resultsSubH: (<>— <span className="highlight-yellow">RESULTS</span> IN NUMBERS —</>),
    stat1Title: "Organic traffic",
    stat1Sub: "Medical Clinic · 6 months",
    stat2Title: "Followers",
    stat2Sub: "Fashion Brand · 8 months",
    stat3Sub: "E-commerce · Conversion",
    stat4Title: "ChatGPT Result",
    stat4Sub: "Law Firm",
    servicesLabel: "What We Do",
    servicesH2: (<>OUR <span className="highlight-yellow">SERVICES</span></>),
    servicesTagline: "Social media, done right. Three pillars for sustainable business growth in the digital world.",
    s1Title: "SEO & AEO Positioning",
    s1Desc: "Neither Google nor AI engines search randomly. We make it so easy and clear for them to find info, they consistently pick our content over everyone else's.",
    s2Title: "Content & Social Media",
    s2Desc: "What worked in 2025 doesn't work in 2026, and Instagram engagement is no coincidence either. The focus isn't showing what you do — it's transmitting your authority to the person watching.",
    s3Title: "Scaling & Advertising",
    s3Desc: "We pay to tell the user a story, measuring who engages and who doesn't. Based on their behaviour, they see one piece of content or another.",
    aboutLabel: "About Us",
    aboutH2: (<>WE ARE <span className="highlight-red">BRUTAL</span></>),
    aboutP1: "Founded in 2023, we're a team of digital strategists, content creators, and developers specializing in web positioning, social media, and digital advertising.",
    aboutP2: "We don't follow trends—we anticipate them. We put you ahead of everyone on Google, AI engines, and social media.",
    projects: "Projects",
    awards: "Awards",
    years: "Years",
    team: "THE TEAM",
    role1: "Creative Director",
    role2: "Lead Designer",
    role3: "Developer",
    role4: "Strategist",
    contactLabel: "Get in Touch",
    contactH2: (<>CREATE AND SCALE<br />THE <span className="highlight-red">BRUTAL</span> WAY</>),
    phone: "Phone:",
    location: "Location:",
    formName: "Name",
    formMessage: "Message",
    formSend: "Send Message",
    namePlaceholder: "Your name",
    msgPlaceholder: "Tell us about your project",
    footerDesc: "Digital agency specializing in SEO, AEO, social media, and digital advertising. We put you ahead of everyone.",
    links: "Links",
    social: "Social",
    copyright: "© 2025 BRUTAL. All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },
};

const ArrowRight = () => (
  <svg className="w-6 h-6 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="square" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ArrowDiag = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="square" d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const marqueeItems = ["SEO", "AEO", "SOCIAL MEDIA", "GOOGLE ADS", "META ADS", "CONTENIDO"];

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [mobileMenu, setMobileMenu] = useState(false);
  const c = t[lang];

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");
  const flagLabel = lang === "es" ? "EN" : "ES";

  return (
    <div className="creative-agency min-h-screen bg-white">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ borderBottom: "3px solid black" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="cursor-pointer">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                BRUTAL<span className="highlight-red">.</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-6 sm:gap-8">
              <a href="#work" className="text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">{c.navWork}</a>
              <a href="#services" className="text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">{c.navServices}</a>
              <a href="#about" className="text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">{c.navAbout}</a>
              <a href="#contact" className="text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">{c.navContact}</a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button onClick={toggleLang} className="lang-toggle" aria-label="Switch language">{flagLabel}</button>
              <a href="/demo" className="btn-brutal text-sm py-2 px-4">{c.viewWork}</a>
            </div>
            <button className="md:hidden p-2 brutal-border cursor-pointer" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {mobileMenu && (
            <div className="md:hidden pb-6 space-y-4">
              <a href="#work" onClick={() => setMobileMenu(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">{c.navWork}</a>
              <a href="#services" onClick={() => setMobileMenu(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">{c.navServices}</a>
              <a href="#about" onClick={() => setMobileMenu(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">{c.navAbout}</a>
              <a href="#contact" onClick={() => setMobileMenu(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[var(--primary)] transition-colors">{c.navContact}</a>
              <div className="flex items-center gap-3 mt-2">
                <button onClick={toggleLang} className="lang-toggle">{flagLabel}</button>
                <a href="/demo" className="btn-brutal text-sm py-2 px-4">{c.viewWork}</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-20 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center py-12 sm:py-20 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <div className="inline-block brutal-border brutal-shadow px-4 py-2 mb-8 bg-[var(--cta)]">
                  <span className="text-sm font-bold uppercase tracking-wider">{c.badge}</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none mb-8">{c.heroH1}</h1>
                <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-sm md:max-w-md">{c.heroP}</p>
                <div className="flex flex-wrap gap-4">
                  <a href="/demo" className="btn-brutal">
                    {c.viewWork}
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="square" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a href="#contact" className="btn-outline">{c.contact}</a>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 brutal-border bg-[var(--secondary)] transform rotate-6" />
                  <div className="absolute inset-0 brutal-border bg-[var(--primary)] transform -rotate-3" />
                  <div className="absolute inset-0 brutal-border bg-[var(--cta)] flex items-center justify-center">
                    <span className="text-9xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>*</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="py-4 overflow-hidden bg-[var(--text)]" style={{ borderTop: "3px solid black", borderBottom: "3px solid black" }}>
          <div className="animate-marquee whitespace-nowrap flex">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-8 px-4">
                {marqueeItems.map((item) => (
                  <span key={`${i}-${item}`} className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-6 sm:gap-8">
                    {item} <span className="text-[var(--cta)]">&#10022;</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="work" className="py-12 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">{c.resultsLabel}</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2">{c.resultsH2}</h2>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">{c.resultsSubH}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { img: "/images/medica.jpg", stat: "+340%", tag: "SEO", tagBg: "var(--primary)", title: c.stat1Title, sub: c.stat1Sub },
                { img: "/images/tshirt.webp", stat: "50K", tag: "Social Media", tagBg: "var(--secondary)", title: c.stat2Title, sub: c.stat2Sub },
                { img: "/images/ecommerce.jpg", stat: "x4.2", tag: "Meta Ads", tagBg: "var(--cta)", tagColor: "var(--text)", title: "ROAS", sub: c.stat3Sub },
                { img: "/images/abogados.jpg", stat: "#1", tag: "AEO", tagBg: "var(--primary)", title: c.stat4Title, sub: c.stat4Sub },
              ].map((item, i) => (
                <div key={i} className="brutal-border brutal-shadow relative overflow-hidden text-center">
                  <Image src={item.img} alt="" fill className="object-cover" sizes="25vw" />
                  <div className="absolute inset-0 bg-black/75" />
                  <div className="relative p-6">
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-white" style={{ fontFamily: "Syne, sans-serif" }}>{item.stat}</div>
                    <span className="inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wider mb-2" style={{ backgroundColor: item.tagBg, color: item.tagColor || "white" }}>{item.tag}</span>
                    <h4 className="font-bold text-sm mt-2 text-white">{item.title}</h4>
                    <p className="text-xs text-white/60 mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-12 sm:py-20 px-6 bg-[var(--text)] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">{c.servicesLabel}</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-2">{c.servicesH2}</h2>
            <p className="text-white/60 mt-4 max-w-2xl text-lg">{c.servicesTagline}</p>
          </div>
          <div className="space-y-0">
            {[
              { num: "01", color: "var(--primary)", title: c.s1Title, desc: c.s1Desc },
              { num: "02", color: "var(--secondary)", title: c.s2Title, desc: c.s2Desc },
              { num: "03", color: "var(--cta)", title: c.s3Title, desc: c.s3Desc },
            ].map((s, i) => (
              <a key={i} href="/demo" className="group block py-8 cursor-pointer hover:bg-white/5 transition-colors px-4 -mx-4" style={{ borderTop: "3px solid white" }}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <span className="text-5xl font-bold opacity-50" style={{ color: s.color }}>{s.num}</span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold flex-1">{s.title}</h3>
                  <p className="text-white/60 max-w-md md:text-right">{s.desc}</p>
                  <div className="w-12 h-12 flex items-center justify-center group-hover:bg-[var(--cta)] group-hover:border-[var(--cta)] transition-colors" style={{ border: "3px solid white" }}>
                    <ArrowRight />
                  </div>
                </div>
              </a>
            ))}
            <div style={{ borderTop: "3px solid white" }} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-12 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">{c.aboutLabel}</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-8">{c.aboutH2}</h2>
              <div className="space-y-6 text-lg text-[var(--text-muted)]">
                <p>{c.aboutP1}</p>
                <p>{c.aboutP2}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12">
                {[
                  { val: "30+", label: c.projects },
                  { val: "7", label: c.awards },
                  { val: "4", label: c.years },
                ].map((s, i) => (
                  <div key={i} className="brutal-border p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-3xl font-bold">{s.val}</div>
                    <div className="text-xs sm:text-sm text-[var(--text-muted)] uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-8">{c.team}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { initial: "J", name: "José García", role: c.role1, bg: "var(--primary)" },
                  { initial: "A", name: "Ana Rodríguez", role: c.role2, bg: "var(--secondary)" },
                  { initial: "A", name: "Antonio Guerra", role: c.role3, bg: "var(--primary)" },
                  { initial: "X", name: "Xino Carrasco", role: c.role4, bg: "var(--secondary)" },
                ].map((m, i) => (
                  <div key={i} className="brutal-border brutal-shadow p-6 cursor-pointer">
                    <div className="w-16 h-16 brutal-border flex items-center justify-center text-2xl font-bold mb-4" style={{ backgroundColor: m.bg, color: "white" }}>{m.initial}</div>
                    <h4 className="font-bold text-lg">{m.name}</h4>
                    <p className="text-sm text-[var(--text-muted)]">{m.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-12 sm:py-20 px-6 bg-[var(--cta)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider">{c.contactLabel}</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-8">{c.contactH2}</h2>
              <div className="space-y-4 text-lg">
                <p><span className="font-bold">Email:</span><br />hello@brutal.studio</p>
                <p><span className="font-bold">{c.phone}</span><br />+34 629 645 745</p>
                <p><span className="font-bold">{c.location}</span><br />Huelva, España</p>
              </div>
            </div>
            <div className="brutal-border brutal-shadow bg-white p-6 sm:p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">{c.formName}</label>
                  <input type="text" className="w-full brutal-border px-4 py-3 text-lg focus:outline-none focus:ring-0" placeholder={c.namePlaceholder} />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">Email</label>
                  <input type="email" className="w-full brutal-border px-4 py-3 text-lg focus:outline-none focus:ring-0" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">{c.formMessage}</label>
                  <textarea rows={4} className="w-full brutal-border px-4 py-3 text-lg focus:outline-none focus:ring-0 resize-none" placeholder={c.msgPlaceholder} />
                </div>
                <button type="submit" className="btn-brutal w-full">
                  {c.formSend}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="square" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ borderTop: "3px solid black" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="md:col-span-2">
              <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>BRUTAL<span className="highlight-red">.</span></span>
              <p className="text-[var(--text-muted)] mt-4 max-w-sm">{c.footerDesc}</p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-4">{c.links}</h4>
              <ul className="space-y-2">
                <li><a href="/demo" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors font-bold">Demo</a></li>
                <li><a href="#work" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">{c.navWork}</a></li>
                <li><a href="#services" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">{c.navServices}</a></li>
                <li><a href="#about" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">{c.navAbout}</a></li>
                <li><a href="#contact" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">{c.navContact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-4">{c.social}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Instagram</a></li>
                <li><a href="#" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Twitter</a></li>
                <li><a href="#" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Dribbble</a></li>
                <li><a href="#" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "3px solid black" }}>
            <p className="text-sm text-[var(--text-muted)]">{c.copyright}</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">{c.privacy}</a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">{c.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
