// Neev Kolte Foundation — app.js
// Navigation, translations (EN/ES), gallery events & lightbox


// ==================== NAVIGATION ====================

function navigate(page) {

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const target = document.getElementById('page-' + page);

  if (target) {

    target.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  const navLink = document.querySelector(`.nav-links a[onclick="navigate('${page}')"]`);

  if (navLink) navLink.classList.add('active');

  const mm = document.getElementById('mobile-menu');

  if (mm) mm.classList.remove('open');

  // Load PayPal when donate page opened

  if (page === 'donate') initPayPalSDK();

}



function toggleMenu() {

  document.getElementById('mobile-menu').classList.toggle('open');

}



// ==================== LANGUAGE TOGGLE ====================

let lang = 'en';



const translations = {

  // Nav

  'nav-sub':        { en: 'Fighting Childhood Cancer',      es: 'Luchando Contra el Cáncer Infantil' },

  'nav-about':      { en: 'About',         es: 'Acerca' },

  'nav-programs':   { en: 'Programs',      es: 'Programas' },

  'nav-stories':    { en: 'Stories',       es: 'Historias' },

  'nav-events':     { en: 'Events',        es: 'Eventos' },

  'nav-gallery':    { en: 'Gallery',       es: 'Galería' },

  'gallery-tag':    { en: 'Our Work',     es: 'Nuestro Trabajo' },

  'gallery-h1':     { en: 'Photo Gallery',es: 'Galería Fotográfica' },

  'gallery-subtitle':{ en: 'Events, advocacy, research, and community moments from 2025.',

                       es: 'Eventos, defensa, investigación y momentos comunitarios de 2025.' },

  'nav-research':   { en: 'Research',      es: 'Investigación' },

  'nav-news':       { en: 'News',          es: 'Noticias' },

  'nav-volunteer':  { en: 'Volunteer',     es: 'Voluntarios' },

  'nav-contact':    { en: 'Contact',       es: 'Contacto' },

  'nav-apply':      { en: 'Apply for Help',es: 'Solicitar Ayuda' },

  'nav-partners':   { en: 'Partners',      es: 'Socios' },

  'nav-donate':     { en: 'Donate',        es: 'Donar' },

  // Mobile menu

  'm-home':         { en: 'Home',               es: 'Inicio' },

  'm-about':        { en: 'About Us',            es: 'Sobre Nosotros' },

  'm-programs':     { en: 'Our Programs',        es: 'Nuestros Programas' },

  'm-stories':      { en: 'Patient Stories',     es: 'Historias de Pacientes' },

  'm-events':       { en: 'Events',              es: 'Eventos' },

  'm-research':     { en: 'Research & Impact',   es: 'Investigación e Impacto' },

  'm-blog':         { en: 'Blog & News',         es: 'Blog y Noticias' },

  'm-volunteer':    { en: 'Volunteer',            es: 'Voluntarios' },

  'm-contact':      { en: 'Contact',             es: 'Contacto' },

  'm-apply':        { en: 'Apply for Help',       es: 'Solicitar Ayuda' },

  'm-partners':     { en: 'Corporate Partners',  es: 'Socios Corporativos' },

  'm-donate':       { en: 'Donate Now →',        es: 'Donar Ahora →' },

  // Hero

  'hero-tag':       { en: 'Neev Kolte Foundation', es: 'Fundación Neev Kolte' },

  'hero-h1':        { en: 'Fighting <em>Childhood Cancer.</em><br>For Every Child.<br>For Every Family.',

                      es: 'Luchando Contra el <em>Cáncer Infantil.</em><br>Por Cada Niño.<br>Por Cada Familia.' },

  'hero-p':         { en: 'From DIPG to all pediatric cancers — we fund research, support families, and advocate until every child has a fighting chance.',

                      es: 'Desde el DIPG hasta todos los cánceres pediátricos — financiamos investigación, apoyamos familias y abogamos hasta que cada niño tenga una oportunidad.' },

  'btn-donate-now': { en: 'Donate Now',           es: 'Donar Ahora' },

  'btn-our-story':  { en: 'Our Story',            es: 'Nuestra Historia' },

  // Hero stats

  'stat-research':  { en: 'Research Grant — UCSF',           es: 'Beca de Investigación — UCSF' },

  'stat-cities':    { en: 'Cities — CCAM Proclamations',     es: 'Ciudades — Proclamas CCAM' },

  'stat-partners':  { en: 'Alliance Partner Nonprofits',     es: 'Organizaciones Aliadas' },

  'stat-children':  { en: 'Children Diagnosed with Cancer',  es: 'Niños Diagnosticados con Cáncer' },

  // Mission

  'sec-mission':        { en: 'Our Mission',      es: 'Nuestra Misión' },

  'sec-pillars-title':  { en: 'Three Pillars of <em>Hope</em>', es: 'Tres Pilares de <em>Esperanza</em>' },

  'sec-pillars-sub':    { en: 'Every dollar we raise, every family we support, and every research grant we fund moves us closer to defeating DIPG and all forms of childhood cancer.',

                          es: 'Cada dólar recaudado, cada familia apoyada y cada beca de investigación que financiamos nos acerca más a vencer el DIPG y todas las formas de cáncer infantil.' },

  'card-research-title':{ en: 'Research Funding',  es: 'Financiamiento de Investigación' },

  'card-research-p':    { en: 'We fund breakthrough research at leading institutions, supporting scientists who refuse to give up on finding cures for DIPG, pediatric brain tumors, and all forms of childhood cancer.',

                          es: 'Financiamos investigación innovadora en instituciones líderes, apoyando a científicos comprometidos en encontrar curas para el DIPG, tumores cerebrales pediátricos y todo cáncer infantil.' },

  'card-family-title':  { en: 'Family Support',    es: 'Apoyo a Familias' },

  'card-family-p':      { en: 'A childhood cancer diagnosis devastates families emotionally and financially. Our aid fund provides direct assistance — covering travel, lodging, and everyday expenses.',

                          es: 'Un diagnóstico de cáncer infantil devasta a las familias emocional y económicamente. Nuestro fondo de ayuda brinda asistencia directa: transporte, alojamiento y gastos cotidianos.' },

  'card-advocacy-title':{ en: 'Advocacy',          es: 'Defensa' },

  'card-advocacy-p':    { en: 'We fight for more federal funding for pediatric cancer research and push for policy changes that give families facing DIPG and all childhood cancers access to clinical trials.',

                          es: 'Luchamos por más financiamiento federal para la investigación del cáncer pediátrico y por cambios de política que den acceso a ensayos clínicos a las familias afectadas.' },

  // Neev story

  'neev-story-label':   { en: "Neev's Story",      es: 'La Historia de Neev' },

  'neev-p1':            { en: 'Neev Kolte was a four-year-old Pleasanton boy full of life — he loved animals, especially hummingbirds. He even named one that visited his backyard "Cutiepie Grapes." He loved growing vegetables in the garden and spending time with his family and older brother Rayaan.',

                          es: 'Neev Kolte era un niño de cuatro años de Pleasanton lleno de vida — amaba a los animales, especialmente a los colibríes. Incluso le puso nombre a uno que visitaba su jardín: "Cutiepie Grapes." Amaba cultivar verduras y pasar tiempo con su familia y su hermano mayor Rayaan.' },

  'neev-p2':            { en: 'In August 2020, Neev was diagnosed with DIPG. For more than a year, his family fought alongside him. Neev passed on November 30, 2021, at the age of six. His memory is the reason this foundation exists — and his spirit drives every grant we fund, every family we support, and every law we help pass.',

                          es: 'En agosto de 2020, a Neev le diagnosticaron DIPG. Durante más de un año, su familia luchó a su lado. Neev falleció el 30 de noviembre de 2021, a los seis años. Su memoria es la razón de esta fundación — y su espíritu guía cada beca, cada familia apoyada y cada ley que ayudamos a aprobar.' },

  'btn-learn-mission':  { en: 'Learn About Our Mission', es: 'Conoce Nuestra Misión' },

  // Events

  'events-label':   { en: 'Upcoming Events',   es: 'Próximos Eventos' },

  'events-title':   { en: 'Join the <em style="color:var(--forest);">Fight</em>', es: 'Únete a la <em style="color:var(--forest);">Lucha</em>' },

  // Donate strip

  'donate-ribbon':  { en: 'Make a Difference',  es: 'Haz una Diferencia' },

  'donate-h2':      { en: 'Your gift <em style="color:var(--gold);">saves</em> lives today.',

                      es: 'Tu donación <em style="color:var(--gold);">salva</em> vidas hoy.' },

  // Email strip

  'email-h3':       { en: 'Stay in the Fight',  es: 'Mantente en la Lucha' },

  'email-p':        { en: 'Get research breakthroughs, family stories, and event updates delivered to your inbox.',

                      es: 'Recibe avances en investigación, historias de familias y novedades de eventos en tu correo.' },

  // Footer

  'footer-p':       { en: 'Fighting childhood cancer through research, family support, and advocacy. Founded in memory of Neev Kolte, for every child who deserves a chance.',

                      es: 'Luchamos contra el cáncer infantil a través de investigación, apoyo familiar y defensa. Fundada en memoria de Neev Kolte, por cada niño que merece una oportunidad.' },

};



function applyTranslations() {

  // Plain text elements

  document.querySelectorAll('[data-i18n]').forEach(el => {

    const key = el.getAttribute('data-i18n');

    if (translations[key] && translations[key][lang]) {

      el.textContent = translations[key][lang];

    }

  });

  // HTML elements (contain tags like <em>)

  document.querySelectorAll('[data-i18n-html]').forEach(el => {

    const key = el.getAttribute('data-i18n-html');

    if (translations[key] && translations[key][lang]) {

      el.innerHTML = translations[key][lang];

    }

  });

  // Update all lang-toggle buttons

  document.querySelectorAll('.lang-toggle').forEach(btn => {

    btn.textContent = lang === 'en' ? 'ES' : 'EN';

  });

}



function toggleLang() {

  lang = lang === 'en' ? 'es' : 'en';

  applyTranslations();

}



// ==================== ANIMATED COUNTERS ====================

function animateCounters() {

  document.querySelectorAll('[data-target]').forEach(el => {

    const target = parseInt(el.getAttribute('data-target'));

    const prefix = el.getAttribute('data-prefix') || '';

    let current = 0;

    const increment = target / 80;

    const timer = setInterval(() => {

      current = Math.min(current + increment, target);

      if (prefix === '$') {

        el.textContent = prefix + (current >= 1000000

          ? (current / 1000000).toFixed(1) + 'M'

          : Math.floor(current).toLocaleString());

      } else {

        el.textContent = Math.floor(current).toLocaleString();

      }

      if (current >= target) clearInterval(timer);

    }, 20);

  });

}

setTimeout(animateCounters, 600);



// ==================== DONATE WIDGET ====================

function setTab(btn, type) {

  document.querySelectorAll('.donate-tab').forEach(t => t.classList.remove('active'));

  btn.classList.add('active');

}

function setAmount(btn, amount) {

  const grid = btn.closest('.amount-grid');

  if (grid) grid.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));

  btn.classList.add('active');

  const input = btn.closest('.donate-widget')?.querySelector('.amount-input') || document.getElementById('donate-amount');

  const submitBtn = btn.closest('.donate-widget')?.querySelector('.donate-submit');

  if (amount === 'custom') {

    if (input) { input.value = ''; input.focus(); }

  } else {

    if (input) input.value = '$' + amount + ' / month';

    if (submitBtn) submitBtn.textContent = 'Donate $' + amount + ' / Month';

  }

}



