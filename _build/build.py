# -*- coding: utf-8 -*-
"""Builds the 8 pages + script.js of litonali.com from data.py.
Run from anywhere:  python _build/build.py   (Python 3.8+)
"""
import json, os, re, shutil
from html import escape as e
from data import *

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.environ.get("SITE_OUT") or os.path.dirname(HERE)
FA = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
FONTS = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Source+Sans+3:wght@400;600;700&display=swap"

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
TYPE_LABEL = {"journal": "Journal article", "conference": "Conference paper", "review": "Under review"}
PUBLISHED = [p for p in PUBS if p["type"] != "review"]
RESPONDENTS = sum(p.get("n", 0) for p in PUBS)


def ic(cls):
    return '<i class="%s" aria-hidden="true"></i>' % cls


def arrow():
    return '<span class="arr">%s</span>' % ic("fas fa-arrow-right")


def soc():
    return '<div class="soc">' + "".join(
        '<a href="%s" target="_blank" rel="noopener" aria-label="%s">%s</a>' % (u, e(n), ic(c)) for n, c, u in SOCIALS) + "</div>"


def split(text, start=0):
    out, i = [], start
    for ch in text:
        if ch == " ":
            out.append(" ")
        else:
            out.append('<span class="ch" style="--i:%d">%s</span>' % (i, e(ch)))
        i += 1
    return "".join(out)


def apa(p):
    yr = p["year"] or "n.d."
    if p["type"] == "journal":
        s = "%s (%s). %s. <em>%s</em>, %s." % (p["authors"], yr, p["title"], p["venue"], p["details"])
    elif p["type"] == "conference":
        s = "%s (%s). %s. In <em>%s</em>%s." % (p["authors"], yr, p["title"], p["venue"], (", " + p["details"]) if p["details"] else "")
    else:
        s = "%s (%s). %s. Manuscript under review." % (p["authors"], yr, p["title"])
    if p.get("doi"):
        s += " https://doi.org/" + p["doi"]
    return s


def bib(p):
    key = "ali%s%s" % (p["year"] or "nd", re.sub(r"[^a-z]", "", p["title"].split()[0].lower()))
    auth = p["authors"].replace(", &", " and").replace("&", "and")
    names = [a.strip() for a in re.split(r"\.,\s*(?=[A-Z][a-z])| and ", auth)]
    kind = "article" if p["type"] == "journal" else "inproceedings"
    fields = ["  title = {%s}" % p["title"], "  author = {%s}" % " and ".join(n.strip().rstrip(".") + "." for n in names), "  year = {%s}" % (p["year"] or "")]
    fields.append(("  journal = {%s}" if kind == "article" else "  booktitle = {%s}") % p["venue"])
    m = re.match(r"(\d+)\((\d+|[^)]*)\),\s*([\d–-]+)", p.get("details") or "")
    if m:
        fields += ["  volume = {%s}" % m.group(1), "  number = {%s}" % m.group(2), "  pages = {%s}" % m.group(3).replace("–", "--")]
    if p.get("doi"):
        fields.append("  doi = {%s}" % p["doi"])
    return "@%s{%s,\n%s\n}" % (kind, key, ",\n".join(fields))


def theme_tags(p):
    return "".join('<span class="tag"><span class="tag-dot" style="--c:%s"></span>%s</span>' % (THEMES[t]["color"], e(THEMES[t]["name"])) for t in p["themes"])


# ---------------------------------------------------------------- layout
def layout(file, title, desc, body, cta=True, extra_head=""):
    cur = ' aria-current="page"'
    nav = "".join('<a href="%s"%s>%s</a>' % (f, cur if f == file else "", e(n)) for f, n, _ in PAGES[1:])
    ov = "".join('<a href="%s"%s><small>0%d</small>%s</a>' % (f, cur if f == file else "", k, e(n)) for k, (f, n, _) in enumerate(PAGES))
    full = "%s — Md Liton Ali" % title if file != "index.html" else "Md Liton Ali — Information Science, University of Arizona"
    url = SITE + "/" + ("" if file == "index.html" else file)
    mega = ""
    if cta:
        mega = """<section class="mega"><div class="wrap">
  <span class="eyebrow rv">Open to collaboration</span>
  <h2 class="rv" style="margin-top:1rem">Collaboration &amp; <em>correspondence</em></h2><p class="mega-p">I welcome conversations about research collaboration, scholarly communication, AI in higher education and library digitization.</p>
  <div class="mega-row rv" style="--d:.2s">
    <a class="mega-mail" href="mailto:%s">%s %s</a>
    <div style="display:flex;gap:.6rem;flex-wrap:wrap"><a class="btn" href="contact.html">Start a conversation %s</a><a class="btn btn-ghost" href="cv.html">View CV</a></div>
  </div>
</div></section>""" % (EMAIL, EMAIL, ic("fas fa-arrow-right"), arrow())
    flinks = "".join('<li><a href="%s">%s</a></li>' % (f, e(n)) for f, n, _ in PAGES[1:])
    fsoc = "".join('<li><a href="%s" target="_blank" rel="noopener">%s</a></li>' % (u, e(n)) for n, c, u in SOCIALS[:4])
    return """<!DOCTYPE html>
<html lang="en" class="no-js" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{full}</title>
<meta name="description" content="{desc}">
<meta name="author" content="Md Liton Ali">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website"><meta property="og:title" content="{full}"><meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}"><meta property="og:image" content="{site}/images/og-headshot.jpg">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@3srliton">
<meta name="theme-color" content="#1c2b45">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{fonts}" rel="stylesheet">
<link href="{fa}" rel="stylesheet">
<link rel="stylesheet" href="style.css">
{extra}</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"></div>
<header class="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html" aria-label="Md Liton Ali, home"><span class="mono-mark"><b>L</b></span><span class="brand-name">Md Liton Ali<small>PhD · Information Science</small></span></a>
    <nav class="nav-links" aria-label="Main">{nav}</nav>
    <div class="nav-tools">
      <button class="search-pill" type="button" data-palette aria-label="Search the site">{search}<span class="lbl">Search</span><span class="kbd">Ctrl K</span></button>
      <button class="icon-btn menu-btn" id="menuToggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="overlay"><i class="fas fa-bars-staggered" aria-hidden="true"></i></button>
    </div>
  </div>
</header>
<div class="overlay" id="overlay" aria-hidden="true"><nav aria-label="Mobile">{ov}</nav><div class="overlay-foot"><a href="mailto:{email}">{email}</a><span data-localtime></span></div></div>
<main id="main">
{body}
{mega}
</main>
<footer class="footer">
  <div class="wrap">
    <div class="f-grid">
      <div><a class="brand" href="index.html"><span class="mono-mark"><b>L</b></span><span class="brand-name">Md Liton Ali</span></a>
        <p>PhD student in Information Science at the University of Arizona, researching the science of science and AI in higher education.</p>{soc}</div>
      <div><h4>Pages</h4><ul>{flinks}</ul></div>
      <div><h4>Elsewhere</h4><ul>{fsoc}</ul></div>
      <div><h4>Contact</h4><ul><li><a href="mailto:{email}">{email}</a></li><li><a href="contact.html">Send a message</a></li><li><span class="local-time" data-localtime style="color:var(--muted)"></span></li></ul></div>
    </div>
    <div class="f-bottom"><span>&copy; <span data-year>2026</span> Md Liton Ali</span><span>Press <span class="kbd">/</span> to search everything</span><a href="#main">Back to top ↑</a></div>
  </div>
</footer>
<div class="palette" id="palette" role="dialog" aria-modal="true" aria-label="Search the site" aria-hidden="true">
  <div class="palette-box">
    <div class="palette-in">{search}<input type="text" placeholder="Search papers, roles, awards, pages…" aria-label="Search" role="combobox" aria-expanded="true" aria-controls="plist-pal" autocomplete="off"><span class="kbd">Esc</span></div>
    <div class="palette-list" id="plist-pal" role="listbox"></div>
    <div class="pal-foot"><span><span class="kbd">↑↓</span> move</span><span><span class="kbd">Enter</span> open</span><span><span class="kbd">Esc</span> close</span></div>
  </div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="script.js" defer></script>
</body>
</html>
""".format(full=e(full), desc=e(desc), url=url, site=SITE, fonts=FONTS, fa=FA, extra=extra_head, nav=nav, ov=ov,
           search=ic("fas fa-magnifying-glass"), email=EMAIL, body=body, mega=mega, soc=soc(), flinks=flinks, fsoc=fsoc)


