"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Locale = "pt" | "en" | "es";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: any;
};

const translations = {
  pt: {
    nav: {
      about: "Sobre",
      services: "Serviços",
      cases: "Cases",
      contact: "Contato",
      requestPentest: "Solicitar Pentest",
    },
    hero: {
      title: "TELINFO CYBER SECURITY",
      subtitle:
        "Especialistas em Segurança Cibernética, Pentest Autorizado, Antifraude e Conectividade Segura. Desde 2012 protegendo empresas no Brasil, Estados Unidos, Canadá e Reino Unido.",
      primaryCta: "Solicitar Pentest Gratuito",
      secondaryCta: "Ver Serviços",
      stats: [
        { value: "12+", label: "Anos de Mercado" },
        { value: "98%", label: "Taxa de Detecção" },
        { value: "500+", label: "Projetos" },
        { value: "24/7", label: "Monitoramento" },
      ],
    },
    about: {
      eyebrow: "Linha do tempo",
      title: "Trajetória de Inovação e Segurança",
      name: "Jefferson Boaventura da Silva",
      role: "Fundador & Diretor Técnico",
      linkedin: "linkedin.com/in/jefferson-boaventura-aa13a11b9",
      bio1:
        "Expert técnico multidisciplinar com vasta experiência prática em Telecomunicações, Mecatrônica, Segurança Cibernética, Antifraude, Rastreabilidade e Conectividade Segura. Fundou a Telinfo em 2012 em São José dos Campos/SP, iniciando como provedora de internet no Vale do Paraíba.",
      bio2:
        "Criador da ValeMovel Tecnologia, a primeira MVNO do Vale do Paraíba. Com mais de 12 anos de experiência em infraestrutura crítica, segurança digital, conectividade e inteligência técnica.",
      founded: "Fundação",
      foundedValue: "2012",
      location: "São José dos Campos, SP",
      highlight: "Destaque",
      highlightValue: "1ª MVNO",
      highlightLabel: "Vale do Paraíba",
      email: "contato@telinfo.com.br",
      tags: ["Pentest", "Telecomunicações", "Mecatrônica", "Antifraude", "MVNO", "Redes OT/IT", "LGPD", "IoT Security"],
      timeline: [
        {
          year: "2012",
          title: "Fundação da Telinfo",
          text:
            "Jefferson Boaventura funda a Telinfo em São José dos Campos/SP como provedora de internet para empresas e residências no Vale do Paraíba.",
        },
        {
          year: "2015",
          title: "Expansão Regional",
          text:
            "Crescimento da rede de conectividade para múltiplas cidades do Vale do Paraíba, consolidando parceiros corporativos estratégicos.",
        },
        {
          year: "2016",
          title: "ValeMovel — 1ª MVNO da Região",
          text:
            "Criação da ValeMovel Tecnologia, a primeira MVNO do Vale do Paraíba. Marco histórico em inovação regulatória e técnica.",
          badge: "Inovação histórica regional",
        },
        {
          year: "2019",
          title: "Pivô para Cibersegurança",
          text:
            "Identificando a crescente demanda por segurança digital, Jefferson lidera a transição para serviços especializados em cibersegurança.",
        },
        {
          year: "2022",
          title: "Portfólio Especializado",
          text:
            "Consolidação em Pentest, Antifraude, Rastreabilidade e Inteligência Técnica com metodologias internacionais como OWASP, NIST e ISO 27001.",
        },
        {
          year: "2024",
          title: "Referência Técnica",
          text:
            "Atuação em CFTV, IoT, OT/IT, conectividade segura e segurança empresarial para empresas de todos os portes.",
        },
      ],
    },
    services: {
      title: "Serviços",
      subtitle: "Soluções técnicas para proteger, auditar e fortalecer sua operação.",
      items: [
        { title: "Pentest Autorizado", description: "Testes controlados para identificar vulnerabilidades reais antes dos atacantes." },
        { title: "Auditoria Digital", description: "Análise técnica de riscos, exposição, infraestrutura, redes e aplicações." },
        { title: "Antifraude", description: "Inteligência técnica para prevenção de fraudes, abuso, furto e rastreabilidade." },
        { title: "CFTV e Segurança Física", description: "Projetos de câmeras, NVR, redes PoE, monitoramento e integração." },
        { title: "IoT e OT Security", description: "Proteção para dispositivos conectados, automação, sensores e ambientes críticos." },
        { title: "Websites e Hospedagem", description: "Desenvolvimento de sites modernos, hospedagem, performance, SEO e segurança." },
      ],
    },
    cases: {
      title: "Cases de Sucesso",
      subtitle: "Projetos e experiências relevantes em telecomunicações, segurança e conectividade.",
      items: [
        { title: "Infraestrutura crítica", description: "Atuação técnica em redes, telecomunicações e conectividade empresarial." },
        { title: "Antifraude e rastreabilidade", description: "Análise de incidentes, identificação de padrões e inteligência técnica." },
        { title: "CFTV e IoT", description: "Projetos integrados de segurança física, redes e automação." },
      ],
    },
    contact: {
      title: "Contato",
      subtitle: "Fale com a Telinfo Cyber Security.",
      email: "contato@telinfo.com.br",
      phoneUs: "+1 689 322 5055",
      phoneBr: "+55 12 98127 9877",
      countries: "Atendimento: Brasil, Estados Unidos, Canadá e Reino Unido",
      formName: "Nome",
      formEmail: "E-mail",
      formPhone: "Telefone",
      formCompany: "Empresa",
      formService: "Serviço",
      formMessage: "Mensagem",
      submit: "Enviar solicitação",
      whatsapp: "Falar no WhatsApp",
    },
    footer: {
      text: "Telinfo Cyber Security. Segurança digital, telecomunicações e conectividade segura.",
    },
  },

  en: {
    nav: {
      about: "About",
      services: "Services",
      cases: "Cases",
      contact: "Contact",
      requestPentest: "Request Pentest",
    },
    hero: {
      title: "TELINFO CYBER SECURITY",
      subtitle:
        "Cybersecurity, Authorized Pentest, Anti-Fraud and Secure Connectivity specialists since 2012.",
      primaryCta: "Request Free Pentest",
      secondaryCta: "View Services",
      stats: [
        { value: "12+", label: "Years in Market" },
        { value: "98%", label: "Detection Rate" },
        { value: "500+", label: "Projects" },
        { value: "24/7", label: "Monitoring" },
      ],
    },
    about: {
      eyebrow: "Timeline",
      title: "Innovation and Security Journey",
      name: "Jefferson Boaventura da Silva",
      role: "Founder & Technical Director",
      linkedin: "linkedin.com/in/jefferson-boaventura-aa13a11b9",
      bio1:
        "Multidisciplinary technical expert with extensive hands-on experience in Telecommunications, Mechatronics, Cybersecurity, Anti-Fraud, Traceability and Secure Connectivity.",
      bio2:
        "Founder of Telinfo in 2012 in São José dos Campos/SP and creator of ValeMovel Tecnologia, the first MVNO in the Vale do Paraíba region.",
      founded: "Founded",
      foundedValue: "2012",
      location: "São José dos Campos, SP",
      highlight: "Highlight",
      highlightValue: "1st MVNO",
      highlightLabel: "Vale do Paraíba",
      email: "contato@telinfo.com.br",
      tags: ["Pentest", "Telecom", "Mechatronics", "Anti-Fraud", "MVNO", "OT/IT Networks", "LGPD", "IoT Security"],
      timeline: [
        { year: "2012", title: "Telinfo Foundation", text: "Telinfo was founded in São José dos Campos/SP as an internet provider." },
        { year: "2015", title: "Regional Expansion", text: "Connectivity network expansion across the Vale do Paraíba region." },
        { year: "2016", title: "ValeMovel — 1st Regional MVNO", text: "Creation of ValeMovel Tecnologia, the first MVNO in the region.", badge: "Regional innovation" },
        { year: "2019", title: "Cybersecurity Pivot", text: "Transition to specialized cybersecurity services." },
        { year: "2022", title: "Specialized Portfolio", text: "Pentest, Anti-Fraud, Traceability and Technical Intelligence." },
        { year: "2024", title: "Technical Reference", text: "CFTV, IoT, OT/IT, secure connectivity and business security." },
      ],
    },
    services: {
      title: "Services",
      subtitle: "Technical solutions to protect, audit and strengthen your operation.",
      items: [
        { title: "Authorized Pentest", description: "Controlled tests to identify real vulnerabilities." },
        { title: "Digital Audit", description: "Technical risk analysis for infrastructure, networks and applications." },
        { title: "Anti-Fraud", description: "Technical intelligence for fraud prevention and traceability." },
        { title: "CFTV and Physical Security", description: "Camera, NVR, PoE networking and monitoring projects." },
        { title: "IoT and OT Security", description: "Protection for connected devices and critical environments." },
        { title: "Websites and Hosting", description: "Modern websites, hosting, performance, SEO and security." },
      ],
    },
    cases: {
      title: "Success Cases",
      subtitle: "Relevant projects in telecommunications, security and connectivity.",
      items: [
        { title: "Critical Infrastructure", description: "Technical work in networks, telecommunications and business connectivity." },
        { title: "Anti-Fraud and Traceability", description: "Incident analysis, pattern detection and technical intelligence." },
        { title: "CFTV and IoT", description: "Integrated physical security, networking and automation projects." },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Talk to Telinfo Cyber Security.",
      email: "contato@telinfo.com.br",
      phoneUs: "+1 689 322 5055",
      phoneBr: "+55 12 98127 9877",
      countries: "Service: Brazil, United States, Canada and United Kingdom",
      formName: "Name",
      formEmail: "Email",
      formPhone: "Phone",
      formCompany: "Company",
      formService: "Service",
      formMessage: "Message",
      submit: "Send request",
      whatsapp: "Talk on WhatsApp",
    },
    footer: {
      text: "Telinfo Cyber Security. Digital security, telecommunications and secure connectivity.",
    },
  },

  es: {
    nav: {
      about: "Sobre",
      services: "Servicios",
      cases: "Casos",
      contact: "Contacto",
      requestPentest: "Solicitar Pentest",
    },
    hero: {
      title: "TELINFO CYBER SECURITY",
      subtitle:
        "Especialistas en Ciberseguridad, Pentest Autorizado, Antifraude y Conectividad Segura desde 2012.",
      primaryCta: "Solicitar Pentest Gratuito",
      secondaryCta: "Ver Servicios",
      stats: [
        { value: "12+", label: "Años de Mercado" },
        { value: "98%", label: "Tasa de Detección" },
        { value: "500+", label: "Proyectos" },
        { value: "24/7", label: "Monitoreo" },
      ],
    },
    about: {
      eyebrow: "Línea de tiempo",
      title: "Trayectoria de Innovación y Seguridad",
      name: "Jefferson Boaventura da Silva",
      role: "Fundador y Director Técnico",
      linkedin: "linkedin.com/in/jefferson-boaventura-aa13a11b9",
      bio1:
        "Experto técnico multidisciplinar con amplia experiencia práctica en Telecomunicaciones, Mecatrónica, Ciberseguridad, Antifraude, Trazabilidad y Conectividad Segura.",
      bio2:
        "Fundador de Telinfo en 2012 en São José dos Campos/SP y creador de ValeMovel Tecnologia, la primera MVNO del Vale do Paraíba.",
      founded: "Fundación",
      foundedValue: "2012",
      location: "São José dos Campos, SP",
      highlight: "Destaque",
      highlightValue: "1ª MVNO",
      highlightLabel: "Vale do Paraíba",
      email: "contato@telinfo.com.br",
      tags: ["Pentest", "Telecom", "Mecatrónica", "Antifraude", "MVNO", "Redes OT/IT", "LGPD", "IoT Security"],
      timeline: [
        { year: "2012", title: "Fundación de Telinfo", text: "Telinfo fue fundada en São José dos Campos/SP como proveedora de internet." },
        { year: "2015", title: "Expansión Regional", text: "Crecimiento de conectividad en la región del Vale do Paraíba." },
        { year: "2016", title: "ValeMovel — 1ª MVNO Regional", text: "Creación de ValeMovel Tecnologia, la primera MVNO de la región.", badge: "Innovación regional" },
        { year: "2019", title: "Transición a Ciberseguridad", text: "Transición hacia servicios especializados en ciberseguridad." },
        { year: "2022", title: "Portafolio Especializado", text: "Pentest, Antifraude, Trazabilidad e Inteligencia Técnica." },
        { year: "2024", title: "Referencia Técnica", text: "CFTV, IoT, OT/IT, conectividad segura y seguridad empresarial." },
      ],
    },
    services: {
      title: "Servicios",
      subtitle: "Soluciones técnicas para proteger, auditar y fortalecer su operación.",
      items: [
        { title: "Pentest Autorizado", description: "Pruebas controladas para identificar vulnerabilidades reales." },
        { title: "Auditoría Digital", description: "Análisis técnico de riesgos, infraestructura, redes y aplicaciones." },
        { title: "Antifraude", description: "Inteligencia técnica para prevención de fraudes y trazabilidad." },
        { title: "CFTV y Seguridad Física", description: "Proyectos de cámaras, NVR, redes PoE y monitoreo." },
        { title: "IoT y OT Security", description: "Protección para dispositivos conectados y ambientes críticos." },
        { title: "Websites y Hosting", description: "Sitios modernos, hosting, rendimiento, SEO y seguridad." },
      ],
    },
    cases: {
      title: "Casos de Éxito",
      subtitle: "Proyectos relevantes en telecomunicaciones, seguridad y conectividad.",
      items: [
        { title: "Infraestructura Crítica", description: "Trabajo técnico en redes, telecomunicaciones y conectividad empresarial." },
        { title: "Antifraude y Trazabilidad", description: "Análisis de incidentes, patrones e inteligencia técnica." },
        { title: "CFTV e IoT", description: "Proyectos integrados de seguridad física, redes y automatización." },
      ],
    },
    contact: {
      title: "Contacto",
      subtitle: "Hable con Telinfo Cyber Security.",
      email: "contato@telinfo.com.br",
      phoneUs: "+1 689 322 5055",
      phoneBr: "+55 12 98127 9877",
      countries: "Atención: Brasil, Estados Unidos, Canadá y Reino Unido",
      formName: "Nombre",
      formEmail: "Email",
      formPhone: "Teléfono",
      formCompany: "Empresa",
      formService: "Servicio",
      formMessage: "Mensaje",
      submit: "Enviar solicitud",
      whatsapp: "Hablar por WhatsApp",
    },
    footer: {
      text: "Telinfo Cyber Security. Seguridad digital, telecomunicaciones y conectividad segura.",
    },
  },
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: "pt" as Locale,
      setLocale: () => {},
      t: translations.pt,
    };
  }
  return context;
}

export const locales: Locale[] = ["pt", "en", "es"];
export const messages = translations;
export default translations;