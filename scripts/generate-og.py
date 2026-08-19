"""Generate the Open Graph and Twitter share images.

Produces the site wide card, a card per club, and the Apple touch icon, all in
the club palette with the Brothers wordmark. Run it again after changing the
palette, the wordmark or the club list:

    python scripts/generate-og.py

Fonts are pulled from Google Fonts on first run and cached under
node_modules/.cache/og-fonts, which is not committed.
"""

from __future__ import annotations

import json
import os
import re
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_CACHE = ROOT / "node_modules" / ".cache" / "og-fonts"
BRAND = ROOT / "public" / "img" / "brand"

W, H = 1200, 630

NAVY = (13, 24, 63)
NAVY_INK = (3, 6, 15)
GOLD = (197, 162, 92)
GOLD_HOT = (244, 227, 188)
PAPER = (248, 245, 238)

FONTS = {
    "display": (
        "Fraunces.ttf",
        "https://github.com/google/fonts/raw/main/ofl/fraunces/"
        "Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf",
    ),
    "display-italic": (
        "Fraunces-Italic.ttf",
        "https://github.com/google/fonts/raw/main/ofl/fraunces/"
        "Fraunces-Italic%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf",
    ),
    "sans": (
        "Inter.ttf",
        "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf",
    ),
}


# --------------------------------------------------------------------- fonts


def font_file(key: str) -> Path:
    name, url = FONTS[key]
    path = FONT_CACHE / name
    if not path.exists():
        FONT_CACHE.mkdir(parents=True, exist_ok=True)
        print(f"  downloading {name}")
        urllib.request.urlretrieve(url, path)
    return path


def display(size: int, weight: int = 700, italic: bool = False) -> ImageFont.FreeTypeFont:
    face = ImageFont.truetype(str(font_file("display-italic" if italic else "display")), size)
    # Fraunces axes: optical size, weight, softness, wonky.
    face.set_variation_by_axes([min(144, max(9, size)), weight, 0, 0])
    return face


def sans(size: int, weight: int = 500) -> ImageFont.FreeTypeFont:
    face = ImageFont.truetype(str(font_file("sans")), size)
    face.set_variation_by_axes([min(32, max(14, size)), weight])
    return face


# ------------------------------------------------------------------ drawing


def tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    face: ImageFont.FreeTypeFont,
    fill,
    tracking: float,
) -> int:
    """Draw letterspaced text from a left baseline, returning the end x."""
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=face, fill=fill, anchor="ls")
        x += draw.textlength(char, font=face) + tracking
    return int(x - tracking)


def tracked_width(
    draw: ImageDraw.ImageDraw, text: str, face: ImageFont.FreeTypeFont, tracking: float
) -> float:
    if not text:
        return 0.0
    return sum(draw.textlength(c, font=face) for c in text) + tracking * (len(text) - 1)


def linear_gradient(size, stops, horizontal=True) -> Image.Image:
    """A one pixel gradient stretched to size. `stops` is a list of (pos, value)."""
    length = size[0] if horizontal else size[1]
    strip = Image.new("L", (length, 1) if horizontal else (1, length))
    pixels = strip.load()
    for i in range(length):
        t = i / max(1, length - 1)
        lo = stops[0]
        hi = stops[-1]
        for a, b in zip(stops, stops[1:]):
            if a[0] <= t <= b[0]:
                lo, hi = a, b
                break
        span = max(1e-6, hi[0] - lo[0])
        value = lo[1] + (hi[1] - lo[1]) * ((t - lo[0]) / span)
        if horizontal:
            pixels[i, 0] = int(value)
        else:
            pixels[0, i] = int(value)
    return strip.resize(size, Image.BILINEAR)


