import { c as createComponent, m as maybeRenderHead, b as renderTemplate, d as createAstro, r as renderComponent, e as addAttribute } from '../../chunks/astro/server_D634BqaN.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_D0LpAQtS.mjs';
import { a as artists } from '../../chunks/artists_5mwdeAZr.mjs';
import 'clsx';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$SpotifyIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" aria-label="Spotify icon" role="img" data-astro-cid-ylwnowcr> <path d="M12 0C5.371 0 0 5.371 0 12c0 6.628 5.371 12 12 12 6.628 0 12-5.372 12-12 0-6.629-5.372-12-12-12zm5.294 17.444a.743.743 0 0 1-1.022.248c-2.803-1.716-6.333-2.101-10.51-1.143a.744.744 0 1 1-.333-1.449c4.6-1.059 8.554-.611 11.68 1.334a.746.746 0 0 1 .185 1.01zm1.458-3.177a.93.93 0 0 1-1.276.311c-3.214-1.966-8.107-2.537-11.89-1.38a.93.93 0 0 1-.54-1.789c4.235-1.279 9.595-.648 13.333 1.628.44.268.58.85.372 1.23zm.134-3.554c-3.845-2.292-10.266-2.503-13.98-1.362a1.116 1.116 0 0 1-.65-2.137c4.256-1.298 11.324-1.047 15.688 1.508a1.116 1.116 0 1 1-1.058 1.989z" fill="currentColor" data-astro-cid-ylwnowcr></path> </svg> `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/SpotifyIcon.astro", void 0);

const $$SoundCloudIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-zv2c4eie> <path d="M9 18V5l12-2v13" data-astro-cid-zv2c4eie></path> <circle cx="6" cy="18" r="3" data-astro-cid-zv2c4eie></circle> <circle cx="18" cy="16" r="3" data-astro-cid-zv2c4eie></circle> </svg> `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/SoundCloudIcon.astro", void 0);

const $$AppleMusicIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-632ghwdf> <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" data-astro-cid-632ghwdf></path> <path d="m9 12-2.5 4.5M15 12l2.5 4.5" data-astro-cid-632ghwdf></path> <path d="M12 12V6.5" data-astro-cid-632ghwdf></path> <path d="m8 9 4-2 4 2" data-astro-cid-632ghwdf></path> </svg> `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/AppleMusicIcon.astro", void 0);

const $$Astro = createAstro();
async function getStaticPaths() {
  return artists.map((artist) => ({
    params: { slug: artist.slug },
    props: { artist }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { artist } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `${artist.name} - The G'z Radio`, "showFooter": false, "data-astro-cid-usz3khe5": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="artist-page-container" data-astro-cid-usz3khe5> <div class="artist-profile-grid" data-astro-cid-usz3khe5> <div class="artist-visual" data-astro-cid-usz3khe5> <img${addAttribute(artist.image, "src")}${addAttribute(`Photo of ${artist.name}`, "alt")} data-astro-cid-usz3khe5> <div class="artist-name-overlay" data-astro-cid-usz3khe5> <h1 data-astro-cid-usz3khe5>${artist.name}</h1> </div> </div> <div class="artist-details" data-astro-cid-usz3khe5> <a href="/" class="back-link" data-astro-cid-usz3khe5>&larr; Back to Main</a> <div class="bio-section fade-in-section" data-astro-cid-usz3khe5> <h2 data-astro-cid-usz3khe5>About</h2> <p data-astro-cid-usz3khe5>${artist.bio}</p> </div> <div class="streaming-section fade-in-section" data-astro-cid-usz3khe5> <h2 data-astro-cid-usz3khe5>Follow On</h2> <div class="streaming-links" data-astro-cid-usz3khe5> ${artist.streamingLinks.spotify && artist.streamingLinks.spotify !== "#" && renderTemplate`<a${addAttribute(artist.streamingLinks.spotify, "href")} target="_blank" rel="noopener noreferrer" aria-label="Spotify" data-astro-cid-usz3khe5> ${renderComponent($$result2, "SpotifyIcon", $$SpotifyIcon, { "data-astro-cid-usz3khe5": true })} </a>`} ${artist.streamingLinks.soundcloud && artist.streamingLinks.soundcloud !== "#" && renderTemplate`<a${addAttribute(artist.streamingLinks.soundcloud, "href")} target="_blank" rel="noopener noreferrer" aria-label="SoundCloud" data-astro-cid-usz3khe5> ${renderComponent($$result2, "SoundCloudIcon", $$SoundCloudIcon, { "data-astro-cid-usz3khe5": true })} </a>`} ${artist.streamingLinks.appleMusic && artist.streamingLinks.appleMusic !== "#" && renderTemplate`<a${addAttribute(artist.streamingLinks.appleMusic, "href")} target="_blank" rel="noopener noreferrer" aria-label="Apple Music" data-astro-cid-usz3khe5> ${renderComponent($$result2, "AppleMusicIcon", $$AppleMusicIcon, { "data-astro-cid-usz3khe5": true })} </a>`} </div> </div> <div class="discography-section fade-in-section" data-astro-cid-usz3khe5> <h2 data-astro-cid-usz3khe5>Discography</h2> <div class="album-list" data-astro-cid-usz3khe5> ${artist.discography.map((album) => renderTemplate`<div class="album-item" data-astro-cid-usz3khe5> <h3 data-astro-cid-usz3khe5>${album.title}</h3> <span data-astro-cid-usz3khe5>${album.year}</span> </div>`)} </div> </div> </div> </div> </div> ` })} `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/artists/[slug].astro", void 0);

const $$file = "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/artists/[slug].astro";
const $$url = "/artists/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
