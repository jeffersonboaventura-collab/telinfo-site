"use client";
import { useRef } from "react";
import FiberOpticTransition, { FiberHandle } from "@/components/FiberOpticTransition";
import Header          from "@/components/Header";
import WhatsAppButton  from "@/components/WhatsAppButton";
import HeroSection     from "@/components/sections/HeroSection";
import AboutSection    from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CasesSection    from "@/components/sections/CasesSection";
import ContactSection  from "@/components/sections/ContactSection";
import FooterSection   from "@/components/sections/FooterSection";

export default function HomePage() {
  const fiberRef = useRef<FiberHandle>(null);
  return (
    <>
      <FiberOpticTransition ref={fiberRef} />
      <Header fiberRef={fiberRef} />
      <main>
        <HeroSection    fiberRef={fiberRef} />
        <AboutSection />
        <ServicesSection fiberRef={fiberRef} />
        <CasesSection />
        <ContactSection />
      </main>
      <FooterSection />
      <WhatsAppButton />
    </>
  );
}
