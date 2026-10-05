import { NextRequest, NextResponse } from "next/server";

declare global {
    // eslint-disable-next-line no-var
    var __otpStore: Map<string, { otp: string; expiresAt: number }> | undefined;
}

export async function POST(req: NextRequest) {
    const { email, otp } = await req.json();

    if (!email || !otp) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const store = globalThis.__otpStore;
    const entry = store?.get(email.toLowerCase());

    if (!entry) {
        return NextResponse.json({ error: "No OTP found for this email." }, { status: 400 });
    }

    if (Date.now() > entry.expiresAt) {
        store?.delete(email.toLowerCase());
        return NextResponse.json({ error: "OTP expired. Please request a new one." }, { status: 400 });
    }

    if (entry.otp !== otp.trim()) {
        return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
    }

    // OTP is valid — clear it (one-time use)
    store?.delete(email.toLowerCase());
    return NextResponse.json({ ok: true });
}
