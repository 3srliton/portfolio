import json, os, re
from html import escape as e
from data import *

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)  # the portfolio folder
FA = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
FONTS = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"

PAGES = [
    ("index.html", "Home", "fas fa-house"),
    ("about.html", "About", "fas fa-user"),
    ("research.html", "Research", "fas fa-flask"),
    ("experience.html", "Experience", "fas fa-briefcase"),
    ("honors.html", "Honors", "fas fa-award"),
    ("service.html", "Service", "fas fa-hands-helping"),
    ("cv.html", "CV", "fas fa-file-lines"),
    ("contact.html", "Contact", "fas fa-envelope"),
]


def i(cls):
    return f'<i class="{cls}" aria-hidden="true"></i>'


def socials(light=False):
    cls = "socials socials--light" if light else "socials"
    return f'<div class="{cls}">' + "".join(
        f'<a href="{u}" target="_blank" rel="noopener" aria-label="{e(n)}">{i(c)}</a>' for n, c, u in SOCIALS) + "</div>"


def layout(file, title, desc, body, extra_head=""):
    cur = ' aria-current="page"'
    nav = "".join(
        f'<a href="{f}"{cur if f == file else ""}>{e(n)}</a>' for f, n, _ in PAGES)
    full_title = f"{title} · Md Liton Ali" if file != "index.html" else "Md Liton Ali · Information Science Researcher, University of Arizona"
    url = SITE + "/" + ("" if file == "index.html" else file)
    foot_links = "".join(f'<li><a href="{f}">{e(n)}</a></li>' for f, n, _ in PAGES[1:6])
    foot_links2 = "".join(f'<li><a href="{u}" target="_blank" rel="noopener">{e(n)}</a></li>' for n, c, u in SOCIALS[:4])
    return f"""<!DOCTYPE html>
<html lang="en" class="no-js" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(full_title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="author" content="Md Liton Ali">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:title" content="{e(full_title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/images/dp.jpg">
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@3srliton">
<meta name="theme-color" content="#0b1020">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<script>try{{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}}catch(e){{}}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{FONTS}" rel="stylesheet">
<link href="{FA}" rel="stylesheet">
<link rel="stylesheet" href="style.css">
{extra_head}</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"></div>
<header class="nav">
  <div class="container nav-inner">
    <a class="brand" href="index.html" aria-label="Md Liton Ali, home">
      <span class="brand-mark">MLA</span>
      <span class="brand-text"><span class="brand-name">Md Liton Ali</span><span class="brand-sub">PhD · INFORMATION SCIENCE</span></span>
    </a>
    <nav class="nav-links" id="navLinks" aria-label="Main">{nav}</nav>
    <div class="nav-tools">
      <button class="search-btn" type="button" data-palette aria-label="Search the site">{i("fas fa-magnifying-glass")}<span class="label">Search</span><span class="kbd">Ctrl K</span></button>
      <button class="icon-btn" id="themeToggle" type="button" aria-label="Switch theme"><i class="fas fa-moon theme-icon-light" aria-hidden="true"></i><i class="fas fa-sun theme-icon-dark" aria-hidden="true"></i></button>
      <button class="icon-btn menu-btn" id="menuToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">{i("fas fa-bars")}</button>
    </div>
  </div>
</header>
<main id="main">
{body}
</main>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html"><span class="brand-mark">MLA</span><span class="brand-text"><span class="brand-name">Md Liton Ali</span></span></a>
        <p>Information Science researcher and PhD student at the University of Arizona, working where libraries, data and people meet.</p>
        {socials()}
      </div>
      <div><h4>Explore</h4><ul>{foot_links}</ul></div>
      <div><h4>Connect</h4><ul><li><a href="mailto:{EMAIL}">{EMAIL}</a></li>{foot_links2}<li><a href="cv.html">Curriculum Vitae</a></li></ul></div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> Md Liton Ali. All rights reserved.</span>
      <span>Press <span class="kbd">/</span> to search · <a class="to-top" href="#main">Back to top {i("fas fa-arrow-up")}</a></span>
    </div>
  </div>
</footer>
<div class="palette" id="palette" role="dialog" aria-modal="true" aria-label="Search the site" aria-hidden="true">
  <div class="palette-box">
    <div class="palette-input">{i("fas fa-magnifying-glass")}<input type="text" placeholder="Search publications, roles, awards, pages…" aria-label="Search" role="combobox" aria-expanded="true" aria-controls="paletteList" autocomplete="off"><span class="kbd">Esc</span></div>
    <div class="palette-list" id="paletteList" role="listbox"></div>
    <div class="palette-foot"><span><span class="kbd">↑</span> <span class="kbd">↓</span> navigate</span><span><span class="kbd">Enter</span> open</span><span><span class="kbd">Esc</span> close</span></div>
  </div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="script.js" defer></script>
</body>
</html>
"""


def page_hero(callno, crumb, title_html, lede, stats=None):
    st = ""
    if stats:
        st = '<div class="page-hero-stats">' + "".join(f'<div><strong>{v}</strong><span>{e(l)}</span></div>' for v, l in stats) + "</div>"
    return f"""<section class="page-hero">
  <div class="container">
    <div class="crumbs"><a href="index.html">Home</a><span aria-hidden="true">/</span><span>{e(crumb)}</span></div>
    <span class="callno">{e(callno)}</span>
    <h1>{title_html}</h1>
    <p class="lede">{lede}</p>
    {st}
  </div>
</section>"""


def section_head(callno, title, sub=None, right=""):
    cls = "section-head section-head--split" if right else "section-head"
    inner = f'<div style="display:grid;gap:.9rem"><span class="callno">{e(callno)}</span><h2>{title}</h2>{f"<p>{sub}</p>" if sub else ""}</div>'
    return f'<div class="{cls} reveal">{inner}{right}</div>'


def cta(title_html="Let's build <em>knowledge</em> together.", text="Open to research collaborations, conference conversations, and library digitization initiatives."):
    return f"""<section class="section section--tight"><div class="container">
  <div class="cta-band reveal">
    <div><h2>{title_html}</h2><p>{text}</p></div>
    <div class="cta-actions"><a class="btn btn-light" href="contact.html">Get in touch {i("fas fa-arrow-right")}</a><a class="btn btn-outline-light" href="cv.html">View CV</a></div>
  </div>
</div></section>"""


