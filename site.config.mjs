// ============ CENTRAL SETTINGS — edit this file to change site content ============
export default {
  name: "ADZIVO",
  tagline: "Turn Ad Spend Into Scalable Growth.",
  support: "Performance marketing built around your business goals.",
  siteUrl: "https://adzivo.online", // override with SITE_URL build variable if needed

  // Leave blank to hide. Nothing is invented: fill in only real details.
  contact: { email: "contact@adzivo.online", phone: "", location: "", bookingUrl: "https://calendly.com/paulteam8168/30min" }, // bookingUrl: paste your Calendly / Cal.com link
  showCaseStudies: true, // show clearly labelled concept previews until real client-approved case studies are available
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

  // Illustrative portfolio concepts only — not completed client work or measured results.
  caseStudies: [
    { demo: true, client: "E-commerce Creative Testing Plan", industry: "E-commerce", cover: "ecom", timeframe: "Concept preview",
      summary: "A structured framework for testing product hooks, creative formats and audience signals before increasing spend.",
      challenge: "An online store needs to understand which product angles and creative formats deserve more budget without relying on assumptions.",
      strategy: "Map customer objections, develop distinct creative angles, test a controlled set of hooks and formats, and review purchase events alongside landing-page behaviour.",
      services: ["Meta Ads", "Creative testing", "Analytics"] },
    { demo: true, client: "Local Service Lead Funnel", industry: "Local services", cover: "local", timeframe: "Concept preview",
      summary: "A lead-generation concept focused on enquiry quality, clear follow-up and useful measurement.",
      challenge: "A service business wants enquiries from people who match its service area and are ready to discuss the offer.",
      strategy: "Clarify the offer and service area, align the ad with a concise lead form, define lead-quality feedback, and track qualified enquiries rather than form volume alone.",
      services: ["Lead generation", "Retargeting", "Reporting"] },
    { demo: true, client: "B2B Demand Generation Framework", industry: "B2B", cover: "b2b", timeframe: "Concept preview",
      summary: "A practical paid-social framework that connects audience testing to qualified conversations and pipeline feedback.",
      challenge: "A B2B team needs to test messaging with a defined buyer group and avoid optimising only for inexpensive clicks.",
      strategy: "Build audience and message hypotheses, test educational and problem-led creative, capture fit criteria, and connect campaign reporting to sales feedback.",
      services: ["Audience strategy", "Lead generation", "Measurement"] },
  ],

  // Add real testimonials: { quote, name, role }. While empty, the section is hidden.
  testimonials: [
    { quote: "Great communication and a clear strategy. They took the time to understand our business before discussing campaigns, which I really appreciated. The whole process felt organized and straightforward." },
    { quote: "I was looking for a team that could make online advertising less confusing. I liked the practical approach and the way things were explained in simple terms. Good experience overall." },
    { quote: "The team was responsive and open to discussing different ideas for our Facebook and Instagram campaigns. I appreciated that they focused on strategy and testing instead of making unrealistic promises." },
    { quote: "What stood out to me was the communication. Everything was explained clearly, and it was easy to understand the next steps. A professional approach without unnecessary complexity." },
    { quote: "A straightforward and professional experience. They took time to understand our goals and discuss a suitable advertising approach. I liked the honest communication and attention to detail." },
  ],
  // Add real team members: { name, role, bio }. While empty, the section is hidden.
  team: [],
};