def phero(crumb, eyebrow, title_html, lede, meta=None):
    m = ""
    if meta:
        m = '<div class="phero-meta fade-up" style="--d:.55s">' + "".join('<div><strong>%s</strong><span>%s</span></div>' % (v, e(l)) for v, l in meta) + "</div>"
    return """<section class="phero">
  <div class="wrap">
    <div class="crumbs fade-up" style="--d:.1s"><a href="index.html">Home</a><span>/</span><span>%s</span></div>
    <div class="fade-up" style="--d:.2s;margin-top:1.6rem"><span class="eyebrow">%s</span></div>
    <h1 class="fade-up" style="--d:.3s">%s</h1>
    <p class="lede fade-up" style="--d:.42s">%s</p>
    %s
  </div>
</section>""" % (e(crumb), e(eyebrow), title_html, lede, m)


def head(eyebrow, title_html, sub=None, side=""):
    s = ""
    if sub or side:
        s = '<div class="side rv" style="--d:.1s">%s%s</div>' % ("<p>%s</p>" % sub if sub else "", side)
    return '<div class="sec-head"><div><span class="eyebrow">%s</span><h2>%s</h2></div>%s</div>' % (e(eyebrow), title_html, s)


def theme_cards(with_counts=True):
    out = []
    for k, (tid, t) in enumerate(THEMES.items()):
        n = sum(1 for p in PUBS if tid in p["themes"])
        cls = "lead" if t["lead"] else "sub"
        badge = '<span class="lead-badge">Lead focus</span>' if t["lead"] else '<span class="lead-badge">Related</span>'
        art = ""
        if False:
            art = '<svg class="theme-art" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="%s" stroke-width="1">%s</g></svg>' % (
                t["color"], "".join('<circle cx="100" cy="100" r="%d" opacity="%.2f"/>' % (r, 1 - r / 110) for r in range(14, 110, 14)))
        out.append("""<a class="spot theme-card %s rv" href="research.html#publications" style="--c:%s;--d:%.2fs">%s
  <div class="row"><span class="ic">%s</span>%s</div>
  <div><h3>%s</h3><p style="margin-top:.8rem">%s</p></div>
  <div class="row"><span class="cnt">%d work%s</span><span class="cnt">0%d</span></div>
</a>""" % (cls, t["color"], k * 0.06, art, ic(t["icon"]), badge, e(t["name"]), e(t["blurb"]), n, "" if n == 1 else "s", k + 1))
    return '<div class="themes">%s</div>' % "".join(out)


def now_list():
    rows = ""
    for k, n in enumerate(NOW):
        c = THEMES[n["theme"]]["color"]
        rows += """<div class="now-row rv" style="--c:%s;--d:%.2fs"><span class="now-st"><span class="pulse"></span>%s</span><h3>%s</h3><p>%s</p><span class="go">%s</span></div>""" % (
            c, k * 0.06, e(n["status"]), e(n["title"]), e(n["text"]), ic("fas fa-arrow-right"))
    return '<div class="now">%s</div>' % rows


