// Cloudflare Pages Function: POST /api/contact
// Needs env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (see README).
// Optional: TURNSTILE_SECRET, and a KV binding named RATE_LIMIT for durable rate limiting.

const json = (o, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const BUDGETS = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $20,000", "$20,000+", "Not sure yet"];
const LIMIT = 5, WINDOW = 3600; // 5 submissions per IP per hour
const memory = new Map(); // best-effort fallback when KV is not bound

async function rateLimited(env, ip) {
  if (env.RATE_LIMIT) {
    const key = `rl:${ip}`, n = parseInt((await env.RATE_LIMIT.get(key)) || "0", 10);
    if (n >= LIMIT) return true;
    await env.RATE_LIMIT.put(key, String(n + 1), { expirationTtl: WINDOW });
    return false;
  }
  const now = Date.now(), hits = (memory.get(ip) || []).filter((t) => now - t < WINDOW * 1000);
  if (hits.length >= LIMIT) return true;
  hits.push(now); memory.set(ip, hits);
  if (memory.size > 500) memory.clear();
  return false;
}

export async function onRequestPost({ request, env }) {
  // Basic cross-site protection
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "Request blocked." }, 403);

  // Be honest if the email service is not configured
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL)
    return json({ ok: false, error: "The contact form is not configured yet. Please try again later or contact us another way." }, 503);

  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "Invalid request." }, 400); }

  // Honeypot: pretend success so bots learn nothing
  if (d.nickname) return json({ ok: true });

  const s = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const f = { name: s(d.name, 100), email: s(d.email, 150), company: s(d.company, 150), budget: s(d.budget, 40), message: s(d.message, 3000) };
  const services = Array.isArray(d.services) ? d.services.map((x) => s(x, 80)).filter(Boolean).slice(0, 10) : [];

  const fields = {};
  if (f.name.length < 2) fields.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) fields.email = "Please enter a valid email address.";
  if (!BUDGETS.includes(f.budget)) fields.budget = "Please select a budget range.";
  if (f.message.length < 10) fields.message = "Please tell us a little more.";
  if (d.consent !== true) fields.consent = "Please agree to the Privacy Policy to continue.";
  if (Object.keys(fields).length) return json({ ok: false, error: "Please fix the highlighted fields.", fields }, 400);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";

  if (env.TURNSTILE_SECRET) {
    const token = d["cf-turnstile-response"];
    if (!token) return json({ ok: false, error: "Please complete the spam check." }, 400);
    const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
    }).then((r) => r.json()).catch(() => ({}));
    if (!v.success) return json({ ok: false, error: "Spam check failed. Please try again." }, 400);
  }

  if (await rateLimited(env, ip)) return json({ ok: false, error: "Too many submissions. Please try again later." }, 429);

  const text = `New enquiry from the website\n\nName: ${f.name}\nEmail: ${f.email}\nCompany/Website: ${f.company || "-"}\nBudget: ${f.budget}\nServices: ${services.join(", ") || "-"}\n\nMessage:\n${f.message}\n`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: env.CONTACT_FROM_EMAIL, to: [env.CONTACT_TO_EMAIL], reply_to: f.email, subject: `New enquiry from ${f.name}`, text }),
  }).catch(() => null);

  if (!res || !res.ok) return json({ ok: false, error: "We couldn't send your message. Please try again or contact us another way." }, 502);
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: "Method not allowed." }, 405);