def pub_item(p, n):
    status = "Published" if p["status"] == "published" else "Under review"
    chip = "chip--primary" if p["status"] == "published" else "chip--accent"
    tags = "".join(f'<span class="chip">{e(t)}</span>' for t in p["tags"])
    action = (f'<a class="pub-btn" href="{e(p["url"])}" target="_blank" rel="noopener">{i("fas fa-file-pdf")} View PDF</a>' if p["url"]
              else f'<span class="pub-btn" aria-disabled="true">{i("fas fa-hourglass-half")} Pending</span>')
    return f"""<article class="pub reveal" data-status="{p['status']}" style="--d:{n*0.06:.2f}s">
  <div class="pub-year">{p['year']}<small>NO. {n+1:02d}</small></div>
  <div><h3>{e(p['title'])}</h3><p class="pub-venue">{e(p['venue'])}</p><div class="pub-tags"><span class="chip {chip}">{status}</span>{tags}</div></div>
  <div class="pub-actions">{action}</div>
</article>"""


# ---------------------------------------------------------------- HOME
def home():
    labels = [x[1] for x in INTERESTS] + ["Digital Libraries", "Koha-ILS", "Webometrics", "Information Retrieval"]
    words = ["Information Science Researcher", "Digital Library Specialist", "PhD Student · University of Arizona", "Graduate Teaching Associate"]
    interests = "".join(f"""<a class="interest reveal" href="research.html" style="--d:{k*0.07:.2f}s"><span class="num">0{k+1}</span>{i(ic)}<div><h3>{e(t)}</h3><p>{e(d)}</p></div></a>"""
                        for k, (ic, t, d) in enumerate(INTERESTS))
    recent = "".join(pub_item(p, n) for n, p in enumerate(PUBS[:3]))
    marquee_items = [a[1] for g in AWARDS for a in g[2]]
    m = "".join(f'<span class="m-item">{i("fas fa-award")}{e(t)}</span>' for t in marquee_items)
    body = f"""
<section class="hero">
  <canvas id="graph" aria-hidden="true" data-labels='{e(json.dumps(labels))}'></canvas>
  <div class="container hero-grid">
    <div>
      <span class="hero-badge reveal"><span class="pulse" aria-hidden="true"></span> PhD Student · University of Arizona</span>
      <h1 class="reveal" style="--d:.08s"><span class="line">Md Liton</span><span class="line accent">Ali.</span></h1>
      <p class="hero-role reveal" style="--d:.16s"><span aria-hidden="true">&gt;</span><span class="rotator" data-words='{e(json.dumps(words))}'>{e(words[0])}</span></p>
      <p class="hero-intro reveal" style="--d:.22s">Pursuing a PhD in Information Science at the University of Arizona, building on nearly a decade of library automation and digital service work to research science of science, AI in education, misinformation, health informatics, and knowledge management systems.</p>
      <div class="hero-cta reveal" style="--d:.3s">
        <a class="btn btn-light" href="research.html">Explore my research {i("fas fa-arrow-right")}</a>
        <a class="btn btn-outline-light" href="contact.html">{i("fas fa-paper-plane")} Contact</a>
      </div>
      <div class="reveal" style="--d:.36s">{socials()}</div>
    </div>
    <div class="portrait-wrap reveal" style="--d:.2s">
      <div class="portrait-orbit" aria-hidden="true"></div>
      <div class="portrait"><img src="images/web/dp-png.webp" alt="Portrait of Md Liton Ali" width="900" height="900" fetchpriority="high"></div>
      <div class="portrait-card portrait-card--a">{i("fas fa-medal")}<span><strong>Best Paper Award</strong>IIKM 2025</span></div>
      <div class="portrait-card portrait-card--b">{i("fas fa-user-tie")}<span><strong>Chair-Elect</strong>ASIS&amp;T SIG-AVC</span></div>
    </div>
  </div>
  <div class="scroll-cue" aria-hidden="true">SCROLL<span></span></div>
</section>

<div class="stats-band"><div class="container">
  <div class="stats reveal">
    <div class="stat"><strong><span data-count="100">100</span>K<sup>+</sup></strong><span>Library resources managed</span></div>
    <div class="stat"><strong><span data-count="15">15</span><sup>+</sup></strong><span>Libraries automated across Bangladesh</span></div>
    <div class="stat"><strong><span data-count="16">16</span></strong><span>Awards, honors &amp; scholarships</span></div>
    <div class="stat"><strong><span data-count="4">4</span></strong><span>Publications &amp; manuscripts</span></div>
    <div class="stat"><strong><span data-count="3.97">3.97</span></strong><span>Masters CGPA · Gold Medalist</span></div>
  </div>
</div></div>

<section class="section">
  <div class="container">
    {section_head("020 · Research interests", "Questions I am <em style='font-style:italic;color:var(--primary)'>chasing</em>", "Five threads that connect a decade of library practice with doctoral research at the University of Arizona.")}
    <div class="interests">{interests}</div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    {section_head("000 · Index", "Explore the atlas", "Each part of my work now has its own page, with the full details.")}
    <div class="bento">
      <a class="tile tile--dark t-a reveal" href="research.html">
        <div class="tile-body"><span class="callno" style="color:var(--highlight)">020.72 · Research</span><h3 style="margin-top:.8rem;font-size:clamp(1.6rem,3vw,2.2rem)">Publications &amp; the zero-budget digital library framework</h3><p>Peer-reviewed articles on e-learning, knowledge sharing and scholarly access, plus field research recognized at IIKM 2025.</p></div>
        <div class="tile-photo"><img src="images/web/iikm4b.webp" alt="" loading="lazy"></div>
        <div class="tile-foot"><span class="tile-meta">4 papers · Best Paper Award</span><span class="tile-go">{i("fas fa-arrow-right")}</span></div>
      </a>
      <a class="tile t-b reveal" href="about.html" style="--d:.06s">
        <div><span class="callno">920 · About</span><h3 style="margin-top:.6rem">From Rajshahi to Tucson</h3><p>My story, education, and the skills I bring to every library and research team.</p></div>
        <div class="tile-foot"><span class="tile-meta">Bio · Education · Skills</span><span class="tile-go">{i("fas fa-arrow-right")}</span></div>
      </a>
      <a class="tile tile--accent t-c reveal" href="experience.html" style="--d:.12s">
        <div><span class="callno" style="color:inherit;opacity:.8">023 · Experience</span><h3 style="margin-top:.6rem">Teaching, cataloguing &amp; field automation</h3><p>Five professional roles, twelve library automation projects, twelve trainings.</p></div>
        <div class="tile-foot"><span class="tile-meta">2016 → today</span><span class="tile-go">{i("fas fa-arrow-right")}</span></div>
      </a>
      <a class="tile t-d reveal" href="honors.html">
        <div><span class="callno">929.81 · Honors</span><div class="tile-big" style="margin-top:.6rem">16</div><p>Awards, medals and scholarships, with a photo gallery.</p></div>
        <div class="tile-foot"><span class="tile-meta">Gold Medalist</span><span class="tile-go">{i("fas fa-arrow-right")}</span></div>
      </a>
      <a class="tile t-e reveal" href="service.html" style="--d:.06s">
        <div><span class="callno">020.6 · Service</span><h3 style="margin-top:.6rem">Chair-Elect, ASIS&amp;T SIG-AVC</h3><p>Leadership, peer review, 7 memberships and 15 volunteer roles.</p></div>
        <div class="tile-foot"><span class="tile-meta">Community</span><span class="tile-go">{i("fas fa-arrow-right")}</span></div>
      </a>
      <a class="tile t-f reveal" href="cv.html" style="--d:.12s">
        <div><span class="callno">020.92 · CV</span><h3 style="margin-top:.6rem">Curriculum Vitae</h3><p>Everything on one page, ready to print or save as PDF.</p></div>
        <div class="tile-foot"><span class="tile-meta">Print-ready</span><span class="tile-go">{i("fas fa-arrow-right")}</span></div>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container feature">
    <div class="feature-media reveal"><img src="images/web/iikm3.webp" alt="Presenters at the International Conference on Information and Knowledge Management" loading="lazy"><span class="stamp">{i("fas fa-medal")} Best Paper · IIKM 2025</span></div>
    <div class="reveal" style="--d:.1s">
      <span class="callno">Featured project</span>
      <h2>A zero-budget digital library framework for Bangladesh</h2>
      <p>Most school and college libraries in Bangladesh lack digital services, including basic library websites, and the primary barrier is funding. This ongoing project designs a framework that lets libraries build and maintain digital services at zero cost, using free resources and only minimal technical skill.</p>
      <ul class="feature-points">
        <li>{i("fas fa-check")}<span>Built for school and college libraries in developing and least-developed countries</span></li>
        <li>{i("fas fa-check")}<span>Free tools only, no budget and minimal technical skill required</span></li>
        <li>{i("fas fa-check")}<span>Recognized with the Best Paper Award at IIKM 2025</span></li>
      </ul>
      <a class="link-arrow" href="research.html#project">Read about the project {i("fas fa-arrow-right")}</a>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    {section_head("Recent work", "Selected publications", None, f'<a class="btn btn-ghost reveal" href="research.html#publications">View all {i("fas fa-arrow-right")}</a>')}
    <div class="pubs">{recent}</div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">{section_head("929.81 · Recognition", "Honors along the way", None, f'<a class="btn btn-ghost reveal" href="honors.html">All honors {i("fas fa-arrow-right")}</a>')}</div>
  <div class="marquee reveal" aria-label="Awards and honors"><div class="marquee-track">{m}<span aria-hidden="true" style="display:contents">{m}</span></div></div>
</section>
{cta()}
"""
    ld = {
        "@context": "https://schema.org", "@type": "Person", "name": "Md Liton Ali", "url": SITE,
        "image": SITE + "/images/dp.jpg", "jobTitle": "PhD Student, Information Science",
        "affiliation": {"@type": "CollegeOrUniversity", "name": "University of Arizona"},
        "alumniOf": {"@type": "CollegeOrUniversity", "name": "University of Dhaka"},
        "email": "mailto:" + EMAIL, "sameAs": [u for _, _, u in SOCIALS],
        "knowsAbout": [x[1] for x in INTERESTS],
    }
    extra = f'<script type="application/ld+json">{json.dumps(ld)}</script>\n'
    return layout("index.html", "Home", "Md Liton Ali is an Information Science researcher and PhD student at the University of Arizona, researching science of science, AI in education, misinformation, health informatics and knowledge management.", body, extra)


