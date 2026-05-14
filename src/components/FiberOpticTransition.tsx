"use client";

/**
 * FiberOpticTransition.tsx â€” "SOURCE CODE TRAVEL" EDITION
 * =========================================================
 * Efeito de transiÃ§Ã£o: viajando dentro do cÃ³digo-fonte em alta
 * velocidade. TrÃªs camadas simultÃ¢neas no canvas 2D:
 *
 *  1. CHUVA MATRIX   â€” colunas de caracteres de cÃ³digo (fundo)
 *  2. WARP DE TOKENS â€” palavras-chave e snippets em perspectiva 3D
 *                      (estrelas â†’ tokens de cÃ³digo em hyperdrive)
 *  3. LINHAS PARALLAX â€” linhas de cÃ³digo deslizando em profundidades
 *                       diferentes (efeito de velocidade lateral)
 *
 * Zero dependÃªncias externas. Canvas 2D puro.
 * API idÃªntica Ã  versÃ£o anterior (FiberHandle + useFiberNav).
 */

import {
  forwardRef, useImperativeHandle, useRef,
  useState, useEffect, useCallback, RefObject,
} from "react";

export interface FiberHandle {
  trigger: (onComplete?: () => void) => void;
}

// â”€â”€â”€ Token pools â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const KW = ["const","let","var","function","return","if","else","for",
  "while","class","import","export","default","async","await","try",
  "catch","throw","new","this","typeof","interface","type","extends",
  "implements","readonly","private","public","static","void",
  "null","undefined","true","false","switch","case","break","continue"];

const REACT_API = ["useState","useEffect","useRef","useCallback","useMemo",
  "useContext","useReducer","forwardRef","createContext","ReactNode","FC",
  "JSX.Element","Suspense","Fragment","StrictMode","Children","memo"];

const OPS = ["=>","===","!==","&&","||","??","?.","...","+=","-=",
  ">=","<=","++","--","**","|>","<<",">>","~","^"];

const SYMS = ["{}","()","[]","<>","</>",";;","::",
  "{ }","( )","[ ]","//","/*","*/","/**","@param","@returns"];

const SNIPS = [
  "const [state, setState] = useState(null)",
  "export default function App(): JSX.Element",
  "import React, { useEffect, useRef } from 'react'",
  "async function fetchData(url: string): Promise<void>",
  "return <Component props={data} key={id} />",
  "if (isAuthenticated && !loading) {",
  "} catch (error: unknown) { console.error(error) }",
  "useEffect(() => { initCanvas(); return cleanup; }, [])",
  "const res = await fetch('/api/contact', { method: 'POST' })",
  ".then(res => res.json()).catch(console.error)",
  "interface Props { children: ReactNode; className?: string }",
  "type State = { loading: boolean; error: string | null }",
  "export type { Props, State, Config }",
  "/** @param req - NextRequest @returns NextResponse */",
  "// TODO: implement rate limiting here",
  "const router = useRouter(); router.push('/dashboard')",
  "z.object({ email: z.string().email() }).parse(body)",
  "tailwind.config.ts â†’ theme.extend.colors",
  "npm run build && vercel deploy --prod",
  "git commit -m 'fix: resolve ReactCurrentOwner error'",
  "prisma.lead.create({ data: { name, email, message } })",
  "canvas.width = window.innerWidth",
  "ctx.shadowBlur = 12; ctx.shadowColor = '#00f5ff'",
  "requestAnimationFrame(drawFrame)",
  "const { x, y } = projectStar(star, cx, cy)",
  "Math.hypot(dx, dy) < THRESHOLD",
  "clsx(styles.card, hover && styles.active)",
  "next.config.ts â†’ headers() â†’ Content-Security-Policy",
  "schema.parse(requestBody) // Zod validation",
  "@react-three/fiber // removed - canvas 2D only",
];

const MATRIX_POOL =
  "01ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ã‚­ã‚¯ã‚±ã‚³{}();=>&&||const let var if".split("");

// â”€â”€â”€ Token color by type â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type TType = "kw"|"react"|"op"|"sym"|"snip"|"comment";
const TC: Record<TType,string> = {
  kw:      "#00f5ff",
  react:   "#7b2fff",
  op:      "#ff00aa",
  sym:     "rgba(0,245,255,0.45)",
  snip:    "#00ff88",
  comment: "rgba(0,255,136,0.42)",
};

