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
      badge: "CYBER SECURITY • EST. 2012 • SJ/SP",
      line1: "TELINFO",
      line2: "CYBER",
      line3: "SECURITY",
      terminal: [
        "pentest autorizado",
        "auditoria digital",
        "antifraude e rastreabilidade",
        "conectividade segura",
        "websites e hospedagem segura"
      ],
      desc: "Especialistas em Segurança Cibernética, Pentest Autorizado, Antifraude, Desenvolvimento de Websites, Hospedagem e Conectividade Segura. Desde 2012 protegendo empresas no Brasil, Estados Unidos, Canadá e Reino Unido.",
      cta1: "Solicitar Pentest Gratuito",
      cta2: "Ver Serviços",
      stat1lbl: "Anos de Mercado",
      stat2lbl: "Taxa de Detecção",
      stat3lbl: "Projetos",
      stat4lbl: "Monitoramento"
    },
    about: {
      eyebrow: "Linha do tempo",
      title: "Trajetória de Inovação e Segurança",
      name: "Jefferson Boaventura da Silva",
      role: "Fundador & Diretor Técnico",
      linkedin: "linkedin.com/in/jefferson-boaventura-aa13a11b9",
      bio1: "Expert técnico multidisciplinar com vasta experiência prática em Telecomunicações, Mecatrônica, Segurança Cibernética, Antifraude, Rastreabilidade e Conectividade Segura. Fundou a Telinfo em 2012 em São José dos Campos/SP, iniciando como provedora de internet no Vale do Paraíba.",
      bio2: "Criador da ValeMovel Tecnologia, a primeira MVNO do Vale do Paraíba. Com mais de 12 anos de experiência em infraestrutura crítica, segurança digital, conectividade e inteligência técnica.",
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
          text: "Jefferson Boaventura funda a Telinfo em São José dos Campos/SP como provedora de internet para empresas e residências no Vale do Paraíba."
        },
        {
          year: "2015",
          title: "Expansão Regional",
          text: "Crescimento da rede de conectividade para múltiplas cidades do Vale do Paraíba, consolidando parceiros corporativos estratégicos."
        },
        {
          year: "2016",
          title: "ValeMovel — 1ª MVNO da Região",
          text: "Criação da ValeMovel Tecnologia, a primeira MVNO do Vale do Paraíba. Marco histórico em inovação regulatória e técnica.",
          badge: "Inovação histórica regional"
        },
        {
          year: "2019",
          title: "Pivô para Cibersegurança",
          text: "Identificando a crescente demanda por segurança digital, Jefferson lidera a transição para serviços especializados em cibersegurança."
        },
        {
          year: "2022",
          title: "Portfólio Especializado",
          text: "Consolidação em Pentest, Antifraude, Rastreabilidade e Inteligência Técnica com metodologias internacionais como OWASP, NIST e ISO 27001."
        },
        {
          year: "2024",
          title: "Referência Técnica",
          text: "Atuação em CFTV, IoT, OT/IT, conectividade segura e segurança empresarial para empresas de todos os portes."
        }
      ]
    },
    services: {
      tag: "Serviços",
      title: "Proteção Digital",
      titleHighlight: "Completa",
      desc: "Soluções técnicas para proteger, auditar e fortalecer sua operação com cibersegurança, conectividade, infraestrutura, CFTV, websites e hospedagem."
    },
    cases: {
      tag: "Cases",
      title: "Cases de",
      titleHighlight: "Sucesso",
      desc: "Projetos e experiências relevantes em telecomunicações, segurança digital, antifraude, infraestrutura e conectividade.",
      challenge: "Desafio",
      solution: "Solução",
      result: "Resultado"
    },
    contact: {
      tag: "Contato",
      title: "Fale com a",
      titleHighlight: "Telinfo",
      desc: "Solicite uma avaliação técnica para sua empresa.",
      successTitle: "Mensagem enviada com sucesso",
      successDesc: "Recebemos sua solicitação. Em breve entraremos em contato.",
      name: "Nome",
      email: "E-mail",
      company: "Empresa",
      phone: "Telefone",
      service: "Serviço",
      message: "Mensagem",
      lgpd: "Seus dados serão usados apenas para retorno comercial e técnico.",
      sending: "Enviando...",
      submit: "Enviar solicitação"
    },
    footer: {
      rights: "Todos os direitos reservados",
      founded: "Fundada em 2012"
    }
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
      badge: "CYBER SECURITY • EST. 2012 • SJ/SP",
      line1: "TELINFO",
      line2: "CYBER",
      line3: "SECURITY",
      terminal: [
        "authorized pentest",
        "digital audit",
        "anti-fraud and traceability",
        "secure connectivity",
        "websites and secure hosting"
      ],
      desc: "Specialists in Cybersecurity, Authorized Pentest, Anti-Fraud, Website Development, Hosting and Secure Connectivity since 2012.",
      cta1: "Request Free Pentest",
      cta2: "View Services",
      stat1lbl: "Years in Market",
      stat2lbl: "Detection Rate",
      stat3lbl: "Projects",
      stat4lbl: "Monitoring"
    },
    about: {
      eyebrow: "Timeline",
      title: "Innovation and Security Journey",
      name: "Jefferson Boaventura da Silva",
      role: "Founder & Technical Director",
      linkedin: "linkedin.com/in/jefferson-boaventura-aa13a11b9",
      bio1: "Multidisciplinary technical expert with extensive hands-on experience in Telecommunications, Mechatronics, Cybersecurity, Anti-Fraud, Traceability and Secure Connectivity.",
      bio2: "Founder of Telinfo in 2012 in São José dos Campos/SP and creator of ValeMovel Tecnologia, the first MVNO in the Vale do Paraíba region.",
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
        { year: "2024", title: "Technical Reference", text: "CFTV, IoT, OT/IT, secure connectivity and business security." }
      ]
    },
    services: {
      tag: "Services",
      title: "Complete Digital",
      titleHighlight: "Protection",
      desc: "Technical solutions to protect, audit and strengthen your operation."
    },
    cases: {
      tag: "Cases",
      title: "Success",
      titleHighlight: "Cases",
      desc: "Relevant projects in telecommunications, security, anti-fraud, infrastructure and connectivity.",
      challenge: "Challenge",
      solution: "Solution",
      result: "Result"
    },
    contact: {
      tag: "Contact",
      title: "Talk to",
      titleHighlight: "Telinfo",
      desc: "Request a technical evaluation for your company.",
      successTitle: "Message sent successfully",
      successDesc: "We received your request and will contact you soon.",
      name: "Name",
      email: "Email",
      company: "Company",
      phone: "Phone",
      service: "Service",
      message: "Message",
      lgpd: "Your data will only be used for commercial and technical contact.",
      sending: "Sending...",
      submit: "Send request"
    },
    footer: {
      rights: "All rights reserved",
      founded: "Founded in 2012"
    }
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
      badge: "CYBER SECURITY • EST. 2012 • SJ/SP",
      line1: "TELINFO",
      line2: "CYBER",
      line3: "SECURITY",
      terminal: [
        "pentest autorizado",
        "auditoría digital",
        "antifraude y trazabilidad",
        "conectividad segura",
        "websites y hosting seguro"
      ],
      desc: "Especialistas en Ciberseguridad, Pentest Autorizado, Antifraude, Desarrollo de Websites, Hosting y Conectividad Segura desde 2012.",
      cta1: "Solicitar Pentest Gratuito",
      cta2: "Ver Servicios",
      stat1lbl: "Años de Mercado",
      stat2lbl: "Tasa de Detección",
      stat3lbl: "Proyectos",
      stat4lbl: "Monitoreo"
    },
    about: {
      eyebrow: "Línea de tiempo",
      title: "Trayectoria de Innovación y Seguridad",
      name: "Jefferson Boaventura da Silva",
      role: "Fundador y Director Técnico",
      linkedin: "linkedin.com/in/jefferson-boaventura-aa13a11b9",
      bio1: "Experto técnico multidisciplinar con amplia experiencia práctica en Telecomunicaciones, Mecatrónica, Ciberseguridad, Antifraude, Trazabilidad y Conectividad Segura.",
      bio2: "Fundador de Telinfo en 2012 en São José dos Campos/SP y creador de ValeMovel Tecnologia, la primera MVNO del Vale do Paraíba.",
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
        { year: "2024", title: "Referencia Técnica", text: "CFTV, IoT, OT/IT, conectividad segura y seguridad empresarial." }
      ]
    },
    services: {
      tag: "Servicios",
      title: "Protección Digital",
      titleHighlight: "Completa",
      desc: "Soluciones técnicas para proteger, auditar y fortalecer su operación."
    },
    cases: {
      tag: "Casos",
      title: "Casos de",
      titleHighlight: "Éxito",
      desc: "Proyectos relevantes en telecomunicaciones, seguridad, antifraude, infraestructura y conectividad.",
      challenge: "Desafío",
      solution: "Solución",
      result: "Resultado"
    },
    contact: {
      tag: "Contacto",
      title: "Hable con",
      titleHighlight: "Telinfo",
      desc: "Solicite una evaluación técnica para su empresa.",
      successTitle: "Mensaje enviado con éxito",
      successDesc: "Recibimos su solicitud y pronto entraremos en contacto.",
      name: "Nombre",
      email: "Email",
      company: "Empresa",
      phone: "Teléfono",
      service: "Servicio",
      message: "Mensaje",
      lgpd: "Sus datos serán usados solo para contacto comercial y técnico.",
      sending: "Enviando...",
      submit: "Enviar solicitud"
    },
    footer: {
      rights: "Todos los derechos reservados",
      founded: "Fundada en 2012"
    }
  }
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

  return React.createElement(I18nContext.Provider, { value }, children);
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