# Milabi Trading PLC website

A plain HTML/CSS/JavaScript site. No build step, no database: upload the folder to any web host.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `machines.html` | All machines, with filter |
| `excavator.html`, `wheel-loader.html`, `dump-truck.html` | Machine detail pages with rate tabs |
| `how-hiring-works.html` | Steps, wet vs dry, hire terms, service area, FAQ |
| `about.html` | Story, values, licences, team |
| `trading.html` | Trading division (from April 2027) with sign-up form |
| `contact.html` | Contact methods and quote form |

Shared files: `css/style.css` (all styling and brand colours), `js/main.js` (mobile menu, machine filter, rate tabs, forms), `images/`.

## Before going live

1. **Replace every `[placeholder]`.** Search all files for `[` to find them: prices, phone, Telegram, address, hours, licence numbers, story, team, machine models.
2. **Contact links** in `contact.html`: set the real numbers in `tel:+251...`, `https://wa.me/251...` (no + or spaces) and `https://t.me/username`. Update the Google Maps link to the office.
3. **Photos:** each grey dashed box (`<div class="ph ...">[Photo: ...]</div>`) marks a photo slot. Put the photo in `images/` and replace the box with
   `<img src="images/excavator-side.jpg" alt="Milabi excavator on site" style="aspect-ratio: 4/3; object-fit: cover; width: 100%">`.
   Resize photos to about 1600 px wide and save as JPG, around 200–300 KB each.
4. **Logo:** `images/logo.png` was taken from the brand PDF and is low resolution. Replace it with the original file (SVG is best) at the same name.
5. **Forms:** forms need a form service to send email. Create a free form at formspree.io (or similar), then paste its endpoint into `FORM_ENDPOINT` at the top of `js/main.js`. Until then, forms show a "not connected yet" message.
6. **Domain:** `sitemap.xml` and `robots.txt` assume `milabitrading.com`. Change them if you use a different domain.

## Preview locally

```bash
cd milabi-website
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Brand colours

Defined at the top of `css/style.css`: green `#0B5D36`, gold `#FDB913`, white `#FFFFFF`, plus darker and lighter tints of them for text, borders and backgrounds.
