# 🛡️ Telinfo Cyber Security — Site Oficial (CORRIGIDO)

## ⚡ Instalação e execução

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## ✅ Correção aplicada

**Problema:** `TypeError: Cannot read properties of undefined (reading 'ReactCurrentOwner')`

**Causa:** `@react-three/fiber` v8 usa internals do React 18 que foram
removidos no React 19. O conflito é estrutural e sem solução via overrides.

**Solução:** O componente `FiberOpticTransition.tsx` foi reescrito usando
**canvas 2D puro** — sem React Three Fiber, sem Three.js, sem conflitos.
O efeito visual é idêntico (partículas warp + anéis de túnel + HUD neon).

## 📁 Estrutura

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/contact/route.ts
├── components/
│   ├── FiberOpticTransition.tsx  ← canvas 2D (SEM Three.js)
│   ├── Header.tsx
│   ├── WhatsAppButton.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ServicesSection.tsx
│       ├── CasesSection.tsx
│       ├── ContactSection.tsx
│       └── FooterSection.tsx
└── lib/
    └── i18n.tsx  (PT / EN / ES)
```

## 📱 Personalizar WhatsApp

Edite `src/components/WhatsAppButton.tsx`:
```ts
const WA = "5512999999999"; // ← número real aqui
```

## ✉️ Email (opcional)

Crie `.env.local`:
```
RESEND_API_KEY=re_xxxx
RESEND_FROM=Telinfo <noreply@telinfo.com.br>
RESEND_TO=contato@telinfo.com.br
```
Sem isso, os contatos são logados no console.

## 🚀 Deploy Vercel

```bash
npx vercel --prod
```
