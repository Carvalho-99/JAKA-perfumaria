/* ==========================================================
   CATÁLOGO — preços, estoque e notas são de DEMONSTRAÇÃO.
   Para usar fotos reais, coloque os arquivos em img/produtos/
   e preencha "fotos": ['img/produtos/khamrah-1.jpg', 'img/produtos/khamrah-2.jpg'].
   Sem fotos, o site desenha o frasco a partir de "frasco".
   "recorte" = imagem do frasco SEM FUNDO (WebP/PNG), usada só na abertura, com largura e altura em pixels.
   familia: frescos | florais | amadeirados | ambar
   origem:  nacional | arabe
   ========================================================== */
window.PRODUCTS = [
  // ---------- O Boticário ----------
  {
    id: 'malbec', nome: 'Malbec Tradicional', marca: 'O Boticário', origem: 'nacional',
    familia: 'amadeirados', genero: 'Masculino', destaque: true,
    descricao: 'Um clássico brasileiro com acorde que lembra o vinho envelhecido em barris de carvalho. Encorpado, elegante e fácil de reconhecer.',
    notas: { saida: ['Bergamota', 'Notas aldeídicas'], coracao: ['Acorde de vinho', 'Cedro'], fundo: ['Carvalho', 'Baunilha', 'Almíscar'] },
    ocasioes: ['Noite', 'Trabalho', 'Frio'],
    frasco: { forma: 'classico', liquido: '#5A1A22', tampa: '#1E1410', rotulo: '#E2CFAE' },
    recorte: { src: 'img/abertura/malbec.webp', w: 430, h: 1100, esq: { src: 'img/abertura/malbec-esq.webp', w: 356, h: 900 }, dir: { src: 'img/abertura/malbec-dir.webp', w: 349, h: 900 } },
    fotos: ['img/produtos/malbec-1.jpg'], variacoes: [{ ml: 100, preco: 229.90, estoque: 6 }]
  },
  {
    id: 'malbec-edp', nome: 'Malbec Eau de Parfum', marca: 'O Boticário', origem: 'nacional',
    familia: 'amadeirados', genero: 'Masculino', destaque: true,
    descricao: 'A versão mais concentrada do Malbec: couro, baunilha e o acorde de vinho em uma assinatura mais densa e duradoura.',
    notas: { saida: ['Bergamota', 'Pimenta rosa'], coracao: ['Acorde de vinho', 'Couro'], fundo: ['Baunilha', 'Carvalho', 'Âmbar'] },
    ocasioes: ['Noite', 'Ocasiões especiais', 'Frio'],
    frasco: { forma: 'classico', liquido: '#3A0F16', tampa: '#4A2A1E', rotulo: '#C9A15B' },
    recorte: { src: 'img/abertura/malbec-edp.webp', w: 413, h: 1100 },
    fotos: ['img/produtos/malbec-edp-1.jpg'], variacoes: [{ ml: 90, preco: 299.90, estoque: 4 }]
  },
  {
    id: 'malbec-bleu', nome: 'Malbec Bleu', marca: 'O Boticário', origem: 'nacional',
    familia: 'frescos', genero: 'Masculino', destaque: false,
    descricao: 'O Malbec de dia: a assinatura do vinho encontra notas frescas e marinhas. Leve, para o calor.',
    notas: { saida: ['Bergamota', 'Notas marinhas'], coracao: ['Lavanda', 'Acorde de vinho'], fundo: ['Madeiras claras', 'Almíscar'] },
    ocasioes: ['Dia', 'Calor', 'Trabalho'],
    recorte: { src: 'img/abertura/malbec-bleu.webp', w: 447, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 229.90, estoque: 5 }]
  },
  {
    id: 'arbo', nome: 'Arbo', marca: 'O Boticário', origem: 'nacional',
    familia: 'frescos', genero: 'Masculino', destaque: true,
    descricao: 'Fresco e verde, com cheiro de mata depois da chuva. Leve para o dia a dia e para o calor.',
    notas: { saida: ['Bergamota', 'Limão', 'Maçã verde'], coracao: ['Lavanda', 'Gerânio', 'Folhas verdes'], fundo: ['Madeiras', 'Musgo', 'Âmbar'] },
    ocasioes: ['Dia', 'Calor', 'Trabalho'],
    recorte: { src: 'img/abertura/arbo.webp', w: 625, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 139.90, estoque: 9 }]
  },
  {
    id: 'uomini', nome: 'Uomini', marca: 'O Boticário', origem: 'nacional',
    familia: 'amadeirados', genero: 'Masculino', destaque: false,
    descricao: 'Amadeirado especiado de personalidade forte, com couro e vetiver. Para quem gosta de presença.',
    notas: { saida: ['Bergamota', 'Cardamomo'], coracao: ['Noz-moscada', 'Couro'], fundo: ['Vetiver', 'Cedro', 'Âmbar'] },
    ocasioes: ['Noite', 'Trabalho', 'Frio'],
    recorte: { src: 'img/abertura/uomini.webp', w: 725, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 169.90, estoque: 6 }]
  },
  {
    id: 'egeo-blue', nome: 'Egeo Blue', marca: 'O Boticário', origem: 'nacional',
    familia: 'frescos', genero: 'Masculino', destaque: false,
    descricao: 'Fresco e vibrante, com hortelã e notas aquáticas. Energia para o dia.',
    notas: { saida: ['Limão', 'Hortelã'], coracao: ['Notas aquáticas', 'Gengibre'], fundo: ['Almíscar', 'Madeiras'] },
    ocasioes: ['Dia', 'Calor'],
    recorte: { src: 'img/abertura/egeo-blue.webp', w: 442, h: 1100 },
    fotos: [], variacoes: [{ ml: 90, preco: 149.90, estoque: 8 }]
  },
  {
    id: 'coffee-man', nome: 'Coffee Man', marca: 'O Boticário', origem: 'nacional',
    familia: 'ambar', genero: 'Masculino', destaque: false,
    descricao: 'Café torrado e especiarias em um amadeirado quente, para a noite e o frio.',
    notas: { saida: ['Bergamota', 'Pimenta'], coracao: ['Café', 'Cardamomo'], fundo: ['Fava tonka', 'Madeiras', 'Âmbar'] },
    ocasioes: ['Noite', 'Frio'],
    recorte: { src: 'img/abertura/coffee-man.webp', w: 894, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 179.90, estoque: 5 }]
  },
  {
    id: 'lily-absolu', nome: 'Lily Absolu', marca: 'O Boticário', origem: 'nacional',
    familia: 'florais', genero: 'Feminino', destaque: false,
    descricao: 'A versão mais intensa do Lily: floral cremoso e envolvente, com fundo de baunilha.',
    notas: { saida: ['Pera', 'Bergamota', 'Pimenta rosa'], coracao: ['Lírio', 'Jasmim', 'Tuberosa'], fundo: ['Sândalo', 'Baunilha', 'Almíscar'] },
    ocasioes: ['Noite', 'Ocasiões especiais', 'Frio'],
    recorte: { src: 'img/abertura/lily-absolu.webp', w: 1050, h: 1100 },
    fotos: [], variacoes: [{ ml: 75, preco: 329.90, estoque: 3 }]
  },
  {
    id: 'floratta-rose', nome: 'Floratta Rose', marca: 'O Boticário', origem: 'nacional',
    familia: 'florais', genero: 'Feminino', destaque: false,
    descricao: 'Floral romântico de rosas, leve e delicado, feito para o dia.',
    notas: { saida: ['Frutas vermelhas', 'Bergamota'], coracao: ['Rosa', 'Peônia'], fundo: ['Almíscar', 'Madeiras claras'] },
    ocasioes: ['Dia', 'Trabalho'],
    recorte: { src: 'img/abertura/floratta-rose.webp', w: 819, h: 1100 },
    fotos: [], variacoes: [{ ml: 75, preco: 149.90, estoque: 6 }]
  },
  {
    id: 'egeo-choc', nome: 'Egeo Choc', marca: 'O Boticário', origem: 'nacional',
    familia: 'ambar', genero: 'Feminino', destaque: false,
    descricao: 'Gourmand de chocolate com frutas vermelhas. Doce, divertido e viciante.',
    notas: { saida: ['Framboesa', 'Laranja'], coracao: ['Chocolate', 'Flor de laranjeira'], fundo: ['Baunilha', 'Caramelo'] },
    ocasioes: ['Dia', 'Frio'],
    recorte: { src: 'img/abertura/egeo-choc.webp', w: 441, h: 1100 },
    fotos: [], variacoes: [{ ml: 90, preco: 159.90, estoque: 7 }]
  },
  {
    id: 'elysee', nome: 'Elysée Eau de Parfum', marca: 'O Boticário', origem: 'nacional',
    familia: 'florais', genero: 'Feminino', destaque: true,
    descricao: 'Floral chipre sofisticado, de inspiração francesa. Elegância para ocasiões especiais.',
    notas: { saida: ['Pera', 'Bergamota', 'Pimenta rosa'], coracao: ['Rosa', 'Jasmim', 'Íris'], fundo: ['Patchouli', 'Baunilha', 'Almíscar'] },
    ocasioes: ['Ocasiões especiais', 'Noite'],
    recorte: { src: 'img/abertura/elysee.webp', w: 823, h: 1100 },
    fotos: [], variacoes: [{ ml: 50, preco: 299.90, estoque: 4 }]
  },
  {
    id: 'botica-214-golden-gardenia', nome: 'Botica 214 Golden Gardenia', marca: 'O Boticário', origem: 'nacional',
    familia: 'florais', genero: 'Feminino', destaque: false,
    descricao: 'Gardênia luminosa em um floral branco cremoso, da linha mais sofisticada de O Boticário.',
    notas: { saida: ['Bergamota', 'Pera'], coracao: ['Gardênia', 'Jasmim', 'Tuberosa'], fundo: ['Sândalo', 'Almíscar'] },
    ocasioes: ['Ocasiões especiais', 'Dia'],
    recorte: { src: 'img/abertura/botica-214-golden-gardenia.webp', w: 508, h: 1100 },
    fotos: [], variacoes: [{ ml: 75, preco: 279.90, estoque: 3 }]
  },
  {
    id: 'zaad', nome: 'Zaad', marca: 'O Boticário', origem: 'nacional',
    familia: 'amadeirados', genero: 'Masculino', destaque: false,
    descricao: 'Amadeirado aromático de assinatura forte, com lavanda e um fundo âmbar que deixa rastro.',
    notas: { saida: ['Bergamota', 'Notas aromáticas'], coracao: ['Lavanda', 'Gerânio'], fundo: ['Âmbar', 'Madeiras', 'Fava tonka'] },
    ocasioes: ['Noite', 'Ocasiões especiais'],
    frasco: { forma: 'classico', liquido: '#1E1E22', tampa: '#B08A4A', rotulo: '#B08A4A' },
    recorte: { src: 'img/abertura/zaad.webp', w: 563, h: 1100 },
    fotos: [], variacoes: [{ ml: 95, preco: 259.90, estoque: 3 }]
  },
  {
    id: 'quasar', nome: 'Quasar Classic', marca: 'O Boticário', origem: 'nacional',
    familia: 'frescos', genero: 'Masculino', destaque: false,
    descricao: 'Fresco, cítrico e aquático. Sensação de banho tomado para usar no calor e no dia a dia.',
    notas: { saida: ['Bergamota', 'Limão'], coracao: ['Lavanda', 'Notas aquáticas'], fundo: ['Musgo', 'Madeiras claras'] },
    ocasioes: ['Dia', 'Calor', 'Trabalho'],
    frasco: { forma: 'cilindro', liquido: '#3E7FA8', tampa: '#C8D2D8', rotulo: '#E8F1F6' },
    recorte: { src: 'img/abertura/quasar.webp', w: 558, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 149.90, estoque: 8 }]
  },
  {
    id: 'lily', nome: 'Lily Eau de Parfum', marca: 'O Boticário', origem: 'nacional',
    familia: 'florais', genero: 'Feminino', destaque: true,
    descricao: 'Floral luminoso e sofisticado, construído em torno do lírio. Delicado, com presença.',
    notas: { saida: ['Bergamota', 'Pera'], coracao: ['Lírio', 'Jasmim'], fundo: ['Sândalo', 'Almíscar'] },
    ocasioes: ['Ocasiões especiais', 'Noite'],
    frasco: { forma: 'gota', liquido: '#F2E4CF', tampa: '#C9A15B', rotulo: '#FFFFFF' },
    recorte: { src: 'img/abertura/lily.webp', w: 1110, h: 1100, esq: { src: 'img/abertura/lily-esq.webp', w: 869, h: 900 }, dir: { src: 'img/abertura/lily-dir.webp', w: 902, h: 900 } },
    fotos: ['img/produtos/lily-1.jpg'], variacoes: [{ ml: 75, preco: 309.90, estoque: 4 }, { ml: 30, preco: 169.90, estoque: 2 }]
  },
  {
    id: 'floratta-blue', nome: 'Floratta Blue', marca: 'O Boticário', origem: 'nacional',
    familia: 'frescos', genero: 'Feminino', destaque: false,
    descricao: 'Floral aquático, leve e alegre. Feito para o dia, o calor e quem gosta de discrição.',
    notas: { saida: ['Maçã', 'Bergamota'], coracao: ['Flor de lótus', 'Jasmim'], fundo: ['Almíscar', 'Madeiras claras'] },
    ocasioes: ['Dia', 'Calor'],
    frasco: { forma: 'redondo', liquido: '#8FB8E0', tampa: '#DDE9F5', rotulo: '#FFFFFF' },
    recorte: { src: 'img/abertura/floratta-blue.webp', w: 807, h: 1100 },
    fotos: [], variacoes: [{ ml: 75, preco: 149.90, estoque: 7 }]
  },
  {
    id: 'glamour-secrets-black', nome: 'Glamour Secrets Black', marca: 'O Boticário', origem: 'nacional',
    familia: 'florais', genero: 'Feminino', destaque: false,
    descricao: 'Floral intenso e misterioso, com fundo de baunilha e patchouli para a noite.',
    notas: { saida: ['Frutas vermelhas'], coracao: ['Rosa', 'Flor de laranjeira'], fundo: ['Baunilha', 'Patchouli'] },
    ocasioes: ['Noite', 'Ocasiões especiais'],
    frasco: { forma: 'redondo', liquido: '#2A1E2E', tampa: '#C9A15B', rotulo: '#C9A15B' },
    recorte: { src: 'img/abertura/glamour-secrets-black.webp', w: 519, h: 1100 },
    fotos: [], variacoes: [{ ml: 75, preco: 179.90, estoque: 5 }]
  },
  {
    id: 'egeo-dolce', nome: 'Egeo Dolce', marca: 'O Boticário', origem: 'nacional',
    familia: 'ambar', genero: 'Feminino', destaque: false,
    descricao: 'Gourmand divertido e açucarado, com algodão-doce e baunilha. Doce na medida para o dia a dia.',
    notas: { saida: ['Framboesa'], coracao: ['Algodão-doce', 'Marshmallow'], fundo: ['Baunilha', 'Almíscar'] },
    ocasioes: ['Dia', 'Frio'],
    frasco: { forma: 'redondo', liquido: '#E8A0B8', tampa: '#F3E6EC', rotulo: '#FFFFFF' },
    recorte: { src: 'img/abertura/egeo-dolce.webp', w: 450, h: 1100 },
    fotos: [], variacoes: [{ ml: 90, preco: 159.90, estoque: 6 }]
  },
  {
    id: 'coffee-woman', nome: 'Coffee Woman Seduction', marca: 'O Boticário', origem: 'nacional',
    familia: 'ambar', genero: 'Feminino', destaque: false,
    descricao: 'Café cremoso encontra flor de laranjeira e caramelo. Aconchegante e marcante.',
    notas: { saida: ['Frutas vermelhas'], coracao: ['Café', 'Flor de laranjeira'], fundo: ['Baunilha', 'Caramelo'] },
    ocasioes: ['Noite', 'Frio'],
    frasco: { forma: 'gota', liquido: '#6A3B2A', tampa: '#2B1A14', rotulo: '#E6CFB4' },
    recorte: { src: 'img/abertura/coffee-woman.webp', w: 809, h: 1100 },
    fotos: ['img/produtos/coffee-woman-1.jpg'], variacoes: [{ ml: 100, preco: 179.90, estoque: 4 }]
  },

  // ---------- Árabes ----------
  {
    id: 'hawas', nome: 'Hawas for Him', marca: 'Rasasi', origem: 'arabe',
    familia: 'frescos', genero: 'Masculino', destaque: true,
    descricao: 'Aquático e frutado, com maçã e canela na abertura e um fundo âmbar que dura o dia inteiro. Um dos árabes mais pedidos.',
    notas: { saida: ['Maçã', 'Bergamota', 'Canela', 'Limão'], coracao: ['Acorde aquático', 'Cardamomo', 'Pimenta', 'Ameixa'], fundo: ['Âmbar', 'Almíscar', 'Sândalo', 'Patchouli'] },
    ocasioes: ['Dia', 'Calor', 'Trabalho'],
    frasco: { forma: 'classico', liquido: '#9B7FC4', tampa: '#4A4A50', rotulo: '#E8E4F2' },
    recorte: { src: 'img/abertura/hawas.webp', w: 642, h: 1100, esq: { src: 'img/abertura/hawas-esq.webp', w: 516, h: 900 }, dir: { src: 'img/abertura/hawas-dir.webp', w: 517, h: 900 } },
    fotos: ['img/produtos/hawas-1.jpg', 'img/produtos/arabes-trio.jpg'], variacoes: [{ ml: 100, preco: 379.90, estoque: 3 }, { ml: 10, preco: 64.90, estoque: 8 }]
  },
  {
    id: 'hawas-black', nome: 'Hawas Black', marca: 'Rasasi', origem: 'arabe',
    familia: 'amadeirados', genero: 'Masculino', destaque: true,
    descricao: 'A versão noturna do Hawas: mais escuro, especiado e amadeirado, com couro e âmbar no fundo.',
    notas: { saida: ['Bergamota', 'Pimenta preta', 'Cardamomo'], coracao: ['Couro', 'Lavanda', 'Noz-moscada'], fundo: ['Âmbar', 'Vetiver', 'Madeiras escuras'] },
    ocasioes: ['Noite', 'Frio', 'Ocasiões especiais'],
    frasco: { forma: 'classico', liquido: '#141414', tampa: '#1C1C1C', rotulo: '#C9A15B' },
    recorte: { src: 'img/abertura/hawas-black.webp', w: 639, h: 1100 },
    fotos: ['img/produtos/hawas-black-1.jpg', 'img/produtos/arabes-trio.jpg'], variacoes: [{ ml: 100, preco: 399.90, estoque: 2 }, { ml: 10, preco: 69.90, estoque: 6 }]
  },
  {
    id: 'the-kingdom', nome: 'The Kingdom', marca: 'Lattafa', origem: 'arabe',
    familia: 'ambar', genero: 'Compartilhável', destaque: true,
    descricao: 'Frasco dourado e perfume à altura: açafrão e frutas sobre um fundo rico de âmbar, oud e baunilha.',
    notas: { saida: ['Açafrão', 'Frutas vermelhas', 'Bergamota'], coracao: ['Rosa', 'Jasmim', 'Especiarias'], fundo: ['Âmbar', 'Oud', 'Baunilha', 'Almíscar'] },
    ocasioes: ['Noite', 'Ocasiões especiais', 'Frio'],
    frasco: { forma: 'facetado', liquido: '#C9A15B', tampa: '#D9B56A', rotulo: '#B08A4A' },
    recorte: { src: 'img/abertura/the-kingdom.webp', w: 587, h: 1100, esq: { src: 'img/abertura/the-kingdom-esq.webp', w: 473, h: 900 }, dir: { src: 'img/abertura/the-kingdom-dir.webp', w: 490, h: 900 } },
    fotos: ['img/produtos/the-kingdom-1.jpg', 'img/produtos/arabes-trio.jpg'], variacoes: [{ ml: 100, preco: 329.90, estoque: 3 }, { ml: 10, preco: 54.90, estoque: 10 }]
  },
  {
    id: 'khamrah', nome: 'Khamrah', marca: 'Lattafa', origem: 'arabe',
    familia: 'ambar', genero: 'Compartilhável', destaque: true,
    descricao: 'Especiado e licoroso: canela, tâmaras e praliné sobre um fundo quente de baunilha e resinas.',
    notas: { saida: ['Canela', 'Noz-moscada', 'Bergamota'], coracao: ['Tâmaras', 'Praliné', 'Nardo'], fundo: ['Baunilha', 'Fava tonka', 'Benjoim', 'Mirra'] },
    ocasioes: ['Noite', 'Frio', 'Ocasiões especiais'],
    frasco: { forma: 'facetado', liquido: '#9A4520', tampa: '#C9A15B', rotulo: '#C9A15B' },
    recorte: { src: 'img/abertura/khamrah.webp', w: 695, h: 1100, esq: { src: 'img/abertura/khamrah-esq.webp', w: 613, h: 900 }, dir: { src: 'img/abertura/khamrah-dir.webp', w: 578, h: 900 } },
    fotos: [], variacoes: [{ ml: 100, preco: 289.90, estoque: 5 }, { ml: 10, preco: 49.90, estoque: 12 }]
  },
  {
    id: 'asad', nome: 'Asad', marca: 'Lattafa', origem: 'arabe',
    familia: 'amadeirados', genero: 'Masculino', destaque: true,
    descricao: 'Pimenta-preta, tabaco e café em um amadeirado ambarado, escuro e seguro de si.',
    notas: { saida: ['Pimenta-preta', 'Abacaxi', 'Tabaco'], coracao: ['Café', 'Íris', 'Patchouli'], fundo: ['Baunilha', 'Âmbar', 'Madeiras secas', 'Benjoim'] },
    ocasioes: ['Noite', 'Frio'],
    frasco: { forma: 'cilindro', liquido: '#1A1A1A', tampa: '#C9A15B', rotulo: '#C9A15B' },
    recorte: { src: 'img/abertura/asad.webp', w: 501, h: 1100, esq: { src: 'img/abertura/asad-esq.webp', w: 409, h: 900 }, dir: { src: 'img/abertura/asad-dir.webp', w: 400, h: 900 } },
    fotos: [], variacoes: [{ ml: 100, preco: 249.90, estoque: 4 }, { ml: 10, preco: 44.90, estoque: 0 }]
  },
  {
    id: 'yara', nome: 'Yara', marca: 'Lattafa', origem: 'arabe',
    familia: 'florais', genero: 'Feminino', destaque: true,
    descricao: 'Floral cremoso com orquídea, heliotrópio e um toque tropical. Doce, macio e muito querido.',
    notas: { saida: ['Orquídea', 'Heliotrópio', 'Tangerina'], coracao: ['Acorde gourmand', 'Frutas tropicais'], fundo: ['Baunilha', 'Almíscar', 'Sândalo'] },
    ocasioes: ['Dia', 'Noite', 'Ocasiões especiais'],
    frasco: { forma: 'gota', liquido: '#F0B6C8', tampa: '#F7E9EE', rotulo: '#FFFFFF' },
    recorte: { src: 'img/abertura/yara.webp', w: 487, h: 1100, esq: { src: 'img/abertura/yara-esq.webp', w: 406, h: 900 }, dir: { src: 'img/abertura/yara-dir.webp', w: 384, h: 900 } },
    fotos: [], variacoes: [{ ml: 100, preco: 239.90, estoque: 6 }, { ml: 10, preco: 42.90, estoque: 9 }]
  },
  {
    id: 'club-de-nuit-intense', nome: 'Club de Nuit Intense Man', marca: 'Armaf', origem: 'arabe',
    familia: 'amadeirados', genero: 'Masculino', destaque: false,
    descricao: 'Abertura cítrica e frutada que evolui para bétula defumada e almíscar.',
    notas: { saida: ['Limão', 'Abacaxi', 'Groselha-preta', 'Maçã'], coracao: ['Bétula', 'Jasmim', 'Rosa'], fundo: ['Almíscar', 'Âmbar cinza', 'Patchouli', 'Baunilha'] },
    ocasioes: ['Noite', 'Trabalho'],
    frasco: { forma: 'cilindro', liquido: '#20262B', tampa: '#2C3238', rotulo: '#9AA3AA' },
    recorte: { src: 'img/abertura/club-de-nuit-intense.webp', w: 694, h: 1100 },
    fotos: [], variacoes: [{ ml: 105, preco: 399.90, estoque: 3 }, { ml: 10, preco: 59.90, estoque: 6 }]
  },
  {
    id: 'sabah-al-ward', nome: 'Sabah Al Ward', marca: 'Al Wataniah', origem: 'arabe',
    familia: 'florais', genero: 'Feminino', destaque: false,
    descricao: 'Rosa e frutas vermelhas em um floral romântico, com fundo macio de almíscar.',
    notas: { saida: ['Rosa', 'Frutas vermelhas'], coracao: ['Peônia', 'Jasmim'], fundo: ['Almíscar', 'Baunilha'] },
    ocasioes: ['Dia', 'Ocasiões especiais'],
    frasco: { forma: 'facetado', liquido: '#E7A3A8', tampa: '#D9B56A', rotulo: '#D9B56A' },
    recorte: { src: 'img/abertura/sabah-al-ward.webp', w: 455, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 229.90, estoque: 0 }]
  },
  {
    id: '9pm', nome: '9PM', marca: 'Afnan', origem: 'arabe',
    familia: 'ambar', genero: 'Masculino', destaque: false,
    descricao: 'Maçã, canela e baunilha em um âmbar adocicado, feito para a noite.',
    notas: { saida: ['Maçã', 'Canela', 'Lavanda', 'Bergamota'], coracao: ['Flor de laranjeira', 'Lírio-do-vale'], fundo: ['Baunilha', 'Fava tonka', 'Âmbar', 'Patchouli'] },
    ocasioes: ['Noite', 'Frio'],
    frasco: { forma: 'facetado', liquido: '#2B2340', tampa: '#C9A15B', rotulo: '#C9A15B' },
    recorte: { src: 'img/abertura/9pm.webp', w: 446, h: 1100, esq: { src: 'img/abertura/9pm-esq.webp', w: 355, h: 900 }, dir: { src: 'img/abertura/9pm-dir.webp', w: 365, h: 900 } },
    fotos: [], variacoes: [{ ml: 100, preco: 279.90, estoque: 4 }, { ml: 10, preco: 49.90, estoque: 8 }]
  },
  {
    id: 'fakhar-black', nome: 'Fakhar Black', marca: 'Lattafa', origem: 'arabe',
    familia: 'frescos', genero: 'Masculino', destaque: false,
    descricao: 'Fresco aromático com gengibre, maçã e lavanda. Limpo e versátil, do trabalho ao fim de semana.',
    notas: { saida: ['Gengibre', 'Bergamota', 'Maçã'], coracao: ['Lavanda', 'Sálvia', 'Gerânio'], fundo: ['Fava tonka', 'Madeiras', 'Vetiver'] },
    ocasioes: ['Dia', 'Trabalho', 'Calor'],
    frasco: { forma: 'classico', liquido: '#141414', tampa: '#9AA0A6', rotulo: '#9AA0A6' },
    recorte: { src: 'img/abertura/fakhar-black.webp', w: 692, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 219.90, estoque: 5 }]
  },
  {
    id: 'khamrah-qahwa', nome: 'Khamrah Qahwa', marca: 'Lattafa', origem: 'arabe',
    familia: 'ambar', genero: 'Compartilhável', destaque: true,
    descricao: 'O Khamrah em versão café: cardamomo, praliné e baunilha, quente e aconchegante.',
    notas: { saida: ['Canela', 'Cardamomo', 'Gengibre'], coracao: ['Café', 'Praliné', 'Jasmim'], fundo: ['Baunilha', 'Benjoim', 'Madeiras'] },
    ocasioes: ['Noite', 'Frio'],
    recorte: { src: 'img/abertura/khamrah-qahwa.webp', w: 690, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 299.90, estoque: 4 }, { ml: 10, preco: 49.90, estoque: 10 }]
  },
  {
    id: 'asad-bourbon', nome: 'Asad Bourbon', marca: 'Lattafa', origem: 'arabe',
    familia: 'amadeirados', genero: 'Masculino', destaque: false,
    descricao: 'Bourbon, tabaco e baunilha em um amadeirado licoroso, mais doce que o Asad original.',
    notas: { saida: ['Bergamota', 'Pimenta rosa', 'Bourbon'], coracao: ['Tabaco', 'Canela', 'Café'], fundo: ['Baunilha', 'Âmbar', 'Madeiras'] },
    ocasioes: ['Noite', 'Frio', 'Ocasiões especiais'],
    recorte: { src: 'img/abertura/asad-bourbon.webp', w: 547, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 269.90, estoque: 3 }, { ml: 10, preco: 46.90, estoque: 8 }]
  },
  {
    id: 'yara-tous', nome: 'Yara Tous', marca: 'Lattafa', origem: 'arabe',
    familia: 'florais', genero: 'Feminino', destaque: false,
    descricao: 'A irmã solar do Yara: frutado, tropical e doce, para dias de sol.',
    notas: { saida: ['Frutas tropicais', 'Tangerina'], coracao: ['Jasmim', 'Ylang-ylang'], fundo: ['Baunilha', 'Almíscar', 'Sândalo'] },
    ocasioes: ['Dia', 'Calor'],
    recorte: { src: 'img/abertura/yara-tous.webp', w: 515, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 239.90, estoque: 5 }, { ml: 10, preco: 42.90, estoque: 9 }]
  },
  {
    id: 'mayar', nome: 'Mayar', marca: 'Lattafa', origem: 'arabe',
    familia: 'florais', genero: 'Feminino', destaque: false,
    descricao: 'Floral frutado doce e feminino, com baunilha no fundo. Delicado e marcante.',
    notas: { saida: ['Frutas vermelhas', 'Pêssego'], coracao: ['Rosa', 'Jasmim', 'Peônia'], fundo: ['Baunilha', 'Almíscar', 'Sândalo'] },
    ocasioes: ['Dia', 'Noite'],
    recorte: { src: 'img/abertura/mayar.webp', w: 447, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 229.90, estoque: 4 }, { ml: 10, preco: 39.90, estoque: 8 }]
  },
  {
    id: 'ameerat-al-arab', nome: 'Ameerat Al Arab', marca: 'Asdaaf', origem: 'arabe',
    familia: 'florais', genero: 'Feminino', destaque: true,
    descricao: 'Floral frutado doce, a "princesa árabe": romântico e de longa duração.',
    notas: { saida: ['Frutas vermelhas', 'Bergamota'], coracao: ['Rosa', 'Jasmim', 'Lírio'], fundo: ['Baunilha', 'Almíscar', 'Âmbar'] },
    ocasioes: ['Noite', 'Ocasiões especiais'],
    recorte: { src: 'img/abertura/ameerat-al-arab.webp', w: 546, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 219.90, estoque: 5 }, { ml: 10, preco: 39.90, estoque: 10 }]
  },
  {
    id: 'ana-abiyedh-rouge', nome: 'Ana Abiyedh Rouge', marca: 'Lattafa', origem: 'arabe',
    familia: 'ambar', genero: 'Feminino', destaque: false,
    descricao: 'Açafrão e âmbar cinza em um perfume luminoso e marcante, inspirado em um clássico de nicho.',
    notas: { saida: ['Açafrão', 'Jasmim'], coracao: ['Âmbar cinza', 'Madeiras'], fundo: ['Cedro', 'Almíscar'] },
    ocasioes: ['Noite', 'Ocasiões especiais'],
    recorte: { src: 'img/abertura/ana-abiyedh-rouge.webp', w: 416, h: 1100 },
    fotos: [], variacoes: [{ ml: 60, preco: 219.90, estoque: 4 }, { ml: 10, preco: 39.90, estoque: 6 }]
  },
  {
    id: 'oud-mood', nome: 'Oud Mood', marca: 'Lattafa', origem: 'arabe',
    familia: 'ambar', genero: 'Compartilhável', destaque: false,
    descricao: 'Oud suave e adocicado, de entrada fácil para quem quer conhecer o oud árabe.',
    notas: { saida: ['Açafrão', 'Noz-moscada'], coracao: ['Oud', 'Rosa'], fundo: ['Âmbar', 'Almíscar', 'Baunilha'] },
    ocasioes: ['Noite', 'Frio'],
    recorte: { src: 'img/abertura/oud-mood.webp', w: 431, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 219.90, estoque: 4 }, { ml: 10, preco: 39.90, estoque: 8 }]
  },
  {
    id: 'raghba', nome: 'Raghba', marca: 'Lattafa', origem: 'arabe',
    familia: 'ambar', genero: 'Compartilhável', destaque: false,
    descricao: 'Baunilha defumada com oud: doce, quente e intenso, um clássico árabe de preço justo.',
    notas: { saida: ['Baunilha', 'Açúcar'], coracao: ['Oud', 'Incenso'], fundo: ['Âmbar', 'Almíscar', 'Madeiras'] },
    ocasioes: ['Noite', 'Frio'],
    recorte: { src: 'img/abertura/raghba.webp', w: 790, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 199.90, estoque: 6 }, { ml: 10, preco: 36.90, estoque: 10 }]
  },
  {
    id: 'hayaati', nome: 'Hayaati', marca: 'Lattafa', origem: 'arabe',
    familia: 'frescos', genero: 'Masculino', destaque: false,
    descricao: 'Fresco aromático de dia a dia, limpo e fácil de usar, com ótima duração.',
    notas: { saida: ['Bergamota', 'Limão', 'Lavanda'], coracao: ['Notas marinhas', 'Gerânio'], fundo: ['Almíscar', 'Âmbar', 'Madeiras'] },
    ocasioes: ['Dia', 'Trabalho', 'Calor'],
    recorte: { src: 'img/abertura/hayaati.webp', w: 406, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 189.90, estoque: 5 }, { ml: 10, preco: 34.90, estoque: 9 }]
  },
  {
    id: 'bade-e-al-oud-amethyst', nome: "Bade'e Al Oud Amethyst", marca: 'Lattafa', origem: 'arabe',
    familia: 'ambar', genero: 'Compartilhável', destaque: false,
    descricao: 'Oud frutado e floral, com baunilha: intenso, elegante e de longa duração.',
    notas: { saida: ['Frutas vermelhas', 'Bergamota', 'Lavanda'], coracao: ['Rosa', 'Jasmim', 'Oud'], fundo: ['Baunilha', 'Âmbar', 'Almíscar'] },
    ocasioes: ['Noite', 'Ocasiões especiais', 'Frio'],
    recorte: { src: 'img/abertura/bade-e-al-oud-amethyst.webp', w: 615, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 279.90, estoque: 3 }, { ml: 10, preco: 46.90, estoque: 7 }]
  },
  {
    id: 'supremacy-silver', nome: 'Supremacy Silver', marca: 'Afnan', origem: 'arabe',
    familia: 'frescos', genero: 'Masculino', destaque: false,
    descricao: 'Fresco e frutado, com bétula defumada. Elegante e de longa duração.',
    notas: { saida: ['Bergamota', 'Abacaxi', 'Groselha-preta'], coracao: ['Bétula', 'Jasmim'], fundo: ['Almíscar', 'Âmbar cinza', 'Patchouli'] },
    ocasioes: ['Dia', 'Noite', 'Trabalho'],
    recorte: { src: 'img/abertura/supremacy-silver.webp', w: 604, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 289.90, estoque: 3 }, { ml: 10, preco: 49.90, estoque: 8 }]
  },
  {
    id: 'amber-oud-gold', nome: 'Amber Oud Gold Edition', marca: 'Al Haramain', origem: 'arabe',
    familia: 'ambar', genero: 'Compartilhável', destaque: true,
    descricao: 'Âmbar cremoso e frutado, famoso por lembrar grandes perfumes de nicho. Para a noite.',
    notas: { saida: ['Bergamota', 'Frutas verdes'], coracao: ['Melão', 'Âmbar'], fundo: ['Baunilha', 'Almíscar', 'Madeiras'] },
    ocasioes: ['Noite', 'Ocasiões especiais'],
    recorte: { src: 'img/abertura/amber-oud-gold.webp', w: 616, h: 1100 },
    fotos: [], variacoes: [{ ml: 100, preco: 349.90, estoque: 3 }, { ml: 10, preco: 56.90, estoque: 8 }]
  }
];
