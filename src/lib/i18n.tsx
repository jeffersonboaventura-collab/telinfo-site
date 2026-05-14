"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export type Locale = "pt" | "en" | "es";

const translations = {
  pt: {
    nav: { about: "Sobre", services: "ServiÃ§os", cases: "Cases", contact: "Contato", cta: "Solicitar Pentest" },
    hero: {
      badge: "SISTEMA DE SEGURANÃ‡A ATIVO â€” TELINFO v2.4",
      line1: "TELINFO", line2: "CYBER", line3: "SECURITY",
      terminal: [
        "inicializando_protocolo_seguranÃ§a --modo=avanÃ§ado",
        "verificando_vulnerabilidades --target=all",
        "telinfo@sec:~$ executando_auditoria.sh",
        "SISTEMA PROTEGIDO â€” TELINFO CYBER v2.4",
      ],
      desc: "Especialistas em SeguranÃ§a CibernÃ©tica, Pentest Autorizado, Antifraude e Conectividade Segura. Desde 2012 protegendo empresas no Vale do ParaÃ­ba e em todo o Brasil.",
      cta1: "Solicitar Pentest Gratuito", cta2: "Ver ServiÃ§os",
      stat1lbl: "Anos de Mercado", stat2lbl: "Taxa de DetecÃ§Ã£o", stat3lbl: "Projetos", stat4lbl: "Monitoramento",
    },
    about: {
      tag: "QUEM SOMOS", title: "TrajetÃ³ria de", titleHighlight: "InovaÃ§Ã£o", titleEnd: "e SeguranÃ§a",
      role: "CEO & FOUNDER â€” CISO",
      bio1: "Engenheiro multidisciplinar em TelecomunicaÃ§Ãµes, MecatrÃ´nica e SeguranÃ§a CibernÃ©tica. Fundou a Telinfo em 2012 em SÃ£o JosÃ© dos Campos/SP, iniciando como provedora de internet no Vale do ParaÃ­ba.",
      bio2: "Criador da ValeMovel Tecnologia â€” a primeira MVNO do Vale do ParaÃ­ba. Com mais de 12 anos de experiÃªncia em infraestrutura crÃ­tica e seguranÃ§a digital.", timeline: "LINHA DO TEMPO",
    },
    services: { tag: "PORTFÃ“LIO", title: "Nossos", titleHighlight: "ServiÃ§os", desc: "SoluÃ§Ãµes completas em seguranÃ§a cibernÃ©tica e fÃ­sica com metodologias internacionais (OWASP, NIST, ISO 27001)." },
    cases: { tag: "RESULTADOS REAIS", title: "Cases de", titleHighlight: "Sucesso", desc: "Resultados reais para empresas reais. Nomes omitidos por confidencialidade.", challenge: "DESAFIO", solution: "SOLUÃ‡ÃƒO", result: "RESULTADO" },
    contact: {
      tag: "CANAL SEGURO", title: "Entre em", titleHighlight: "Contato",
      desc: "AnÃ¡lise inicial gratuita em atÃ© 2 horas. Todos os dados tratados com total confidencialidade.",
      name: "NOME COMPLETO *", email: "E-MAIL *", phone: "TELEFONE / WHATSAPP", company: "EMPRESA",
      service: "SERVIÃ‡O DE INTERESSE *", message: "MENSAGEM *", messagePh: "Descreva seu desafio de seguranÃ§a...",
      submit: "ENVIAR MENSAGEM SEGURA", sending: "ENVIANDO...",
      successTitle: "Mensagem Enviada!", successDesc: "Retornaremos em atÃ© 2 horas com anÃ¡lise inicial gratuita.",
      lgpd: "ðŸ”’ Dados tratados com confidencialidade conforme a LGPD.",
      whatsapp: "CHAMAR NO WHATSAPP", location: "SÃ£o JosÃ© dos Campos, SP", locationSub: "Vale do ParaÃ­ba â€” Atendimento nacional", support: "24h / 7 dias / 365 dias",
    },
    footer: { rights: "Todos os direitos reservados.", founded: "Fundada por Jefferson Boaventura da Silva em 2012" },
  },
  en: {
    nav: { about: "About", services: "Services", cases: "Cases", contact: "Contact", cta: "Request Pentest" },
    hero: {
      badge: "SECURITY SYSTEM ACTIVE â€” TELINFO v2.4",
      line1: "TELINFO", line2: "CYBER", line3: "SECURITY",
      terminal: [
        "initializing_security_protocol --mode=advanced",
        "checking_vulnerabilities --target=all",
        "telinfo@sec:~$ running_audit.sh",
        "SYSTEM PROTECTED â€” TELINFO CYBER v2.4",
      ],
      desc: "Specialists in Cybersecurity, Authorized Pentest, Anti-fraud and Secure Connectivity. Since 2012 protecting companies in Brazil with international-level technical expertise.",
      cta1: "Request Free Pentest", cta2: "View Services",
      stat1lbl: "Years in Market", stat2lbl: "Detection Rate", stat3lbl: "Projects", stat4lbl: "Monitoring",
    },
    about: {
      tag: "ABOUT US", title: "A Journey of", titleHighlight: "Innovation", titleEnd: "and Security",
      role: "CEO & FOUNDER â€” CISO",
      bio1: "Multidisciplinary technical expert with extensive hands-on experience in Telecommunications, Mechatronics and Cybersecurity. Founded Telinfo in 2012 in SÃ£o JosÃ© dos Campos/SP as an internet provider in Vale do ParaÃ­ba.",
      bio2: "Creator of ValeMovel Tecnologia â€” the first MVNO in Vale do ParaÃ­ba. Over 12 years of experience in critical infrastructure and digital security.", timeline: "TIMELINE",
    },
    services: { tag: "PORTFOLIO", title: "Our", titleHighlight: "Services", desc: "Complete cybersecurity and physical security solutions with international methodologies (OWASP, NIST, ISO 27001)." },
    cases: { tag: "REAL RESULTS", title: "Success", titleHighlight: "Cases", desc: "Real results for real companies. Names omitted for confidentiality.", challenge: "CHALLENGE", solution: "SOLUTION", result: "RESULT" },
    contact: {
      tag: "SECURE CHANNEL", title: "Get in", titleHighlight: "Touch",
      desc: "Free initial analysis within 2 hours. All data handled with complete confidentiality.",
      name: "FULL NAME *", email: "E-MAIL *", phone: "PHONE / WHATSAPP", company: "COMPANY",
      service: "SERVICE OF INTEREST *", message: "MESSAGE *", messagePh: "Describe your security challenge...",
      submit: "SEND SECURE MESSAGE", sending: "SENDING...",
      successTitle: "Message Sent!", successDesc: "We will respond within 2 hours with a free initial analysis.",
      lgpd: "ðŸ”’ Data handled with confidentiality per LGPD.",
      whatsapp: "CONTACT ON WHATSAPP", location: "SÃ£o JosÃ© dos Campos, SP", locationSub: "Vale do ParaÃ­ba â€” National coverage", support: "24h / 7 days / 365 days",
    },
    footer: { rights: "All rights reserved.", founded: "Founded by Jefferson Boaventura da Silva in 2012" },
  },
  es: {
    nav: { about: "Sobre", services: "Servicios", cases: "Casos", contact: "Contacto", cta: "Solicitar Pentest" },
    hero: {
      badge: "SISTEMA DE SEGURIDAD ACTIVO â€” TELINFO v2.4",
      line1: "TELINFO", line2: "CYBER", line3: "SECURITY",
      terminal: [
        "inicializando_protocolo_seguridad --modo=avanzado",
        "verificando_vulnerabilidades --objetivo=todos",
        "telinfo@sec:~$ ejecutando_auditoria.sh",
        "SISTEMA PROTEGIDO â€” TELINFO CYBER v2.4",
      ],
      desc: "Especialistas en Seguridad CibernÃ©tica, Pentest Autorizado, Antifraude y Conectividad Segura. Desde 2012 protegiendo empresas en Brasil.",
      cta1: "Solicitar Pentest Gratis", cta2: "Ver Servicios",
      stat1lbl: "AÃ±os en Mercado", stat2lbl: "Tasa de DetecciÃ³n", stat3lbl: "Proyectos", stat4lbl: "Monitoreo",
    },
    about: {
      tag: "QUIÃ‰NES SOMOS", title: "Una Trayectoria de", titleHighlight: "InnovaciÃ³n", titleEnd: "y Seguridad",
      role: "CEO & FUNDADOR â€” CISO",
      bio1: "Ingeniero multidisciplinar en Telecomunicaciones, MecatrÃ³nica y Seguridad CibernÃ©tica. FundÃ³ Telinfo en 2012 en SÃ£o JosÃ© dos Campos/SP como proveedor de internet.",
      bio2: "Creador de ValeMovel TecnologÃ­a â€” el primer MVNO del Vale do ParaÃ­ba. MÃ¡s de 12 aÃ±os de experiencia en infraestructura crÃ­tica y seguridad digital.", timeline: "LÃNEA DEL TIEMPO",
    },
    services: { tag: "PORTAFOLIO", title: "Nuestros", titleHighlight: "Servicios", desc: "Soluciones completas en ciberseguridad y seguridad fÃ­sica con metodologÃ­as internacionales." },
    cases: { tag: "RESULTADOS REALES", title: "Casos de", titleHighlight: "Ã‰xito", desc: "Resultados reales para empresas reales. Nombres omitidos por confidencialidad.", challenge: "DESAFÃO", solution: "SOLUCIÃ“N", result: "RESULTADO" },
    contact: {
      tag: "CANAL SEGURO", title: "ContÃ¡ctenos", titleHighlight: "",
      desc: "AnÃ¡lisis inicial gratuito en hasta 2 horas. Todos los datos con total confidencialidad.",
      name: "NOMBRE COMPLETO *", email: "E-MAIL *", phone: "TELÃ‰FONO / WHATSAPP", company: "EMPRESA",
      service: "SERVICIO DE INTERÃ‰S *", message: "MENSAJE *", messagePh: "Describa su desafÃ­o de seguridad...",
      submit: "ENVIAR MENSAJE SEGURO", sending: "ENVIANDO...",
      successTitle: "Â¡Mensaje Enviado!", successDesc: "Responderemos en hasta 2 horas con anÃ¡lisis inicial gratuito.",
      lgpd: "ðŸ”’ Datos manejados con confidencialidad.",
      whatsapp: "CONTACTAR POR WHATSAPP", location: "SÃ£o JosÃ© dos Campos, SP", locationSub: "Vale do ParaÃ­ba â€” Cobertura nacional", support: "24h / 7 dÃ­as / 365 dÃ­as",
    },
    footer: { rights: "Todos los derechos reservados.", founded: "Fundada por Jefferson Boaventura da Silva en 2012" },
  },
};

export type Translations = typeof translations.pt;
interface I18nCtx { locale: Locale; t: Translations; setLocale: (l: Locale) => void; }
const I18nContext = createContext<I18nCtx>({ locale: "pt", t: translations.pt, setLocale: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  useEffect(() => {
    const s = localStorage.getItem("tlf-locale") as Locale | null;
    if (s && translations[s]) setLocaleState(s);
  }, []);
  const setLocale = useCallback((l: Locale) => { setLocaleState(l); localStorage.setItem("tlf-locale", l); }, []);
  return <I18nContext.Provider value={{ locale, t: translations[locale], setLocale }}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); }






