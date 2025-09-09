    mobileMenu.addEventListener('click', () => navMenu.classList.toggle('active'));
    // Close mobile menu when a navigation link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      });
    });
  }
  /* ---------- CONTACT FORM (Removed Google Sheets logic, now relies on HTML action) ---------- */
  // The previous JavaScript logic for form submission to Google Sheets is removed
  // because the form's `action` attribute will now handle the submission
  // to a third-party service like Formspree.
  // Client-side validation (required attributes) will still work.
  // The honeypot field name is changed to `_gotcha` for Formspree compatibility.
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
