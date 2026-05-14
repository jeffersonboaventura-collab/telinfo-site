import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Telinfo Cyber Security — Pentest, Antifraude, Websites e Segurança Digital",
  description:
    "Especialistas em Segurança Cibernética, Pentest Autorizado, Auditoria Digital, Antifraude e Desenvolvimento de Websites. Atendemos Brasil, EUA, Canadá e Reino Unido. Fundada em 2012 por Jefferson Boaventura da Silva.",
  keywords: ["pentest","cibersegurança","antifraude","segurança digital","CFTV","IoT","desenvolvimento de sites","hospedagem"],
  openGraph: {
    title: "Telinfo Cyber Security",
    description: "Segurança cibernética premium e desenvolvimento de sites desde 2012.",
    url: "https://www.telinfo.com.br",
    siteName: "Telinfo Cyber Security",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning resolve o erro de hydration causado por
          extensões do browser (ex: LanguageTool) que injetam atributos no DOM */}
      <body suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
