"use client";

/**
 * AnimatedLogo.tsx
 * =================
 * A logo real da Telinfo com as antenas "ganhando vida":
 *
 * ① Arcos de sinal WiFi pulsando a partir do topo de cada antena
 * ② Pontos de dados subindo pelas hastes (pulso de transmissão)
 * ③ Partículas neon flutuando para cima (dados em trânsito)
 * ④ Linhas verticais das antenas com brilho pulsante
 * ⑤ Ponto verde "TRANSMISSÃO ATIVA" piscando no topo da antena central
 *
 * mixBlendMode: "screen" — torna o fundo preto da logo transparente,
 * integrando perfeitamente com o header escuro do site.
 */

import { useEffect, useRef, useCallback } from "react";

export interface AnimatedLogoProps {
  height?: number;
  className?: string;
}

// ─── Posições das antenas (% da largura/altura da logo exibida) ───
// Ajustado para o gráfico real da logo Telinfo:
// há 3 torres verticais neon no lado esquerdo (~30% da imagem)
const ANTENNAS = [
  { xPct: 0.070, yTopPct: 0.28, yBasePct: 0.88 }, // antena esquerda
  { xPct: 0.150, yTopPct: 0.04, yBasePct: 0.93 }, // antena central (mais alta)
  { xPct: 0.258, yTopPct: 0.18, yBasePct: 0.90 }, // antena direita
];

const C_CYAN  = "0,245,255";
const C_BLUE  = "68,153,255";
const C_WHITE = "200,240,255";
const C_GREEN = "0,255,136";