# ---------------------------------------------------------------- ABOUT
def about():
    journey = [
        ("2013", "SSC", "Dr. Abu Bakar High School, Rajshahi — GPA 4.81", False),
        ("2015", "HSC", "Kaliganj Haat Degree College, Rajshahi — GPA 5.00", False),
        ("2015 – 2019", "Bachelor's, University of Dhaka", "Information Science & Library Management; library automation fieldwork begins in 2017", False),
        ("2020 – 2021", "Master's & Gold Medal", "CGPA 3.97, Mohammad Shahidullah Memorial Gold Medal", False),
        ("2022 – 2026", "Islamic University of Technology", "Assistant Cataloguer, then International Affairs & External Communication", False),
        ("2026 →", "PhD, University of Arizona", "Information Science, College of Information Science, Tucson", True),
    ]
    j = "".join(f'<div class="step{" now" if now else ""} reveal" style="--d:{k*0.08:.2f}s"><span class="yr">{e(y)}</span><h4>{e(t)}</h4><p>{e(d)}</p></div>' for k, (y, t, d, now) in enumerate(journey))
    facts = [("fas fa-user-graduate", "PhD Student", "University of Arizona"), ("fas fa-briefcase", "10 years", "Library & Information Science"),
             ("fas fa-building-columns", "15+ institutions", "Libraries served nationwide"), ("fas fa-globe", "Chair-Elect", "ASIS&T SIG-AVC (2025–2026)"),
             ("fas fa-award", "16 honors", "Awards & scholarships"), ("fas fa-location-dot", "Tucson, Arizona", "United States")]
    fx = "".join(f'<div class="fact">{i(c)}<div><strong>{e(a)}</strong><span>{e(b)}</span></div></div>' for c, a, b in facts)
    highlights = [
        ("fas fa-user-graduate", "PhD Researcher", "PhD in Information Science at the University of Arizona, researching health misinformation and knowledge management and bringing doctoral-level inquiry into library practice."),
        ("fas fa-graduation-cap", "Academic Excellence", "Master's and Bachelor's from the University of Dhaka. Gold Medal, Dean's Award of Honour, Provost Award of Excellence, and UGC and Mitsubishi UFJ Foundation scholarships."),
        ("fas fa-laptop-code", "Technical Expertise", "Deployed Koha-ILS and RFID systems at IUT and contributed to 15+ library automation projects, working with DSpace, SLiMS, Greenstone and web technologies."),
        ("fas fa-microscope", "Research Focus", "AI in academia and information retrieval, health informatics and misinformation. Peer reviewer for Global Knowledge, Memory and Communication."),
    ]
    hl = "".join(f'<div class="card reveal" style="--d:{k*0.07:.2f}s"><span class="card-index">0{k+1}/04</span><div class="card-icon{" card-icon--accent" if k % 2 else ""}">{i(c)}</div><h3>{e(t)}</h3><p>{e(d)}</p></div>' for k, (c, t, d) in enumerate(highlights))
    sk = "".join(f'<div class="skill-group reveal" style="--d:{k*0.08:.2f}s"><h3>{i(c)}{e(t)}</h3><div class="tags">' + "".join(f'<span class="tag">{e(x)}</span>' for x in tags) + "</div></div>" for k, (c, t, tags) in enumerate(SKILLS))
    deg = ""
    for k, d in enumerate(EDUCATION):
        seal = f'<img src="{d["seal"]}" alt="" loading="lazy">' if d["seal"] else e(d["abbr"])
        deg += f'<div class="degree{" degree--current" if d["current"] else ""} reveal" style="--d:{k*0.06:.2f}s"><div class="seal">{seal}</div><div><span class="degree-yr">{e(d["years"])}</span><h3>{e(d["degree"])}</h3><p class="degree-org">{e(d["org"])}</p><span class="chip chip--primary">{e(d["badge"])}</span></div></div>'
    body = f"""
{page_hero("920 · Biography", "About", "Bridging libraries, data &amp; <em>people</em>.", "An Information Science researcher who has spent nearly a decade modernizing how people find and use information, from rural college libraries in Bangladesh to the University of Arizona.", [("10", "Years in LIS"), ("15+", "Institutions served"), ("3.97", "Masters CGPA")])}

<section class="section">
  <div class="container bio">
    <div class="bio-text reveal">
      <span class="callno" style="margin-bottom:1.2rem">LIS 020.92 — ALI, M. L.</span>
      <p class="lead" style="margin-top:1rem">Md Liton Ali is an Information Science researcher and <strong>PhD student at the University of Arizona</strong>, dedicated to modernizing information access and transforming library ecosystems.</p>
      <p>Starting from his university days, he has spent nearly a decade working across <strong>more than 15 library and information institutions</strong> in Bangladesh, bridging traditional information management with digital and AI-driven frameworks.</p>
      <p>He built much of this foundation at the <strong>Islamic University of Technology (IUT)</strong>, serving as Assistant Cataloguer and Liaison Officer for the International Affairs Office. There he deployed Koha-ILS, digitized patron onboarding, streamlined cataloging workflows, and supported international students through every stage of their integration.</p>
      <p>He holds a Master of Arts in Information Science and Library Management from the University of Dhaka (CGPA 3.97/4.00), graduating with the Mohammad Shahidullah Memorial Gold Medal, the Dean's Award of Honour, and the Provost Award of Excellence. His doctoral research builds on this record, extending into health misinformation and knowledge management. He also continues to lead a zero-budget digital library framework for resource-constrained school and college libraries across Bangladesh, work recognized with the <strong>Best Paper Award at IIKM 2025</strong>.</p>
      <div style="display:flex;flex-wrap:wrap;gap:.8rem;margin-top:1.8rem"><a class="btn btn-primary" href="cv.html">View full CV {i("fas fa-arrow-right")}</a><a class="btn btn-ghost" href="contact.html">Say hello</a></div>
    </div>
    <aside class="catalog reveal" style="--d:.1s" aria-label="Quick facts">
      <div class="catalog-top"><span>CATALOG CARD · 920</span><span class="catalog-hole" aria-hidden="true"></span></div>
      <div class="facts">{fx}</div>
      <div style="margin-top:1.4rem">{socials(True)}</div>
    </aside>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    {section_head("Timeline", "The journey so far", "From Rajshahi to Dhaka to Tucson, the milestones that shaped my path in information science.")}
    <div class="journey">{j}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    {section_head("Highlights", "What I bring to the table")}
    <div class="grid grid-4">{hl}</div>
  </div>
</section>

<section class="section section--alt" id="skills">
  <div class="container">
    {section_head("Capabilities", "Skills &amp; expertise", "Library systems, technical tools and research methods I use in practice.")}
    <div class="skills">{sk}</div>
  </div>
</section>

<section class="section" id="education">
  <div class="container">
    {section_head("Academic background", "Education")}
    <div class="degrees">{deg}</div>
  </div>
</section>
{cta()}
"""
    return layout("about.html", "About", "Biography, education, skills and journey of Md Liton Ali, PhD student in Information Science at the University of Arizona.", body)


