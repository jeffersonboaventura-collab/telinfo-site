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
    console.log("[Telinfo] Contato:", { ...data, ts: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validacao" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}


