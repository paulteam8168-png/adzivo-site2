// ============ CENTRAL SETTINGS — edit this file to change site content ============
export default {
  name: "ADZIVO",
  tagline: "Turn Ad Spend Into Scalable Growth.",
  support: "Performance marketing built around your business goals.",
  siteUrl: "https://adzivo.online", // override with SITE_URL build variable if needed

  // Leave blank to hide. Nothing is invented: fill in only real details.
  contact: { email: "contact@adzivo.online", phone: "", location: "", bookingUrl: "" }, // bookingUrl: paste your Calendly / Cal.com link
  showCaseStudies: true, // case stories live in case-studies.mjs; set false to hide the Case Studies page
  googleVerification: "", // Google Search Console HTML-tag code (only the content value)
  legal: { legalName: "", jurisdiction: "", lastUpdated: "October 14, 2026" }, // legalName / jurisdiction: fill only when known; blank = line is omitted
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

  // Real testimonials only: { quote, name, role }. While empty, the section is hidden. Keep proof of each client's permission.
  testimonials: [
    { quote: "Great experience with ADZIVO. Their team is professional, responsive, and focused on delivering quality advertising solutions.", name: "Adam", role: "Past client" },
    { quote: "ADZIVO brings a structured approach to digital advertising. Their focus on strategy, targeting, and optimization really stands out.", name: "John", role: "Past client" },
    { quote: "Impressed with ADZIVO’s communication and attention to detail. A solid choice for businesses looking for professional advertising support.", name: "Andy", role: "Past client" },
    { quote: "ADZIVO understands the importance of campaign optimization and business goals. Their professional approach makes them a promising marketing partner.", name: "Past client", role: "" },
  ],
  // Add real team members: { name, role, bio }. While empty, the section is hidden.
  team: [],
};
