# Website source

The 8 HTML pages, `style.css` and `script.js` in the main folder are generated from these files.

- `data.py` — all content: publications (with summaries, methods, findings), current projects, themes, experience, awards, training, service. Edit this to update the site.
- `build.py` — page templates. Run `python _build/build.py` from the portfolio folder to regenerate everything.
- `style.css` — the design system (copied to the main folder on build).
- `script.src.js` — site JavaScript (shader, research map, filters, search, cursor…); the build inserts the search index, citations and graph data and writes `script.js`.

Add a new paper: copy one entry in `PUBS` in `data.py`, edit it, and rebuild. It automatically appears on the Research page, the research map, the home page rail, the CV, search, and gets APA + BibTeX buttons.

Folders starting with `_` are not published by GitHub Pages.
