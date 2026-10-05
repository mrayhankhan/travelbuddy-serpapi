import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// Determine the canonical URL for this deployment
// Priority: AUTH_URL > NEXTAUTH_URL > VERCEL_URL (auto-set by Vercel) > localhost
const resolvedUrl =
    process.env.AUTH_URL ||
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    "http://localhost:3000";

// Force AUTH_URL so NextAuth picks it up internally
if (!process.env.AUTH_URL) {
    process.env.AUTH_URL = resolvedUrl;
}

const useSecureCookies = resolvedUrl.startsWith("https://");

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    cookies: {
        pkceCodeVerifier: {
            name: useSecureCookies
                ? "__Secure-next-auth.pkce.code_verifier"
                : "next-auth.pkce.code_verifier",
            options: {
                httpOnly: true,
                sameSite: useSecureCookies ? "none" : "lax",
                path: "/",
                secure: useSecureCookies,
            },
        },
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        Credentials({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text" },
                mode: { label: "Mode", type: "text" }, // "signin" | "signup"
            },
            async authorize(credentials) {
                const { email, password, name, mode } = credentials as {
                    email: string;
                    password: string;
                    name: string;
                    mode: string;
                };

                console.log("[AUTH] authorize called:", { email, mode, hasPassword: !!password, hasName: !!name });

                if (!email || !password) {
                    console.log("[AUTH] Missing email or password");
                    return null;
                }

                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

                try {
                    if (mode === "signup") {
                        // Register new user
                        console.log("[AUTH] Attempting registration...");
                        const res = await fetch(`${API_URL}/auth-backend/register`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, password, name }),
                        });

                        if (res.ok) {
                            const user = await res.json();
                            console.log("[AUTH] Registration successful:", user.email);
                            return { id: user.id || email, email: user.email, name: user.name };
                        }

                        // If user already exists (409), fall through to login
                        const errBody = await res.text();
                        console.log("[AUTH] Registration failed:", res.status, errBody);

                        if (res.status === 409) {
                            console.log("[AUTH] User exists, falling through to login...");
                        } else {
                            return null;
                        }
                    }

                    // Sign-in (or fallthrough from existing signup)
                    console.log("[AUTH] Attempting login...");
                    const res = await fetch(`${API_URL}/auth-backend/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!res.ok) {
                        const errBody = await res.text();
                        console.log("[AUTH] Login failed:", res.status, errBody);
                        return null;
                    }

                    const user = await res.json();
                    console.log("[AUTH] Login successful:", user.email);
                    return { id: user.id || email, email: user.email, name: user.name };
                } catch (e) {
                    console.error("[AUTH] Backend fetch error:", e);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/", // keep all auth in our custom modal
    },
    callbacks: {
        async signIn({ user, account }) {
            // Persist Google OAuth users to backend MongoDB
            if (account?.provider === "google" && user.email) {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
                try {
                    console.log("[AUTH] Saving Google user to backend:", user.email);
                    await fetch(`${API_URL}/auth-backend/google-user`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }),
                    });
                } catch (e) {
                    console.error("[AUTH] Failed to save Google user:", e);
                    // Don't block sign-in even if backend save fails
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (token?.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
});