# ---------------------------------------------------------------- HOME
def home():
    recent = sorted(PUBLISHED, key=lambda x: -x["year"])[:4]
    plist = ""
    for k, p in enumerate(recent):
        aw = ' <span class="tag tag--award">%s</span>' % e(p["award"]) if p.get("award") else ""
        plist += '<li class="rv"><span class="pl-yr">%s</span><div><a href="research.html#%s">%s</a><p class="pl-meta">%s · <em>%s</em>%s</p></div></li>' % (
            p["year"], p["id"], e(p["title"]), e(p["authors"]), e(p["venue"]), aw)
    chron = "".join('<li class="rv"><span class="c-yr">%s</span><h3>%s</h3><p>%s</p></li>' % (e(y), e(t), e(d)) for y, t, d, kk in JOURNEY)
    stats = [("100K+", "Library items catalogued and managed"), ("15+", "Libraries automated across Bangladesh"),
             (str(RESPONDENTS), "Survey respondents across published studies"), ("16", "Awards, medals and scholarships")]
    st = "".join('<div class="stat rv"><div class="num">%s</div><p class="lbl">%s</p></div>' % (v, e(l)) for v, l in stats)
    explore = [
        ("research.html", "Research", "Publications, research map and current projects.", "iikm4b"),
        ("about.html", "About", "Biography, skills and education.", "headshot-ash"),
        ("experience.html", "Experience", "Teaching, cataloguing and field projects.", "kohat"),
        ("honors.html", "Honors", "Medals, scholarships and gallery.", "gold"),
        ("service.html", "Service", "Leadership, memberships and volunteering.", "sympo"),
        ("cv.html", "Curriculum Vitae", "The complete record on one page.", "iikm3"),
    ]
    ex = "".join('<a class="ex rv" href="%s"><div class="ex-img"><img src="images/web/%s.webp" alt="" loading="lazy"></div><div class="ex-body"><h3>%s</h3><p>%s</p><span class="link-u">View %s</span></div></a>' % (
        f, img, e(t), e(d), ic("fas fa-arrow-right")) for f, t, d, img in explore)
    links = "".join('<a href="%s" target="_blank" rel="noopener">%s</a>' % (u, e(n)) for n, c, u in [SOCIALS[1], SOCIALS[0], SOCIALS[2]])
    body = """
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">PhD Student · Information Science · University of Arizona</p>
      <h1>Md Liton Ali</h1>
      <p class="hero-sub">Researcher in the science of science and AI in higher education</p>
      <p class="hero-lede">I study how scholarly knowledge is produced, published and accessed, and how generative AI is reshaping universities, publishers and libraries. My research builds on nearly a decade of library automation and digital service work in Bangladesh.</p>
      <div class="hero-actions"><a class="btn" href="research.html">View research</a><a class="btn btn-ghost" href="cv.html">Curriculum vitae</a></div>
      <p class="hero-links"><a href="mailto:{email}">{email}</a>{links}</p>
    </div>
    <div class="stage">
      <figure class="portrait-frame"><img src="images/web/headshot-ash.webp" alt="Portrait of Md Liton Ali" width="880" height="1100" fetchpriority="high"></figure>
      <ul class="hero-facts" aria-label="Highlights">
        <li><span>Best Paper Award</span><span>IIKM 2025</span></li>
        <li><span>Chair-Elect</span><span>ASIS&amp;T SIG-AVC</span></li>
        <li><span>Gold Medalist</span><span>University of Dhaka</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="sec sec--tight band">
  <div class="wrap statement rv">
    <p class="eyebrow">Research statement</p>
    <blockquote>I study how knowledge is produced, shared and accessed, and how generative AI is reshaping universities, publishers and libraries. A decade of automating libraries in Bangladesh taught me that access changes everything.</blockquote>
    <a class="link-u" href="about.html">Read my biography {ar}</a>
  </div>
</section>

<section class="sec sec--tight"><div class="wrap"><div class="stats">{stats}</div></div></section>

<section class="sec">
  <div class="wrap">
    {h1}
    {themes}
  </div>
</section>

<section class="sec band">
  <div class="wrap">
    {h2}
    <ol class="publist">{plist}</ol>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    {h3}
    {now}
  </div>
</section>

<section class="sec band">
  <div class="wrap">
    {h4}
    <ol class="chron">{chron}</ol>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    {h5}
    <div class="explore">{ex}</div>
  </div>
</section>
""".format(email=EMAIL, links=links, ar=ic("fas fa-arrow-right"), stats=st,
           h1=head("Research focus", "Areas of inquiry", "My doctoral research centres on the science of science and AI in higher education, with related work in information behavior, misinformation and digital libraries."),
           themes=theme_cards(),
           h2=head("Publications", "Recent work", None, '<a class="btn btn-ghost" href="research.html#publications">All publications</a>'), plist=plist,
           h3=head("Current projects", "Work in progress"), now=now_list(),
           h4=head("Timeline", "Academic and professional path"), chron=chron,
           h5=head("Explore", "More about my work"), ex=ex)
    ld = {"@context": "https://schema.org", "@type": "Person", "name": "Md Liton Ali", "url": SITE, "image": SITE + "/images/og-headshot.jpg",
          "jobTitle": "PhD Student, Information Science", "affiliation": {"@type": "CollegeOrUniversity", "name": "University of Arizona"},
          "alumniOf": {"@type": "CollegeOrUniversity", "name": "University of Dhaka"}, "email": "mailto:" + EMAIL,
          "sameAs": [u for _, _, u in SOCIALS], "knowsAbout": [t["name"] for t in THEMES.values()]}
    return layout("index.html", "Home", "Md Liton Ali is a PhD student in Information Science at the University of Arizona researching the science of science and AI in higher education.", body,
                  extra_head='<script type="application/ld+json">%s</script>\n<link rel="preload" as="image" href="images/web/headshot-ash.webp">\n' % json.dumps(ld))


