"""
Generate Hacey-branded favicon set.
Single 'H' letter in serif on warm cream background (Hacey palette).

Outputs:
  public/logo/favicon.ico            (multi-size: 16, 32, 48)
  public/logo/favicon-16.png
  public/logo/favicon-32.png
  public/logo/favicon-48.png
  public/logo/favicon-96.png
  public/logo/favicon-192.png
  public/logo/favicon-512.png
  public/logo/apple-touch-icon.png   (180x180 with iOS-safe padding)
  public/logo/og-default.jpg         (1200x630 social share fallback)
  public/site.webmanifest
"""
from PIL import Image, ImageDraw, ImageFont
import json
import os

OUT_LOGO = "public/logo"
OUT_ROOT = "public"
os.makedirs(OUT_LOGO, exist_ok=True)

CANVAS = (250, 243, 233)   # #faf3e9 warm cream
INK    = (28, 24, 20)      # #1c1814 charcoal-brown
ACCENT = (200, 130, 98)    # #c88262 warm clay

FONT_PATH = "C:/Windows/Fonts/georgiab.ttf"  # Georgia Bold — closest serif fallback for Fraunces

def render_letter(size, letter="H", bg=CANVAS, fg=INK, scale=0.65):
    img = Image.new("RGB", (size, size), bg)
    draw = ImageDraw.Draw(img)
    font_size = max(8, int(size * scale))
    font = ImageFont.truetype(FONT_PATH, font_size)
    bbox = draw.textbbox((0, 0), letter, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    # center optically: shift up ~5% to compensate for descender room
    x = (size - w) / 2 - bbox[0]
    y = (size - h) / 2 - bbox[1] - int(size * 0.04)
    draw.text((x, y), letter, fill=fg, font=font)
    return img

# Standard favicon sizes
for sz in [16, 32, 48, 96, 192, 512]:
    img = render_letter(sz)
    img.save(f"{OUT_LOGO}/favicon-{sz}.png", "PNG", optimize=True)
    print(f"  favicon-{sz}.png")

# .ico — bundle 16/32/48 into one file
ico_img = render_letter(48)
ico_img.save(
    f"{OUT_LOGO}/favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
)
print("  favicon.ico (multi-size)")

# Apple touch icon — 180x180 with iOS-safe padding (no rounded corners; iOS adds them)
apple = render_letter(180, scale=0.55)
apple.save(f"{OUT_LOGO}/apple-touch-icon.png", "PNG", optimize=True)
print("  apple-touch-icon.png")

# Default OG image — 1200x630 for social cards when no page-specific image fits.
# Hacey wordmark in big italic serif on cream, accent rule below.
og = Image.new("RGB", (1200, 630), CANVAS)
draw = ImageDraw.Draw(og)
font_brand = ImageFont.truetype("C:/Windows/Fonts/georgiai.ttf", 110)  # italic
font_sub   = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 38)
font_label = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 22)

brand_text = "Hacey Jeong"
sub_text = "Notes from Vancouver Island."
label_text = "REALTOR®  ·  ROYAL LEPAGE NANAIMO REALTY"

# Brand
b1 = draw.textbbox((0, 0), brand_text, font=font_brand)
draw.text(
    ((1200 - (b1[2] - b1[0])) / 2 - b1[0], 230 - b1[1]),
    brand_text,
    fill=INK,
    font=font_brand,
)
# Subtitle
b2 = draw.textbbox((0, 0), sub_text, font=font_sub)
draw.text(
    ((1200 - (b2[2] - b2[0])) / 2 - b2[0], 380 - b2[1]),
    sub_text,
    fill=(110, 99, 87),
    font=font_sub,
)
# Accent rule
draw.rectangle([(540, 460), (660, 462)], fill=ACCENT)
# Label
b3 = draw.textbbox((0, 0), label_text, font=font_label)
draw.text(
    ((1200 - (b3[2] - b3[0])) / 2 - b3[0], 490 - b3[1]),
    label_text,
    fill=(110, 99, 87),
    font=font_label,
)
og.save(f"{OUT_LOGO}/og-default.jpg", "JPEG", quality=92, optimize=True)
print("  og-default.jpg (1200x630)")

# Web app manifest
manifest = {
    "name": "Hacey Jeong, REALTOR\u00ae",
    "short_name": "Hacey Jeong",
    "description": "Bilingual REALTOR\u00ae serving Vancouver Island. Royal LePage Nanaimo Realty.",
    "start_url": "/en",
    "scope": "/",
    "display": "browser",
    "background_color": "#faf3e9",
    "theme_color": "#c88262",
    "icons": [
        {"src": "/logo/favicon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "/logo/favicon-512.png", "sizes": "512x512", "type": "image/png"},
        {"src": "/logo/apple-touch-icon.png", "sizes": "180x180", "type": "image/png", "purpose": "any"},
    ],
}
with open(f"{OUT_ROOT}/site.webmanifest", "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)
print("  site.webmanifest")

print("\nDone.")
