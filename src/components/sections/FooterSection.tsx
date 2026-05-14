"use client";
import { useState, useEffect } from "react";
import { Linkedin, Globe, Mail, Phone, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Usar estado para o ano evita hydration mismatch
function useYear() {
  const [year, setYear] = useState(2024);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return year;
}

const SOCIAL = [
  {
    href: "https://www.linkedin.com/in/jefferson-boaventura-da-silva",
    label: "LinkedIn",
    color: "#4499ff",
    icon: Linkedin,
  },
  {
    href: "https://www.telinfo.com.br",
    label: "Website",
    color: "#00f5ff",
    icon: Globe,
  },
  {
    href: "mailto:contato@telinfo.com.br",
    label: "Email",
    color: "#00ff88",
    icon: Mail,
  },
];

export default function FooterSection() {
  const { t } = useI18n();
  const year = useYear();

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#020408" }}>

      {/* Top bar — contatos rápidos */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "24px 0" }}>
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Email */}
            <a href="mailto:contato@telinfo.com.br"
              className="flex items-center gap-3 p-3 rounded transition-all duration-200"
              style={{ textDecoration: "none", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,245,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
              <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#00f5ff" }} />
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>E-MAIL</div>
                <div className="text-white" style={{ fontSize: "0.78rem" }}>contato@telinfo.com.br</div>
              </div>
            </a>

            {/* Telefone BR */}
            <a href="tel:+5512981279877"
              className="flex items-center gap-3 p-3 rounded transition-all duration-200"
              style={{ textDecoration: "none", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
              <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#00ff88" }} />
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>BRASIL 🇧🇷</div>
                <div className="text-white" style={{ fontSize: "0.78rem" }}>+55 12 98127-9877</div>
              </div>
            </a>

            {/* Telefone EUA */}
            <a href="tel:+16893225055"
              className="flex items-center gap-3 p-3 rounded transition-all duration-200"
              style={{ textDecoration: "none", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(68,153,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
              <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#4499ff" }} />
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>USA / CA / UK 🇺🇸🇨🇦🇬🇧</div>
                <div className="text-white" style={{ fontSize: "0.78rem" }}>+1 689 322 5055</div>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jefferson-boaventura-da-silva"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded transition-all duration-200"
              style={{ textDecoration: "none", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(68,153,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
              <Linkedin className="w-4 h-4 flex-shrink-0" style={{ color: "#4499ff" }} />
              <div className="min-w-0">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>LINKEDIN</div>
                <div className="text-white truncate" style={{ fontSize: "0.72rem" }}>Jefferson Boaventura da Silva</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border flex items-center justify-center flex-shrink-0"
              style={{ borderColor: "rgba(0,245,255,0.3)", background: "rgba(0,245,255,0.04)" }}>
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="text-white font-bold" style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.8rem" }}>
                TELINFO CYBER SECURITY
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.28)", marginTop: 1 }}>
                © {year} — {t.footer.rights} | {t.footer.founded}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.18)", marginTop: 1 }}>
                Segurança Cibernética · Desenvolvimento Web · Hospedagem · Atendemos 🇧🇷 🇺🇸 🇨🇦 🇬🇧
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex gap-2 items-center">
            {SOCIAL.map(({ href, label, color, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="w-9 h-9 rounded border flex items-center justify-center transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                  (e.currentTarget as HTMLElement).style.color = color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${color}25`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
