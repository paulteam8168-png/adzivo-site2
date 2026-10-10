// ============ CENTRAL SETTINGS — edit this file to change site content ============
export default {
  name: "ADZIVO",
  tagline: "Turn Ad Spend Into Scalable Growth.",
  support: "Performance marketing built around your business goals.",
  siteUrl: "https://www.example.com", // override with SITE_URL env var on Cloudflare

  // Leave blank to hide. Nothing is invented: fill in only real details.
  contact: { email: "", phone: "", location: "", bookingUrl: "" }, // bookingUrl e.g. Calendly link
  turnstileSiteKey: "", // optional Cloudflare Turnstile PUBLIC site key
  minBudgetNote: "", // e.g. "We typically work with budgets of $X+/month" (leave blank until decided)

  services: [
    { slug: "meta-ads", title: "Meta Ads Management",
      short: "End-to-end management of your Meta advertising account, from structure to optimization.",
      ideal: "Businesses ready to invest in paid social with clear offers and goals.",
      deliverables: ["Account and campaign structure", "Audience and offer strategy", "Ongoing bidding, budget and placement optimization", "Regular performance reviews"],
      process: ["Audit goals and economics", "Build campaign architecture", "Launch and monitor", "Iterate on data"] },
    { slug: "facebook-instagram", title: "Facebook & Instagram Campaigns",
      short: "Campaigns tailored to how people actually use Facebook and Instagram feeds, Stories and Reels.",
      ideal: "Brands whose customers are active on Facebook and Instagram.",
      deliverables: ["Placement-specific campaign setup", "Ad format planning (feed, Stories, Reels)", "Audience testing plan", "Campaign documentation"],
      process: ["Define audiences", "Match formats to placements", "Launch tests", "Scale what works"] },
    { slug: "creative", title: "Creative Strategy & Testing",
      short: "Structured creative experimentation so decisions come from evidence, not guesswork.",
      ideal: "Advertisers who need a steady pipeline of ad concepts and clear learnings.",
      deliverables: ["Creative briefs and concept direction", "Testing framework (hooks, angles, formats)", "Ad copy variations", "Creative performance learnings"],
      process: ["Research angles", "Brief concepts", "Test in batches", "Document learnings"] },
    { slug: "lead-generation", title: "Lead Generation Campaigns",
      short: "Campaigns designed to bring in qualified enquiries, not just form fills.",
      ideal: "Service and B2B businesses that win customers through enquiries or calls.",
      deliverables: ["Lead form or landing-page funnel plan", "Lead quality feedback loop", "Follow-up process recommendations", "Cost-per-lead and quality reporting"],
      process: ["Define a qualified lead", "Build funnel", "Launch and review lead quality", "Refine targeting and offer"] },
    { slug: "retargeting", title: "Retargeting & Funnel Optimization",
      short: "Re-engage people who showed interest and tighten each step from click to conversion.",
      ideal: "Businesses with existing traffic or audiences that are not converting enough.",
      deliverables: ["Full-funnel campaign map", "Retargeting audience setup", "Landing-page and funnel recommendations", "Conversion step analysis"],
      process: ["Map the funnel", "Segment audiences", "Launch retargeting", "Optimize drop-offs"] },
    { slug: "analytics", title: "Tracking, Analytics & Reporting",
      short: "Reliable measurement and plain-English reporting so you know what is working.",
      ideal: "Teams that want trustworthy data behind every advertising decision.",
      deliverables: ["Tracking plan and event setup guidance", "Reporting dashboards", "Regular written summaries", "Recommendations for next steps"],
      process: ["Audit tracking", "Fix and extend measurement", "Report on a schedule", "Turn data into actions"] },
  ],

  // Demo content only. Set demo:false once a case study is real and approved by the client.
  caseStudies: [
    { demo: true, client: "Example E-commerce Brand", industry: "E-commerce", timeframe: "[Add timeframe]",
      challenge: "[Describe the client's challenge]", strategy: "[Describe the strategy used]", results: "[Add verified, client-approved results]" },
    { demo: true, client: "Example Local Service Business", industry: "Local services", timeframe: "[Add timeframe]",
      challenge: "[Describe the client's challenge]", strategy: "[Describe the strategy used]", results: "[Add verified, client-approved results]" },
    { demo: true, client: "Example B2B Company", industry: "B2B", timeframe: "[Add timeframe]",
      challenge: "[Describe the client's challenge]", strategy: "[Describe the strategy used]", results: "[Add verified, client-approved results]" },
  ],

  // Add real testimonials: { quote, name, role }. While empty, the section is hidden.
  testimonials: [],
  // Add real team members: { name, role, bio }. While empty, the section is hidden.
  team: [],
};