# ---------------------------------------------------------------- RESEARCH
def research():
    focus = "".join(f'<div class="card reveal" style="--d:{k*0.06:.2f}s"><span class="card-index">0{k+1}</span><div class="card-icon">{i(c)}</div><h3>{e(t)}</h3><p>{e(d)}</p></div>' for k, (c, t, d) in enumerate(INTERESTS))
    pubs = "".join(pub_item(p, n) for n, p in enumerate(sorted(PUBS, key=lambda p: (p["status"] != "published", -p["year"]))))
    body = f"""
{page_hero("020.72 · Research", "Research", "Research that makes information <em>reachable</em>.", "My work asks how people produce, share and access knowledge, and how libraries can serve them better, especially where resources are scarce.", [("4", "Publications & manuscripts"), ("1", "Best Paper Award"), ("5", "Research areas")])}

<section class="section">
  <div class="container">
    {section_head("Focus areas", "Research interests", "The questions guiding my doctoral work in the College of Information Science.")}
    <div class="grid grid-3">{focus}
      <a class="card card-link reveal" href="https://scholar.google.com/citations?user=ygCGG80AAAAJ&hl=en" target="_blank" rel="noopener" style="background:var(--ink);color:var(--on-ink);border-color:var(--ink)"><div class="card-icon" style="background:rgba(255,255,255,.1);color:var(--highlight)">{i("fas fa-graduation-cap")}</div><h3>Google Scholar</h3><p style="color:var(--on-ink-muted)">Follow my latest publications and citations.</p><span class="link-arrow" style="color:var(--highlight);margin-top:.6rem">Open profile {i("fas fa-arrow-up-right-from-square")}</span></a>
    </div>
  </div>
</section>

<section class="section section--alt" id="project">
  <div class="container feature">
    <div class="feature-media reveal"><img src="images/web/iikm4b.webp" alt="Md Liton Ali receiving the Best Paper Award at IIKM" loading="lazy"><span class="stamp">{i("fas fa-medal")} Best Paper Award · IIKM 2025</span></div>
    <div class="reveal" style="--d:.1s">
      <span class="callno">Ongoing project</span>
      <h2>Toward designing a zero-budget digital library framework for school and college libraries of Bangladesh</h2>
      <p>Most school and college libraries in Bangladesh lack digital services, including basic library websites, and the primary barrier is insufficient funding.</p>
      <p>This ongoing project designs a framework that enables libraries, especially in developing and least-developed countries, to build and maintain digital services at <strong>zero cost</strong>, using free resources and requiring only minimal technical skill.</p>
      <ul class="feature-points">
        <li>{i("fas fa-circle-exclamation")}<span><strong>Problem:</strong> no budget for websites, catalogs or e-resources</span></li>
        <li>{i("fas fa-lightbulb")}<span><strong>Approach:</strong> free platforms and tools assembled into a repeatable framework</span></li>
        <li>{i("fas fa-users")}<span><strong>Who it serves:</strong> school and college libraries in resource-constrained settings</span></li>
        <li>{i("fas fa-medal")}<span><strong>Recognition:</strong> Best Paper Award, IIKM 2025</span></li>
      </ul>
      <a class="link-arrow" href="experience.html#field">See the 12 field automation projects behind it {i("fas fa-arrow-right")}</a>
    </div>
  </div>
</section>

<section class="section" id="publications">
  <div class="container">
    {section_head("Research output", "Publications", "Peer-reviewed articles and manuscripts. Filter by status or search by keyword.")}
    <div class="pub-tools reveal">
      <div class="filters" role="group" aria-label="Filter publications">
        <button class="filter" type="button" data-filter="all" aria-pressed="true">All</button>
        <button class="filter" type="button" data-filter="published" aria-pressed="false">Published</button>
        <button class="filter" type="button" data-filter="review" aria-pressed="false">Under review</button>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;flex:1;justify-content:flex-end;flex-wrap:wrap">
        <span id="pubCount" class="tile-meta" aria-live="polite"></span>
        <label class="field"><span class="sr-only">Search publications</span>{i("fas fa-magnifying-glass")}<input id="pubSearch" type="search" placeholder="Search titles, journals, topics…"></label>
      </div>
    </div>
    <div class="pubs" id="pubList">{pubs}</div>
    <p class="empty" id="pubEmpty">No publications match that search.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    {section_head("Scholarly service", "Contributing to the field")}
    <div class="grid grid-3">
      <div class="card reveal"><div class="card-icon">{i("fas fa-pen-nib")}</div><h3>Peer Reviewer</h3><p>Global Knowledge, Memory and Communication, Emerald Publishing.</p></div>
      <div class="card reveal" style="--d:.06s"><div class="card-icon card-icon--accent">{i("fas fa-user-tie")}</div><h3>Chair-Elect, SIG-AVC</h3><p>Association for Information Science and Technology (ASIS&amp;T), 2025–2026.</p></div>
      <div class="card reveal" style="--d:.12s"><div class="card-icon">{i("fas fa-microphone")}</div><h3>Conference contributor</h3><p>Presenter at IIKM, and rapporteur at the International Conference on the Role of LIS Professionals in the 4IR.</p></div>
    </div>
  </div>
</section>
{cta("Interested in <em>collaborating</em>?", "I welcome conversations on scholarly communication, AI in education, misinformation and low-cost digital libraries.")}
"""
    return layout("research.html", "Research", "Research interests, the zero-budget digital library framework, and publications of Md Liton Ali.", body)


