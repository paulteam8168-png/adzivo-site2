const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function pages(c, base) {
  const book = c.contact.bookingUrl || "/contact/#form";
  const bookExt = c.contact.bookingUrl ? ' target="_blank" rel="noopener noreferrer"' : "";
  const nav = [["/services/", "Services"], ["/case-studies/", "Case Studies"], ["/about/", "About"], ["/contact/", "Contact"]];

  const logo = `<svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M8 23 16 8l8 15h-4.2L16 15.6 12.2 23z" fill="#fff"/></svg>`;
  const btn = (href, text, cls = "btn-primary", extra = "") => `<a class="btn ${cls}" href="${href}"${extra}>${text}</a>`;
  const bookBtn = (text = "Book a Strategy Call", cls = "btn-primary") => btn(book, text, cls, bookExt);

  const contactLines = [
    c.contact.email && `<li><a href="mailto:${esc(c.contact.email)}">${esc(c.contact.email)}</a></li>`,
    c.contact.phone && `<li><a href="tel:${esc(c.contact.phone.replace(/\s/g, ""))}">${esc(c.contact.phone)}</a></li>`,
    c.contact.location && `<li>${esc(c.contact.location)}</li>`,
  ].filter(Boolean);

  const layout = ({ path, title, desc, body, noindex = false, form = false }) => {
    const full = path === "/" ? title : `${title} | ${c.name}`;
    const url = base + path;
    return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#070b1a">
<meta property="og:type" content="website"><meta property="og:site_name" content="${c.name}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${base}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
${form && c.turnstileSiteKey ? '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>' : ""}
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

  const caseCards = (list) => list.map((s) => `<article class="card case reveal">
${s.demo ? '<span class="demo">Demo Content — Replace Before Publishing</span>' : ""}
<h3>${esc(s.client)}</h3><p class="tag">${esc(s.industry)} · ${esc(s.timeframe)}</p>
<dl><dt>Challenge</dt><dd>${esc(s.challenge)}</dd><dt>Strategy</dt><dd>${esc(s.strategy)}</dd><dt>Results</dt><dd>${esc(s.results)}</dd></dl></article>`).join("");

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

  add({ path: "/", title: `${c.name} — ${c.tagline}`, desc: "ADZIVO helps ambitious businesses build smarter paid social campaigns, generate qualified leads and make better decisions with performance-focused advertising.", body: `
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
<p class="viz-note">Illustrative visual — not real data</p></div>
</div></section>

<section class="strip"><div class="wrap strip-in"><span>Independent agency</span><span>Transparent reporting</span><span>No guaranteed-result promises</span><span>You keep control of your ad account</span></div></section>

<section class="sec"><div class="wrap">${head("Services", "Everything paid social needs, in one team", "From strategy and creative to tracking and reporting.")}
<div class="grid g3">${c.services.map((s) => `<a class="card svc reveal" href="/services/#${s.slug}"><h3>${s.title}</h3><p class="muted">${s.short}</p><span class="more">Learn more →</span></a>`).join("")}</div></div></section>

<section class="sec alt"><div class="wrap">${head("Case Studies", "Results, told honestly", "Client stories will appear here once approved for publication.")}
<div class="grid g3">${caseCards(c.caseStudies)}</div><p class="center">${btn("/case-studies/", "View Case Studies", "btn-ghost")}</p></div></section>

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
  add({ path: "/services/", title: "Services", desc: "Meta Ads management, Facebook and Instagram campaigns, creative testing, lead generation, retargeting and analytics from ADZIVO.", body: `
<section class="page-hero"><div class="wrap"><span class="eyebrow">Services</span><h1>Paid social services built around your goals</h1><p class="lead">Every engagement starts with understanding your business. We don't promise specific sales, leads or return on ad spend, because results depend on your offer, market and budget.</p></div></section>
<section class="sec"><div class="wrap"><div class="note">Our management fee and your advertising spend are separate. Ad spend is paid to the advertising platform from your own ad account; our fee covers strategy, management and reporting.</div>
${c.services.map((s) => `<article class="svc-detail card reveal" id="${s.slug}"><h2>${s.title}</h2><p class="muted">${s.short}</p>
<div class="cols"><div><h3>Deliverables</h3><ul>${s.deliverables.map((d) => `<li>${d}</li>`).join("")}</ul></div>
<div><h3>Process</h3><ol>${s.process.map((d) => `<li>${d}</li>`).join("")}</ol></div>
<div><h3>Ideal client</h3><p class="muted">${s.ideal}</p></div></div>${bookBtn("Discuss This Service", "btn-ghost")}</article>`).join("")}</div></section>${cta()}` });

  /* ---------- CASE STUDIES ---------- */
  add({ path: "/case-studies/", title: "Case Studies", desc: "Case studies from ADZIVO paid social campaigns.", body: `
<section class="page-hero"><div class="wrap"><span class="eyebrow">Case Studies</span><h1>Client stories</h1><p class="lead">The examples below are templates. Replace them with verified, client-approved results before publishing.</p></div></section>
<section class="sec"><div class="wrap"><div class="grid g3">${caseCards(c.caseStudies)}</div></div></section>${cta()}` });

  /* ---------- ABOUT ---------- */
  const team = c.team.length ? `<section class="sec alt"><div class="wrap">${head("Team", "The people behind the campaigns")}<div class="grid g3">${c.team.map((m) => `<div class="card reveal"><h3>${esc(m.name)}</h3><p class="tag">${esc(m.role)}</p><p class="muted">${esc(m.bio || "")}</p></div>`).join("")}</div></div></section>` : "";
  add({ path: "/about/", title: "About Us", desc: "ADZIVO is a performance-focused paid social agency helping businesses make smarter advertising decisions.", body: `
<section class="page-hero"><div class="wrap"><span class="eyebrow">About ${c.name}</span><h1>A performance-focused agency, built on clarity</h1><p class="lead">${c.name} is an independent digital marketing agency specializing in paid social advertising.</p></div></section>
<section class="sec"><div class="wrap grid g2"><div class="card reveal"><h2>Our mission</h2><p class="muted">To help businesses turn advertising spend into sustainable growth through thoughtful strategy, disciplined testing and honest reporting.</p></div>
<div class="card reveal"><h2>How we work</h2><ul><li>Start from business goals, not platform features</li><li>Test creative and audiences with discipline</li><li>Report openly, including what didn't work</li><li>Scale only what the data supports</li></ul></div></div></section>${team}${cta()}` });

  /* ---------- CONTACT ---------- */
  const opt = (a) => a.map((o) => `<option>${o}</option>`).join("");
  add({ path: "/contact/", form: true, title: "Contact", desc: "Contact ADZIVO to discuss your paid social advertising goals or book a strategy call.", body: `
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
  const legal = (path, title, intro, secs) => add({ path, title, desc: `${title} for ${c.name}.`, body: `
<section class="page-hero"><div class="wrap"><h1>${title}</h1></div></section>
<section class="sec"><div class="wrap narrow prose"><div class="note">Template for review. Have this document reviewed by a qualified legal professional and complete the bracketed details before relying on it.</div><p>${intro}</p>${secs.map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join("")}<p class="muted">Last updated: [add date]</p></div></section>` });
  legal("/privacy/", "Privacy Policy", `This policy explains how ${c.name} handles personal information collected through this website.`, [
    ["Information we collect", "When you use our contact form we collect your name, business email, company or website, budget range, services of interest and message."],
    ["How we use it", "We use this information to respond to your enquiry and to provide and improve our services. We do not sell your personal information."],
    ["Service providers", "Your submission may be processed by email, scheduling and hosting providers that help us operate the website. [List providers used.]"],
    ["Your rights", "Depending on where you live, you may have rights to access, correct or delete your personal information. Contact us using the details on this site."],
    ["Contact", "[Add the business's legal name and contact email.]"]]);
  legal("/terms/", "Terms of Service", `These terms govern your use of the ${c.name} website and, together with any written agreement, our services.`, [
    ["Use of this website", "Content is provided for general information and does not constitute a guarantee of any result."],
    ["Services and fees", "Services are described in a separate written agreement. Management fees are separate from advertising spend paid to advertising platforms."],
    ["No guarantee of results", "Advertising performance depends on many factors outside our control. We do not guarantee sales, leads or return on ad spend."],
    ["Independence", `${c.name} is an independent agency and is not affiliated with or endorsed by Meta. Platform names are used only to describe relevant services.`],
    ["Governing law", "[Add governing law and jurisdiction.]"]]);

  /* ---------- 404 ---------- */
  add({ path: "/404", noindex: true, title: "Page Not Found", desc: "The page you were looking for could not be found.", body: `
<section class="page-hero center"><div class="wrap"><span class="eyebrow">404</span><h1>Page not found</h1><p class="lead">That page doesn't exist or has moved.</p><div class="actions" style="justify-content:center">${btn("/", "Back to Home")}${btn("/contact/", "Contact Us", "btn-ghost")}</div></div></section>` });

  return out;
}
