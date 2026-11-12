/**
 * Nexus Craft Studio - Production Scrollytelling Engine (v4.2)
 * Built with GSAP ScrollTrigger & Lenis Smooth Scroll
 * Dark-only. Accurate viewport scaling. 3D slip-to-landscape choreography.
 */

// 1. SMOOTH SCROLL (LENIS) INITIALIZATION
let lenis = null;
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const bar = document.getElementById('scrollProgressLine');
      if (bar) {
        bar.style.width = `${Math.min(100, Math.max(0, e.progress * 100))}%`;
      }
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }
}

// 2. GENERATE & INJECT HIGH-DPI RAZOR-SHARP MOCKUP PNGs
function setupMockupImages() {
  if (typeof MockupGenerator !== 'undefined') {
    try {
      const desktopPng      = MockupGenerator.createDesktopPNG();
      const mobPortraitPng  = MockupGenerator.createMobilePortraitPNG();
      const mobLandscapePng = MockupGenerator.createMobileLandscapePNG();

      const heroSampleImg        = document.getElementById('heroSampleImg');
      const interactiveDesktopImg= document.getElementById('interactiveDesktopImg');
      const mobilePortraitImg    = document.getElementById('mobilePortraitImg');
      const mobileLandscapeImg   = document.getElementById('mobileLandscapeImg');

      if (heroSampleImg)         heroSampleImg.src         = desktopPng;
      if (interactiveDesktopImg) interactiveDesktopImg.src = desktopPng;
      if (mobilePortraitImg)     mobilePortraitImg.src     = mobPortraitPng;
      if (mobileLandscapeImg)    mobileLandscapeImg.src    = mobLandscapePng;
    } catch (err) {
      console.warn('Canvas generator fallback to static assets:', err);
    }
  }
}

