(() => {
  document.querySelectorAll("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));
  document.querySelectorAll("[data-calendly-popup]").forEach((link) => link.addEventListener("click", (e) => {
    if (window.Calendly) {
      e.preventDefault();
      window.Calendly.initPopupWidget({ url: link.href });
    }
  }));
  const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  if (btn) {
    const set = (o) => { nav.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); };
    btn.addEventListener("click", () => set(!nav.classList.contains("open")));
    document.addEventListener("keydown", (e) => e.key === "Escape" && set(false));
    nav.addEventListener("click", (e) => e.target.closest("a") && set(false));
  }
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
  } else items.forEach((i) => i.classList.add("in"));

  // 3D tilt (desktop mouse only, skipped for reduced motion)
  if (matchMedia("(hover:hover) and (pointer:fine)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
    const rel = (e, el) => { const r = el.getBoundingClientRect(); return [(e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5]; };
    const hero = document.querySelector(".hero"), viz = document.querySelector(".viz");
    if (hero && viz) {
      hero.addEventListener("pointermove", (e) => { const [x, y] = rel(e, hero); viz.style.setProperty("--ry", (-3 + x * 6).toFixed(2) + "deg"); viz.style.setProperty("--rx", (1.5 - y * 4).toFixed(2) + "deg"); });
      hero.addEventListener("pointerleave", () => { viz.style.removeProperty("--ry"); viz.style.removeProperty("--rx"); });
    }
    document.querySelectorAll(".svc, .steps li, .grid .card, .cta-box").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const [x, y] = rel(e, el);
        el.style.setProperty("--mx", ((x + .5) * 100) + "%");
        el.style.setProperty("--my", ((y + .5) * 100) + "%");
        if (el.matches(".svc, .steps li")) el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-5px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; el.style.removeProperty("--mx"); el.style.removeProperty("--my"); });
    });
  }


  // Portfolio category filters
  const portfolioFilters = document.querySelectorAll(".portfolio-filter");
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  portfolioFilters.forEach((button) => button.addEventListener("click", () => {
    const category = button.dataset.filter;
    portfolioFilters.forEach((item) => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active)); });
    let visible = 0; portfolioCards.forEach((card) => { const industry = card.dataset.category || ""; const services = (card.dataset.services || "").toLowerCase(); card.hidden = category !== "all" && industry !== category && !services.includes(category.toLowerCase()); if (!card.hidden) visible++; }); const status = document.querySelector(".pm-filter-count"); if (status) status.textContent = category === "all" ? `Showing ${visible} creative concepts` : `${visible} ${visible === 1 ? "concept" : "concepts"} for ${category}`;
  }));


  // Interactive strategy showcase; category content is not performance data.
  const labChoices = {
    ecommerce:{title:"Creative testing",labels:["Creative","Audience","Measurement"],values:["Ideas","Fit","Signals"],
      insight:"Compare hooks and creative formats before increasing spend.",bars:[32,47,40,69,58,81,93]},
    local:{title:"Lead quality",labels:["Offer","Audience","Follow-up"],values:["Focus","Fit","Process"],
      insight:"Review enquiry relevance and plan a clear follow-up process.",bars:[36,51,42,57,70,64,83]},
    b2b:{title:"Demand strategy",labels:["Audience","Message","Pipeline"],values:["Intent","Angles","Clarity"],
      insight:"Connect audience hypotheses to sales conversations and pipeline feedback.",bars:[24,44,39,62,49,71,86]}
  };
  const lab=document.querySelector(".lab-dashboard");
  const tabs=document.querySelectorAll("[data-lab-scenario]");
  if(lab&&tabs.length){
    const setText=(selector,value)=>{const e=lab.querySelector(selector);if(e)e.textContent=value};
    tabs.forEach(tab=>tab.addEventListener("click",()=>{
      const topic=labChoices[tab.dataset.labScenario];if(!topic)return;
      tabs.forEach(t=>{const active=t===tab;t.classList.toggle("active",active);t.setAttribute("aria-pressed",String(active))});
      setText("[data-lab-title]",topic.title);
      topic.labels.forEach((value,i)=>setText("[data-lab-label-"+(i+1)+"]",value));
      topic.values.forEach((value,i)=>setText("[data-lab-value-"+(i+1)+"]",value));
      setText("[data-lab-insight]",topic.insight);
      lab.querySelectorAll(".lab-chart-bars i").forEach((bar,i)=>bar.style.setProperty("--bar",topic.bars[i]+"%"));
    }));
  }

  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("status"), submit = document.getElementById("submit");
  const show = (cls, msg) => { status.className = cls; status.textContent = msg; };
  const setErr = (id, msg) => { const el = form.elements[id], p = document.getElementById("e-" + id); if (p) p.textContent = msg || ""; if (el) el.classList.toggle("invalid", !!msg); if (el) el.setAttribute("aria-invalid", !!msg); };
  const validate = () => {
    const v = (n) => form.elements[n].value.trim(); let first = null, ok = true;
    const rules = { name: v("name").length < 2 && "Please enter your full name.", email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email")) && "Please enter a valid email address.", budget: !v("budget") && "Please select a budget range.", message: v("message").length < 10 && "Please tell us a little more (at least 10 characters).", consent: !form.elements.consent.checked && "Please agree to the Privacy Policy to continue." };
    for (const [k, m] of Object.entries(rules)) { setErr(k, m); if (m) { ok = false; first = first || form.elements[k]; } }
    if (first) first.focus(); return ok;
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); status.className = ""; status.textContent = "";
    if (!validate()) return;
    const fd = new FormData(form), body = Object.fromEntries(fd.entries());
    body.services = fd.getAll("services"); body.consent = form.elements.consent.checked;
    submit.disabled = true; submit.textContent = "Sending…";
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) { show("ok", "Thank you! Your message has been sent. We'll be in touch soon."); form.reset(); if (window.turnstile) window.turnstile.reset(); }
      else { if (d.fields) Object.entries(d.fields).forEach(([k, m]) => setErr(k, m)); show("bad", d.error || "Something went wrong. Please try again."); }
    } catch { show("bad", "Network error. Please check your connection and try again."); }
    submit.disabled = false; submit.textContent = "Send Message";
  });
})();
