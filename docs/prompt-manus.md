# Prompt para o Manus — frascos da Jaka Perfumaria

Cole no Manus tudo a partir da linha abaixo. Os `id` da lista são os nomes de arquivo que o site espera.

---

Você vai produzir imagens de frascos de perfume para o site da Jaka Perfumaria, uma perfumaria brasileira que vende O Boticário e perfumes árabes. As imagens entram em um site já pronto, então o formato, os nomes de arquivo e a consistência entre as imagens importam tanto quanto a beleza.

## 1. O que entregar

Um arquivo ZIP chamado `jaka-frascos.zip` com:

1. `recortes/ID.png` — um por perfume da lista (40 no total): o frasco de frente, fundo transparente.
2. `angulos/ID-esq.png` e `angulos/ID-dir.png` — só para os 8 perfumes marcados com ★: o mesmo frasco girado 20 a 25° para a esquerda e para a direita, fundo transparente, mesma luz e mesma escala do frontal.
3. `prancha.jpg` — folha de contato com todas as imagens em miniatura sobre fundo verde `#173F2E`, com o `id` escrito embaixo de cada uma, para conferência.
4. `lista.csv` — colunas `id;nome;marca;arquivos;observacao`, uma linha por perfume, com a observação de qualquer coisa que não saiu como pedido.

Opcional, só depois de a prancha ser aprovada: `ambiente/ID-ambiente.jpg`, 1200×1500 px, o frasco em cena com ingredientes das notas (uvas para Malbec, tâmaras e canela para Khamrah, e assim por diante), para a segunda foto da página do produto.

## 2. Fidelidade ao frasco real (o mais importante)

- Antes de gerar cada imagem, pesquise fotos oficiais do frasco real (site da marca, Fragrantica, lojas) e reproduza formato, proporções, cor do vidro e do líquido, tampa, rótulo e tipografia. A coluna "Frasco real" da lista é só um resumo; a foto de referência manda.
- O texto do rótulo precisa estar legível e correto (por exemplo, "KHAMRAH" e "Lattafa"). Nada de letras inventadas. Se não acertar o texto em 3 tentativas, entregue o rótulo liso, sem texto, e anote em `lista.csv`. Texto errado é pior do que rótulo liso.
- Não invente frascos. Um cliente que conhece o produto precisa reconhecê-lo na hora.
- Sem marca d'água, sem assinatura, sem texto fora do rótulo.

## 3. Padrão fotográfico (igual para todas)

- Fotografia de produto de estúdio, fotorrealista, lente de 85 a 100 mm, câmera na altura do meio do frasco (nem de cima, nem de baixo).
- Luz principal suave vinda de cima e da esquerda (softbox grande). Luz de recorte quente e dourada pela direita, discreta. O site é verde-petróleo e dourado, e essa luz quente conversa com ele.
- Reflexos limpos no vidro. Sem névoa, sem fumaça, sem respingos, sem ingredientes, sem cenário, sem mão.
- Frasco inteiro, de frente, tampa fechada, centralizado, ocupando cerca de 85% da altura da imagem, com margem em volta.
- Fundo 100% transparente, com canal alfa de verdade (não fundo branco, não xadrez). Sem sombra projetada no chão. Sem halo branco nas bordas.
- Tamanho: altura mínima de 2000 px, PNG-24 com alfa. A proporção é livre, o frasco define.
- Escala coerente: um frasco de 100 ml deve ter altura parecida entre marcas; um de 30 ml, menor. Mesma altura de câmera e mesma luz em todas, para que convivam lado a lado na vitrine.
- Para os ângulos (★): gire o frasco 20 a 25° (não a câmera), mantendo a mesma luz. O frontal, o esquerdo e o direito precisam parecer o mesmo objeto fotografado em sequência.

## 4. Nomes de arquivo

Exatamente o `id` da lista: minúsculas, sem acento, sem espaço, hífen entre palavras. Exemplos: `recortes/malbec.png`, `angulos/khamrah-esq.png`, `angulos/khamrah-dir.png`.

## 5. Conferência antes de entregar

Para cada imagem, verifique: (1) é o frasco real, reconhecível; (2) texto do rótulo correto ou liso; (3) fundo transparente, sem sombra e sem halo; (4) frasco inteiro, de frente, tampa fechada; (5) altura de 2000 px ou mais; (6) nome do arquivo igual ao `id`. Refaça o que falhar. Entregue a prancha para aprovação antes de gerar os ambientes.

## 6. Lista de perfumes

★ = gerar também os ângulos esquerdo e direito. Famílias usadas no site: Frescos, Florais, Amadeirados, Âmbar & Gourmand.

### O Boticário (nacionais) — essenciais

