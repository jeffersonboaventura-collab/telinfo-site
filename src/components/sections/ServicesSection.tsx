"use client";
import { useRef, useEffect, useState, RefObject } from "react";
import { Search, Eye, AlertTriangle, Crosshair, Network, Camera, Cpu, BarChart3, Code2, Server } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FiberHandle, useFiberNav } from "../FiberOpticTransition";

const SERVICES = [
  { icon:Search,       title:"Pentest Autorizado",        desc:"Testes de invasÃ£o (black, grey, white box) em redes, apps web/mobile e APIs. RelatÃ³rio executivo + tÃ©cnico com plano de remediaÃ§Ã£o.",                        color:"#00f5ff", tag:"CYBERSEC",  highlight:false },
  { icon:Eye,          title:"Auditoria Digital",          desc:"AnÃ¡lise da postura de seguranÃ§a: polÃ­ticas, acessos, criptografia e conformidade. Roadmap de remediaÃ§Ã£o priorizado por criticidade.",                          color:"#4499ff", tag:"AUDIT",     highlight:false },
  { icon:AlertTriangle,title:"Antifraude Digital",         desc:"Sistemas ML para detecÃ§Ã£o e prevenÃ§Ã£o de fraudes digitais com anÃ¡lise comportamental e alertas em tempo real.",                                                color:"#7b2fff", tag:"ANTIFRAUD", highlight:false },
  { icon:Crosshair,    title:"Rastreabilidade & OSINT",    desc:"Monitoramento de ativos digitais, trilha de auditoria completa, inteligÃªncia de fontes abertas e anÃ¡lise forense digital.",                                    color:"#00ff88", tag:"TRACKING",  highlight:false },
  { icon:Network,      title:"Conectividade Segura",       desc:"VPN corporativa, SD-WAN, segmentaÃ§Ã£o de rede e infraestrutura de alta disponibilidade com criptografia ponta a ponta.",                                        color:"#ff9900", tag:"CONNECT",   highlight:false },
  { icon:Camera,       title:"CFTV & SeguranÃ§a FÃ­sica",    desc:"CÃ¢meras IP 4K, reconhecimento facial, controle de acesso inteligente e monitoramento perimetral integrado 24/7.",                                              color:"#ff00aa", tag:"CFTV",      highlight:false },
  { icon:Cpu,          title:"SeguranÃ§a IoT/OT",           desc:"ProteÃ§Ã£o de dispositivos IoT, redes industriais OT/IT, ICS/SCADA e ambientes crÃ­ticos de manufatura contra ameaÃ§as avanÃ§adas.",                                color:"#00ffff", tag:"IOT",       highlight:false },
  { icon:BarChart3,    title:"InteligÃªncia TÃ©cnica",       desc:"Threat hunting, CTI, monitoramento da dark web e suporte estratÃ©gico para CISOs e C-level.",                                                                   color:"#ffcc00", tag:"INTEL",     highlight:false },
  { icon:Code2,        title:"Desenvolvimento de Websites", desc:"Sites institucionais, landing pages e sistemas web modernos com foco em performance, SEO e conversÃ£o. Stack premium: Next.js, React, TypeScript.",             color:"#00ff88", tag:"WEB DEV",   highlight:true },
  { icon:Server,       title:"Hospedagem & Desempenho",    desc:"Infraestrutura cloud de alta disponibilidade, CDN global, SSL gratuito e monitoramento 24/7. Seu site rÃ¡pido, seguro e sempre no ar em qualquer paÃ­s.",       color:"#4499ff", tag:"HOSTING",   highlight:true },
];

function useVis() {
  const ref=useRef<HTMLDivElement>(null);const[vis,setVis]=useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:.06});obs.observe(el);return()=>obs.disconnect();},[]);
  return{ref,vis};
}

