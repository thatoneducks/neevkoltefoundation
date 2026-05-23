# Neev Kolte Foundation Website

Source code for **[neevkoltefoundation.org](https://neevkoltefoundation.org)** — fighting childhood cancer through research funding, family support, and advocacy.

---

## File Structure

```
neevkoltefoundation/
├── index.html        — HTML for every page on the site
├── styles.css        — All visual styling (colors, layout, typography, responsive)
├── app.js            — All JavaScript (navigation, translations, gallery)
└── gallery/          — Event photos served by the site
    ├── feb2025-pmwc/
    ├── feb2025-alliance-action-days/
    ├── feb2025-rare-disease-advocacy/
    ├── mar2025-grief-retreat/
    ├── apr2025-ab703-testimony/
    ├── apr2025-acs-can-advocacy/
    ├── may2025-neev-kindness-award/
    ├── may2025-pedsno/
    ├── jun2025-cac2-annual-meeting/
    ├── jun2025-childrens-hospital-advocacy/
    ├── jul2025-lemonade-stand/
    ├── aug2025-cancer-resolution-senate/
    ├── aug2025-onc201-launch/
    ├── sep2025-family-day-ucsf/
    ├── sep2025-round-table/
    ├── sep2025-aacr-rally/
    ├── sep2025-pbs-interview/
    ├── sep2025-rayaan-climb-hill/
    ├── sep2025-curefest/
    ├── sep2025-rayaan-speech-curefest/
    └── sep2025-sacramento-event/
```

---

## How the Site Works

This is a **single-page application** — there is no backend, no build step, no framework. Everything runs in the browser from these three files.

### Navigation

The site has multiple "pages" that are all loaded into the DOM at once. Only one is visible at a time. Switching pages works by calling `navigate('page-name')` in `app.js`, which toggles a CSS class:

```js
// In app.js
function navigate(page) { ... }
```

Each page in `index.html` looks like:
```html
<div class="page" id="page-home">   <!-- hidden by default -->
<div class="page active" id="page-home">  <!-- visible -->
```

### Pages (in index.html)

| Page ID | What it contains | Approx. line |
|---|---|---|
| `page-home` | Hero, stats, mission pillars, Neev's story, events, donate CTA | 1503 |
| `page-about` | Full story, team, timeline | 1929 |
| `page-donate` | Donation form, PayPal integration, fund breakdown | 2497 |
| `page-siblings-youth` | Siblings & Youth program | 2917 |
| `page-family-support` | Family aid fund, application info | 3151 |
| `page-advocacy` | Federal + state advocacy work | 3533 |
| `page-events` | Upcoming events | 3919 |
| `page-volunteer` | Volunteer opportunities | 3971 |
| `page-research` | Research grants, grantees | 4067 |
| `page-blog` | Blog / news | 4443 |
| `page-contact` | Contact form | 4507 |
| `page-apply` | Family support application | 4613 |
| `page-partners` | Partner organizations | 4763 |
| `page-gallery` | Photo gallery (built by JS) | 4945 |
| `page-patient-intake` | Patient intake form | 5023 |

---

## styles.css

All CSS in one file, organized into sections:

| Section | What it covers |
|---|---|
| Design Tokens | CSS variables: `--forest`, `--gold`, `--sand`, fonts, spacing |
| Reset & Base | Box sizing, body, headings, links |
| Nav | Top navigation bar, hamburger menu, mobile nav |
| Hero | Home page hero — full-height, stat strip |
| Page Hero | Inner page headers (green banner with title) |
| Sections | Content block padding and max-width container |
| Buttons | Primary/secondary/ghost button styles |
| Cards | Content cards used across pages |
| Forms | Input fields, labels, validation states |
| Photo Gallery | Grid cards (5-col → 2-col responsive) + lightbox modal |
| Footer | Footer grid, links, newsletter signup |
| Responsive | Mobile/tablet breakpoints (768px, 600px, 400px) |

### Design Tokens (key variables)

```css
--forest:  #1C3829   /* dark green — primary brand color */
--gold:    #B8893A   /* gold — accent, borders, highlights */
--sand:    #F5F0E8   /* warm off-white — background */
--ink:     #181818   /* near-black — body text */
--muted:   #5A5A5A   /* gray — secondary text */
```

**Fonts:** Cormorant Garamond (serif headings) + Jost (sans body/nav)

---

## app.js

All JavaScript in one file, organized into sections:

### Navigation
```js
function navigate(page)   // shows one page, hides all others
```

### Language Toggle (EN / ES)
```js
const translations = { 'key': { en: '...', es: '...' }, ... }
function toggleLang()        // switches between EN and ES
function applyTranslations() // updates all [data-i18n] elements
```

To translate a new element, add `data-i18n="your-key"` to the HTML tag and add `'your-key': { en: '...', es: '...' }` to the `translations` object in `app.js`.

### Gallery

The gallery page is built dynamically from the `GALLERY_EVENTS` array:

```js
const GALLERY_EVENTS = [
  {
    id:     'feb2025-pmwc',           // must match folder name in gallery/
    title:  'PMWC Speaker Panel',
    date:   'February 5, 2025',
    cat:    'Research & Science',     // shown as italic gold tag on card
    desc:   'Description shown in the lightbox modal...',
    photos: ['photo1.jpg', 'photo2.jpg', ...]  // filenames inside gallery/{id}/
  },
  ...
]
```

```js
function buildGallery()           // creates the 5-col card grid
function openGalleryModal(ei, i)  // opens lightbox for event ei, photo i
function closeGalleryModal()      // closes lightbox
function modalMove(dir)           // prev (-1) / next (+1) photo
function modalFullscreen()        // enters fullscreen mode
```

---

## How to Add a New Gallery Event

1. Create a subfolder under `gallery/` named `YYYY-MM-eventname` (e.g. `gallery/oct2025-gala/`)
2. Put the photos inside it
3. Add an entry to `GALLERY_EVENTS` in `app.js`:
   ```js
   {
     id: 'oct2025-gala',
     title: 'Annual Gala',
     date: 'October 15, 2025',
     cat: 'Community',
     desc: 'A short description shown in the lightbox.',
     photos: ['photo1.jpg', 'photo2.jpg']
   }
   ```
4. Commit and push — Netlify deploys automatically if connected, or run `netlify deploy --prod`

---

## How to Edit Page Content

Open `index.html` and find the page section you want by searching for the page ID (e.g. `id="page-about"`). All text, headings, and structure are plain HTML inside each section.

For bilingual content, use `data-i18n="key"` on the element and add the key to `translations` in `app.js`.

---

## Deployment

Hosted on **Netlify** at [neevkoltefoundation.org](https://neevkoltefoundation.org).

To deploy manually:
```bash
netlify deploy --prod --dir . --site bec3a773-8235-4b4b-8a4f-d23fb09f872d
```

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| > 1100px | 5-column gallery grid |
| ≤ 1100px | 4-column gallery grid |
| ≤ 820px | 3-column gallery grid |
| ≤ 768px | Single-column layouts, reduced padding, hamburger nav |
| ≤ 600px | Stat strip flows below hero (no overlap), tighter padding |
| ≤ 560px | 2-column gallery grid |
| ≤ 400px | Minimum padding, smallest text sizes |
| ≤ 360px | 1-column gallery grid |
