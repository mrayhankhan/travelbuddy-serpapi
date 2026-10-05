import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, newPassword } = await req.json();

        if (!email || !newPassword) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

        const res = await fetch(`${API_URL}/auth-backend/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword }),
        });

        if (!res.ok) {
            const data = await res.json();
            return NextResponse.json({ error: data.error || "Reset failed" }, { status: res.status });
        }

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Internal Error" }, { status: 500 });
    }
}
