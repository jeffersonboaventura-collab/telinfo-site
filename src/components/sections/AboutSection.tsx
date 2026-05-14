"use client";
import { useRef, useEffect, useState } from "react";
import { Linkedin, Award, Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const TIMELINE = [
  { year:"2012", title:"FundaÃ§Ã£o da Telinfo",          desc:"Jefferson Boaventura funda a Telinfo em SÃ£o JosÃ© dos Campos/SP como provedora de internet para empresas e residÃªncias no Vale do ParaÃ­ba.", color:"#00f5ff" },
  { year:"2015", title:"ExpansÃ£o Regional",            desc:"Crescimento da rede de conectividade para mÃºltiplas cidades do Vale do ParaÃ­ba, consolidando parceiros corporativos estratÃ©gicos.",          color:"#4499ff" },
  { year:"2016", title:"ValeMovel â€” 1Âª MVNO da RegiÃ£o ðŸ†", desc:"CriaÃ§Ã£o da ValeMovel Tecnologia, a primeira MVNO do Vale do ParaÃ­ba. Marco histÃ³rico em inovaÃ§Ã£o regulatÃ³ria e tÃ©cnica.", color:"#7b2fff", highlight:true },
  { year:"2019", title:"PivÃ´ para CiberseguranÃ§a",     desc:"Identificando a crescente demanda por seguranÃ§a digital, Jefferson lidera a transiÃ§Ã£o para serviÃ§os especializados em ciberseguranÃ§a.",  color:"#ffcc00" },
  { year:"2022", title:"PortfÃ³lio Especializado",      desc:"ConsolidaÃ§Ã£o em Pentest, Antifraude, Rastreabilidade e InteligÃªncia TÃ©cnica com metodologias internacionais (OWASP, NIST, ISO 27001).",   color:"#00ff88" },
  { year:"2024", title:"LideranÃ§a Nacional â—‰",         desc:"ReferÃªncia nacional em ciberseguranÃ§a com equipe multidisciplinar, atuando em CFTV, IoT, OT/IT e seguranÃ§a empresarial de todos os portes.", color:"#ff00aa", active:true },
];
const TAGS = [{label:"Pentest",color:"#00f5ff"},{label:"TelecomunicaÃ§Ãµes",color:"#4499ff"},{label:"MecatrÃ´nica",color:"#7b2fff"},{label:"Antifraude",color:"#00ff88"},{label:"MVNO",color:"#ff9900"},{label:"Redes OT/IT",color:"#ff00aa"},{label:"LGPD",color:"#ffcc00"},{label:"IoT Security",color:"#00ffff"}];

function useVis(threshold=0.15) {
  const ref=useRef<HTMLDivElement>(null); const [vis,setVis]=useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold});obs.observe(el);return()=>obs.disconnect();},[threshold]);
  return {ref,vis};
}

function TLItem({item,index}:{item:typeof TIMELINE[0];index:number}) {
  const {ref,vis}=useVis();
  return (
    <div ref={ref} className="relative pl-9 pb-6 last:pb-0" style={{opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(20px)",transition:`opacity 0.5s ${index*.08}s,transform 0.5s ${index*.08}s`}}>
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center z-10"
        style={{borderColor:item.color,background:item.active?item.color:"#020408",boxShadow:(item.highlight||item.active)?`0 0 12px ${item.color}60`:"none"}}>
        {item.active&&<div className="w-1.5 h-1.5 rounded-full" style={{background:"#020408",animation:"pulse-neon 1.5s infinite"}} />}
      </div>
      <span style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:item.color,letterSpacing:"0.1em",marginBottom:4,display:"block"}}>{item.year}</span>
      <div className="font-bold text-white mb-1.5" style={{fontFamily:"var(--font-orbitron)",fontSize:"0.8rem",color:item.highlight?item.color:"#fff"}}>{item.title}</div>
      <p style={{fontSize:"0.77rem",color:"rgba(255,255,255,0.5)",lineHeight:1.65}}>{item.desc}</p>
      {item.highlight&&<div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded" style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",color:item.color,background:`${item.color}10`,border:`1px solid ${item.color}28`}}><Award className="w-3 h-3" />INOVAÃ‡ÃƒO HISTÃ“RICA REGIONAL</div>}
    </div>
  );
}

