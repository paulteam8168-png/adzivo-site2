// ============ CASE STUDIES — edit this file ============
// slug: short url name, no spaces (used for the #link)      demo: true shows a "Demo Content" badge — set false for REAL stories
// client, industry, timeframe, services[], summary (one line for cards), challenge, strategy, results
// stats: [{ value, label }]  (leave [] to hide)             quote: { text, name, role } — only use real, approved quotes ("" text = hidden)
// image: "/case-1.jpg" = a real picture you upload to the repo (same folder as this file). Leave "" to show the illustration.
// imageAlt: describe the picture   cover: "ecom" | "local" | "b2b" (which illustration to use when there is no image)
export default [
  {
    slug: "ecommerce-sample", demo: true, cover: "ecom",
    client: "Sample E-commerce Brand", industry: "E-commerce", timeframe: "Sample timeframe",
    services: ["Meta Ads Management", "Creative Strategy & Testing", "Retargeting"],
    summary: "How a store moved from one-off promotions to a repeatable way of finding new customers.",
    challenge: "Sales depended mostly on organic traffic and occasional promotions, with no repeatable way to find new customers.",
    strategy: "Rebuilt the account structure, tested creative angles in batches, and added retargeting for visitors who didn't buy.",
    results: "Describe the verified, client-approved outcome here.",
    stats: [{ value: "—", label: "Your key result" }, { value: "—", label: "Second result" }, { value: "—", label: "Third result" }],
    quote: { text: "", name: "", role: "" }, image: "", imageAlt: "",
  },
  {
    slug: "local-services-sample", demo: true, cover: "local",
    client: "Sample Local Service Business", industry: "Local services", timeframe: "Sample timeframe",
    services: ["Lead Generation", "Facebook & Instagram Campaigns"],
    summary: "How a local business built a steady flow of enquiries beyond word of mouth.",
    challenge: "The business relied on word of mouth and wanted a steady flow of local enquiries it could plan around.",
    strategy: "Built a lead-generation funnel with a clear offer, a short enquiry form and guidance on fast follow-up.",
    results: "Describe the verified, client-approved outcome here.",
    stats: [{ value: "—", label: "Your key result" }, { value: "—", label: "Second result" }, { value: "—", label: "Third result" }],
    quote: { text: "", name: "", role: "" }, image: "", imageAlt: "",
  },
  {
    slug: "b2b-sample", demo: true, cover: "b2b",
    client: "Sample B2B Company", industry: "B2B", timeframe: "Sample timeframe",
    services: ["Lead Generation", "Tracking, Analytics & Reporting"],
    summary: "How a B2B team shifted from form fills to qualified conversations.",
    challenge: "The team needed qualified conversations with decision makers, not just form fills.",
    strategy: "Targeted by role and industry, tested messaging, and fed lead-quality feedback into campaign optimization.",
    results: "Describe the verified, client-approved outcome here.",
    stats: [{ value: "—", label: "Your key result" }, { value: "—", label: "Second result" }, { value: "—", label: "Third result" }],
    quote: { text: "", name: "", role: "" }, image: "", imageAlt: "",
  },
];
