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
      navbar.style.background = window.scrollY > 50
        ? 'rgba(196, 30, 58, 1)'
        : 'rgba(196, 30, 58, 0.98)';
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
/* ---------- CONTACT FORM → Google Form ---------- */
const form = document.getElementById('contact-form');
if (form) {
  const submitBtn = form.querySelector('.btn-submit');

  // ✅ Google Form "formResponse" URL
  const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSfkT1NgvLnBqE4XNWd2yel5vrFKq-_nvVuEOxQSAV6gek_GIg/formResponse';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 🕵️ Honeypot spam check
    if (form.website && form.website.value.trim() !== '') {
      form.reset();
      return;
    }

    // Gather data from form fields
    const data = {
      'entry.46496394': form.name?.value?.trim() || '',          // Name
      'entry.762992029': form.email?.value?.trim() || '',        // Email
      'entry.1775075474': form.organization?.value?.trim() || '',// Organization
      'entry.2054331517': form.subject?.value?.trim() || '',     // Subject
      'entry.798017360': form.message?.value?.trim() || ''       // Message
    };

    // Required field validation
    if (!data['entry.46496394'] || !data['entry.762992029'] || !data['entry.2054331517'] || !data['entry.798017360']) {
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
      // Send data as FormData
      const formData = new FormData();
      for (const key in data) formData.append(key, data[key]);

      // Google Forms requires POST to "formResponse"
      await fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors', // avoids CORS issues
        body: formData
      });

      // Reset form and show success message
      form.reset();
      alert('✅ Message sent successfully! I will get back to you soon.');

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
