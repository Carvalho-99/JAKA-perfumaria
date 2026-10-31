"""
Prepara fotos de produto para o site: recorta/ajusta para 800x1000 (4:5) e salva em img/produtos/.

Uso:
    pip install pillow
    python tools/preparar-fotos.py <pasta-com-as-fotos>

- Arquivos listados em RECORTES usam o recorte definido aqui (foi assim que as fotos atuais foram feitas).
- Qualquer outro .jpg/.jpeg/.png da pasta é centralizado e recortado em 4:5 e salvo com o mesmo nome.
- Foto mais estreita que 4:5 (ex.: frasco recortado de uma foto com vários) usa o modo "pad":
  fundo desfocado da própria foto + foto inteira centralizada.
Depois, aponte o produto em js/products.js: fotos: ['img/produtos/NOME.jpg'].
"""
import os
import sys

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

W, H = 800, 1000
AQUI = os.path.dirname(os.path.abspath(__file__))
DESTINO = os.path.join(AQUI, '..', 'img', 'produtos')


def cover(im):
    return ImageOps.fit(im, (W, H), Image.LANCZOS, centering=(0.5, 0.5))


def pad(im):
    bg = ImageOps.fit(im, (W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(34))
    bg = ImageEnhance.Brightness(bg).enhance(0.92)
    fg = im.copy()
    fg.thumbnail((W - 56, H - 56), Image.LANCZOS)
    bg.paste(fg, ((W - fg.width) // 2, (H - fg.height) // 2))
    return bg


# nome de saída: (arquivo de origem, caixa de recorte (x0, y0, x1, y1) ou None, modo)
# Origem: fotos entregues pelo Bruno em 30/10/2026 (copiadas com nomes numerados).
RECORTES = {
    'malbec-1':          ('37.jpg', (0, 194, 736, 1114), cover),
    'malbec-edp-1':      ('36.jpg', (0, 92, 736, 1012), cover),
    'malbec-magnetic-1': ('03.jpg', (0, 92, 736, 1012), cover),   # corta a marca d'água "Dola AI"
    'clash-1':           ('02.jpg', (0, 66, 735, 985), cover),
    'coffee-woman-1':    ('00.jpg', (0, 40, 736, 960), cover),
    'lily-1':            ('01.jpg', (0, 20, 736, 940), cover),
    'hawas-1':           ('38.jpg', (0, 0, 582, 1154), pad),
    'the-kingdom-1':     ('38.jpg', (602, 100, 962, 960), pad),
    'hawas-black-1':     ('39.jpg', (432, 200, 925, 1130), pad),
    'arabes-trio':       ('38.jpg', None, pad),
}


def carregar(caminho, caixa=None):
    im = ImageOps.exif_transpose(Image.open(caminho)).convert('RGB')
    return im.crop(caixa) if caixa else im


def salvar(im, nome):
    os.makedirs(DESTINO, exist_ok=True)
    caminho = os.path.join(DESTINO, nome + '.jpg')
    im.save(caminho, 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'{nome + ".jpg":34s} {os.path.getsize(caminho) // 1024} KB')


def main():
    if len(sys.argv) < 2 or not os.path.isdir(sys.argv[1]):
        print(__doc__)
        sys.exit(1)
    origem = sys.argv[1]
    usados = set()
    for nome, (arquivo, caixa, modo) in RECORTES.items():
        caminho = os.path.join(origem, arquivo)
        if os.path.exists(caminho):
            salvar(modo(carregar(caminho, caixa)), nome)
            usados.add(arquivo)
    for arquivo in sorted(os.listdir(origem)):
        if arquivo in usados or not arquivo.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        im = carregar(os.path.join(origem, arquivo))
        modo = pad if im.width / im.height < 0.7 else cover
        salvar(modo(im), os.path.splitext(arquivo)[0])


if __name__ == '__main__':
    main()