# ---------------------------------------------------------------- EXPERIENCE
def experience():
    tl = ""
    for k, x in enumerate(EXPERIENCE):
        pts = "".join(f"<li>{e(p)}</li>" for p in x["points"])
        tl += f"""<div class="t-item{" current" if x["current"] else ""} reveal" style="--d:{k*0.05:.2f}s">
  <span class="t-dot">{i(x["icon"])}</span>
  <div class="t-card">
    <button class="t-head" type="button" aria-expanded="{"true" if k == 0 else "false"}" aria-controls="tb{k}">
      <div><h3>{e(x["title"])}</h3><p class="t-org">{e(x["org"])}</p></div>
      <span class="t-period">{e(x["period"])} {i("fas fa-chevron-down")}</span>
    </button>
    <div class="t-body" id="tb{k}"><div><ul>{pts}</ul></div></div>
  </div>
</div>"""
    y0, y1 = 2017, 2025
    years = y1 - y0
    span = years * 12
    scale = "".join(f"<span>{y}</span>" for y in range(y0, y1))
    rows = ""
    for name, role, (sy, sm), (ey, em), disp in FIELD:
        left = ((sy - y0) * 12 + (sm - 1)) / span * 100
        width = ((ey - sy) * 12 + (em - sm) + 1) / span * 100
        coord = " coord" if role == "Project Coordinator" else ""
        rows += f'<div class="gantt-row"><div class="gantt-label">{e(name)}<small>{e(role)} · {e(disp)}</small></div><div class="gantt-track" role="img" aria-label="{e(name)}: {e(disp)}"><span class="gantt-bar{coord}" style="left:{left:.2f}%;width:{width:.2f}%"></span></div></div>'
    tr = "".join(f'<div class="train reveal" style="--d:{(k%3)*0.06:.2f}s"><span class="yr">{e(y)}</span><h4>{e(t)}</h4><p>{e(o)}</p></div>' for k, (y, t, o) in enumerate(TRAINING))
    body = f"""
{page_hero("023 · Career", "Experience", "Practice that turns libraries <em>digital</em>.", "From teaching neural networks at the University of Arizona to automating a dozen libraries across Bangladesh, the work behind the research.", [("5", "Professional roles"), ("12", "Field automation projects"), ("12", "Trainings completed")])}

<section class="section">
  <div class="container">
    {section_head("Professional experience", "Roles &amp; responsibilities", "Select a role to see the details.", f'<button class="btn btn-ghost reveal" id="expandAll" type="button">{i("fas fa-up-right-and-down-left-from-center")}<span>Expand all</span></button>')}
    <div class="timeline">{tl}</div>
  </div>
</section>

<section class="section section--alt" id="field">
  <div class="container">
    {section_head("Field engagement", "Library automation &amp; digitization projects", "Twelve institutions I helped automate and digitize between 2017 and 2024, shown on one timeline.")}
    <div class="gantt reveal" style="--years:{years}">
      <div class="gantt-scale"><span></span><div class="gantt-years" style="--years:{years}">{scale}</div></div>
      {rows}
      <div class="gantt-legend"><span><i></i>Project Executive / Member</span><span><i class="coord"></i>Project Coordinator</span></div>
    </div>
  </div>
</section>

<section class="section" id="training">
  <div class="container">
    {section_head("Continuing education", "Training &amp; courses", "Lifelong learning across library systems, data analysis, web development and science communication.")}
    <div class="training">{tr}</div>
  </div>
</section>
{cta()}
"""
    return layout("experience.html", "Experience", "Professional experience, library automation field projects and training of Md Liton Ali.", body)