interface Tok { content: string; color: string; fs: number }

function rndTok(): Tok {
  const r = Math.random();
  let content: string; let type: TType;
  if      (r < 0.20) { type="kw";      content=KW[r*KW.length*5|0]??KW[0]; }
  else if (r < 0.36) { type="react";   content=REACT_API[r*REACT_API.length*6|0]??REACT_API[0]; }
  else if (r < 0.48) { type="op";      content=OPS[r*OPS.length*8|0]??OPS[0]; }
  else if (r < 0.58) { type="sym";     content=SYMS[r*SYMS.length*10|0]??SYMS[0]; }
  else if (r < 0.88) { type="snip";    content=SNIPS[r*SNIPS.length*4|0]??SNIPS[0]; }
  else               { type="comment"; content="// "+KW[r*KW.length*10|0]; }
  const fs = type==="snip" ? 9+Math.random()*4 : 11+Math.random()*8;
  return { content, color: TC[type], fs };
}

// â”€â”€â”€ Star warp token â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface StarTok {
  nx: number;  // -0.5 â†’ 0.5
  ny: number;
  z:  number;  // 1=far 0.01=near
  tok: Tok;
}

function mkStar(): StarTok {
  return { nx:(Math.random()-.5), ny:(Math.random()-.5)*.72,
    z:.05+Math.random()*.95, tok:rndTok() };
}

function project(s: StarTok, cx: number, cy: number) {
  const F = 0.68;
  return {
    x: cx + (s.nx/s.z)*cx*F*2,
    y: cy + (s.ny/s.z)*cy*F*2,
    size: (1/s.z)*.7,
    alpha: Math.min((1-s.z)*1.6, 1),
  };
}

// â”€â”€â”€ Matrix rain column â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Rain { x: number; y: number; spd: number; chars: string[]; len: number }

function mkRain(W: number): Rain[] {
  const COL = 20;
  return Array.from({length: Math.floor(W/COL)}, (_,i) => ({
    x: i*COL+COL/2,
    y: Math.random()*-800,
    spd: 1.2+Math.random()*2,
    chars: Array.from({length:28},()=>MATRIX_POOL[Math.random()*MATRIX_POOL.length|0]),
    len: 10+Math.random()*18|0,
  }));
}

// â”€â”€â”€ Horizontal parallax code line â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface HLine { y: number; x: number; spd: number; depth: number; tok: Tok }

function mkLines(H: number): HLine[] {
  return Array.from({length:20}, () => {
    const depth = Math.random();
    return { y: Math.random()*H, x: Math.random(),
      spd: (0.06+Math.random()*.32)*(Math.random()>.5?1:-1),
      depth, tok: rndTok() };
  });
}

