import { c as createComponent, m as maybeRenderHead, a as renderScript, b as renderTemplate, r as renderComponent, u as unescapeHTML, d as createAstro, e as addAttribute } from '../chunks/astro/server_D634BqaN.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_D0LpAQtS.mjs';
import 'clsx';
/* empty css                                 */
import { a as artists } from '../chunks/artists_5mwdeAZr.mjs';
import { c as clothingData } from '../chunks/clothing_CXOO5iBI.mjs';
export { renderers } from '../renderers.mjs';

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="nav-container" data-astro-cid-pux6a34n> <button id="menu-toggle" aria-label="Open Menu" data-astro-cid-pux6a34n> <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-pux6a34n> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" data-astro-cid-pux6a34n></path> </svg> </button> <nav id="menu" class="nav-overlay hidden" data-astro-cid-pux6a34n> <div class="nav-links" data-astro-cid-pux6a34n> <a href="#home" data-astro-cid-pux6a34n>Home</a> <a href="#events" data-astro-cid-pux6a34n>Events</a> <a href="#artists" data-astro-cid-pux6a34n>Artists</a> <a href="/listen" data-astro-cid-pux6a34n>Listen</a> <a href="#clothing" data-astro-cid-pux6a34n>Clothing</a> <a href="/account" data-astro-cid-pux6a34n>Account</a> </div> </nav> </div>  ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/Navigation.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <div class="logo" data-astro-cid-3ef6ksr2> <a href="/" data-astro-cid-3ef6ksr2>G'zRadio</a> </div> <div class="header-actions" data-astro-cid-3ef6ksr2> <div id="cart-container" class="cart-container" data-astro-cid-3ef6ksr2></div> ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-3ef6ksr2": true })} </div> </header> `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/Header.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const brandDescription = "Your source for the realest sounds in the game. Curated vibes, no skips. This is The G'z Radio.";
  return renderTemplate`${maybeRenderHead()}<section id="hero" style="background-image: url('/assets/Gz.jpg')" data-astro-cid-bbe6dxrz> <div class="hero-content" data-astro-cid-bbe6dxrz> <h1 class="rugged-headline" data-text="The G'z Radio" data-astro-cid-bbe6dxrz>The G'z Radio</h1> <p data-astro-cid-bbe6dxrz>${brandDescription}</p> </div> <div class="scroll-down-indicator" data-astro-cid-bbe6dxrz> <span data-astro-cid-bbe6dxrz>SCROLL</span> </div> </section>  ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/Hero.astro", void 0);

const eventsData = [
	{
		date: "2025-10-26",
		title: "Tuff touch Nights",
		location: "Nairobi, Kenya"
	},
	{
		date: "2025-11-15",
		title: "G'z Radio Fest",
		location: "Nairobi, Kenya"
	}
];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$InteractiveCalendar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div class="calendar-container" data-astro-cid-vtfpl7t3> <button id="calendar-toggle" class="calendar-btn" data-astro-cid-vtfpl7t3> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-vtfpl7t3> <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" data-astro-cid-vtfpl7t3></path> </svg>\nView Event Calendar\n</button> <!-- Calendar Modal --> <div id="calendar-modal" class="calendar-modal hidden" data-astro-cid-vtfpl7t3> <div class="calendar-backdrop" data-astro-cid-vtfpl7t3></div> <div class="calendar-content glass" data-astro-cid-vtfpl7t3> <div class="calendar-header" data-astro-cid-vtfpl7t3> <button id="prev-month" class="nav-btn" data-astro-cid-vtfpl7t3>\u2039</button> <h3 id="current-month" data-astro-cid-vtfpl7t3>January 2025</h3> <button id="next-month" class="nav-btn" data-astro-cid-vtfpl7t3>\u203A</button> <button id="close-calendar" class="close-btn" data-astro-cid-vtfpl7t3>\u2715</button> </div> <div class="calendar-grid" data-astro-cid-vtfpl7t3> <div class="day-header" data-astro-cid-vtfpl7t3>Sun</div> <div class="day-header" data-astro-cid-vtfpl7t3>Mon</div> <div class="day-header" data-astro-cid-vtfpl7t3>Tue</div> <div class="day-header" data-astro-cid-vtfpl7t3>Wed</div> <div class="day-header" data-astro-cid-vtfpl7t3>Thu</div> <div class="day-header" data-astro-cid-vtfpl7t3>Fri</div> <div class="day-header" data-astro-cid-vtfpl7t3>Sat</div> <!-- Calendar days will be generated by JS --> </div> <!-- Event Details Panel --> <div id="event-details" class="event-details hidden" data-astro-cid-vtfpl7t3> <h4 data-astro-cid-vtfpl7t3>Events on <span id="selected-date" data-astro-cid-vtfpl7t3></span></h4> <div id="events-list" data-astro-cid-vtfpl7t3></div> </div> </div> </div> </div> <!-- Embed events data for JS --> <script type="application/json" id="events-data">', '<\/script> <script type="module" src="/js/calendar.js" defer><\/script> '])), maybeRenderHead(), unescapeHTML(JSON.stringify(eventsData)));
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/InteractiveCalendar.astro", void 0);

const $$EventsSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="events" class="events-section fade-in-section parallax-bg" data-astro-cid-kgulxjfp> <div class="section-content" data-astro-cid-kgulxjfp> <h2 data-astro-cid-kgulxjfp>Upcoming Events</h2> ${renderComponent($$result, "InteractiveCalendar", $$InteractiveCalendar, { "data-astro-cid-kgulxjfp": true })} <div class="event-list" data-astro-cid-kgulxjfp> ${eventsData.map((event) => renderTemplate`<div class="event-item" data-astro-cid-kgulxjfp> <span class="event-date" data-astro-cid-kgulxjfp>${new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span> <h3 class="event-title" data-astro-cid-kgulxjfp>${event.title}</h3> <p class="event-location" data-astro-cid-kgulxjfp>${event.location}</p> </div>`)} </div> </div> </section> `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/EventsSection.astro", void 0);

const $$Astro$1 = createAstro();
const $$ArtistCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ArtistCard;
  const { slug, name, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/artists/${slug}`, "href")} class="artist-card" data-astro-cid-njinqevw> <img${addAttribute(image, "src")}${addAttribute(`Photo of ${name}`, "alt")} loading="lazy" data-astro-cid-njinqevw> <div class="card-overlay" data-astro-cid-njinqevw> <h3 class="artist-name" data-astro-cid-njinqevw>${name}</h3> </div> </a> `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/ArtistCard.astro", void 0);

const $$ArtistGrid = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="artists" class="artists-section fade-in-section parallax-bg" data-astro-cid-qdiroofv> <div class="section-content" data-astro-cid-qdiroofv> <h2 data-astro-cid-qdiroofv>Our Artists</h2> <p data-astro-cid-qdiroofv>Click for details</p> <div class="artist-grid" data-astro-cid-qdiroofv> ${artists.map((artist) => renderTemplate`${renderComponent($$result, "ArtistCard", $$ArtistCard, { "slug": artist.slug, "name": artist.name, "image": artist.image, "data-astro-cid-qdiroofv": true })}`)} </div> </div> </section> `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/ArtistGrid.astro", void 0);

const $$Astro = createAstro();
const $$ClothingCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClothingCard;
  const { id, name, image, price, currency, slug, inStock, colors, sizes } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="clothing-card fade-in-section"${addAttribute(id, "data-product-id")} data-astro-cid-eihvggdh> <div class="card-image" data-astro-cid-eihvggdh> <img${addAttribute(image, "src")}${addAttribute(`Photo of ${name}`, "alt")} loading="lazy" class="product-image" onload="this.classList.add('loaded')" onerror="this.style.objectFit='cover'; this.style.objectPosition='center center'" data-astro-cid-eihvggdh> ${!inStock && renderTemplate`<div class="out-of-stock-badge" data-astro-cid-eihvggdh>Out of Stock</div>`} </div> <div class="card-info" data-astro-cid-eihvggdh> <h3 data-astro-cid-eihvggdh>${name}</h3> <p class="price" data-astro-cid-eihvggdh>$${price.toFixed(2)} ${currency}</p> <div class="product-options" data-astro-cid-eihvggdh> <div class="size-selector" data-astro-cid-eihvggdh> <label data-astro-cid-eihvggdh>Size:</label> <select class="size-select" data-astro-cid-eihvggdh> ${sizes.map((size) => renderTemplate`<option${addAttribute(size, "value")} data-astro-cid-eihvggdh>${size}</option>`)} </select> </div> <div class="color-selector" data-astro-cid-eihvggdh> <label data-astro-cid-eihvggdh>Color:</label> <div class="color-options" data-astro-cid-eihvggdh> ${colors.map((color, index) => renderTemplate`<button${addAttribute(`color-option ${index === 0 ? "selected" : ""}`, "class")}${addAttribute(color.name, "data-color")}${addAttribute(`background-color: ${color.hex}`, "style")}${addAttribute(color.name, "title")} data-astro-cid-eihvggdh></button>`)} </div> </div> </div> <div class="card-actions" data-astro-cid-eihvggdh> <button class="add-to-cart-btn"${addAttribute(id, "data-product-id")}${addAttribute(!inStock, "disabled")} data-astro-cid-eihvggdh> ${inStock ? "Add to Cart" : "Out of Stock"} </button> <a${addAttribute(`/product/${slug}`, "href")} class="view-details-btn" data-astro-cid-eihvggdh>View Details</a> </div> </div> </div>  ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/ClothingCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/ClothingCard.astro", void 0);

const $$ClothingSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="clothing" class="clothing-section fade-in-section" data-astro-cid-4uedgkfy> <div class="section-content" data-astro-cid-4uedgkfy> <h2 class="fade-in-section" data-astro-cid-4uedgkfy>G'z Radio Apparel</h2> <div class="clothing-grid fade-in-section" data-astro-cid-4uedgkfy> ${clothingData.map((item) => renderTemplate`${renderComponent($$result, "ClothingCard", $$ClothingCard, { "id": item.id, "name": item.name, "image": item.images[0], "price": item.price, "currency": item.currency, "slug": item.slug, "inStock": item.inStock, "colors": item.colors, "sizes": item.sizes, "data-astro-cid-4uedgkfy": true })}`)} </div> </div> </section>  ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/ClothingSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/ClothingSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "The G'z Radio" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Hero", $$Hero, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "EventsSection", $$EventsSection, {})} ${renderComponent($$result2, "ArtistGrid", $$ArtistGrid, {})} ${renderComponent($$result2, "ClothingSection", $$ClothingSection, {})} </main> ` })}`;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/index.astro", void 0);

const $$file = "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
