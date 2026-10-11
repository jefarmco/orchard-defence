# Art pipeline (v3)
Hand-painted procedural art, rendered offline in headless Chrome and packed to WebP.
- `node gen.js [all|sprites|terrain|misc]` renders gen.html (prelude.js + sprites_base.js + art.js) into art/out (needs puppeteer-core + Chrome)
- `python3 pack.py` packs the frames into assets/atlas.webp, writes frames.json (pasted into the game as FRAMES), map0-2.webp, title/wood/board/iron.webp and icons
Paths in gen.js/pack.py point at the original build folder; adjust before rerunning.
