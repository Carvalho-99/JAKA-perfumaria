# Jaka Perfumaria — site

Site estático (HTML + CSS + JS puro, sem build). Para ver localmente: `python tools/servidor-dev.py` e abra
http://localhost:5510 (esse servidor desliga o cache do navegador; com `python -m http.server` as alterações
podem demorar a aparecer até um Ctrl+F5). Para publicar, suba a pasta inteira no GitHub Pages / Firebase /
Cloudflare Pages. A cada alteração em CSS/JS, troque o `?v=` dos links em `index.html` para o cache dos
visitantes não segurar a versão antiga.

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, WhatsApp, Instagram, entrega, pagamento, trocas, faixa de demonstração | `js/config.js` |
| Perfumes, preços, tamanhos, estoque, notas, fotos | `js/products.js` |
| Cores dos temas claro/escuro, fontes, animações | `css/styles.css` (topo do arquivo) |

## Pendente de dados reais (hoje é demonstração)

- **Preços e estoque** de todos os 15 perfumes são provisórios.
- **Notas olfativas** foram preenchidas para demonstração; conferir com a descrição oficial de cada fabricante.
- **Imagens**: os 41 produtos têm frasco sem fundo gerado por IA (abertura, cards, galeria), sem fotos
  reais. Veja a seção "Fotos" abaixo.
- **Catálogo**: 41 perfumes (19 O Boticário, 22 árabes), os 40 da lista pesquisada + Sabah Al Ward. Clash e
  Malbec Magnetic saíram em 31/10/2026 por não haver confirmação de que existem.
- **Entrega, pagamento, trocas e horário** estão marcados com `[a confirmar]` em `js/config.js`.
- **Logo**: o JAKA com o rabo de jacaré, o monograma JK e o rabo do K foram extraídos do cartão de visita
  (imagem de 863 px) como máscaras em `img/marca/` e pintados pela cor do tema. Servem bem até ~120 px de largura;
  para usos grandes (impressão, redes), pedir ao Diego o arquivo original do logo (SVG ou PNG grande).
- **Tema**: o site abre no tema escuro (verde) por decisão do Bruno em 31/10/2026; a escolha do cliente fica salva.
- **Jacaré e couro**: `img/marca/couro.jpg` (textura de couro de jacaré gerada por IA com `docs/prompt-jacare.md`)
  aparece bem discreta no menu lateral, no arco da abertura, no fundo da seção "A Jaka" e no topo do cartão.
  `img/marca/jacare-couro.webp` é o jacaré em traço dourado (também gerado) com a silhueta preenchida por essa
  textura (fechar o contorno, inundar o exterior, mascarar a textura, traço por cima); aparece nos estados vazios
  (sacola, favoritos, catálogo sem resultado, erro). A repetição da textura não foi validada como "sem emenda";
  nas opacidades usadas não aparece.
- **Seção "A Jaka", padrão:** o par de jacarés de couro parado (`.gator`: o grande à esquerda, o pequeno
  espelhado à direita, brilho passando pelo couro e leve deslocamento em sentidos opostos na rolagem). Foi a
  versão escolhida pelo Bruno em 31/10/2026. Duas alternativas de jacarés andando (couro cortado em peças
  articuladas e um modelo 3D geométrico, ambas a partir de pacotes gerados por IA) foram testadas e descartadas
  no mesmo dia; os pacotes originais continuam em Downloads (`jaka-jacare-animado.zip`, `jaka-jacare-v2.zip`).
- Quando tudo estiver real, troque `demo: true` por `demo: false` em `js/config.js` para remover a faixa e os avisos.

## Fotos

Todos os produtos usam só o frasco sem fundo (`recorte`). As fotos reais que existiam como segunda imagem
(3 árabes fotografados pelo Diego e 4 de divulgação de O Boticário) foram retiradas em 03/11/2026 a pedido do
Bruno, por destoarem do padrão; os originais continuam no OneDrive dele. O campo `fotos` segue funcionando:
se um dia houver fotos no padrão, basta apontar `fotos: [...]` no produto que elas viram as imagens seguintes
da galeria (e a troca no hover do card).

**Frascos sem fundo (`recorte`):** imagens WebP com transparência em `img/abertura/`, ligadas ao produto pelo
campo `recorte` em `js/products.js` (`src/w/h` da frente e, opcionalmente, `esq` e `dir` com o frasco girado).
Quando existe, o recorte é a primeira imagem do produto em todo o site (card, galeria, sacola, busca), sobre o
fundo do próprio site, igual nos temas claro e escuro; as fotos reais viram as imagens seguintes.

**Abertura (vitrine giratória):** os produtos com `recorte` entram na vitrine, na ordem da constante `VITRINE`
em `js/app.js`. Três ficam no palco; a cada 5 s (ou com as setas, os pontos, as setas do teclado e o clique nos
frascos laterais) o próximo gira para o centro, usando as imagens `esq`/`dir` nas laterais; as etiquetas de notas e
a legenda com preço acompanham o frasco do centro. Pausa com o mouse em cima, no foco do teclado e com a aba
escondida; com "movimento reduzido" não gira sozinha. No Android o palco inclina com o aparelho. Com menos de
3 recortes, a abertura volta aos frascos desenhados.

Os 41 recortes foram **gerados por IA** (Manus e GPT) em 30 e 31/10/2026 a partir de fotos de referência dos
frascos reais, com o prompt de `docs/prompt-manus.md`, e conferidos um a um contra a foto oficial (forma, cor,
rótulo, transparência). Não são fotografias. A origem de cada um e os detalhes conhecidamente imperfeitos estão em
`docs/fontes-imagens.md`. Os 8 da primeira leva têm também as vistas esq/dir usadas na vitrine.
Para recortar o fundo de uma foto real: `python tools/recortar-fundo.py <foto> <nome>`.

Fotos de clima (cards de família olfativa e faixa de chocolates) estão em `img/ambiente/` e vieram do Pexels
(licença livre para uso comercial, sem crédito obrigatório). Elas não representam produtos da loja.

Para preparar fotos novas: `python tools/preparar-fotos.py <pasta>` (precisa de `pip install pillow`).
Os recortes das fotos atuais estão registrados nesse script.

## Como a compra funciona

Não há pagamento online. A sacola monta uma mensagem com produtos, tamanhos, quantidades e subtotal
e abre o WhatsApp configurado (`wa.me/5542998618040`). O pedido só é confirmado pela loja na conversa.
Sacola, favoritos e tema ficam salvos no navegador do cliente (localStorage).
