"use client";

import React from "react";
import { Mail, Linkedin, MapPin, Calendar, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type TimelineItem = {
  year?: string;
  title?: string;
  text?: string;
  badge?: string;
};

function safeText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

export function AboutSection() {
  const { t } = useI18n();
  const about = t?.about ?? {};

  const tags: string[] = Array.isArray(about.tags) ? about.tags : [];
  const timeline: TimelineItem[] = Array.isArray(about.timeline)
    ? about.timeline.map((item: unknown) => {
        if (typeof item === "object" && item !== null) return item as TimelineItem;
        return { text: safeText(item) };
      })
    : [];

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      <span id="sobre" className="absolute -top-24" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="text-cyan-400 uppercase tracking-[0.35em] text-xs mb-4">
            {safeText(about.eyebrow) || "Linha do tempo"}
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {safeText(about.title) || "Trajetória de Inovação e Segurança"}
          </h2>

          <div className="mt-6 h-px w-32 bg-cyan-400" />
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-7 shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center gap-5 mb-7">
                <div className="h-20 w-20 rounded-xl border border-cyan-400/60 bg-slate-900 flex items-center justify-center text-3xl font-black text-cyan-400">
                  JB
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {safeText(about.name) || "Jefferson Boaventura da Silva"}
                  </h3>

                  <p className="text-cyan-400 text-sm uppercase tracking-widest mt-1">
                    {safeText(about.role) || "Fundador & Diretor Técnico"}
                  </p>

                  <a
                    href="https://www.linkedin.com/in/jefferson-boaventura-aa13a11b9/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-blue-300 mt-3 hover:text-cyan-300"
                  >
                    <Linkedin size={14} />
                    linkedin.com/in/jefferson-boaventura-aa13a11b9
                  </a>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed mb-5">
                {safeText(about.bio1)}
              </p>

              <p className="text-slate-300 leading-relaxed">
                {safeText(about.bio2)}
              </p>

              <div className="flex flex-wrap gap-2 mt-7">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-cyan-400/20 bg-slate-950/60 p-5">
                <Calendar className="text-cyan-400 mb-3" size={22} />
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {safeText(about.founded) || "Fundação"}
                </p>
                <p className="text-3xl font-black text-cyan-300">
                  {safeText(about.foundedValue) || "2012"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {safeText(about.location) || "São José dos Campos, SP"}
                </p>
              </div>

              <div className="rounded-xl border border-purple-400/20 bg-slate-950/60 p-5">
                <Award className="text-purple-400 mb-3" size={22} />
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {safeText(about.highlight) || "Destaque"}
                </p>
                <p className="text-3xl font-black text-purple-300">
                  {safeText(about.highlightValue) || "1ª MVNO"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {safeText(about.highlightLabel) || "Vale do Paraíba"}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-400/20 bg-slate-950/60 p-5">
              <div className="flex items-center gap-3">
                <Mail className="text-cyan-400" size={20} />
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    E-mail
                  </p>
                  <a
                    href="mailto:contato@telinfo.com.br"
                    className="text-white font-semibold hover:text-cyan-300"
                  >
                    contato@telinfo.com.br
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500" />

            <div className="space-y-10">
              {timeline.map((item, index) => (
                <div key={`${safeText(item.year)}-${index}`} className="relative pl-14">
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full border-2 border-cyan-400 bg-black shadow-lg shadow-cyan-400/40" />

                  <p className="text-cyan-400 text-xs font-bold tracking-widest mb-2">
                    {safeText(item.year)}
                  </p>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {safeText(item.title)}
                  </h3>

                  <p className="text-slate-400 leading-relaxed">
                    {safeText(item.text)}
                  </p>

                  {item.badge ? (
                    <span className="inline-block mt-4 rounded-md border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-widest text-purple-300">
                      {safeText(item.badge)}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(168,85,247,0.08),transparent_35%)]" />
    </section>
  );
}

export default AboutSection;