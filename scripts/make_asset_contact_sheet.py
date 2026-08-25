from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

src = Path('/home/ubuntu/upload')
files = sorted(src.glob('pasted_file_*_image.*'))
thumb_w, thumb_h = 180, 180
label_h = 42
cols = 5
rows = (len(files) + cols - 1) // cols
canvas = Image.new('RGB', (cols * thumb_w, rows * (thumb_h + label_h)), '#eee6dd')
draw = ImageDraw.Draw(canvas)
font = ImageFont.load_default()

for idx, path in enumerate(files):
    try:
        image = Image.open(path).convert('RGB')
        image.thumbnail((thumb_w - 16, thumb_h - 16))
        tile = Image.new('RGB', (thumb_w, thumb_h), '#f8f4ef')
        x = (thumb_w - image.width) // 2
        y = (thumb_h - image.height) // 2
        tile.paste(image, (x, y))
    except Exception:
        tile = Image.new('RGB', (thumb_w, thumb_h), '#d2afa2')
    x0 = (idx % cols) * thumb_w
    y0 = (idx // cols) * (thumb_h + label_h)
    canvas.paste(tile, (x0, y0))
    label = path.name.replace('pasted_file_', '').replace('_image', '')
    draw.text((x0 + 8, y0 + thumb_h + 8), label, fill='#2d221f', font=font)

out = Path('/home/ubuntu/atelier-beauty/asset-contact-sheet.jpg')
canvas.save(out, quality=92)
print(out)
