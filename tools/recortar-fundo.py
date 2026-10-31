"""
Recorta o fundo de uma foto de frasco e salva em img/abertura/NOME.webp, para a abertura do site
(os 3 frascos flutuando sobre o arco verde).

Uso:
    pip install pillow "rembg[cpu]"
    python tools/recortar-fundo.py <foto> <nome> [x0 y0 x1 y1]

- x0 y0 x1 y1 (opcional) recorta a foto antes de tirar o fundo; útil quando há mais de um frasco na foto.
- O script imprime largura e altura. Depois, no produto em js/products.js:
      recorte: { src: 'img/abertura/NOME.webp', w: LARGURA, h: ALTURA }
  e escolha quem aparece na abertura em js/app.js (const hero = [centro, esquerda, direita]).
- Foto ideal: frasco sozinho, de frente, inteiro, fundo liso e claro, sem sombra forte.
- Na primeira execução o modelo de IA (~170 MB) é baixado para a pasta do usuário (~/.u2net).

Foi assim que foram feitos (30/10/2026): malbec (foto de divulgação), the-kingdom, hawas e hawas-black
(fotos do Diego, recortadas). Os arquivos ia-*.webp são imagens GERADAS POR IA de frascos que não
existem, guardadas só como opção visual; não representam os produtos reais.
"""
import os
import sys

from PIL import Image, ImageOps
from rembg import new_session, remove

AQUI = os.path.dirname(os.path.abspath(__file__))
DESTINO = os.path.join(AQUI, '..', 'img', 'abertura')


def main():
    if len(sys.argv) not in (3, 7):
        print(__doc__)
        sys.exit(1)
    foto, nome = sys.argv[1], sys.argv[2]
    im = ImageOps.exif_transpose(Image.open(foto)).convert('RGB')
    if len(sys.argv) == 7:
        im = im.crop(tuple(int(v) for v in sys.argv[3:7]))
    out = remove(im, session=new_session('isnet-general-use'), alpha_matting=True,
                 alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=15,
                 alpha_matting_erode_size=8)
    caixa = out.getbbox()
    if caixa:
        out = out.crop(caixa)
    if out.height > 1000:
        out = out.resize((round(out.width * 1000 / out.height), 1000), Image.LANCZOS)
    os.makedirs(DESTINO, exist_ok=True)
    caminho = os.path.join(DESTINO, nome + '.webp')
    out.save(caminho, 'WEBP', quality=88, method=6)
    print(f"salvo: img/abertura/{nome}.webp  ->  recorte: {{ src: 'img/abertura/{nome}.webp', w: {out.width}, h: {out.height} }}")


if __name__ == '__main__':
    main()