function Card({s,index}:{s:typeof SERVICES[0];index:number}){
  const{ref,vis}=useVis();const Icon=s.icon;const[hov,setHov]=useState(false);
  return(
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="neon-card p-5 cursor-default relative"
      style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(28px)",
        transition:`opacity 0.5s ${(index%5)*.07}s,transform 0.5s ${(index%5)*.07}s`,
        borderColor:hov?`${s.color}40`:s.highlight?`${s.color}22`:undefined,
        boxShadow:hov?`0 12px 36px rgba(0,0,0,.7),0 0 22px ${s.color}14`:undefined}}>
      {s.highlight&&(
        <span className="absolute top-3 right-3"
          style={{fontFamily:"var(--font-mono)",fontSize:"0.52rem",padding:"2px 6px",borderRadius:3,
            color:s.color,background:`${s.color}18`,border:`1px solid ${s.color}35`,letterSpacing:"0.15em"}}>
          NOVO
        </span>
      )}
      <div className="w-10 h-10 rounded flex items-center justify-center mb-4 transition-all duration-300"
        style={{background:`${s.color}12`,border:`1px solid ${s.color}25`,transform:hov?"scale(1.1)":"scale(1)"}}>
        <Icon className="w-5 h-5" style={{color:s.color}} />
      </div>
      <h3 className="text-white mb-2" style={{fontFamily:"var(--font-orbitron)",fontSize:"0.8rem",fontWeight:600}}>{s.title}</h3>
      <p style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.5)",lineHeight:1.65,marginBottom:12}}>{s.desc}</p>
      <span style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",padding:"3px 7px",borderRadius:3,
        letterSpacing:"0.12em",color:s.color,background:`${s.color}10`,border:`1px solid ${s.color}20`}}>{s.tag}</span>
    </div>
  );
}

interface Props{fiberRef:RefObject<FiberHandle|null>}
export default function ServicesSection({fiberRef}:Props){
  const{t}=useI18n();const{navigate}=useFiberNav(fiberRef);const{ref,vis}=useVis();
  return(
    <section id="services" className="relative py-24 md:py-32 overflow-hidden" style={{background:"rgba(5,13,26,0.55)"}}>
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 70% 50% at 100% 0%,rgba(123,47,255,0.05),transparent)"}} />
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 lg:px-8">
        <div className="mb-14" style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)",transition:"all 0.6s"}}>
          <div className="section-tag">â—ˆ {t.services.tag}</div>
          <h2 style={{fontFamily:"var(--font-orbitron)",fontWeight:700,fontSize:"clamp(1.6rem,4vw,2.5rem)",color:"#fff"}}>
            {t.services.title} <span className="gradient-text">{t.services.titleHighlight}</span>
          </h2>
          <div className="neon-divider"/>
          <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.5)",maxWidth:560,lineHeight:1.7}}>{t.services.desc}</p>
        </div>

        {/* SeguranÃ§a â€” 8 cards */}
        <div className="mb-4" style={{opacity:vis?1:0,transition:"opacity 0.5s 0.1s"}}>
          <div style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:"rgba(0,245,255,0.5)",letterSpacing:"0.2em",marginBottom:12}}>
            â—ˆ CIBERSEGURANÃ‡A & INFRAESTRUTURA
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.slice(0,8).map((s,i)=><Card key={s.title} s={s} index={i}/>)}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8" style={{height:1,background:"linear-gradient(90deg,transparent,rgba(0,255,136,0.25),transparent)"}}/>

        {/* Web Dev + Hosting */}
        <div style={{opacity:vis?1:0,transition:"opacity 0.5s 0.3s"}}>
          <div style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:"rgba(0,255,136,0.5)",letterSpacing:"0.2em",marginBottom:12}}>
            â—ˆ DESENVOLVIMENTO WEB & HOSPEDAGEM
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.slice(8).map((s,i)=><Card key={s.title} s={s} index={i}/>)}
          </div>
        </div>

        <div className="mt-12 flex justify-center" style={{opacity:vis?1:0,transition:"opacity 0.6s 0.5s"}}>
          <button className="btn-cyber" onClick={()=>navigate("#contact")}>
            <Search className="w-4 h-4"/><span>SOLICITAR AVALIAÃ‡ÃƒO GRATUITA â†’</span>
          </button>
        </div>
      </div>
    </section>
  );
}


