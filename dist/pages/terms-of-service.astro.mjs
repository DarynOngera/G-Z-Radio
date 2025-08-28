import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D634BqaN.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_D0LpAQtS.mjs';
/* empty css                                            */
export { renderers } from '../renderers.mjs';

const $$TermsOfService = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Terms of Service", "data-astro-cid-cr6djlpe": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="legal-content" data-astro-cid-cr6djlpe> <h1 data-astro-cid-cr6djlpe>Terms of Service</h1> <p data-astro-cid-cr6djlpe><em data-astro-cid-cr6djlpe>Last updated: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</em></p> <p data-astro-cid-cr6djlpe>Welcome to The G'z Radio. This is a placeholder for your terms of service.</p> <p data-astro-cid-cr6djlpe>Please replace this text with your full terms and conditions, outlining the rules and regulations for the use of your website and services.</p> <!-- Add your full terms of service content here --> </div> ` })} `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/terms-of-service.astro", void 0);

const $$file = "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/terms-of-service.astro";
const $$url = "/terms-of-service";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TermsOfService,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
