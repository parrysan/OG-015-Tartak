#!/usr/bin/env python3
"""Add bold white text overlay to ad images, matching existing style."""

from PIL import Image, ImageDraw, ImageFont
import os
import sys

# Target final size matching existing ads
TARGET_W, TARGET_H = 2752, 1536

def find_font(size):
    """Find a bold font available on macOS."""
    font_paths = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSDisplay.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/HelveticaNeue.ttc",
    ]
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size, index=1)  # index=1 for bold in .ttc
            except Exception:
                try:
                    return ImageFont.truetype(path, size)
                except Exception:
                    continue
    return ImageFont.load_default()

def add_text_overlay(input_path, output_path, text):
    """Add bold white text with dark shadow to bottom-right of image."""
    img = Image.open(input_path).convert("RGBA")

    # Resize to target dimensions
    img = img.resize((TARGET_W, TARGET_H), Image.LANCZOS)

    # Create text overlay
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    font_size = 90
    font = find_font(font_size)

    # Position text in bottom-right area with padding
    margin_right = 60
    margin_bottom = 60
    line_spacing = 16

    # Word-wrap text to fit ~half the image width
    max_text_width = TARGET_W * 0.55
    words = text.split()
    lines = []
    current_line = ""

    for word in words:
        test_line = f"{current_line} {word}".strip()
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if bbox[2] - bbox[0] > max_text_width and current_line:
            lines.append(current_line)
            current_line = word
        else:
            current_line = test_line
    if current_line:
        lines.append(current_line)

    # Calculate total text block height
    total_height = 0
    line_heights = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        h = bbox[3] - bbox[1]
        line_heights.append(h)
        total_height += h + line_spacing
    total_height -= line_spacing

    # Starting Y position (bottom-right aligned)
    y = TARGET_H - margin_bottom - total_height

    for i, line in enumerate(lines):
        bbox = draw.textbbox((0, 0), line, font=font)
        text_w = bbox[2] - bbox[0]
        x = TARGET_W - margin_right - text_w

        # Draw shadow (multiple passes for thickness)
        shadow_offset = 3
        for dx in range(-shadow_offset, shadow_offset + 1):
            for dy in range(-shadow_offset, shadow_offset + 1):
                draw.text((x + dx, y + dy), line, font=font, fill=(0, 0, 0, 160))

        # Draw white text
        draw.text((x, y), line, font=font, fill=(255, 255, 255, 255))

        y += line_heights[i] + line_spacing

    # Composite and save
    result = Image.alpha_composite(img, overlay)
    result = result.convert("RGB")
    result.save(output_path, "PNG", quality=95)
    print(f"Saved: {output_path} ({TARGET_W}x{TARGET_H})")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: add-ad-text.py <input> <output> <text>")
        sys.exit(1)
    add_text_overlay(sys.argv[1], sys.argv[2], sys.argv[3])
