"use client";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, MapPin, Clock, Linkedin, Phone,
  Send, CheckCircle2, AlertCircle, Loader2, MessageSquare,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const schema = z.object({
  name:    z.string().min(3,"MÃ­nimo 3 caracteres").max(80),
  email:   z.string().email("E-mail invÃ¡lido"),
  phone:   z.string().optional(),
  company: z.string().max(80).optional(),
  service: z.string().min(1,"Selecione um serviÃ§o"),
  message: z.string().min(20,"MÃ­nimo 20 caracteres").max(2000),
  _hp:     z.string().max(0).optional(),
});
type FormData = z.infer<typeof schema>;

const SVCS = [
  "Pentest Autorizado","Auditoria Digital","Antifraude Digital",
  "Rastreabilidade & OSINT","Conectividade Segura","CFTV & SeguranÃ§a FÃ­sica",
  "SeguranÃ§a IoT/OT","InteligÃªncia TÃ©cnica",
  "Desenvolvimento de Website","Hospedagem & Desempenho",
  "Consultoria / Outros",
];

const WA_BR = "5512981279877";
const WA_US = "16893225055";
const WA_MSG = encodeURIComponent("OlÃ¡! Vim pelo site da Telinfo e gostaria de uma avaliaÃ§Ã£o gratuita.");

function useVis(){
  const ref=useRef<HTMLDivElement>(null);const[vis,setVis]=useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:.1});obs.observe(el);return()=>obs.disconnect();},[]);
  return{ref,vis};
}

// â”€â”€â”€ PaÃ­ses atendidos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const COUNTRIES = [
  { flag:"ðŸ‡§ðŸ‡·", name:"Brasil" },
  { flag:"ðŸ‡ºðŸ‡¸", name:"Estados Unidos" },
  { flag:"ðŸ‡¨ðŸ‡¦", name:"CanadÃ¡" },
  { flag:"ðŸ‡¬ðŸ‡§", name:"Reino Unido" },
];

