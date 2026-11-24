/* Independent Education: motion layer.
   Adds decorative, aria-hidden elements and animation classes only.
   It never changes any text: counted numbers always end on the exact
   original text, and decorative numbers are hidden from screen readers. */
(function () {
  'use strict';
  var d = document, root = d.documentElement, w = window;
  var mq = function (q) { return w.matchMedia ? w.matchMedia(q).matches : false; };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var finePointer = mq('(hover: hover) and (pointer: fine)');
  var hasIO = 'IntersectionObserver' in w;
  root.classList.add('ie-js');

  function deco(tag, cls, html) {
    var e = d.createElement(tag);
    e.className = cls;
    e.setAttribute('aria-hidden', 'true');
    if (html) e.innerHTML = html;
    return e;
  }

  /* 0. Footer: the owner's tagline "International Education Specialists"
     beside the logo (owner request 2026-11-24). Adds text, changes none. */
  var fimg = d.querySelector('footer .fbrand > img');
  if (fimg && !d.querySelector('.ie-flogo')) {
    var frow = d.createElement('div');
    frow.className = 'ie-flogo';
    fimg.parentNode.insertBefore(frow, fimg);
    frow.appendChild(fimg);
    var ftag = d.createElement('p');
    ftag.className = 'ie-ftag';
    ftag.innerHTML = 'International<br>Education<br>Specialists';
    frow.appendChild(ftag);
  }

  /* R. Home page reel (owner request 2026-11-24): a full-width, auto-playing
     destination reel above the home hero. Uses the site's own destination
     photos and destination names; links go to the existing destination pages. */
  var lhero = d.querySelector('section.lhero');
  if (lhero && !d.querySelector('.ie-reel')) (function () {
    var S = [
      ['02333d4f4a', 'United Kingdom', 'study-in-the-uk.html', '60% 40%'],
      ['f90488a779', 'USA', 'study-in-the-usa.html', '62% 40%'],
      ['3d1d3c56b2', 'Canada', 'study-in-canada.html', '50% 45%'],
      ['au-sydney', 'Australia', 'study-in-australia.html', '55% 55%'],
      ['nz-auckland', 'New Zealand', 'study-in-new-zealand.html', '50% 45%'],
      ['a50bd06c76', 'Ireland', 'study-in-ireland.html', '55% 50%'],
      ['eu-collage', 'Europe', 'study-in-europe.html', '35% 45%'],
      ['my-kl', 'Malaysia', 'study-in-malaysia.html', '50% 45%'],
      ['0d5b335cea', 'South Korea', 'study-in-south-korea.html', '58% 45%'],
      ['tr-istanbul', 'Türkiye', 'study-in-turkiye.html', '60% 50%'],
      ['cn-greatwall', 'China', 'study-in-china.html', '62% 50%']
    ];
    var DUR = 5200;
    var small = (w.innerWidth || 1200) < 700;
    var src = function (k) { return 'img/' + k + (small ? '' : '-hd') + '.webp'; };
    var reel = d.createElement('section');
    reel.className = 'ie-reel';
    reel.setAttribute('aria-roledescription', 'carousel');
    reel.setAttribute('aria-label', 'Study destinations');
    var stage = '<div class="ie-rl-stage" aria-hidden="true">';
    for (var k = 0; k < S.length; k++) {
      stage += '<div class="ie-rl-s' + (k % 2 ? ' alt' : '') + '"><img alt="" decoding="async" style="object-position:' + S[k][3] + '"' +
        (k === 0 ? ' src="' + src(S[0][0]) + '" fetchpriority="high"' : ' data-src="' + src(S[k][0]) + '"') + '></div>';
    }
    stage += '</div>';
    var dots = '';
    for (k = 0; k < S.length; k++) {
      dots += '<button type="button" class="ie-rl-dot" aria-label="' + S[k][1] + '"><i></i></button>';
    }
    reel.innerHTML = stage +
      '<div class="ie-rl-shade" aria-hidden="true"></div>' +
      '<div class="wrap ie-rl-copy">' +
        '<p class="ie-rl-tag"><span class="ie-rl-mark" aria-hidden="true"><i></i><i></i><i></i></span>International Education Specialists</p>' +
        '<p class="ie-rl-eye">Study in</p>' +
        '<div class="ie-rl-namebox"><a class="ie-rl-name" href="' + S[0][2] + '">' + S[0][1] + '</a></div>' +
        '<a class="btn btn-sun ie-rl-cta" href="destinations.html">Explore destinations</a>' +
      '</div>' +
      '<div class="wrap ie-rl-ctl"><div class="ie-rl-dots">' + dots + '</div>' +
        '<button type="button" class="ie-rl-pp" aria-label="Pause the reel"><span class="pa" aria-hidden="true"></span><span class="pl" aria-hidden="true"></span></button></div>';
    lhero.parentNode.insertBefore(reel, lhero);

    var slides = reel.querySelectorAll('.ie-rl-s'), dl = reel.querySelectorAll('.ie-rl-dot');
    var nm = reel.querySelector('.ie-rl-name'), pp = reel.querySelector('.ie-rl-pp');
    var cur = -1, timer = 0, playing = !reduce, visible = true;
    var load = function (i) {
      var im = slides[i] && slides[i].querySelector('img');
      if (im && im.getAttribute('data-src')) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); }
    };
    function show(i) {
      i = (i + S.length) % S.length;
      if (i === cur) return;
      load(i); load((i + 1) % S.length);
      for (var j = 0; j < slides.length; j++) {
        slides[j].classList.toggle('is-on', j === i);
        slides[j].classList.toggle('was-on', j === cur);
        dl[j].classList.toggle('is-on', j === i);
        dl[j].classList.toggle('is-done', j < i);
        if (j === i) dl[j].setAttribute('aria-current', 'true'); else dl[j].removeAttribute('aria-current');
      }
      cur = i;
      nm.classList.remove('in'); void nm.offsetWidth;
      nm.textContent = S[i][1]; nm.href = S[i][2];
      nm.classList.add('in');
      reel.style.setProperty('--rl-accent', ['var(--sun)', 'var(--green)', 'var(--blue)'][i % 3]);
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      reel.classList.toggle('is-playing', playing && visible);
      if (playing && visible) timer = setTimeout(function () { show(cur + 1); }, DUR);
    }
    function setPlay(v) {
      playing = v;
      pp.setAttribute('aria-label', v ? 'Pause the reel' : 'Play the reel');
      reel.classList.toggle('is-paused', !v);
      nm.setAttribute('aria-live', v ? 'off' : 'polite');
      if (v) { var a = dl[cur]; a.classList.remove('is-on'); void a.offsetWidth; a.classList.add('is-on'); }
      schedule();
    }
    for (k = 0; k < dl.length; k++) (function (n) {
      dl[n].addEventListener('click', function () { show(n); if (playing) setPlay(true); });
    })(k);
    pp.addEventListener('click', function () { setPlay(!playing); });
    reel.addEventListener('focusin', function () { if (playing) { clearTimeout(timer); reel.classList.remove('is-playing'); } });
    reel.addEventListener('focusout', function () { schedule(); });
    d.addEventListener('visibilitychange', function () { visible = !d.hidden; schedule(); });
    if (hasIO) new IntersectionObserver(function (es) { visible = es[0].isIntersecting && !d.hidden; schedule(); }, { threshold: 0.15 }).observe(reel);
    show(0);
    setPlay(playing);
  })();

  /* 1. Living backgrounds for the home hero and the inner page headers */
  var hero = d.querySelector('.lhero');
  if (hero) {
    hero.insertBefore(deco('div', 'ie-hfx',
      '<i class="grid"></i><i class="b b1"></i><i class="b b2"></i><i class="b b3"></i>' +
      '<i class="lf l1"></i><i class="lf l2"></i><i class="lf l3"></i><i class="lf l4"></i><i class="lf l5"></i>'), hero.firstChild);
  }
  var heads = d.querySelectorAll('.pagehead');
  for (var i = 0; i < heads.length; i++) {
    heads[i].insertBefore(deco('div', 'ie-phfx',
      '<i class="g1"></i><i class="g2"></i><i class="m1"></i><i class="m2"></i><i class="m3"></i>'), heads[i].firstChild);
  }

  /* Pause background loops while they are off screen (saves battery) */
  if (hasIO && !reduce) {
    var pio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('ie-paused', !e.isIntersecting); });
    });
    if (hero) pio.observe(hero);
    for (i = 0; i < heads.length; i++) pio.observe(heads[i]);
    d.addEventListener('visibilitychange', function () {
      root.classList.toggle('ie-hidden', d.hidden);
    });
  }

  /* 2. Pointer light on the hero tiles (desktop mouse only) */
  if (finePointer && !reduce) {
    var tiles = d.querySelectorAll('.ltile');
    Array.prototype.forEach.call(tiles, function (t) {
      var raf = 0, ev = null;
      t.addEventListener('pointermove', function (e) {
        ev = e;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var r = t.getBoundingClientRect();
          t.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
          t.style.setProperty('--my', (ev.clientY - r.top) + 'px');
        });
      });
      t.addEventListener('pointerenter', function () { t.classList.add('ie-lit'); });
      t.addEventListener('pointerleave', function () { t.classList.remove('ie-lit'); });
    });
  }

  /* 3. Scroll progress line */
  if (!reduce) {
    var bar = deco('div', 'ie-progress');
    d.body.appendChild(bar);
    var ticking = false;
    var upd = function () {
      ticking = false;
      var h = root.scrollHeight - root.clientHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, w.scrollY / h) : 0) + ')';
    };
    w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* 4. Decorative numbers: "01, 02 ..." on the feature cards, and step
        badges on step lists. Both are aria-hidden and count up when seen. */
  var counters = [];
  var groups = new Map();
  // The "01, 02 ..." numbers on feature cards were removed at the owner's request (2026-11-23).
  Array.prototype.forEach.call(d.querySelectorAll('main ol.applist'), function (ol) {
    var k = 0;
    Array.prototype.forEach.call(ol.children, function (li) {
      if (li.tagName !== 'LI' || li.querySelector('.tn') || li.children.length !== 1) return;
      k++;
      var b = deco('span', 'tn');
      b.textContent = '0';
      b.setAttribute('data-to', String(k));
      li.insertBefore(b, li.firstChild);
      li.classList.add('ie-step');
      counters.push(b);
    });
  });

  /* 5. Count-up for numbers already written in tables (fees, IELTS
        bands ...). The text ends exactly as it was written. */
  var numRe = /\d[\d,]*(?:\.\d+)?/g;
  function countable(tok) {
    var plain = tok.replace(/,/g, '');
    if (tok.indexOf(',') < 0 && /^\d{4}$/.test(plain) && +plain >= 1900 && +plain <= 2100) return false; // years
    if (tok.indexOf(',') < 0 && plain.replace('.', '').length > 6) return false; // phone-like runs
    return +plain > 0;
  }
  var textNodes = [];
  Array.prototype.forEach.call(d.querySelectorAll('main table td, main table th[scope="row"] + td'), function (cell) {
    if (cell.closest('form')) return;
    var tw = d.createTreeWalker(cell, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = tw.nextNode())) {
      var m = n.nodeValue.match(numRe);
      if (m && m.some(countable) && textNodes.indexOf(n) < 0) textNodes.push(n);
    }
  });

  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function fmt(val, tok) {
    var dec = (tok.split('.')[1] || '').length;
    var s = val.toFixed(dec);
    if (tok.indexOf(',') >= 0) {
      var parts = s.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      s = parts.join('.');
    }
    return s;
  }
  function runText(node) {
    var orig = node.nodeValue, host = node.parentNode;
    if (host && host.classList) host.classList.add('ie-counting');
    var dur = 1400, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), e = ease(p);
      node.nodeValue = p >= 1 ? orig : orig.replace(numRe, function (tok) {
        return countable(tok) ? fmt(+tok.replace(/,/g, '') * e, tok) : tok;
      });
      if (p < 1) requestAnimationFrame(step);
      else if (host && host.classList) host.classList.remove('ie-counting');
    }
    requestAnimationFrame(step);
  }
  function runDeco(el) {
    var to = +el.getAttribute('data-to'), pad = +(el.getAttribute('data-pad') || 1);
    var dur = 900 + to * 90, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var v = String(Math.round(to * ease(p)));
      while (v.length < pad) v = '0' + v;
      el.textContent = v;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function finishDeco(el) {
    var v = el.getAttribute('data-to'), pad = +(el.getAttribute('data-pad') || 1);
    while (v.length < pad) v = '0' + v;
    el.textContent = v;
  }

  if (reduce || !hasIO) {
    counters.forEach(finishDeco);
  } else {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        if (e.target.__ieText) e.target.__ieText.forEach(runText);
        else runDeco(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
    textNodes.forEach(function (n) {
      var cell = n.parentNode.closest('td,th') || n.parentNode;
      (cell.__ieText = cell.__ieText || []).push(n);
      if (cell.__ieText.length === 1) cio.observe(cell);
    });
  }

  /* 6. Scroll reveals */
  if (reduce || !hasIO) return;
  var sel = [
    'main .card', 'main .applist > li', 'main h2:not(.vh)', 'main .sub3', 'main .eyebrow',
    'main table', 'main .ticks > li', 'main .wplist > li', 'main details', 'main .morelinks',
    'main blockquote', 'main .split > *', 'main article > p', 'main article > h3', 'footer .wrap > *'
  ].join(',');
  var skip = '.lhero, .pagehead, dialog, .welpop, [hidden], .sub, nav';
  var items = [];
  Array.prototype.forEach.call(d.querySelectorAll(sel), function (el) {
    if (el.closest(skip)) return;
    if (el.parentNode && el.parentNode.closest && el.parentNode.closest('.ie-rv')) return; // parent already animates
    items.push(el);
  });
  var imgs = [];
  Array.prototype.forEach.call(d.querySelectorAll('main img'), function (im) {
    if (im.closest(skip) || im.closest('.ie-rv')) return;
    var wAttr = +(im.getAttribute('width') || 0);
    if (im.classList.contains('simg') || wAttr >= 400 || im.closest('figure')) imgs.push(im);
  });

  var sib = new Map();
  items.forEach(function (el) {
    var p = el.parentNode, k = sib.get(p) || 0;
    sib.set(p, k + 1);
    el.style.setProperty('--d', ((k % 6) * 0.08).toFixed(2) + 's');
    el.classList.add('ie-rv');
    if (/^H2$/.test(el.tagName)) el.classList.add('ie-rl');
    else if (el.classList.contains('card')) el.classList.add('ie-rz');
  });
  imgs.forEach(function (im) { im.classList.add('ie-rv-img'); });

  var rio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      (e.target.__ieImgs || []).forEach(function (im) { im.classList.add('is-in'); });
      rio.unobserve(e.target);
      // drop the stagger delay once shown so hover feels instant
      setTimeout(function () { e.target.style.removeProperty('--d'); }, 1600);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { rio.observe(el); });
  // a clipped image has no visible area, so watch its parent instead
  imgs.forEach(function (im) {
    var host = im.parentElement || im;
    (host.__ieImgs = host.__ieImgs || []).push(im);
    rio.observe(host);
  });

  // Anything opened later (FAQ answers, tabs) or skipped by the observer
  // must never stay hidden: reveal it on hash jumps and before printing.
  var showAll = function () { items.concat(imgs).forEach(function (el) { el.classList.add('is-in'); }); };
  w.addEventListener('beforeprint', showAll);
  w.addEventListener('hashchange', function () {
    var t = d.getElementById(location.hash.slice(1));
    if (t) Array.prototype.forEach.call(t.querySelectorAll('.ie-rv,.ie-rv-img'), function (el) { el.classList.add('is-in'); });
  });
})();
