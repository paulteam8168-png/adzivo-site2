import { sceneVisual } from "./scenes.mjs";
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function pages(c, base) {
  const book = c.contact.bookingUrl || "/contact/#form";
  const bookExt = c.contact.bookingUrl ? ' target="_blank" rel="noopener noreferrer" data-calendly-popup="true"' : "";
  const nav = [["/services/", "Services"], ["/case-studies/", "Portfolio"], ["/about/", "About"], ["/contact/", "Contact"]];

  const logo = `<svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="adz-mark" x1="3" y1="3" x2="36" y2="37" gradientUnits="userSpaceOnUse"><stop stop-color="#d9fff2"/><stop offset=".28" stop-color="#47ffc4"/><stop offset=".52" stop-color="#ebfffa"/><stop offset=".74" stop-color="#168765"/><stop offset="1" stop-color="#92ffdc"/></linearGradient></defs><path d="M4 33 16.7 6.7C17.9 4.1 21.7 4.1 23 6.7L36 33h-7.7L19.8 15.3 11.7 33H4Z" fill="url(#adz-mark)" stroke="#9effd9" stroke-width=".7"/><path d="m15.4 25.2 4.6-9.5 5 9.5h-9.6Z" fill="#02251a"/><path d="M16 30.5h11.8" stroke="#dafff2" stroke-width="2.8" stroke-linecap="round"/></svg>`;
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
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#03170f">
<meta property="og:type" content="website"><meta property="og:site_name" content="${c.name}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${base}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/chrome-unified.css">
<link rel="stylesheet" href="/scenes.css">
<link rel="stylesheet" href="/experience.css">
${c.contact.bookingUrl ? '<link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css">' : ""}
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
<div><h3>Company</h3><ul class="plain"><li><a href="/">Home</a></li>${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="/privacy/">Privacy Policy</a></li><li><a href="/terms/">Terms of Service</a></li><li><a href="/book-a-call/">Booking Page</a></li></ul></div>
</div><div class="wrap copy">© <span data-year>${new Date().getFullYear()}</span> ${c.name}. All rights reserved.</div></footer>
<script src="/main.js" defer></script>
${c.contact.bookingUrl ? '<script src="https://assets.calendly.com/assets/external/widget.js" async></script>' : ""}
</body></html>`;
  };

  const cta = (h = "Ready to Make Your Marketing Work Harder?", t = "Let's Talk About Your Goals") =>
    `<section class="sec"><div class="wrap"><div class="cta-box reveal"><h2>${h}</h2><p class="muted">Tell us about your business and goals. We'll tell you honestly whether paid social is a good fit.</p>${bookBtn(t)}</div></div></section>`;

  const head = (eyebrow, h, p = "") => `<div class="sec-head reveal"><span class="eyebrow">${eyebrow}</span><h2>${h}</h2>${p ? `<p class="muted">${p}</p>` : ""}</div>`;

  // Reusable chrome growth sculpture. Purely illustrative artwork, not a performance claim.
  const chromeScene = (label = "GROWTH / IN MOTION") => `<div class="chrome-scene" aria-hidden="true">
    <div class="chrome-halo"></div><div class="chrome-light chrome-light-a"></div><div class="chrome-light chrome-light-b"></div>
    <div class="chrome-rock chrome-rock-left"></div><div class="chrome-rock chrome-rock-right"></div>
    <svg class="chrome-sculpture" viewBox="0 0 680 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="sc-chrome" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#29363b"/><stop offset=".15" stop-color="#efffff"/><stop offset=".33" stop-color="#677881"/><stop offset=".51" stop-color="#ffffff"/><stop offset=".7" stop-color="#74898c"/><stop offset=".86" stop-color="#e4fffa"/><stop offset="1" stop-color="#25383b"/></linearGradient>
        <linearGradient id="sc-face" x1="0" y1="0" x2=".95" y2="1"><stop stop-color="#aaffeb"/><stop offset=".2" stop-color="#ecfffd"/><stop offset=".43" stop-color="#3a6462"/><stop offset=".67" stop-color="#0b2425"/><stop offset="1" stop-color="#9afbe1"/></linearGradient>
        <linearGradient id="sc-side" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#90c9ba"/><stop offset=".19" stop-color="#152c30"/><stop offset=".63" stop-color="#061112"/><stop offset=".9" stop-color="#347569"/><stop offset="1" stop-color="#b1ffe9"/></linearGradient>
        <linearGradient id="sc-mint" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d1fff5"/><stop offset=".35" stop-color="#66ffcf"/><stop offset=".66" stop-color="#00af90"/><stop offset="1" stop-color="#75fff1"/></linearGradient>
        <radialGradient id="sc-floor"><stop stop-color="#03ac81" stop-opacity=".28"/><stop offset=".55" stop-color="#035947" stop-opacity=".09"/><stop offset="1" stop-color="#02100e" stop-opacity="0"/></radialGradient>
        <filter id="sc-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
        <filter id="sc-shadow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="12"/></filter>
      </defs>
      <ellipse cx="343" cy="458" rx="309" ry="64" fill="url(#sc-floor)"/>
      <ellipse cx="345" cy="463" rx="231" ry="28" fill="#000" opacity=".65" filter="url(#sc-shadow)"/>
      <path d="M119 397 Q345 459 572 397 L572 447 Q345 508 119 447 Z" fill="url(#sc-side)" stroke="#3c8f7d" stroke-width="2"/>
      <ellipse cx="345" cy="398" rx="226" ry="57" fill="url(#sc-chrome)" stroke="#c6fff0" stroke-opacity=".82" stroke-width="2"/>
      <ellipse cx="345" cy="393" rx="196" ry="42" fill="#0d1e20" stroke="#57e7c2" stroke-opacity=".75" stroke-width="2"/>
      <ellipse cx="345" cy="393" rx="181" ry="35" fill="#061113" stroke="#a6ffec" stroke-opacity=".23"/>
      <g class="chrome-chart-bars" stroke="#b9fff0" stroke-opacity=".48" stroke-width="1">
        <path d="M210 350 L226 340 L252 340 L236 350 Z" fill="url(#sc-chrome)"/><path d="M236 350 L252 340 V376 L236 386 Z" fill="url(#sc-side)"/><rect x="210" y="350" width="26" height="36" fill="url(#sc-face)"/>
        <path d="M255 319 L271 309 H297 L281 319 Z" fill="url(#sc-chrome)"/><path d="M281 319 L297 309 V376 L281 386 Z" fill="url(#sc-side)"/><rect x="255" y="319" width="26" height="67" fill="url(#sc-face)"/>
        <path d="M300 291 L316 281 H342 L326 291 Z" fill="url(#sc-chrome)"/><path d="M326 291 L342 281 V376 L326 386 Z" fill="url(#sc-side)"/><rect x="300" y="291" width="26" height="95" fill="url(#sc-face)"/>
        <path d="M345 261 L361 251 H387 L371 261 Z" fill="url(#sc-chrome)"/><path d="M371 261 L387 251 V376 L371 386 Z" fill="url(#sc-side)"/><rect x="345" y="261" width="26" height="125" fill="url(#sc-face)"/>
        <path d="M390 226 L406 216 H432 L416 226 Z" fill="url(#sc-chrome)"/><path d="M416 226 L432 216 V376 L416 386 Z" fill="url(#sc-side)"/><rect x="390" y="226" width="26" height="160" fill="url(#sc-face)"/>
        <path d="M435 194 L451 184 H477 L461 194 Z" fill="url(#sc-chrome)"/><path d="M461 194 L477 184 V376 L461 386 Z" fill="url(#sc-side)"/><rect x="435" y="194" width="26" height="192" fill="url(#sc-face)"/>
      </g>
      <path d="M167 319 C241 315 286 269 333 241 C381 212 416 160 456 121" stroke="#4bffcc" stroke-opacity=".6" stroke-width="42" filter="url(#sc-glow)"/>
      <path d="M167 319 C241 315 286 269 333 241 C381 212 416 160 456 121" stroke="#072629" stroke-width="30" stroke-linecap="round"/>
      <path d="M167 319 C241 315 286 269 333 241 C381 212 416 160 456 121" stroke="url(#sc-chrome)" stroke-width="23" stroke-linecap="round"/>
      <path d="M167 313 C241 309 286 263 333 235 C381 206 416 154 456 115" stroke="#e8fffb" stroke-opacity=".75" stroke-width="4" stroke-linecap="round"/>
      <path d="M420 108 L481 74 L480 148 L462 125 L439 151 Z" fill="url(#sc-chrome)" stroke="#c8ffed" stroke-width="3"/>
      <path d="M481 74 L495 83 L494 157 L480 148 Z" fill="url(#sc-side)"/><path d="M420 108 L434 118 L495 83 L481 74 Z" fill="url(#sc-face)"/>
      <ellipse cx="345" cy="449" rx="220" ry="43" stroke="#84ffe0" stroke-opacity=".8" stroke-width="2"/>
      <path d="M132 452 Q345 505 558 452" stroke="#8ffff0" stroke-opacity=".5" stroke-width="3"/>
      <path d="M136 435 Q345 490 554 435" stroke="#8ffff0" stroke-opacity=".25" stroke-width="2"/>
    </svg>
    <div class="chrome-float chrome-float-a"><span class="float-label">STRATEGY / CREATIVE</span><strong>Built for clarity <b>↗</b></strong><div class="float-bars"><i></i><i></i><i></i><i></i><i></i></div></div>
    <div class="chrome-float chrome-float-b"><span class="float-label">PERFORMANCE SYSTEM</span><strong>Smarter decisions <b>✦</b></strong><div class="float-rule"></div></div>
    <div class="chrome-float chrome-float-c"><span class="float-label">${label}</span><strong>ADZIVO <b>✳</b></strong></div>
    <div class="chrome-scene-label">ILLUSTRATIVE 3D ARTWORK · NOT CLIENT RESULTS</div>
  </div>`;

  // Identical sculptural language is shared by interior pages, not substituted with a different theme.
  const pageHeroVisual = (label = "GROWTH / ADZIVO", kind = "services") => `<div class="page-hero-visual" role="img" aria-label="Decorative emerald chrome three-dimensional ${esc(kind)} artwork">${sceneVisual(kind, label)}</div>`;

  const caseCards = (list) => list.filter((s) => !s.demo).map((s) => `<article class="card case reveal">
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

  // These are fictional values shown only on clearly labelled concept demos.
  const conceptDemoMetrics = [
    [["5.8×", "Demo ROAS"], ["3.2%", "Demo CVR"], ["12", "Test concepts"]],
    [["64", "Demo enquiries"], ["74%", "Demo fit rate"], ["8", "Ad variants"]],
    [["27", "Demo meetings"], ["61%", "Demo fit rate"], ["6", "Message angles"]],
  ];
  const conceptMetricStrip = (i) => '<div class="concept-metric-strip" aria-label="Fictional sample campaign data">'
    + (conceptDemoMetrics[i % conceptDemoMetrics.length]).map(([value, name]) => '<div><strong>'+value+'</strong><span>'+name+'</span></div>').join('')
    + '</div><p class="concept-metric-note">Sample data · Not actual client performance</p>';

  /* ---------- HOME ---------- */
  const approach = c.testimonials.length
    ? `<section class="sec"><div class="wrap">${head("Testimonials", "What clients say")}<div class="grid g3">${c.testimonials.map((t) => `<figure class="card reveal"><blockquote>“${esc(t.quote)}”</blockquote><figcaption>${esc(t.name || "ADZIVO Client")}${t.role ? `, ${esc(t.role)}` : ""}</figcaption></figure>`).join("")}</div></div></section>`
    : `<section class="sec alt"><div class="wrap">${head("Our Approach", "Clear thinking before ad spend", "We keep things simple: understand the business, test with discipline, report honestly and invest more only where the data supports it.")}</div></section>`;

  add({ schema: [{ "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }], path: "/", title: `${c.name} — ${c.tagline}`, desc: "ADZIVO helps ambitious businesses build smarter paid social campaigns, generate qualified leads and make better decisions with performance-focused advertising.", body: `
<section class="hero"><div class="wrap hero-in">
<div class="hero-copy"><span class="eyebrow">Paid Social Advertising Agency</span>
<h1>Turn Ad Spend Into <span class="grad">Scalable Growth.</span></h1>
<p class="lead">We help ambitious businesses build smarter paid social campaigns, generate qualified leads, and make better decisions with performance-focused advertising.</p>
<div class="actions">${bookBtn()}${btn("/services/", "Explore Our Services", "btn-ghost")}</div></div>
<div class="viz hero-3d-scene" role="img" aria-label="Decorative chrome growth chart with emerald-green lighting">${chromeScene("PERFORMANCE / SYSTEM 01")}</div>
</div></section>

<section class="strip"><div class="wrap strip-in"><span>Independent agency</span><span>Transparent reporting</span><span>No guaranteed-result promises</span><span>You keep control of your ad account</span></div></section>

<section class="sec campaign-lab-section" id="campaign-lab"><div class="wrap campaign-lab-grid">
  <div class="lab-copy reveal"><span class="eyebrow">The ADZIVO campaign lab</span>
    <h2>Campaign insights, <span class="grad">beautifully clear.</span></h2>
    <p class="lead">Explore how creative tests, audience signals and reporting can be organised for different types of businesses. This is an interactive example.</p>
    <div class="lab-tabs" role="group" aria-label="Choose an illustrative campaign scenario">
      <button type="button" class="lab-tab active" data-lab-scenario="ecommerce" aria-pressed="true">E-commerce</button>
      <button type="button" class="lab-tab" data-lab-scenario="local" aria-pressed="false">Local services</button>
      <button type="button" class="lab-tab" data-lab-scenario="b2b" aria-pressed="false">B2B</button>
    </div>
    <p class="lab-disclaimer"><strong>Demo only.</strong> Sample metrics are fictional and do not represent real clients, campaign results, or guaranteed outcomes.</p>
    <a class="btn btn-ghost" href="/services/">Discover Our Approach</a>
  </div>
  <div class="lab-dashboard reveal" role="group" aria-label="Interactive campaign analytics demonstration containing fictional numbers">
    <div class="lab-dashboard-top"><span class="lab-live-dot"></span><span>ADZIVO / SAMPLE CAMPAIGN</span><span class="lab-demo-badge">DEMO DATA</span></div>
    <div class="lab-dashboard-title"><div><span>Scenario visualisation</span><h3 data-lab-title>Creative testing</h3></div><span class="lab-arrow">↗</span></div>
    <div class="lab-stat-grid">
      <div><small data-lab-label-1>Sample ROAS</small><strong data-lab-value-1>5.8×</strong><span>ILLUSTRATIVE</span></div>
      <div><small data-lab-label-2>Sample conversion rate</small><strong data-lab-value-2>3.2%</strong><span>ILLUSTRATIVE</span></div>
      <div><small data-lab-label-3>Creative variations</small><strong data-lab-value-3>12</strong><span>ILLUSTRATIVE</span></div>
    </div>
    <div class="lab-chart-top"><span>Campaign learning signals</span><small>VISUAL EXAMPLE · NOT REAL DATA</small></div>
    <div class="lab-chart" aria-hidden="true"><div class="lab-chart-bars">
      <i style="--bar:32%"></i><i style="--bar:47%"></i><i style="--bar:40%"></i><i style="--bar:69%"></i><i style="--bar:58%"></i><i style="--bar:81%"></i><i style="--bar:93%"></i>
    </div><div class="lab-chart-line"></div></div>
    <div class="lab-insight"><span class="lab-insight-icon">✦</span><div><small>EXAMPLE NEXT STEP</small><p data-lab-insight>Compare hooks and creative formats before increasing spend.</p></div></div>
    <div class="lab-dashboard-footer"><span>STRATEGY</span><span>CREATIVE</span><span>MEASUREMENT</span></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">${head("Services", "Everything paid social needs, in one team", "From strategy and creative to tracking and reporting.")}
<div class="grid g3">${c.services.map((s) => `<a class="card svc reveal" href="/services/#${s.slug}"><h3>${s.title}</h3><p class="muted">${s.short}</p><span class="more">Learn more →</span></a>`).join("")}</div></div></section>

${c.showCaseStudies ? `<section class="sec alt"><div class="wrap">${head("Portfolio", "Strategy before spend", "Explore illustrative campaign concepts showing how ADZIVO approaches creative testing, lead generation and measurement. These are concept previews, not client case studies or performance claims.")}
<div class="grid g3">${c.caseStudies.slice(0, 3).map((s, i) => `<article class="card reveal portfolio-teaser"><div class="project-mini-art mini-${esc(s.cover || "ecom")}"><span>CONCEPT / 0${i + 1}</span><div class="mini-sculpture"><i></i></div></div><span class="eyebrow">Concept preview · 0${i + 1}</span><h3>${esc(s.client)}</h3><p class="tag">${esc(s.industry)} · Illustrative strategy</p><p class="muted">${esc(s.summary || s.challenge)}</p>${s.demo ? conceptMetricStrip(i) : ""}<a class="more" href="/case-studies/">Explore approach →</a></article>`).join("")}</div><p class="center">${btn("/case-studies/", "Explore Portfolio", "btn-ghost")}</p></div></section>` : ""}

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
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">Services</span><h1>Paid social services built around your goals</h1><p class="lead">Every engagement starts with understanding your business. We don't promise specific sales, leads or return on ad spend, because results depend on your offer, market and budget.</p></div>${pageHeroVisual("PAID SOCIAL / SYSTEM 01", "services")}</div></section>
<section class="sec services-overview"><div class="wrap">
<div class="sec-head reveal"><span class="eyebrow">Our expertise</span><h2>A complete growth system, not disconnected tactics</h2><p class="muted">Explore how every element of paid social fits into one connected strategy.</p></div>
<div class="grid g3">${c.services.map((s,i) => `<a class="card svc reveal" href="#${s.slug}"><span class="service-symbol">${["✳","◉","✦","↗","◎","▥"][i] || "↗"}</span><span class="service-index">0${i+1} / SERVICE</span><h3>${esc(s.title)}</h3><p class="muted">${esc(s.short)}</p><span class="more">Explore service →</span></a>`).join("")}</div></div></section>
<section class="sec"><div class="wrap"><div class="note">Our management fee and your advertising spend are separate. Ad spend is paid to the advertising platform from your own ad account; our fee covers strategy, management and reporting.</div>
${c.services.map((s) => `<article class="svc-detail card reveal" id="${s.slug}"><h2>${s.title}</h2><p class="muted">${s.short}</p>
<div class="cols"><div><h3>Deliverables</h3><ul>${s.deliverables.map((d) => `<li>${d}</li>`).join("")}</ul></div>
<div><h3>Process</h3><ol>${s.process.map((d) => `<li>${d}</li>`).join("")}</ol></div>
<div><h3>Ideal client</h3><p class="muted">${s.ideal}</p></div></div>${bookBtn("Discuss This Service", "btn-ghost")}</article>`).join("")}</div></section>${cta()}` });

  /* ---------- CASE STUDIES / PORTFOLIO ---------- */
  const portfolioCases = c.caseStudies.map((s, i) => `<article class="portfolio-card reveal" data-category="${esc(s.industry)}">
    <div class="portfolio-art art-${esc(s.cover || "ecom")}"><div class="art-top">ADZIVO / PROJECT ${String(i+1).padStart(2,"0")} <span>✳</span></div><div class="art-orbit"></div>
      <div class="art-window"><span class="art-demo-stamp">Visual example</span><div class="art-window-head"><i></i><i></i><i></i><span>${esc(s.cover==="local"?"Lead overview":s.cover==="b2b"?"Pipeline analytics":"Campaign performance")}</span></div><div class="art-metrics"><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div><div class="art-line"><i></i><i></i><i></i></div></div><strong class="art-index">0${i+1}</strong></div>
    <div class="portfolio-info"><div class="portfolio-meta"><span>${esc(s.industry)}</span><span>${s.demo?"Concept preview":esc(s.timeframe)}</span></div><h2>${esc(s.client)}</h2><p>${esc(s.summary || s.challenge)}</p>
    <div class="portfolio-tags">${(s.services||[]).slice(0,3).map(v=>`<span>${esc(v)}</span>`).join("")}</div>
    ${s.demo ? conceptMetricStrip(i) : ""}
    <details class="portfolio-details"><summary>Explore project approach <span>↗</span></summary><div class="portfolio-detail-body"><h3>Challenge</h3><p>${esc(s.challenge)}</p><h3>Strategy</h3><p>${esc(s.strategy)}</p>${s.demo?'<p class="concept-note">Illustrative concept only — not a real client result.</p>':`<h3>Results</h3><p>${esc(s.results)}</p>`}${btn("/contact/","Discuss a Similar Project","btn-ghost btn-sm")}</div></details></div></article>`).join("");
  add({ path: "/case-studies/", title: "Portfolio", desc: "Explore ADZIVO campaign concepts, strategy and project approach.", body: `
<section class="portfolio-hero"><div class="wrap portfolio-hero-grid"><div><span class="eyebrow">Selected Work · ADZIVO</span><h1>Strategy that makes <span class="grad">every campaign</span> count.</h1><p class="lead">Explore our approach to creative testing, lead generation and paid social growth. Concept previews are clearly labelled; verified client results are shared transparently.</p><div class="portfolio-hero-pills"><span>Meta Ads</span><span>Creative Strategy</span><span>Lead Generation</span><span>Measurement</span></div></div>
${pageHeroVisual("CREATIVE / PERFORMANCE", "portfolio")}</div></section>
<section class="portfolio-controls"><div class="wrap portfolio-controls-in"><div><span class="eyebrow">The portfolio</span><h2>Ideas built around business goals</h2></div><div class="portfolio-filters" role="group" aria-label="Filter portfolio projects"><button class="portfolio-filter active" data-filter="all" aria-pressed="true">All work</button><button class="portfolio-filter" data-filter="E-commerce" aria-pressed="false">E-commerce</button><button class="portfolio-filter" data-filter="Local services" aria-pressed="false">Local services</button><button class="portfolio-filter" data-filter="B2B" aria-pressed="false">B2B</button></div></div></section>
<section class="sec portfolio-section"><div class="wrap"><div class="portfolio-grid">${portfolioCases}</div><p class="portfolio-footnote muted">Sample concepts are illustrative design and strategy examples, not claims about completed client campaigns.</p></div></section>
<section class="sec"><div class="wrap"><div class="portfolio-bottom reveal"><span class="eyebrow">Have a project in mind?</span><h2>Let's build your next growth story.</h2><p class="muted">Tell us about your goals and we'll help map out a practical paid social strategy.</p>${bookBtn("Start a Conversation")}</div></div></section>` });

  /* ---------- ABOUT ---------- */
  const team = c.team.length ? `<section class="sec alt"><div class="wrap">${head("Team", "The people behind the campaigns")}<div class="grid g3">${c.team.map((m) => `<div class="card reveal"><h3>${esc(m.name)}</h3><p class="tag">${esc(m.role)}</p><p class="muted">${esc(m.bio || "")}</p></div>`).join("")}</div></div></section>` : "";
  add({ path: "/about/", title: "About Us", desc: "ADZIVO is a performance-focused paid social agency helping businesses make smarter advertising decisions.", body: `
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">About ${c.name}</span><h1>A performance-focused agency, built on clarity</h1><p class="lead">${c.name} is an independent digital marketing agency specializing in paid social advertising.</p></div>${pageHeroVisual("THE ADZIVO APPROACH", "about")}</div></section>
<section class="sec"><div class="wrap grid g2"><div class="card reveal"><h2>Our mission</h2><p class="muted">To help businesses turn advertising spend into sustainable growth through thoughtful strategy, disciplined testing and honest reporting.</p></div>
<div class="card reveal"><h2>How we work</h2><ul><li>Start from business goals, not platform features</li><li>Test creative and audiences with discipline</li><li>Report openly, including what didn't work</li><li>Scale only what the data supports</li></ul></div></div></section>${team}${cta()}` });

  /* ---------- CONTACT ---------- */
  const opt = (a) => a.map((o) => `<option>${o}</option>`).join("");
  add({ schema: [{ "@type": "ContactPage", url: base + "/contact/", name: "Contact " + c.name }], path: "/contact/", form: true, title: "Contact", desc: "Contact ADZIVO to discuss your paid social advertising goals or book a strategy call.", body: `
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">Contact</span><h1>Let's talk about your goals</h1><p class="lead">Send us a message or book a strategy call directly.</p><div class="actions">${bookBtn()}</div></div>${pageHeroVisual("LET’S PLAN YOUR NEXT MOVE", "contact")}</div></section>
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


  /* ---------- BOOK A CALL ---------- */
  add({ path: "/book-a-call/", title: "Book a Strategy Call", desc: "Schedule a strategy call with ADZIVO to discuss your business and paid social growth goals.", body: `
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">Book a Call</span><h1>Plan your next stage of <span class="grad">growth.</span></h1><p class="lead">Choose a time that works for you. We will discuss your goals, current campaigns and practical next steps.</p></div>${pageHeroVisual("STRATEGY SESSION / 30 MIN", "booking")}</div></section>
<section class="sec"><div class="wrap"><div class="booking-embed card" style="padding:clamp(8px,2vw,24px);border:1px solid rgba(216,196,155,.25);border-radius:18px;background:#0b0b0a;"><div class="calendly-inline-widget" data-url="${esc(c.contact.bookingUrl || "https://calendly.com/paulteam8168/30min")}" style="min-width:320px;height:760px;"></div></div></div></section>` });

  /* ---------- LEGAL ---------- */
  const legal = (path, title, intro, secs) => add({ path, title, desc: `${title} for ${c.name}.`, body: `
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">ADZIVO · INFORMATION</span><h1>${title}</h1></div>${pageHeroVisual("TRUST & TRANSPARENCY", "legal")}</div></section>
<section class="sec"><div class="wrap narrow prose"><div class="note">This page provides general website information. Any signed service agreement may contain additional terms specific to an engagement.</div><p>${intro}</p>${secs.map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join("")}<p class="muted">Last updated: ${esc(c.legal.lastUpdated || "October 16, 2026")}</p></div></section>` });
  legal("/privacy/", "Privacy Policy", `This policy explains how ${c.name} handles personal information collected through this website.`, [
    ["Information we collect", "When you use our contact form we collect your name, business email, company or website, budget range, services of interest and message."],
    ["How we use it", "We use this information to respond to your enquiry and to provide and improve our services. We do not sell your personal information."],
    ["Service providers", "Information may be processed by the website hosting, form delivery, email and scheduling providers needed to operate the site and respond to your request. These providers should handle information according to their applicable terms and privacy practices."],
    ["Your rights", "Depending on where you live, you may have rights to access, correct or delete your personal information. Contact us using the details on this site."],
    ["Contact", "For privacy questions or requests about your enquiry, contact contact@adzivo.online."]]);
  legal("/terms/", "Terms of Service", `These terms govern your use of the ${c.name} website and, together with any written agreement, our services.`, [
    ["Use of this website", "Content is provided for general information and does not constitute a guarantee of any result."],
    ["Services and fees", "Services are described in a separate written agreement. Management fees are separate from advertising spend paid to advertising platforms."],
    ["No guarantee of results", "Advertising performance depends on many factors outside our control. We do not guarantee sales, leads or return on ad spend."],
    ["Independence", `${c.name} is an independent agency and is not affiliated with or endorsed by Meta. Platform names are used only to describe relevant services.`],
    ["Governing law", "Any applicable law, dispute process and jurisdiction should be set out in a signed service agreement where required. Nothing on this page limits rights that cannot lawfully be excluded."]]);

  /* ---------- 404 ---------- */
  add({ path: "/404", noindex: true, title: "Page Not Found", desc: "The page you were looking for could not be found.", body: `
<section class="page-hero center"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">404</span><h1>Page not found</h1><p class="lead">That page doesn't exist or has moved.</p><div class="actions">${btn("/", "Back to Home")}${btn("/contact/", "Contact Us", "btn-ghost")}</div></div>${pageHeroVisual("ROUTE NOT FOUND", "error")}</div></section>` });

  return out;
}