# ---------------------------------------------------------------- HONORS
def honors():
    groups = "".join(f'<div class="award-group reveal" style="--d:{k*0.06:.2f}s"><h3>{i(ic)}{e(g)}<span class="count">{len(items):02d}</span></h3><ul class="award-list">' +
                     "".join(f"<li>{i(c)}<span>{e(t)}</span></li>" for c, t in items) + "</ul></div>" for k, (g, ic, items) in enumerate(AWARDS))
    gal = "".join(f'<button class="shot reveal" type="button" data-full="images/web/{f}.webp" data-title="{e(t)}" data-desc="{e(d)}"><div class="shot-img"><img src="images/web/{f}.webp" alt="{e(t)}" loading="lazy"><span class="zoom">{i("fas fa-expand")}</span></div><div class="shot-cap"><h4>{e(t)}</h4><p>{e(d)}</p></div></button>' for f, t, d in GALLERY)
    total = sum(len(g[2]) for g in AWARDS)
    body = f"""
{page_hero("929.81 · Recognition", "Honors", "Recognized for <em>excellence</em>.", "Medals, merit awards and scholarships earned through academic work, research and service to the community.", [(str(total), "Awards & scholarships"), ("1", "Gold Medal"), ("12+", "Blood donations")])}

<section class="section">
  <div class="container">
    {section_head("Highlights", "Signature honors")}
    <div class="honor-feature">
      <div class="medal reveal">{i("fas fa-medal")}<h3>Mohammad Shahidullah Memorial Gold Medal</h3><p>Top of the Masters cohort in Information Science &amp; Library Management, University of Dhaka.</p></div>
      <div class="medal reveal" style="--d:.08s">{i("fas fa-file-lines")}<h3>Best Paper Award, IIKM 2025</h3><p>For research on a zero-budget digital library framework for Bangladeshi schools and colleges.</p></div>
      <div class="medal reveal" style="--d:.16s">{i("fas fa-trophy")}<h3>Provost Award of Academic Excellence</h3><p>Alongside the Dean's Merit List of Honour at both the undergraduate and Masters levels.</p></div>
    </div>
    <div class="award-groups">{groups}</div>
  </div>
</section>

<section class="section section--alt" id="gallery">
  <div class="container">
    {section_head("Milestones & memories", "Photo gallery", "Moments from award ceremonies, conferences and trainings. Select a photo to enlarge it.")}
    <div class="gallery">{gal}</div>
  </div>
</section>
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" aria-hidden="true">
  <button class="lb-btn lb-close" type="button" aria-label="Close">{i("fas fa-xmark")}</button>
  <button class="lb-btn lb-prev" type="button" aria-label="Previous photo">{i("fas fa-chevron-left")}</button>
  <button class="lb-btn lb-next" type="button" aria-label="Next photo">{i("fas fa-chevron-right")}</button>
  <figure><img src="" alt=""><figcaption><h4></h4><p></p></figcaption></figure>
</div>
{cta()}
"""
    return layout("honors.html", "Honors", "Awards, honors, scholarships and milestone photos of Md Liton Ali.", body)


# ---------------------------------------------------------------- SERVICE
def service():
    roles = "".join(f'<div class="role{" role--lead" if lead else ""} reveal" style="--d:{k*0.07:.2f}s"><span class="when">{e(w)}</span><h3>{e(t)}</h3><p>{e(o)}</p></div>' for k, (w, t, o, lead) in enumerate(LEAD_ROLES))
    orgs = "".join(f'<div class="org reveal" style="--d:{(k%4)*0.05:.2f}s"><span class="org-abbr">{e(a)}</span><span class="org-name">{e(n)}</span></div>' for k, (a, n) in enumerate(MEMBERSHIPS))
    vols = "".join(f'<div class="vol-group reveal" style="--d:{k*0.07:.2f}s"><h3>{i(ic)}{e(g)}</h3><ul class="vol">' + "".join(f"<li><strong>{e(r)}</strong><span>{e(o)}</span></li>" for r, o in items) + "</ul></div>" for k, (g, ic, items) in enumerate(VOLUNTEER))
    nvol = sum(len(v[2]) for v in VOLUNTEER) + len(LEAD_ROLES)
    body = f"""
{page_hero("020.6 · Organizations", "Service", "Service to the profession &amp; <em>community</em>.", "Leadership in international associations, peer review, and years of volunteering, from blood donation drives to supporting blind students.", [(str(len(MEMBERSHIPS)), "Professional memberships"), (str(nvol), "Leadership & volunteer roles"), ("12+", "Blood donations")])}

<section class="section">
  <div class="container">
    {section_head("Leadership", "Professional service")}
    <div class="roles">{roles}</div>
  </div>
</section>

<section class="section section--alt" id="memberships">
  <div class="container">
    {section_head("Affiliations", "Professional memberships", "Active member of international and national associations in information science, computing and area studies.")}
    <div class="orgs">{orgs}</div>
  </div>
</section>

<section class="section" id="volunteer">
  <div class="container">
    {section_head("Community", "Volunteering &amp; student leadership")}
    <div class="vol-groups">{vols}</div>
  </div>
</section>
{cta()}
"""
    return layout("service.html", "Service", "Professional service, memberships and volunteer work of Md Liton Ali.", body)