# ---------------------------------------------------------------- RESEARCH
def research():
    years = sorted({p["year"] for p in PUBLISHED})
    yc = {y: sum(1 for p in PUBLISHED if p["year"] == y) for y in years}
    mx = max(yc.values())
    bars = '<div class="yearbars" aria-label="Published works per year">' + "".join(
        '<div class="yb"><div class="bar" data-h="%dpx">%d</div><span>%d</span></div>' % (int(yc[y] / mx * 104), yc[y], y) for y in years) + "</div>"
    pubs = ""
    order = sorted(PUBS, key=lambda p: (p["type"] == "review", -(p["year"] or 0)))
    for k, p in enumerate(order):
        c = THEMES[p["themes"][0]]["color"]
        tags = '<span class="tag">%s</span>' % TYPE_LABEL[p["type"]]
        if p.get("award"):
            tags = '<span class="tag tag--award">%s %s</span>' % (ic("fas fa-medal"), e(p["award"])) + tags
        tags += theme_tags(p)
        meta = "%s · <em>%s</em>%s" % (e(p["authors"]), e(p["venue"]), (", " + e(p["details"])) if p["details"] else "")
        left = '<div><h4>What it asks</h4><p>%s</p>' % e(p["summary"])
        if p.get("method"):
            left += '<h4 style="margin-top:1.4rem">Approach</h4><p>%s</p>' % e(p["method"])
        if p.get("n"):
            left += '<div class="pub-n"><b>%d</b><span>respondents</span></div>' % p["n"]
        left += "</div>"
        right = "<div>"
        if p.get("findings"):
            right += "<h4>Key findings</h4><ul>%s</ul>" % "".join("<li>%s</li>" % e(f) for f in p["findings"])
        else:
            right += "<h4>Status</h4><p>%s</p>" % ("Presented at the conference; full findings are in the paper." if p["type"] == "conference" else "Currently under peer review.")
        right += "</div>"
        acts = ""
        if p.get("url"):
            acts += '<a class="act act--lime" href="%s" target="_blank" rel="noopener">%s Read paper</a>' % (e(p["url"]), ic("fas fa-arrow-up-right-from-square"))
        if p.get("doi"):
            acts += '<a class="act" href="https://doi.org/%s" target="_blank" rel="noopener">DOI %s</a>' % (p["doi"], e(p["doi"]))
        if p["type"] != "review":
            acts += '<button class="act" type="button" data-cite="apa" data-id="%s">%s Copy APA</button><button class="act" type="button" data-cite="bib" data-id="%s">%s BibTeX</button>' % (p["id"], ic("far fa-copy"), p["id"], ic("fas fa-code"))
        acts += '<a class="act" href="%s" target="_blank" rel="noopener">%s Google Scholar</a>' % (SCHOLAR, ic("fas fa-graduation-cap"))
        pubs += """<article class="pub rv" id="{id}" data-type="{type}" data-themes="{themes}" style="--c:{c};--d:{d:.2f}s">
  <button class="pub-head" type="button" aria-expanded="false" aria-controls="{id}-b">
    <div class="pub-yr">{yr}<small>{tl}</small></div>
    <div><h3 class="pub-title">{title}</h3><p class="pub-meta">{meta}</p><div class="pub-tags">{tags}</div></div>
    <span class="pub-toggle">{plus}</span>
  </button>
  <div class="pub-body" id="{id}-b"><div><div class="pub-inner">{left}{right}<div class="pub-actions">{acts}</div></div></div></div>
</article>""".format(id=p["id"], type=p["type"], themes=" ".join(p["themes"]), c=c, d=min(k, 4) * 0.05, yr=p["year"] or "—", tl={"journal": "Journal", "conference": "Conference", "review": "In review"}[p["type"]],
                     title=e(p["title"]), meta=meta, tags=tags, plus=ic("fas fa-plus"), left=left, right=right, acts=acts)
    tchips = "".join('<button class="chip-btn" type="button" data-ftheme="%s" aria-pressed="false"><span class="tag-dot" style="--c:%s"></span>%s<sup>%d</sup></button>' % (
        tid, t["color"], e(t["name"]), sum(1 for p in PUBS if tid in p["themes"])) for tid, t in THEMES.items())
    ftypes = [("all", "All", len(PUBS)), ("journal", "Journal", sum(1 for p in PUBS if p["type"] == "journal")),
              ("conference", "Conference", sum(1 for p in PUBS if p["type"] == "conference")), ("review", "Under review", 1)]
    fchips = "".join('<button class="chip-btn" type="button" data-ftype="%s" aria-pressed="%s">%s<sup>%d</sup></button>' % (k, "true" if k == "all" else "false", l, n) for k, l, n in ftypes)
    legend = "".join('<span class="tag"><span class="tag-dot" style="--c:%s"></span>%s</span>' % (t["color"], e(t["short"])) for t in THEMES.values())
    body = """
{hero}
<section class="sec band">
  <div class="wrap">
    {h1}
    <div class="universe-wrap rv">
      <span class="u-hint">Hover to trace links · click a paper to open it</span>
      <svg class="universe" id="universe" role="img" aria-label="Interactive map linking each paper to its research themes"></svg>
      <div class="u-tip" id="utip"></div>
      <div class="u-legend">{legend}</div>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">{h2}{themes}</div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="feature">
      <div class="feature-media rv-clip"><img src="images/web/iikm4b.webp" alt="Md Liton Ali receiving the Best Paper Award at IIKM" loading="lazy"><span class="badge tag tag--lime">{medal} Best Paper · IIKM 2025</span></div>
      <div class="rv" style="--d:.1s">
        <span class="eyebrow">Award-winning work</span>
        <h2>GenAI: stay out of it, or find a <em class="hl">suitable way</em> in?</h2>
        <p>A policy review of how academic publishers and universities are responding to generative AI. It asks whether institutions should keep GenAI out of scholarship altogether or find suitable ways to incorporate it, and it won the Best Paper Award at the International Conference on Information and Knowledge Management (IIKM) in 2025.</p>
        <ul class="checks"><li>{chk}<span>Bridges both lead themes: AI in higher education and the science of science</span></li><li>{chk}<span>Covers both sides of scholarship: publishers and universities</span></li><li>{chk}<span>Published in the IIKM proceedings, 4(1), 65–66</span></li></ul>
        <a class="btn" href="#genai-policy" data-open="genai-policy">Read the summary {arr}</a>
      </div>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">{h3}{now}</div>
</section>

<section class="sec" id="publications" style="padding-top:0">
  <div class="wrap">
    {h4}
    <div class="p-tools rv">
      <div class="chips" role="group" aria-label="Filter by type">{fchips}</div>
      <label class="search-field"><span class="sr-only">Search publications</span>{search}<input id="pq" type="search" placeholder="Search titles, venues, methods…"></label>
    </div>
    <div class="p-tools rv" style="margin-top:-.6rem"><div class="chips" role="group" aria-label="Filter by theme">{tchips}</div><span class="p-count" id="pcount" aria-live="polite"></span></div>
    <div class="plist" id="plist">{pubs}</div>
    <p class="empty" id="pempty">No works match that filter.</p>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    {h5}
    <div class="grid g3">
      <div class="spot box rv"><span class="ic">{i1}</span><h3>Zero-budget digital libraries</h3><p>An ongoing framework that lets school and college libraries build digital services with free tools and minimal technical skill.</p></div>
      <div class="spot box rv" style="--d:.06s"><span class="ic">{i2}</span><h3>Peer reviewer</h3><p>Global Knowledge, Memory and Communication, Emerald Publishing.</p></div>
      <a class="spot box rv" style="--d:.12s" href="{scholar}" target="_blank" rel="noopener"><span class="ic">{i3}</span><h3>Google Scholar</h3><p>Follow new work and citations as they appear. Interests: Information Behavior, Science of Science, Fake News, Artificial Intelligence, Education.</p></a>
    </div>
  </div>
</section>
""".format(
        hero=phero("Research", "Research", "Making knowledge <em>reachable</em>.", "I study how scholarship is produced, published and accessed, and how generative AI is changing the university. Click any paper to see what it asks, how, and what it found.",
                   [(str(len(PUBS)), "Papers & manuscripts"), (str(RESPONDENTS), "Survey respondents"), ("2", "Lead research themes"), ("1", "Best Paper Award")]),
        h1=head("Research map", "A living <em>map</em> of my work", "Every paper is linked to the themes it speaks to. Hover to trace connections; click a paper to open it below."),
        legend=legend, h2=head("Themes", "What I <em>study</em>"), themes=theme_cards(), medal=ic("fas fa-medal"), chk=ic("fas fa-check"), arr=arrow(),
        h3=head("Now", "Work in <em>progress</em>"), now=now_list(),
        h4=head("Publications", "Papers &amp; <em>proceedings</em>", "Expand any entry for a plain-language summary, method and findings, plus one-click APA and BibTeX.", bars),
        fchips=fchips, tchips=tchips, search=ic("fas fa-magnifying-glass"), pubs=pubs,
        h5=head("Beyond papers", "Also in the <em>lab</em>"), i1=ic("fas fa-book-open-reader"), i2=ic("fas fa-pen-nib"), i3=ic("fas fa-graduation-cap"), scholar=SCHOLAR)
    return layout("research.html", "Research", "Research by Md Liton Ali: science of science, AI in higher education, publications with summaries, and an interactive research map.", body)


