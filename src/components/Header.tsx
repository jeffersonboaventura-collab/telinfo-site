"use client";
import { useRef, useState, useEffect, RefObject } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useI18n, Locale } from "@/lib/i18n";
import { FiberHandle, useFiberNav } from "./FiberOpticTransition";
import AnimatedLogo from "./AnimatedLogo";

const FLAGS: Record<Locale, string> = { pt: "ðŸ‡§ðŸ‡·", en: "ðŸ‡ºðŸ‡¸", es: "ðŸ‡ªðŸ‡¸" };
const LOCALES: Locale[] = ["pt", "en", "es"];

interface HeaderProps { fiberRef: RefObject<FiberHandle | null> }

export default function Header({ fiberRef }: HeaderProps) {
  const { t, locale, setLocale } = useI18n();
  const { navigate } = useFiberNav(fiberRef);
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [active,     setActive]     = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = ["about", "services", "cases", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const NAV = [
    { id: "about",    label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "cases",    label: t.nav.cases },
    { id: "contact",  label: t.nav.contact },
  ];

  const handleNav = (id: string) => { setMobileOpen(false); navigate(`#${id}`); };

  const navLinkStyle = (id: string) => ({
    fontFamily: "var(--font-exo)",
    color: active === id ? "#00f5ff" : "rgba(255,255,255,0.55)",
    borderColor: active === id ? "rgba(0,245,255,0.2)" : "transparent",
    background: active === id ? "rgba(0,245,255,0.05)" : "transparent",
  });

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={scrolled
          ? { background: "rgba(2,4,8,0.93)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(0,245,255,0.1)" }
          : {}
        }
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex items-center justify-between h-[64px]">

          {/* â”€â”€ LOGO ANIMADA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <button
            onClick={() => navigate("#hero")}
            className="focus:outline-none relative flex items-center gap-2 group"
            aria-label="Ir para o inÃ­cio"
          >
            <div className="relative">
              {/* Logo real com antenas animadas */}
              <AnimatedLogo height={42} />

              {/* Ponto de status "sistema ativo" â€” posicionado sobre a logo */}
              <span
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 z-10"
                style={{ animation: "pulse-neon 2s infinite", boxShadow: "0 0 6px rgba(0,255,136,0.8)" }}
                title="Sistema ativo"
              />
            </div>

            {/* SubtÃ­tulo â€” visÃ­vel apenas em desktop */}
            <div className="hidden md:flex flex-col leading-none">
              <span
                style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "0.4rem",
                  color: "rgba(0,245,255,0.65)",
                  letterSpacing: "0.35em",
                  fontWeight: 600,
                }}
              >
                CYBER SECURITY
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.35rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.2em",
                  marginTop: 2,
                }}
              >
                EST. 2012 Â· SJC/SP
              </span>
            </div>
          </button>

          {/* â”€â”€ NAV DESKTOP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="px-3 py-1.5 rounded border text-sm font-medium transition-all duration-200"
                style={navLinkStyle(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* â”€â”€ CONTROLES DIREITA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="flex items-center gap-2">

            {/* Seletor de idioma */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLocaleOpen(!localeOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-all"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.45)", borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                {FLAGS[locale]} {locale.toUpperCase()} <ChevronDown className="w-3 h-3" />
              </button>

              {localeOpen && (
                <div
                  className="absolute top-full right-0 mt-1.5 py-1.5 rounded border z-50 min-w-[100px]"
                  style={{ background: "#0a0f1e", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.7)" }}
                >
                  {LOCALES.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLocaleOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors"
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                        color: l === locale ? "#00f5ff" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {FLAGS[l]} {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => handleNav("contact")}
              className="btn-cyber hidden md:flex"
              style={{ fontSize: "0.62rem", padding: "9px 16px" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Solicitar Pentest</span>
            </button>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded border transition-all"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* â”€â”€ MENU MOBILE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[98] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 z-[99] w-72 flex flex-col lg:hidden"
            style={{ background: "rgba(5,13,26,0.98)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Drawer header com logo */}
            <div className="flex items-center justify-between px-5 h-[64px] border-b border-white/5">
              <AnimatedLogo height={36} />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 p-4 space-y-1">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all"
                  style={{
                    fontFamily: "var(--font-exo)",
                    color: active === item.id ? "#00f5ff" : "rgba(255,255,255,0.6)",
                    background: active === item.id ? "rgba(0,245,255,0.06)" : "transparent",
                    borderLeft: active === item.id ? "2px solid #00f5ff" : "2px solid transparent",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Idioma + CTA */}
            <div className="p-4 border-t border-white/5 space-y-3">
              <div className="flex gap-2">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className="flex-1 py-2 rounded border text-center transition-all"
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                      color: l === locale ? "#00f5ff" : "rgba(255,255,255,0.4)",
                      borderColor: l === locale ? "rgba(0,245,255,0.35)" : "rgba(255,255,255,0.08)",
                      background: l === locale ? "rgba(0,245,255,0.05)" : "transparent",
                    }}
                  >
                    {FLAGS[l]} {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleNav("contact")}
                className="btn-cyber w-full justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Solicitar Pentest</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}




