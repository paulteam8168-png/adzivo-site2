import studies from "./case-studies.mjs";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function pages(c, base) {
  const book = c.contact.bookingUrl || "/contact/#form";
  const bookExt = c.contact.bookingUrl ? ' target="_blank" rel="noopener noreferrer"' : "";
  const nav = [["/services/", "Services"], ...(c.showCaseStudies ? [["/case-studies/", "Case Studies"]] : []), ["/about/", "About"], ["/contact/", "Contact"]];

  const logo = `<svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M8 23 16 8l8 15h-4.2L16 15.6 12.2 23z" fill="#fff"/></svg>`;
  const btn = (href, text, cls = "btn-primary", extra = "") => `<a class="btn ${cls}" href="${href}"${extra}>${text}</a>`;
  const bookBtn = (text = "Book a Strategy Call", cls = "btn-primary") => btn(book, text, cls, bookExt);

  const contactLines = [
    c.contact.email && `<li><a href="mailto:${esc(c.contact.email)}">${esc(c.contact.email)}</a></li>`,
    c.contact.phone && `<li><a href="tel:${esc(c.contact.phone.replace(/\s/g, ""))}">${esc(c.contact.phone)}</a></li>`,
    c.contact.location && `<li>${esc(c.contact.location)}</li>`,
  ].filter(Boolean);

  const org = { "@type": "Organization", "@id": base + "/#org", name: c.name, url: base + "/", logo: base + "/favicon.svg", description: c.support,
    ...(c.contact.email && { email: c.contact.email }), ...(c.contact.phone && { telephone: c.contact.phone }) };
  const site = { "@type": "WebSite", "@id": base + "/#website", url: base + "/", name: c.name, publisher: { "@id": base + "/#org" } };
  const ldJson = (path, title, extra) => {
    const crumbs = path === "/" ? [] : [{ "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base + "/" },
      { "@type": "ListItem", position: 2, name: title, item: base + path }] }];
    return JSON.stringify({ "@context": "https://schema.org", "@graph": [org, site, ...crumbs, ...extra] }).replace(/</g, "\\u003c");
  };

  const layout = ({ path, title, desc, body, noindex = false, form = false, schema = [] }) => {
    const full = path === "/" ? title : `${title} | ${c.name}`;
    const url = base + path;
    return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
${c.googleVerification ? `<meta name="google-site-verification" content="${esc(c.googleVerification)}">` : ""}
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#f6f7fb">
<meta property="og:type" content="website"><meta property="og:site_name" content="${c.name}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${base}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
${form && c.turnstileSiteKey ? '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>' : ""}
${noindex ? "" : `<script type="application/ld+json">${ldJson(path, title, schema)}</script>`}
</head><body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr"><div class="wrap hdr-in">
<a class="brand" href="/" aria-label="${c.name} home">${logo}<span>${c.name}</span></a>
<button class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Toggle menu"><span></span><span></span></button>
<nav id="nav" class="nav" aria-label="Main">${nav.map(([h, t]) => `<a href="${h}"${h === path ? ' aria-current="page"' : ""}>${t}</a>`).join("")}${bookBtn("Book a Call", "btn-primary btn-sm")}</nav>
</div></header>
<main id="main">${body}</main>
<footer class="ftr"><div class="wrap ftr-grid">
<div><a class="brand" href="/">${logo}<span>${c.name}</span></a><p class="muted">Performance marketing built around your business goals. ${c.name} is an independent agency and is not affiliated with or endorsed by Meta.</p>${contactLines.length ? `<ul class="plain">${contactLines.join("")}</ul>` : ""}</div>
<div><h3>Services</h3><ul class="plain">${c.services.map((s) => `<li><a href="/services/#${s.slug}">${s.title}</a></li>`).join("")}</ul></div>
<div><h3>Company</h3><ul class="plain"><li><a href="/">Home</a></li>${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="/privacy/">Privacy Policy</a></li><li><a href="/terms/">Terms of Service</a></li></ul></div>
</div><div class="wrap copy">© <span data-year>${new Date().getFullYear()}</span> ${c.name}. All rights reserved.</div></footer>
<script src="/main.js" defer></script>
</body></html>`;
  };

  const cta = (h = "Ready to Make Your Marketing Work Harder?", t = "Let's Talk About Your Goals") =>
    `<section class="sec"><div class="wrap"><div class="cta-box reveal"><h2>${h}</h2><p class="muted">Tell us about your business and goals. We'll tell you honestly whether paid social is a good fit.</p>${bookBtn(t)}</div></div></section>`;

  const head = (eyebrow, h, p = "") => `<div class="sec-head reveal"><span class="eyebrow">${eyebrow}</span><h2>${h}</h2>${p ? `<p class="muted">${p}</p>` : ""}</div>`;

  const iso = (cx, cy, w, h, c) => { const dy = w / 2;
    return `<polygon points="${cx - w},${cy} ${cx},${cy + dy} ${cx},${cy + dy + h} ${cx - w},${cy + h}" fill="${c[1]}"/><polygon points="${cx},${cy + dy} ${cx + w},${cy} ${cx + w},${cy + h} ${cx},${cy + dy + h}" fill="${c[2]}"/><polygon points="${cx},${cy - dy} ${cx + w},${cy} ${cx},${cy + dy} ${cx - w},${cy}" fill="${c[0]}"/>`; };
  const cover = (kind, n) => {
    const P = { a: ["#9db0ff", "#4361ee", "#3347b8"], b: ["#c3aeff", "#6b4cf0", "#5236c4"], c: ["#eef1ff", "#c3cef7", "#a9b8f0"] };
    const sphere = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#s${n})"/>`;
    let art = "";
    if (kind === "local") {
      art = `<ellipse cx="300" cy="372" rx="250" ry="38" fill="rgba(67,97,238,.12)"/>${iso(300, 300, 200, 26, P.c)}<ellipse cx="300" cy="300" rx="120" ry="60" fill="none" stroke="#4361ee" stroke-width="2" stroke-dasharray="6 7" opacity=".6"/><ellipse cx="300" cy="300" rx="38" ry="15" fill="rgba(67,97,238,.25)"/><path d="M300 288 L267 205 A39 39 0 1 1 333 205 Z" fill="url(#p${n})"/><circle cx="300" cy="172" r="14" fill="#fff"/>${sphere(430, 150, 20)}${sphere(165, 230, 12)}`;
    } else if (kind === "b2b") {
      art = `<ellipse cx="300" cy="375" rx="250" ry="38" fill="rgba(67,97,238,.12)"/>${iso(300, 226, 200, 44, P.c)}${iso(300, 182, 150, 44, P.a)}${iso(300, 138, 100, 44, P.b)}${sphere(300, 62, 24)}${sphere(470, 120, 14)}${sphere(130, 190, 18)}`;
    } else {
      const hs = [70, 120, 170, 230];
      art = `<ellipse cx="300" cy="385" rx="265" ry="38" fill="rgba(67,97,238,.12)"/>${hs.map((h, i) => iso(150 + i * 100, 380 - 24 - h, 48, h, i % 2 ? P.b : P.a)).join("")}${sphere(450, 78, 26)}${sphere(130, 200, 12)}`;
    }
    return `<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="bg${n}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3f5ff"/><stop offset="1" stop-color="#d7defd"/></linearGradient><radialGradient id="s${n}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#b6c4ff"/><stop offset="1" stop-color="#4a3fd0"/></radialGradient><linearGradient id="p${n}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6f86ff"/><stop offset="1" stop-color="#5236c4"/></linearGradient></defs><rect width="600" height="450" fill="url(#bg${n})"/><circle cx="520" cy="60" r="110" fill="rgba(124,92,255,.14)"/>${art}</svg>`;
  };
  const media = (s, n) => s.image
    ? `<img src="${esc(s.image)}" alt="${esc(s.imageAlt || s.client)}" loading="lazy" width="1200" height="900">`
    : `${cover(s.cover, n)}<span class="cover-tag">Sample illustration</span>`;
  const demoTag = '<span class="demo">Demo Content — Replace Before Publishing</span>';
  const caseCards = (list) => list.map((s, i) => `<a class="card case-card reveal" href="/case-studies/#${esc(s.slug)}"><div class="thumb">${media(s, "c" + i)}</div><div class="body">${s.demo ? demoTag : ""}<h3>${esc(s.client)}</h3><p class="tag">${esc(s.industry)} · ${esc(s.timeframe)}</p><p class="muted">${esc(s.summary || s.challenge)}</p><span class="more">Read the story →</span></a>`.replace(/<\/a>$/, "</div></a>")).join("");
  const stories = (list) => list.map((s, i) => `<article class="story reveal" id="${esc(s.slug)}">
<div class="story-media"><div class="frame">${media(s, "s" + i)}</div></div>
<div class="story-body">${s.demo ? demoTag : ""}<p class="tag">${esc(s.industry)} · ${esc(s.timeframe)}</p><h2>${esc(s.client)}</h2>
${(s.services || []).length ? `<div class="chips">${s.services.map((x) => `<span>${esc(x)}</span>`).join("")}</div>` : ""}
<h3>The challenge</h3><p class="muted">${esc(s.challenge)}</p><h3>Our strategy</h3><p class="muted">${esc(s.strategy)}</p><h3>The results</h3><p class="muted">${esc(s.results)}</p>
${(s.stats || []).length ? `<div class="stats">${s.stats.map((x) => `<div class="stat"><b>${esc(x.value)}</b><span>${esc(x.label)}</span></div>`).join("")}</div>` : ""}
${s.quote && s.quote.text ? `<blockquote class="quote">“${esc(s.quote.text)}”<footer>${esc(s.quote.name || "")}${s.quote.role ? `, ${esc(s.quote.role)}` : ""}</footer></blockquote>` : ""}
</div></article>`).join("");

  const faqs = [
    ["What services does ADZIVO offer?", "We manage paid social advertising on Meta platforms, including Facebook and Instagram campaigns, creative strategy and testing, lead generation, retargeting and funnel optimization, plus tracking, analytics and reporting."],
    ["Which businesses are a good fit?", "Businesses with a clear offer, a defined customer and the ability to follow up on leads or fulfil orders. E-commerce, local service, professional service and B2B companies can all be a fit; we'll tell you honestly on the first call if paid social isn't right for you yet."],
    ["What is the minimum advertising budget?", c.minBudgetNote || "It depends on your goals, market and offer. Your budget should be enough to gather meaningful data. We'll discuss a realistic range on your strategy call."],
    ["How do you measure campaign success?", "We agree on goals up front, such as cost per qualified lead or cost per acquisition, and track them through reporting we explain in plain language. We focus on business outcomes, not vanity metrics."],
    ["How long does it take to launch campaigns?", "Timelines depend on how ready your tracking, creative and landing pages are. We'll give a realistic schedule after discovery."],
    ["Do clients pay advertising spend directly to Meta?", "Typically yes. Ads run in your own ad account and you pay the platform directly. Our management fee is separate from your advertising spend."],
    ["Do you provide creative and landing-page support?", "We provide creative strategy, concepts and testing, and recommendations for landing pages and funnels. The exact scope is confirmed during onboarding."],
    ["How can I book a consultation?", "Use the Book a Strategy Call button on any page, or send us a message through the contact form."],
  ];
  const faqHtml = faqs.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join("");

  const out = [];
  const add = (p) => out.push({ index: !p.noindex, file: p.path === "/" ? "index.html" : p.path === "/404" ? "404.html" : `${p.path.slice(1)}/index.html`, path: p.path, html: layout(p) });

  /* ---------- HOME ---------- */
  const approach = c.testimonials.length
    ? `<section class="sec"><div class="wrap">${head("Testimonials", "What clients say")}<div class="grid g3">${c.testimonials.map((t) => `<figure class="card reveal"><blockquote>“${esc(t.quote)}”</blockquote><figcaption>${esc(t.name)}${t.role ? `, ${esc(t.role)}` : ""}</figcaption></figure>`).join("")}</div></div></section>`
    : `<section class="sec alt"><div class="wrap">${head("Our Approach", "Clear thinking before ad spend", "We keep things simple: understand the business, test with discipline, report honestly and invest more only where the data supports it.")}</div></section>`;

  add({ schema: [{ "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }], path: "/", title: `${c.name} — ${c.tagline}`, desc: "ADZIVO helps ambitious businesses build smarter paid social campaigns, generate qualified leads and make better decisions with performance-focused advertising.", body: `
<section class="hero"><div class="wrap hero-in">
<div class="hero-copy"><span class="eyebrow">Paid Social Advertising Agency</span>
<h1>Turn Ad Spend Into <span class="grad">Scalable Growth.</span></h1>
<p class="lead">We help ambitious businesses build smarter paid social campaigns, generate qualified leads, and make better decisions with performance-focused advertising.</p>
<div class="actions">${bookBtn()}${btn("/services/", "Explore Our Services", "btn-ghost")}</div></div>
<div class="viz" role="img" aria-label="Illustration of campaign creative testing, lead acquisition and analytics. Illustrative only, not real data.">
<div class="vcard main"><div class="vhead"><i></i><i></i><i></i><span>Campaign overview</span></div>
<div class="bars">${[40, 62, 48, 78, 58, 90, 70].map((h, i) => `<b style="--h:${h}%;--d:${i * 0.12}s"></b>`).join("")}</div>
<svg class="line" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 C40 45 60 30 100 34 S170 14 210 20 270 4 300 6" /></svg></div>
<div class="vcard fl f1"><small>Creative test</small><div class="pills"><span></span><span class="on"></span><span></span></div></div>
<div class="vcard fl f2"><small>New lead</small><div class="dotline"><u></u><em></em></div></div>
<div class="vcard fl f3"><small>Tracking active</small><div class="check">✓</div></div>
<i class="orb o1"></i><i class="orb o2"></i><p class="viz-note">Illustrative visual — not real data</p></div>
</div></section>

<section class="strip"><div class="wrap strip-in"><span>Independent agency</span><span>Transparent reporting</span><span>No guaranteed-result promises</span><span>You keep control of your ad account</span></div></section>

<section class="sec"><div class="wrap">${head("Services", "Everything paid social needs, in one team", "From strategy and creative to tracking and reporting.")}
<div class="grid g3">${c.services.map((s) => `<a class="card svc reveal" href="/services/#${s.slug}"><h3>${s.title}</h3><p class="muted">${s.short}</p><span class="more">Learn more →</span></a>`).join("")}</div></div></section>

${c.showCaseStudies ? `<section class="sec alt"><div class="wrap">${head("Case Studies", "Results, told honestly", "Client stories will appear here once approved for publication.")}
<div class="grid g3">${caseCards(studies.slice(0, 3))}</div><p class="center">${btn("/case-studies/", "View Case Studies", "btn-ghost")}</p></div></section>` : ""}

<section class="sec"><div class="wrap">${head("Our Process", "Four stages from idea to scale")}
<ol class="steps">${[["Discover", "Understand business goals, audience, offer, and economics."], ["Strategize", "Build campaign strategy, creative direction, and tracking plans."], ["Launch & Optimize", "Test, monitor, and improve campaigns."], ["Scale", "Expand what works with transparent reporting."]].map(([t, d], i) => `<li class="card reveal"><span class="num">0${i + 1}</span><h3>${t}</h3><p class="muted">${d}</p></li>`).join("")}</ol></div></section>

<section class="sec alt"><div class="wrap">${head("Who We Help", "Built for businesses that grow through customers")}
<div class="grid g4">${[["E-commerce", "Online stores looking to acquire and retain customers profitably."], ["Local services", "Businesses that win customers through enquiries and calls."], ["Professional services", "Firms that rely on qualified consultations."], ["B2B companies", "Teams generating pipeline through targeted outreach."]].map(([t, d]) => `<div class="card reveal"><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}</div></div></section>

<section class="sec"><div class="wrap">${head("Why ADZIVO", "A business-first approach to advertising")}
<div class="grid g3">${[["Strategic thinking", "Every campaign starts from your goals and unit economics."], ["Clear communication", "Plain-language updates, no jargon walls."], ["Creative experimentation", "Structured tests that produce real learnings."], ["Transparent reporting", "You see what we see, including what isn't working."], ["Business-focused optimization", "We optimize for outcomes that matter to your bottom line."]].map(([t, d]) => `<div class="card reveal"><h3>${t}</h3><p class="muted">${d}</p></div>`).join("")}</div></div></section>

${approach}

<section class="sec"><div class="wrap narrow">${head("FAQ", "Frequently asked questions")}<div class="reveal">${faqHtml}</div></div></section>
${cta()}` });

  /* ---------- SERVICES ---------- */
  add({ schema: [{ "@type": "ItemList", itemListElement: c.services.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Service", name: s.title, description: s.short, url: `${base}/services/#${s.slug}`, provider: { "@id": base + "/#org" } } })) }], path: "/services/", title: "Services", desc: "Meta Ads management, Facebook and Instagram campaigns, creative testing, lead generation, retargeting and analytics from ADZIVO.", body: `
<section class="page-hero"><div class="wrap"><span class="eyebrow">Services</span><h1>Paid social services built around your goals</h1><p class="lead">Every engagement starts with understanding your business. We don't promise specific sales, leads or return on ad spend, because results depend on your offer, market and budget.</p></div></section>
<section class="sec"><div class="wrap"><div class="note">Our management fee and your advertising spend are separate. Ad spend is paid to the advertising platform from your own ad account; our fee covers strategy, management and reporting.</div>
${c.services.map((s) => `<article class="svc-detail card reveal" id="${s.slug}"><h2>${s.title}</h2><p class="muted">${s.short}</p>
<div class="cols"><div><h3>Deliverables</h3><ul>${s.deliverables.map((d) => `<li>${d}</li>`).join("")}</ul></div>
<div><h3>Process</h3><ol>${s.process.map((d) => `<li>${d}</li>`).join("")}</ol></div>
<div><h3>Ideal client</h3><p class="muted">${s.ideal}</p></div></div>${bookBtn("Discuss This Service", "btn-ghost")}</article>`).join("")}</div></section>${cta()}` });

  /* ---------- CASE STUDIES ---------- */
  if (c.showCaseStudies) add({ path: "/case-studies/", title: "Case Studies", desc: "Client stories from ADZIVO paid social campaigns: the challenge, our strategy and the results.", body: `
<section class="page-hero"><div class="wrap"><span class="eyebrow">Case Studies</span><h1>Client stories</h1><p class="lead">How we approach each business: the challenge, the strategy and what happened next.</p></div></section>
<section class="sec"><div class="wrap">${studies.some((s) => s.demo) ? '<div class="note">Demo content: these sample stories show the layout. Replace them with verified, client-approved results before publishing.</div>' : ""}${stories(studies)}</div></section>${cta()}` });

  /* ---------- ABOUT ---------- */
  const team = c.team.length ? `<section class="sec alt"><div class="wrap">${head("Team", "The people behind the campaigns")}<div class="grid g3">${c.team.map((m) => `<div class="card reveal"><h3>${esc(m.name)}</h3><p class="tag">${esc(m.role)}</p><p class="muted">${esc(m.bio || "")}</p></div>`).join("")}</div></div></section>` : "";
  add({ path: "/about/", title: "About Us", desc: "ADZIVO is a performance-focused paid social agency helping businesses make smarter advertising decisions.", body: `
<section class="page-hero"><div class="wrap"><span class="eyebrow">About ${c.name}</span><h1>A performance-focused agency, built on clarity</h1><p class="lead">${c.name} is an independent digital marketing agency specializing in paid social advertising.</p></div></section>
<section class="sec"><div class="wrap grid g2"><div class="card reveal"><h2>Our mission</h2><p class="muted">To help businesses turn advertising spend into sustainable growth through thoughtful strategy, disciplined testing and honest reporting.</p></div>
<div class="card reveal"><h2>How we work</h2><ul><li>Start from business goals, not platform features</li><li>Test creative and audiences with discipline</li><li>Report openly, including what didn't work</li><li>Scale only what the data supports</li></ul></div></div></section>${team}${cta()}` });

  /* ---------- CONTACT ---------- */
  const opt = (a) => a.map((o) => `<option>${o}</option>`).join("");
  add({ schema: [{ "@type": "ContactPage", url: base + "/contact/", name: "Contact " + c.name }], path: "/contact/", form: true, title: "Contact", desc: "Contact ADZIVO to discuss your paid social advertising goals or book a strategy call.", body: `
<section class="page-hero"><div class="wrap"><span class="eyebrow">Contact</span><h1>Let's talk about your goals</h1><p class="lead">Send us a message or book a strategy call directly.</p><div class="actions">${bookBtn()}</div></div></section>
<section class="sec" id="form"><div class="wrap grid g2c">
<form id="contact-form" class="card" novalidate>
<div class="f"><label for="name">Full name *</label><input id="name" name="name" autocomplete="name" required maxlength="100"><p class="err" id="e-name"></p></div>
<div class="f"><label for="email">Business email *</label><input id="email" name="email" type="email" autocomplete="email" required maxlength="150"><p class="err" id="e-email"></p></div>
<div class="f"><label for="company">Company or website</label><input id="company" name="company" maxlength="150"></div>
<div class="f"><label for="budget">Monthly advertising budget *</label><select id="budget" name="budget" required><option value="">Select…</option>${opt(["Under $1,000", "$1,000 – $5,000", "$5,000 – $20,000", "$20,000+", "Not sure yet"])}</select><p class="err" id="e-budget"></p></div>
<fieldset class="f"><legend>Services required</legend><div class="checks">${c.services.map((s) => `<label class="chk"><input type="checkbox" name="services" value="${esc(s.title)}"> ${s.title}</label>`).join("")}</div></fieldset>
<div class="f"><label for="message">Message *</label><textarea id="message" name="message" rows="5" required maxlength="3000"></textarea><p class="err" id="e-message"></p></div>
<div class="hp" aria-hidden="true"><label>Leave empty<input name="nickname" tabindex="-1" autocomplete="off"></label></div>
<div class="f"><label class="chk"><input type="checkbox" name="consent" id="consent" required> I agree to the <a href="/privacy/">Privacy Policy</a> and consent to being contacted about my enquiry. *</label><p class="err" id="e-consent"></p></div>
${c.turnstileSiteKey ? `<div class="cf-turnstile" data-sitekey="${esc(c.turnstileSiteKey)}"></div>` : ""}
<button class="btn btn-primary" type="submit" id="submit">Send Message</button>
<div id="status" role="status" aria-live="polite"></div></form>
<aside class="card"><h2>Other ways to reach us</h2>${contactLines.length ? `<ul class="plain">${contactLines.join("")}</ul>` : '<p class="muted">Use the form or book a strategy call. We\'ll reply to the email address you provide.</p>'}<p class="muted">We don't make guarantees about specific results, and we'll always be upfront about whether we're a good fit.</p></aside></div></section>` });

  /* ---------- LEGAL ---------- */
  const L = c.legal || {};
  const mail = c.contact.email ? `<a href="mailto:${esc(c.contact.email)}">${esc(c.contact.email)}</a>` : "";
  const reach = mail ? `Email us at ${mail} or use our <a href="/contact/">contact form</a>.` : `Use our <a href="/contact/">contact form</a>.`;
  const operator = L.legalName ? `${c.name} is operated by ${esc(L.legalName)}.` : `${c.name} is an independent marketing agency.`;
  const legal = (path, title, intro, secs) => add({ path, title, desc: `${title} for ${c.name}.`, body: `
<section class="page-hero"><div class="wrap"><h1>${title}</h1>${L.lastUpdated ? `<p class="muted">Last updated: ${esc(L.lastUpdated)}</p>` : ""}</div></section>
<!-- Generic template: have a qualified legal professional review this before relying on it. -->
<section class="sec"><div class="wrap narrow prose"><p>${intro}</p>${secs.filter(Boolean).map(([h, x]) => `<h2>${h}</h2><p>${x}</p>`).join("")}</div></section>` });
  legal("/privacy/", "Privacy Policy", `This policy explains how ${c.name} handles personal information collected through this website. ${operator}`, [
    ["Information we collect", "When you use our contact form we collect your name, business email, company or website, budget range, services of interest and message. Our hosting provider also receives standard technical data, such as your IP address, when you visit the site."],
    ["How we use it", "We use this information to respond to your enquiry, to provide our services and to keep the website secure. We do not sell your personal information."],
    ["Cookies", "This website does not currently use advertising or analytics cookies."],
    ["Service providers", `We use service providers to run this website: Cloudflare (hosting and security) and Resend (delivery of contact-form messages by email)${c.contact.bookingUrl ? ", plus the scheduling service you use when booking a call" : ""}. They process data on our behalf.`],
    ["Your rights", `Depending on where you live, you may have rights to access, correct or delete your personal information. ${reach}`],
    ["Contact", reach]]);
  legal("/terms/", "Terms of Service", `These terms govern your use of the ${c.name} website and, together with any written agreement, our services. ${operator}`, [
    ["Use of this website", "Content is provided for general information and does not constitute a guarantee of any result."],
    ["Services and fees", "Services are described in a separate written agreement. Management fees are separate from advertising spend paid to advertising platforms."],
    ["No guarantee of results", "Advertising performance depends on many factors outside our control. We do not guarantee sales, leads or return on ad spend."],
    ["Independence", `${c.name} is an independent agency and is not affiliated with or endorsed by Meta. Platform names are used only to describe relevant services.`],
    L.jurisdiction && ["Governing law", `These terms are governed by the laws of ${esc(L.jurisdiction)}.`],
    ["Contact", reach]]);

  /* ---------- 404 ---------- */
  add({ path: "/404", noindex: true, title: "Page Not Found", desc: "The page you were looking for could not be found.", body: `
<section class="page-hero center"><div class="wrap"><span class="eyebrow">404</span><h1>Page not found</h1><p class="lead">That page doesn't exist or has moved.</p><div class="actions" style="justify-content:center">${btn("/", "Back to Home")}${btn("/contact/", "Contact Us", "btn-ghost")}</div></div></section>` });

  return out;
}
