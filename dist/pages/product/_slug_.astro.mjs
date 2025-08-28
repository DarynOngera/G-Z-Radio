import { c as createComponent, d as createAstro, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_D634BqaN.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_D0LpAQtS.mjs';
import { c as clothingData } from '../../chunks/clothing_CXOO5iBI.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return clothingData.map((item) => ({
    params: { slug: item.slug },
    props: { product: item }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { product } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `${product.name} - G'z Radio Merch`, "data-astro-cid-hyvzkcdj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="product-detail-page" data-astro-cid-hyvzkcdj> <div class="container" data-astro-cid-hyvzkcdj> <div class="product-detail-content" data-astro-cid-hyvzkcdj> <!-- Product Images --> <div class="product-images" data-astro-cid-hyvzkcdj> <div class="main-image" data-astro-cid-hyvzkcdj> <img id="mainProductImage"${addAttribute(product.images[0], "src")}${addAttribute(product.name, "alt")} data-astro-cid-hyvzkcdj> </div> <div class="image-thumbnails" data-astro-cid-hyvzkcdj> ${product.images.map((image, index) => renderTemplate`<button${addAttribute(`thumbnail ${index === 0 ? "active" : ""}`, "class")}${addAttribute(image, "data-image")} data-astro-cid-hyvzkcdj> <img${addAttribute(image, "src")}${addAttribute(`${product.name} view ${index + 1}`, "alt")} data-astro-cid-hyvzkcdj> </button>`)} </div> </div> <!-- Product Info --> <div class="product-info" data-astro-cid-hyvzkcdj> <h1 class="product-title" data-astro-cid-hyvzkcdj>${product.name}</h1> <p class="product-price" data-astro-cid-hyvzkcdj>$${product.price.toFixed(2)} ${product.currency}</p> <p class="product-description" data-astro-cid-hyvzkcdj>${product.description}</p> <!-- Product Features --> <div class="product-features" data-astro-cid-hyvzkcdj> <h3 data-astro-cid-hyvzkcdj>Features:</h3> <ul data-astro-cid-hyvzkcdj> ${product.features.map((feature) => renderTemplate`<li data-astro-cid-hyvzkcdj>${feature}</li>`)} </ul> </div> <!-- Size Selection --> <div class="size-selection" data-astro-cid-hyvzkcdj> <label data-astro-cid-hyvzkcdj>Size:</label> <div class="size-options" data-astro-cid-hyvzkcdj> ${product.sizes.map((size, index) => renderTemplate`<button${addAttribute(`size-btn ${index === 0 ? "selected" : ""}`, "class")}${addAttribute(size, "data-size")} data-astro-cid-hyvzkcdj> ${size} </button>`)} </div> </div> <!-- Color Selection --> <div class="color-selection" data-astro-cid-hyvzkcdj> <label data-astro-cid-hyvzkcdj>Color:</label> <div class="color-options" data-astro-cid-hyvzkcdj> ${product.colors.map((color, index) => renderTemplate`<button${addAttribute(`color-option ${index === 0 ? "selected" : ""}`, "class")}${addAttribute(color.name, "data-color")}${addAttribute(`background-color: ${color.hex}`, "style")}${addAttribute(color.name, "title")} data-astro-cid-hyvzkcdj></button>`)} </div> </div> <!-- Stock Info --> <div class="stock-info" data-astro-cid-hyvzkcdj> ${product.inStock ? renderTemplate`<span class="in-stock" data-astro-cid-hyvzkcdj>✓ In Stock (${product.stockCount} available)</span>` : renderTemplate`<span class="out-of-stock" data-astro-cid-hyvzkcdj>✗ Out of Stock</span>`} </div> <!-- Actions --> <div class="product-actions" data-astro-cid-hyvzkcdj> <button class="add-to-cart-btn primary-btn"${addAttribute(product.id, "data-product-id")}${addAttribute(!product.inStock, "disabled")} data-astro-cid-hyvzkcdj> ${product.inStock ? "Add to Cart" : "Out of Stock"} </button> <button class="back-btn secondary-btn" onclick="history.back()" data-astro-cid-hyvzkcdj>
← Back to Shop
</button> </div> </div> </div> </div> </div> ` })}  ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/product/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/product/[slug].astro", void 0);

const $$file = "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/product/[slug].astro";
const $$url = "/product/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
