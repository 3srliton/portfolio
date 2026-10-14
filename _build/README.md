# Website source

The 8 HTML pages and `script.js` in the main folder are generated from these files.

- `data.py` — all content (publications, experience, awards, training, service…). Edit this to update the site.
- `build.py` — page templates. Run `python _build/build.py` from the portfolio folder to regenerate the pages.
- `script.src.js` — site JavaScript; the build inserts the search index into it and writes `script.js`.
- `style.css` (main folder) — edit directly.

You can also edit the HTML files directly, but a rebuild will overwrite those edits.
Folders starting with `_` are not published by GitHub Pages.
