(function () {
  'use strict';

  // 1º de maio de 2027, 14h no horário de Brasília (UTC-3)
  var WEDDING = new Date('2027-05-01T14:00:00-03:00');
  var VENUE = 'Villa Casarão, Rod. Baldicero Filomeno, 11789 - Ribeirão da Ilha, Florianópolis - SC, 88064-002';

  /* ---------- Hospedagem ---------- */
  var STAYS = [
    {
      area: 'Ribeirão da Ilha',
      search: 'Ribeirão da Ilha, Florianópolis',
      dist: '5–15 min',
      price: '$$ – $$$',
      badge: 'Mais perto',
      text: 'O próprio bairro do casamento. Pousadas charmosas e casas de temporada à beira-mar, em clima de vila açoriana. Poucas opções, então reserve cedo.'
    },
    {
      area: 'Região do aeroporto',
      search: 'Carianos, Florianópolis',
      dist: '20–25 min',
      price: '$ – $$',
      text: 'Bairros como Carianos, Tapera e Costeira do Pirajubaé. Hotéis práticos e apartamentos com bons preços, ótimos para quem chega e vai embora de avião.'
    },
    {
      area: 'Campeche e Armação',
      search: 'Campeche, Florianópolis',
      dist: '25–40 min',
      price: '$ – $$$',
      text: 'Praias lindas do Sul da Ilha, com grande oferta de casas, apartamentos e pousadas para todos os bolsos. Ideal para quem quer emendar uns dias de praia.'
    },
    {
      area: 'Centro',
      search: 'Centro, Florianópolis',
      dist: '40–50 min',
      price: '$ – $$',
      text: 'A maior oferta de hotéis da cidade, inclusive redes econômicas. Perto do Mercado Público, da Ponte Hercílio Luz e de restaurantes.'
    },
    {
      area: 'Lagoa da Conceição',
      search: 'Lagoa da Conceição, Florianópolis',
      dist: '45–55 min',
      price: '$ – $$',
      text: 'O coração boêmio de Floripa: bares, restaurantes e hostels. Boa escolha para quem quer ficar mais dias e aproveitar a vida noturna.'
    }
  ];

  function bookingUrl(q) {
    return 'https://www.booking.com/searchresults.pt-br.html?ss=' + encodeURIComponent(q) +
      '&checkin=2027-04-30&checkout=2027-05-02&group_adults=2';
  }
  function airbnbUrl(q) {
    return 'https://www.airbnb.com.br/s/' + encodeURIComponent(q.replace(', ', '--')) +
      '/homes?checkin=2027-04-30&checkout=2027-05-02&adults=2';
  }

  /* ---------- O que fazer em Floripa ----------
     cost: 0 = gratuito, 1 = $, 2 = $$, 3 = $$$ ; near = Sul da Ilha, perto do casamento */
  var PLACES = [
    {
      name: 'Freguesia do Ribeirão',
      region: 'Ribeirão da Ilha', cost: 0, near: true,
      text: 'Um dos núcleos mais antigos da Ilha, com casario açoriano colorido, a Igreja Nossa Senhora da Lapa e um passeio tranquilo à beira-mar.',
      q: 'Freguesia do Ribeirão da Ilha'
    },
    {
      name: 'Ostras do Ribeirão',
      region: 'Ribeirão da Ilha', cost: 2, costMax: 3, near: true,
      text: 'Floripa é a maior produtora de ostras do país, e o Ribeirão é a capital delas. Restaurantes tradicionais à beira d’água, como o Ostradamus e o Rancho Açoriano.',
      q: 'restaurantes ostras Ribeirão da Ilha'
    },
    {
      name: 'Trilha de Naufragados',
      region: 'Sul da Ilha', cost: 0, near: true,
      text: 'Começa na Caieira da Barra do Sul, pertinho do casamento. Cerca de 1h de caminhada leve pela mata até uma praia isolada, um farol e ruínas de uma fortaleza.',
      q: 'Trilha de Naufragados Caieira da Barra do Sul'
    },
    {
      name: 'Lagoinha do Leste',
      region: 'Sul da Ilha', cost: 0, near: true,
      text: 'Para muitos, a praia mais bonita da Ilha. Acesso só por trilha (cerca de 1h30, nível moderado) a partir do Pântano do Sul ou do Matadeiro.',
      q: 'Lagoinha do Leste Florianópolis'
    },
    {
      name: 'Pântano do Sul',
      region: 'Sul da Ilha', cost: 2, near: true,
      text: 'Vila de pescadores com clima raiz. Não deixe de conhecer o tradicional Bar do Arante, com milhares de bilhetes de visitantes nas paredes.',
      q: 'Bar do Arante Pântano do Sul'
    },
    {
      name: 'Ilha do Campeche',
      region: 'Sul da Ilha', cost: 2, near: true,
      text: 'Águas cristalinas e inscrições rupestres. Barcos saem da Armação e do Campeche; fora da temporada os horários são reduzidos, então confira antes.',
      q: 'Ilha do Campeche Florianópolis'
    },
    {
      name: 'Praias do Sul',
      region: 'Sul da Ilha', cost: 0, near: true,
      text: 'Armação, Matadeiro, Solidão e Campeche: praias amplas e bonitas, ótimas para caminhar e ver o pôr do sol, mesmo fora do verão.',
      q: 'Praia do Matadeiro Florianópolis'
    },
    {
      name: 'Lagoa da Conceição',
      region: 'Leste', cost: 1,
      text: 'Centrinho com bares e restaurantes. Pegue o barco de linha até a Costa da Lagoa, uma vila sem acesso por carro, e almoce à beira d’água.',
      q: 'Lagoa da Conceição Florianópolis'
    },
    {
      name: 'Dunas da Joaquina',
      region: 'Leste', cost: 1,
      text: 'Dunas enormes onde é possível alugar pranchas de sandboard. A praia da Joaquina, ao lado, é famosa pelo surf.',
      q: 'Dunas da Joaquina'
    },
    {
      name: 'Centro Histórico',
      region: 'Centro', cost: 0,
      text: 'Mercado Público, Praça XV com sua figueira centenária, Catedral e a travessia a pé pela Ponte Hercílio Luz, cartão-postal da cidade.',
      q: 'Mercado Público de Florianópolis'
    },
    {
      name: 'Mirante do Morro da Cruz',
      region: 'Centro', cost: 0,
      text: 'A vista mais completa da cidade, com as pontes, a baía e o continente. Vá no fim da tarde para ver as luzes acendendo.',
      q: 'Mirante Morro da Cruz Florianópolis'
    },
    {
      name: 'Santo Antônio de Lisboa',
      region: 'Norte', cost: 2, costMax: 3,
      text: 'Vila açoriana na baía norte, com ruas de pedra, restaurantes de frutos do mar e um dos pores do sol mais bonitos de Floripa.',
      q: 'Santo Antônio de Lisboa Florianópolis'
    },
    {
      name: 'Fortaleza de Anhatomirim',
      region: 'Norte', cost: 2,
      text: 'Passeio de escuna saindo de Canasvieiras até uma fortaleza do século XVIII, com paradas em praias. Programa para o dia todo.',
      q: 'Passeio escuna Fortaleza de Anhatomirim Canasvieiras'
    }
  ];

  function costLabel(n) { return n === 0 ? 'Gratuito' : new Array(n + 1).join('$'); }

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (html != null) node.innerHTML = html;
    return node;
  }

  function renderStays() {
    var root = document.getElementById('stays');
    if (!root) return;
    STAYS.forEach(function (s) {
      var item = el('article', { 'class': 'stay reveal' },
        '<div class="stay__dist">' + s.dist + '<small>até a Villa</small></div>' +
        '<div><h3>' + s.area + ' <span class="price">' + s.price + '</span>' +
          (s.badge ? ' <span class="badge">' + s.badge + '</span>' : '') + '</h3>' +
          '<p>' + s.text + '</p></div>' +
        '<div class="stay__links">' +
          '<a href="' + bookingUrl(s.search) + '" target="_blank" rel="noopener">Booking</a>' +
          '<a href="' + airbnbUrl(s.search) + '" target="_blank" rel="noopener">Airbnb</a>' +
        '</div>');
      root.appendChild(item);
    });
  }

  function renderPlaces() {
    var root = document.getElementById('places');
    if (!root) return;
    PLACES.forEach(function (p) {
      var costs = [p.cost];
      if (p.costMax) for (var c = p.cost + 1; c <= p.costMax; c++) costs.push(c);
      var price = costLabel(p.cost) + (p.costMax ? ' – ' + costLabel(p.costMax) : '');
      var card = el('article', {
        'class': 'place reveal' + (p.near ? ' place--near' : ''),
        'data-cost': costs.join(' '),
        'data-near': p.near ? '1' : '0'
      },
        '<div class="place__meta"><span>' + (p.near ? 'Perto do casamento' : p.region) + '</span>' +
          '<span class="price">' + price + '</span></div>' +
        '<h3>' + p.name + '</h3>' +
        '<p>' + p.text + '</p>' +
        '<a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.q + ', Florianópolis') +
          '" target="_blank" rel="noopener">Ver no mapa →</a>');
      root.appendChild(card);
    });

    var chips = document.querySelectorAll('.chip');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        var f = chip.getAttribute('data-filter');
        root.querySelectorAll('.place').forEach(function (card) {
          var show = f === 'all' ||
            (f === 'perto' ? card.dataset.near === '1' : card.dataset.cost.split(' ').indexOf(f) !== -1);
          card.hidden = !show;
          if (show) card.classList.add('is-visible');
        });
      });
    });
  }

  /* ---------- Contagem regressiva ---------- */
  function startCountdown() {
    var box = document.getElementById('countdown');
    if (!box) return;
    var units = {};
    box.querySelectorAll('[data-unit]').forEach(function (n) { units[n.dataset.unit] = n; });
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    function tick() {
      var diff = WEDDING - new Date();
      if (diff <= 0) {
        box.classList.add('is-done');
        box.textContent = 'Hoje é o grande dia!';
        return;
      }
      var s = Math.floor(diff / 1000);
      units.dias.textContent = Math.floor(s / 86400);
      units.horas.textContent = pad(Math.floor(s % 86400 / 3600));
      units.min.textContent = pad(Math.floor(s % 3600 / 60));
      units.seg.textContent = pad(s % 60);
      setTimeout(tick, 1000);
    }
    tick();
  }

  /* ---------- Adicionar à agenda ---------- */
  function setupCalendar() {
    var title = 'Casamento Nayana & João Gabriel';
    var details = 'Traje: esporte fino. Mais informações no site do casamento.';
    // 14h às 23h em Brasília = 17h às 02h UTC
    var start = '20270501T170000Z', end = '20270502T020000Z';

    var g = document.getElementById('googleCal');
    if (g) {
      g.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(title) +
        '&dates=' + start + '/' + end +
        '&details=' + encodeURIComponent(details) +
        '&location=' + encodeURIComponent(VENUE);
    }

    var b = document.getElementById('icsDownload');
    if (b) {
      b.addEventListener('click', function () {
        var ics = [
          'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Nayana e Joao Gabriel//Casamento//PT',
          'BEGIN:VEVENT',
          'UID:casamento-nayana-joaogabriel-20270501',
          'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
          'DTSTART:' + start, 'DTEND:' + end,
          'SUMMARY:' + title,
          'DESCRIPTION:' + details,
          'LOCATION:' + VENUE.replace(/,/g, '\\,'),
          'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Amanhã é o casamento!', 'END:VALARM',
          'END:VEVENT', 'END:VCALENDAR'
        ].join('\r\n');
        var url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
        var a = el('a', { href: url, download: 'casamento-nayana-joao-gabriel.ics' });
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      });
    }
  }

  /* ---------- Menu ---------- */
  function setupMenu() {
    var bar = document.getElementById('topbar');
    var toggle = document.getElementById('menuToggle');
    var menu = document.getElementById('menu');

    function onScroll() { bar.classList.toggle('is-scrolled', window.scrollY > 20); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function close() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }
    toggle.addEventListener('click', function () {
      var open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    // Destaca no menu a seção visível
    if ('IntersectionObserver' in window) {
      var links = {};
      menu.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && links[en.target.id]) {
            Object.keys(links).forEach(function (k) { links[k].classList.remove('is-current'); });
            links[en.target.id].classList.add('is-current');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------- Animação ao rolar ---------- */
  function setupReveal() {
    document.querySelectorAll('.section__head, .details, .dress, .map-wrap, .tip, .note, .beauty__card, .gifts > *')
      .forEach(function (n) { n.classList.add('reveal'); });
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (n) { io.observe(n); });
  }

  renderStays();
  renderPlaces();
  startCountdown();
  setupCalendar();
  setupMenu();
  setupReveal();
})();