# ---------------------------------------------------------------- ABOUT
def about():
    facts = [("PhD", "Information Science, U of Arizona"), ("10 yrs", "In library & information science"), ("15+", "Libraries automated"), ("3.97", "Masters CGPA · Gold Medal")]
    fx = "".join('<div class="fact rv" style="--d:%.2fs"><strong>%s</strong><span>%s</span></div>' % (k * .06, e(a), e(b)) for k, (a, b) in enumerate(facts))
    sk = "".join('<div class="spot skill-col rv" style="--d:%.2fs"><h3>%s%s</h3><div class="pills">%s</div></div>' % (k * .08, ic(c), e(t), "".join('<span class="pill">%s</span>' % e(x) for x in tags)) for k, (c, t, tags) in enumerate(SKILLS))
    deg = ""
    for d in EDUCATION:
        seal = '<img src="%s" alt="" loading="lazy">' % d["seal"] if d["seal"] else e(d["abbr"])
        title = e(d["degree"]).replace("PhD", "<em>PhD</em>") if d["current"] else e(d["degree"])
        deg += '<div class="deg rv%s"><span class="yrs">%s</span><span class="seal">%s</span><div><h3>%s</h3><p>%s</p></div><span class="tag%s">%s</span></div>' % (
            " current" if d["current"] else "", e(d["years"]), seal, title, e(d["org"]), " tag--lime" if d["current"] else "", e(d["badge"]))
    hl = [("fas fa-diagram-project", "Science of science", "Webometrics of LibGen and Sci-Hub; a policy review of GenAI across publishers and universities."),
          ("fas fa-microchip", "AI in higher education", "E-learning acceptance, AI chatbots for library support, and AI's effect on student performance."),
          ("fas fa-server", "Library technologist", "Deployed Koha-ILS and RFID at IUT; contributed to 15+ automation projects with DSpace, SLiMS and Greenstone."),
          ("fas fa-people-group", "Community builder", "Chair-Elect of ASIS&T SIG-AVC, student association president, and blood donor 12+ times.")]
    h = "".join('<div class="spot box rv" style="--d:%.2fs"><span class="ic">%s</span><h3>%s</h3><p>%s</p></div>' % (k * .06, ic(c), e(t), e(d)) for k, (c, t, d) in enumerate(hl))
    body = """
{hero}
<section class="sec">
  <div class="wrap bio">
    <div class="bio-photo rv"><div class="frame"><img src="images/web/headshot-ash.webp" alt="Portrait of Md Liton Ali" width="880" height="1100"></div><div class="cap"><span>Tucson, Arizona</span><span>2026</span></div></div>
    <div class="bio-text">
      <span class="eyebrow rv">Biography</span>
      <p class="lead rv">Md Liton Ali is a PhD student in Information Science at the <em>University of Arizona</em>, studying how knowledge moves, and how AI is changing that.</p>
      <p class="rv">His doctoral research centres on the <strong>science of science</strong> and <strong>AI in higher education</strong>: how scholarship is published and accessed, how universities and publishers govern generative AI, and how AI tools affect the way students learn and perform. He also serves as a Graduate Teaching Associate for INFO 557: Neural Networks.</p>
      <p class="rv">Before the PhD, he spent nearly a decade across <strong>more than 15 library and information institutions</strong> in Bangladesh. At the <strong>Islamic University of Technology (IUT)</strong> he served as Assistant Cataloguer and later in the International Affairs and External Communication Office, deploying Koha-ILS, redesigning the library's digital presence, managing 100,000+ items and supporting international students.</p>
      <p class="rv">He holds Bachelor's and Master's degrees in Information Science and Library Management from the University of Dhaka (Masters CGPA 3.97/4.00), where he received the Mohammad Shahidullah Memorial Gold Medal, the Dean's Award of Honour at both degree levels and the Provost Award of Academic Excellence. His policy review of generative AI across academic publishers and universities won the <strong>Best Paper Award at IIKM 2025</strong>.</p>
      <div class="facts">{fx}</div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:2rem" class="rv"><a class="btn" href="research.html">Research {arr}</a><a class="btn btn-ghost" href="cv.html">Full CV</a></div>
    </div>
  </div>
</section>
<section class="sec" style="padding-top:0"><div class="wrap">{h1}<div class="grid g4">{h}</div></div></section>
<section class="sec" id="skills" style="padding-top:0"><div class="wrap">{h2}<div class="skills">{sk}</div></div></section>
<section class="sec" id="education" style="padding-top:0"><div class="wrap">{h3}<div class="degrees">{deg}</div></div></section>
""".format(hero=phero("About", "Biography", "Libraries, data<br>&amp; <em>people</em>.", "From cataloguing 100,000 books in Bangladesh to researching the science of science in Arizona: the person behind the papers.", [("10", "Years in LIS"), ("15+", "Institutions"), ("3.97", "Masters CGPA")]),
           fx=fx, arr=arrow(), h1=head("Highlights", "What I <em>bring</em>"), h=h, h2=head("Toolkit", "Skills &amp; <em>methods</em>"), sk=sk, h3=head("Education", "Where I <em>trained</em>"), deg=deg)
    return layout("about.html", "About", "Biography, skills and education of Md Liton Ali, PhD student in Information Science at the University of Arizona.", body)


# ---------------------------------------------------------------- EXPERIENCE
def experience():
    xp = ""
    for k, x in enumerate(EXPERIENCE):
        xp += """<div class="xp-item rv"><button class="xp-head" type="button" aria-expanded="%s" aria-controls="x%d"><span class="per">%s%s</span><div><h3>%s</h3><p class="xp-org">%s</p></div><span class="tog">%s</span></button>
<div class="xp-body" id="x%d"><div><ul>%s</ul></div></div></div>""" % ("true" if k == 0 else "false", k, '<span class="pulse"></span>' if x["current"] else "", e(x["period"]), e(x["title"]), e(x["org"]), ic("fas fa-plus"), k, "".join("<li>%s</li>" % e(p) for p in x["points"]))
    y0, y1 = 2017, 2025
    yrs = y1 - y0; span = yrs * 12
    rows = ""
    for k, (n, r, (sy, sm), (ey, em), d) in enumerate(FIELD):
        left = ((sy - y0) * 12 + sm - 1) / span * 100
        width = ((ey - sy) * 12 + em - sm + 1) / span * 100
        rows += '<div class="g-row"><div class="g-label">%s<small>%s · %s</small></div><div class="g-track" role="img" aria-label="%s: %s"><span class="g-bar%s" style="--i:%d;left:%.2f%%;width:%.2f%%"></span></div></div>' % (
            e(n), e(r), e(d), e(n), e(d), " coord" if r == "Project Coordinator" else "", k, left, width)
    tr = "".join('<div class="spot train rv" style="--d:%.2fs"><span class="yr">%s</span><h4>%s</h4><p>%s</p></div>' % ((k % 4) * .05, e(y), e(t), e(o)) for k, (y, t, o) in enumerate(TRAINING))
    body = """
{hero}
<section class="sec"><div class="wrap">{h1}<div class="xp">{xp}</div></div></section>
<section class="sec" id="field" style="padding-top:0"><div class="wrap">{h2}
  <div class="spot gantt rv" style="--years:{yrs}"><div class="g-scale"><span></span><div class="g-years" style="--years:{yrs}">{scale}</div></div>{rows}
  <div class="g-legend"><span><i></i>Project Executive / Member</span><span><i class="coord"></i>Project Coordinator</span></div></div>
</div></section>
<section class="sec" id="training" style="padding-top:0"><div class="wrap">{h3}<div class="train-grid">{tr}</div></div></section>
""".format(hero=phero("Experience", "Career", "Practice that turns libraries <em>digital</em>.", "Teaching neural networks in Arizona, cataloguing 100,000 items in Bangladesh, and automating a dozen libraries along the way.", [("5", "Roles"), ("12", "Field projects"), ("12", "Trainings")]),
           h1=head("Roles", "Where I've <em>worked</em>", None, '<button class="btn btn-ghost" id="expandAll" type="button"><span>Expand all</span></button>'), xp=xp,
           h2=head("Field engagement", "Twelve libraries, <em>one</em> timeline", "Automation and digitization projects from 2017 to 2024."), yrs=yrs,
           scale="".join("<span>%d</span>" % y for y in range(y0, y1)), rows=rows, h3=head("Learning", "Training &amp; <em>courses</em>"), tr=tr)
    return layout("experience.html", "Experience", "Professional experience, library automation projects and training of Md Liton Ali.", body)


