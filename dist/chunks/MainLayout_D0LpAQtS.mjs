import { c as createComponent, m as maybeRenderHead, a as renderScript, b as renderTemplate, d as createAstro, r as renderComponent, f as renderSlot, g as renderHead, e as addAttribute } from './astro/server_D634BqaN.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                           */

const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer" data-astro-cid-sz7xmlte> <div class="footer-content" data-astro-cid-sz7xmlte> <div class="newsletter-signup" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Join the Movement</h4> <p data-astro-cid-sz7xmlte>Get exclusive updates on drops, events, and new music.</p> <form id="newsletter-form" class="newsletter-form" data-astro-cid-sz7xmlte> <input id="newsletter-email" type="email" placeholder="Enter your email" required data-astro-cid-sz7xmlte> <button id="newsletter-submit" type="submit" data-astro-cid-sz7xmlte>Subscribe</button> </form> <div class="consent-check" data-astro-cid-sz7xmlte> <input id="newsletter-consent" type="checkbox" name="consent" required data-astro-cid-sz7xmlte> <label for="newsletter-consent" data-astro-cid-sz7xmlte>I agree to the <a href="/privacy-policy" data-astro-cid-sz7xmlte>Privacy Policy</a> and <a href="/terms-of-service" data-astro-cid-sz7xmlte>Terms of Service</a>.</label> </div> <div id="newsletter-message" class="newsletter-message" data-astro-cid-sz7xmlte></div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} The G'z Radio. All Rights Reserved.</p> </div> </div> </footer> ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/Footer.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/Footer.astro", void 0);

const $$PaymentModal = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="payment-modal" class="payment-modal hidden" data-astro-cid-56xyqzgb> <div class="payment-overlay" data-astro-cid-56xyqzgb></div> <div class="payment-content" data-astro-cid-56xyqzgb> <button id="close-payment" class="close-btn" data-astro-cid-56xyqzgb>&times;</button> <div class="payment-header" data-astro-cid-56xyqzgb> <h2 id="payment-title" data-astro-cid-56xyqzgb>Complete Payment</h2> <div class="payment-type-indicator" data-astro-cid-56xyqzgb> <span id="payment-type-badge" class="type-badge" data-astro-cid-56xyqzgb>Premium Access</span> </div> </div> <div class="payment-details" data-astro-cid-56xyqzgb> <div id="payment-summary" class="summary-section" data-astro-cid-56xyqzgb> <!-- Dynamic content will be inserted here --> </div> <div class="payment-form" data-astro-cid-56xyqzgb> <div class="form-group" data-astro-cid-56xyqzgb> <label for="phone-number" data-astro-cid-56xyqzgb>Phone Number</label> <input type="tel" id="phone-number" placeholder="254712345678" pattern="254[0-9]{9}" maxlength="12" required data-astro-cid-56xyqzgb> <small class="form-hint" data-astro-cid-56xyqzgb>Enter your M-Pesa phone number (254XXXXXXXXX)</small> </div> <div class="total-section" data-astro-cid-56xyqzgb> <div class="total-row" data-astro-cid-56xyqzgb> <span data-astro-cid-56xyqzgb>Total Amount:</span> <span id="payment-total" class="total-amount" data-astro-cid-56xyqzgb>KSh 0</span> </div> </div> <button id="initiate-payment" class="payment-btn" disabled data-astro-cid-56xyqzgb> <span class="btn-text" data-astro-cid-56xyqzgb>Pay with M-Pesa</span> <span class="btn-loader hidden" data-astro-cid-56xyqzgb>Processing...</span> </button> <div class="payment-security" data-astro-cid-56xyqzgb> <div class="security-icons" data-astro-cid-56xyqzgb> <span class="security-badge" data-astro-cid-56xyqzgb>🔒 Secure Payment</span> <span class="mpesa-badge" data-astro-cid-56xyqzgb>M-PESA</span> </div> <p class="security-text" data-astro-cid-56xyqzgb>Your payment is secured by Safaricom M-Pesa</p> </div> </div> </div> </div> </div>  ${renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/PaymentModal.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/components/PaymentModal.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, showFooter = true } = Astro2.props;
  return renderTemplate(_a || (_a = __template([`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="The G'z Radio Official Website"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"`, "><title>", '</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles/global.css"><link rel="stylesheet" href="/styles/cart.css">', "</head> <body> ", " ", " ", ` <script>
      // Smooth scroll for anchor links
      function handleSmoothScroll(e) {
        var link = e.currentTarget;
        var url = new URL(link.href);
        var targetId = url.hash.substring(1);
        var targetElement = document.getElementById(targetId);

        // If on the same page and the element exists, smooth scroll
        if (window.location.pathname === url.pathname && targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        } 
        // Otherwise, let the browser handle the navigation to the new page
      }

      document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('a[href*="#"]').forEach(function(anchor) {
          anchor.addEventListener('click', handleSmoothScroll);
        });

        // On page load, check for a hash and scroll to it
        window.addEventListener('load', function() {
          if (window.location.hash) {
            var targetElement = document.getElementById(window.location.hash.substring(1));
            if (targetElement) {
              setTimeout(function() { // Timeout to ensure page is fully rendered
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }
        });

        // Intersection observer for fade-in animations
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              entry.target.classList.remove('is-visible');
            }
          });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-section').forEach(function(section) {
          observer.observe(section);
        });
      });
    <\/script> <!-- Cart System --> <script src="/js/cart.js"><\/script> `, " ", ' <script src="/js/clothing.js"><\/script> </body> </html>'])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]), showFooter && renderTemplate`${renderComponent($$result, "Footer", $$Footer, {})}`, renderComponent($$result, "PaymentModal", $$PaymentModal, {}), renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts"), renderScript($$result, "C:/Users/User/CascadeProjects/the-gz-radio/src/layouts/MainLayout.astro?astro&type=script&index=1&lang.ts"));
}, "C:/Users/User/CascadeProjects/the-gz-radio/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
