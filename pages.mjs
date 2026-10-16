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
<link rel="stylesheet" href="/reference-match.css">
<link rel="stylesheet" href="/clarity-finish.css">
<link rel="stylesheet" href="/layout-polish.css">
<link rel="stylesheet" href="/agency-upgrade.css">
<link rel="stylesheet" href="/creative-refresh.css">
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
<div><a class="brand" href="/">${logo}<span>${c.name}</span></a><p class="muted">Performance marketing built around your business goals. ${c.name} is independent and is not affiliated with or endorsed by Meta or Google.</p>${contactLines.length ? `<ul class="plain">${contactLines.join("")}</ul>` : ""}</div>
<div><h3>Services</h3><ul class="plain">${c.services.map((s) => `<li><a href="/services/#${s.slug}">${s.title}</a></li>`).join("")}</ul></div>
<div><h3>Company</h3><ul class="plain"><li><a href="/">Home</a></li>${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="/privacy/">Privacy Policy</a></li><li><a href="/terms/">Terms of Service</a></li><li><a href="/book-a-call/">Booking Page</a></li></ul></div>
</div><div class="wrap copy">© <span data-year>${new Date().getFullYear()}</span> ${c.name}. All rights reserved.</div></footer>
<script src="/main.js" defer></script>
${c.contact.bookingUrl ? '<script src="https://assets.calendly.com/assets/external/widget.js" async></script>' : ""}
</body></html>`;
  };

  const cta = (h = "Ready to Make Your Marketing Work Harder?", t = "Let's Talk About Your Goals") =>
    `<section class="sec"><div class="wrap"><div class="cta-box reveal"><h2>${h}</h2><p class="muted">Tell us about your goals, and we'll help assess whether paid social, search or a broader performance marketing plan makes sense.</p>${bookBtn(t)}</div></div></section>`;

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
    ["What services does ADZIVO offer?", "We support performance marketing across Meta and Google Ads, including search and social campaign strategy, creative testing, lead generation, conversion optimisation, retargeting and measurement."],
    ["Which businesses are a good fit?", "Businesses with a clear offer, a defined customer and the ability to follow up on leads or fulfil orders. E-commerce, local service, professional service and B2B companies can all be a fit; we'll tell you honestly on the first call if paid social isn't right for you yet."],
    ["What is the minimum advertising budget?", c.minBudgetNote || "It depends on your goals, market and offer. Your budget should be enough to gather meaningful data. We'll discuss a realistic range on your strategy call."],
    ["How do you measure campaign success?", "We agree on goals up front, such as cost per qualified lead or cost per acquisition, and track them through reporting we explain in plain language. We focus on business outcomes, not vanity metrics."],
    ["How long does it take to launch campaigns?", "Timelines depend on how ready your tracking, creative and landing pages are. We'll give a realistic schedule after discovery."],
    ["Do clients pay advertising spend directly to ad platforms?", "Typically yes. Campaigns run through your business-owned ad accounts on supported platforms, and platform media spend is separate from our management fee."],
    ["Do you provide creative and landing-page support?", "We provide creative strategy, concepts and testing, and recommendations for landing pages and funnels. The exact scope is confirmed during onboarding."],
    ["How can I book a consultation?", "Use the Book a Strategy Call button on any page, or send us a message through the contact form."],
  ];
  const faqHtml = faqs.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join("");

  const out = [];
  const add = (p) => out.push({ index: !p.noindex, file: p.path === "/" ? "index.html" : p.path === "/404" ? "404.html" : `${p.path.slice(1)}/index.html`, path: p.path, html: layout(p) });

  // Visual strategy labels — no fictional performance figures are published.
  const conceptFocus = [
    [["Creative", "Testing"], ["Audience", "Signals"], ["Tracking", "Events"]],
    [["Enquiries", "Quality"], ["Audience", "Fit"], ["Follow-up", "Process"]],
    [["Demand", "Strategy"], ["Message", "Angles"], ["Pipeline", "Clarity"]],
  ];
  const conceptMetricStrip = (i) => '<div class="concept-metric-strip" aria-label="Areas of campaign strategy">'
    + (conceptFocus[i % conceptFocus.length]).map(([value, name]) => '<div><strong>'+esc(value)+'</strong><span>'+esc(name)+'</span></div>').join('')
    + '</div>';

  // Cropped directly from the approved reference preview: visual concepts, not real client work.
  const photoConcepts = [
    {src:"/visuals/skincare-concept.webp",srcHd:"/visuals/skincare-concept-hd.webp",title:"Skincare Creative",type:"E-commerce",alt:"Emerald-lit skincare product creative concept",svg:"/visuals/creative-skincare.svg",key:"skincare",segment:"E-COMMERCE"},
    {src:"/visuals/furniture-concept.webp",srcHd:"/visuals/furniture-concept-hd.webp",title:"Furniture Creative",type:"Home & Living",alt:"Premium furniture advertising creative concept",svg:"/visuals/creative-furniture.svg",key:"furniture",segment:"DTC"},
    {src:"/visuals/shoe-concept.webp",srcHd:"/visuals/shoe-concept-hd.webp",title:"Footwear Creative",type:"Fashion",alt:"Sneaker and footwear advertising creative concept",svg:"/visuals/creative-footwear.svg",key:"footwear",segment:"LIFESTYLE"},
  ];
  const channelMark = (type) => ({
    meta:'<img class="platform-mark-logo platform-mark-meta" src="/visuals/logo-meta.svg" width="29" height="22" alt="" aria-hidden="true">',
    google:'<img class="platform-mark-logo platform-mark-google" src="/visuals/logo-google.svg" width="26" height="26" alt="" aria-hidden="true">',
    instagram:'<img class="platform-mark-logo platform-mark-instagram" src="/visuals/logo-instagram.svg" width="24" height="24" alt="" aria-hidden="true">',
    tiktok:'<span class="platform-icon platform-tiktok" aria-hidden="true">♪</span>',
    linkedin:'<span class="platform-icon platform-linkedin" aria-hidden="true">in</span>',
  }[type]||"");
  const brandStrip = '<div class="hero-platform-strip" aria-label="Platform logos shown as design references">'
    + [["meta","Meta"],["google","Google"],["instagram","Instagram"],["tiktok","TikTok"],["linkedin","LinkedIn"]].map(([id,name])=>
      '<span class="hero-platform">'+channelMark(id)+'<span>'+name+'</span></span>').join('')
    +'</div>';
  const referenceRail = `<aside class="hero-reference-rail" aria-label="Creative advertising concept showcase">
    <span class="eyebrow">Concept showcase</span>
    <h2>Work that gets <span class="grad">noticed.</span></h2>
    <p>Explore how premium products and creative thinking can stand out in an ad.</p>
    <div class="hero-rail-projects">${photoConcepts.map((p,i)=>`
      <a class="hero-rail-card" href="/case-studies/#creative-showcase" aria-label="${p.title} visual concept">
        <img src="${p.srcHd}" srcset="${p.src} 600w, ${p.srcHd} 1200w" sizes="(max-width:470px) 92vw, (max-width:1180px) 31vw, 400px" alt="${p.alt}" loading="lazy" decoding="async">
        <span class="hero-rail-category">${esc(p.segment)}</span><span class="hero-rail-meta"><strong>${p.title}</strong><small>${p.type} · Visual concept</small></span>
        <span class="hero-rail-arrow" aria-hidden="true">↗</span>
      </a>`).join("")}</div>
  </aside>`;
  // The original chrome crop supplies metallic lighting; HTML layers keep dashboards and logos sharp.
  const referenceHeroArt = `<div class="viz hero-3d-scene hero-reference-visual" role="img" aria-label="Emerald-lit metallic growth sculpture and floating decorative platform icon tiles. Decorative artwork and interface elements are creative concepts.">
    <div class="reference-art-glow" aria-hidden="true"></div>
    <img class="reference-hero-art" src="/visuals/hero-emerald-clean-hd.webp" srcset="/visuals/hero-emerald-clean.webp 1020w, /visuals/hero-emerald-clean-hd.webp 2040w" sizes="(max-width:1050px) 92vw, 710px" alt="" width="2040" height="1088" fetchpriority="high" loading="eager" decoding="async">
    <div class="reference-clear-dashboard" aria-hidden="true">
      <span class="clear-kicker"><i></i> GROWTH STRATEGY / 01</span>
      <div class="clear-statline"><strong>Ideas<span>↗</span></strong><span>Plan · Test<br>Improve</span></div>
      <div class="clear-spark-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="clear-panel-foot"><b>↗</b><span>STRATEGY / MEASUREMENT</span></div>
    </div>
    <div class="reference-clear-platforms" aria-hidden="true">
      <div class="clear-platform clear-meta"><img class="hero-logo-img hero-meta-logo" src="/visuals/logo-meta.svg" width="72" height="48" alt=""><small>Meta</small></div>
      <div class="clear-platform clear-google"><img class="hero-logo-img" src="/visuals/logo-google.svg" width="52" height="52" alt=""><small>Google</small></div>
      <div class="clear-platform clear-instagram"><img class="hero-logo-img" src="/visuals/logo-instagram.svg" width="52" height="52" alt=""><small>Instagram</small></div>
      <div class="clear-platform clear-tiktok"><span class="platform-emblem">♪</span><small>TikTok</small></div>
      <div class="clear-platform clear-linkedin"><span class="platform-emblem">in</span><small>LinkedIn</small></div>
    </div>
  </div>`;

  // Crisp, layered portfolio artwork: distinct from the existing home hero.
  // The product images are creative concepts, not client campaign results.
  const portfolioShowroom = `<div class="pm-showroom" role="group" aria-label="3D emerald chrome creative showroom featuring skincare, furniture and footwear advertising concepts">
    <div class="pm-showroom-aura"></div><div class="pm-showroom-floor"></div>
    <div class="pm-holo-ring pm-ring-a"></div><div class="pm-holo-ring pm-ring-b"></div>
    <svg class="pm-chrome-arrow" viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><linearGradient id="pmArrowMetal" x1="0" y1="0" x2="1" y2=".85"><stop stop-color="#1d5147"/><stop offset=".18" stop-color="#eafff8"/><stop offset=".38" stop-color="#7faca0"/><stop offset=".57" stop-color="#fdfffe"/><stop offset=".76" stop-color="#438877"/><stop offset="1" stop-color="#cffff1"/></linearGradient><linearGradient id="pmArrowSide" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="#61e7bb"/><stop offset=".65" stop-color="#092e27"/><stop offset="1" stop-color="#071612"/></linearGradient></defs>
      <ellipse cx="210" cy="308" rx="176" ry="39" fill="#22c98c" opacity=".14"/>
      <path d="M60 286 C115 284 155 244 202 218 C270 181 305 123 341 82" stroke="#021712" stroke-width="42" stroke-linecap="round"/>
      <path d="M60 278 C115 276 155 236 202 210 C270 173 305 115 341 74" stroke="url(#pmArrowMetal)" stroke-width="29" stroke-linecap="round"/>
      <path d="M61 270 C116 268 155 228 203 202 C271 165 305 107 341 66" stroke="#f4fffb" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>
      <path d="M301 72 376 42 366 126 341 95 322 119 295 103Z" fill="url(#pmArrowMetal)" stroke="#d2fff0" stroke-width="3"/>
      <path d="M376 42 388 54 377 139 366 126Z" fill="url(#pmArrowSide)"/>
    </svg>
    <a class="pm-show-card pm-show-skin" href="#creative-showcase" aria-label="Explore skincare visual concept"><img src="/visuals/skincare-concept-hd.webp" width="1200" height="700" alt="" loading="eager" decoding="async"><span class="pm-show-label"><small>01 / E-COMMERCE</small><strong>Skincare creative</strong></span></a>
    <a class="pm-show-card pm-show-furniture" href="#creative-showcase" aria-label="Explore furniture visual concept"><img src="/visuals/furniture-concept-hd.webp" width="1200" height="700" alt="" loading="eager" decoding="async"><span class="pm-show-label"><small>02 / DTC</small><strong>Furniture creative</strong></span></a>
    <a class="pm-show-card pm-show-shoe" href="#creative-showcase" aria-label="Explore sneaker visual concept"><img src="/visuals/shoe-concept-hd.webp" width="1200" height="700" alt="" loading="eager" decoding="async"><span class="pm-show-label"><small>03 / LIFESTYLE</small><strong>Footwear creative</strong></span></a>
    <div class="pm-show-console" aria-hidden="true"><div class="pm-channel-icons"><img src="/visuals/logo-google.svg" alt="" width="25" height="25"><img src="/visuals/logo-instagram.svg" alt="" width="25" height="25"><img src="/visuals/logo-meta.svg" alt="" width="25" height="25"></div><span class="pm-console-eyebrow">ADZIVO / CAMPAIGN STUDIO</span><div class="pm-console-line"><b>Creative ↗</b><i></i></div><div class="pm-console-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div><span class="pm-console-foot">META / GOOGLE / PERFORMANCE</span></div>
  </div>`;

  const performanceSpotlight = `<section class="sec performance-spotlight" id="performance-marketing">
    <div class="wrap performance-spotlight-layout">
      <div class="performance-intro reveal"><span class="eyebrow">Performance marketing / ADZIVO</span><h2>Search, social and creative. <span class="grad">One growth system.</span></h2><p class="lead">From Meta Ads and Google Ads to conversion journeys and actionable reporting, we connect the right channels with the right business goals.</p><div class="performance-intro-actions"><a class="btn btn-primary" href="/services/#performance-marketing">Explore Performance Marketing ↗</a><a class="btn btn-ghost" href="/case-studies/">See Creative Work</a></div>
        <div class="pm-capability-orbit" aria-hidden="true"><div class="pm-capability-core">✳<small>STRATEGY</small></div><span class="pm-capability-node pm-node-one">Meta Ads</span><span class="pm-capability-node pm-node-two">Google Ads</span><span class="pm-capability-node pm-node-three">Analytics</span><span class="pm-capability-node pm-node-four">Creative</span></div>
      </div>
      <div class="pm-capability-grid">
        <a class="pm-capability-card reveal" href="/services/#meta-ads"><i>∞</i><strong>Meta Ads</strong><span>Campaign setup, audience research and optimisation.</span></a>
        <a class="pm-capability-card reveal" href="/services/#google-ads"><i>G</i><strong>Google Ads</strong><span>High-intent search strategy and conversion tracking.</span></a>
        <a class="pm-capability-card reveal" href="/services/#lead-generation"><i>↗</i><strong>Lead Generation</strong><span>Relevant enquiries and quality-focused funnels.</span></a>
        <a class="pm-capability-card reveal" href="/services/#conversion-optimization"><i>◉</i><strong>Conversion Optimisation</strong><span>Clearer landing pages and paths to action.</span></a>
        <a class="pm-capability-card reveal" href="/services/#creative"><i>✦</i><strong>Creative Testing</strong><span>New angles, formats and structured experiments.</span></a>
        <a class="pm-capability-card reveal" href="/services/#analytics"><i>▥</i><strong>Measurement</strong><span>Tracking, attribution and readable reporting.</span></a>
      </div>
    </div>
  </section>`;

  /* ---------- HOME ---------- */
  const approach = c.testimonials.length
    ? `<section class="sec"><div class="wrap">${head("Testimonials", "What clients say")}<div class="grid g3">${c.testimonials.map((t) => `<figure class="card reveal"><blockquote>“${esc(t.quote)}”</blockquote><figcaption>${esc(t.name || "ADZIVO Client")}${t.role ? `, ${esc(t.role)}` : ""}</figcaption></figure>`).join("")}</div></div></section>`
    : `<section class="sec alt"><div class="wrap">${head("Our Approach", "Clear thinking before ad spend", "We keep things simple: understand the business, test with discipline, report honestly and invest more only where the data supports it.")}</div></section>`;

  add({ schema: [{ "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }], path: "/", title: `${c.name} — ${c.tagline}`, desc: "ADZIVO offers performance marketing, Meta Ads, Google Ads, lead generation, creative testing and conversion strategy for growing businesses.", body: `
<section class="hero"><div class="wrap hero-in">
<div class="hero-copy"><span class="eyebrow">Performance Marketing / Paid Social &amp; Search</span>
<h1>Turn Ad Spend Into <span class="grad">Scalable Growth.</span></h1>
<p class="lead">We connect Meta Ads, Google Ads, creative strategy and measurement to help businesses reach the right people and make smarter advertising decisions.</p>
<div class="actions">${bookBtn()}${btn("/services/", "Explore Our Services", "btn-ghost")}</div>${brandStrip}</div>
${referenceHeroArt}
${referenceRail}
</div></section>

<section class="strip"><div class="wrap strip-in"><span>Independent agency</span><span>Transparent reporting</span><span>No guaranteed-result promises</span><span>You keep control of your ad account</span></div></section>

<section class="sec campaign-lab-section" id="campaign-lab"><div class="wrap campaign-lab-grid">
  <div class="lab-copy reveal"><span class="eyebrow">The ADZIVO campaign lab</span>
    <h2>Campaign insights, <span class="grad">beautifully clear.</span></h2>
    <p class="lead">Explore how creative tests, audience signals and reporting can be organised for different types of businesses. This is an interactive example.</p>
    <div class="lab-tabs" role="group" aria-label="Choose a campaign planning focus">
      <button type="button" class="lab-tab active" data-lab-scenario="ecommerce" aria-pressed="true">E-commerce</button>
      <button type="button" class="lab-tab" data-lab-scenario="local" aria-pressed="false">Local services</button>
      <button type="button" class="lab-tab" data-lab-scenario="b2b" aria-pressed="false">B2B</button>
    </div>
    <p class="lab-disclaimer">Explore the thinking behind stronger creative, better audience signals and clearer reporting.</p>
    <a class="btn btn-ghost" href="/services/">Discover Our Approach</a>
  </div>
  <div class="lab-dashboard reveal" role="group" aria-label="Interactive campaign planning showcase">
    <div class="lab-dashboard-top"><span class="lab-live-dot"></span><span>ADZIVO / CAMPAIGN STUDIO</span><span class="lab-demo-badge">EXPLORE</span></div>
    <div class="lab-dashboard-title"><div><span>Scenario visualisation</span><h3 data-lab-title>Creative testing</h3></div><span class="lab-arrow">↗</span></div>
    <div class="lab-stat-grid">
      <div><small data-lab-label-1>Creative</small><strong data-lab-value-1>Ideas</strong><span>TESTING</span></div>
      <div><small data-lab-label-2>Audience</small><strong data-lab-value-2>Fit</strong><span>RELEVANCE</span></div>
      <div><small data-lab-label-3>Measurement</small><strong data-lab-value-3>Signals</strong><span>INSIGHTS</span></div>
    </div>
    <div class="lab-chart-top"><span>Campaign learning signals</span><small>PLANNING FRAMEWORK</small></div>
    <div class="lab-chart" aria-hidden="true"><div class="lab-chart-bars">
      <i style="--bar:32%"></i><i style="--bar:47%"></i><i style="--bar:40%"></i><i style="--bar:69%"></i><i style="--bar:58%"></i><i style="--bar:81%"></i><i style="--bar:93%"></i>
    </div><div class="lab-chart-line"></div></div>
    <div class="lab-insight"><span class="lab-insight-icon">✦</span><div><small>NEXT STEP</small><p data-lab-insight>Compare hooks and creative formats before increasing spend.</p></div></div>
    <div class="lab-dashboard-footer"><span>STRATEGY</span><span>CREATIVE</span><span>MEASUREMENT</span></div>
  </div>
</div></section>

${performanceSpotlight}

<section class="sec"><div class="wrap">${head("Services", "Performance marketing, connected from click to conversion", "Paid search, paid social, creative, landing pages and measurement — working together.")}
<div class="grid g3">${c.services.map((s) => `<a class="card svc reveal" href="/services/#${s.slug}"><span class="svc-icon" aria-hidden="true">${["∞","◉","G","✳","✦","↗","◎","◈","▥"][c.services.indexOf(s)]||"✦"}</span><h3>${s.title}</h3><p class="muted">${s.short}</p><span class="more">Learn more →</span></a>`).join("")}</div></div></section>

${c.showCaseStudies ? `<section class="sec alt"><div class="wrap">${head("Featured Work", "Creative concepts made to stand out", "Explore product-led creative, audience ideas and campaign planning through our concept portfolio.")}
<div class="grid g3">${c.caseStudies.slice(0, 3).map((s, i) => `<article class="card reveal portfolio-teaser"><div class="project-mini-art mini-${esc(s.cover || "ecom")}"><img class="concept-photo" src="${photoConcepts[i%photoConcepts.length].srcHd}" srcset="${photoConcepts[i%photoConcepts.length].src} 600w, ${photoConcepts[i%photoConcepts.length].srcHd} 1200w" sizes="(max-width:760px) 92vw, 390px" alt="${photoConcepts[i%photoConcepts.length].alt}" loading="lazy" decoding="async"><span class="concept-art-index">CREATIVE / 0${i+1}</span><span class="concept-art-category">${photoConcepts[i%photoConcepts.length].type}</span></div><span class="eyebrow">Concept preview · 0${i + 1}</span><h3>${photoConcepts[i%photoConcepts.length].title}</h3><p class="tag">${photoConcepts[i%photoConcepts.length].type} · Concept preview</p><p class="muted">${esc(s.summary || s.challenge)}</p>${s.demo ? conceptMetricStrip(i) : ""}<a class="more" href="/case-studies/">Explore approach →</a></article>`).join("")}</div><p class="center">${btn("/case-studies/", "Explore Portfolio", "btn-ghost")}</p></div></section>` : ""}

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
  add({ schema: [{ "@type": "ItemList", itemListElement: c.services.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Service", name: s.title, description: s.short, url: `${base}/services/#${s.slug}`, provider: { "@id": base + "/#org" } } })) }], path: "/services/", title: "Services", desc: "ADZIVO performance marketing services: Google Ads, Meta Ads, lead generation, conversion optimisation, creative strategy and reporting.", body: `
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">Services / Performance Marketing</span><h1>Smarter campaigns. <span class="grad">Stronger foundations.</span></h1><p class="lead">A connected approach to Meta Ads, Google Ads, creative testing, conversion journeys and reporting — built around your business goals.</p></div>${pageHeroVisual("PAID SOCIAL + SEARCH / SYSTEM 01", "services")}</div></section>
<section class="sec services-overview"><div class="wrap">
<div class="sec-head reveal"><span class="eyebrow">Our expertise</span><h2>A complete growth system, not disconnected tactics</h2><p class="muted">Explore paid search, paid social, creative, landing pages and measurement — built to support one clear strategy.</p></div>
<div class="grid g3">${c.services.map((s,i) => `<a class="card svc reveal" href="#${s.slug}"><span class="service-symbol">${["∞","◎","G","✳","✦","↗","◉","◇","▥"][i] || "↗"}</span><span class="service-index">0${i+1} / SERVICE</span><h3>${esc(s.title)}</h3><p class="muted">${esc(s.short)}</p><span class="more">Explore service →</span></a>`).join("")}</div></div></section>
<section class="sec pm-workflow-section"><div class="wrap"><div class="sec-head reveal"><span class="eyebrow">How the system works</span><h2>Four connected layers. One clear direction.</h2><p class="muted">Every channel has a job, from finding relevant people to understanding what happens after the click.</p></div>
<div class="pm-workflow-grid">
<div class="pm-workflow-step reveal"><span class="pm-step-no">01 / DISCOVER</span><span class="pm-step-icon">◎</span><h3>Audience &amp; intent</h3><p>Understand the right customer and where buying intent starts.</p></div>
<div class="pm-workflow-step reveal"><span class="pm-step-no">02 / CREATE</span><span class="pm-step-icon">✦</span><h3>Search &amp; social</h3><p>Choose relevant channels, messaging and creative formats.</p></div>
<div class="pm-workflow-step reveal"><span class="pm-step-no">03 / CONVERT</span><span class="pm-step-icon">↗</span><h3>Conversion journeys</h3><p>Make the path from ad to enquiry or purchase easier to follow.</p></div>
<div class="pm-workflow-step reveal"><span class="pm-step-no">04 / LEARN</span><span class="pm-step-icon">▥</span><h3>Measurement</h3><p>Review meaningful signals, document learnings and improve.</p></div>
</div></div></section>
<section class="sec pm-detail-section"><div class="wrap"><div class="note">Our management fee and your advertising spend are separate. Ad spend is paid to the advertising platform from your own ad account; our fee covers strategy, management and reporting.</div>
${c.services.map((s) => `<article class="svc-detail card reveal" id="${s.slug}"><h2>${s.title}</h2><p class="muted">${s.short}</p>
<div class="cols"><div><h3>Deliverables</h3><ul>${s.deliverables.map((d) => `<li>${d}</li>`).join("")}</ul></div>
<div><h3>Process</h3><ol>${s.process.map((d) => `<li>${d}</li>`).join("")}</ol></div>
<div><h3>Ideal client</h3><p class="muted">${s.ideal}</p></div></div>${bookBtn("Discuss This Service", "btn-ghost")}</article>`).join("")}</div></section>${cta()}` });

  /* ---------- CASE STUDIES / PORTFOLIO ---------- */
  // Three distinct CSS/SVG campaign dioramas; individual case cards never reuse
  // the product photography shown in the hero or creative gallery.
  const caseVisuals = {
    ecom: `<div class="case-stage case-stage-beauty" aria-hidden="true">
      <div class="case-stage-aura"></div><div class="case-stage-orbit"></div>
      <div class="case-beauty-platform"></div>
      <div class="case-beauty-bottle"><div class="case-beauty-cap"></div><span class="case-beauty-label">ADZIVO<br><b>BEAUTY</b><small>CREATIVE</small></span></div>
      <div class="case-beauty-floating case-beauty-floating-a"><span>CREATIVE / 01</span><strong>New angles</strong><i>✦</i></div>
      <div class="case-beauty-floating case-beauty-floating-b"><span>PRODUCT STORY</span><strong>Test &amp; learn ↗</strong><div class="case-beauty-lines"><b></b><b></b><b></b></div></div>
      <span class="case-scene-index">ECOMMERCE / CREATIVE LAB</span>
    </div>`,
    local: `<div class="case-stage case-stage-local" aria-hidden="true">
      <div class="case-local-globe"></div>
      <div class="case-local-map"><svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-10 63C99 74 119 36 224 62c100 26 125-7 270-23M-15 170C83 133 168 166 221 149c88-30 166 19 274 4M-11 256C96 269 155 236 255 264c82 23 153-23 250-2" stroke="#9DFFE0" stroke-opacity=".16" stroke-width="17"/>
        <path d="M73-10c35 121-15 232 36 368M234-10c-31 103 57 210 31 369M390-10c-23 89 25 225 16 371" stroke="#ACFFDF" stroke-opacity=".14" stroke-width="16"/>
        <path d="M65 267 150 208 221 246 328 122 414 95" stroke="#8AFFD6" stroke-width="4" stroke-dasharray="8 13"/>
        <circle cx="150" cy="208" r="13" fill="#0C3D2C" stroke="#BBFFE4" stroke-width="5"/><circle cx="221" cy="246" r="13" fill="#0C3D2C" stroke="#BBFFE4" stroke-width="5"/><circle cx="328" cy="122" r="17" fill="#6AFFC8" stroke="#E1FFF2" stroke-width="5"/>
        <circle cx="328" cy="122" r="33" stroke="#76FFCD" stroke-opacity=".44" stroke-width="3"/>
      </svg></div>
      <div class="case-local-enquiry"><small>LOCAL / ENQUIRY</small><b>New conversation</b><span>Relevant service area <i>✓</i></span><span>Clear next step <i>✓</i></span></div>
      <div class="case-local-phone"><div class="case-phone-top">✳ &nbsp; ADZIVO</div><div class="case-phone-title">Let’s connect.</div><div class="case-phone-input"></div><div class="case-phone-input short"></div><div class="case-phone-button">Start enquiry ↗</div></div>
      <span class="case-scene-index">LOCAL SERVICES / LEAD FUNNEL</span>
    </div>`,
    b2b: `<div class="case-stage case-stage-b2b" aria-hidden="true">
      <div class="case-stage-aura"></div><div class="case-b2b-grid"></div>
      <div class="case-b2b-stage case-b2b-first"><span>01 / DISCOVER</span><strong>High-intent<br>search</strong><img src="/visuals/logo-google.svg" alt="" width="36" height="36"></div>
      <div class="case-b2b-connector case-b2b-connector-one">↗</div>
      <div class="case-b2b-stage case-b2b-second"><span>02 / QUALIFY</span><strong>Right-fit<br>leads</strong><b class="case-b2b-orb">✦</b></div>
      <div class="case-b2b-connector case-b2b-connector-two">↗</div>
      <div class="case-b2b-stage case-b2b-third"><span>03 / CONVERT</span><strong>Pipeline<br>clarity</strong><div class="case-b2b-bars"><i></i><i></i><i></i><i></i></div></div>
      <div class="case-b2b-floating"><span>PERFORMANCE SYSTEM</span><strong>Signals → Strategy</strong></div>
      <span class="case-scene-index">B2B / DEMAND GENERATION</span>
    </div>`
  };
  const caseVisual = (cover) => caseVisuals[cover] || caseVisuals.ecom;

  const portfolioCases = c.caseStudies.map((s, i) => `<article class="portfolio-card reveal" data-category="${esc(s.industry)}" data-services="${esc((s.services||[]).join(" ").toLowerCase())}">
    <div class="portfolio-art art-${esc(s.cover || "ecom")} case-art-workshop" role="img" aria-label="3D ${esc(s.industry)} campaign strategy concept">${caseVisual(s.cover || "ecom")}</div>
    <div class="portfolio-info"><div class="portfolio-meta"><span>${esc(s.industry)}</span><span>${s.demo?"Concept preview":esc(s.timeframe)}</span></div><h2>${esc(s.client)}</h2><p>${esc(s.summary || s.challenge)}</p>
    <div class="portfolio-tags">${(s.services||[]).slice(0,3).map(v=>`<span>${esc(v)}</span>`).join("")}</div>
    ${s.demo ? conceptMetricStrip(i) : ""}
    <details class="portfolio-details"><summary>Explore project approach <span>↗</span></summary><div class="portfolio-detail-body"><h3>Challenge</h3><p>${esc(s.challenge)}</p><h3>Strategy</h3><p>${esc(s.strategy)}</p>${s.demo?'<p class="concept-note">Creative strategy concept.</p>':`<h3>Results</h3><p>${esc(s.results)}</p>`}${btn("/contact/","Discuss a Similar Project","btn-ghost btn-sm")}</div></details></div></article>`).join("");
  add({ path: "/case-studies/", title: "Portfolio", desc: "Explore ADZIVO performance marketing, Meta and Google Ads creative concepts, conversion strategies and campaign planning.", body: `
<section class="portfolio-hero"><div class="wrap portfolio-hero-grid"><div><span class="eyebrow">ADZIVO / CREATIVE SHOWROOM</span><h1>Real ideas. <span class="grad">Striking creative.</span> Smarter strategy.</h1><p class="lead">A portfolio of performance marketing ideas, product storytelling and cross-channel campaign strategy for different business types.</p><div class="portfolio-hero-pills"><span>Meta Ads</span><span>Google Ads</span><span>3D Creative</span><span>Conversion Strategy</span></div><a class="btn btn-ghost pm-portfolio-cta" href="#creative-showcase">Explore the Showroom ↗</a></div>
${portfolioShowroom}</div></section>
<section class="pm-showcase-bridge"><div class="wrap pm-showcase-bridge-grid"><div class="pm-bridge-chip"><span>✦</span><div><strong>Creative direction</strong><small>Concept, copy and product storytelling</small></div></div><div class="pm-bridge-chip"><span>↗</span><div><strong>Performance strategy</strong><small>Search, social and funnel planning</small></div></div><div class="pm-bridge-chip"><span>▥</span><div><strong>Meaningful measurement</strong><small>Tracking, insights and optimisation</small></div></div></div></section>
<section class="sec portfolio-creative-showcase" id="creative-showcase"><div class="wrap">
  <div class="sec-head reveal"><span class="eyebrow">ADZIVO / Design concepts</span><h2>Product creatives with a premium 3D perspective.</h2><p class="muted">Skincare, interiors and sneaker concepts with sharper product framing, emerald-chrome surfaces and attention-grabbing detail.</p></div>
  <div class="reference-creative-grid">${photoConcepts.map((p,i)=>`<article class="reference-creative-card concept-creative-${p.key} reveal">
    <div class="reference-creative-media"><img src="${p.svg}" width="1200" height="760" sizes="(max-width:470px) 92vw, (max-width:1180px) 31vw, 400px" alt="${p.alt}" loading="lazy" decoding="async"><span>CREATIVE / 0${i+1}</span><span class="reference-category-chip">${esc(p.segment)}</span></div>
    <div class="reference-creative-detail"><span class="eyebrow">${p.segment} / ${p.type}</span><h3>${p.title}</h3><p>${["Botanical textures, reflective glass and premium beauty storytelling.","Architectural interiors, tactile materials and warm editorial styling.","Dynamic motion, chrome detailing and energetic sport-inspired design."][i]}</p><div class="concept-art-direction"><span>ART DIRECTION</span><strong>${["BOTANICAL LUXURY","SCULPTURAL LIVING","SPORT / MOTION"][i]}</strong></div></div>
  </article>`).join("")}</div></div></section>
<section class="portfolio-controls"><div class="wrap portfolio-controls-in"><div><span class="eyebrow">Campaign concepts</span><h2>Explore by industry and channel</h2></div><div class="portfolio-filters" role="group" aria-label="Filter portfolio projects"><button class="portfolio-filter active" data-filter="all" aria-pressed="true">All work</button><button class="portfolio-filter" data-filter="E-commerce" aria-pressed="false">E-commerce</button><button class="portfolio-filter" data-filter="Local services" aria-pressed="false">Local services</button><button class="portfolio-filter" data-filter="B2B" aria-pressed="false">B2B</button><button class="portfolio-filter" data-filter="Meta Ads" aria-pressed="false">Meta Ads</button><button class="portfolio-filter" data-filter="Google Ads" aria-pressed="false">Google Ads</button><button class="portfolio-filter" data-filter="Performance Marketing" aria-pressed="false">Performance Marketing</button><span class="pm-filter-count" role="status" aria-live="polite">Showing all creative concepts</span></div></div></section>
<section class="sec portfolio-section"><div class="wrap"><div class="portfolio-grid" id="portfolio-projects">${portfolioCases}</div></div></section>
<section class="sec"><div class="wrap"><div class="portfolio-bottom reveal"><span class="eyebrow">Have a project in mind?</span><h2>Let's build your next growth story.</h2><p class="muted">Tell us about your goals and we'll help shape a practical search, social and creative strategy.</p>${bookBtn("Start a Conversation")}</div></div></section>` });

  /* ---------- ABOUT ---------- */
  const team = c.team.length ? `<section class="sec alt"><div class="wrap">${head("Team", "The people behind the campaigns")}<div class="grid g3">${c.team.map((m) => `<div class="card reveal"><h3>${esc(m.name)}</h3><p class="tag">${esc(m.role)}</p><p class="muted">${esc(m.bio || "")}</p></div>`).join("")}</div></div></section>` : "";
  add({ path: "/about/", title: "About Us", desc: "Learn about ADZIVO, an independent performance marketing agency focused on Meta Ads, Google Ads, thoughtful creative and transparent measurement.", body: `
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">About ${c.name}</span><h1>Independent thinking. <span class="grad">Performance focus.</span></h1><p class="lead">We bring together paid social, Google Ads, creative thinking and clear measurement to help businesses make better marketing decisions.</p><div class="actions">${btn("/contact/","Talk to Our Team","btn-ghost")}</div></div>${pageHeroVisual("THE ADZIVO APPROACH", "about")}</div></section>
<section class="sec pm-about-core"><div class="wrap grid g2"><div class="card reveal"><h2>Our mission</h2><p class="muted">To help businesses turn advertising spend into sustainable growth through thoughtful strategy, disciplined testing and honest reporting.</p></div>
<div class="card reveal"><h2>How we work</h2><ul><li>Start from business goals, not platform features</li><li>Test creative and audiences with discipline</li><li>Report openly, including what didn't work</li><li>Scale only what the data supports</li></ul></div></div></section><section class="sec pm-about-beliefs"><div class="wrap"><div class="pm-about-beliefs-head reveal"><span class="eyebrow">Why ADZIVO</span><h2>Principles behind <span class="grad">every campaign.</span></h2><p class="muted">Good marketing is part creative instinct, part informed decisions, and always connected to the business behind the ad.</p></div><div class="pm-about-beliefs-grid"><div class="pm-about-belief reveal"><span>01</span><i>◎</i><h3>Business first</h3><p>Understand the offer, customer and economics before choosing a platform.</p></div><div class="pm-about-belief reveal"><span>02</span><i>✦</i><h3>Creative curiosity</h3><p>Explore fresh ideas and document the lessons behind each test.</p></div><div class="pm-about-belief reveal"><span>03</span><i>▥</i><h3>Clear measurement</h3><p>Use meaningful signals and transparent reporting to guide decisions.</p></div><div class="pm-about-belief reveal"><span>04</span><i>↗</i><h3>Long-term thinking</h3><p>Build practical systems that can improve as we learn what matters.</p></div></div></div></section>${team}${cta()}` });

  /* ---------- CONTACT ---------- */
  const opt = (a) => a.map((o) => `<option>${o}</option>`).join("");
  add({ schema: [{ "@type": "ContactPage", url: base + "/contact/", name: "Contact " + c.name }], path: "/contact/", form: true, title: "Contact", desc: "Get in touch with ADZIVO about Meta Ads, Google Ads, performance marketing, lead generation and creative strategy.", body: `
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">Contact / Start a Conversation</span><h1>Let's build something <span class="grad">meaningful.</span></h1><p class="lead">Tell us about your business, Meta or Google Ads goals and the marketing challenges you want to solve.</p><div class="actions">${bookBtn()}</div></div>${pageHeroVisual("LET’S PLAN YOUR NEXT MOVE", "contact")}</div></section>
<section class="sec pm-contact-section" id="form"><div class="wrap"><div class="pm-contact-intro reveal"><span class="eyebrow">Tell us about your project</span><h2>Share a little. We'll take it from there.</h2><p class="muted">Your enquiry goes directly to the ADZIVO team. We'll discuss fit, timing and sensible next steps.</p></div><div class="grid g2c">
<form id="contact-form" class="card pm-contact-form" novalidate><div class="pm-form-heading"><span class="eyebrow">Project enquiry</span><h3>What would you like to work on?</h3></div>
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
<aside class="card pm-contact-aside"><span class="eyebrow">Contact ADZIVO</span><h2>Start with a clear conversation.</h2><p class="muted">Bring your questions, existing campaigns or a new idea. We can explore the channels and next steps together.</p><div class="pm-contact-steps"><div><i>01</i><span><strong>Tell us the goal</strong><small>What are you trying to achieve?</small></span></div><div><i>02</i><span><strong>Explore the options</strong><small>Meta Ads, Google Ads, creative or conversion.</small></span></div><div><i>03</i><span><strong>Agree on next steps</strong><small>A practical approach suited to your business.</small></span></div></div><div class="pm-contact-direct"><h3>Other ways to reach us</h3>${contactLines.length ? `<ul class="plain">${contactLines.join("")}</ul>` : '<p class="muted">Use the form or book a strategy call. We\'ll reply to the email address you provide.</p>'}<p class="muted">We can discuss available options and whether the fit looks right.</p></div><a class="btn btn-ghost" href="/book-a-call/">Book a Strategy Call ↗</a></aside></div></div></section>` });


  /* ---------- BOOK A CALL ---------- */
  add({ path: "/book-a-call/", title: "Book a Strategy Call", desc: "Book an ADZIVO strategy conversation covering performance marketing, Meta Ads, Google Ads, creative and conversion strategy.", body: `
<section class="page-hero"><div class="wrap page-hero-grid"><div class="page-hero-copy"><span class="eyebrow">Book a Call</span><h1>Plan your next stage of <span class="grad">growth.</span></h1><p class="lead">Choose a time to explore your goals, existing campaigns and opportunities across search, social and conversion.</p></div>${pageHeroVisual("STRATEGY SESSION / 30 MIN", "booking")}</div></section>
<section class="sec pm-booking-section"><div class="wrap pm-booking-grid"><aside class="pm-booking-aside reveal"><span class="eyebrow">The strategy conversation</span><h2>Good work starts with <span class="grad">the right questions.</span></h2><p class="muted">An opportunity to understand your business and see which marketing priorities deserve attention first.</p><div class="pm-booking-expect"><div><i>◎</i><span><strong>Understand your goals</strong><small>Business context, objectives and budget range.</small></span></div><div><i>✦</i><span><strong>Discuss your channels</strong><small>Meta Ads, Google Ads, creative and search intent.</small></span></div><div><i>↗</i><span><strong>Outline next steps</strong><small>A practical direction if it looks like a fit.</small></span></div></div><a class="btn btn-ghost" href="${esc(c.contact.bookingUrl || "https://calendly.com/paulteam8168/30min")}" target="_blank" rel="noopener noreferrer">Open Calendar in New Tab ↗</a></aside><div class="booking-embed card pm-calendar-wrap"><div class="pm-calendar-header"><span class="eyebrow">Choose your time</span><h3>Find a convenient slot.</h3></div><div class="calendly-inline-widget" data-url="${esc(c.contact.bookingUrl || "https://calendly.com/paulteam8168/30min")}" style="min-width:0;width:100%;height:720px;"></div></div></div></section>` });

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