# ---------------------------------------------------------------- HONORS
def honors():
    total = sum(len(g[2]) for g in AWARDS)
    medals = [("fas fa-medal", "Gold Medal", "Mohammad Shahidullah Memorial Gold Medal, top of the Masters cohort, University of Dhaka."),
              ("fas fa-file-lines", "Best Paper, IIKM 2025", "For the policy review of generative AI across academic publishers and universities."),
              ("fas fa-trophy", "Dean's Award", "Dean's Merit List of Honour at both the Bachelor's and Master's levels, alongside the Provost Award of Academic Excellence.")]
    md = "".join('<div class="spot medal rv" style="--d:%.2fs">%s<div><h3>%s</h3><p>%s</p></div></div>' % (k * .08, ic(c), e(t), e(d)) for k, (c, t, d) in enumerate(medals))
    aw = "".join('<div class="spot aw rv" style="--d:%.2fs"><h3>%s<small>%02d</small></h3><ul>%s</ul></div>' % (k * .06, e(g), len(items), "".join("<li>%s<span>%s</span></li>" % (ic(c), e(t)) for c, t in items)) for k, (g, _, items) in enumerate(AWARDS))
    gal = "".join('<button class="shot rv" type="button" data-full="images/web/%s.webp" data-title="%s" data-desc="%s"><img src="images/web/%s.webp" alt="%s" loading="lazy"><div class="cap"><h4>%s</h4><p>%s</p></div></button>' % (
        f, e(t), e(d), f, e(t), e(t), e(d)) for f, t, d in GALLERY)
    body = """
{hero}
<section class="sec"><div class="wrap">{h1}<div class="medals">{md}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap">{h2}<div class="awards">{aw}</div></div></section>
<section class="sec" id="gallery" style="padding-top:0"><div class="wrap">{h3}<div class="gallery">{gal}</div></div></section>
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" aria-hidden="true">
  <button class="lb-btn lb-close" type="button" aria-label="Close">{x}</button><button class="lb-btn lb-prev" type="button" aria-label="Previous">{l}</button><button class="lb-btn lb-next" type="button" aria-label="Next">{r}</button>
  <figure><img src="" alt=""><figcaption><h4></h4><p></p></figcaption></figure>
</div>
""".format(hero=phero("Honors", "Recognition", "Recognized for <em>excellence</em>.", "Medals, merit awards and scholarships for academic work, research and service.", [(str(total), "Awards & scholarships"), ("1", "Gold Medal"), ("12+", "Blood donations")]),
           h1=head("Signature", "The <em>big</em> three"), md=md, h2=head("All honors", "Every <em>award</em>"), aw=aw,
           h3=head("Gallery", "Milestones &amp; <em>memories</em>", "Select a photo to view it full screen."), gal=gal, x=ic("fas fa-xmark"), l=ic("fas fa-chevron-left"), r=ic("fas fa-chevron-right"))
    return layout("honors.html", "Honors", "Awards, honors, scholarships and milestone photos of Md Liton Ali.", body)


# ---------------------------------------------------------------- SERVICE
def service():
    roles = "".join('<div class="spot role%s rv" style="--d:%.2fs"><span class="when">%s</span><div><h3>%s</h3><p>%s</p></div></div>' % (" lead" if lead else "", k * .07, e(w), e(t), e(o)) for k, (w, t, o, lead) in enumerate(LEAD_ROLES))
    def logo(abbr):
        slug = re.sub(r"[^a-z]", "", abbr.lower().replace("&", "and"))
        for ext in ("svg", "png", "webp", "jpg", "jpeg"):
            p = os.path.join("images", "logos", "%s.%s" % (slug, ext))
            if os.path.exists(os.path.join(OUT, p)):
                return '<span class="ab ab--img"><img src="%s" alt="%s logo" loading="lazy"></span>' % (p.replace(os.sep, "/"), e(abbr))
        return '<span class="ab">%s</span>' % e(abbr)
    orgs = "".join('<div class="org rv">%s<span class="nm"><strong>%s</strong>%s</span></div>' % (logo(a), e(a), e(n)) for a, n in MEMBERSHIPS)
    vols = "".join('<div class="rv" style="--d:%.2fs"><h3>%s%s</h3><ul>%s</ul></div>' % (k * .07, ic(c), e(g), "".join("<li><strong>%s</strong><span>%s</span></li>" % (e(r), e(o)) for r, o in items)) for k, (g, c, items) in enumerate(VOLUNTEER))
    n = sum(len(v[2]) for v in VOLUNTEER) + len(LEAD_ROLES)
    body = """
{hero}
<section class="sec"><div class="wrap">{h1}<div class="roles">{roles}</div></div></section>
<section class="sec" id="memberships" style="padding-top:0"><div class="wrap">{h2}<div class="orgs">{orgs}</div></div></section>
<section class="sec" id="volunteer" style="padding-top:0"><div class="wrap">{h3}<div class="vols">{vols}</div></div></section>
""".format(hero=phero("Service", "Community", "Service to the field &amp; <em>community</em>.", "Leadership in ASIS&amp;T, peer review, and years of volunteering, from blood drives to supporting blind students.", [(str(len(MEMBERSHIPS)), "Memberships"), (str(n), "Roles"), ("12+", "Blood donations")]),
           h1=head("Leadership", "Professional <em>service</em>"), roles=roles, h2=head("Affiliations", "Member <em>of</em>"), orgs=orgs, h3=head("Community", "Volunteering &amp; <em>leadership</em>"), vols=vols)
    return layout("service.html", "Service", "Professional service, memberships and volunteer work of Md Liton Ali.", body)