# ---------------------------------------------------------------- CV
def cv():
    secs = [("cv-edu", "Education"), ("cv-exp", "Experience"), ("cv-pub", "Publications"), ("cv-res", "Research Project"), ("cv-field", "Field Projects"),
            ("cv-awd", "Awards"), ("cv-srv", "Service"), ("cv-mem", "Memberships"), ("cv-trn", "Training"), ("cv-skl", "Skills")]
    toc = "".join(f'<a href="#{a}">{e(b)}</a>' for a, b in secs)
    edu = "".join(f'<div class="cv-row"><strong>{e(d["degree"])}</strong><span class="d">{e(d["years"])}</span><span class="s">{e(d["org"])} · {e(d["badge"])}</span></div>' for d in EDUCATION)
    exp = "".join(f'<div class="cv-row"><strong>{e(x["title"])}</strong><span class="d">{e(x["period"])}</span><span class="s">{e(x["org"])}</span><ul>' + "".join(f"<li>{e(p)}</li>" for p in x["points"]) + "</ul></div>" for x in EXPERIENCE)
    def pdf_link(p):
        return ' <a href="%s" target="_blank" rel="noopener">[PDF]</a>' % e(p["url"]) if p["url"] else ""
    pub = "".join(f'<li>{e(p["title"])}. <em>{e(p["venue"])}</em>{", " + str(p["year"]) if p["status"] == "published" else ""}.{pdf_link(p)}</li>' for p in PUBS)
    field = "".join(f'<li><strong>{e(n)}</strong> — {e(r)}, {e(d)}</li>' for n, r, _, _, d in FIELD)
    awd = "".join(f"<li>{e(t)}</li>" for g in AWARDS for _, t in g[2])
    srv = "".join(f"<li><strong>{e(t)}</strong>, {e(o)}{' (' + e(w) + ')' if w[0].isdigit() else ''}</li>" for w, t, o, _ in LEAD_ROLES)
    srv += "".join(f"<li><strong>{e(r)}</strong>, {e(o)}</li>" for g in VOLUNTEER for r, o in g[2])
    mem = "".join(f"<li>{e(n)} ({e(a)})</li>" for a, n in MEMBERSHIPS)
    trn = "".join(f"<li>{e(t)}, {e(o)} ({e(y)})</li>" for y, t, o in TRAINING)
    skl = "".join(f'<div class="cv-row"><strong>{e(t)}</strong><span class="s">{e(", ".join(x))}</span></div>' for _, t, x in SKILLS)
    body = f"""
{page_hero("020.92 · ALI, M. L.", "CV", "Curriculum <em>vitae</em>.", "The complete record on one page. Use the button to print it or save it as a PDF.")}
<section class="section">
  <div class="container cv-wrap">
    <nav class="cv-toc" aria-label="CV sections">{toc}<button class="btn btn-primary" id="printCv" type="button">{i("fas fa-print")} Print / Save PDF</button></nav>
    <article class="cv-doc reveal">
      <header class="cv-header">
        <div><h2>Md Liton Ali</h2><p>PhD Student in Information Science, University of Arizona</p></div>
        <div class="cv-contact"><a href="mailto:{EMAIL}">{EMAIL}</a><span>{PHONE} (text only)</span><a href="{SITE}">www.litonali.com</a><span>College of Information Science, University of Arizona, Tucson</span></div>
      </header>
      <section class="cv-sec" id="cv-edu"><h3>Education</h3>{edu}</section>
      <section class="cv-sec" id="cv-exp"><h3>Professional Experience</h3>{exp}</section>
      <section class="cv-sec" id="cv-pub"><h3>Publications</h3><ol class="cv-list" style="list-style:none">{pub}</ol></section>
      <section class="cv-sec" id="cv-res"><h3>Research Project</h3><div class="cv-row"><strong>Toward Designing a Zero-Budget Digital Library Framework for School and College Libraries of Bangladesh</strong><span class="d">Ongoing</span><span class="s">A framework that lets libraries in developing and least-developed countries build and maintain digital services at zero cost. Best Paper Award, IIKM 2025.</span></div></section>
      <section class="cv-sec" id="cv-field"><h3>Library Automation &amp; Digitization Projects</h3><ul class="cv-list">{field}</ul></section>
      <section class="cv-sec" id="cv-awd"><h3>Awards, Honors &amp; Scholarships</h3><ul class="cv-list cv-cols">{awd}</ul></section>
      <section class="cv-sec" id="cv-srv"><h3>Service, Leadership &amp; Volunteering</h3><ul class="cv-list">{srv}</ul></section>
      <section class="cv-sec" id="cv-mem"><h3>Professional Memberships</h3><ul class="cv-list cv-cols">{mem}</ul></section>
      <section class="cv-sec" id="cv-trn"><h3>Training &amp; Courses</h3><ul class="cv-list">{trn}</ul></section>
      <section class="cv-sec" id="cv-skl"><h3>Skills</h3>{skl}</section>
    </article>
  </div>
</section>
"""
    return layout("cv.html", "CV", "Curriculum vitae of Md Liton Ali, PhD student in Information Science at the University of Arizona.", body)