| id | Nome | Família | Público | Frasco real (resumo; confira a referência) |
|---|---|---|---|---|
| malbec ★ | Malbec Tradicional | Amadeirados | Masculino | vidro bordô translúcido, retangular de ombros arredondados, tampa preta texturizada |
| malbec-edp | Malbec Eau de Parfum | Amadeirados | Masculino | mesmo formato, vidro mais escuro, tampa marrom tipo couro com anel dourado |
| zaad | Zaad | Amadeirados | Masculino | retangular, preto fosco, detalhes prata |
| quasar | Quasar Classic | Frescos | Masculino | retangular, vidro azul, tampa prata |
| arbo | Arbo | Frescos | Masculino | vidro verde escuro, tampa de madeira |
| lily ★ | Lily Eau de Parfum | Florais | Feminino | arredondado, vidro âmbar dourado, tampa dourada |
| lily-absolu | Lily Absolu | Florais | Feminino | mesmo formato do Lily, vidro escuro quase preto, tampa dourada |
| floratta-blue | Floratta Blue | Frescos | Feminino | arredondado, vidro azul claro, tampa com flor |
| glamour-secrets-black | Glamour Secrets Black | Florais | Feminino | redondo, preto, tampa dourada |
| egeo-dolce | Egeo Dolce | Âmbar & Gourmand | Feminino | rosa, superfície com textura de bolhas, tampa rosa |
| coffee-woman | Coffee Woman Seduction | Âmbar & Gourmand | Feminino | vidro vermelho translúcido, tampa verde escura |

### O Boticário (nacionais) — complementares

| id | Nome | Família | Público | Frasco real (resumo; confira a referência) |
|---|---|---|---|---|
| malbec-bleu | Malbec Bleu | Frescos | Masculino | formato Malbec, vidro azul |
| uomini | Uomini | Amadeirados | Masculino | preto com detalhes prata |
| egeo-blue | Egeo Blue | Frescos | Masculino | azul, textura de bolhas |
| floratta-rose | Floratta Rose | Florais | Feminino | formato Floratta, rosa |
| egeo-choc | Egeo Choc | Âmbar & Gourmand | Feminino | marrom chocolate, textura de bolhas |
| coffee-man | Coffee Man | Âmbar & Gourmand | Masculino | marrom escuro |
| elysee | Elysée Eau de Parfum | Florais | Feminino | arredondado dourado, tampa dourada |
| botica-214-golden-gardenia | Botica 214 Golden Gardenia | Florais | Feminino | cilíndrico transparente, tampa preta, rótulo minimalista |

### Árabes — essenciais

| id | Nome | Marca | Família | Público | Frasco real (resumo; confira a referência) |
|---|---|---|---|---|---|
| khamrah ★ | Khamrah | Lattafa | Âmbar & Gourmand | Compartilhável | arredondado, vidro âmbar, tampa marrom escura larga, rótulo dourado |
| asad ★ | Asad | Lattafa | Amadeirados | Masculino | retangular preto, tampa dourada |
| yara ★ | Yara | Lattafa | Florais | Feminino | arredondado rosa, tampa rosa, rótulo dourado |
| yara-tous | Yara Tous | Lattafa | Florais | Feminino | mesmo formato do Yara, branco perolado |
| fakhar-black | Fakhar Black | Lattafa | Frescos | Masculino | retangular preto, detalhes prata |
| the-kingdom ★ | The Kingdom | Lattafa | Âmbar & Gourmand | Compartilhável | dourado metálico com frisos verticais e cristais, tampa dourada |
| hawas ★ | Hawas for Him | Rasasi | Frescos | Masculino | vidro grosso retangular, líquido roxo, tampa prata texturizada |
| hawas-black | Hawas Black | Rasasi | Amadeirados | Masculino | mesmo frasco do Hawas, preto |
| club-de-nuit-intense | Club de Nuit Intense Man | Armaf | Amadeirados | Masculino | preto, rótulo prata, tampa com topo vermelho |
| 9pm ★ | 9PM | Afnan | Âmbar & Gourmand | Masculino | retangular, vidro roxo e azul escuro, tampa dourada |
| supremacy-silver | Supremacy Silver | Afnan | Frescos | Masculino | retangular, prata metálico |
| ameerat-al-arab | Ameerat Al Arab | Asdaaf | Florais | Feminino | rosa, tampa dourada |
| ana-abiyedh-rouge | Ana Abiyedh Rouge | Lattafa | Âmbar & Gourmand | Feminino | vermelho em forma de lanterna árabe, tampa dourada |

### Árabes — complementares

| id | Nome | Marca | Família | Público | Frasco real (resumo; confira a referência) |
|---|---|---|---|---|---|
| khamrah-qahwa | Khamrah Qahwa | Lattafa | Âmbar & Gourmand | Compartilhável | formato Khamrah, tons marrom e roxo |
| asad-bourbon | Asad Bourbon | Lattafa | Amadeirados | Masculino | formato Asad, marrom avermelhado, tampa dourada |
| oud-mood | Oud Mood | Lattafa | Âmbar & Gourmand | Compartilhável | retangular preto e dourado |
| raghba | Raghba | Lattafa | Âmbar & Gourmand | Compartilhável | vidro âmbar, tampa de madeira |
| hayaati | Hayaati | Lattafa | Frescos | Masculino | verde-azulado, tampa dourada |
| mayar | Mayar | Lattafa | Florais | Feminino | arredondado rosa |
| bade-e-al-oud-amethyst | Bade'e Al Oud Amethyst | Lattafa | Âmbar & Gourmand | Compartilhável | facetado roxo |
| amber-oud-gold | Amber Oud Gold Edition | Al Haramain | Âmbar & Gourmand | Compartilhável | quadrado dourado metálico, tampa preta e dourada |

Ordem de produção sugerida: primeiro os 8 ★ (frontal e ângulos), depois os essenciais, depois os complementares. Mande a prancha parcial dos 8 ★ assim que estiverem prontos, para aprovar o padrão antes de seguir.