# ---------------------------------------------------------------- CV
def cv():
    secs = [("cv-edu", "Education"), ("cv-exp", "Experience"), ("cv-pub", "Publications"), ("cv-now", "Current Research"), ("cv-field", "Field Projects"),
            ("cv-awd", "Awards"), ("cv-srv", "Service"), ("cv-mem", "Memberships"), ("cv-trn", "Training"), ("cv-skl", "Skills")]
    toc = "".join('<a href="#%s">%s</a>' % (a, e(b)) for a, b in secs)
    edu = "".join('<div class="cv-row"><strong>%s</strong><span class="d">%s</span><span class="s">%s · %s</span></div>' % (e(d["degree"]), e(d["years"]), e(d["org"]), e(d["badge"])) for d in EDUCATION)
    exp = "".join('<div class="cv-row"><strong>%s</strong><span class="d">%s</span><span class="s">%s</span><ul>%s</ul></div>' % (e(x["title"]), e(x["period"]), e(x["org"]), "".join("<li>%s</li>" % e(p) for p in x["points"])) for x in EXPERIENCE)
    jp = "".join("<li>%s</li>" % apa(p) for p in PUBS if p["type"] == "journal")
    cp = "".join("<li>%s%s</li>" % (apa(p), " <strong>Best Paper Award.</strong>" if p.get("award") else "") for p in PUBS if p["type"] == "conference")
    up = "".join("<li>%s</li>" % apa(p) for p in PUBS if p["type"] == "review")
    nw = "".join('<div class="cv-row"><strong>%s</strong><span class="d">%s</span><span class="s">%s</span></div>' % (e(n["title"]), e(n["status"]), e(n["text"])) for n in NOW)
    field = "".join("<li><strong>%s</strong> — %s, %s</li>" % (e(n), e(r), e(d)) for n, r, _, _, d in FIELD)
    awd = "".join("<li>%s</li>" % e(t) for g in AWARDS for _, t in g[2])
    srv = "".join("<li><strong>%s</strong>, %s%s</li>" % (e(t), e(o), " (%s)" % e(w) if w[0].isdigit() else "") for w, t, o, _ in LEAD_ROLES)
    srv += "".join("<li><strong>%s</strong>, %s</li>" % (e(r), e(o)) for g in VOLUNTEER for r, o in g[2])
    mem = "".join("<li>%s (%s)</li>" % (e(n), e(a)) for a, n in MEMBERSHIPS)
    trn = "".join("<li>%s, %s (%s)</li>" % (e(t), e(o), e(y)) for y, t, o in TRAINING)
    skl = "".join('<div class="cv-row"><strong>%s</strong><span class="s">%s</span></div>' % (e(t), e(", ".join(x))) for _, t, x in SKILLS)
    body = """
{hero}
<section class="sec"><div class="wrap cv">
  <nav class="cv-toc" aria-label="CV sections">{toc}<button class="btn" id="printCv" type="button">{pr} Print / PDF</button></nav>
  <article class="cv-doc rv">
    <header class="cv-h"><div><h2>Md Liton Ali</h2><p>PhD Student in Information Science, University of Arizona</p></div>
      <div class="cv-contact"><a href="mailto:{email}">{email}</a><span>{phone} (text only)</span><a href="{site}">www.litonali.com</a><a href="{scholar}">Google Scholar</a></div></header>
    <section class="cv-sec" id="cv-edu"><h3>Education</h3>{edu}</section>
    <section class="cv-sec" id="cv-exp"><h3>Professional Experience</h3>{exp}</section>
    <section class="cv-sec" id="cv-pub"><h3>Publications</h3>
      <p class="mono" style="font-size:.75rem;color:var(--muted);margin-bottom:.6rem">JOURNAL ARTICLES</p><ul class="cv-list">{jp}</ul>
      <p class="mono" style="font-size:.75rem;color:var(--muted);margin:1.2rem 0 .6rem">CONFERENCE PAPERS</p><ul class="cv-list">{cp}</ul>
      <p class="mono" style="font-size:.75rem;color:var(--muted);margin:1.2rem 0 .6rem">UNDER REVIEW</p><ul class="cv-list">{up}</ul></section>
    <section class="cv-sec" id="cv-now"><h3>Current Research</h3>{nw}</section>
    <section class="cv-sec" id="cv-field"><h3>Library Automation &amp; Digitization Projects</h3><ul class="cv-list">{field}</ul></section>
    <section class="cv-sec" id="cv-awd"><h3>Awards, Honors &amp; Scholarships</h3><ul class="cv-list cv-cols">{awd}</ul></section>
    <section class="cv-sec" id="cv-srv"><h3>Service, Leadership &amp; Volunteering</h3><ul class="cv-list">{srv}</ul></section>
    <section class="cv-sec" id="cv-mem"><h3>Professional Memberships</h3><ul class="cv-list cv-cols">{mem}</ul></section>
    <section class="cv-sec" id="cv-trn"><h3>Training &amp; Courses</h3><ul class="cv-list">{trn}</ul></section>
    <section class="cv-sec" id="cv-skl"><h3>Skills</h3>{skl}</section>
  </article>
</div></section>
""".format(hero=phero("CV", "Curriculum vitae", "The full <em>record</em>.", "Everything on one page. Use the button to print it or save it as a PDF."), toc=toc, pr=ic("fas fa-print"),
           email=EMAIL, phone=PHONE, site=SITE, scholar=SCHOLAR, edu=edu, exp=exp, jp=jp, cp=cp, up=up, nw=nw, field=field, awd=awd, srv=srv, mem=mem, trn=trn, skl=skl)
    return layout("cv.html", "CV", "Curriculum vitae of Md Liton Ali, PhD student in Information Science at the University of Arizona.", body, cta=False)