# ---------------------------------------------------------------- CONTACT
def contact():
    topics = ["Research collaboration", "Speaking or workshop", "Library automation", "Student inquiry", "Other"]
    tp = "".join(f'<label><input type="checkbox" name="topic" value="{e(t)}"><span>{e(t)}</span></label>' for t in topics)
    body = f"""
{page_hero("025.52 · Reference services", "Contact", "Let's start a <em>conversation</em>.", "Whether it's a research idea, a library that needs to go digital, or a question about my work, I'd love to hear from you.")}
<section class="section">
  <div class="container contact-grid">
    <div class="reveal">
      <span class="callno">Direct lines</span>
      <h2 style="font-size:clamp(1.8rem,3.4vw,2.4rem);margin:.8rem 0 1.4rem">Get in touch</h2>
      <div class="contact-cards">
        <div class="c-card"><i class="fas fa-envelope ic" aria-hidden="true"></i><div><small>Email</small><a href="mailto:{EMAIL}">{EMAIL}</a></div><button class="copy-btn" type="button" data-copy="{EMAIL}" aria-label="Copy email address">{i("far fa-copy")}</button></div>
        <div class="c-card"><i class="fas fa-message ic" aria-hidden="true"></i><div><small>Phone · text only</small><span>{PHONE}</span></div><button class="copy-btn" type="button" data-copy="{PHONE}" aria-label="Copy phone number">{i("far fa-copy")}</button></div>
        <div class="c-card"><i class="fas fa-globe ic" aria-hidden="true"></i><div><small>Website</small><a href="{SITE}">www.litonali.com</a></div><span></span></div>
        <div class="c-card"><i class="fas fa-location-dot ic" aria-hidden="true"></i><div><small>Based at</small><span>College of Information Science, University of Arizona, Tucson, AZ</span></div><span></span></div>
      </div>
      <h3 style="font-size:1.2rem;margin:2rem 0 1rem">Find me online</h3>
      {socials(True)}
    </div>
    <div class="form-card reveal" style="--d:.1s">
      <h2>Send a message</h2>
      <p>I usually reply within a few days.</p>
      <form id="contactForm" action="https://api.web3forms.com/submit" method="POST" novalidate>
        <input type="hidden" name="access_key" value="b020e433-b628-494b-9d45-953abae2e075">
        <input type="hidden" name="from_name" value="Portfolio Contact Form">
        <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">
        <div class="form-grid">
          <div class="fg"><label for="name">Full name <span class="req">*</span></label><input id="name" name="name" type="text" autocomplete="name" required><span class="err">Please enter your name.</span></div>
          <div class="fg"><label for="email">Email address <span class="req">*</span></label><input id="email" name="email" type="email" autocomplete="email" required><span class="err">Please enter a valid email.</span></div>
          <div class="fg"><label for="organization">Organization / institution</label><input id="organization" name="organization" type="text" autocomplete="organization"></div>
          <div class="fg"><label for="subject">Subject <span class="req">*</span></label><input id="subject" name="subject" type="text" required><span class="err">Please add a subject.</span></div>
          <fieldset class="fg full" style="border:0"><legend style="font-size:.88rem;font-weight:600;color:var(--text-2);margin-bottom:.5rem">What is it about?</legend><div class="topics">{tp}</div></fieldset>
          <div class="fg full"><label for="message">Message <span class="req">*</span></label><textarea id="message" name="message" required placeholder="Describe your project, collaboration idea, or inquiry…"></textarea><span class="err">Please write a message.</span></div>
        </div>
        <div class="form-foot"><small>Fields marked * are required.</small><button class="btn btn-primary" type="submit">{i("fas fa-paper-plane")} Send message</button></div>
        <div class="form-status" id="formStatus" role="status" aria-live="polite"></div>
      </form>
    </div>
  </div>
</section>
"""
    return layout("contact.html", "Contact", "Contact Md Liton Ali for research collaboration, speaking, or library digitization projects.", body)


# ---------------------------------------------------------------- SEARCH INDEX
def search_index():
    idx = []
    descs = {"index.html": "Overview and highlights", "about.html": "Bio, journey, skills, education", "research.html": "Interests, project, publications",
             "experience.html": "Roles, field projects, training", "honors.html": "Awards and photo gallery", "service.html": "Leadership, memberships, volunteering",
             "cv.html": "Full curriculum vitae", "contact.html": "Email, phone and message form"}
    for f, n, ic in PAGES:
        idx.append(dict(g="Pages", t=n, s=descs[f], u=f, i=ic, p="Page"))
    for p in PUBS:
        idx.append(dict(g="Publications", t=p["title"], s=f'{p["venue"]} · {p["year"]}', u="research.html#publications", i="fas fa-file-lines", p="Research", k=" ".join(p["tags"])))
    idx.append(dict(g="Research", t="Zero-budget digital library framework", s="Ongoing project · Best Paper IIKM 2025", u="research.html#project", i="fas fa-lightbulb", p="Research"))
    for _, t, d in INTERESTS:
        idx.append(dict(g="Research", t=t, s=d, u="research.html", i="fas fa-flask", p="Research"))
    for x in EXPERIENCE:
        idx.append(dict(g="Experience", t=x["title"], s=f'{x["org"]} · {x["period"]}', u="experience.html", i="fas fa-briefcase", p="Experience"))
    for n, r, _, _, d in FIELD:
        idx.append(dict(g="Field projects", t=n, s=f"{r} · {d}", u="experience.html#field", i="fas fa-building-columns", p="Experience"))
    for y, t, o in TRAINING:
        idx.append(dict(g="Training", t=t, s=f"{o} · {y}", u="experience.html#training", i="fas fa-chalkboard", p="Experience"))
    for d in EDUCATION:
        idx.append(dict(g="Education", t=d["degree"], s=f'{d["org"]} · {d["years"]}', u="about.html#education", i="fas fa-graduation-cap", p="About"))
    for g, _, items in AWARDS:
        for _, t in items:
            idx.append(dict(g="Honors", t=t, s=g, u="honors.html", i="fas fa-award", p="Honors"))
    for a, n in MEMBERSHIPS:
        idx.append(dict(g="Memberships", t=n, s=a, u="service.html#memberships", i="fas fa-id-card", p="Service"))
    for w, t, o, _ in LEAD_ROLES:
        idx.append(dict(g="Service", t=t, s=o, u="service.html", i="fas fa-user-tie", p="Service"))
    for g, _, items in VOLUNTEER:
        for r, o in items:
            idx.append(dict(g="Service", t=r, s=o, u="service.html#volunteer", i="fas fa-hands-helping", p="Service"))
    for _, t, x in SKILLS:
        idx.append(dict(g="Skills", t=t, s=", ".join(x), u="about.html#skills", i="fas fa-screwdriver-wrench", p="About", k=" ".join(x)))
    return idx


if __name__ == "__main__":
    pages = {"index.html": home, "about.html": about, "research.html": research, "experience.html": experience,
             "honors.html": honors, "service.html": service, "cv.html": cv, "contact.html": contact}
    for f, fn in pages.items():
        open(os.path.join(OUT, f), "w", encoding="utf-8").write(fn())
    js = open(os.path.join(HERE, "script.src.js"), encoding="utf-8").read()
    js = re.sub(r"/\*INDEX\*/.*?/\*END\*/", lambda m: json.dumps(search_index(), ensure_ascii=False), js, flags=re.S)
    open(os.path.join(OUT, "script.js"), "w", encoding="utf-8").write(js)
    print("Built 8 pages + script.js into", OUT)