// ==================== NOTIFICATION ====================

function showNotif(msg) {

  const n = document.getElementById('notification');

  if (!n) return;

  n.innerHTML = msg;

  n.classList.add('show');

  setTimeout(() => n.classList.remove('show'), 3500);

}



// ==================== BLOG FILTER ====================

function setBlogFilter(btn, cat) {

  document.querySelectorAll('.donate-tab').forEach(t => t.classList.remove('active'));

  btn.classList.add('active');

}



// ==================== ACCORDION ====================

function toggleAccordion(header) {

  const body = header.nextElementSibling;

  const isOpen = body.classList.contains('open');

  document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));

  document.querySelectorAll('.accordion-header span').forEach(s => s.textContent = '+');

  if (!isOpen) {

    body.classList.add('open');

    header.querySelector('span').textContent = '−';

  }

}



// ==================== DONATE PAGE STATE ====================

let donateState = {

  type: 'onetime',   // onetime | monthly | tribute

  amount: 50,

  customAmount: null,

  paypalLoaded: false,

  paypalRendered: false

};



function setDonateType(type) {

  donateState.type = type;

  ['onetime','monthly','tribute'].forEach(t => {

    document.getElementById('dtab-' + t).classList.toggle('active', t === type);

  });

  document.getElementById('tribute-fields').style.display = type === 'tribute' ? 'block' : 'none';

  updateAmountDisplay();

}