export default function AboutSection() {
  const {t}=useI18n(); const {ref,vis}=useVis(0.1);
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#020408] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 60% 40% at 0% 50%,rgba(0,245,255,0.04),transparent)"}} />
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 lg:px-8">
        <div className="mb-14" style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)",transition:"all 0.6s"}}>
          <div className="section-tag">â—ˆ {t.about.tag}</div>
          <h2 style={{fontFamily:"var(--font-orbitron)",fontWeight:700,fontSize:"clamp(1.6rem,4vw,2.5rem)",color:"#fff"}}>
            {t.about.title} <span className="gradient-text">{t.about.titleHighlight}</span> {t.about.titleEnd}
          </h2>
          <div className="neon-divider" />
        </div>
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-12 lg:gap-16 items-start">
          {/* Founder */}
          <div style={{opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(-30px)",transition:"all 0.7s 0.1s"}}>
            <div className="neon-card p-6 mb-4">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 rounded border border-cyan-500/30 flex items-center justify-center flex-shrink-0"
                  style={{fontFamily:"var(--font-orbitron)",fontSize:"1.6rem",fontWeight:700,color:"#00f5ff",background:"linear-gradient(135deg,rgba(0,245,255,0.08),rgba(123,47,255,0.08))"}}>JB</div>
                <div>
                  <div style={{fontFamily:"var(--font-orbitron)",fontSize:"0.9rem",fontWeight:700,color:"#fff",marginBottom:3}}>Jefferson Boaventura da Silva</div>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:"#00f5ff",letterSpacing:"0.15em",marginBottom:8}}>{t.about.role}</div>
                  <a href="https://www.linkedin.com/in/jefferson-boaventura-aa13a11b9" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5" style={{fontFamily:"var(--font-mono)",fontSize:"0.6rem",color:"#4499ff"}}>
                    <Linkedin className="w-3 h-3" />linkedin.com/in/jefferson-boaventura-aa13a11b9
                  </a>
                </div>
              </div>
              <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",lineHeight:1.72,marginBottom:12}}>{t.about.bio1}</p>
              <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",lineHeight:1.72,marginBottom:16}}>{t.about.bio2}</p>
              <div className="flex flex-wrap gap-1.5">
                {TAGS.map((tag)=>(
                  <span key={tag.label} style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",padding:"3px 8px",borderRadius:3,color:tag.color,background:`${tag.color}10`,border:`1px solid ${tag.color}25`}}>{tag.label}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="neon-card p-4 text-center">
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.3)",marginBottom:4,letterSpacing:"0.1em"}}>FUNDAÃ‡ÃƒO</div>
                <div style={{fontFamily:"var(--font-orbitron)",fontSize:"1.3rem",fontWeight:700,color:"#00f5ff"}}>2012</div>
                <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)"}}>SÃ£o JosÃ© dos Campos, SP</div>
              </div>
              <div className="neon-card p-4 text-center" style={{borderColor:"rgba(123,47,255,0.2)",background:"rgba(123,47,255,0.05)"}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.3)",marginBottom:4,letterSpacing:"0.1em"}}>DESTAQUE</div>
                <div style={{fontFamily:"var(--font-orbitron)",fontSize:"1rem",fontWeight:700,color:"#7b2fff"}}>1Âª MVNO</div>
                <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)"}}>Vale do ParaÃ­ba</div>
              </div>
            </div>
            <div className="neon-card mt-3 p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{background:"rgba(0,245,255,0.08)",border:"1px solid rgba(0,245,255,0.18)"}}>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}}>E-MAIL</div>
                <div className="text-white" style={{fontSize:"0.85rem"}}>contato@telinfo.com.br</div>
              </div>
            </div>
          </div>
          {/* Timeline */}
          <div style={{opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(30px)",transition:"all 0.7s 0.15s"}}>
            <div style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.2em",marginBottom:20}}>â—ˆ {t.about.timeline}</div>
            <div className="relative pl-0">
              <div className="absolute left-1.5 top-2 bottom-2 w-px" style={{background:"linear-gradient(180deg,#00f5ff,#7b2fff,rgba(255,0,170,0.3),transparent)"}} />
              {TIMELINE.map((item,i)=><TLItem key={item.year} item={item} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

