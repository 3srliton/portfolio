document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Smooth scrolling for navigation links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Scroll animations ---------- */
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ---------- Navbar shadow change on scroll ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const setNavBg = () => {
      navbar.style.boxShadow = window.scrollY > 50
        ? '0 4px 14px rgba(74,12,23,0.12)'
        : 'none';
    };
    setNavBg();
    window.addEventListener('scroll', setNavBg, { passive: true });
  }

  /* ---------- Mobile menu toggle ---------- */
  const mobileMenu = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('.nav-links');
  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => navMenu.classList.toggle('active'));
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }
/* ---------- CONTACT FORM → Web3Forms ---------- */
const form = document.getElementById('contact-form');
if (form) {
  const submitBtn = form.querySelector('.btn-submit');
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 🕵️ Honeypot spam check
    if (form.botcheck && form.botcheck.checked) {
      form.reset();
      return;
    }

    // Required field validation
    if (!form.name?.value?.trim() || !form.email?.value?.trim() || !form.subject?.value?.trim() || !form.message?.value?.trim()) {
      alert('⚠️ Please fill in all required fields.');
      return;
    }

    // Disable button + show spinner
    let originalHTML = '';
    if (submitBtn) {
      submitBtn.disabled = true;
      originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }

    try {
      const formData = new FormData(form);

      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        alert('✅ Message sent successfully! I will get back to you soon.');
      } else {
        console.error(result);
        alert('❌ There was a problem sending your message. Please try again later.');
      }

    } catch (err) {
      console.error(err);
      alert('❌ There was a problem sending your message. Please try again later.');
    } finally {
      // Re-enable button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }
    }
  });
}



  /* ---------- Milestone gallery carousel ---------- */
  const galleryContainer = document.getElementById('galleryContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (galleryContainer && prevBtn && nextBtn) {
    let currentIndex = 0;
    let autoSlideTimer;

    const getVisibleCardsCount = () => {
      const width = window.innerWidth;
      if (width > 1200) return 5;
      if (width > 768) return 3;
      if (width > 480) return 2;
      return 1;
    };

    const updateSlide = () => {
      const totalCards = galleryContainer.children.length;
      const visibleCards = getVisibleCardsCount();
      const maxIndex = Math.max(totalCards - visibleCards, 0);

      if (currentIndex > maxIndex) currentIndex = 0;
      else if (currentIndex < 0) currentIndex = maxIndex;

      const firstCard = galleryContainer.children[0];
      if (!firstCard) return;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const offset = currentIndex * (cardWidth + 20);
      galleryContainer.style.transform = `translateX(-${offset}px)`;
    };

    const moveNext = () => { currentIndex++; updateSlide(); };
    const movePrev = () => { currentIndex--; updateSlide(); };

    const startTimer = () => { autoSlideTimer = setInterval(moveNext, 5000); };
    const resetTimer = () => { clearInterval(autoSlideTimer); startTimer(); };

    nextBtn.addEventListener('click', () => { moveNext(); resetTimer(); });
    prevBtn.addEventListener('click', () => { movePrev(); resetTimer(); });

    galleryContainer.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    galleryContainer.addEventListener('mouseleave', startTimer);

    window.addEventListener('resize', () => { currentIndex = 0; updateSlide(); });

    updateSlide();
    startTimer();
  }

  /* ---------- Milestone lightbox (zoom view) ---------- */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('milestoneLightbox');

  if (galleryCards.length && lightbox) {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxEmoji = document.getElementById('lightboxEmoji');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentLightboxIndex = 0;

    const openLightbox = (index) => {
      currentLightboxIndex = (index + galleryCards.length) % galleryCards.length;
      const card = galleryCards[currentLightboxIndex];
      const img = card.querySelector('.card-image img');
      const emoji = card.querySelector('.card-emoji');
      const title = card.querySelector('.card-info h3')?.textContent || '';
      const desc = card.querySelector('.card-info p')?.textContent || '';

      const hasRealImage = img && img.style.display !== 'none';
      lightboxImage.style.display = hasRealImage ? 'block' : 'none';
      lightboxEmoji.style.display = hasRealImage ? 'none' : 'flex';

      if (hasRealImage) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || title;
      }
      lightboxEmoji.textContent = emoji ? emoji.textContent : '';
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const showNext = () => openLightbox(currentLightboxIndex + 1);
    const showPrev = () => openLightbox(currentLightboxIndex - 1);

    galleryCards.forEach((card, i) => {
      const imageEl = card.querySelector('.card-image');
      if (imageEl) {
        imageEl.addEventListener('click', () => openLightbox(i));
      }
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxNext?.addEventListener('click', showNext);
    lightboxPrev?.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }

  /* ---------- Typing effect for hero text ---------- */
  const heroTitle = document.querySelector('.hero-text h1');
  const titleText = 'MD LITON ALI';
  if (heroTitle) {
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < titleText.length) {
        heroTitle.textContent += titleText.charAt(i++);
        setTimeout(typeWriter, 100);
      }
    };
    setTimeout(typeWriter, 1000);
  }
});
