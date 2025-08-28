import { c as createComponent, d as createAstro, b as renderTemplate, u as unescapeHTML, e as addAttribute, m as maybeRenderHead, a as renderScript, r as renderComponent } from '../chunks/astro/server_D634BqaN.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_D0LpAQtS.mjs';
import 'clsx';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$AudioPlayer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AudioPlayer;
  const { tracks } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<div class="audio-player glass" data-astro-cid-pgr4kkuk> <img id="cover" class="cover"', ' alt="Track cover" data-astro-cid-pgr4kkuk> <div class="info" data-astro-cid-pgr4kkuk> <h3 id="track-title" data-astro-cid-pgr4kkuk>', '</h3> <p id="track-artist" data-astro-cid-pgr4kkuk>', '</p> </div> <ul class="playlist" data-astro-cid-pgr4kkuk> ', ' </ul> <canvas id="visualizer" width="600" height="100" data-astro-cid-pgr4kkuk></canvas> <div class="controls" data-astro-cid-pgr4kkuk> <button id="prev" aria-label="Previous track" class="control-btn" data-astro-cid-pgr4kkuk> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-pgr4kkuk><path d="M11 18V6l-8.5 6L11 18zm1-12v12l8.5-6L12 6z" data-astro-cid-pgr4kkuk></path></svg> </button> <button id="play" aria-label="Play / Pause" class="control-btn" data-astro-cid-pgr4kkuk> <!-- Play icon --> <svg id="icon-play" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-pgr4kkuk><path d="M8 5v14l11-7L8 5z" data-astro-cid-pgr4kkuk></path></svg> </button> <button id="next" aria-label="Next track" class="control-btn" data-astro-cid-pgr4kkuk> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-pgr4kkuk><path d="M13 6v12l8.5-6L13 6zm-1 12V6L3.5 12 12 18z" data-astro-cid-pgr4kkuk></path></svg> </button> <input id="progress" type="range" min="0" max="100" value="0" data-astro-cid-pgr4kkuk> <input id="volume" type="range" min="0" max="1" step="0.01" value="1" data-astro-cid-pgr4kkuk> </div> </div> <!-- embed tracks data for JS --> <script type="application/json" id="tracks-data">', '<\/script> <script type="module" src="/js/audio-player.js" defer><\/script> '])), maybeRenderHead(), addAttribute(tracks[0].cover, "src"), tracks[0].title, tracks[0].artist, tracks.map((track, i) => renderTemplate`<li class="playlist-item"${addAttribute(i, "data-index")} data-astro-cid-pgr4kkuk>${track.title} - ${track.artist}</li>`), unescapeHTML(JSON.stringify(tracks)));
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/AudioPlayer.astro", void 0);

const tracks = [
	{
		id: "freestab",
		title: "Freestab",
		artist: "G'z Radio",
		src: "/audio/freestab.mp3",
		preview: "/audio/freestab.mp3",
		cover: "/assets/cover.jpg",
		duration: "3:45",
		previewDuration: 30,
		genre: "Hip-Hop",
		description: "A smooth freestyle track showcasing lyrical prowess"
	},
	{
		id: "mazingich",
		title: "Mazingich",
		artist: "G'z Radio",
		src: "/audio/mazingich.wav",
		preview: "/audio/mazingich.wav",
		cover: "/assets/icon.jpg",
		duration: "4:12",
		previewDuration: 30,
		genre: "Hip-Hop",
		description: "An energetic track with powerful beats and flow"
	},
	{
		id: "DISSTAB",
		title: "DISSTAB",
		artist: "G'z Radio",
		src: "/audio/DISSTAB.wav",
		preview: "/audio/DISSTAB.wav",
		cover: "/assets/cover.jpg",
		duration: "3:12",
		previewDuration: 30,
		genre: "Hip-Hop",
		description: "Raw underground sound with authentic street vibes"
	}
];

