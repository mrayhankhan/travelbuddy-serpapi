import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// In-memory OTP store  { email → { otp, expiresAt } }
// In production replace with Redis / DB
// ---------------------------------------------------------------------------
interface OTPEntry { otp: string; expiresAt: number }
declare global {
    // eslint-disable-next-line no-var
    var __otpStore: Map<string, OTPEntry> | undefined;
}
const otpStore: Map<string, OTPEntry> =
    globalThis.__otpStore ?? (globalThis.__otpStore = new Map());

function genOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const otp = genOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore.set(email.toLowerCase(), { otp, expiresAt });

    // ── Send email ────────────────────────────────────────────────────────────
    // Uses SMTP credentials from env vars.  Falls back to Ethereal (test) transport
    // if SMTP_HOST is not configured – great for local development.
    let transporter: nodemailer.Transporter;

    if (process.env.SMTP_HOST) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    } else {
        // Ethereal test account – messages are captured at https://ethereal.email
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: { user: testAccount.user, pass: testAccount.pass },
        });
    }

    const info = await transporter.sendMail({
        from: process.env.SMTP_FROM ?? '"TravelBuddy ✈️" <no-reply@travelbuddy.app>',
        to: email,
        subject: "Your TravelBuddy password reset OTP",
        html: `
      <div style="font-family:system-ui,sans-serif;max-width:400px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #e5e7eb">
        <div style="text-align:center;margin-bottom:24px">
          <div style="background:#FFD233;width:56px;height:56px;border-radius:16px;display:inline-flex;align-items:center;justify-content:center;font-size:28px">✈️</div>
        </div>
        <h2 style="text-align:center;font-size:22px;font-weight:700;color:#1A1A1A;margin:0 0 8px">Reset Your Password</h2>
        <p style="text-align:center;color:#6B7280;font-size:14px;margin:0 0 32px">Enter this OTP in the app. It expires in <strong>10 minutes</strong>.</p>
        <div style="background:#F9FAFB;border-radius:12px;padding:24px;text-align:center;margin-bottom:32px">
          <span style="font-size:40px;font-weight:800;letter-spacing:12px;color:#1A1A1A">${otp}</span>
        </div>
        <p style="text-align:center;color:#9CA3AF;font-size:12px">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    });

    // Log preview URL for Ethereal (dev only)
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
        console.log("[OTP] Preview email at:", previewUrl);
    }

    return NextResponse.json({ ok: true, ...(previewUrl ? { previewUrl } : {}) });
}
