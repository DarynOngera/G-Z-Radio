import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D634BqaN.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_D0LpAQtS.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Account = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "My Account", "data-astro-cid-o7lwksye": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="account-section fade-in-section" data-astro-cid-o7lwksye> <div class="container" data-astro-cid-o7lwksye> <a href="/" class="back-link" data-astro-cid-o7lwksye>← Back to Main</a> <h1 data-astro-cid-o7lwksye>My Account</h1> <!-- Premium Status --> <div class="account-card premium-status-card" data-astro-cid-o7lwksye> <h2 data-astro-cid-o7lwksye>🎵 Premium Music Access</h2> <div id="premium-status-content" data-astro-cid-o7lwksye> <div class="loading" data-astro-cid-o7lwksye>Loading premium status...</div> </div> </div> <!-- Order History --> <div class="account-card orders-card" data-astro-cid-o7lwksye> <h2 data-astro-cid-o7lwksye>🛍️ Order History</h2> <div id="orders-content" data-astro-cid-o7lwksye> <div class="loading" data-astro-cid-o7lwksye>Loading orders...</div> </div> </div> <!-- Payment History --> <div class="account-card payments-card" data-astro-cid-o7lwksye> <h2 data-astro-cid-o7lwksye>💳 Payment History</h2> <div id="payments-content" data-astro-cid-o7lwksye> <div class="loading" data-astro-cid-o7lwksye>Loading payments...</div> </div> </div> </div> </section> ` })}  ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/account.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/account.astro", void 0);

const $$file = "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/account.astro";
const $$url = "/account";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Account,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