// â”€â”€â”€ Core draw â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function draw(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  t: number, dt: number,
  rain: Rain[], stars: StarTok[], lines: HLine[],
) {
  const cx=W/2, cy=H/2;
  const spd = Math.sin(t*Math.PI)*4.2+0.9;
  const fade= t<.09 ? t/.09 : t>.91 ? (1-t)/.09 : 1;

  // Semi-transparent clear â†’ motion blur on trails
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = `rgba(2,4,8,${.26+t*.1})`;
  ctx.fillRect(0,0,W,H);
  ctx.save();
  ctx.globalAlpha = fade;

  // â”€â”€ LAYER 1: Matrix rain (background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const CH=18;
  rain.forEach(col => {
    col.y += col.spd*spd*.52*dt*60;
    if (col.y-col.len*CH>H) {
      col.y=-col.len*CH;
      col.chars=col.chars.map(()=>MATRIX_POOL[Math.random()*MATRIX_POOL.length|0]);
    }
    for (let i=0;i<col.len;i++) {
      const cy_=col.y-i*CH;
      if (cy_<-CH||cy_>H+CH) continue;
      if (Math.random()<.04) col.chars[i]=MATRIX_POOL[Math.random()*MATRIX_POOL.length|0];
      const br = i===0?1:(1-i/col.len)*.4;
      ctx.font="bold 13px 'Share Tech Mono',monospace";
      ctx.globalAlpha=fade*br*.3;
      ctx.fillStyle=i===0?"#afffaf":"#00ff88";
      ctx.fillText(col.chars[i],col.x,cy_);
    }
  });

  // â”€â”€ LAYER 2: Code token warp (main depth effect) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ctx.globalAlpha=1;
  stars.sort((a,b)=>b.z-a.z);

  stars.forEach(star => {
    const cur=project(star,cx,cy);
    const advZ=Math.min(star.z+.014*spd*dt*60, 1);
    const prev=project({...star,z:advZ},cx,cy);

    star.z-=.012*spd*dt*60;
    if (star.z<=.015) { Object.assign(star,mkStar()); star.z=.88+Math.random()*.12; return; }
    if (cur.alpha<.02) return;
    if (cur.x<-80||cur.x>W+80||cur.y<-40||cur.y>H+40) { Object.assign(star,mkStar()); return; }

    const fs=Math.max(7,Math.min(star.tok.fs*cur.size,28));
    const text=star.tok.content;
    ctx.font=`${fs<12?"":"bold "}${fs}px 'Share Tech Mono',monospace`;
    const tw=ctx.measureText(text).width;

    // Streak trail from previous frame position
    if (t>.08&&prev.alpha>.01) {
      ctx.save();
      ctx.globalAlpha=fade*cur.alpha*.4;
      ctx.strokeStyle=star.tok.color;
      ctx.lineWidth=Math.max(.5, fs*.22);
      ctx.beginPath(); ctx.moveTo(prev.x,prev.y); ctx.lineTo(cur.x,cur.y); ctx.stroke();
      ctx.restore();
    }

    // Token text
    ctx.save();
    ctx.shadowBlur=cur.alpha>.65?12:4;
    ctx.shadowColor=star.tok.color;
    ctx.globalAlpha=fade*cur.alpha*.95;
    ctx.fillStyle=star.tok.color;
    ctx.fillText(text, cur.x-tw/2, cur.y);
    ctx.restore();
  });

  // â”€â”€ LAYER 3: Horizontal parallax lines â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  lines.forEach(ln => {
    ln.x+=ln.spd*spd*dt*.55;
    if (ln.spd>0&&ln.x>1.15) { ln.x=-.15; ln.tok=rndTok(); ln.y=Math.random()*H; }
    if (ln.spd<0&&ln.x<-.15) { ln.x=1.15;  ln.tok=rndTok(); ln.y=Math.random()*H; }
    const sx=ln.x*W, al=ln.depth*.62, fs=8+ln.depth*9;
    if (al<.04) return;
    ctx.save();
    ctx.font=`${fs}px 'Share Tech Mono',monospace`;
    ctx.globalAlpha=fade*al;
    ctx.shadowBlur=ln.depth*7; ctx.shadowColor=ln.tok.color;
    ctx.fillStyle=ln.tok.color;
    ctx.fillText(ln.tok.content,sx,ln.y);
    ctx.restore();
  });

  // â”€â”€ Central vortex glow (origin point) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (t>.05&&t<.95) {
    const va=Math.sin(t*Math.PI)*.32*fade;
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,110);
    g.addColorStop(0,`rgba(0,245,255,${va})`);
    g.addColorStop(.5,`rgba(123,47,255,${va*.3})`);
    g.addColorStop(1,"rgba(0,0,0,0)");
    ctx.save(); ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(cx,cy,110,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }

  ctx.restore();

  // â”€â”€ HUD overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (fade<.1) return;
  const ha=fade*.72;
  ctx.save();
  ctx.globalAlpha=ha;
  ctx.strokeStyle="#00ff88"; ctx.lineWidth=1.5;
  const BR=22;
  ([
    [20,20,1,1],[W-20,20,-1,1],[20,H-20,1,-1],[W-20,H-20,-1,-1],
  ] as [number,number,number,number][]).forEach(([x,y,dx,dy])=>{
    ctx.beginPath();
    ctx.moveTo(x+dx*BR,y); ctx.lineTo(x,y); ctx.lineTo(x,y+dy*BR);
    ctx.stroke();
  });
  ctx.globalAlpha=ha*.8;
  ctx.font="9px 'Share Tech Mono',monospace";
  ctx.fillStyle="#00ff88";
  ctx.fillText("TELINFO://PARSING_SOURCE_CODE", 30, 30);
  ctx.fillText(`DEPTH: ${(t*1000000|0).toLocaleString()} lines`, 30, 44);
  ctx.textAlign="right"; ctx.fillStyle="#00f5ff";
  ctx.fillText("SYNTAX: OK âœ“", W-30, 30);
  ctx.fillText(`SPEED: ${Math.round(spd*100)}%`, W-30, 44);
  ctx.textAlign="left";
  const BW=190,BH=2,BX=(W-BW)/2,BY=H-46;
  ctx.globalAlpha=ha;
  ctx.fillStyle="rgba(0,255,136,0.12)"; ctx.fillRect(BX,BY,BW,BH);
  ctx.shadowBlur=5; ctx.shadowColor="#00ff88";
  ctx.fillStyle="#00ff88"; ctx.fillRect(BX,BY,BW*t,BH);
  ctx.shadowBlur=0;
  ctx.globalAlpha=ha*.65;
  ctx.font="8px 'Share Tech Mono',monospace";
  ctx.textAlign="center"; ctx.fillStyle="#00ff88";
  ctx.fillText(`TRAVERSING CODEBASE ${Math.round(t*100)}%`,W/2,H-58);
  ctx.textAlign="left";
  ctx.restore();
}

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const FiberOpticTransition = forwardRef<FiberHandle,object>(
  function FiberOpticTransition(_,ref) {
    const [active,setActive]=useState(false);
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const cbRef=useRef<(()=>void)|null>(null);
    const startRef=useRef(0);
    const rafRef=useRef(0);
    const calledRef=useRef(false);
    const rainRef=useRef<Rain[]>([]);
    const starsRef=useRef<StarTok[]>([]);
    const linesRef=useRef<HLine[]>([]);

    useImperativeHandle(ref, ()=>({
      trigger(onComplete) {
        if (active) { onComplete?.(); return; }
        cbRef.current=onComplete??null;
        calledRef.current=false;
        setActive(true);
        startRef.current=performance.now();
        const canvas=canvasRef.current; if(!canvas) return;
        const ctx=canvas.getContext("2d"); if(!ctx) return;
        canvas.width=window.innerWidth; canvas.height=window.innerHeight;
        const W=canvas.width, H=canvas.height;
        rainRef.current=mkRain(W);
        starsRef.current=Array.from({length:300},mkStar);
        linesRef.current=mkLines(H);
        ctx.fillStyle="#020408"; ctx.fillRect(0,0,W,H);
        let last=startRef.current;
        const tick=(now:number)=>{
          const t=Math.min((now-startRef.current)/1600,1);
          const dt=Math.min((now-last)/1000,.05); last=now;
          draw(ctx,W,H,t,dt,rainRef.current,starsRef.current,linesRef.current);
          if (t>=.60&&!calledRef.current) { calledRef.current=true; cbRef.current?.(); }
          if (t<1) { rafRef.current=requestAnimationFrame(tick); }
          else { setTimeout(()=>setActive(false),80); }
        };
        rafRef.current=requestAnimationFrame(tick);
      },
    }));

    useEffect(()=>()=>cancelAnimationFrame(rafRef.current),[]);

    return (
      <canvas ref={canvasRef} aria-hidden="true"
        style={{position:"fixed",inset:0,width:"100vw",height:"100vh",
          zIndex:9998,pointerEvents:"none",
          display:active?"block":"none",background:"#020408"}} />
    );
  }
);

FiberOpticTransition.displayName="SourceCodeTransition";
export default FiberOpticTransition;

export function useFiberNav(ref:RefObject<FiberHandle|null>) {
  const navigate=useCallback((target:string)=>{
    const go=()=>{
      if (target.startsWith("#"))
        document.getElementById(target.slice(1))?.scrollIntoView({behavior:"smooth"});
      else window.location.href=target;
    };
    ref.current?ref.current.trigger(go):go();
  },[ref]);
  return {navigate};
}




