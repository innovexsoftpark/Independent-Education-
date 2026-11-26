# Independent Education website

Website and design system for Independent Education, a study abroad consultancy in Banani, Dhaka.

## What is here

- The full public website: every page, image, font, script and guide from the existing static site, copied **unchanged**. No text, contact detail, fact or photo was edited or removed.
- `design-system/tokens.css`: the colour, font and radius values, extracted as-is from `css/site.css`, with light and dark mode.
- `design-system/index.html`: a reference sheet showing those colours, the Poppins type scale, buttons, the leaf shape and cards. It reads its values from `css/site.css`, so it always matches the site.

## Preview

Open `index.html` in a browser, or run a small local server from this folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000/ and http://localhost:8000/design-system/.

## Not included

`server-tracking/` (PHP lead capture and tracking) and `n8n-automation-DO-NOT-UPLOAD/` from the original zip are left out of this repository, because they are server code and automation setup that can hold private settings. They can be added later if you want them version-controlled.
