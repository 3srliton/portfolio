// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 62, 80, 0.98)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    }
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// ---------- UPDATED CONTACT FORM SUBMISSION ----------
const form = document.querySelector('.contact-form form');
if (form) {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGpKL0GFU4ljZFN3Ga08Qlnb1uYP88sj-eT4J1UYfNvLfsRor27UxAjs_K1L-fuUiYlw/exec";

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Honeypot check (if exists)
        if (form.website && form.website.value.trim() !== "") {
            console.warn("Spam submission blocked.");
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtn = submitBtn ? submitBtn.innerHTML : 'Send';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending...";
        }

        try {
            const fd = new FormData(form);
            const params = new URLSearchParams(fd);

            const resp = await fetch(SCRIPT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Accept": "application/json"
                },
                body: params.toString()
            });

            if (!resp.ok) throw new Error("Network error");

            form.reset();
            alert("Thank you! Your message has been sent.");
        } catch (err) {
            console.error(err);
            alert("Sorry, something went wrong. Please try again later.");
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtn;
            }
        }
    });
}
// ---------- END CONTACT FORM SUBMISSION ----------

// Add typing effect to hero text
const heroTitle = document.querySelector('.hero-text h1');
const titleText = 'MD LITON ALI';
heroTitle.innerHTML = '';

let i = 0;
const typeWriter = () => {
    if (i < titleText.length) {
        heroTitle.innerHTML += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

setTimeout(typeWriter, 1000);