const $$PremiumGate = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="premium-gate" class="premium-gate" data-astro-cid-uvelpda3> <!-- Song Previews Section --> <div class="song-previews" data-astro-cid-uvelpda3> <h3 data-astro-cid-uvelpda3>Preview Our Tracks</h3> <!-- Single Track Player --> <div class="track-display" data-astro-cid-uvelpda3> <div class="track-info" data-astro-cid-uvelpda3> <h4 class="current-track-title" data-astro-cid-uvelpda3>Freestab</h4> <p class="current-track-artist" data-astro-cid-uvelpda3>G'z Radio</p> <p class="current-track-description" data-astro-cid-uvelpda3>A smooth freestyle track showcasing lyrical prowess</p> </div> <!-- Audio Visualization --> <div class="audio-visualizer" data-astro-cid-uvelpda3> <canvas id="audioCanvas" width="400" height="120" data-astro-cid-uvelpda3></canvas> <div class="visualizer-overlay" data-astro-cid-uvelpda3> <button class="main-play-btn" id="mainPlayBtn" data-astro-cid-uvelpda3> <span class="play-icon" data-astro-cid-uvelpda3> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-uvelpda3> <path d="M8 5v14l11-7z" data-astro-cid-uvelpda3></path> </svg> </span> <span class="pause-icon" style="display: none;" data-astro-cid-uvelpda3> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-uvelpda3> <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" data-astro-cid-uvelpda3></path> </svg> </span> </button> </div> </div> <!-- Track Controls --> <div class="track-controls" data-astro-cid-uvelpda3> <div class="time-display" data-astro-cid-uvelpda3> <span class="current-time" data-astro-cid-uvelpda3>0:00</span> <span class="separator" data-astro-cid-uvelpda3>/</span> <span class="total-time" data-astro-cid-uvelpda3>0:30</span> </div> <div class="track-navigation" data-astro-cid-uvelpda3> <button class="nav-btn prev-btn" id="prevBtn" data-astro-cid-uvelpda3> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-uvelpda3> <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" data-astro-cid-uvelpda3></path> </svg> </button> <span class="track-counter" data-astro-cid-uvelpda3> <span class="current-track-num" data-astro-cid-uvelpda3>1</span> of <span class="total-tracks" data-astro-cid-uvelpda3>${tracks.length}</span> </span> <button class="nav-btn next-btn" id="nextBtn" data-astro-cid-uvelpda3> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-uvelpda3> <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" data-astro-cid-uvelpda3></path> </svg> </button> </div> </div> </div> <p class="preview-note" data-astro-cid-uvelpda3>Full tracks available with Premium Access • 30s previews only</p> </div> <div class="premium-features" data-astro-cid-uvelpda3> <div class="feature" data-astro-cid-uvelpda3> <span class="feature-icon" data-astro-cid-uvelpda3>🎵</span> <span data-astro-cid-uvelpda3>Full track streaming</span> </div> <div class="feature" data-astro-cid-uvelpda3> <span class="feature-icon" data-astro-cid-uvelpda3>⬇️</span> <span data-astro-cid-uvelpda3>Download & keep forever</span> </div> <div class="feature" data-astro-cid-uvelpda3> <span class="feature-icon" data-astro-cid-uvelpda3>HD</span> <span data-astro-cid-uvelpda3>High-quality audio</span> </div> <div class="feature" data-astro-cid-uvelpda3> <span class="feature-icon" data-astro-cid-uvelpda3>📱</span> <span data-astro-cid-uvelpda3>Mobile & desktop access</span> </div> </div> <div class="current-track-purchase" data-astro-cid-uvelpda3> <div class="purchase-card" data-astro-cid-uvelpda3> <div class="track-purchase-info" data-astro-cid-uvelpda3> <h3 id="purchase-track-title" data-astro-cid-uvelpda3>Freestab</h3> <p id="purchase-track-artist" data-astro-cid-uvelpda3>G'z Radio</p> </div> <div class="purchase-price" data-astro-cid-uvelpda3> <span class="currency" data-astro-cid-uvelpda3>KSh</span> <span class="amount" data-astro-cid-uvelpda3>50</span> <span class="period" data-astro-cid-uvelpda3>per track</span> </div> </div> </div> <div class="premium-actions" data-astro-cid-uvelpda3> <button id="buy-track-btn" class="premium-btn" data-astro-cid-uvelpda3> <span class="btn-text" data-astro-cid-uvelpda3>Buy & Download Track</span> <span class="btn-price" data-astro-cid-uvelpda3>KSh 50</span> </button> <div class="premium-footer" data-astro-cid-uvelpda3> <p data-astro-cid-uvelpda3>Secure payment via M-Pesa • Download immediately after payment</p> </div> </div> </div>  ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/PremiumGate.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/PremiumGate.astro", void 0);

const $$Listen = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Listen", "showFooter": false, "data-astro-cid-6glp6cfo": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="listen-section fade-in-section" data-astro-cid-6glp6cfo> <a href="/" class="back-link" data-astro-cid-6glp6cfo>← Back to Main</a> <h1 data-astro-cid-6glp6cfo>Exclusive Streams</h1> <!-- Premium Gate (hidden by default, only shown when needed) --> <div id="premium-gate-container" class="hidden" data-astro-cid-6glp6cfo> ${renderComponent($$result2, "PremiumGate", $$PremiumGate, { "data-astro-cid-6glp6cfo": true })} </div> <!-- Audio Player with Download Options --> <div id="audio-player-container" data-astro-cid-6glp6cfo> <div class="tracks-list" data-astro-cid-6glp6cfo> <h2 data-astro-cid-6glp6cfo>Available Tracks</h2> <div class="track-grid" data-astro-cid-6glp6cfo> ${tracks.map((track, index) => renderTemplate`<div class="track-card"${addAttribute(track.id, "data-track-id")} data-astro-cid-6glp6cfo> <div class="track-info" data-astro-cid-6glp6cfo> <img${addAttribute(track.cover, "src")}${addAttribute(`${track.title} cover`, "alt")} class="track-cover" data-astro-cid-6glp6cfo> <div class="track-details" data-astro-cid-6glp6cfo> <h3 class="track-title" data-astro-cid-6glp6cfo>${track.title}</h3> <p class="track-artist" data-astro-cid-6glp6cfo>${track.artist}</p> <p class="track-duration" data-astro-cid-6glp6cfo>${track.duration}</p> </div> </div> <div class="track-actions" data-astro-cid-6glp6cfo> <button class="play-preview-btn"${addAttribute(index, "data-track-index")} data-astro-cid-6glp6cfo> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-6glp6cfo> <path d="M8 5v14l11-7z" data-astro-cid-6glp6cfo></path> </svg>
Preview
</button> <button class="download-track-btn"${addAttribute(track.id, "data-track-id")}${addAttribute(track.title, "data-track-title")}${addAttribute(track.artist, "data-track-artist")} data-astro-cid-6glp6cfo> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-6glp6cfo> <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" data-astro-cid-6glp6cfo></path> </svg>
Buy & Download - KSh 50
</button> </div> </div>`)} </div> </div> ${renderComponent($$result2, "AudioPlayer", $$AudioPlayer, { "tracks": tracks, "data-astro-cid-6glp6cfo": true })} </div> </section> ` })} `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/listen.astro", void 0);

const $$file = "C:/Users/User/CascadeProjects/the-gz-radio/src/pages/listen.astro";
const $$url = "/listen";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Listen,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
