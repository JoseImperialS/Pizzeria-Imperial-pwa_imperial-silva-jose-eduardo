from PIL import Image
import os
import glob

os.makedirs("icons", exist_ok=True)

# 1. Busca el logo que guardaste en img/ (cualquier formato)
candidatos = [
    f for f in glob.glob("img/*")
    if f.lower().endswith((".png", ".webp", ".jpg", ".jpeg"))
    and "logo" in os.path.basename(f).lower()
]

if not candidatos:
    print("No encontre ningun archivo con 'logo' en el nombre dentro de img/")
    print("Renombra tu imagen para que incluya la palabra logo, por ejemplo logo.png")
    raise SystemExit

# Si hay varios, usa el mas reciente
origen = max(candidatos, key=os.path.getmtime)
print("Usando:", origen)

# 2. Abre con transparencia y pegalo sobre fondo blanco
logo = Image.open(origen).convert("RGBA")
fondo = Image.new("RGBA", logo.size, (255, 255, 255, 255))
fondo.alpha_composite(logo)
logo_rgb = fondo.convert("RGB")

# 3. Guarda el logo.jpg que usa tu index.html
logo_rgb.save("img/logo.jpg", quality=95)
print("img/logo.jpg creado")

# 4. Crea los iconos cuadrados 192 y 512
lado = max(logo_rgb.size)
lienzo = Image.new("RGB", (lado, lado), (255, 255, 255))
lienzo.paste(logo_rgb, ((lado - logo_rgb.width) // 2, (lado - logo_rgb.height) // 2))

for tam in (192, 512):
    lienzo.resize((tam, tam), Image.LANCZOS).save(f"icons/icon-{tam}.png")
    print(f"icons/icon-{tam}.png creado")