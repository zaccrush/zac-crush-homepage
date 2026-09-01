# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing/site repo for **Crush Combat Agency** (deployed at zaccrush.com) — no build step, no package manager, no test suite. Every page is a standalone `.html` file with Tailwind pulled from the CDN (`<script src="https://cdn.tailwindcss.com">`). Shared brand CSS lives in `assets/styles.css` and the mobile nav toggle in `assets/nav.js`, both referenced via plain `<link>`/`<script src>` tags — everything else (Tailwind config, Google Fonts links, per-page SEO/OG meta, per-page background images) stays inline per file since there's no build step to centralize it further. "Developing" here means editing HTML directly and previewing it.

## Commands

- Preview a page: open the `.html` file directly in a browser, or serve the directory locally, e.g. `python3 -m http.server 8000`.
- No build, lint, test, or typecheck commands exist in this repo — do not invent npm/build tooling for it.
- Deploy: pushing to the GitHub repo (`zaccrush/zac-crush-homepage`, remote `origin`) is what ships changes — there is no CI config. Hosting/build config for forms (Netlify Forms) is managed outside this repo, in the Netlify dashboard.

## Structure

- [index.html](index.html) — launch landing page: agency tagline/mission, Zac Crush's personal story (real, don't rewrite), the 5 service specialties, roster/legacy/media teasers, sign-up CTAs.
- [roster/index.html](roster/index.html) — fighter roster. **Contains placeholder cards** (`PLACEHOLDER` comments) — no real roster data exists yet.
- [services/index.html](services/index.html) — the 5 real agency specialties (Live Broadcast Production, Strategic Sponsorships, Global Fighter Scouting, Digital Media & Podcasts, Elite Athlete Management).
- [media/index.html](media/index.html) — dedicated podcast/broadcast archive. Add a new episode by copying one `<article class="podcast-card">` block.
- [join-fighter/index.html](join-fighter/index.html) + [success.html](join-fighter/success.html) — fighter sign-up form (Netlify form `fighter-signup`).
- [partner-inquiry/index.html](partner-inquiry/index.html) + [success.html](partner-inquiry/success.html) — sponsor/partner inquiry form (Netlify form `partner-inquiry`).
- [faq.html](faq.html) — FAQ page (Vietnam grappling/MMA scene, gym directories). Content is untouched from the pre-relaunch site — nav/footer only were updated.
- [gmaregistration/index.html](gmaregistration/index.html) — **archived**. Was the live "Gods of Martial Arts" registration form; the `<form>` has been removed and replaced with a past-promotion showcase + CTA to `/join-fighter/`. No longer a Netlify form.
- [saigon-superfights-registration/index.html](saigon-superfights-registration/index.html) — **archived**, same treatment as above for the old Saigon Superfights registration.
- `SEA GRAPPLING UNITED/index.html` — **not a real HTML page**: raw React/JSX + Firebase source, no `<html>` scaffolding. Unwired prototype, out of scope.
- Top-level image/photo assets are referenced both locally and via raw GitHub URLs (`raw.githubusercontent.com/zaccrush/zac-crush-homepage/...`) inside `<img>` tags.

**Removed in the Crush Combat Agency relaunch** (do not recreate without being asked): `admin.html` (dead Netlify-Identity-gated duplicate form), `gmaregistration/success.html` and `saigon-superfights-registration/success.html` (unreachable once their forms were archived).

## Brand assets pending

The real Crush Combat Agency logo and final color palette are **not yet in this repo** — they exist only on the agency's Facebook Page as of the relaunch. The site currently ships with a styled text wordmark and the old gold/red palette as a placeholder, centralized in `assets/styles.css` (`--accent`, `--accent-2` custom properties) specifically so the real palette/logo can be swapped in one edit once supplied. Run `grep -rn "PLACEHOLDER" .` to find every spot still waiting on real content (roster cards, hero sub-copy, wordmark).

## Forms

All live registration/contact forms use **Netlify Forms**: `<form data-netlify="true" name="...">` with a matching hidden `<input name="form-name" value="...">`, a `netlify-honeypot="bot-field"` spam trap, and a hidden `redirect` input pointing at `./success.html`. Currently exactly two live forms exist: `fighter-signup` and `partner-inquiry` (`grep -rn 'data-netlify="true"' .` should always return exactly these two). When editing a form:
- Keep the `name` attribute on `<form>` and the hidden `form-name` input in sync — Netlify matches submissions by form name.
- New form field `name`s must also physically exist in the static HTML — Netlify parses it at deploy time, so a field injected purely by JS won't be detected.

## Conventions across pages

- Shared brand CSS/JS: `assets/styles.css` (color tokens, `.glass-card`, `.btn-primary`/`.btn-outline`, `.eyebrow`, form-field styles, FAQ accordion, etc.) and `assets/nav.js` (mobile hamburger toggle) are referenced from every page — edit those files for a site-wide style/behavior change instead of touching each HTML file.
- What still can't be centralized without a build step (stays inline per page): the Tailwind CDN script + `tailwind.config`, Google Fonts `<link>` tags, each page's unique hero `background-image`, and each page's unique SEO/OG/JSON-LD block — update these per-file when changing titles/descriptions.
- `<img>` tags commonly carry `onerror="this.onerror=null;this.src='https://placehold.co/...'"` fallbacks — preserve this pattern when adding images.
- Nav/footer link sets are duplicated per page (no shared header/footer partial is possible without a build step) — when adding/removing a nav item, update it across every page.
