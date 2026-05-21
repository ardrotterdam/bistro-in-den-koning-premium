"""Generate premium cinematic OG image for Bistro In den Koning demo."""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

WIDTH = 1200
HEIGHT = 630
OUTPUT = Path(__file__).resolve().parent.parent / "public" / "og-image.jpg"
FONTS = Path(__file__).resolve().parent / "fonts"

# Brand palette (matches tailwind.config.ts)
FOREST_DARK = (10, 20, 16)       # #0A1410
FOREST_MID = (15, 30, 24)        # #0F1E18
FOREST_DEEP = (26, 53, 41)       # #1A3329
TERRA_WARM = (168, 92, 56)       # #A85C38
TERRA_GLOW = (212, 137, 95)      # #D4895F
CREAM = (247, 243, 237)          # #F7F3ED
GOLD = (201, 169, 110)           # #C9A96E


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp_color(c1: tuple[int, int, int], c2: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return (
        int(lerp(c1[0], c2[0], t)),
        int(lerp(c1[1], c2[1], t)),
        int(lerp(c1[2], c2[2], t)),
    )


def build_background() -> Image.Image:
    img = Image.new("RGB", (WIDTH, HEIGHT))
    px = img.load()

    for y in range(HEIGHT):
        for x in range(WIDTH):
            # Vertical gradient: darker top, slightly warmer bottom
            vy = y / HEIGHT
            base = lerp_color(FOREST_DARK, FOREST_MID, vy * 0.6)

            # Warm terracotta vignette from lower center
            cx, cy = WIDTH * 0.5, HEIGHT * 0.72
            dist = math.hypot(x - cx, y - cy) / math.hypot(WIDTH * 0.5, HEIGHT * 0.5)
            warm = max(0.0, 1.0 - dist * 1.15) ** 2.2
            base = lerp_color(base, TERRA_WARM, warm * 0.18)

            # Subtle forest green lift in upper corners
            corner_dist = min(
                math.hypot(x, y),
                math.hypot(WIDTH - x, y),
            ) / math.hypot(WIDTH * 0.5, HEIGHT * 0.35)
            green_lift = max(0.0, 1.0 - corner_dist) ** 3.0
            base = lerp_color(base, FOREST_DEEP, green_lift * 0.12)

            px[x, y] = base

    return img


def add_candlelight_glow(img: Image.Image) -> Image.Image:
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Primary warm glow behind text
    draw.ellipse(
        (-120, 80, WIDTH + 120, HEIGHT + 40),
        fill=(TERRA_GLOW[0], TERRA_GLOW[1], TERRA_GLOW[2], 38),
    )

    # Secondary soft gold highlight
    draw.ellipse(
        (WIDTH * 0.25, HEIGHT * 0.15, WIDTH * 0.75, HEIGHT * 0.85),
        fill=(GOLD[0], GOLD[1], GOLD[2], 22),
    )

    # Candle-like point sources
    candles = [
        (WIDTH * 0.18, HEIGHT * 0.38, 140),
        (WIDTH * 0.82, HEIGHT * 0.42, 120),
        (WIDTH * 0.5, HEIGHT * 0.28, 180),
    ]
    for cx, cy, radius in candles:
        draw.ellipse(
            (cx - radius, cy - radius, cx + radius, cy + radius),
            fill=(TERRA_GLOW[0], TERRA_GLOW[1], TERRA_GLOW[2], 16),
        )

    glow = overlay.filter(ImageFilter.GaussianBlur(radius=55))
    return Image.alpha_composite(img.convert("RGBA"), glow)


def add_vignette(img: Image.Image) -> Image.Image:
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    draw.ellipse(
        (-WIDTH * 0.15, -HEIGHT * 0.2, WIDTH * 1.15, HEIGHT * 1.35),
        fill=(FOREST_DARK[0], FOREST_DARK[1], FOREST_DARK[2], 0),
        outline=(FOREST_DARK[0], FOREST_DARK[1], FOREST_DARK[2], 110),
        width=int(min(WIDTH, HEIGHT) * 0.22),
    )

    vignette = overlay.filter(ImageFilter.GaussianBlur(radius=40))
    return Image.alpha_composite(img, vignette)


def add_grain(img: Image.Image) -> Image.Image:
    random.seed(42)
    noise = Image.new("L", (WIDTH, HEIGHT))
    npx = noise.load()
    for y in range(HEIGHT):
        for x in range(WIDTH):
            npx[x, y] = random.randint(0, 255)

    noise = noise.filter(ImageFilter.GaussianBlur(radius=0.6))
    noise_rgba = Image.merge(
        "RGBA",
        [
            noise,
            Image.new("L", (WIDTH, HEIGHT), 255),
            Image.new("L", (WIDTH, HEIGHT), 255),
            noise.point(lambda v: int(v * 0.055)),
        ],
    )
    return Image.alpha_composite(img, noise_rgba)


def add_soft_blur_depth(img: Image.Image) -> Image.Image:
    """Subtle depth-of-field: crisp center, softer edges."""
    blurred = img.filter(ImageFilter.GaussianBlur(radius=2.2))
    mask = Image.new("L", (WIDTH, HEIGHT), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse(
        (WIDTH * 0.08, HEIGHT * 0.05, WIDTH * 0.92, HEIGHT * 0.95),
        fill=255,
    )
    mask = mask.filter(ImageFilter.GaussianBlur(radius=80))

    result = Image.new("RGBA", (WIDTH, HEIGHT))
    result.paste(blurred, (0, 0))
    result.paste(img, (0, 0), mask)
    return result


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def add_typography(img: Image.Image) -> Image.Image:
    draw = ImageDraw.Draw(img)

    title_font = load_font(FONTS / "PlayfairDisplay.ttf", 72)
    subtitle_font = load_font(FONTS / "CormorantGaramond.ttf", 34)

    title = "demo.breure.ai"
    subtitle = "Bistro In den Koning"

    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)

    title_w = title_bbox[2] - title_bbox[0]
    title_h = title_bbox[3] - title_bbox[1]
    subtitle_w = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_h = subtitle_bbox[3] - subtitle_bbox[1]

    gap = 28
    block_h = title_h + gap + subtitle_h
    title_y = (HEIGHT - block_h) // 2 - title_bbox[1]
    subtitle_y = title_y + title_h + gap - subtitle_bbox[1]

    title_x = (WIDTH - title_w) // 2
    subtitle_x = (WIDTH - subtitle_w) // 2

    # Soft glow behind title
    glow_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    glow_draw.text((title_x, title_y), title, font=title_font, fill=(GOLD[0], GOLD[1], GOLD[2], 60))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=8))
    img = Image.alpha_composite(img, glow_layer)
    draw = ImageDraw.Draw(img)

    # Title
    draw.text((title_x, title_y), title, font=title_font, fill=CREAM)

    # Decorative line
    line_y = subtitle_y - 14
    line_w = 80
    line_x = (WIDTH - line_w) // 2
    draw.line(
        [(line_x, line_y), (line_x + line_w, line_y)],
        fill=(TERRA_GLOW[0], TERRA_GLOW[1], TERRA_GLOW[2], 180),
        width=1,
    )

    # Subtitle with letter-spacing simulation
    subtitle_color = (TERRA_GLOW[0], TERRA_GLOW[1], TERRA_GLOW[2])
    draw.text((subtitle_x, subtitle_y), subtitle, font=subtitle_font, fill=subtitle_color)

    return img


def main() -> None:
    img = build_background().convert("RGBA")
    img = add_candlelight_glow(img)
    img = add_vignette(img)
    img = add_soft_blur_depth(img)
    img = add_typography(img)
    img = add_grain(img)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(OUTPUT, "JPEG", quality=92, optimize=True, subsampling=0)
    print(f"Saved {OUTPUT} ({WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    main()
