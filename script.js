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

  /* ---------- Navbar background change on scroll ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const setNavBg = () => {
      navbar.style.background = window.scrollY > 100
        ? 'rgba(44, 62, 80, 0.98)'
        : 'rgba(44, 62, 80, 0.95)';
    };
    setNavBg(); // set initial
    window.addEventListener('scroll', setNavBg, { passive: true });
  }

  /* ---------- Mobile menu toggle ---------- */
  const mobileMenu = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('.nav-links');
  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => navMenu.classList.toggle('active'));
  }

  /* ---------- CONTACT FORM → Google Sheets ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const submitBtn = form.querySelector('.btn-submit');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxAYX9EO5mJ8hztT2YjeEGUvlkwKGh1eOkT4A0ZyjYB3Lc37HtEc7QFY_b3qYvMs3Jg/exec';

    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Honeypot
      if (form.website && form.website.value.trim() !== '') {
        form.reset();
        return;
      }

      const data = {
        name: form.name?.value?.trim() || '',
        email: form.email?.value?.trim() || '',
        organization: form.organization?.value?.trim() || '',
        subject: form.subject?.value?.trim() || '',
        message: form.message?.value?.trim() || '',
        website: form.website?.value || ''
      };

      if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all required fields.');
        return;
      }

      let originalHTML = '';
      if (submitBtn) {
        submitBtn.disabled = true;
        originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      try {
        const res = await fetch(scriptURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: new URLSearchParams(data)
        });

        // Expect JSON from your Apps Script
        const result = await res.json().catch(() => ({ ok: false }));
        if (result && result.ok) {
          form.reset();
          alert('✅ Message sent successfully!');
        } else {
          throw new Error(result?.error || 'Unknown error');
        }
      } catch (err) {
        console.error(err);
        alert('❌ There was a problem sending your message. Please try again later.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
        }
      }
    });
  }

  /* ---------- Typing effect to hero text ---------- */
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