function pickAmount(btn, amount) {

  document.querySelectorAll('#donate-amount-grid .amount-btn').forEach(b => b.classList.remove('active'));

  btn.classList.add('active');

  donateState.amount = amount;

  donateState.customAmount = null;

  document.getElementById('donate-custom-input').value = '';

  updateAmountDisplay();

}



function onCustomAmount(input) {

  const val = parseFloat(input.value);

  if (val > 0) {

    donateState.customAmount = val;

    donateState.amount = val;

    document.querySelectorAll('#donate-amount-grid .amount-btn').forEach(b => b.classList.remove('active'));

  } else {

    donateState.customAmount = null;

  }

  updateAmountDisplay();

}



function updateAmountDisplay() {

  const amt = donateState.customAmount || donateState.amount;

  const suffix = donateState.type === 'monthly' ? '/mo' : '';

  const el = document.getElementById('donate-amount-display');

  if (el) el.textContent = '$' + (Number.isInteger(amt) ? amt : amt.toFixed(2)) + (suffix ? ' ' + suffix : '');

}



function donateNext(fromStep) {

  if (fromStep === 1) {

    const amt = donateState.customAmount || donateState.amount;

    if (!amt || amt < 1) { showNotif('Please enter a donation amount.'); return; }

    showDonateStep(2);

  } else if (fromStep === 2) {

    const first = document.getElementById('donor-first').value.trim();

    const last  = document.getElementById('donor-last').value.trim();

    const email = document.getElementById('donor-email').value.trim();

    if (!first || !last) { showNotif('Please enter your name.'); return; }

    if (!email || !email.includes('@')) { showNotif('Please enter a valid email.'); return; }

    showDonateStep(3);

    renderPayPalButtons();

  }

}



