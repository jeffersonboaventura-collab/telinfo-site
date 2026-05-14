"use client";
import { useEffect, useRef, useState, RefObject } from "react";
import { Lock, Terminal, ChevronDown, AlertTriangle, Shield, Activity, Globe, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FiberHandle, useFiberNav } from "../FiberOpticTransition";

function useTypewriter(phrases: string[], tSpeed = 55, dSpeed = 28, pause = 2600) {
  const [text, setText] = useState(""); const [idx, setIdx] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = phrases[idx]; let to: ReturnType<typeof setTimeout>;
    if (!del && text === cur) { to = setTimeout(() => setDel(true), pause); }
    else if (del && text === "") { setDel(false); setIdx((i) => (i + 1) % phrases.length); }
    else { to = setTimeout(() => setText(del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1)), del ? dSpeed : tSpeed); }
    return () => clearTimeout(to);
  }, [text, del, idx, phrases, tSpeed, dSpeed, pause]);
  return text;
}

function useCounter(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(2, -10 * t)) * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -999, y: -999 });
  const rafRef    = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const COLORS = ["#00f5ff","#7b2fff","#00ff88","#ff00aa","#4499ff"];
    let particles: { x:number;y:number;vx:number;vy:number;r:number;a:number;color:string }[] = [];
    const init = () => {
      canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
      const N = Math.floor((canvas.width * canvas.height) / 14000);
      particles = Array.from({ length: N }, () => ({
        x: Math.random()*canvas.width, y: Math.random()*canvas.height,
        vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
        r: Math.random()*1.3+.3, a: Math.random()*.55+.15,
        color: COLORS[Math.floor(Math.random()*COLORS.length)]
      }));
    };
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const {x:mx,y:my} = mouseRef.current;
      particles.forEach((p) => {
        const dx=mx-p.x, dy=my-p.y, d=Math.sqrt(dx*dx+dy*dy);
        if (d<160) { p.vx+=dx*.00005; p.vy+=dy*.00005; }
        const spd=Math.sqrt(p.vx*p.vx+p.vy*p.vy);
        if (spd>.9) { p.vx=p.vx/spd*.9; p.vy=p.vy/spd*.9; }
        p.x+=p.vx; p.y+=p.vy;
        if (p.x<0||p.x>canvas.width) p.vx*=-1;
        if (p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color; ctx.globalAlpha=p.a; ctx.fill();
      });
      ctx.globalAlpha=1;
      for (let i=0;i<particles.length;i++) for (let j=i+1;j<particles.length;j++) {
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if (d<90) { ctx.beginPath(); ctx.strokeStyle=particles[i].color; ctx.globalAlpha=(1-d/90)*.18; ctx.lineWidth=.5; ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    init(); draw();
    const onM = (e:MouseEvent) => { const r=canvas.getBoundingClientRect(); mouseRef.current={x:e.clientX-r.left,y:e.clientY-r.top}; };
    window.addEventListener("resize",init); canvas.addEventListener("mousemove",onM);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize",init); canvas.removeEventListener("mousemove",onM); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true" />;
}

interface HeroProps { fiberRef: RefObject<FiberHandle | null> }
export default function HeroSection({ fiberRef }: HeroProps) {
  const { t } = useI18n();
  const { navigate } = useFiberNav(fiberRef);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const typed = useTypewriter(t.hero.terminal);
  const c1 = useCounter(12, 1800, inView); const c2 = useCounter(98, 2200, inView); const c3 = useCounter(500, 2500, inView);
  useEffect(() => {
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setInView(true);},{threshold:.2});
    obs.observe(el); return ()=>obs.disconnect();
  }, []);
  const STATS = [
    {val:c1,  suffix:"+",  label:t.hero.stat1lbl, color:"#00f5ff", icon:Shield},
    {val:c2,  suffix:"%",  label:t.hero.stat2lbl, color:"#00ff88", icon:Activity},
    {val:c3,  suffix:"+",  label:t.hero.stat3lbl, color:"#7b2fff", icon:Globe},
    {val:24,  suffix:"/7", label:t.hero.stat4lbl, color:"#ffcc00", icon:Zap},
  ];
  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-grid" style={{background:"#020408"}}>
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 75% 55% at 50% -10%,rgba(0,245,255,0.1),transparent)"}} />
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 55% 40% at 85% 80%,rgba(123,47,255,0.07),transparent)"}} />
      <ParticleCanvas />
      {/* HUD corners */}
      {[{top:12,left:12,borderTop:"1.5px solid #00f5ff",borderLeft:"1.5px solid #00f5ff"},{top:12,right:12,borderTop:"1.5px solid #00f5ff",borderRight:"1.5px solid #00f5ff"},{bottom:12,left:12,borderBottom:"1.5px solid #00f5ff",borderLeft:"1.5px solid #00f5ff"},{bottom:12,right:12,borderBottom:"1.5px solid #00f5ff",borderRight:"1.5px solid #00f5ff"}].map((s,i)=>(
        <div key={i} className="absolute w-5 h-5 pointer-events-none" style={{opacity:.35,...s}} />
      ))}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 lg:px-8 pt-28 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full" style={{border:"1px solid rgba(0,245,255,0.28)",background:"rgba(0,245,255,0.05)",animation:"fade-up 0.7s 0.1s both"}}>
          <span className="w-2 h-2 rounded-full bg-green-400" style={{animation:"pulse-neon 2s infinite"}} />
          <span style={{fontFamily:"var(--font-mono)",fontSize:"0.62rem",color:"#00f5ff",letterSpacing:"0.28em"}}>{t.hero.badge}</span>
          <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
        </div>
        {/* H1 */}
        <div style={{animation:"fade-up 0.8s 0.2s both"}}>
          <h1 style={{fontFamily:"var(--font-orbitron)",fontWeight:900,lineHeight:1,marginBottom:"1rem"}}>
            <span className="block text-white" style={{fontSize:"clamp(3rem,9vw,7rem)",animation:"glitch 9s 3s infinite"}}>{t.hero.line1}</span>
            <span className="block gradient-text" style={{fontSize:"clamp(3rem,9vw,7rem)"}}>{t.hero.line2}</span>
            <span className="block" style={{fontSize:"clamp(0.85rem,2.5vw,1.8rem)",fontWeight:400,color:"rgba(255,255,255,0.14)",letterSpacing:"0.55em",marginTop:"0.5rem"}}>{t.hero.line3}</span>
          </h1>
        </div>
        <div className="w-28 h-px mb-6" style={{background:"linear-gradient(90deg,#00f5ff,#4499ff,transparent)",animation:"fade-up 0.8s 0.4s both"}} />
        {/* Terminal */}
        <div className="mb-4 text-sm" style={{fontFamily:"var(--font-mono)",animation:"fade-up 0.8s 0.5s both"}}>
          <span style={{color:"rgba(0,245,255,0.7)"}}>telinfo@sec:~$ </span>
          <span className="text-green-400">{typed}</span>
          <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 align-middle" style={{animation:"blink 1s step-end infinite"}} />
        </div>
        {/* Desc */}
        <p className="max-w-2xl mb-10 leading-relaxed" style={{fontFamily:"var(--font-exo)",fontSize:"clamp(0.88rem,1.5vw,1.05rem)",color:"rgba(255,255,255,0.55)",animation:"fade-up 0.8s 0.65s both"}}>{t.hero.desc}</p>
        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-14" style={{animation:"fade-up 0.8s 0.8s both"}}>
          <button className="btn-cyber" onClick={()=>navigate("#contact")}><Lock className="w-4 h-4" /><span>{t.hero.cta1}</span></button>
          <button className="btn-ghost" onClick={()=>navigate("#services")}><Terminal className="w-4 h-4" />{t.hero.cta2}</button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl" style={{animation:"fade-up 0.8s 1s both"}}>
          {STATS.map((s,i)=>{const Icon=s.icon; return(
            <div key={i} className="flex flex-col items-center p-3.5 rounded text-center" style={{border:`1px solid ${s.color}20`,background:`${s.color}05`}}>
              <Icon className="w-4 h-4 mb-1.5" style={{color:s.color,opacity:.7}} />
              <div style={{fontFamily:"var(--font-orbitron)",fontSize:"1.5rem",fontWeight:700,color:s.color}}>{s.val}<span style={{fontSize:"0.9rem"}}>{s.suffix}</span></div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:"0.58rem",color:"rgba(255,255,255,0.35)",marginTop:2}}>{s.label}</div>
            </div>
          );})}
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
        <span style={{fontFamily:"var(--font-mono)",fontSize:"0.55rem",color:"rgba(255,255,255,0.22)",letterSpacing:"0.35em"}}>SCROLL</span>
        <ChevronDown className="w-4 h-4" style={{color:"rgba(0,245,255,0.5)",animation:"float 2s ease-in-out infinite"}} />
      </div>
    </section>
  );
}