// 3. MASTER SCROLLYTELLING ANIMATION ENGINE
function initScrollytelling() {
  gsap.registerPlugin(ScrollTrigger);

  // ── A. CINEMATIC HERO ENTRANCE ──────────────────────────────────
  const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  entranceTl
    .from('#mainHeader', { y: -40, opacity: 0, duration: 0.8 })
    .from('#heroBadge',  { scale: 0.85, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('#heroTitle span', { y: 60, opacity: 0, stagger: 0.18, duration: 1.1 }, '-=0.3')
    .from('#heroSubtitle',   { y: 28, opacity: 0, duration: 0.9 }, '-=0.65')
    .from('#heroMouseIndicator', { scale: 0.5, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('#initialMockupPreview', {
      y: 100, opacity: 0, scale: 0.9, duration: 1.4, ease: 'power2.out'
    }, '-=0.55');


  // ── B. MASTER PINNED SCROLL TIMELINE ────────────────────────────
  const desktopContainer     = document.getElementById('desktopShowcaseContainer');
  const desktopBrowserFrame  = document.getElementById('desktopBrowserFrame');
  const desktopBrowserHeader = document.getElementById('desktopBrowserHeader');
  const desktopImageContainer= document.getElementById('desktopImageContainer');
  const interactiveDesktopImg= document.getElementById('interactiveDesktopImg');

  const mobileContainer    = document.getElementById('mobileShowcaseContainer');
  const mobileViewportCard = document.getElementById('mobileViewportCard');
  const mobilePortraitImg  = document.getElementById('mobilePortraitImg');
  const mobileLandscapeContainer = document.getElementById('mobileLandscapeContainer');
  const mobileLandscapeImg = document.getElementById('mobileLandscapeImg');
  const mobileArrow        = document.getElementById('mobileOrientationArrow');
  const mobileLabel        = document.getElementById('mobileOrientationLabel');

  const scrubTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#masterScrollStage',
      start: 'top top',
      end: '+=5000',
      pin: '#pinStageViewport',
      scrub: 0.4,
      anticipatePin: 1,
    }
  });

  // ── STEP 1: Desktop appears — reveal from below (0.00 → 0.12) ────
  scrubTl.fromTo(desktopContainer,
    { opacity: 0, y: 80, scale: 0.9, rotateX: 10 },
    { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.12, ease: 'power2.out' },
    0
  );

  // ── STEP 2: Expand to TRUE FULLSCREEN (0.12 → 0.40) ─────────────
  // A. Hide the site's fixed navbar so the showcase has 100% of the viewport
  scrubTl.to('#mainHeader', {
    y: -90,
    opacity: 0,
    duration: 0.15,
    ease: 'power2.inOut'
  }, 0.12);

  // B. Expand container to edge-to-edge 100vw x 100vh with NO overflow
  scrubTl.to(desktopContainer, {
    maxWidth: '100vw',
    width: '100vw',
    height: '100vh',
    x: 0,
    y: 0,
    scale: 1,
    paddingLeft: 0,
    paddingRight: 0,
    duration: 0.28,
    ease: 'power2.inOut'
  }, 0.12);

  // C. Browser frame fills container, corners flatten, header hides
  scrubTl.to(desktopBrowserFrame, {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    borderWidth: 0,
    duration: 0.28,
    ease: 'power2.inOut'
  }, 0.12);

  scrubTl.to(desktopBrowserHeader, {
    height: 0,
    opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    duration: 0.14,
    ease: 'power2.inOut'
  }, 0.12);

  scrubTl.to(desktopImageContainer, {
    height: '100vh',
    aspectRatio: 'auto',
    duration: 0.28,
    ease: 'power2.inOut'
  }, 0.12);

  // D. Image uses object-fit: contain so 100% of the website is visible without ever exceeding
  scrubTl.to(interactiveDesktopImg, {
    objectFit: 'contain',
    duration: 0.20,
    ease: 'power2.inOut'
  }, 0.14);

  // ── Hold fullscreen pause to view all platform details (0.40 → 0.46) ──
  scrubTl.to({}, { duration: 0.06 });

  // ── STEP 3: Contract back to normal size before increasing (0.46 → 0.64) ──
  // A. Restore site header
  scrubTl.to('#mainHeader', {
    y: 0,
    opacity: 1,
    duration: 0.15,
    ease: 'power2.out'
  }, 0.46);

  // B. Contract container back to max-w-5xl
  scrubTl.to(desktopContainer, {
    maxWidth: '64rem',
    width: '100%',
    height: 'auto',
    paddingLeft: 16,
    paddingRight: 16,
    duration: 0.18,
    ease: 'power2.inOut'
  }, 0.46);

  // C. Restore browser chrome and frame
  scrubTl.to(desktopBrowserFrame, {
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    borderWidth: 1,
    boxShadow: '0 30px 80px -15px rgba(0,0,0,0.8), 0 0 60px -10px rgba(99,102,241,0.3)',
    duration: 0.18,
    ease: 'power2.inOut'
  }, 0.46);

  scrubTl.to(desktopBrowserHeader, {
    height: 42,
    opacity: 1,
    overflow: 'visible',
    duration: 0.14,
    ease: 'power2.out'
  }, 0.48);

  scrubTl.to(desktopImageContainer, {
    height: 'auto',
    aspectRatio: '16/9',
    duration: 0.18,
    ease: 'power2.inOut'
  }, 0.46);

  scrubTl.to(interactiveDesktopImg, {
    objectFit: 'cover',
    duration: 0.18,
    ease: 'power2.inOut'
  }, 0.46);

  // ── STEP 4: Desktop exits, mobile enters portrait ↑ (0.64 → 0.72) ──
  scrubTl.to(desktopContainer, {
    opacity: 0, scale: 0.88, y: -40, duration: 0.08, ease: 'power2.in'
  }, 0.64);

  scrubTl.to(mobileContainer, {
    opacity: 1, pointerEvents: 'auto', duration: 0.06
  }, 0.66);

  // Phone appears in portrait orientation (fixed physical 240 x 480 chassis)
  scrubTl.fromTo(mobileViewportCard,
    {
      y: 80, scale: 0.9, opacity: 0,
      rotateX: 0, rotateY: 0, rotateZ: 0
    },
    {
      y: 0, scale: 1, opacity: 1,
      rotateX: 0, rotateY: 0, rotateZ: 0,
      duration: 0.06, ease: 'power2.out'
    },
    0.66
  );

  // Ensure portrait screen is visible and landscape screen is ready
  scrubTl.set(mobilePortraitImg, { opacity: 1 }, 0.66);
  scrubTl.set(mobileLandscapeContainer, { opacity: 0 }, 0.66);

  // ── STEP 5: THE 3D SLIP — EXACT SAME MOBILE ROTATES FROM ↑ TO → (0.72 → 0.88) ──
  //    "portrait to landscape transition could be improved it should look like as if the same mobile is on portrait and landscape"
  //    "from portrait mode it should go from top to right side from the screen it should look like its front is going down like when a person slips and his face is going towards the ground"
  //
  //    The physical smartphone hardware (240x480 body, metallic buttons, dynamic island notch)
  //    never deforms or resizes — it is the EXACT SAME physical phone!
  //    Top of phone swings clockwise to the right side (rotateZ: 0 -> 90deg).
  //    Front face pitches down towards the ground in 3D (rotateX up to 55deg).
  //    Screen crossfades cleanly into the counter-rotated landscape layout.

  // Phase 1 (0.72 -> 0.80): Slip begins — pitching forward face-down and top swinging to right
  scrubTl.to(mobileViewportCard, {
    rotateZ: 48,       // Top swinging toward right side
    rotateX: 55,       // Front face pitches down toward ground!
    rotateY: -15,      // 3D slip yaw angle
    y: 26,             // Sinking under slip gravity
    scale: 0.94,
    duration: 0.08,
    ease: 'power1.in',
    onUpdate: function() {
      const p = this.progress(); // 0 to 1
      if (mobileArrow) mobileArrow.style.transform = `rotate(${p * 45}deg)`;
      if (mobilePortraitImg) mobilePortraitImg.style.opacity = String(Math.max(0, 1 - p * 1.6));
      if (mobileLandscapeContainer) mobileLandscapeContainer.style.opacity = String(Math.min(1, p * 1.6));
      if (mobileLabel) mobileLabel.textContent = 'Portrait';
    }
  }, 0.72);

  // Phase 2 (0.80 -> 0.88): Lands in landscape — top settles to the right side (3 o'clock, 90 deg)!
  // Front face levels back flat facing the viewer.
  // The phone is the EXACT SAME 240x480 device, now lying horizontally!
  // Its Dynamic Island notch and buttons have physically rotated with the phone!
  scrubTl.to(mobileViewportCard, {
    rotateZ: 90,       // Top is now on the right side (3 o'clock)!
    rotateX: 0,        // Front face levels back flat
    rotateY: 0,
    y: 0,
    scale: 1,
    duration: 0.08,
    ease: 'power2.out',
    onUpdate: function() {
      const p = this.progress(); // 0 to 1
      if (mobileArrow) mobileArrow.style.transform = `rotate(${45 + p * 45}deg)`;
      if (mobilePortraitImg) mobilePortraitImg.style.opacity = String(Math.max(0, 0.2 - p * 0.2));
      if (mobileLandscapeContainer) mobileLandscapeContainer.style.opacity = String(Math.min(1, 0.5 + p * 0.5));
      if (p > 0.3 && mobileLabel) mobileLabel.textContent = 'Landscape';
    }
  }, 0.80);

  // Hold landscape pause to inspect (0.88 -> 0.92)
  scrubTl.to({}, { duration: 0.04 });

  // ── STEP 6: Mobile exits, Contact Form reveals (0.92 -> 1.00) ──
  scrubTl.to(mobileContainer, {
    opacity: 0, y: -40, scale: 0.9, duration: 0.08, ease: 'power2.in'
  }, 0.92);


  // ── C. CONTACT SECTION ENTRANCE ─────────────────────────────────
  gsap.from('#contactSection', {
    scrollTrigger: {
      trigger: '#contactSection',
      start: 'top 80%',
      end: 'top 30%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0, y: 70, duration: 1, ease: 'power3.out'
  });

  gsap.from('#clientContactForm > div', {
    scrollTrigger: {
      trigger: '#clientContactForm',
      start: 'top 85%'
    },
    opacity: 0, y: 25, stagger: 0.1, duration: 0.8, ease: 'power2.out'
  });
}

// 4. NAVIGATION SMOOTH SCROLL HANDLER
function scrollToTarget(targetId) {
  const stageEl = document.getElementById('masterScrollStage');

  if (targetId === 'heroSection') {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (targetId === 'contactSection') {
    const contactEl = document.getElementById('contactSection');
    if (contactEl) {
      if (lenis) lenis.scrollTo(contactEl);
      else contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  if (stageEl) {
    const stageTop = stageEl.offsetTop;
    const stageDist = 5000;
    let targetY = stageTop;

    if (targetId === 'desktopReveal')          targetY = stageTop + stageDist * 0.10;
    else if (targetId === 'mobileStage')       targetY = stageTop + stageDist * 0.72;
    else if (targetId === 'masterScrollStage') targetY = stageTop + 100;

    if (lenis) lenis.scrollTo(targetY);
    else window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}

function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 5. INTERACTIVE SERVICE SELECTOR
function selectService(btn) {
  const allBtns = document.querySelectorAll('.service-pill');
  allBtns.forEach(b => {
    b.className = 'service-pill px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-medium text-slate-300 hover:border-sky-500/50 hover:text-white transition-all text-left flex items-center justify-between';
    const check = b.querySelector('i');
    if (check) check.classList.add('hidden');
  });

  btn.className = 'service-pill px-3.5 py-2.5 rounded-xl border border-sky-500 bg-sky-500/10 text-xs font-medium text-white transition-all text-left flex items-center justify-between';
  const check = btn.querySelector('i');
  if (check) check.classList.remove('hidden');
}

// 6. CONTACT FORM SUBMIT
function handleContactSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('formSubmitBtn');
  const btnText   = document.getElementById('submitBtnText');
  const btnIcon   = document.getElementById('submitBtnIcon');
  const alertBox  = document.getElementById('formSuccessAlert');

  submitBtn.disabled = true;
  btnText.textContent = 'Transmitting Inquiry...';
  btnIcon.setAttribute('data-lucide', 'loader-2');
  btnIcon.classList.add('animate-spin');
  lucide.createIcons();

  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.textContent = 'Inquiry Sent!';
    btnIcon.setAttribute('data-lucide', 'check');
    btnIcon.classList.remove('animate-spin');
    lucide.createIcons();

    if (alertBox) {
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    setTimeout(() => {
      e.target.reset();
      btnText.textContent = 'Send Project Inquiry';
      btnIcon.setAttribute('data-lucide', 'arrow-right');
      if (alertBox) alertBox.classList.add('hidden');
      lucide.createIcons();
    }, 4500);
  }, 1000);
}

// 7. INITIALIZE
window.addEventListener('DOMContentLoaded', () => {
  initLenis();

  if (document.fonts) {
    document.fonts.ready.then(() => {
      setupMockupImages();
      initScrollytelling();
    });
  } else {
    setupMockupImages();
    initScrollytelling();
  }

  lucide.createIcons();
});

window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
