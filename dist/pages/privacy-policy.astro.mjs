import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D634BqaN.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_D0LpAQtS.mjs';
/* empty css                                          */
export { renderers } from '../renderers.mjs';

const $$PrivacyPolicy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Privacy Policy", "data-astro-cid-3llnt6j6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="legal-content" data-astro-cid-3llnt6j6> <h1 data-astro-cid-3llnt6j6>Privacy Policy</h1> <p data-astro-cid-3llnt6j6><em data-astro-cid-3llnt6j6>Last updated: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</em></p> <p data-astro-cid-3llnt6j6>Your privacy is important to us. This is a placeholder for your privacy policy content.</p> <p data-astro-cid-3llnt6j6>Please replace this text with your full privacy policy, detailing how you collect, use, and protect your users' data.</p> <!-- Add your full privacy policy content here --> </div> ` })} `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/privacy-policy.astro", void 0);

const $$file = "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/privacy-policy.astro";
const $$url = "/privacy-policy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PrivacyPolicy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
