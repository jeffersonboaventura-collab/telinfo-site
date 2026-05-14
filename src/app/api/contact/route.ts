import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(3).max(80),
  email:   z.string().email(),
  phone:   z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20).max(2000),
  _hp:     z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    if (data._hp) return NextResponse.json({ ok: true });

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const FROM = process.env.RESEND_FROM ?? "Telinfo <noreply@telinfo.com.br>";
      const TO   = process.env.RESEND_TO   ?? "contato@telinfo.com.br";
      await resend.emails.send({
        from: FROM, to: TO,
        subject: `🛡️ Novo Lead Telinfo — ${data.service} | ${data.name}`,
        html: `<h2>Novo contato</h2><p><b>Nome:</b> ${data.name}</p><p><b>E-mail:</b> ${data.email}</p><p><b>Empresa:</b> ${data.company??'—'}</p><p><b>Serviço:</b> ${data.service}</p><p><b>Mensagem:</b><br>${data.message.replace(/\n/g,'<br>')}</p>`,
      });
      await resend.emails.send({
        from: FROM, to: data.email,
        subject: "✅ Recebemos sua mensagem — Telinfo Cyber Security",
        html: `<p>Olá, ${data.name}!</p><p>Retornaremos em até <b>2 horas úteis</b>.</p><br><p>Jefferson Boaventura — CEO Telinfo</p>`,
      });
    } else {
      console.log("[Telinfo Contact]", { ...data, ts: new Date().toISOString() });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "Validation" }, { status: 400 });
    console.error(err);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