def base_panel(photo: Path | None = None) -> Image.Image:
    """Navy ground with a diagonal fall off and a warm bloom top right."""
    panel = Image.new("RGB", (W, H), NAVY_INK)
    navy_layer = Image.new("RGB", (W, H), NAVY)
    panel.paste(navy_layer, (0, 0), linear_gradient((W, H), [(0.0, 235), (0.75, 70), (1.0, 30)]))

    if photo is not None:
        panel.paste(
            cover_crop(photo),
            (0, 0),
            linear_gradient((W, H), [(0.0, 13), (0.45, 24), (1.0, 58)]),
        )

    # Radial falls to zero well inside its own square, so pasting it onto the
    # mask leaves no seam at the edges.
    span = 1500
    glow = Image.radial_gradient("L").resize((span, span), Image.BILINEAR)
    glow = Image.eval(glow, lambda v: max(0, 150 - v))
    mask = Image.new("L", (W, H), 0)
    mask.paste(glow, (W - span // 2 - 120, -span // 2 + 40))
    panel.paste(Image.new("RGB", (W, H), GOLD), (0, 0), mask)
    return panel


def wordmark(width: int) -> Image.Image:
    mark = Image.open(BRAND / "brothers-reversed.png").convert("RGBA")
    height = round(mark.height * width / mark.width)
    return mark.resize((width, height), Image.LANCZOS)


def draw_lockup(panel: Image.Image, x: int, y: int, width: int) -> int:
    """The wordmark on its own. Returns the block's bottom y."""
    mark = wordmark(width)
    panel.paste(mark, (x, y), mark)
    return y + mark.height


def cover_crop(path: Path, focus: float = 1 / 3) -> Image.Image:
    """Scale a photograph to fill the card and crop it, biased toward the top."""
    photo = Image.open(path).convert("RGB")
    scale = max(W / photo.width, H / photo.height)
    photo = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
    left = (photo.width - W) // 2
    top = round((photo.height - H) * focus)
    return photo.crop((left, top, left + W, top + H))


# ------------------------------------------------------------------- cards


def site_card(path: Path) -> None:
    panel = base_panel(ROOT / "public" / "img" / "ipswich" / "exterior.webp")
    draw = ImageDraw.Draw(panel)

    draw_lockup(panel, 76, 68, 360)

    head = display(96, 760)
    head_italic = display(96, 760, italic=True)
    draw.text((76, 352), "Four clubs.", font=head, fill=PAPER, anchor="ls")

    # The gold word is drawn twice, once slightly lighter, for a foil edge.
    draw.text((78, 452), "One family.", font=head_italic, fill=(120, 95, 44), anchor="ls")
    draw.text((76, 450), "One family.", font=head_italic, fill=GOLD_HOT, anchor="ls")

    strap = sans(16, 600)
    tracked(draw, (76, 540), "CAIRNS   ·   INNISFAIL   ·   TOWNSVILLE   ·   IPSWICH", strap, GOLD, 3.0)

    draw.rectangle([0, H - 8, W, H], fill=GOLD)
    panel.save(path, "PNG", optimize=True)
    print(f"  wrote {path.relative_to(ROOT)}")


def club_card(club: dict, path: Path) -> None:
    accent = tuple(int(club["accent"].lstrip("#")[i : i + 2], 16) for i in (0, 2, 4))

    panel = cover_crop(ROOT / "public" / club["image"].lstrip("/"))

    # Ink wash from the left so the type always has a ground to sit on.
    wash = Image.new("RGB", (W, H), NAVY_INK)
    panel.paste(wash, (0, 0), linear_gradient((W, H), [(0.0, 250), (0.55, 215), (1.0, 120)]))
    tint = Image.new("RGB", (W, H), NAVY)
    panel.paste(tint, (0, 0), linear_gradient((W, H), [(0.0, 110), (1.0, 40)]))

    draw = ImageDraw.Draw(panel)
    draw_lockup(panel, 76, 68, 300)

    eyebrow = sans(16, 700)
    draw.line([(76, 292), (116, 292)], fill=accent, width=2)
    tracked(draw, (132, 298), club["region"].upper(), eyebrow, accent, 3.4)

    city = display(112, 760)
    draw.text((76, 424), club["city"], font=city, fill=PAPER, anchor="ls")

    tagline = display(38, 620, italic=True)
    draw.text((78, 492), club["tagline"], font=tagline, fill=GOLD, anchor="ls")

    meta = sans(17, 500)
    draw.text((76, 556), f"{club['street']}, {club['suburb']}", font=meta, fill=(214, 208, 194), anchor="ls")

    draw.rectangle([0, H - 8, W, H], fill=accent)
    panel.save(path, "PNG", optimize=True)
    print(f"  wrote {path.relative_to(ROOT)}")


def apple_icon(path: Path) -> None:
    size = 180
    icon = Image.new("RGB", (size, size), NAVY)
    star = Image.open(BRAND / "star.png").convert("RGBA")
    scale = (size * 0.6) / max(star.width, star.height)
    star = star.resize((round(star.width * scale), round(star.height * scale)), Image.LANCZOS)
    icon.paste(star, ((size - star.width) // 2, (size - star.height) // 2), star)
    icon.save(path, "PNG", optimize=True)
    print(f"  wrote {path.relative_to(ROOT)}")


# -------------------------------------------------------------------- data


def read_clubs() -> list[dict]:
    """Pull the fields the cards need straight out of lib/clubs.ts."""
    source = (ROOT / "lib" / "clubs.ts").read_text(encoding="utf-8")
    blocks = source.split('    slug: "')[1:]
    clubs = []

    def field(block: str, name: str) -> str:
        match = re.search(rf'{name}:\s*\n?\s*"((?:[^"\\]|\\.)*)"', block)
        return json.loads(f'"{match.group(1)}"') if match else ""

    for block in blocks:
        slug = block.split('"')[0]
        image = re.search(r'image:\s*\{\s*\n\s*src:\s*"([^"]+)"', block)
        clubs.append(
            {
                "slug": slug,
                "city": field(block, "city"),
                "region": field(block, "region"),
                "tagline": field(block, "tagline"),
                "street": field(block, "street"),
                "suburb": field(block, "suburb"),
                "accent": field(block, "accent"),
                "image": image.group(1) if image else "",
            }
        )
    return clubs


def main() -> None:
    print("Generating share images")
    og_dir = ROOT / "public" / "og"
    og_dir.mkdir(parents=True, exist_ok=True)

    site_card(ROOT / "app" / "opengraph-image.png")
    site_card(ROOT / "app" / "twitter-image.png")
    apple_icon(ROOT / "app" / "apple-icon.png")

    for club in read_clubs():
        club_card(club, og_dir / f"{club['slug']}.png")

    print("Done")


if __name__ == "__main__":
    main()
