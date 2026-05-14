"use client";
import { useRef, useEffect, useState } from "react";
import { AlertOctagon, Lightbulb, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const CASES = [
  { id:"01",color:"#00f5ff",sector:"SETOR FINANCEIRO",title:"Instituição Financeira — Vale do Paraíba, SP",
    challenge:"Alta incidência de fraudes em transações digitais, com prejuízos mensais de 6 dígitos. Sistema legado sem monitoramento e sem análise comportamental.",
    solution:"Sistema antifraude ML + pentest black/white box da plataforma bancária digital, incluindo APIs de pagamento e módulos de autenticação.",
    result:"98% de redução em fraudes",resultSub:"ROI positivo em 60 dias. Zero incidentes críticos nos 12 meses seguintes.",
    metrics:[{l:"Fraudes",v:"−98%"},{l:"ROI",v:"60d"},{l:"Vulns",v:"47"}],tags:["Antifraude","Pentest","ML","FinTech"]},
  { id:"02",color:"#7b2fff",sector:"INDÚSTRIA 4.0",title:"Manufatura de Alta Precisão — São José dos Campos, SP",
    challenge:"Rede OT/IT sem segmentação adequada com CHs de produção expostos. Risco crítico de ransomware e espionagem industrial.",
    solution:"Segmentação completa OT/IT, NGFW industrial, SOC 24/7 com alertas em tempo real e programa de conscientização para 200+ colaboradores.",
    result:"Zero incidentes em 18 meses",resultSub:"100% das tentativas de invasão bloqueadas. Conformidade com ISO 27001.",
    metrics:[{l:"Incidentes",v:"0"},{l:"Uptime",v:"99.9%"},{l:"Equipe",v:"200+"}],tags:["OT/IT","ICS/SCADA","SOC 24/7","Manufatura"]},
  { id:"03",color:"#00ff88",sector:"VAREJO & LGPD",title:"Rede de Varejo Regional — 28 Unidades, Sudeste",
    challenge:"28 unidades sem política de segurança unificada. Dados de clientes sem criptografia adequada, iminência de multa ANPD por não conformidade com a LGPD.",
    solution:"Auditoria completa nas 28 unidades, SIEM centralizado, política corporativa de segurança e programa completo de conformidade LGPD.",
    result:"Conformidade LGPD em 60 dias",resultSub:"Visibilidade total de 28 unidades em um único painel. Redução de 85% no MTTR.",
    metrics:[{l:"Unidades",v:"28"},{l:"Prazo",v:"60d"},{l:"MTTR",v:"−85%"}],tags:["LGPD","SIEM","Auditoria","Varejo"]},
];

function useVis(){
  const ref=useRef<HTMLDivElement>(null);const[vis,setVis]=useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:.1});obs.observe(el);return()=>obs.disconnect();},[]);
  return{ref,vis};
}

function CaseCard({c,index}:{c:typeof CASES[0];index:number}){
  const{ref,vis}=useVis();const t=useI18n().t;
  return(
    <div ref={ref} className="relative rounded bg-[#0a0f1e] overflow-hidden"
      style={{border:"1px solid rgba(255,255,255,0.06)",borderLeft:`3px solid ${c.color}`,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(32px)",transition:`opacity 0.55s ${index*.1}s,transform 0.55s ${index*.1}s`}}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,${c.color},transparent)`}} />
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <span style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",color:c.color,letterSpacing:"0.2em",marginBottom:6,display:"block"}}>◈ {c.sector}</span>
            <div style={{fontFamily:"var(--font-mono)",fontSize:"2rem",fontWeight:900,color:`${c.color}0e`,lineHeight:1,marginBottom:6}}>{c.id}</div>
            <h3 style={{fontFamily:"var(--font-orbitron)",fontSize:"0.9rem",fontWeight:700,color:"#fff"}}>{c.title}</h3>
          </div>
          <div className="flex gap-4">
            {c.metrics.map((m)=>(
              <div key={m.l} className="text-center">
                <div style={{fontFamily:"var(--font-orbitron)",fontSize:"1.1rem",fontWeight:900,color:c.color}}>{m.v}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.55rem",color:"rgba(255,255,255,0.35)",marginTop:2}}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {[
            {Icon:AlertOctagon,label:t.cases.challenge,color:"rgba(255,76,76,0.8)",text:c.challenge,result:null,sub:null},
            {Icon:Lightbulb,label:t.cases.solution,color:"rgba(0,245,255,0.8)",text:c.solution,result:null,sub:null},
            {Icon:TrendingUp,label:t.cases.result,color:"rgba(0,255,136,0.8)",text:null,result:c.result,sub:c.resultSub},
          ].map((col,i)=>{const{Icon}=col;return(
            <div key={i}>
              <div className="flex items-center gap-1.5 mb-2" style={{fontFamily:"var(--font-mono)",fontSize:"0.6rem",color:col.color,letterSpacing:"0.15em"}}><Icon className="w-3 h-3" />{col.label}</div>
              {col.text?(<p style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.5)",lineHeight:1.65}}>{col.text}</p>):(
                <><div style={{fontFamily:"var(--font-orbitron)",fontSize:"0.9rem",fontWeight:700,color:c.color,marginBottom:6}}>{col.result}</div><p style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6}}>{col.sub}</p></>
              )}
            </div>
          );})}
        </div>
        <div className="flex flex-wrap gap-2">
          {c.tags.map((tag)=>(<span key={tag} style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",padding:"3px 9px",borderRadius:3,letterSpacing:"0.1em",color:c.color,background:`${c.color}0e`,border:`1px solid ${c.color}28`}}>{tag}</span>))}
        </div>
      </div>
    </div>
  );
}

export default function CasesSection(){
  const{t}=useI18n();const{ref,vis}=useVis();
  return(
    <section id="cases" className="relative py-24 md:py-32" style={{background:"rgba(5,13,26,0.55)"}}>
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 55% 40% at 50% 100%,rgba(0,255,136,0.04),transparent)"}} />
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 lg:px-8">
        <div className="mb-14" style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)",transition:"all 0.6s"}}>
          <div className="section-tag">◈ {t.cases.tag}</div>
          <h2 style={{fontFamily:"var(--font-orbitron)",fontWeight:700,fontSize:"clamp(1.6rem,4vw,2.5rem)",color:"#fff"}}>
            {t.cases.title} <span className="gradient-text">{t.cases.titleHighlight}</span>
          </h2>
          <div className="neon-divider" />
          <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.5)",maxWidth:520,lineHeight:1.7}}>{t.cases.desc}</p>
        </div>
        <div className="flex flex-col gap-5">
          {CASES.map((c,i)=><CaseCard key={c.id} c={c} index={i} />)}
        </div>
        <p className="mt-8 text-center" style={{fontFamily:"var(--font-mono)",fontSize:"0.6rem",color:"rgba(255,255,255,0.2)",opacity:vis?1:0,transition:"opacity 0.6s 0.5s"}}>
          * Nomes omitidos por NDAs assinados. Referências disponíveis mediante solicitação.
        </p>
      </div>
    </section>
  );
}