function donateBack(fromStep) {

  showDonateStep(fromStep - 1);

}



function showDonateStep(step) {

  [1,2,3,4].forEach(s => {

    const el = document.getElementById('donate-step-' + s);

    if (el) el.style.display = s === step ? 'block' : 'none';

  });

  // update step indicators

  ['dstep1','dstep2','dstep3'].forEach((id, i) => {

    const el = document.getElementById(id);

    if (!el) return;

    el.style.background = (i + 1) <= step ? 'var(--gold)' : 'var(--rule)';

  });

  // Update payment summary

  if (step === 3) {

    const amt = donateState.customAmount || donateState.amount;

    const typeLabel = donateState.type === 'monthly' ? 'Monthly Recurring'

                    : donateState.type === 'tribute' ? 'Tribute Gift' : 'One-Time Gift';

    const el1 = document.getElementById('payment-summary-amount');

    const el2 = document.getElementById('payment-summary-type');

    if (el1) el1.textContent = '$' + (Number.isInteger(amt) ? amt : amt.toFixed(2));

    if (el2) el2.textContent = typeLabel;

  }

}



// ==================== PAYPAL SDK ====================

let paypalSDKLoading = false;



function initPayPalSDK() {

  if (donateState.paypalLoaded || paypalSDKLoading) return;

  const clientId = window.PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID';

  if (clientId === 'YOUR_PAYPAL_CLIENT_ID') {

    // Show setup instructions instead of loading

    return;

  }

  paypalSDKLoading = true;

  const script = document.createElement('script');

  // Enable PayPal, card, Venmo, Google Pay

  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&enable-funding=venmo,googlepay&components=buttons`;

  script.onload = () => { donateState.paypalLoaded = true; paypalSDKLoading = false; };

  script.onerror = () => { paypalSDKLoading = false; };

  document.head.appendChild(script);

}



function renderPayPalButtons() {

  const container = document.getElementById('paypal-button-container');

  const loading   = document.getElementById('paypal-loading');

  const errBox    = document.getElementById('paypal-error');

  if (!container) return;



  const clientId = window.PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID';



  // Not configured yet — show friendly setup message

  if (clientId === 'YOUR_PAYPAL_CLIENT_ID') {

    if (loading) loading.style.display = 'none';

    container.innerHTML = `

      <div style="background:var(--sand-2);border:2px dashed var(--gold);border-radius:0;padding:1.5rem;text-align:center;">

        

        <p style="font-weight:600;color:var(--forest);margin-bottom:.4rem;">PayPal Not Yet Connected</p>

        <p style="font-size:.83rem;color:var(--muted);line-height:1.7;">To activate payments, replace <code style="background:#eee;padding:.15rem .4rem;border-radius:0;">YOUR_PAYPAL_CLIENT_ID</code> at the top of the donate page with your real PayPal Client ID.<br><br>

        Get your Client ID at <a href="https://developer.paypal.com/dashboard/applications" target="_blank" style="color:var(--gold);font-weight:600;">developer.paypal.com</a></p>

      </div>`;

    return;

  }



  // Wait for SDK to load, then render

  const tryRender = () => {

    if (!window.paypal) {

      if (errBox) errBox.style.display = 'block';

      if (loading) loading.style.display = 'none';

      return;

    }

    if (loading) loading.style.display = 'none';

    if (donateState.paypalRendered) return;

    donateState.paypalRendered = true;



    const amt = (donateState.customAmount || donateState.amount);

    const amtStr = amt.toFixed(2);



    const buttonConfig = {

      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'donate' },

      createOrder: (data, actions) => actions.order.create({

        purchase_units: [{

          amount: { value: amtStr },

          description: `Neev Kolte Foundation donation — ${donateState.type}`

        }]

      }),

      onApprove: (data, actions) => actions.order.capture().then(() => {

        showDonateStep(4);

        showNotif('Donation received. Thank you.');

      }),

      onError: (err) => {

        console.error('PayPal error', err);

        showNotif('Payment error — please try again or contact us.');

      }

    };



    // For monthly, use subscription flow

    if (donateState.type === 'monthly' && window.paypal.Buttons) {

      // Monthly: direct to PayPal subscription — you'll need a Plan ID from PayPal

      // For now falls back to one-time capture with a note

      buttonConfig.style.label = 'donate';

    }



    window.paypal.Buttons(buttonConfig).render('#paypal-button-container');

  };



  if (window.paypal) { tryRender(); }

  else {

    initPayPalSDK();

    let attempts = 0;

    const poll = setInterval(() => {

      attempts++;

      if (window.paypal) { clearInterval(poll);

      tryRender(); }

      if (attempts > 30) clearInterval(poll);

    }, 500);

  }

}



// ==================== PHOTO GALLERY ====================

const GALLERY_EVENTS = [

  {

    id: 'feb2025-pmwc',

    title: 'PMWC Speaker Panel',

    date: 'February 5, 2025',

    cat: 'Research & Science',

    desc: 'Misha Kolte spoke at the Precision Medicine World Conference in Silicon Valley, sharing the Foundation\'s advocacy work and the family\'s journey with DIPG alongside leading researchers and clinicians.',

    photos: [

      'Feb 5 PMWC Speaker Panel-1.jpg',

      'Feb 5 PMWC Speaker Panel-2.jpg',

      'Feb 5 PMWC Speaker Panel-3.jpg',

      'Misha and Shilpa booth.jpg',

      'PXL_20250205_223337500.jpg',

      'PXL_20250205_235937584.MP.jpg'

    ]

  },

  {

    id: 'feb2025-alliance-action-days',

    title: 'Alliance for Childhood Cancer Action Days',

    date: 'February 28, 2025',

    cat: 'Federal Advocacy',

    desc: 'Misha joined advocates from across the country in Washington D.C. to call on Congress for more pediatric cancer research funding, meeting with senators and representatives including Adam Schiff and Alex Padilla.',

    photos: [

      'Alliance for Childhood Cancer Action Days CA group Feb 28-1.jpg',

      'Feb 28 Fedear Advocacy with Prach, Scott and Bonnie 2025.jpg',

      'Misha Feb 28 2025- Sarva bonnie and Misha.jpg',

      'Misha Feb 28 2025.jpg',

      'Misha and Dr. Link Feb 28 2025.jpg',

      'Misha and Megan Adam Schiff Feb 28 2025.jpg',

      'Misha and PRachi Feb 26 2025.jpg',

      'Misha-Alex Padilla Feb 28 2025.jpg',

      'image.jpg'

    ]

  },

  {

    id: 'feb2025-rare-disease-advocacy',

    title: 'Rare Disease Advocacy Day',

    date: 'February 26, 2025',

    cat: 'Federal Advocacy',

    desc: 'NKF participated in the EveryLife Foundation advocacy day on Capitol Hill, meeting with senators Eric Swalwell, Adam Schiff, and others to advance rare disease and childhood cancer legislation.',

    photos: [

      'EVERYLIFE_FOUNDATION_FOR_RARE_DISEASES_Group_Shot 2025.jpg',

      'Everylife whole group 2025.jpg',

      'Group with Adam Schiff.jpg',

      'Group with Carly -Eric Swalwell.jpg',

      'Jennifer and Nisha capitol steps.jpg',

      'Leteafa Simon.jpg',

      'Misha and Kendly.jpg',

      'with Eric Swalwell.jpg'

    ]

  },

  {

    id: 'mar2025-grief-retreat',

    title: 'Grief Retreat',

    date: 'March 2025',

    cat: 'Family Support',

    desc: 'Families who have lost children to DIPG and other childhood cancers came together for a healing weekend retreat, finding connection, community, and hope — supported in part by the Neev Kolte Foundation.',

    photos: [

      'PXL_20250308_025900632.PORTRAIT.jpg',

      'PXL_20250308_142910060.jpg',

      'PXL_20250309_030046276.MP.jpg',

      'full_007-im-1160f7ff-2640-4c7f-9140-ea6aefd931c9.jpg',

      'full_007-im-3534f1cf-9b43-4a9a-8273-90624d06dcbf.jpg',

      'full_007-im-d84fd762-8851-4670-aa5f-9cd4f52b46c1.jpg'

    ]

  },

  {

    id: 'apr2025-ab703-testimony',

    title: 'AB703 Testimony — Rayaan',

    date: 'April 7, 2025',

    cat: 'State Advocacy',

    desc: 'Rayaan Kolte delivered powerful testimony before the California State Assembly in support of AB703, advocating for greater awareness and funding for childhood cancer research in California.',

    photos: [

      'PXL_20250407_202306801.jpg',

      'PXL_20250407_202308369.jpg',

      'PXL_20250407_221402905.PORTRAIT.jpg',

      'PXL_20250407_221408053.PORTRAIT.ORIGINAL.jpg',

      'PXL_20250412_022417789.jpg'

    ]

  },

  {

    id: 'apr2025-acs-can-advocacy',

    title: 'ACS-CAN Advocacy',

    date: 'April 2025',

    cat: 'Advocacy',

    desc: 'NKF joined the American Cancer Society Cancer Action Network in Sacramento, advocating for stronger state-level cancer research policies and greater support for childhood cancer families.',

    photos: [

      'PXL_20250409_183033210.jpg',

      'PXL_20250409_205549135.jpg',

      'PXL_20250409_220840936.jpg'

    ]

  },

  {

    id: 'may2025-neev-kindness-award',

    title: 'Inaugural Neev Kindness Award',

    date: 'May 2025',

    cat: 'Community',

    desc: 'Fairlands Elementary School honored Neev Kolte\'s legacy with the first-ever Neev Kindness Award, recognizing a student who embodies the same compassion and community spirit that defined Neev\'s life.',

    photos: [

      'Inugral Neev award Fairlands 3.jpg',

      'Inugral Neev award Fairlands-1.jpg',

      'Inugral Neev award Fairlands-2.jpg'

    ]

  },

  {

    id: 'may2025-pedsno',

    title: 'Pediatric Society of Neuro-Oncology',

    date: 'May 2025',

    cat: 'Research & Science',

    desc: 'Misha connected with leading neuro-oncology researchers and our 2025 NKF grantee Sarah at the PEDSNO annual meeting — a gathering of the world\'s top pediatric brain tumor scientists.',

    photos: [

      'Pedsno May with Sarah and Amanda.jpg',

      'With Sarah our grantee of 2025.jpg'

    ]

  },

  {

    id: 'jun2025-cac2-annual-meeting',

    title: 'CAC2 Annual Meeting',

    date: 'June 2025',

    cat: 'Advocacy',

    desc: 'NKF attended the Consortium Against Childhood Cancer (CAC2) annual meeting, strengthening alliances with peer organizations and shaping the national agenda for pediatric cancer advocacy.',

    photos: [

      'PXL_20250617_151508580.jpg',

      'PXL_20250617_151611544.PORTRAIT.ORIGINAL.jpg',

      'PXL_20250617_182436225.jpg',

      'PXL_20250617_191814714.jpg',

      'PXL_20250714_181517865.jpg',

      'share_image_1750257431873.png',

      'share_image_1750257499189.png',

      'share_image_1750257514649.png',

      'share_image_1750257557935.png',

      'share_image_1750263278869.png'

    ]

  },

  {

    id: 'jun2025-childrens-hospital-advocacy',

    title: "Children's Hospital Association Advocacy",

    date: 'June 2025',

    cat: 'Federal Advocacy',

    desc: "NKF partnered with the Children's Hospital Association for advocacy meetings on Capitol Hill, championing increased federal funding for pediatric cancer research and improved care access.",

    photos: [

      '6204509063183361427.jpg',

      'PXL_20250612_120655138.jpg',

      'PXL_20250613_150404786.MP.jpg'

    ]

  },

  {

    id: 'jul2025-lemonade-stand',

    title: 'Lemonade Stand Fundraiser',

    date: 'July 2025',

    cat: 'Community',

    desc: 'A community lemonade stand raised funds for the Foundation, proving that small acts of kindness can add up to meaningful change in the fight against childhood cancer.',

    photos: [

      'PXL_20250719_030810566.jpg',

      'PXL_20250719_030813417.MP.jpg',

      'PXL_20250719_030841520.jpg',

      'PXL_20250719_030849266.jpg',

      'PXL_20250719_030850182.jpg',

      'PXL_20250719_030858685.jpg'

    ]

  },

  {

    id: 'aug2025-cancer-resolution-senate',

    title: 'Childhood Cancer Resolution at the Senate',

    date: 'August 25, 2025',

    cat: 'State Advocacy',

    desc: 'NKF celebrated the California Senate passage of SR53, a resolution recognizing Childhood Cancer Awareness Month — a milestone moment for the Bay Area childhood cancer community.',

    photos: [

      '20250825_142908.jpg',

      '20250825_144036(1).jpg',

      'Cortese_SR53 08-25-25 LH 2 (2).jpg',

      'PXL_20250825_215147635.jpg',

      'PXL_20250825_215148701.jpg'

    ]

  },

  {

    id: 'aug2025-onc201-launch',

    title: 'ONC201-Modeyso Launch',

    date: 'August 2025',

    cat: 'Research & Science',

    desc: 'Misha attended the historic launch of ONC201 (Modeyso), a breakthrough treatment for H3K27M-mutant gliomas including DIPG — a landmark moment the Foundation has long been fighting for.',

    photos: [

      '8 Misha ONC.jpg',

      'image.png',

      'onc201 panel.jpg'

    ]

  },

  {

    id: 'sep2025-family-day-ucsf',

    title: 'Family Day at UCSF',

    date: 'September 6, 2025',

    cat: 'Family Support',

    desc: 'NKF joined families fighting childhood cancer at UCSF for a day of connection, celebration, and mutual support — honoring the strength and resilience of every family in the community.',

    photos: [

      'PXL_20250906_162303501.jpg',

      'PXL_20250906_170246500.jpg',

      'PXL_20250906_171241854.jpg',

      'PXL_20250906_180258175.jpg',

      'PXL_20250906_180512541.jpg',

      'PXL_20250906_205323686 (1).jpg',

      'PXL_20250906_205323686.jpg'

    ]

  },

  {

    id: 'sep2025-round-table',

    title: 'Childhood Cancer Round Table Convening',

    date: 'September 16, 2025',

    cat: 'Federal Advocacy',

    desc: 'Misha joined national childhood cancer leaders at a congressional round table convening, bringing the voices of DIPG families directly to policymakers to accelerate research and improve outcomes.',

    photos: [

      'PXL_20250916_194533667.jpg'

    ]

  },

  {

    id: 'sep2025-aacr-rally',

    title: 'AACR Rally for Medical Research',

    date: 'September 17–18, 2025',

    cat: 'Federal Advocacy',

    desc: 'NKF joined hundreds of advocates at the AACR Rally for Medical Research in Washington D.C., making a unified case for sustained federal investment in cancer science and pediatric oncology.',

    photos: [

      'PXL_20250917_222026594.jpg',

      'PXL_20250918_165303676.jpg',

      'PXL_20250918_165433157.jpg',

      'PXL_20250918_185322638.jpg'

    ]

  },

  {

    id: 'sep2025-pbs-interview',

    title: 'PBS Interview',

    date: 'September 19, 2025',

    cat: 'Awareness',

    desc: 'Misha was featured in a PBS interview during Childhood Cancer Awareness Month, sharing Neev\'s story and the Foundation\'s mission to bring the pediatric cancer crisis into the national spotlight.',

    photos: [

      'PXL_20250919_185127480.jpg',

      'PXL_20250919_185132762.jpg',

      'PXL_20250919_185134355.jpg',

      'PXL_20250919_185135563.jpg',

      'PXL_20250919_190912546.jpg'

    ]

  },

  {

    id: 'sep2025-rayaan-climb-hill',

    title: 'Rayaan Climbs the Hill',

    date: 'September 2025',

    cat: 'Advocacy',

    desc: 'Rayaan Kolte walked the halls of Congress to meet with legislators face-to-face, sharing his brother Neev\'s story and advocating for every child still fighting DIPG and childhood brain cancer.',

    photos: [

      'PXL_20250919_124506176.PORTRAIT.jpg',

      'PXL_20250919_130606143.MP.jpg',

      'PXL_20250919_130608317.jpg',

      'PXL_20250919_132056229.jpg',

      'PXL_20250919_132057886.jpg',

      'PXL_20250919_132119466.jpg',

      'PXL_20250919_170223382.jpg',

      'PXL_20250918_165303676.jpg',

      'PXL_20250918_165433157.jpg',

      'PXL_20250918_185322638.jpg',

      'PXL_20250917_222026594.jpg'

    ]

  },

  {

    id: 'sep2025-curefest',

    title: 'Curefest 2025',

    date: 'September 19–21, 2025',

    cat: 'National Event',

    desc: 'NKF represented at CureFest — the nation\'s largest childhood cancer advocacy event on the National Mall in Washington D.C. — standing alongside thousands of families demanding more for our children.',

    photos: [

      'PXL_20250919_203533298.jpg',

      'PXL_20250919_205909051.jpg',

      'PXL_20250920_143831198.jpg',

      'PXL_20250920_145643872.jpg',

      'PXL_20250920_164634280.jpg',

      'PXL_20250920_164944765.jpg',

      'PXL_20250920_220732283.jpg',

      'PXL_20250920_220742768.jpg',

      'PXL_20250920_220800385.jpg',

      'PXL_20250920_220805959.jpg',

      'PXL_20250920_225200928.jpg',

      'PXL_20250921_141851739.jpg',

      'PXL_20250921_142011611.MP.jpg',

      'PXL_20250921_142031773.jpg',

      'PXL_20250921_142659852.jpg',

      'PXL_20250921_142713965.jpg',

      'PXL_20250921_142715197.jpg',

      'PXL_20250921_142803592.jpg',

      'PXL_20250921_152638033.jpg',

      'PXL_20250921_152708682.MP.jpg'

    ]

  },

  {

    id: 'sep2025-rayaan-speech-curefest',

    title: "Rayaan's Speech at Curefest",

    date: 'September 20, 2025',

    cat: 'National Event',

    desc: 'Rayaan Kolte delivered a moving speech on the National Mall at CureFest, honoring his brother Neev and calling on the nation to do more for every child fighting a brain cancer diagnosis.',

    photos: [

      'IMG_7010.jpeg',

      'IMG_7012.jpeg',

      'PXL_20250921_012215292.jpg',

      'PXL_20250921_012653636.jpg',

      'PXL_20250921_012657590.jpg',

      'PXL_20250921_012710628.jpg'

    ]

  },

  {

    id: 'sep2025-sacramento-event',

    title: 'Event in Sacramento',

    date: 'September 27, 2025',

    cat: 'State Advocacy',

    desc: 'NKF participated in Sacramento advocacy events during Childhood Cancer Awareness Month, continuing our push for state-level support for research funding and family assistance programs.',

    photos: [

      'PXL_20250927_211955303.jpg',

      'PXL_20250927_214238304.MP.jpg',

      'PXL_20250927_214242577.MP.jpg'

    ]

  }

];



// ---------- Gallery: Grid Cards ----------

function buildGallery() {

  const container = document.getElementById('gallery-events-container');

  if (!container || container.querySelector('.gallery-grid')) return;

  const grid = document.createElement('div');

  grid.className = 'gallery-grid';

  GALLERY_EVENTS.forEach((ev, ei) => {

    if (!ev.photos.length) return;

    const thumb = `gallery/${ev.id}/${encodeURIComponent(ev.photos[0])}`;

    const card = document.createElement('div');

    card.className = 'gallery-card';

    card.setAttribute('role', 'button');

    card.setAttribute('tabindex', '0');

    card.setAttribute('aria-label', ev.title);

    card.innerHTML = `

      <img class="gallery-card-thumb" src="${thumb}" alt="${ev.title}" loading="lazy">

      <div class="gallery-card-body">

        <span class="gallery-card-cat">${ev.cat}</span>

        <div class="gallery-card-title">${ev.title}</div>

        <span class="gallery-card-date">${ev.date}</span>

        <span class="gallery-card-more">… read more</span>

      </div>`;

    card.addEventListener('click', () => openGalleryModal(ei, 0));

    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGalleryModal(ei, 0); } });

    grid.appendChild(card);

  });

  container.appendChild(grid);

}



// ---------- Gallery: Modal Lightbox ----------

let modalEi = 0, modalIdx = 0;



function openGalleryModal(ei, startIdx) {

  modalEi = ei; modalIdx = startIdx || 0;

  const ev = GALLERY_EVENTS[ei];

  document.getElementById('modal-cat').textContent = ev.cat;

  document.getElementById('modal-title').textContent = ev.title;

  document.getElementById('modal-date').textContent = ev.date;

  document.getElementById('modal-desc').textContent = ev.desc || '';

  const dotsEl = document.getElementById('modal-dots');

  dotsEl.innerHTML = ev.photos.map((_, i) =>

    `<span class="gallery-modal-dot${i===0?' active':''}" onclick="modalGo(${i})"></span>`

  ).join('');

  modalApply();

  document.getElementById('gallery-modal').classList.add('open');

  document.body.style.overflow = 'hidden';

}



function closeGalleryModal() {

  document.getElementById('gallery-modal').classList.remove('open');

  document.body.style.overflow = '';

}



function modalOutsideClick(e) {

  if (e.target === document.getElementById('gallery-modal')) closeGalleryModal();

}



function modalMove(dir) {

  const n = GALLERY_EVENTS[modalEi].photos.length;

  modalIdx = (modalIdx + dir + n) % n;

  modalApply();

}



function modalGo(idx) { modalIdx = idx; modalApply(); }



function modalApply() {

  const ev = GALLERY_EVENTS[modalEi];

  const img = document.getElementById('modal-img');

  img.src = `gallery/${ev.id}/${encodeURIComponent(ev.photos[modalIdx])}`;

  img.alt = ev.title;

  document.getElementById('modal-counter').textContent = `${modalIdx + 1} / ${ev.photos.length}`;

  document.querySelectorAll('#modal-dots .gallery-modal-dot').forEach((d, i) => d.classList.toggle('active', i === modalIdx));

}



function modalFullscreen() {

  const wrap = document.getElementById('gallery-modal');

  if (document.fullscreenElement) document.exitFullscreen();

  else wrap.requestFullscreen().catch(() => {});

}



document.addEventListener('keydown', e => {

  const modal = document.getElementById('gallery-modal');

  if (!modal || !modal.classList.contains('open')) return;

  if (e.key === 'ArrowRight') modalMove(1);

  else if (e.key === 'ArrowLeft') modalMove(-1);

  else if (e.key === 'Escape') closeGalleryModal();

});



// Initialize patient intake form with Netlify Forms

document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById('patient-intake-form');

  if (form) {

    form.addEventListener('submit', function(event) {

      showNotif('Thank you! Your patient intake form has been received. Our team will contact you within 2 business days.');

      console.log('Patient Intake Form submitted to info@neevkoltefoundation.org');

      // Form will submit to Netlify naturally after this

    });

  }

});