export default function AnimatedLogo({ height = 40, className = "" }: AnimatedLogoProps) {
  const imgRef    = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef(0);
  const frameRef  = useRef(0);

  const startAnim = useCallback(() => {
    const img    = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const W = img.offsetWidth;
    const H = img.offsetHeight;
    if (!W || !H) return;

    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Converte % → pixels
    const ants = ANTENNAS.map(a => ({
      x:     W * a.xPct,
      yTop:  H * a.yTopPct,
      yBase: H * a.yBasePct,
    }));

    // ── Partículas (bits de dados subindo) ───────────────
    const particles = Array.from({ length: 32 }, (_, i) => {
      const ai  = i % 3;
      const ant = ants[ai];
      return {
        x:   ant.x + (Math.random() - 0.5) * 5,
        y:   ant.yTop + (ant.yBase - ant.yTop) * Math.random(),
        vx:  (Math.random() - 0.5) * 0.28,
        vy:  -(0.18 + Math.random() * 0.38),
        a:   Math.random() * 0.75,
        sz:  0.5 + Math.random() * 1.1,
        ai,
        col: Math.random() > 0.5 ? C_CYAN : C_BLUE,
      };
    });

    // ── Anéis de sinal (ondas de rádio) ──────────────────
    interface Ring { x: number; y: number; r: number; a: number }
    const rings: Ring[] = [];
    let ringTick = 0;

    // ── Feixes de pulso (ponto viajando pela haste) ───────
    const beams = ants.map((ant, i) => ({
      x:     ant.x,
      y:     ant.yBase - (ant.yBase - ant.yTop) * Math.random(),
      yTop:  ant.yTop,
      yBase: ant.yBase,
      spd:   0.4 + i * 0.16,
      a:     0.8,
    }));

    // ── LOOP DE ANIMAÇÃO ──────────────────────────────────
    const draw = () => {
      const f = ++frameRef.current;
      ctx.clearRect(0, 0, W, H);

      ctx.save();
      ctx.rect(0, 0, W, H);
      ctx.clip(); // evita desenhar fora do canvas

      // ① LINHAS DAS ANTENAS com brilho pulsante ──────────
      ants.forEach((ant, i) => {
        const pulse = 0.14 + Math.sin(f * 0.045 + i * 1.4) * 0.08;
        const grad  = ctx.createLinearGradient(ant.x, ant.yBase, ant.x, ant.yTop);
        grad.addColorStop(0,    `rgba(${C_CYAN},0)`);
        grad.addColorStop(0.35, `rgba(${C_CYAN},${pulse})`);
        grad.addColorStop(1,    `rgba(${C_CYAN},${pulse * 0.55})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.8;
        ctx.shadowBlur  = 5;
        ctx.shadowColor = `rgba(${C_CYAN},0.5)`;
        ctx.beginPath();
        ctx.moveTo(ant.x, ant.yBase);
        ctx.lineTo(ant.x, ant.yTop);
        ctx.stroke();
        ctx.restore();
      });

      // ② ARCOS TIPO WIFI (ondas de sinal por antena) ──────
      ants.forEach((ant, ai) => {
        const BARS = 3;
        for (let b = 0; b < BARS; b++) {
          const r     = (b + 1) * Math.max(2.8, H * 0.075);
          const wave  = Math.sin(f * 0.055 + ai * 1.3 - b * 0.4);
          const baseA = b === 0 ? 0.60 : b === 1 ? 0.35 : 0.18;
          const alpha = Math.max(0, baseA + wave * 0.12);

          ctx.save();
          ctx.beginPath();
          // Semicírculo para CIMA a partir do topo da antena
          ctx.arc(ant.x, ant.yTop, r, Math.PI, 0, true);
          ctx.strokeStyle = `rgba(${C_CYAN},${alpha})`;
          ctx.lineWidth   = b === 0 ? 1.1 : 0.75;
          if (b === 0) {
            ctx.shadowBlur  = 7;
            ctx.shadowColor = `rgba(${C_CYAN},0.35)`;
          }
          ctx.stroke();
          ctx.restore();
        }
      });

      // ③ ANÉIS PROPAGANTES (broadcast) ───────────────────
      rings.forEach(ring => {
        ring.r += 0.72;
        ring.a -= 0.014;
        if (ring.a <= 0) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, Math.PI, 0, true);
        ctx.strokeStyle = `rgba(${C_CYAN},${Math.max(0, ring.a)})`;
        ctx.lineWidth   = 0.9;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = `rgba(${C_CYAN},0.3)`;
        ctx.stroke();
        ctx.restore();
      });
      // Limpa rings mortos
      for (let i = rings.length - 1; i >= 0; i--) {
        if (rings[i].a <= 0) rings.splice(i, 1);
      }
      // Dispara novo anel a cada 65 frames
      if (++ringTick >= 65) {
        ringTick = 0;
        const ant = ants[Math.floor(Math.random() * ants.length)];
        rings.push({ x: ant.x, y: ant.yTop, r: 1, a: 0.6 });
      }

      // ④ FEIXES DE PULSO (ponto subindo pela haste) ───────
      beams.forEach(beam => {
        beam.y -= beam.spd;
        if (beam.y < beam.yTop) {
          beam.y = beam.yBase;
          beam.a = 0.7 + Math.random() * 0.3;
        }
        ctx.save();
        // Ponto brilhante
        ctx.beginPath();
        ctx.arc(beam.x, beam.y, 2, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${C_WHITE},${beam.a})`;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = `rgba(${C_CYAN},0.9)`;
        ctx.fill();
        // Rastro
        for (let t = 1; t <= 6; t++) {
          const ty  = beam.y + t * beam.spd * 2;
          const ta  = beam.a * (1 - t / 6) * 0.4;
          const tr  = Math.max(0.3, 1.5 - t * 0.18);
          ctx.beginPath();
          ctx.arc(beam.x, ty, tr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${C_CYAN},${ta})`;
          ctx.fill();
        }
        ctx.restore();
      });

      // ⑤ PARTÍCULAS (dados em trânsito) ───────────────────
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.a -= 0.007;
        if (p.a <= 0 || p.y < -5) {
          const ant = ants[p.ai];
          p.x  = ant.x + (Math.random() - 0.5) * 6;
          p.y  = ant.yTop + (ant.yBase - ant.yTop) * 0.55 * Math.random();
          p.vx = (Math.random() - 0.5) * 0.28;
          p.vy = -(0.18 + Math.random() * 0.38);
          p.a  = 0.5 + Math.random() * 0.5;
          p.col= Math.random() > 0.5 ? C_CYAN : C_BLUE;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle  = `rgba(${p.col},${Math.max(0, p.a)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor= `rgba(${C_CYAN},0.6)`;
        ctx.fill();
        ctx.restore();
      });

      // ⑥ INDICADOR "TRANSMISSÃO ATIVA" (pisco verde no topo) ──
      const tall  = ants[1]; // antena central = mais alta
      const blink = (f % 38) < 22; // pisca a cada ~38 frames
      if (blink) {
        const ba = 0.7 + Math.sin(f * 0.18) * 0.3;
        ctx.save();
        // Halo externo
        ctx.beginPath();
        ctx.arc(tall.x, tall.yTop - 2, 4, 0, Math.PI * 2);
        ctx.fillStyle  = `rgba(${C_GREEN},${ba * 0.25})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor= `rgba(${C_GREEN},0.7)`;
        ctx.fill();
        // Núcleo
        ctx.beginPath();
        ctx.arc(tall.x, tall.yTop - 2, 2, 0, Math.PI * 2);
        ctx.fillStyle  = `rgba(${C_GREEN},${ba})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      ctx.restore(); // fim do clip

      rafRef.current = requestAnimationFrame(draw);
    };

    // Semeia rings iniciais
    ants.forEach(ant =>
      rings.push({ x: ant.x, y: ant.yTop, r: Math.random() * 18, a: 0.2 + Math.random() * 0.3 })
    );

    cancelAnimationFrame(rafRef.current);
    frameRef.current = 0;
    draw();
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const boot = () => setTimeout(startAnim, 60);

    if (img.complete && img.naturalWidth > 0) boot();
    else img.addEventListener("load", boot);

    // Reinicia se o container mudar de tamanho
    const ro = new ResizeObserver(startAnim);
    if (wrapRef.current) ro.observe(wrapRef.current);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [startAnim]);

  return (
    <div
      ref={wrapRef}
      className={`relative inline-flex items-center select-none ${className}`}
      style={{ lineHeight: 0 }}
    >
      {/*
        mixBlendMode: "screen" — faz o fundo PRETO da logo virar transparente.
        No fundo escuro do site (#020408), o preto desaparece e os
        elementos neon cyan/branco da logo brilham naturalmente.
      */}
      <img
        ref={imgRef}
        src="/telinfo-logo.png"
        alt="Telinfo Cyber Security"
        draggable={false}
        style={{
          height,
          width: "auto",
          display: "block",
          mixBlendMode: "screen",
          filter: "brightness(1.08) saturate(1.1)",
        }}
      />

      {/* Canvas de animação — mesma blend mode additive */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          pointerEvents: "none",
          mixBlendMode:  "screen",
        }}
      />
    </div>
  );
}




