# Origem das imagens dos frascos (img/abertura)

Todas são renders gerados por IA a partir de fotos de referência dos frascos reais (lista de URLs oficiais em
`docs/prompt-manus.md` e nos relatórios que o Manus entregou junto com os ZIPs). Não são fotografias.
Escolha feita em 31/10/2026 comparando, lado a lado, a foto oficial com cada candidato.

| Fonte | Resolução original | Produtos |
|---|---|---|
| GPT, leva 1 (30/10) — com vistas esq/dir | 1536×2304 | 9pm, asad, hawas, khamrah, lily, malbec, the-kingdom, yara |
| GPT, rodada 1 (`images*.zip`) | 1536×2304 | arbo, egeo-choc, malbec-edp |
| GPT, rodada 2 (`jaka-frascos-restantes.zip`) | 1536×2304 | egeo-blue, egeo-dolce, floratta-blue, floratta-rose, glamour-secrets-black, malbec-bleu, quasar, uomini, zaad |
| Manus (`jaka-frascos-completo.zip`) | 1086×1448 | amber-oud-gold, ameerat-al-arab, ana-abiyedh-rouge, asad-bourbon, bade-e-al-oud-amethyst, botica-214-golden-gardenia, club-de-nuit-intense, coffee-man, coffee-woman, elysee, fakhar-black, hawas-black, hayaati, khamrah-qahwa, lily-absolu, mayar, oud-mood, raghba, supremacy-silver, yara-tous |
| Gerado à parte pelo Bruno (31/10, "Frasco de perfume Sabah Al Ward.png" em Downloads) | 1086×1448 | sabah-al-ward |

Por que Manus em alguns de O Boticário: Coffee Man (logo "coffee" em cursiva, como o real), Coffee Woman (embalagem
atual com tampa escultural), Elysée e Lily Absolu (cor pêssego da referência). Nesses, o GPT seguiu descrições
erradas do pedido.

Versões escolhidas pelo Manus que valem conferir com o estoque do Diego: Lily = frasco clássico 75 ml; The Kingdom =
Men 100 ml; Ameerat Al Arab = Asdaaf original vermelho; Yara Tous = laranja; Ana Abiyedh Rouge = 60 ml;
Elysée = 50 ml; Malbec EDP = 90 ml; Zaad = 95 ml.

Detalhes miúdos sabidamente imperfeitos: anel do medalhão do Yara e do Yara Tous liso (texto pequeno removido);
9PM com "150 mL" na base; Malbec frontal ligeiramente oblíquo; cristais do The Kingdom variam entre vistas.

Não usados: as imagens de Pinterest/Pexels em `OneDrive\...\Nova pasta (2)\Nova pasta` (fundos bonitos, úteis só
como clima); as duplicatas descartadas ficam nos ZIPs originais na mesma pasta do OneDrive.
Pipeline de preparo (limpeza de alfa < 24, aparo com 1% de margem, altura 1100, WebP q82): ver `tools/`.