export default function ContactSection(){
  const{t}=useI18n();const{ref,vis}=useVis();
  const[status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");
  const{register,handleSubmit,reset,formState:{errors}}=useForm<FormData>({resolver:zodResolver(schema)});

  const onSubmit=async(data:FormData)=>{
    if(data._hp)return;
    setStatus("loading");
    try{
      const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      if(!r.ok)throw new Error();
      setStatus("success");reset();
    }catch{setStatus("error");}
  };

  const labelStyle = {
    fontFamily:"var(--font-mono)",fontSize:"0.6rem",
    color:"rgba(255,255,255,0.4)",letterSpacing:"0.12em",
    display:"block" as const,marginBottom:6,
  };

  return(
    <section id="contact" className="relative py-24 md:py-32 bg-[#020408]">
      <div className="absolute inset-0 pointer-events-none"
        style={{background:"radial-gradient(ellipse 65% 50% at 50% 100%,rgba(0,245,255,0.05),transparent)"}}/>

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-14" style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(24px)",transition:"all 0.6s"}}>
          <div className="section-tag">â—ˆ {t.contact.tag}</div>
          <h2 style={{fontFamily:"var(--font-orbitron)",fontWeight:700,fontSize:"clamp(1.6rem,4vw,2.5rem)",color:"#fff"}}>
            {t.contact.title} {t.contact.titleHighlight&&<span className="gradient-text">{t.contact.titleHighlight}</span>}
          </h2>
          <div className="neon-divider"/>
          <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.5)",maxWidth:500,lineHeight:1.7}}>{t.contact.desc}</p>

          {/* PaÃ­ses atendidos */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <span style={{fontFamily:"var(--font-mono)",fontSize:"0.6rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.15em"}}>
              ATENDEMOS:
            </span>
            {COUNTRIES.map(c=>(
              <div key={c.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded"
                style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
                <span style={{fontSize:"1rem"}}>{c.flag}</span>
                <span style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:"rgba(255,255,255,0.55)"}}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.7fr] gap-10 items-start">

          {/* â”€â”€ Coluna de informaÃ§Ãµes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="space-y-3"
            style={{opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(-24px)",transition:"all 0.7s 0.1s"}}>

            {/* Email */}
            <div className="flex items-start gap-4 p-4 rounded transition-all"
              style={{background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.05)"}}>
              <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{background:"rgba(0,245,255,0.1)",border:"1px solid rgba(0,245,255,0.25)"}}>
                <Mail className="w-4 h-4" style={{color:"#00f5ff"}}/>
              </div>
              <div className="min-w-0">
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.28)",letterSpacing:"0.12em",marginBottom:2}}>E-MAIL</div>
                <a href="mailto:contato@telinfo.com.br" className="text-white" style={{fontSize:"0.85rem",fontWeight:500,textDecoration:"none"}}>
                  contato@telinfo.com.br
                </a>
                <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)"}}>Resposta em atÃ© 2 horas Ãºteis</div>
              </div>
            </div>

            {/* Telefone Brasil */}
            <a href="tel:+5512981279877"
              className="flex items-start gap-4 p-4 rounded transition-all"
              style={{background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.05)",textDecoration:"none",display:"flex"}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(0,245,255,0.2)")}
              onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.05)")}>
              <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{background:"rgba(0,255,136,0.1)",border:"1px solid rgba(0,255,136,0.25)"}}>
                <Phone className="w-4 h-4" style={{color:"#00ff88"}}/>
              </div>
              <div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.28)",letterSpacing:"0.12em",marginBottom:2}}>
                  TELEFONE BRASIL ðŸ‡§ðŸ‡·
                </div>
                <div className="text-white" style={{fontSize:"0.88rem",fontWeight:600}}>+55 12 98127-9877</div>
                <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)"}}>WhatsApp & LigaÃ§Ãµes</div>
              </div>
            </a>

            {/* Telefone EUA/CA/UK */}
            <a href="tel:+16893225055"
              className="flex items-start gap-4 p-4 rounded transition-all"
              style={{background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.05)",textDecoration:"none",display:"flex"}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(68,153,255,0.3)")}
              onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.05)")}>
              <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{background:"rgba(68,153,255,0.1)",border:"1px solid rgba(68,153,255,0.25)"}}>
                <Phone className="w-4 h-4" style={{color:"#4499ff"}}/>
              </div>
              <div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.28)",letterSpacing:"0.12em",marginBottom:2}}>
                  USA / CANADA / UK ðŸ‡ºðŸ‡¸ ðŸ‡¨ðŸ‡¦ ðŸ‡¬ðŸ‡§
                </div>
                <div className="text-white" style={{fontSize:"0.88rem",fontWeight:600}}>+1 689 322 5055</div>
                <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)"}}>WhatsApp & Calls</div>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jefferson-boaventura-aa13a11b9"
              target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded transition-all"
              style={{background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.05)",textDecoration:"none",display:"flex"}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(68,153,255,0.3)")}
              onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.05)")}>
              <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{background:"rgba(68,153,255,0.1)",border:"1px solid rgba(68,153,255,0.25)"}}>
                <Linkedin className="w-4 h-4" style={{color:"#4499ff"}}/>
              </div>
              <div className="min-w-0">
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.28)",letterSpacing:"0.12em",marginBottom:2}}>LINKEDIN</div>
                <div className="text-white" style={{fontSize:"0.82rem",fontWeight:500}}>Jefferson Boaventura da Silva</div>
                <div className="truncate" style={{fontSize:"0.68rem",color:"#4499ff"}}>linkedin.com/in/jefferson-boaventura-aa13a11b9</div>
              </div>
            </a>

            {/* LocalizaÃ§Ã£o */}
            <div className="flex items-start gap-4 p-4 rounded"
              style={{background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.05)"}}>
              <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{background:"rgba(123,47,255,0.1)",border:"1px solid rgba(123,47,255,0.25)"}}>
                <MapPin className="w-4 h-4" style={{color:"#7b2fff"}}/>
              </div>
              <div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.28)",letterSpacing:"0.12em",marginBottom:2}}>LOCALIZAÃ‡ÃƒO</div>
                <div className="text-white" style={{fontSize:"0.85rem",fontWeight:500}}>SÃ£o JosÃ© dos Campos, SP â€” Brasil</div>
                <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)"}}>Atendimento global: BR, EUA, CA, UK</div>
              </div>
            </div>

            {/* WhatsApp Brasil */}
            <a href={`https://wa.me/${WA_BR}?text=${WA_MSG}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3 rounded transition-all duration-300"
              style={{fontFamily:"var(--font-orbitron)",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.08em",color:"#00ff88",
                border:"1px solid rgba(0,255,136,0.28)",background:"rgba(0,255,136,0.04)",textDecoration:"none"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(0,255,136,0.09)";(e.currentTarget as HTMLElement).style.boxShadow="0 0 18px rgba(0,255,136,0.14)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(0,255,136,0.04)";(e.currentTarget as HTMLElement).style.boxShadow="";}}>
              <MessageSquare className="w-4 h-4"/>
              ðŸ‡§ðŸ‡· WHATSAPP BRASIL â€” +55 12 98127-9877
            </a>

            {/* WhatsApp EUA */}
            <a href={`https://wa.me/${WA_US}?text=${WA_MSG}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3 rounded transition-all duration-300"
              style={{fontFamily:"var(--font-orbitron)",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.08em",color:"#4499ff",
                border:"1px solid rgba(68,153,255,0.28)",background:"rgba(68,153,255,0.04)",textDecoration:"none"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(68,153,255,0.09)";(e.currentTarget as HTMLElement).style.boxShadow="0 0 18px rgba(68,153,255,0.14)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(68,153,255,0.04)";(e.currentTarget as HTMLElement).style.boxShadow="";}}>
              <MessageSquare className="w-4 h-4"/>
              ðŸ‡ºðŸ‡¸ WHATSAPP USA/CA/UK â€” +1 689 322 5055
            </a>
          </div>

          {/* â”€â”€ FormulÃ¡rio â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="neon-card overflow-hidden"
            style={{opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(24px)",transition:"all 0.7s 0.15s"}}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{background:"linear-gradient(90deg,transparent,#00f5ff,transparent)"}}/>
            <div className="p-6 md:p-8">
              {/* Form header */}
              <div className="flex items-center gap-2.5 mb-6 pb-4" style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <div className="w-2 h-2 rounded-full bg-green-400" style={{animation:"pulse-neon 2s infinite"}}/>
                <span style={{fontFamily:"var(--font-mono)",fontSize:"0.6rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.12em"}}>
                  SECURE_FORM v2.1 â€” ENCRYPTED
                </span>
              </div>

              {status==="success"?(
                <div className="flex flex-col items-center text-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{border:"2px solid rgba(0,255,136,0.4)",background:"rgba(0,255,136,0.07)"}}>
                    <CheckCircle2 className="w-7 h-7" style={{color:"#00ff88"}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:"var(--font-orbitron)",fontSize:"1rem",fontWeight:700,color:"#fff",marginBottom:8}}>
                      {t.contact.successTitle}
                    </div>
                    <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.5)"}}>{t.contact.successDesc}</p>
                  </div>
                  <button onClick={()=>setStatus("idle")}
                    style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:"#00f5ff",marginTop:8}}>
                    â† Enviar outra mensagem
                  </button>
                </div>
              ):(
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input {...register("_hp")} aria-hidden="true" tabIndex={-1} style={{display:"none"}}/>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>{t.contact.name}</label>
                      <input {...register("name")} placeholder="Seu nome completo" className="field"
                        style={errors.name?{borderColor:"rgba(255,60,60,0.45)"}:{}}/>
                      {errors.name&&<p className="flex items-center gap-1 mt-1" style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",color:"rgba(255,100,100,0.8)"}}>
                        <AlertCircle className="w-3 h-3"/>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>{t.contact.email}</label>
                      <input {...register("email")} type="email" placeholder="seu@empresa.com" className="field"
                        style={errors.email?{borderColor:"rgba(255,60,60,0.45)"}:{}}/>
                      {errors.email&&<p className="flex items-center gap-1 mt-1" style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",color:"rgba(255,100,100,0.8)"}}>
                        <AlertCircle className="w-3 h-3"/>{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>{t.contact.company}</label>
                      <input {...register("company")} placeholder="Nome da empresa" className="field"/>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.contact.phone}</label>
                      <input {...register("phone")} type="tel" placeholder="+55 12 98127-9877" className="field"/>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>{t.contact.service}</label>
                    <select {...register("service")} defaultValue="" className="field"
                      style={errors.service?{borderColor:"rgba(255,60,60,0.45)"}:{}}>
                      <option value="" disabled>Selecione o serviÃ§o...</option>
                      {SVCS.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                    {errors.service&&<p className="flex items-center gap-1 mt-1" style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",color:"rgba(255,100,100,0.8)"}}>
                      <AlertCircle className="w-3 h-3"/>{errors.service.message}</p>}
                  </div>

                  <div>
                    <label style={labelStyle}>{t.contact.message}</label>
                    <textarea {...register("message")} rows={4} placeholder={t.contact.messagePh}
                      className="field resize-none" style={errors.message?{borderColor:"rgba(255,60,60,0.45)"}:{}}/>
                    {errors.message&&<p className="flex items-center gap-1 mt-1" style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",color:"rgba(255,100,100,0.8)"}}>
                      <AlertCircle className="w-3 h-3"/>{errors.message.message}</p>}
                  </div>

                  <p style={{fontFamily:"var(--font-mono)",fontSize:"0.57rem",color:"rgba(255,255,255,0.25)",lineHeight:1.6}}>
                    {t.contact.lgpd}
                  </p>

                  {status==="error"&&(
                    <div className="flex items-center gap-2"
                      style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:"rgba(255,100,100,0.8)"}}>
                      <AlertCircle className="w-3.5 h-3.5"/>
                      Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
                    </div>
                  )}

                  <button type="submit" disabled={status==="loading"} className="btn-cyber w-full justify-center"
                    style={{opacity:status==="loading"?.65:1,cursor:status==="loading"?"not-allowed":"pointer"}}>
                    {status==="loading"?<Loader2 className="w-4 h-4 animate-spin"/>:<Send className="w-4 h-4"/>}
                    <span>{status==="loading"?t.contact.sending:t.contact.submit}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




