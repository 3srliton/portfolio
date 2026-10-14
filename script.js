/* MD LITON ALI — site script */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.remove('no-js');

  /* ---------- Search index (generated at build time) ---------- */
  const SEARCH_INDEX = [{"g": "Pages", "t": "Home", "s": "Overview and highlights", "u": "index.html", "i": "fas fa-house", "p": "Page"}, {"g": "Pages", "t": "About", "s": "Bio, journey, skills, education", "u": "about.html", "i": "fas fa-user", "p": "Page"}, {"g": "Pages", "t": "Research", "s": "Interests, project, publications", "u": "research.html", "i": "fas fa-flask", "p": "Page"}, {"g": "Pages", "t": "Experience", "s": "Roles, field projects, training", "u": "experience.html", "i": "fas fa-briefcase", "p": "Page"}, {"g": "Pages", "t": "Honors", "s": "Awards and photo gallery", "u": "honors.html", "i": "fas fa-award", "p": "Page"}, {"g": "Pages", "t": "Service", "s": "Leadership, memberships, volunteering", "u": "service.html", "i": "fas fa-hands-helping", "p": "Page"}, {"g": "Pages", "t": "CV", "s": "Full curriculum vitae", "u": "cv.html", "i": "fas fa-file-lines", "p": "Page"}, {"g": "Pages", "t": "Contact", "s": "Email, phone and message form", "u": "contact.html", "i": "fas fa-envelope", "p": "Page"}, {"g": "Publications", "t": "Exploring university students' perceptions and attitudes toward associated factors of electronic learning during the COVID-19 pandemic", "s": "Advances in Online Education · 2024", "u": "research.html#publications", "i": "fas fa-file-lines", "p": "Research", "k": "E-learning Higher Education COVID-19"}, {"g": "Publications", "t": "Knowledge and information sharing practices among multidisciplinary university dormitory residents: exploring the influence of gender, academic discipline, and degree level", "s": "Journal of Information and Knowledge Management (JIKM) · 2023", "u": "research.html#publications", "i": "fas fa-file-lines", "p": "Research", "k": "Knowledge Sharing Information Behavior"}, {"g": "Publications", "t": "Webometric analysis of alternative access to scholarly publication: special reference to LibGen and Sci-Hub", "s": "International Journal of Information and Knowledge Studies · 2023", "u": "research.html#publications", "i": "fas fa-file-lines", "p": "Research", "k": "Webometrics Scholarly Communication"}, {"g": "Publications", "t": "Perceptions and behaviors of academic library users towards ethical use of library resources and services: reference to university students", "s": "Under review · 2024", "u": "research.html#publications", "i": "fas fa-file-lines", "p": "Research", "k": "Information Ethics Academic Libraries"}, {"g": "Research", "t": "Zero-budget digital library framework", "s": "Ongoing project · Best Paper IIKM 2025", "u": "research.html#project", "i": "fas fa-lightbulb", "p": "Research"}, {"g": "Research", "t": "Science of Science", "s": "How research is produced, shared and accessed: scholarly communication, webometrics and alternative access to publications.", "u": "research.html", "i": "fas fa-flask", "p": "Research"}, {"g": "Research", "t": "AI in Education", "s": "How AI and e-learning reshape teaching, learning and the academic library.", "u": "research.html", "i": "fas fa-flask", "p": "Research"}, {"g": "Research", "t": "Misinformation", "s": "Health misinformation and how people evaluate the information they encounter.", "u": "research.html", "i": "fas fa-flask", "p": "Research"}, {"g": "Research", "t": "Health Informatics", "s": "Information access and systems in health contexts, from medical college libraries to patient information.", "u": "research.html", "i": "fas fa-flask", "p": "Research"}, {"g": "Research", "t": "Knowledge Management", "s": "Knowledge and information sharing practices in communities and institutions.", "u": "research.html", "i": "fas fa-flask", "p": "Research"}, {"g": "Experience", "t": "Graduate Associate, Teaching", "s": "INFO 557: Neural Networks · College of Information Science, University of Arizona · 2026 – Present", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Experience", "t": "Assistant Public Relation Officer", "s": "International Affairs and External Communication Office, Islamic University of Technology (IUT) · 2025 – 2026", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Experience", "t": "Assistant Cataloguer", "s": "Islamic University of Technology (IUT) · 2022 – 2026", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Experience", "t": "Research Assistant", "s": "Land Administration Training Center, Ministry of Land · 2022 – 2024", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Experience", "t": "Research Assistant", "s": "University of Dhaka · 2021 – 2022", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Field projects", "t": "Tairunnessa Memorial Medical College & Hospital Library", "s": "Project Coordinator · Jan 2024 – Aug 2024", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "International Mother Language Institute", "s": "Project Member · 2021 – 2022", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "University of Skill Enrichment and Technology Library", "s": "Project Executive · Jan 2020 – Mar 2020", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Bangladesh Police Staff College Library", "s": "Project Executive · Jan 2019 – Mar 2019", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Bangladesh National Parliament House Library", "s": "Project Executive · Apr 2018 – Jun 2018", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Institute of Business Administration (IBA) Library, DU", "s": "Project Executive · Jan 2018 – Mar 2018", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Government Madrasah-e-Alia Library", "s": "Project Executive · Sep 2017 – Sep 2018", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Bangladesh Supreme Court Bar Association Library", "s": "Project Executive · Jun 2017 – Sep 2017", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Quazi Nooruzzaman Memorial Library", "s": "Project Executive · Apr 2017 – Mar 2018", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Bangladesh Foreign Service Academy Library", "s": "Project Executive · Feb 2017 – Dec 2019", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Department of Zoology Seminar Library, DU", "s": "Project Executive · Feb 2017 – Mar 2017", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Dept. of Communication Disorders Seminar Library, DU", "s": "Project Executive · Jan 2017 – Mar 2022", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Training", "t": "Software Carpentry using Python", "s": "University of Arizona Library · 2026", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Strategic Science Communication", "s": "COMSTECH – OIC · 2026", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Library Automation and Digitization using SLiMS", "s": "BALID Institute of Information Management (BIIM) · 2025", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "E-Book Preparation and Management", "s": "Bangladesh National Scientific and Technical Documentation Center (BANSDOC) · 2025", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Modern Library Management", "s": "Bangladesh National Archives and Library · 2024", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Statistical Analysis with R Programming", "s": "DataScape · 2024", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Paper-based Research Learning", "s": "CHINTA Research Bangladesh · 2023", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "HTML5, CSS3 & Bootstrap 4 for Web Development", "s": "Shikho Technologies · 2021", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Web Designing using HTML, CSS & JavaScript", "s": "IIT, University of Dhaka · 2019 · Jan–Apr", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "KOHA Installation & Customization", "s": "Daffodil International University · 2019 · Mar 16–20", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Old Manuscript Reading and Translating", "s": "Dhaka University Library · 2017", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Computer Fundamentals & OS Basics", "s": "ISLM, University of Dhaka · 2016 · Jan–Mar", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Education", "t": "PhD in Information Science", "s": "College of Information Science, University of Arizona, USA · Fall 2026 – Present", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Education", "t": "Master of Arts in Information Science & Library Management", "s": "University of Dhaka · 2020 – 2021", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Education", "t": "Bachelor in Information Science & Library Management", "s": "University of Dhaka · 2015 – 2019", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Education", "t": "Higher Secondary Certificate (HSC)", "s": "Kaliganj Haat Degree College, Rajshahi · 2015", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Education", "t": "Secondary School Certificate (SSC)", "s": "Dr. Abu Bakar High School, Rajshahi · 2013", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Honors", "t": "Best Paper Award, International Conference on Information and Knowledge Management (IIKM 2025)", "s": "Research", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Mohammad Shahidullah Memorial Gold Medal (Masters)", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Provost Award of Academic Excellence", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Dean's Merit List of Honour (Masters)", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Dean's Merit List of Honour (Undergraduate)", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Book Grant from the University of Dhaka for outstanding results in Masters", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "University Grants Commission (UGC) Undergraduate Scholarship", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Mitsubishi UFJ Foundation Scholarship", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Merit Scholarship, University of Dhaka", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "ISLM Alumni Association Scholarship", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Dhaka University Alumni Association Scholarship", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "First Place, Internship at Dhaka University Library", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "First Place, Internship at BANSDOC", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Training Presentation Award, Bangladesh National Archives and Library", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "First Position, Computer Fundamentals & OS Basics Training, University of Dhaka", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Blood Donor Recognition from Badhan (donated blood more than 12 times)", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Memberships", "t": "Association for Information Science and Technology", "s": "ASIS&T", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Association for Library and Information Science Education", "s": "ALISE", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Association for Computing Machinery", "s": "ACM", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Association for Asian Studies", "s": "AAS", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Bangladesh Association of Librarians, Information Scientists and Documentalists", "s": "BALID", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Library Association of Bangladesh", "s": "LAB", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Bibliotheca Alexandrina Information for Africa", "s": "BAIFA", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Service", "t": "Chair-Elect", "s": "SIG-AVC, Association for Information Science and Technology (ASIS&T)", "u": "service.html", "i": "fas fa-user-tie", "p": "Service"}, {"g": "Service", "t": "Reviewer", "s": "Global Knowledge, Memory and Communication · Emerald Publishing", "u": "service.html", "i": "fas fa-user-tie", "p": "Service"}, {"g": "Service", "t": "Communication Officer", "s": "SIG-VIS, Association for Information Science and Technology (ASIS&T)", "u": "service.html", "i": "fas fa-user-tie", "p": "Service"}, {"g": "Service", "t": "Organizing Volunteer", "s": "International Symposium on Empowering LIS Professionals for Achieving SDGs", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Rapporteur", "s": "International Conference on the Role of LIS Professionals in the 4IR, Library Association of Bangladesh", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Event Organizing Volunteer", "s": "Librarians Times Bangladesh", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Event Organizer", "s": "Directorate of Public Libraries and Biswashahitya Kendro", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "President", "s": "Information 71 (Dhaka University-based students' association)", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Executive Member", "s": "University Students Association of Tanore", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Tourism Affairs Secretary", "s": "Rajshahi Students Association of Dhaka University", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Education Secretary", "s": "Ratoil Social Welfare Organization, Tanore, Rajshahi", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Volunteer", "s": "Badhan — a blood donor organization", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Campaign Volunteer", "s": "Sondhani — a blood donor organization", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Amanuensis", "s": "Anirban — an organization supporting blind students", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Social Work Volunteer", "s": "Dhaka University Alumni Association (DUAA)", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Skills", "t": "Library Systems", "s": "Koha, DSpace, SLiMS, Greenstone, DocuDex, RFID, Cataloging, Classification, Dublin Core, MARC / RDA, Automation, Digitization", "u": "about.html#skills", "i": "fas fa-screwdriver-wrench", "p": "About", "k": "Koha DSpace SLiMS Greenstone DocuDex RFID Cataloging Classification Dublin Core MARC / RDA Automation Digitization"}, {"g": "Skills", "t": "Technical", "s": "HTML, CSS, JavaScript, R Programming, Database Management, Web Design, Networking, Documentation, Web Archiving, Web Scraping", "u": "about.html#skills", "i": "fas fa-screwdriver-wrench", "p": "About", "k": "HTML CSS JavaScript R Programming Database Management Web Design Networking Documentation Web Archiving Web Scraping"}, {"g": "Skills", "t": "Research & Analysis", "s": "Literature Review, Data Analysis, Academic Writing, Citation Management, SPSS, VOSviewer, NVivo, Quantitative Methods, Qualitative Methods", "u": "about.html#skills", "i": "fas fa-screwdriver-wrench", "p": "About", "k": "Literature Review Data Analysis Academic Writing Citation Management SPSS VOSviewer NVivo Quantitative Methods Qualitative Methods"}];

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  };

  /* ---------- Theme ---------- */
  const themeBtn = $('#themeToggle');
  const setTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) { /* storage unavailable */ }
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };
  if (themeBtn) {
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    themeBtn.addEventListener('click', () => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Nav ---------- */
  const nav = $('.nav');
  const progress = $('.progress');
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${h > 0 ? Math.min(y / h, 1) : 0})`;
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const menuBtn = $('#menuToggle');
  const links = $('#navLinks');
  if (menuBtn && links) {
    const close = () => { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); };
    menuBtn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', (e) => { if (!links.contains(e.target) && !menuBtn.contains(e.target)) close(); });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Counters ---------- */
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    const end = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split('.')[1] || '').length;
    if (reduceMotion) { el.textContent = end.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (end * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  /* ---------- Role rotator ---------- */
  const rot = $('.rotator');
  if (rot) {
    const words = JSON.parse(rot.dataset.words || '[]');
    if (words.length && !reduceMotion) {
      let wi = 0, ci = words[0].length, del = true;
      const tick = () => {
        const w = words[wi];
        rot.textContent = w.slice(0, ci);
        let wait = del ? 35 : 70;
        if (del) { ci--; if (ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; wait = 300; } }
        else { ci++; if (ci > words[wi].length) { del = true; ci = words[wi].length; wait = 2200; } }
        setTimeout(tick, wait);
      };
      setTimeout(tick, 2400);
    }
  }

  /* ---------- Hero knowledge graph ---------- */
  const canvas = $('#graph');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const labels = JSON.parse(canvas.dataset.labels || '[]');
    let W, H, nodes = [], dpr = Math.min(window.devicePixelRatio || 1, 2), raf, running = true;
    const mouse = { x: -9999, y: -9999 };
    const init = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(26, (W * H) / 16000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
        label: i < labels.length && W > 700 ? labels[i] : null,
        hub: i < labels.length && W > 700
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const maxD = 140;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < maxD) {
            ctx.strokeStyle = `rgba(165,176,255,${(1 - d / maxD) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = md < 160;
        ctx.beginPath();
        ctx.fillStyle = n.hub ? 'rgba(251,191,36,.95)' : near ? 'rgba(255,255,255,.95)' : 'rgba(199,206,255,.6)';
        ctx.arc(n.x, n.y, n.hub ? 3.2 : n.r, 0, Math.PI * 2); ctx.fill();
        if (n.label) {
          const base = n.x > W * 0.56 ? 0.42 : 0;
          const a = Math.max(base, near ? (1 - md / 160) * 0.95 : 0);
          if (a > 0.02) {
            ctx.font = '500 11px "JetBrains Mono", monospace';
            ctx.fillStyle = `rgba(232,235,248,${a})`;
            ctx.fillText(n.label, n.x + 8, n.y + 4);
          }
        }
        if (near) {
          ctx.strokeStyle = `rgba(251,191,36,${(1 - md / 160) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        if (!reduceMotion) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
        }
      });
      if (!reduceMotion && running) raf = requestAnimationFrame(draw);
    };
    init(); draw();
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { cancelAnimationFrame(raf); init(); draw(); }, 200); });
    const hero = canvas.parentElement;
    hero.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    if ('IntersectionObserver' in window && !reduceMotion) {
      new IntersectionObserver(([en]) => {
        running = en.isIntersecting;
        if (running) { cancelAnimationFrame(raf); draw(); }
      }).observe(canvas);
    }
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running && !reduceMotion) { cancelAnimationFrame(raf); draw(); }
    });
  }

  /* ---------- Timeline accordions ---------- */
  $$('.t-head').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true'));
    });
  });
  const expandAll = $('#expandAll');
  if (expandAll) {
    expandAll.addEventListener('click', () => {
      const heads = $$('.t-head');
      const open = heads.some((h) => h.getAttribute('aria-expanded') !== 'true');
      heads.forEach((h) => h.setAttribute('aria-expanded', String(open)));
      expandAll.querySelector('span').textContent = open ? 'Collapse all' : 'Expand all';
    });
  }

  /* ---------- Gantt ---------- */
  const gantt = $('.gantt');
  if (gantt) {
    if ('IntersectionObserver' in window) {
      const go = new IntersectionObserver(([en]) => { if (en.isIntersecting) { gantt.classList.add('in'); go.disconnect(); } }, { threshold: 0.2 });
      go.observe(gantt);
    } else gantt.classList.add('in');
  }

  /* ---------- Publication filter ---------- */
  const pubList = $('#pubList');
  if (pubList) {
    const items = $$('.pub', pubList);
    const q = $('#pubSearch');
    const filters = $$('.filter[data-filter]');
    const empty = $('#pubEmpty');
    const count = $('#pubCount');
    let active = 'all';
    const apply = () => {
      const term = (q?.value || '').trim().toLowerCase();
      let shown = 0;
      items.forEach((it) => {
        const okF = active === 'all' || it.dataset.status === active;
        const okQ = !term || it.textContent.toLowerCase().includes(term);
        const ok = okF && okQ;
        it.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.classList.toggle('show', shown === 0);
      if (count) count.textContent = `${shown} of ${items.length}`;
    };
    filters.forEach((f) => f.addEventListener('click', () => {
      active = f.dataset.filter;
      filters.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
      apply();
    }));
    q?.addEventListener('input', apply);
    apply();
  }

  /* ---------- Lightbox ---------- */
  const shots = $$('.shot');
  const lb = $('#lightbox');
  if (shots.length && lb) {
    const img = $('img', lb), title = $('h4', lb), desc = $('p', lb);
    let idx = 0, lastFocus = null;
    const show = (i) => {
      idx = (i + shots.length) % shots.length;
      const s = shots[idx];
      img.src = s.dataset.full; img.alt = s.dataset.title;
      title.textContent = s.dataset.title; desc.textContent = s.dataset.desc;
    };
    const open = (i) => { lastFocus = document.activeElement; show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; $('.lb-close', lb).focus(); };
    const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; lastFocus?.focus(); };
    shots.forEach((s, i) => s.addEventListener('click', () => open(i)));
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', () => show(idx - 1));
    $('.lb-next', lb).addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

  /* ---------- Copy buttons ---------- */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); showToast('Copied to clipboard'); }
    catch (e) { showToast(b.dataset.copy); }
  }));

  /* ---------- CV ---------- */
  $('#printCv')?.addEventListener('click', () => window.print());
  const tocLinks = $$('.cv-toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(tocLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const so = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { tocLinks.forEach((a) => a.classList.remove('active')); map.get(en.target.id)?.classList.add('active'); }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* ---------- Contact form (Web3Forms) ---------- */
  const form = $('#contactForm');
  if (form) {
    const status = $('#formStatus');
    const btn = $('button[type="submit"]', form);
    const required = $$('[required]', form);
    const validate = (el) => {
      const fg = el.closest('.fg');
      const ok = el.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) : el.value.trim().length > 0;
      fg?.classList.toggle('invalid', !ok);
      return ok;
    };
    required.forEach((el) => el.addEventListener('blur', () => validate(el)));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      if (form.botcheck && form.botcheck.checked) { form.reset(); return; }
      const bad = required.filter((el) => !validate(el));
      if (bad.length) { bad[0].focus(); status.textContent = 'Please complete the highlighted fields.'; status.className = 'form-status bad'; return; }
      const topics = $$('input[name="topic"]:checked', form).map((i) => i.value);
      const data = new FormData(form);
      data.delete('topic');
      if (topics.length) data.append('topics', topics.join(', '));
      const original = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';
      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: data });
        const json = await res.json();
        if (json.success) {
          form.reset();
          status.textContent = 'Thank you — your message has been sent. I will get back to you soon.';
          status.className = 'form-status ok';
        } else throw new Error(json.message || 'Failed');
      } catch (err) {
        status.textContent = 'Sorry, the message could not be sent. Please email litonali@arizona.edu directly.';
        status.className = 'form-status bad';
      } finally {
        btn.disabled = false; btn.innerHTML = original;
      }
    });
  }

  /* ---------- Footer year ---------- */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Command palette ---------- */
  const pal = $('#palette');
  if (pal) {
    const input = $('input', pal);
    const list = $('.palette-list', pal);
    let results = [], sel = 0, lastFocus = null;
    const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const hl = (s, t) => {
      if (!t) return esc(s);
      const i = s.toLowerCase().indexOf(t);
      return i < 0 ? esc(s) : esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + t.length)) + '</mark>' + esc(s.slice(i + t.length));
    };
    const render = () => {
      const t = input.value.trim().toLowerCase();
      const words = t.split(/\s+/).filter(Boolean);
      results = SEARCH_INDEX.filter((r) => {
        const hay = (r.t + ' ' + (r.s || '') + ' ' + r.g + ' ' + (r.k || '')).toLowerCase();
        return words.every((w) => hay.includes(w));
      });
      if (!t) results = SEARCH_INDEX.filter((r) => r.g === 'Pages');
      results = results.slice(0, 40);
      sel = 0;
      if (!results.length) { list.innerHTML = `<div class="palette-empty">No matches for “${esc(input.value)}”</div>`; return; }
      let html = '', group = '';
      results.forEach((r, i) => {
        if (r.g !== group) { group = r.g; html += `<div class="palette-group">${esc(group)}</div>`; }
        html += `<a class="palette-item" role="option" id="pi-${i}" href="${r.u}" aria-selected="${i === sel}"><i class="${r.i}" aria-hidden="true"></i><span class="pt">${hl(r.t, words[0] || '')}${r.s ? `<span class="ps">${esc(r.s)}</span>` : ''}</span><span class="pg">${esc(r.p)}</span></a>`;
      });
      list.innerHTML = html;
    };
    const mark = () => {
      $$('.palette-item', list).forEach((el, i) => el.setAttribute('aria-selected', String(i === sel)));
      const cur = $(`#pi-${sel}`, list);
      cur?.scrollIntoView({ block: 'nearest' });
      input.setAttribute('aria-activedescendant', cur ? cur.id : '');
    };
    const open = () => { lastFocus = document.activeElement; pal.classList.add('open'); pal.setAttribute('aria-hidden', 'false'); input.value = ''; render(); setTimeout(() => input.focus(), 30); };
    const close = () => { pal.classList.remove('open'); pal.setAttribute('aria-hidden', 'true'); lastFocus?.focus(); };
    $$('[data-palette]').forEach((b) => b.addEventListener('click', open));
    pal.addEventListener('click', (e) => { if (e.target === pal) close(); });
    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, results.length - 1); mark(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); mark(); }
      else if (e.key === 'Enter') { const r = results[sel]; if (r) { e.preventDefault(); close(); window.location.href = r.u; } }
    });
    list.addEventListener('click', () => close());
    document.addEventListener('keydown', (e) => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName || '');
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); pal.classList.contains('open') ? close() : open(); }
      else if (e.key === 'Escape' && pal.classList.contains('open')) close();
    });
  }
})();
