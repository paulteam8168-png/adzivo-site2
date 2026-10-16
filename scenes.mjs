// Distinct emerald/chrome 3D artwork for each page.
// Visuals are illustrative; no performance data is presented as real results.
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const decorations = {
  services: [
    '<div class="di-ambient"></div><div class="di-ring di-ring-one"></div><div class="di-ring di-ring-two"></div><div class="di-floor"></div>',
    '<div class="di-service-pad"><span class="di-service-top">ADZIVO / MEDIA SYSTEM</span><div class="di-radar"><i></i><i></i><i></i><span>✦</span></div><div class="di-pad-caption">STRATEGY → CREATIVE → SIGNAL</div></div>',
    '<div class="di-tile di-tile-left"><small>01 / CAMPAIGNS</small><strong>↗</strong><span>Structured launch</span></div>',
    '<div class="di-tile di-tile-right"><small>02 / CREATIVE</small><strong>✳</strong><span>Ideas that connect</span></div>',
    '<div class="di-tile di-tile-bottom"><small>03 / INSIGHTS</small><div class="di-chart"><b></b><b></b><b></b><b></b><b></b></div><span>Clear decisions</span></div>'
  ].join(''),
  portfolio: [
    '<div class="di-ambient"></div><div class="di-floor"></div><div class="di-ring di-ring-wide"></div>',
    '<div class="di-project di-project-left"><div class="di-project-top"><span>01 / E-COMMERCE</span><b>✳</b></div><div class="di-product-bottle"><i></i></div><strong>Creative testing</strong><small>ILLUSTRATIVE CONCEPT</small></div>',
    '<div class="di-project di-project-center"><div class="di-project-top"><span>02 / LOCAL SERVICES</span><b>↗</b></div><div class="di-product-arch"><i></i></div><strong>Lead quality</strong><small>ILLUSTRATIVE CONCEPT</small></div>',
    '<div class="di-project di-project-right"><div class="di-project-top"><span>03 / B2B</span><b>✦</b></div><div class="di-project-chart"><b></b><b></b><b></b><b></b><b></b></div><strong>Demand strategy</strong><small>ILLUSTRATIVE CONCEPT</small></div>'
  ].join(''),
  about: [
    '<div class="di-ambient"></div><div class="di-floor"></div><div class="di-ring di-ring-one"></div><div class="di-ring di-ring-two"></div>',
    '<div class="di-emblem"><svg viewBox="0 0 320 340" aria-hidden="true"><defs><linearGradient id="em-chrome" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#effffb"/><stop offset=".24" stop-color="#78b6a4"/><stop offset=".5" stop-color="#f7fffd"/><stop offset=".75" stop-color="#224c42"/><stop offset="1" stop-color="#b1ffdc"/></linearGradient></defs>',
    '<path d="M42 270 145 47 Q160 18 177 52 L281 270 229 270 161 112 92 270Z" fill="url(#em-chrome)" stroke="#c5ffe5" stroke-width="5" stroke-linejoin="round"/>',
    '<path d="M145 47 168 40 Q184 42 192 65 L299 279 281 270 177 52 Q160 18 145 47Z" fill="#225c4e" stroke="#7effcb" stroke-opacity=".6"/>',
    '<path d="M94 215 H229 L250 256 H74Z" fill="url(#em-chrome)" stroke="#d2fff0" stroke-width="3"/><path d="M94 215 107 199 H212 L229 215Z" fill="#144939"/></svg><span>ADZIVO</span></div>',
    '<div class="di-idea di-idea-one"><i>01</i><strong>Clarity first</strong></div><div class="di-idea di-idea-two"><i>02</i><strong>Creative thinking</strong></div><div class="di-idea di-idea-three"><i>03</i><strong>Responsible growth</strong></div>'
  ].join(''),
  contact: [
    '<div class="di-ambient"></div><div class="di-floor"></div><div class="di-ring di-ring-wide"></div>',
    '<div class="di-envelope"><svg viewBox="0 0 520 365" aria-hidden="true"><defs><linearGradient id="ev-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d6fff0"/><stop offset=".26" stop-color="#4fbaa0"/><stop offset=".52" stop-color="#f0fffa"/><stop offset="1" stop-color="#145643"/></linearGradient></defs>',
    '<path d="M58 82 Q58 63 76 63 H445 Q464 63 464 82 V290 Q464 306 445 306 H76 Q58 306 58 290Z" fill="#0e2c22" stroke="#89ffd4" stroke-width="6"/>',
    '<path d="M60 86 260 232 461 86" stroke="#c8ffed" stroke-width="11" stroke-linejoin="round" fill="none"/>',
    '<path d="M60 301 217 194 M461 301 306 194" stroke="#4ce3b1" stroke-width="6" opacity=".85"/>',
    '<path d="M61 84 260 226 459 84 260 182Z" fill="url(#ev-metal)" fill-opacity=".35"/>',
    '<path d="M58 291 211 193 260 225 308 193 464 291Z" fill="url(#ev-metal)" fill-opacity=".15"/></svg><span class="di-envelope-badge">✦</span></div>',
    '<div class="di-message di-message-one"><span>NEW CONVERSATION</span><strong>Build what is next.</strong><small>ADZIVO / STRATEGY</small></div>',
    '<div class="di-message di-message-two"><b>✓</b> Clear next steps</div>'
  ].join(''),
  booking: [
    '<div class="di-ambient"></div><div class="di-floor"></div><div class="di-ring di-ring-one"></div>',
    '<div class="di-calendar"><header><span>ADZIVO / STRATEGY SESSION</span><b>✳</b></header><strong>Your next move.</strong><div class="di-week"><i>M</i><i>T</i><i>W</i><i>T</i><i>F</i><b>✓</b><b>✓</b><b>✓</b><b>✦</b><b>✓</b><b>✓</b><b>✦</b><b>✓</b><b>✓</b><b>✓</b></div><small>DISCOVER • PLAN • EXECUTE</small></div>',
    '<div class="di-tile di-book-tile"><small>STEP ONE</small><strong>↗</strong><span>Strategy starts here</span></div>'
  ].join(''),
  legal: [
    '<div class="di-ambient"></div><div class="di-floor"></div><div class="di-ring di-ring-one"></div>',
    '<div class="di-shield"><svg viewBox="0 0 300 350" aria-hidden="true"><defs><linearGradient id="sh-grad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#effff9"/><stop offset=".3" stop-color="#56eab9"/><stop offset=".58" stop-color="#c2ffea"/><stop offset="1" stop-color="#17604b"/></linearGradient></defs>',
    '<path d="M150 22 262 62 V159 Q263 265 150 327 37 265 38 159 V62Z" fill="#0a211a" stroke="url(#sh-grad)" stroke-width="13"/><path d="M88 178 131 215 215 123" stroke="url(#sh-grad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg></div>',
    '<div class="di-message di-message-one"><span>TRUST / TRANSPARENCY</span><strong>Clear by design.</strong><small>ADZIVO / INFORMATION</small></div>'
  ].join(''),
  error: [
    '<div class="di-ambient"></div><div class="di-floor"></div><div class="di-ring di-ring-one"></div><div class="di-ring di-ring-two"></div>',
    '<div class="di-error-symbol">404</div><div class="di-message di-message-one"><span>BACK TO THE FUTURE</span><strong>Find your way home ↗</strong></div>'
  ].join('')
};
export function sceneVisual(kind = 'services', label = 'ADZIVO / GROWTH') {
  const type = Object.prototype.hasOwnProperty.call(decorations,kind) ? kind : 'services';
  return '<div class="scene-diorama scene-'+type+'" aria-hidden="true">'
    +'<span class="di-atmosphere di-atmosphere-a"></span><span class="di-atmosphere di-atmosphere-b"></span>'
    + decorations[type]
    + '<div class="di-scene-label">'+escapeHtml(label)+'</div></div>';
}
