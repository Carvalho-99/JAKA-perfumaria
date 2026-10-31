/* =========================================================
   JAKA PERFUMARIA — aplicação (sem dependências)
   ========================================================= */
(() => {
  'use strict';

  const C = window.STORE || {};
  const P = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const main = $('#main');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- utilidades ---------- */
  const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* armazenamento indisponível */ } }
  };
  const waLink = (msg) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
  const igLink = () => `https://instagram.com/${C.instagram}`;
  const byId = (id) => (P || []).find((p) => p.id === id);
  const variant = (p, ml) => p && p.variacoes.find((v) => v.ml === ml);
  const mainVariant = (p) => p.variacoes.find((v) => v.estoque > 0) || p.variacoes[0];
  const isAvailable = (p) => p.variacoes.some((v) => v.estoque > 0);
  const origemNome = (o) => (o === 'arabe' ? 'Árabe' : 'Nacional');
  const mlLabel = (ml) => (ml <= 10 ? `Decant ${ml} ml` : `${ml} ml`);

  const FAMILIAS = {
    frescos: { nome: 'Frescos', icon: 'citrus', cor: '#7FC4D8', desc: 'Cítricos, aromáticos e aquáticos. Leves, para o calor e o dia a dia.' },
    florais: { nome: 'Florais', icon: 'flower', cor: '#F2A7B8', desc: 'Rosa, lírio, jasmim e orquídea. Românticos, luminosos e versáteis.' },
    amadeirados: { nome: 'Amadeirados', icon: 'tree', cor: '#B8955E', desc: 'Cedro, couro, tabaco e madeiras secas. Elegantes e de presença.' },
    ambar: { nome: 'Âmbar & Gourmand', icon: 'flame', cor: '#E39B4C', desc: 'Baunilha, especiarias, café e resinas. Envolventes, para a noite e o frio.' }
  };

  /* ---------- ícones ---------- */
  const I = {
    menu: '<path d="M4 7h16M4 12h10M4 17h16"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    bagPlus: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8M12 11.5v5M9.5 14h5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    home: '<path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
    chat: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4 3v-3h0A2 2 0 0 1 4 15z"/>',
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>',
    swap: '<path d="M7 7h11l-3-3M17 17H6l3 3"/>',
    gift: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M3 9h18M12 9v11M12 9S10.5 4 8 5s1 4 4 4zM12 9s1.5-5 4-4-1 4-4 4z"/>',
    sparkle: '<path d="M12 3l2 6.5L20.5 12 14 14l-2 7-2-7-6.5-2L10 9.5z"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    citrus: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="5"/><path d="M12 7v10M7 12h10M8.5 8.5l7 7M15.5 8.5l-7 7"/>',
    flower: '<circle cx="12" cy="12" r="2.2"/><path d="M12 9.8c-2-3-1-6 0-6.3 1 .3 2 3.3 0 6.3zM12 14.2c2 3 1 6 0 6.3-1-.3-2-3.3 0-6.3zM9.8 12c-3-2-6-1-6.3 0 .3 1 3.3 2 6.3 0zM14.2 12c3 2 6 1 6.3 0-.3-1-3.3-2-6.3 0z"/>',
    tree: '<path d="M12 3l6 9h-3.5l4 6H5.5l4-6H6z"/><path d="M12 18v3"/>',
    flame: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2C5.5 10 10 8 10 3c3.5 2 7.5 6.5 7.5 11.3 0 3.6-2.4 6.7-5.5 6.7z"/><path d="M12 21c-1.6 0-2.7-1.2-2.7-2.8 0-2 2.7-3.2 2.7-5.2 1.5 1.2 2.7 3 2.7 5 0 1.8-1.1 3-2.7 3z"/>',
    whatsapp: '<path d="M4 20l1.2-4A8 8 0 1 1 8 18.8z"/><path d="M9 9.2c0 3 2.6 5.8 5.8 5.8l1.2-1.3-1.8-1-1 .8c-1-.4-2.2-1.6-2.6-2.6l.8-1-1-1.8z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6" fill="currentColor"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.2v.1"/>',
    trash: '<path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/>'
  };
  const icon = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;
  /** o jacaré de couro, para estados vazios e avisos */
  const gator = (cls = 'empty__gator') => `<img class="${cls}" src="img/marca/jacare-couro.webp" alt="" width="1600" height="584" loading="lazy" decoding="async">`;
  $$('[data-icon]').forEach((el) => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));

  /* ---------- frascos ilustrados (placeholders das fotos) ---------- */
  let uid = 0;
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const f = (x) => Math.max(0, Math.min(255, Math.round(x + (amt < 0 ? x * amt : (255 - x) * amt))));
    const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  const SHAPES = {
    classico: { body: '<rect x="52" y="96" width="96" height="166" rx="16"/>', neck: [88, 80, 24, 18], cap: '<rect x="70" y="30" width="60" height="52" rx="7"/>', label: [66, 160, 68, 46] },
    redondo: { body: '<ellipse cx="100" cy="186" rx="70" ry="78"/>', neck: [88, 92, 24, 20], cap: '<rect x="76" y="44" width="48" height="50" rx="22"/>', label: [68, 170, 64, 40] },
    facetado: { body: '<path d="M62 108h76l20 30v100l-20 26H62l-20-26V138z"/>', neck: [88, 92, 24, 18], cap: '<path d="M68 94c0-34 12-54 32-70 20 16 32 36 32 70z"/><circle cx="100" cy="20" r="7"/>', label: [66, 168, 68, 44] },
    cilindro: { body: '<rect x="62" y="84" width="76" height="180" rx="9"/>', neck: null, cap: '<rect x="62" y="28" width="76" height="54" rx="5"/>', label: [70, 164, 60, 50] },
    gota: { body: '<path d="M100 96c52 26 62 76 57 110-5 40-29 58-57 58s-52-18-57-58c-5-34 5-84 57-110z"/>', neck: [90, 80, 20, 20], cap: '<rect x="74" y="34" width="52" height="48" rx="24"/>', label: [70, 178, 60, 38] },
    decant: { body: '<rect x="76" y="92" width="48" height="170" rx="11"/>', neck: [90, 80, 20, 14], cap: '<rect x="80" y="40" width="40" height="42" rx="5"/>', label: [80, 160, 40, 56] }
  };
  function bottle(p, { view = 0, ml } = {}) {
    const f = p.frasco || { forma: 'classico', liquido: '#7A5B3A', tampa: '#222', rotulo: '#EEE' };
    const forma = ml && ml <= 10 ? 'decant' : f.forma;
    const s = SHAPES[forma] || SHAPES.classico;
    const id = 'b' + (++uid);
    const tampa = forma === 'decant' ? '#1C1C1C' : f.tampa;
    const [lx, ly, lw, lh] = s.label;
    const nome = p.nome.length > 12 ? p.nome.split(' ')[0] : p.nome;
    const sub = p.marca.toUpperCase() + (ml ? ' · ' + ml + 'ML' : '');
    const neck = s.neck ? `<rect x="${s.neck[0]}" y="${s.neck[1]}" width="${s.neck[2]}" height="${s.neck[3]}" rx="3" fill="${shade(tampa, -0.25)}"/>` : '';
    const rot = view === 1 ? 'rotate(-9 100 150) translate(6 4)' : '';
    return `<svg viewBox="0 0 200 290" role="img" aria-label="Ilustração do frasco de ${esc(p.nome)}">
      <defs>
        <linearGradient id="${id}l" x1="0" x2="1"><stop offset="0" stop-color="${shade(f.liquido, 0.28)}"/><stop offset=".45" stop-color="${f.liquido}"/><stop offset="1" stop-color="${shade(f.liquido, -0.45)}"/></linearGradient>
        <linearGradient id="${id}c" x1="0" x2="1"><stop offset="0" stop-color="${shade(tampa, 0.35)}"/><stop offset=".5" stop-color="${tampa}"/><stop offset="1" stop-color="${shade(tampa, -0.4)}"/></linearGradient>
        <linearGradient id="${id}h" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <clipPath id="${id}k">${s.body}</clipPath>
      </defs>
      <ellipse cx="100" cy="276" rx="${forma === 'decant' ? 34 : 62}" ry="7" fill="#000" opacity=".16"/>
      <g transform="${rot}">
        ${neck}
        <g fill="url(#${id}l)" stroke="rgba(255,255,255,.55)" stroke-width="1.5">${s.body}</g>
        <g clip-path="url(#${id}k)">
          <rect x="0" y="0" width="200" height="290" fill="url(#${id}h)" opacity=".0"/>
          <rect x="${forma === 'decant' ? 82 : 58}" y="70" width="${forma === 'decant' ? 9 : 16}" height="210" rx="6" fill="url(#${id}h)" opacity=".8"/>
          <rect x="${forma === 'decant' ? 112 : 128}" y="70" width="4" height="210" fill="#fff" opacity=".18"/>
          <rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="3" fill="${f.rotulo}" opacity=".93"/>
          <text x="100" y="${ly + lh / 2 - 2}" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="${forma === 'decant' ? 8 : 12}" font-weight="600" fill="${shade(f.rotulo, -0.75)}">${esc(nome)}</text>
          <text x="100" y="${ly + lh / 2 + 11}" text-anchor="middle" font-family="Manrope, sans-serif" font-size="${forma === 'decant' ? 4.6 : 5.6}" letter-spacing=".8" fill="${shade(f.rotulo, -0.6)}" ${sub.length * (forma === 'decant' ? 3.6 : 4.4) > lw - 6 ? `textLength="${lw - 8}" lengthAdjust="spacingAndGlyphs"` : ''}>${esc(sub)}</text>
        </g>
        <g fill="url(#${id}c)">${s.cap}</g>
      </g>
    </svg>`;
  }
  /** vistas de imagem do produto, em ordem: frasco sem fundo ("recorte"), fotos reais; sem nada, o desenho (2 vistas) */
  const views = (p) => [
    ...(p.recorte ? [{ tipo: 'recorte', src: p.recorte.src, w: p.recorte.w, h: p.recorte.h }] : []),
    ...((p.fotos || []).map((f) => ({ tipo: 'foto', src: f, w: 800, h: 1000 })))
  ];
  const viewCount = (p) => views(p).length || 2;
  function media(p, { view = 0, ml, sizes = '(max-width: 560px) 50vw, 300px' } = {}) {
    const v = views(p)[view];
    if (!v) return bottle(p, { view, ml });
    if (v.tipo === 'recorte') return `<img class="cutout" src="${esc(v.src)}" alt="${esc(p.nome)} — ${esc(p.marca)}" width="${v.w}" height="${v.h}" loading="lazy" decoding="async">`;
    return `<img class="photo" src="${esc(v.src)}" alt="${esc(p.nome)} — ${esc(p.marca)}" width="800" height="1000" loading="lazy" decoding="async" sizes="${sizes}">`;
  }

  /* ---------- estado ---------- */
  let favs = store.get('jaka-favoritos', []).filter((id) => byId(id));
  let bag = store.get('jaka-sacola', []).filter((i) => i && typeof i.id === 'string' && typeof i.ml === 'number' && i.qtd > 0);
  const saveFavs = () => store.set('jaka-favoritos', favs);
  const saveBag = () => store.set('jaka-sacola', bag);

  function lineStatus(it) {
    const p = byId(it.id);
    if (!p) return { ok: false, motivo: 'Este produto não está mais no catálogo.' };
    const v = variant(p, it.ml);
    if (!v) return { ok: false, p, motivo: 'Este tamanho não está mais disponível.' };
    if (v.estoque <= 0) return { ok: false, p, v, motivo: 'Indisponível no momento.' };
    return { ok: true, p, v, motivo: it.qtd > v.estoque ? `Só temos ${v.estoque} em estoque.` : '' };
  }
  const bagOk = () => bag.map((it) => ({ it, s: lineStatus(it) })).filter((x) => x.s.ok);
  const bagCount = () => bag.reduce((n, i) => n + i.qtd, 0);
  const subtotal = () => bagOk().reduce((t, { it, s }) => t + s.v.preco * Math.min(it.qtd, s.v.estoque), 0);

  /* ---------- tema ---------- */
  $('#themeBtn').addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-anim');
    root.dataset.theme = next;
    try { localStorage.setItem('jaka-tema', next); } catch (e) { /* ok */ }
    $('meta[name="theme-color"]').content = next === 'dark' ? '#071C1B' : '#12483F';
    setTimeout(() => root.classList.remove('theme-anim'), 450);
  });

  /* ---------- camadas (menu, painéis, busca) com foco controlado ---------- */
  const overlay = $('#overlay');
  let layer = null; // { el, opener, onClose }
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';

  function openLayer(el, opener, { useOverlay = true } = {}) {
    if (layer && layer.el === el) return;
    if (layer) closeLayer(false);
    layer = { el, opener };
    el.removeAttribute('inert');
    el.setAttribute('aria-hidden', 'false');
    if (useOverlay) { overlay.hidden = false; requestAnimationFrame(() => overlay.classList.add('is-on')); }
    void el.offsetWidth; // garante o estado inicial antes de animar
    el.classList.add('is-open');
    if (opener) opener.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const f = el.querySelector('[data-autofocus]') || el.querySelector('[data-close]') || el.querySelector(FOCUSABLE);
    if (f) f.focus({ preventScroll: true });
  }
  function closeLayer(restore = true) {
    if (!layer) return;
    const { el, opener } = layer;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('inert', '');
    overlay.classList.remove('is-on');
    setTimeout(() => { if (!layer) overlay.hidden = true; }, 300);
    if (opener) opener.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    layer = null;
    if (restore && opener && document.contains(opener)) opener.focus({ preventScroll: true });
  }
  overlay.addEventListener('click', () => closeLayer());
  document.addEventListener('keydown', (e) => {
    if (!layer) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLayer(); return; }
    if (e.key === 'Tab') { // prende o foco dentro da camada aberta
      const f = $$(FOCUSABLE, layer.el).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- menu lateral ---------- */
  const drawer = $('#drawer');
  function renderDrawer() {
    const route = location.hash || '#/';
    const count = (fam) => P.filter((p) => p.familia === fam).length;
    const items = [
      { href: '#/', label: 'Início', icon: 'home' },
      { href: '#/catalogo', label: 'Todo o catálogo', icon: 'grid', n: P.length },
      { sep: 'Famílias olfativas' },
      ...Object.entries(FAMILIAS).map(([k, f]) => ({ href: `#/catalogo?familia=${k}`, label: f.nome, icon: f.icon, n: count(k) })),
      { sep: 'Origem' },
      { href: '#/catalogo?origem=nacional', label: 'O Boticário', icon: 'sparkle', n: P.filter((p) => p.origem === 'nacional').length },
      { href: '#/catalogo?origem=arabe', label: 'Perfumes árabes', icon: 'sparkle', n: P.filter((p) => p.origem === 'arabe').length },
      { sep: 'Loja' },
      { href: '#/?s=guia', label: 'Como escolher', icon: 'book' },
      { href: '#/?s=atendimento', label: 'Atendimento', icon: 'chat' }
    ];
    let i = 0;
    drawer.innerHTML = `
      <div class="drawer__head">
        <a class="logo" href="#/" aria-label="Início"><span class="logo__mark">JAKA</span><span class="logo__sub">PERFUMARIA</span></a>
        <button class="icon-btn" data-close aria-label="Fechar menu">${icon('close')}</button>
      </div>
      <nav aria-label="Navegação principal">
        ${items.map((it) => it.sep
          ? `<p class="drawer__label">${it.sep}</p>`
          : `<a class="drawer__item" href="${it.href}" style="--i:${i++}" ${it.href === route ? 'aria-current="page"' : ''}>${icon(it.icon)}<span>${it.label}</span>${it.n ? `<small>${it.n}</small>` : ''}</a>`
        ).join('')}
      </nav>
      <div class="drawer__foot">
        <a href="${waLink('Olá, Diego! Vim pelo site da Jaka Perfumaria.')}" target="_blank" rel="noopener">${icon('whatsapp')} ${esc(C.whatsappExibicao)}</a>
        <a href="${igLink()}" target="_blank" rel="noopener">${icon('instagram')} @${esc(C.instagram)}</a>
      </div>`;
  }
  $('#menuBtn').addEventListener('click', (e) => { renderDrawer(); openLayer(drawer, e.currentTarget); });
  drawer.addEventListener('click', (e) => { if (e.target.closest('[data-close]') || e.target.closest('a')) closeLayer(e.target.closest('[data-close]') !== null); });

  /* ---------- favoritos ---------- */
  const favPanel = $('#favPanel');
  function toggleFav(id, btn) {
    const on = !favs.includes(id);
    favs = on ? [...favs, id] : favs.filter((x) => x !== id);
    saveFavs();
    $$(`[data-fav="${id}"]`).forEach((b) => {
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', `${on ? 'Remover dos' : 'Adicionar aos'} favoritos: ${byId(id).nome}`);
    });
    if (btn && !reduceMotion.matches) { btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop'); }
    updateBadges();
    if (favPanel.classList.contains('is-open')) renderFavs();
  }
  function renderFavs() {
    const list = favs.map(byId).filter(Boolean);
    favPanel.innerHTML = `
      <div class="panel__head"><h2>Favoritos <small class="num">${list.length}</small></h2><button class="icon-btn" data-close aria-label="Fechar favoritos">${icon('close')}</button></div>
      <div class="panel__body">
        ${list.length ? list.map((p) => `
          <div class="line">
            <a class="line__img" href="#/produto/${p.id}" data-close-nav>${media(p, { ml: mainVariant(p).ml })}</a>
            <div>
              <div class="line__top"><div><b>${esc(p.nome)}</b><p class="line__sub">${esc(p.marca)} · ${FAMILIAS[p.familia].nome}</p></div></div>
              <div class="line__bottom">
                <span class="price">${brl(mainVariant(p).preco)}</span>
                <button class="remove" data-fav-remove="${p.id}">Remover</button>
              </div>
              ${isAvailable(p) ? '' : '<p class="line__warn">Indisponível no momento</p>'}
            </div>
          </div>`).join('') : `
          <div class="empty">${gator()}<h3>Nenhum favorito ainda</h3><p>Toque no coração dos perfumes que chamarem sua atenção.</p><a class="btn" href="#/catalogo" data-close-nav>Ver catálogo</a></div>`}
      </div>`;
  }
  $('#favBtn').addEventListener('click', (e) => { renderFavs(); openLayer(favPanel, e.currentTarget); });
  favPanel.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) return closeLayer();
    const r = e.target.closest('[data-fav-remove]');
    if (r) { toggleFav(r.dataset.favRemove); return; }
    if (e.target.closest('[data-close-nav]')) closeLayer(false);
  });

  /* ---------- sacola ---------- */
  const bagPanel = $('#bagPanel');
  function addToBag(id, ml, qtd = 1) {
    const p = byId(id), v = variant(p, ml);
    if (!p || !v) return toast({ erro: true, titulo: 'Não foi possível adicionar', texto: 'Produto não encontrado.' });
    if (v.estoque <= 0) return toast({ erro: true, titulo: 'Indisponível', texto: `${p.nome} ${mlLabel(ml)} está sem estoque.` });
    const it = bag.find((x) => x.id === id && x.ml === ml);
    const atual = it ? it.qtd : 0;
    const nova = Math.min(atual + qtd, v.estoque);
    if (nova === atual) return toast({ erro: true, titulo: 'Limite do estoque', texto: `Você já tem as ${v.estoque} unidades disponíveis na sacola.` });
    if (it) it.qtd = nova; else bag.push({ id, ml, qtd: nova });
    saveBag();
    updateBadges(true);
    if (bagPanel.classList.contains('is-open')) renderBag();
    toast({ p, ml, titulo: 'Adicionado à sacola', texto: `${p.nome} · ${mlLabel(ml)}${nova - atual > 1 ? ` · ${nova - atual} un.` : ''}`, acao: 'Ver sacola' });
  }
  function setQty(idx, qtd) {
    const it = bag[idx];
    if (!it) return;
    const s = lineStatus(it);
    if (qtd <= 0) return removeLine(idx);
    it.qtd = s.v ? Math.min(qtd, Math.max(s.v.estoque, 1)) : qtd;
    saveBag(); updateBadges(); renderBag();
  }
  function removeLine(idx) {
    const row = $(`.line[data-idx="${idx}"]`, bagPanel);
    const done = () => { bag.splice(idx, 1); saveBag(); updateBadges(); renderBag(); const f = $('[data-autofocus]', bagPanel) || $('[data-close]', bagPanel); f && f.focus(); };
    if (row && !reduceMotion.matches) { row.classList.add('is-removing'); setTimeout(done, 260); } else done();
  }
  function checkoutMessage() {
    const linhas = bagOk().map(({ it, s }) => {
      const q = Math.min(it.qtd, s.v.estoque);
      return `• ${q}x ${s.p.nome} (${s.p.marca}) — ${mlLabel(it.ml)} — ${brl(s.v.preco * q)}`;
    });
    return `Olá, ${C.responsavel.split(' ')[0]}! Vim pelo site da ${C.nome} ${C.complemento} e gostaria de fazer este pedido:\n\n${linhas.join('\n')}\n\nSubtotal: ${brl(subtotal())}\n\n${C.demo ? '(Valores do site de demonstração — ' : '('}aguardo a confirmação de preço, disponibilidade, pagamento e entrega.)`;
  }
  function renderBag() {
    const rows = bag.map((it, idx) => ({ it, idx, s: lineStatus(it) }));
    const okCount = rows.filter((r) => r.s.ok).length;
    const bad = rows.length - okCount;
    bagPanel.innerHTML = `
      <div class="panel__head"><h2>Sacola <small class="num">${bagCount()} ${bagCount() === 1 ? 'item' : 'itens'}</small></h2><button class="icon-btn" data-close aria-label="Fechar sacola">${icon('close')}</button></div>
      <div class="panel__body">
        ${rows.length ? rows.map(({ it, idx, s }) => {
          if (!s.p) return `
            <div class="line is-bad" data-idx="${idx}">
              <div class="line__img">${icon('alert')}</div>
              <div><div class="line__top"><b>Item indisponível</b></div><p class="line__warn">${s.motivo}</p>
              <div class="line__bottom"><span></span><button class="remove" data-remove="${idx}">Remover</button></div></div>
            </div>`;
          const max = s.v ? s.v.estoque : 0;
          return `
            <div class="line ${s.ok ? '' : 'is-bad'}" data-idx="${idx}">
              <a class="line__img" href="#/produto/${s.p.id}" data-close-nav>${media(s.p, { ml: it.ml })}</a>
              <div>
                <div class="line__top"><div><b>${esc(s.p.nome)}</b><p class="line__sub">${esc(s.p.marca)} · ${mlLabel(it.ml)}</p></div></div>
                ${s.motivo ? `<p class="line__warn">${s.motivo}</p>` : ''}
                <div class="line__bottom">
                  ${s.ok ? `<div class="qty qty--sm" role="group" aria-label="Quantidade de ${esc(s.p.nome)}">
                    <button data-qty="${idx}" data-d="-1" aria-label="Diminuir">${icon('minus')}</button>
                    <output class="num" aria-live="polite">${it.qtd}</output>
                    <button data-qty="${idx}" data-d="1" aria-label="Aumentar" ${it.qtd >= max ? 'disabled' : ''}>${icon('plus')}</button>
                  </div>` : '<span></span>'}
                  <span class="price">${s.v ? brl(s.v.preco * Math.min(it.qtd, Math.max(max, 0) || it.qtd)) : ''}</span>
                </div>
                <button class="remove" data-remove="${idx}" style="margin-top:8px">Remover</button>
              </div>
            </div>`;
        }).join('') : `
          <div class="empty">${gator()}<h3>Sua sacola está vazia</h3><p>Explore o catálogo e encontre sua próxima assinatura.</p><a class="btn" href="#/catalogo" data-close-nav data-autofocus>Ver catálogo</a></div>`}
      </div>
      ${rows.length ? `
      <div class="panel__foot">
        ${bad ? `<p class="line__warn">${bad === 1 ? '1 item não entra' : bad + ' itens não entram'} no pedido. Remova para continuar.</p>` : ''}
        <div class="sum"><span>Subtotal</span><span class="price">${brl(subtotal())}</span></div>
        <p class="note-small">Frete e forma de pagamento são combinados com o ${esc(C.responsavel.split(' ')[0])} no WhatsApp. O pedido só fica confirmado depois da resposta da loja.</p>
        <a class="btn btn--wa btn--block" data-checkout href="${okCount ? waLink(checkoutMessage()) : '#'}" target="_blank" rel="noopener" ${okCount && !bad ? '' : 'aria-disabled="true" tabindex="-1" style="opacity:.45;pointer-events:none"'}>${icon('whatsapp')} Finalizar pelo WhatsApp</a>
      </div>` : ''}`;
  }
  $('#bagBtn').addEventListener('click', (e) => { renderBag(); openLayer(bagPanel, e.currentTarget); });
  bagPanel.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) return closeLayer();
    const q = e.target.closest('[data-qty]');
    if (q) { const idx = +q.dataset.qty; setQty(idx, bag[idx].qtd + +q.dataset.d); const again = $(`[data-qty="${idx}"][data-d="${q.dataset.d}"]`, bagPanel); again && !again.disabled && again.focus(); return; }
    const r = e.target.closest('[data-remove]');
    if (r) return removeLine(+r.dataset.remove);
    if (e.target.closest('[data-close-nav]')) closeLayer(false);
  });

  function updateBadges(bump) {
    const set = (el, n) => {
      el.hidden = n === 0;
      el.textContent = n;
      if (bump && !reduceMotion.matches) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
    };
    set($('#bagCount'), bagCount());
    set($('#favCount'), favs.length);
    $('#bagBtn').setAttribute('aria-label', `Sacola, ${bagCount()} ${bagCount() === 1 ? 'item' : 'itens'}`);
    $('#favBtn').setAttribute('aria-label', `Favoritos, ${favs.length}`);
    if (bump && !reduceMotion.matches) { const b = $('#bagBtn'); b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); }
  }

  /* ---------- toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast({ p, ml, titulo, texto, acao, erro }) {
    toastEl.classList.toggle('is-error', !!erro);
    toastEl.innerHTML = `${p ? `<div class="toast__img">${media(p, { ml })}</div>` : icon(erro ? 'alert' : 'sparkle')}
      <div><b>${esc(titulo)}</b><span>${esc(texto)}</span></div>${acao ? `<button type="button" data-toast-open>${acao}</button>` : ''}`;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 3600);
  }
  toastEl.addEventListener('click', (e) => {
    if (e.target.closest('[data-toast-open]')) { toastEl.classList.remove('is-on'); renderBag(); openLayer(bagPanel, $('#bagBtn')); }
  });

  /* ---------- busca ---------- */
  const searchEl = $('#search'), searchInput = $('#searchInput'), searchResults = $('#searchResults');
  let searchSel = -1;
  const searchText = (p) => norm([p.nome, p.marca, FAMILIAS[p.familia].nome, p.genero, origemNome(p.origem), ...p.notas.saida, ...p.notas.coracao, ...p.notas.fundo].join(' '));
  function highlight(text, q) {
    if (!q) return esc(text);
    const i = norm(text).indexOf(norm(q));
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }
  function runSearch() {
    const q = searchInput.value.trim();
    searchSel = -1;
    if (!q) {
      searchResults.innerHTML = `<p class="search__hint">Experimente:${['baunilha', 'Lattafa', 'floral', 'café', 'cítrico'].map((t) => `<button type="button" data-term="${t}">${t}</button>`).join('')}</p>`;
      return;
    }
    const terms = norm(q).split(/\s+/);
    const found = P.filter((p) => { const t = searchText(p); return terms.every((x) => t.includes(x)); });
    searchResults.innerHTML = found.length
      ? found.map((p, i) => `<a class="mini" role="option" id="sr-${i}" aria-selected="false" href="#/produto/${p.id}">
          <span class="mini__img">${media(p, { ml: mainVariant(p).ml })}</span>
          <span><b>${highlight(p.nome, q)}</b><small>${highlight(p.marca, q)} · ${FAMILIAS[p.familia].nome}</small></span>
          <span class="price">${brl(mainVariant(p).preco)}</span></a>`).join('') +
        `<p class="search__hint"><a class="link-arrow" href="#/catalogo?q=${encodeURIComponent(q)}">Ver ${found.length} no catálogo ${icon('arrow')}</a></p>`
      : `<p class="search__hint">Nada encontrado para “${esc(q)}”. Tente uma nota (baunilha, rosa) ou uma marca.</p>`;
  }
  function openSearch(opener) {
    searchInput.value = '';
    runSearch();
    openLayer(searchEl, opener, { useOverlay: false });
    setTimeout(() => searchInput.focus(), 50);
  }
  $('#searchBtn').addEventListener('click', (e) => openSearch(e.currentTarget));
  searchInput.addEventListener('input', runSearch);
  searchInput.addEventListener('keydown', (e) => {
    const opts = $$('.mini', searchResults);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!opts.length) return;
      searchSel = (searchSel + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
      opts.forEach((o, i) => o.setAttribute('aria-selected', String(i === searchSel)));
      opts[searchSel].scrollIntoView({ block: 'nearest' });
      searchInput.setAttribute('aria-activedescendant', opts[searchSel].id);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const q = searchInput.value.trim();
      if (searchSel >= 0 && opts[searchSel]) location.hash = opts[searchSel].getAttribute('href');
      else if (q) location.hash = `#/catalogo?q=${encodeURIComponent(q)}`;
      closeLayer(false);
    }
  });
  searchEl.addEventListener('click', (e) => {
    if (e.target === searchEl || e.target.closest('[data-close]')) return closeLayer();
    const t = e.target.closest('[data-term]');
    if (t) { searchInput.value = t.dataset.term; runSearch(); searchInput.focus(); return; }
    if (e.target.closest('a')) closeLayer(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !layer && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch($('#searchBtn')); }
  });

  /* ---------- card de produto ---------- */
  function card(p, i = 0) {
    const v = mainVariant(p);
    const disp = isAvailable(p);
    const fav = favs.includes(p.id);
    const vols = p.variacoes.map((x) => mlLabel(x.ml)).join(' · ');
    const hasB = viewCount(p) >= 2;
    return `
      <article class="card ${hasB ? 'has-b' : ''}" style="--i:${i}">
        <a class="card__media" href="#/produto/${p.id}" tabindex="-1" aria-hidden="true">
          <div class="card__img card__img--a">${media(p, { ml: v.ml })}</div>
          ${hasB ? `<div class="card__img card__img--b">${media(p, { view: 1, ml: v.ml })}</div>` : ''}
          <span class="card__tag">${origemNome(p.origem)}</span>
          ${disp ? '' : '<span class="card__badge">Indisponível</span>'}
        </a>
        <button class="fav-btn" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${fav ? 'Remover dos' : 'Adicionar aos'} favoritos: ${esc(p.nome)}">${icon('heart')}</button>
        <div class="card__body">
          <p class="card__brand">${esc(p.marca)}</p>
          <h3 class="card__name"><a href="#/produto/${p.id}">${esc(p.nome)}</a></h3>
          <p class="card__meta">${FAMILIAS[p.familia].nome} · ${vols}</p>
          <div class="card__foot">
            <p class="price"><small>${mlLabel(v.ml)}</small>${brl(v.preco)}</p>
            <button class="add-btn" data-add="${p.id}" data-ml="${v.ml}" ${disp ? '' : 'disabled'} aria-label="${disp ? `Adicionar ${esc(p.nome)} ${mlLabel(v.ml)} à sacola` : `${esc(p.nome)} indisponível`}">${icon('bagPlus')}</button>
          </div>
        </div>
      </article>`;
  }

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) { e.preventDefault(); addToBag(add.dataset.add, +add.dataset.ml, add.dataset.qtd ? +add.dataset.qtd : 1); return; }
    const fav = e.target.closest('[data-fav]');
    if (fav) { e.preventDefault(); toggleFav(fav.dataset.fav, fav); }
  });

  /* ---------- animações de rolagem ---------- */
  let io;
  function observe(root) {
    const els = $$('.reveal, [data-count]', root);
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      els.forEach((el) => { el.classList.add('is-in'); if (el.dataset.count) el.textContent = fmtCount(+el.dataset.count); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        if (en.target.dataset.count) countUp(en.target);
        io.unobserve(en.target);
      }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    }
    els.forEach((el) => io.observe(el));
    // rede de segurança: se a rolagem passar por um elemento sem o observer disparar
    // (aba estrangulada, rolagem muito rápida), revela tudo que já chegou à dobra
    const sweep = () => {
      const left = $$('.reveal:not(.is-in)', root);
      if (!left.length) { removeEventListener('scroll', onScroll); return; }
      left.forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in'); });
    };
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; sweep(); }); };
    addEventListener('scroll', onScroll, { passive: true });
    cleanup.push(() => removeEventListener('scroll', onScroll));
    setTimeout(sweep, 1500);
  }
  const fmtCount = (n) => n.toLocaleString('pt-BR');
  function countUp(el) {
    const end = +el.dataset.count, dur = 900, t0 = performance.now();
    el.textContent = "0";
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = fmtCount(Math.round(end * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- PÁGINA: início ---------- */
  const VITRINE = ['khamrah', 'malbec', 'yara', 'asad', 'the-kingdom', 'hawas', 'lily', '9pm'];
  const chipsFor = (p) => [
    [p.notas.saida[0], 'saída', 'left:0;top:20%;--fd:-1s;--c:#D98A2B'],
    [p.notas.coracao[0], 'coração', 'right:0;top:36%;--fd:-3s;--c:#C9607A'],
    [p.notas.fundo[0], 'fundo', 'left:6%;bottom:2%;--fd:-5s;--c:#E7C083']
  ].filter((c) => c[0]).map(([t, k, s]) => `<span class="note-chip" style="${s}"><i></i>${esc(t)} <small>${k}</small></span>`).join('');
  const captionFor = (p) => `<b>${esc(p.nome)}</b><span>${esc(p.marca)} · ${brl(mainVariant(p).preco)}</span>${icon('arrow')}`;

  function pageHome() {
    // vitrine giratória da abertura: ordem de rotação; só entram produtos com "recorte" (frasco sem fundo)
    const vitrine = VITRINE.map(byId).filter((p) => p && p.recorte);
    const n = vitrine.length;
    const slot = (i) => (i === 0 ? 'is-center' : i === 1 ? 'is-right' : i === n - 1 ? 'is-left' : 'is-off');
    const stageItem = (p, i) => {
      const f = p.recorte, l = f.esq || f, r = f.dir || f;
      // só as 3 vistas visíveis de cara carregam já; o resto fica em data-src e entra sob demanda, antes de girar
      const img = (v, cls, eager) => `<img class="${cls}" ${eager ? 'src' : 'data-src'}="${esc(v.src)}" width="${v.w}" height="${v.h}" alt="" decoding="async">`;
      return `<div class="vit ${slot(i)}" data-i="${i}" style="--fd:${-(i * 1.3)}s"><div class="vit__float"><div class="vit__imgs">${img(f, 'vit__front', i === 0)}${img(l, 'vit__esq', i === n - 1)}${img(r, 'vit__dir', i === 1)}<span class="vit__sheen"${i === 0 ? ` style="-webkit-mask-image:url('${esc(f.src)}');mask-image:url('${esc(f.src)}')"` : ''}></span></div></div></div>`;
    };
    // sem 3 recortes, volta aos frascos desenhados
    const fallback = ['khamrah', 'malbec', 'yara'].map(byId).filter(Boolean);
    const svgBottle = (p, cls, fd) => p ? `<div class="stage__bottle ${cls}"><div${fd ? ` style="--fd:${fd}"` : ''}>${bottle(p, { ml: 100 })}</div></div>` : '';
    const first = n >= 3 ? vitrine[0] : fallback[0];
    const marcas = [...new Set(P.map((p) => p.marca))];
    const anos = new Date().getFullYear() - C.desde;
    const featured = (o) => P.filter((p) => p.origem === o).sort((a, b) => (b.destaque - a.destaque) || (isAvailable(b) - isAvailable(a))).slice(0, 4);
    const marquee = [...marcas, 'Natura', 'Cestas & presentes', 'Decants'];

    return `
    <section class="hero">
      <div class="wrap hero__grid">
        <div>
          <span class="eyebrow intro" style="--d:0ms">${esc(C.slogan)}</span>
          <h1 class="intro" style="--d:90ms">Encontre sua <em>próxima</em> assinatura.</h1>
          <p class="hero__lead intro" style="--d:180ms">Do clássico de O Boticário aos árabes mais desejados do momento. Cada fragrância é escolhida a dedo e apresentada por quem entende de perfume.</p>
          <div class="hero__actions intro" style="--d:270ms">
            <a class="btn" href="#/catalogo">Explorar o catálogo ${icon('arrow')}</a>
            <a class="btn btn--ghost" href="${waLink('Olá, Diego! Vim pelo site e quero ajuda para escolher um perfume.')}" target="_blank" rel="noopener">${icon('whatsapp')} Falar com o ${esc(C.responsavel.split(' ')[0])}</a>
          </div>
          <div class="hero__sign intro" style="--d:360ms">
            <span class="avatar" aria-hidden="true">DM</span>
            <div><strong>${esc(C.responsavel)}</strong><span>${esc(C.cargo)} · atendendo desde ${C.desde}</span></div>
          </div>
        </div>
        <div class="hero__visual intro-img" style="--d:200ms">
          <div class="stage" id="stage">
            <div class="stage__arch"></div>
            <div class="stage__ring"></div>
            <div class="stage__ring stage__ring--2"></div>
            <div class="stage__floor"></div>
            ${n >= 3
              ? `<div class="vitrine" id="vitrine">${vitrine.map(stageItem).join('')}</div>`
              : `${svgBottle(fallback[1], 'stage__bottle--l', '-2s')}${svgBottle(fallback[2], 'stage__bottle--r', '-4s')}${svgBottle(fallback[0], 'stage__bottle--main')}`}
            <div class="mist" aria-hidden="true">${Array.from({ length: 9 }, (_, i) => `<span style="--md:${i * 0.55}s;--mx:${(i % 2 ? 1 : -1) * (20 + i * 9)}px"></span>`).join('')}</div>
            <div class="hero-chips" id="heroChips" aria-hidden="true">${first ? chipsFor(first) : ''}</div>
          </div>
          ${n >= 3 ? `<div class="vit-bar">
            <a class="vit-caption" id="vitCaption" href="#/produto/${vitrine[0].id}">${captionFor(vitrine[0])}</a>
            <div class="vit-nav" role="group" aria-label="Vitrine de frascos">
              <button type="button" class="icon-btn" data-prev aria-label="Frasco anterior">${icon('arrow')}</button>
              <div class="vit-dots">${vitrine.map((p, i) => `<button type="button" data-dot="${i}" aria-label="${esc(p.nome)}" aria-current="${i === 0}"></button>`).join('')}</div>
              <button type="button" class="icon-btn" data-next aria-label="Próximo frasco">${icon('arrow')}</button>
            </div>
          </div>` : ''}
        </div>
      </div>
    </section>

    <div class="marquee" aria-label="Marcas: ${esc(marcas.join(', '))}">
      <div class="marquee__track" aria-hidden="true">
        ${[0, 1].map(() => marquee.map((m) => `<span class="marquee__item">${esc(m)}</span>`).join('')).join('')}
      </div>
    </div>

    <section class="section" id="familias">
      <div class="wrap">
        <div class="section__head reveal">
          <div><span class="eyebrow">Famílias olfativas</span><h2>Comece pelo que você sente.</h2></div>
          <p>Cada perfume pertence a uma família. Escolha a que combina com você e veja só o que importa.</p>
        </div>
        <div class="families">
          ${Object.entries(FAMILIAS).map(([k, f], i) => {
            const n = P.filter((p) => p.familia === k).length;
            return `<a class="family reveal" href="#/catalogo?familia=${k}" style="--fc:${f.cor};--d:${i * 70}ms">
              <span class="family__photo" aria-hidden="true"><img src="img/ambiente/familia-${k}.jpg" alt="" loading="lazy" decoding="async"></span>
              <span class="family__icon">${icon(f.icon)}</span>
              <h3>${f.nome}</h3><p>${f.desc}</p>
              <span class="family__foot"><span class="num">${n} ${n === 1 ? 'fragrância' : 'fragrâncias'}</span>${icon('arrow')}</span>
            </a>`;
          }).join('')}
        </div>
      </div>
    </section>

    <section class="section section--alt" id="selecao">
      <div class="wrap">
        <div class="section__head reveal">
          <div><span class="eyebrow">Seleção do perfumista</span><h2>Nacionais e árabes, lado a lado.</h2></div>
          <div class="tabs" role="tablist" aria-label="Origem">
            <span class="tabs__pill"></span>
            <button role="tab" aria-selected="true" data-tab="nacional">O Boticário</button>
            <button role="tab" aria-selected="false" data-tab="arabe">Árabes</button>
          </div>
        </div>
        <div class="grid" id="featuredGrid" role="tabpanel">${featured('nacional').map(card).join('')}</div>
        <p style="margin-top:32px" class="reveal"><a class="link-arrow" href="#/catalogo">Ver todas as ${P.length} fragrâncias ${icon('arrow')}</a></p>
      </div>
    </section>

    <section class="section" style="padding-block:clamp(40px,6vw,70px)">
      <div class="wrap">
        <div class="stats reveal">
          <div class="stat"><strong data-count="${P.length}">${P.length}</strong><span>fragrâncias no catálogo</span></div>
          <div class="stat"><strong data-count="${marcas.length}">${marcas.length}</strong><span>marcas, do Brasil ao Oriente Médio</span></div>
          <div class="stat"><strong data-count="${anos}">${anos}</strong><span>anos atendendo, desde ${C.desde}</span></div>
          <div class="stat"><strong data-count="${C.instagramSeguidores}">${fmtCount(C.instagramSeguidores)}</strong><span>seguidores no Instagram</span></div>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="guia">
      <div class="wrap guide">
        <div class="reveal">
          <span class="eyebrow">Como escolher</span>
          <h2 style="font-size:clamp(2.2rem,4.6vw,3.6rem);margin-top:14px">Um perfume se revela em três tempos.</h2>
          <p style="color:var(--muted);margin-top:16px;max-width:32em">Toda fragrância muda na pele. Por isso vale borrifar, esperar alguns minutos e só então decidir.</p>
          <div class="pyramid">
            <div class="pyramid__row"><b>Saída</b><p>O primeiro contato. Notas leves, como cítricos e especiarias, que somem mais rápido.</p></div>
            <div class="pyramid__row"><b>Coração</b><p>A personalidade do perfume: flores, frutas, café. Aparece depois da saída.</p></div>
            <div class="pyramid__row"><b>Fundo</b><p>O que fica na pele e na roupa: madeiras, baunilha, âmbar e almíscar.</p></div>
          </div>
          <div class="occasions">
            <div class="occasion"><b>Dia e trabalho</b><span>Frescos e florais leves</span></div>
            <div class="occasion"><b>Noite e encontros</b><span>Âmbar, gourmand e amadeirados</span></div>
            <div class="occasion"><b>Calor</b><span>Cítricos e aquáticos</span></div>
            <div class="occasion"><b>Frio</b><span>Baunilha, especiarias e resinas</span></div>
          </div>
        </div>
        <div class="quiz reveal" style="--d:120ms" id="quiz"></div>
      </div>
    </section>

    <section class="section" style="padding-top:0" id="presentes">
      <div class="wrap">
        <div class="extra reveal">
          <div class="extra__img"><img src="img/ambiente/chocolates.jpg" alt="Barra de chocolate ao leite" loading="lazy" decoding="async"></div>
          <div class="extra__body">
            <span class="eyebrow">Além dos perfumes</span>
            <h2>Chocolates e cestas para presentear.</h2>
            <p>Perfume, chocolate e cesta montada no capricho: o ${esc(C.responsavel.split(' ')[0])} monta o presente conforme a ocasião e o seu orçamento. Combine pelo WhatsApp.</p>
            <a class="btn btn--ghost" href="${waLink('Olá, Diego! Quero montar um presente com perfume e chocolates.')}" target="_blank" rel="noopener">${icon('gift')} Montar um presente</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section brand-block" id="atendimento">
      <div class="wrap brand-grid">
        <div class="reveal">
          <span class="eyebrow">A Jaka</span>
          <h2>${esc(C.responsavel)},<br><em>alma de vendedor.</em></h2>
          <p>A ${esc(C.nome)} ${esc(C.complemento)} nasceu em ${C.desde} pelas mãos do perfumista ${esc(C.responsavel)}. O atendimento é direto com ele: você conta o que gosta e ele indica o perfume, o tamanho e a ocasião certa.</p>
          <ul class="brand-list">${['Perfumes importados', ...C.alemDosPerfumes].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <div class="brand-actions">
            <a class="btn" href="${waLink('Olá, Diego! Vim pelo site da Jaka Perfumaria.')}" target="_blank" rel="noopener">${icon('whatsapp')} ${esc(C.whatsappExibicao)}</a>
            <a class="btn btn--ghost" href="${igLink()}" target="_blank" rel="noopener">${icon('instagram')} @${esc(C.instagram)}</a>
          </div>
        </div>
        <div class="biz-card reveal" style="--d:150ms" aria-hidden="true">
          <div class="biz-card__top"><b>JAKA</b><small>PERFUMARIA</small></div>
          <div class="biz-card__body">
            <strong>${esc(C.responsavel)}</strong>
            <p>${icon('whatsapp')} ${esc(C.whatsappExibicao)}</p>
            <p>${icon('instagram')} ${esc(C.instagram)}</p>
            <em>${esc(C.slogan)}</em>
          </div>
        </div>
      </div>
      <div class="wrap gator reveal" style="--d:200ms" aria-hidden="true">
        <div class="gator__big">
          ${gator('')}
          <span class="gator__sheen" style="-webkit-mask-image:url('img/marca/jacare-couro.webp');mask-image:url('img/marca/jacare-couro.webp')"></span>
        </div>
        <div class="gator__small">${gator('')}</div>
      </div>
    </section>`;
  }

  function mountHome(params) {
    // parallax do palco
    const stage = $('#stage');
    if (stage && !reduceMotion.matches && matchMedia('(pointer: fine)').matches) {
      const hero = stage.closest('.hero');
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        stage.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        stage.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      hero.addEventListener('pointerleave', () => { stage.style.setProperty('--px', 0); stage.style.setProperty('--py', 0); });
    }
    // no celular (Android), o palco inclina com o aparelho; no iOS precisaria de permissão, então não liga
    if (stage && !reduceMotion.matches && matchMedia('(pointer: coarse)').matches && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      const onTilt = (e) => {
        if (e.gamma == null || e.beta == null) return;
        stage.style.setProperty('--px', Math.max(-0.5, Math.min(0.5, e.gamma / 60)).toFixed(3));
        stage.style.setProperty('--py', Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 90)).toFixed(3));
      };
      addEventListener('deviceorientation', onTilt);
      cleanup.push(() => removeEventListener('deviceorientation', onTilt));
    }
    // vitrine giratória
    const vit = $('#vitrine');
    if (vit) {
      const vitrine = VITRINE.map(byId).filter((p) => p && p.recorte);
      const items = $$('.vit', vit), n = items.length;
      const chipsEl = $('#heroChips'), cap = $('#vitCaption'), dots = $$('[data-dot]');
      let idx = 0, timer = 0, paused = false;
      // carrega só a vista que o próximo giro vai precisar (para a frente primeiro; para trás um pouco depois)
      const load = (d, cls) => { const im = $(`.${cls}[data-src]`, items[(idx + d + n) % n]); if (im) { im.src = im.dataset.src; im.removeAttribute('data-src'); } };
      let backTimer = 0;
      const prime = () => {
        load(0, 'vit__esq'); load(1, 'vit__front'); load(2, 'vit__dir');
        clearTimeout(backTimer);
        backTimer = setTimeout(() => { load(0, 'vit__dir'); load(-1, 'vit__front'); load(-2, 'vit__esq'); }, 2500);
      };
      const render = () => {
        items.forEach((el, i) => {
          const d = (i - idx + n) % n;
          el.classList.remove('is-center', 'is-right', 'is-left', 'is-off');
          el.classList.add(d === 0 ? 'is-center' : d === 1 ? 'is-right' : d === n - 1 ? 'is-left' : 'is-off');
        });
        prime();
        const p = vitrine[idx];
        $$('.vit__sheen', vit).forEach((s) => { s.style.maskImage = ''; s.style.webkitMaskImage = ''; });
        const sheen = $('.vit__sheen', items[idx]), mask = `url('${p.recorte.src}')`;
        sheen.style.webkitMaskImage = mask; sheen.style.maskImage = mask;
        // texto troca no meio do giro, quando o frasco novo está chegando ao centro
        chipsEl.classList.add('is-swap'); cap.classList.add('is-swap');
        setTimeout(() => {
          chipsEl.innerHTML = chipsFor(p); chipsEl.classList.remove('is-swap');
          cap.href = `#/produto/${p.id}`; cap.innerHTML = captionFor(p); cap.classList.remove('is-swap');
        }, reduceMotion.matches ? 0 : 420);
        dots.forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
      };
      const restart = () => {
        clearInterval(timer);
        if (!reduceMotion.matches) timer = setInterval(() => { if (!document.hidden && !paused) { idx = (idx + 1) % n; render(); } }, 5000);
      };
      const go = (d) => { idx = (idx + d + n) % n; render(); restart(); };
      const visual = stage.parentElement;
      visual.addEventListener('pointerenter', () => { paused = true; });
      visual.addEventListener('pointerleave', () => { paused = false; });
      visual.addEventListener('focusin', () => { paused = true; });
      visual.addEventListener('focusout', () => { paused = false; });
      vit.addEventListener('click', (e) => {
        const el = e.target.closest('.vit');
        if (!el) return;
        if (el.classList.contains('is-left')) go(-1);
        else if (el.classList.contains('is-right')) go(1);
        else if (el.classList.contains('is-center')) location.hash = `#/produto/${vitrine[idx].id}`;
      });
      $('[data-prev]').addEventListener('click', () => go(-1));
      $('[data-next]').addEventListener('click', () => go(1));
      dots.forEach((d, i) => d.addEventListener('click', () => { idx = i; render(); restart(); }));
      document.addEventListener('keydown', onKey);
      function onKey(e) {
        if (layer || !document.contains(vit)) return;
        if (e.key === 'ArrowLeft' && visual.contains(document.activeElement)) go(-1);
        if (e.key === 'ArrowRight' && visual.contains(document.activeElement)) go(1);
      }
      restart();
      const primeTimer = setTimeout(prime, 900); // depois da animação de entrada, busca as vistas vizinhas
      cleanup.push(() => { clearInterval(timer); clearTimeout(primeTimer); clearTimeout(backTimer); document.removeEventListener('keydown', onKey); });
    }
    // par de jacarés parado (padrão): o grande e o pequeno se deslocam em sentidos opostos conforme a rolagem
    const par = $('.gator');
    if (par && !reduceMotion.matches) {
      let gRaf = 0;
      const onGScroll = () => {
        if (gRaf) return;
        gRaf = requestAnimationFrame(() => {
          gRaf = 0;
          const r = par.getBoundingClientRect();
          const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
          par.style.setProperty('--gx', `${(-p * 70).toFixed(1)}px`);
        });
      };
      addEventListener('scroll', onGScroll, { passive: true });
      onGScroll();
      cleanup.push(() => removeEventListener('scroll', onGScroll));
    }
    // abas da seleção
    const tabs = $('.tabs'), pill = $('.tabs__pill'), grid = $('#featuredGrid');
    const movePill = () => { const b = $('[aria-selected="true"]', tabs); pill.style.left = b.offsetLeft + 'px'; pill.style.width = b.offsetWidth + 'px'; };
    movePill();
    document.fonts && document.fonts.ready.then(movePill);
    tabs.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tab]');
      if (!b || b.getAttribute('aria-selected') === 'true') return;
      $$('[data-tab]', tabs).forEach((x) => x.setAttribute('aria-selected', String(x === b)));
      movePill();
      const list = P.filter((p) => p.origem === b.dataset.tab).sort((a, c) => (c.destaque - a.destaque) || (isAvailable(c) - isAvailable(a))).slice(0, 4);
      swapGrid(grid, list.map(card).join(''));
    });
    tabs.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const bs = $$('[data-tab]', tabs), i = bs.indexOf(document.activeElement);
      const n = bs[(i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length];
      n.focus(); n.click();
    });
    mountQuiz($('#quiz'));
    if (params.get('s')) setTimeout(() => { const t = document.getElementById(params.get('s')); t && t.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' }); }, 80);
  }

  function swapGrid(grid, html) {
    if (reduceMotion.matches) { grid.innerHTML = html; return; }
    grid.classList.add('is-leaving');
    setTimeout(() => { grid.innerHTML = html; grid.classList.remove('is-leaving'); }, 160);
  }

  /* ---------- quiz ---------- */
  const QUIZ = [
    { q: 'Quando você mais vai usar?', o: [
      ['Dia e trabalho', 'Algo que não incomode ninguém', { frescos: 2, florais: 1 }],
      ['Noite e encontros', 'Para ser notado', { ambar: 2, amadeirados: 1 }],
      ['Ocasiões especiais', 'Casamento, jantar, festa', { florais: 1, ambar: 1, amadeirados: 1 }],
      ['Todo dia, toda hora', 'Um perfume coringa', { frescos: 2, amadeirados: 1 }]] },
    { q: 'Qual destes cheiros te atrai mais?', o: [
      ['Limão e banho tomado', 'Cítrico, limpo', { frescos: 3 }],
      ['Flores frescas', 'Rosa, lírio, jasmim', { florais: 3 }],
      ['Madeira e couro', 'Seco, elegante', { amadeirados: 3 }],
      ['Baunilha e café', 'Doce, quentinho', { ambar: 3 }]] },
    { q: 'Como você quer ser lembrado?', o: [
      ['Leve e discreto', '', { frescos: 1, florais: 1 }],
      ['Elegante', '', { amadeirados: 2 }],
      ['Marcante', '', { ambar: 2, amadeirados: 1 }],
      ['Romântico', '', { florais: 2 }]] }
  ];
  function mountQuiz(el) {
    if (!el) return;
    let step = 0, score = {};
    const draw = () => {
      if (step < QUIZ.length) {
        const s = QUIZ[step];
        el.innerHTML = `<span class="eyebrow">Descubra em 3 perguntas</span><h3 style="margin-top:12px">Qual família é a sua?</h3>
          <div class="quiz__progress" role="progressbar" aria-valuemin="0" aria-valuemax="${QUIZ.length}" aria-valuenow="${step}" aria-label="Progresso"><i style="width:${(step / QUIZ.length) * 100}%"></i></div>
          <div class="quiz__step"><p class="quiz__q">${step + 1}. ${s.q}</p>
          <div class="quiz__opts">${s.o.map((o, i) => `<button class="quiz__opt" data-opt="${i}">${o[0]}${o[1] ? `<span>${o[1]}</span>` : ''}</button>`).join('')}</div></div>`;
        requestAnimationFrame(() => { const i = $('.quiz__progress i', el); i.style.width = ((step + 0.0001) / QUIZ.length * 100) + '%'; });
      } else {
        const fam = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
        const picks = P.filter((p) => p.familia === fam).sort((a, b) => (isAvailable(b) - isAvailable(a)) || (b.destaque - a.destaque)).slice(0, 3);
        el.innerHTML = `<span class="eyebrow">Seu resultado</span>
          <div class="quiz__progress"><i style="width:100%"></i></div>
          <div class="quiz__step quiz__result" aria-live="polite"><p>Sua família olfativa é</p><h4>${FAMILIAS[fam].nome}</h4><p>${FAMILIAS[fam].desc}</p>
          <div class="quiz__picks">${picks.map((p) => `<a class="mini" href="#/produto/${p.id}"><span class="mini__img">${media(p, { ml: mainVariant(p).ml })}</span><span><b>${esc(p.nome)}</b><small>${esc(p.marca)}</small></span><span class="price">${brl(mainVariant(p).preco)}</span></a>`).join('')}</div>
          <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#/catalogo?familia=${fam}">Ver todos ${icon('arrow')}</a><button class="btn btn--ghost" data-restart>Refazer</button></div></div>`;
      }
    };
    el.addEventListener('click', (e) => {
      const o = e.target.closest('[data-opt]');
      if (o) {
        Object.entries(QUIZ[step].o[+o.dataset.opt][2]).forEach(([k, v]) => { score[k] = (score[k] || 0) + v; });
        step++; draw();
        const f = $('.quiz__opt, .quiz__result a', el); f && f.focus({ preventScroll: true });
      }
      if (e.target.closest('[data-restart]')) { step = 0; score = {}; draw(); $('.quiz__opt', el).focus({ preventScroll: true }); }
    });
    draw();
  }

  /* ---------- PÁGINA: catálogo ---------- */
  const VOL = [
    { k: 'decant', label: 'Decant (até 10 ml)', t: (ml) => ml <= 10 },
    { k: 'medio', label: '30 a 75 ml', t: (ml) => ml > 10 && ml <= 75 },
    { k: 'grande', label: '90 ml ou mais', t: (ml) => ml >= 90 }
  ];
  const ORDENS = { destaque: 'Destaques', menor: 'Menor preço', maior: 'Maior preço', nome: 'Nome (A–Z)' };
  const F = { q: '', marcas: new Set(), familias: new Set(), origens: new Set(), generos: new Set(), volumes: new Set(), precoMax: 0, disponivel: false, ordem: 'destaque' };
  const precoTeto = () => Math.ceil(Math.max(...P.map((p) => mainVariant(p).preco)) / 50) * 50;

  function filtered() {
    const terms = norm(F.q).split(/\s+/).filter(Boolean);
    const list = P.filter((p) =>
      (!terms.length || terms.every((t) => searchText(p).includes(t))) &&
      (!F.marcas.size || F.marcas.has(p.marca)) &&
      (!F.familias.size || F.familias.has(p.familia)) &&
      (!F.origens.size || F.origens.has(p.origem)) &&
      (!F.generos.size || F.generos.has(p.genero)) &&
      (!F.volumes.size || p.variacoes.some((v) => VOL.some((b) => F.volumes.has(b.k) && b.t(v.ml)))) &&
      (!F.precoMax || mainVariant(p).preco <= F.precoMax) &&
      (!F.disponivel || isAvailable(p)));
    const pr = (p) => mainVariant(p).preco;
    const sorters = {
      destaque: (a, b) => (isAvailable(b) - isAvailable(a)) || (b.destaque - a.destaque) || a.nome.localeCompare(b.nome),
      menor: (a, b) => pr(a) - pr(b), maior: (a, b) => pr(b) - pr(a), nome: (a, b) => a.nome.localeCompare(b.nome, 'pt-BR')
    };
    return list.sort(sorters[F.ordem]);
  }

  function pageCatalog(params) {
    F.q = params.get('q') || '';
    F.marcas = new Set(params.getAll('marca'));
    F.familias = new Set(params.getAll('familia').filter((f) => FAMILIAS[f]));
    F.origens = new Set(params.getAll('origem'));
    F.generos = new Set(); F.volumes = new Set(); F.disponivel = false; F.precoMax = precoTeto(); F.ordem = 'destaque';
    const cnt = (fn) => P.filter(fn).length;
    const group = (title, name, opts) => `<div class="fgroup"><b>${title}</b>${opts.map(([v, label, n]) =>
      `<label class="check"><input type="checkbox" name="${name}" value="${esc(v)}">${esc(label)}<small>${n}</small></label>`).join('')}</div>`;
    const marcas = [...new Set(P.map((p) => p.marca))].sort();
    const generos = [...new Set(P.map((p) => p.genero))];
    const fam = F.familias.size === 1 ? FAMILIAS[[...F.familias][0]].nome : F.origens.size === 1 ? ([...F.origens][0] === 'arabe' ? 'Perfumes árabes' : 'O Boticário') : 'Catálogo';
    return `
    <div class="wrap page-head">
      <nav class="crumbs intro" aria-label="Você está em"><a href="#/">Início</a><span>/</span><span>Catálogo</span></nav>
      <h1 class="intro" style="--d:80ms" id="catTitle">${fam}</h1>
    </div>
    <div class="wrap catalog">
      <form class="filters" id="filters" aria-label="Filtros" onsubmit="return false">
        <div class="filters__head"><b>Filtros</b><button type="button" class="icon-btn" data-close-filters aria-label="Fechar filtros">${icon('close')}</button></div>
        ${group('Família', 'familias', Object.entries(FAMILIAS).map(([k, f]) => [k, f.nome, cnt((p) => p.familia === k)]))}
        ${group('Origem', 'origens', [['nacional', 'Nacional', cnt((p) => p.origem === 'nacional')], ['arabe', 'Árabe', cnt((p) => p.origem === 'arabe')]])}
        ${group('Marca', 'marcas', marcas.map((m) => [m, m, cnt((p) => p.marca === m)]))}
        ${group('Para quem', 'generos', generos.map((g) => [g, g, cnt((p) => p.genero === g)]))}
        ${group('Volume', 'volumes', VOL.map((b) => [b.k, b.label, cnt((p) => p.variacoes.some((v) => b.t(v.ml)))]).filter((x) => x[2]))}
        <div class="fgroup"><b>Preço até</b>
          <input class="range" type="range" name="preco" min="${Math.floor(Math.min(...P.map((p) => mainVariant(p).preco)) / 10) * 10}" max="${precoTeto()}" step="10" value="${precoTeto()}" aria-describedby="precoVal">
          <div class="range-val" id="precoVal"><span>qualquer</span><b class="num">${brl(precoTeto())}</b></div>
        </div>
        <div class="fgroup"><label class="check"><input type="checkbox" name="disponivel">Somente disponíveis<small>${cnt(isAvailable)}</small></label></div>
        <button type="button" class="btn btn--ghost" data-clear style="margin-top:12px">Limpar filtros</button>
        <button type="button" class="btn filter-apply" data-close-filters style="margin-top:4px">Ver resultados</button>
      </form>
      <div>
        <div class="toolbar">
          <label class="toolbar__search">${icon('search')}<input type="search" id="catSearch" placeholder="Buscar no catálogo" value="${esc(F.q)}" aria-label="Buscar no catálogo"></label>
          <button type="button" class="btn btn--ghost filter-toggle" id="filterToggle" aria-controls="filters" aria-expanded="false">${icon('filter')} Filtros</button>
          <select class="select" id="sort" aria-label="Ordenar">${Object.entries(ORDENS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
        </div>
        <div class="result-count" id="resultCount" aria-live="polite"></div>
        <div class="grid" id="catGrid"></div>
      </div>
    </div>`;
  }

  function mountCatalog() {
    const form = $('#filters'), grid = $('#catGrid'), countEl = $('#resultCount');
    const syncForm = () => {
      $$('input[type=checkbox]', form).forEach((c) => {
        if (c.name === 'disponivel') c.checked = F.disponivel; else c.checked = F[c.name].has(c.value);
      });
      form.preco.value = F.precoMax;
      $('#precoVal').innerHTML = `<span>${F.precoMax >= precoTeto() ? 'qualquer' : 'até'}</span><b class="num">${brl(F.precoMax)}</b>`;
      $('#sort').value = F.ordem;
    };
    const chips = () => {
      const c = [];
      if (F.q) c.push(['q', '', `“${F.q}”`]);
      F.familias.forEach((v) => c.push(['familias', v, FAMILIAS[v].nome]));
      F.origens.forEach((v) => c.push(['origens', v, origemNome(v)]));
      F.marcas.forEach((v) => c.push(['marcas', v, v]));
      F.generos.forEach((v) => c.push(['generos', v, v]));
      F.volumes.forEach((v) => c.push(['volumes', v, VOL.find((b) => b.k === v).label]));
      if (F.precoMax < precoTeto()) c.push(['preco', '', `até ${brl(F.precoMax)}`]);
      if (F.disponivel) c.push(['disponivel', '', 'Disponíveis']);
      return c.map(([k, v, l]) => `<button type="button" class="active-chip" data-chip="${k}" data-v="${esc(v)}" aria-label="Remover filtro ${esc(l)}">${esc(l)}${icon('close')}</button>`).join('');
    };
    let first = true;
    const render = () => {
      const list = filtered();
      countEl.innerHTML = `<span><b>${list.length}</b> ${list.length === 1 ? 'fragrância' : 'fragrâncias'}</span>${chips()}`;
      const ft = $('#filterToggle'), active = countEl.querySelectorAll('.active-chip').length;
      ft.innerHTML = `${icon('filter')} Filtros${active ? ` (${active})` : ''}`;
      const html = list.length ? list.map(card).join('') : `<div class="empty" style="grid-column:1/-1">${gator()}<h3>Nenhum perfume com esses filtros</h3><p>Tente remover algum filtro ou buscar por outra nota.</p><button type="button" class="btn" data-clear>Limpar filtros</button></div>`;
      if (first) { grid.innerHTML = html; first = false; } else swapGrid(grid, html);
    };
    form.addEventListener('change', (e) => {
      const t = e.target;
      if (t.name === 'disponivel') F.disponivel = t.checked;
      else if (t.type === 'checkbox') { t.checked ? F[t.name].add(t.value) : F[t.name].delete(t.value); }
      render();
    });
    form.preco.addEventListener('input', () => { F.precoMax = +form.preco.value; syncForm(); render(); });
    let deb;
    $('#catSearch').addEventListener('input', (e) => { clearTimeout(deb); deb = setTimeout(() => { F.q = e.target.value.trim(); render(); }, 160); });
    $('#sort').addEventListener('change', (e) => { F.ordem = e.target.value; render(); });
    const clear = () => { F.q = ''; ['marcas', 'familias', 'origens', 'generos', 'volumes'].forEach((k) => F[k].clear()); F.disponivel = false; F.precoMax = precoTeto(); $('#catSearch').value = ''; syncForm(); render(); };
    main.addEventListener('click', onCatClick);
    function onCatClick(e) {
      if (!document.contains(form)) return main.removeEventListener('click', onCatClick);
      if (e.target.closest('[data-clear]')) return clear();
      const ch = e.target.closest('[data-chip]');
      if (ch) {
        const k = ch.dataset.chip;
        if (k === 'q') { F.q = ''; $('#catSearch').value = ''; } else if (k === 'preco') F.precoMax = precoTeto(); else if (k === 'disponivel') F.disponivel = false; else F[k].delete(ch.dataset.v);
        syncForm(); render(); countEl.querySelector('.active-chip, b') && $('#catSearch').focus();
      }
    }
    // filtros como folha inferior no celular
    const toggle = $('#filterToggle');
    let fLayer = false;
    const closeF = () => { form.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); overlay.classList.remove('is-on'); setTimeout(() => { if (!layer) overlay.hidden = true; }, 300); document.body.style.overflow = ''; if (fLayer) toggle.focus(); fLayer = false; };
    toggle.addEventListener('click', () => {
      form.classList.add('is-open'); toggle.setAttribute('aria-expanded', 'true'); overlay.hidden = false; requestAnimationFrame(() => overlay.classList.add('is-on')); document.body.style.overflow = 'hidden'; fLayer = true;
      setTimeout(() => $('input', form).focus(), 50);
    });
    form.addEventListener('click', (e) => { if (e.target.closest('[data-close-filters]')) closeF(); });
    const onOv = () => fLayer && closeF();
    const onEsc = (e) => { if (e.key === 'Escape' && fLayer) closeF(); };
    overlay.addEventListener('click', onOv);
    document.addEventListener('keydown', onEsc);
    cleanup.push(() => { overlay.removeEventListener('click', onOv); document.removeEventListener('keydown', onEsc); if (fLayer) closeF(); });
    syncForm(); render();
  }

  /* ---------- PÁGINA: produto ---------- */
  function pageProduct(id) {
    const p = byId(id);
    if (!p) return pageError('Perfume não encontrado', 'Esse produto pode ter saído do catálogo.');
    const v = mainVariant(p);
    const fav = favs.includes(p.id);
    const notas = [['Saída', p.notas.saida], ['Coração', p.notas.coracao], ['Fundo', p.notas.fundo]].filter((n) => n[1] && n[1].length);
    document.title = `${p.nome} · ${p.marca} — Jaka Perfumaria`;
    return `
    <div class="wrap page-head" style="padding-bottom:16px">
      <nav class="crumbs" aria-label="Você está em"><a href="#/">Início</a><span>/</span><a href="#/catalogo?familia=${p.familia}">${FAMILIAS[p.familia].nome}</a><span>/</span><span>${esc(p.nome)}</span></nav>
    </div>
    <div class="wrap product">
      <div class="gallery intro-img" style="--d:60ms">
        <div class="gallery__thumbs" role="tablist" aria-label="Imagens">
          ${Array.from({ length: viewCount(p) }, (_, i) => `<button class="gallery__thumb" role="tab" aria-selected="${i === 0}" data-view="${i}" aria-label="Imagem ${i + 1}">${media(p, { view: i, ml: v.ml })}</button>`).join('')}
        </div>
        <div class="gallery__main" id="gMain"><div class="gallery__slide" id="gSlide">${media(p, { ml: v.ml, sizes: '(max-width: 900px) 90vw, 50vw' })}</div></div>
      </div>
      <div class="pinfo">
        <p class="card__brand intro">${esc(p.marca)} · ${origemNome(p.origem)}</p>
        <h1 class="intro" style="--d:70ms">${esc(p.nome)}</h1>
        <div class="pinfo__chips intro" style="--d:120ms">
          <a class="chip" href="#/catalogo?familia=${p.familia}">${icon(FAMILIAS[p.familia].icon)} ${FAMILIAS[p.familia].nome}</a>
          <span class="chip">${esc(p.genero)}</span>
          ${(p.ocasioes || []).map((o) => `<span class="chip">${esc(o)}</span>`).join('')}
        </div>
        <p class="pinfo__desc intro" style="--d:160ms">${esc(p.descricao)}</p>

        <div class="pinfo__block intro" style="--d:200ms">
          <p class="pinfo__label"><span>Tamanho</span></p>
          <div class="variants" role="radiogroup" aria-label="Tamanho">
            ${p.variacoes.map((x) => `<button class="variant ${x.estoque > 0 ? '' : 'is-out'}" role="radio" aria-checked="${x.ml === v.ml}" data-ml="${x.ml}"><b>${mlLabel(x.ml)}</b><small>${x.estoque > 0 ? brl(x.preco) : 'Indisponível'}</small></button>`).join('')}
          </div>
          <div class="pprice"><span class="price" id="pPrice">${brl(v.preco)}</span><span class="stock" id="pStock"></span></div>
          <div class="buy">
            <div class="qty" role="group" aria-label="Quantidade">
              <button type="button" data-pq="-1" aria-label="Diminuir quantidade">${icon('minus')}</button>
              <output class="num" id="pQty" aria-live="polite">1</output>
              <button type="button" data-pq="1" aria-label="Aumentar quantidade">${icon('plus')}</button>
            </div>
            <button class="btn" id="pAdd" data-add="${p.id}" data-ml="${v.ml}" data-qtd="1">${icon('bagPlus')} Adicionar à sacola</button>
            <button class="fav-btn pfav" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${fav ? 'Remover dos' : 'Adicionar aos'} favoritos: ${esc(p.nome)}">${icon('heart')}</button>
          </div>
          <p class="disclaimer" id="pOut" hidden><a class="link-arrow" href="${waLink(`Olá, Diego! Quero ser avisado quando o ${p.nome} (${p.marca}) chegar.`)}" target="_blank" rel="noopener">${icon('whatsapp')} Avise-me pelo WhatsApp quando chegar</a></p>
        </div>

        ${notas.length ? `<div class="pinfo__block reveal"><p class="pinfo__label"><span>Pirâmide olfativa</span></p>
          <div class="notes">${notas.map(([t, ns]) => `<div class="note-row"><b>${t}</b><div>${ns.map((n) => `<span>${esc(n)}</span>`).join('')}</div></div>`).join('')}</div>
          ${C.demo ? '<p class="disclaimer">Notas para demonstração — conferir com a descrição oficial do fabricante.</p>' : ''}</div>` : ''}

        <div class="pinfo__block reveal"><p class="pinfo__label"><span>Entrega e atendimento</span></p>
          <div class="service">
            <div>${icon('truck')}<p><b>Entrega</b><span>${esc(C.entrega)}</span></p></div>
            <div>${icon('card')}<p><b>Pagamento</b><span>${esc(C.pagamento)}</span></p></div>
            <div>${icon('chat')}<p><b>Dúvidas sobre este perfume?</b><span><a class="link-arrow" style="border:0" href="${waLink(`Olá, Diego! Tenho uma dúvida sobre o ${p.nome} (${p.marca}).`)}" target="_blank" rel="noopener">Pergunte ao ${esc(C.responsavel.split(' ')[0])} no WhatsApp</a></span></p></div>
          </div>
        </div>
      </div>
    </div>
    ${related(p)}`;
  }
  function related(p) {
    // mesma família primeiro; completa com a mesma origem
    const same = P.filter((x) => x.id !== p.id && x.familia === p.familia);
    const more = P.filter((x) => x.id !== p.id && x.familia !== p.familia && x.origem === p.origem);
    const list = [...same, ...more].sort((a, b) => (isAvailable(b) - isAvailable(a))).slice(0, 4);
    if (!list.length) return '';
    return `<section class="section section--alt"><div class="wrap">
      <div class="section__head reveal"><div><span class="eyebrow">Você também pode gostar</span><h2>Da mesma família, ${FAMILIAS[p.familia].nome.toLowerCase()}.</h2></div></div>
      <div class="grid">${list.map(card).join('')}</div></div></section>`;
  }
  function mountProduct(id) {
    const p = byId(id);
    if (!p) return;
    let ml = mainVariant(p).ml, qty = 1, view = 0;
    const slide = $('#gSlide'), gMain = $('#gMain');
    const update = (animateImg) => {
      const v = variant(p, ml);
      $('#pPrice').textContent = brl(v.preco);
      const st = $('#pStock');
      st.className = 'stock' + (v.estoque <= 0 ? ' is-out' : v.estoque <= 3 ? ' is-low' : '');
      st.textContent = v.estoque <= 0 ? 'Indisponível no momento' : v.estoque <= 3 ? `Últimas ${v.estoque} unidades` : 'Disponível';
      qty = Math.max(1, Math.min(qty, Math.max(v.estoque, 1)));
      $('#pQty').textContent = qty;
      $('[data-pq="-1"]').disabled = qty <= 1 || v.estoque <= 0;
      $('[data-pq="1"]').disabled = qty >= v.estoque;
      const add = $('#pAdd');
      add.dataset.ml = ml; add.dataset.qtd = qty; add.disabled = v.estoque <= 0;
      add.innerHTML = v.estoque <= 0 ? 'Indisponível' : `${icon('bagPlus')} Adicionar à sacola`;
      $('#pOut').hidden = v.estoque > 0;
      $$('.variant').forEach((b) => b.setAttribute('aria-checked', String(+b.dataset.ml === ml)));
      $$('.gallery__thumb').forEach((t) => { t.innerHTML = media(p, { view: +t.dataset.view, ml }); });
      if (animateImg) swapSlide();
    };
    const swapSlide = () => {
      const html = media(p, { view, ml, sizes: '(max-width: 900px) 90vw, 50vw' });
      gMain.classList.toggle('alt', view === 1);
      if (reduceMotion.matches) { slide.innerHTML = html; return; }
      slide.classList.add('is-out');
      setTimeout(() => { slide.innerHTML = html; slide.classList.remove('is-out'); }, 220);
    };
    $('.variants').addEventListener('click', (e) => { const b = e.target.closest('.variant'); if (b && +b.dataset.ml !== ml) { ml = +b.dataset.ml; update(true); } });
    $('.variants').addEventListener('keydown', (e) => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return;
      e.preventDefault();
      const bs = $$('.variant'), i = bs.findIndex((b) => +b.dataset.ml === ml);
      const n = bs[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + bs.length) % bs.length];
      ml = +n.dataset.ml; update(true); n.focus();
    });
    $$('[data-pq]').forEach((b) => b.addEventListener('click', () => { qty += +b.dataset.pq; update(false); }));
    $('.gallery__thumbs').addEventListener('click', (e) => {
      const t = e.target.closest('.gallery__thumb');
      if (!t || +t.dataset.view === view) return;
      view = +t.dataset.view;
      $$('.gallery__thumb').forEach((x) => x.setAttribute('aria-selected', String(x === t)));
      swapSlide();
    });
    update(false);
  }

  function pageError(t, m) {
    return `<div class="wrap error-page">${gator()}<span class="eyebrow">Ops</span><h1>${esc(t)}</h1><p>${esc(m)}</p><a class="btn" href="#/catalogo">Ver o catálogo</a></div>`;
  }

  /* ---------- rodapé ---------- */
  function renderFooter() {
    $('#footer').innerHTML = `
      <div class="wrap">
        <div class="footer__grid">
          <div>
            <a class="logo" href="#/" aria-label="Início"><span class="logo__mark">JAKA</span><span class="logo__sub">PERFUMARIA</span></a>
            <p class="footer__about">${esc(C.slogan)}. Atendimento personalizado com ${esc(C.responsavel)}, ${esc(C.cargo.toLowerCase())}, desde ${C.desde}.</p>
            <div class="footer__social">
              <a href="${waLink('Olá, Diego! Vim pelo site da Jaka Perfumaria.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
              <a href="${igLink()}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
            </div>
          </div>
          <div><h4>Loja</h4><ul>
            <li><a href="#/catalogo">Catálogo</a></li>
            ${Object.entries(FAMILIAS).map(([k, f]) => `<li><a href="#/catalogo?familia=${k}">${f.nome}</a></li>`).join('')}
          </ul></div>
          <div><h4>Atendimento</h4><ul>
            <li><a href="${waLink('Olá, Diego! Vim pelo site da Jaka Perfumaria.')}" target="_blank" rel="noopener">WhatsApp ${esc(C.whatsappExibicao)}</a></li>
            <li><a href="${igLink()}" target="_blank" rel="noopener">Instagram @${esc(C.instagram)}</a></li>
            <li><a href="#/?s=guia">Como escolher</a></li>
            <li><a href="#/?s=atendimento">Sobre a Jaka</a></li>
          </ul></div>
          <div><h4>Compra</h4><ul class="footer__cond">
            <li><b>Entrega</b>${esc(C.entrega)}</li>
            <li><b>Pagamento</b>${esc(C.pagamento)}</li>
            <li><b>Trocas</b>${esc(C.troca)}</li>
          </ul></div>
        </div>
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} ${esc(C.nome)} ${esc(C.complemento)} · ${esc(C.responsavel)}</span>
          <span>As marcas citadas pertencem aos seus respectivos titulares.</span>
        </div>
      </div>`;
  }

  /* ---------- roteador ---------- */
  let cleanup = [];
  function parse() {
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = h.split('?');
    return { path, params: new URLSearchParams(qs || '') };
  }
  let firstRoute = true;
  function route() {
    if (layer) closeLayer(false);
    cleanup.forEach((f) => f()); cleanup = [];
    const { path, params } = parse();
    const go = () => {
      document.title = 'Jaka Perfumaria · Diego Moreira';
      let html, mount;
      const m = path.match(/^\/produto\/([\w-]+)$/);
      if (path === '/' || path === '') { html = pageHome(); mount = () => mountHome(params); }
      else if (path === '/catalogo') { html = pageCatalog(params); mount = mountCatalog; }
      else if (m) { html = pageProduct(m[1]); mount = () => mountProduct(m[1]); }
      else html = pageError('Página não encontrada', 'O endereço pode ter mudado.');
      main.innerHTML = html;
      try { mount && mount(); } catch (err) { console.error(err); main.innerHTML = pageError('Algo deu errado', 'Recarregue a página. Se continuar, fale com a loja pelo WhatsApp.'); }
      observe(main);
      if (!params.get('s')) window.scrollTo(0, 0);
      if (!firstRoute) main.focus({ preventScroll: true });
      main.classList.remove('is-leaving');
      firstRoute = false;
    };
    if (firstRoute || reduceMotion.matches) go();
    else { main.classList.add('is-leaving'); setTimeout(go, 170); }
  }

  /* ---------- início ---------- */
  if (!P || !P.length) {
    main.innerHTML = pageError('Catálogo indisponível', 'Não foi possível carregar os produtos. Tente recarregar a página.');
    return;
  }
  if (C.demo && C.avisoDemo) { const d = $('#demoBar'); d.textContent = C.avisoDemo; d.hidden = false; }
  const header = $('#header');
  addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 8), { passive: true });
  renderFooter();
  updateBadges();
  addEventListener('hashchange', route);
  route();
})();