# ---------------------------------------------------------------- CONTACT
def contact():
    topics = ["Research collaboration", "Speaking or workshop", "Library automation", "Student inquiry", "Other"]
    tp = "".join('<label><input type="checkbox" name="topic" value="%s"><span>%s</span></label>' % (e(t), e(t)) for t in topics)
    body = """
{hero}
<section class="sec"><div class="wrap contact">
  <div>
    <span class="eyebrow rv">Direct lines</span>
    <div class="rv" style="margin-top:1.4rem">
      <div class="c-line"><div><small>Email</small><a href="mailto:{email}">{email}</a></div><button class="copy" type="button" data-copy="{email}" aria-label="Copy email">{cp}</button></div>
      <div class="c-line"><div><small>Phone · text only</small><span class="v">{phone}</span></div><button class="copy" type="button" data-copy="{phone}" aria-label="Copy phone number">{cp}</button></div>
      <div class="c-line"><div><small>Based at</small><span class="v">College of Information Science, University of Arizona, Tucson</span></div><span></span></div>
      <div class="c-line"><div><small>Local time</small><span class="v" data-localtime></span></div><span></span></div>
    </div>
    <div class="rv" style="margin-top:2rem">{soc}</div>
  </div>
  <div class="spot form rv" style="--d:.1s">
    <h2>Send a message</h2><p>I usually reply within a few days.</p>
    <form id="contactForm" action="https://api.web3forms.com/submit" method="POST" novalidate>
      <input type="hidden" name="access_key" value="b020e433-b628-494b-9d45-953abae2e075"><input type="hidden" name="from_name" value="Portfolio Contact Form">
      <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">
      <div class="fgrid">
        <div class="fg"><input id="name" name="name" type="text" autocomplete="name" placeholder=" " required><label for="name">Full name *</label><span class="err">Please enter your name.</span></div>
        <div class="fg"><input id="email" name="email" type="email" autocomplete="email" placeholder=" " required><label for="email">Email *</label><span class="err">Please enter a valid email.</span></div>
        <div class="fg"><input id="organization" name="organization" type="text" autocomplete="organization" placeholder=" "><label for="organization">Organization</label></div>
        <div class="fg"><input id="subject" name="subject" type="text" placeholder=" " required><label for="subject">Subject *</label><span class="err">Please add a subject.</span></div>
        <fieldset class="fg full"><legend class="sr-only">Topic</legend><div class="topics">{tp}</div></fieldset>
        <div class="fg full"><textarea id="message" name="message" placeholder=" " required></textarea><label for="message">Your message *</label><span class="err">Please write a message.</span></div>
      </div>
      <div class="f-foot"><small>* required</small><button class="btn" type="submit">Send message {arr}</button></div>
      <div class="status-msg" id="formStatus" role="status" aria-live="polite"></div>
    </form>
  </div>
</div></section>
""".format(hero=phero("Contact", "Get in touch", "Let's start a <em>conversation</em>.", "A research idea, a library that needs to go digital, or a question about my work. I'd love to hear from you."),
           email=EMAIL, phone=PHONE, cp=ic("far fa-copy"), soc=soc(), tp=tp, arr=arrow())
    return layout("contact.html", "Contact", "Contact Md Liton Ali for research collaboration, talks or library digitization projects.", body, cta=False)


# ---------------------------------------------------------------- data for JS
def search_index():
    idx = []
    descs = {"index.html": "Overview, focus and journey", "about.html": "Bio, skills, education", "research.html": "Research map, papers, current work",
             "experience.html": "Roles, field projects, training", "honors.html": "Awards and photo gallery", "service.html": "Leadership, memberships, volunteering",
             "cv.html": "Full curriculum vitae", "contact.html": "Email and message form"}
    for f, n, i in PAGES:
        idx.append(dict(g="Pages", t=n, s=descs[f], u=f, i=i, p="Page"))
    for p in PUBS:
        idx.append(dict(g="Publications", t=p["title"], s="%s · %s" % (p["venue"], p["year"] or "under review"), u="research.html#" + p["id"], i="fas fa-file-lines", p="Research",
                        k=" ".join(THEMES[t]["name"] for t in p["themes"]) + " " + p["summary"]))
    for n in NOW:
        idx.append(dict(g="Current work", t=n["title"], s=n["status"], u="research.html", i="fas fa-flask", p="Research", k=n["text"]))
    for t in THEMES.values():
        idx.append(dict(g="Themes", t=t["name"], s=t["blurb"], u="research.html#publications", i=t["icon"], p="Research"))
    for x in EXPERIENCE:
        idx.append(dict(g="Experience", t=x["title"], s="%s · %s" % (x["org"], x["period"]), u="experience.html", i="fas fa-briefcase", p="Experience"))
    for n, r, _, _, d in FIELD:
        idx.append(dict(g="Field projects", t=n, s="%s · %s" % (r, d), u="experience.html#field", i="fas fa-building-columns", p="Experience"))
    for y, t, o in TRAINING:
        idx.append(dict(g="Training", t=t, s="%s · %s" % (o, y), u="experience.html#training", i="fas fa-chalkboard", p="Experience"))
    for d in EDUCATION:
        idx.append(dict(g="Education", t=d["degree"], s="%s · %s" % (d["org"], d["years"]), u="about.html#education", i="fas fa-graduation-cap", p="About"))
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


def pubdata():
    return {p["id"]: {"apa": re.sub(r"</?em>", "", apa(p)), "bib": bib(p)} for p in PUBS if p["type"] != "review"}


def graph():
    nodes = [dict(id=tid, kind="theme", label=t["name"], color=t["color"], lead=t["lead"], title=t["name"], sub=t["blurb"][:90] + "…") for tid, t in THEMES.items()]
    links = [["sos", "aihe"]]
    for p in PUBS:
        nodes.append(dict(id=p["id"], kind="paper", label=p["title"], title=p["title"], year=str(p["year"] or "In review"), color=THEMES[p["themes"][0]]["color"],
                          sub="%s · %s%s" % (TYPE_LABEL[p["type"]], p["year"] or "", " · Best Paper" if p.get("award") else ""), w=2 if p.get("award") else (1 if p["type"] == "journal" else 0)))
        for t in p["themes"]:
            links.append([p["id"], t])
    return dict(nodes=nodes, links=links)


if __name__ == "__main__":
    pages = {"index.html": home, "about.html": about, "research.html": research, "experience.html": experience,
             "honors.html": honors, "service.html": service, "cv.html": cv, "contact.html": contact}
    for f, fn in pages.items():
        open(os.path.join(OUT, f), "w", encoding="utf-8").write(fn())
    js = open(os.path.join(HERE, "script.src.js"), encoding="utf-8").read()
    js = re.sub(r"/\*INDEX\*/.*?/\*END\*/", lambda m: json.dumps(search_index(), ensure_ascii=False), js, flags=re.S)
    js = re.sub(r"/\*PUBS\*/.*?/\*ENDPUBS\*/", lambda m: json.dumps(pubdata(), ensure_ascii=False), js, flags=re.S)
    js = re.sub(r"/\*GRAPH\*/.*?/\*ENDGRAPH\*/", lambda m: json.dumps(graph(), ensure_ascii=False), js, flags=re.S)
    open(os.path.join(OUT, "script.js"), "w", encoding="utf-8").write(js)
    shutil.copy(os.path.join(HERE, "style.css"), os.path.join(OUT, "style.css"))
    open(os.path.join(OUT, "favicon.svg"), "w", encoding="utf-8").write(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c83ff"/><stop offset=".5" stop-color="#5ee7ff"/><stop offset="1" stop-color="#c3f53c"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g)"/><circle cx="32" cy="32" r="27" fill="#07080d"/><text x="32" y="43" font-family="Georgia,serif" font-style="italic" font-size="32" fill="#fff" text-anchor="middle">L</text></svg>')
    print("Built 8 pages + script.js + style.css into", OUT)
