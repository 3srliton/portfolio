document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links
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
  // Fade-in animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  // Navbar background change + shadow on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const setNavBg = () => {
      navbar.style.background = window.scrollY > 100
        ? 'rgba(183,28,28,0.98)'
        : 'rgba(183,28,28,0.95)';
      navbar.style.boxShadow = window.scrollY > 60
        ? '0 4px 18px rgba(183,28,28,0.13)'
        : 'none';
    };
    setNavBg();
    window.addEventListener('scroll', setNavBg, { passive: true });
  }
  // Mobile menu toggle
  const mobileMenu = document.querySelector('.mobile-menu');
  const navMenu = document.querySelector('.nav-links');
  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => navMenu.classList.toggle('active'));
  }
  // Contact form handler (same as before)
  const form = document.getElementById('contact-form');
  if (form) {
    const submitBtn = form.querySelector('.btn-submit');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.website && form.website.value.trim() !== '') {
        form.reset();
        return;
      }
      const data = {
        name: form.name?.value?.trim() || '',
        email: form.email?.value?.trim() || '',
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
        submitBtn.innerHTML = ' Sending...';
      }
      try {
        // Send to Google Apps Script or your backend here
        await new Promise(r => setTimeout(r, 1000));
        form.reset();
        alert('✅ Message sent successfully!');
      } catch (err) {
        alert('❌ There was a problem sending your message. Please try again later.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
        }
      }
    });
  }
  // Optional: Typing effect to hero text
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
