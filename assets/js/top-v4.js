/* =========================================================
   LnX TOP v4 — TOPページ専用モーション
   HTMLは触らずに、装飾属性の付与とスクロール演出だけを行う
   ========================================================= */
(function () {
  'use strict';

  var body = document.body;
  if (!body.classList.contains('top-v4')) return;

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. ヒーロー見出しを行ごとに包む ---------- */
  (function wrapHeroTitle() {
    var t = document.querySelector('.cwh__title');
    if (!t || t.dataset.v4Wrapped) return;
    var lines = t.innerHTML.split(/<br\s*\/?>/i);
    t.innerHTML = lines.map(function (l, i) {
      return '<span class="v4-line"><span style="--d:' + (0.08 + i * 0.11).toFixed(2) + 's">' +
             l.trim() + '</span></span>';
    }).join('');
    t.dataset.v4Wrapped = '1';
  })();

  requestAnimationFrame(function () { body.classList.add('is-ready'); });

  /* ---------- 1-a. 実測フレームレートで軽量モードに落とす ----------
     3Dロゴは20枚のレイヤーをGPUで合成する。GPUが効いていない環境
     （古い端末、ドライバ無効、リモートデスクトップ等）では重くなるので、
     読み込み直後に実測して 40fps を下回るなら回転と背景の動きを止める。
     見た目（立体の構え・太い曲線・波）はそのまま残る。 */
  (function autoLite() {
    var q = location.search;
    var debug = /[?&]v4debug=1/.test(q);

    /* URLで明示指定できる：?v4mode=lite / ?v4mode=full */
    if (/[?&]v4mode=lite/.test(q)) { body.classList.add('is-lite'); return; }
    if (/[?&]v4mode=full/.test(q)) { return; }
    if (reduce) { body.classList.add('is-lite'); return; }

    /* 読み込み直後はフォント適用・曲線の描画演出で必ず落ちるので、
       1.2秒待ってから1.5秒間だけ測る */
    setTimeout(function () {
      var frames = 0, slow = 0, start = null, prev = null;
      function tick(t) {
        if (start === null) { start = prev = t; requestAnimationFrame(tick); return; }
        frames++;
        if (t - prev > 32) slow++;      /* 30fpsを下回ったフレーム */
        prev = t;
        var el = t - start;
        if (el < 1500) { requestAnimationFrame(tick); return; }
        var fps = frames / (el / 1000);
        var slowRatio = frames ? slow / frames : 1;
        var lite = fps < 45 || slowRatio > 0.35;
        if (lite) body.classList.add('is-lite');
        if (debug) {
          console.log('[top-v4] 実測 ' + fps.toFixed(1) + 'fps / 遅いフレーム '
            + Math.round(slowRatio * 100) + '% → ' + (lite ? '軽量モード' : '通常モード')
            + '（?v4mode=full で強制解除できます）');
        }
      }
      requestAnimationFrame(tick);
    }, 1200);
  })();

  /* ---------- 1-b. ヒーローが画面外なら3D回転と波を止める ---------- */
  (function pauseWhenOffscreen() {
    var h = document.querySelector('.cwh');
    if (!h || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) {
      body.classList.toggle('is-hero-out', !es[0].isIntersecting);
    }, { threshold: 0 }).observe(h);
  })();

  /* ---------- 2. セクションに番号とウォーターマークを付与 ---------- */
  var sections = [].slice.call(document.querySelectorAll('.section'));
  var labelled = [];

  sections.forEach(function (sec) {
    var eb = sec.querySelector('.v3-eyebrow');
    if (!eb) return;
    var word = (eb.textContent || '').trim().toUpperCase().replace(/[^A-Z0-9 /]/g, '');
    if (!word) return;
    sec.setAttribute('data-v4-wm', word);
    labelled.push({ el: sec, label: word });
  });

  labelled.forEach(function (o, i) {
    o.no = ('0' + (i + 1)).slice(-2);
    o.el.setAttribute('data-v4-no', o.no);
  });

  /* ---------- 3. 右端のセクションインジケータ ---------- */
  var rail = null, railItems = [];
  if (labelled.length && window.innerWidth > 1080) {
    rail = document.createElement('nav');
    rail.className = 'v4-rail';
    rail.setAttribute('aria-hidden', 'true');
    labelled.forEach(function (o) {
      var a = document.createElement('a');
      a.className = 'v4-rail__i';
      a.innerHTML = '<span>' + o.label.split(' ')[0] + '</span><b>' + o.no + '</b><i></i>';
      rail.appendChild(a);
      railItems.push(a);
    });
    body.appendChild(rail);
  }

  /* ---------- 4. スクロールリビール ---------- */
  var revealSelectors = [
    '.section__head',
    '.v3-bubble',
    '.v3-solution',
    '.v3-scope__grid > li',
    '.v3-scope__note',
    '.v3-reason',
    '.v3-table-wrap',
    '.v3-case',
    '.v3-plan',
    '.t-flow__step',
    '.t-ceo__inner',
    '.t-faq__item',
    '.t-final__inner',
    '.section__cta'
  ];

  var groups = {};
  revealSelectors.forEach(function (sel) {
    [].slice.call(document.querySelectorAll(sel)).forEach(function (el) {
      el.setAttribute('data-v4-rv', '');
      var key = sel + '|' + (el.closest('.section') ? sections.indexOf(el.closest('.section')) : 'x');
      (groups[key] = groups[key] || []).push(el);
    });
  });
  Object.keys(groups).forEach(function (k) {
    groups[k].forEach(function (el, i) {
      el.style.setProperty('--v4-d', Math.min(i, 6) * 0.07 + 's');
    });
  });

  if (reduce || !('IntersectionObserver' in window)) {
    [].slice.call(document.querySelectorAll('[data-v4-rv]'))
      .forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var rvObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); rvObs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    [].slice.call(document.querySelectorAll('[data-v4-rv]'))
      .forEach(function (el) { rvObs.observe(el); });
  }

  /* ---------- 5. 実績数値のカウントアップ ---------- */
  function setupCounter(dd) {
    var node = null;
    for (var i = 0; i < dd.childNodes.length; i++) {
      var n = dd.childNodes[i];
      if (n.nodeType === 3 && /\d/.test(n.nodeValue)) { node = n; break; }
    }
    if (!node) return null;
    var raw = node.nodeValue;
    var m = raw.match(/([^\d]*)([\d,]+(?:\.\d+)?)(.*)/);
    if (!m) return null;
    var target = parseFloat(m[2].replace(/,/g, ''));
    var decimals = (m[2].split('.')[1] || '').length;
    var grouped = m[2].indexOf(',') > -1;
    function render(v) {
      var s = decimals ? v.toFixed(decimals) : String(Math.round(v));
      if (grouped) s = Number(s).toLocaleString('en-US');
      node.nodeValue = m[1] + s + m[3];
    }
    render(0);
    return function () {
      var t0 = performance.now(), dur = 1100;
      (function step(t) {
        var p = Math.min(1, (t - t0) / dur);
        render(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step); else render(target);
      })(t0);
    };
  }

  var stats = document.querySelector('.cwh__stats');
  if (stats && !reduce) {
    var runners = [].slice.call(stats.querySelectorAll('dd'))
      .map(setupCounter).filter(Boolean);
    if (runners.length) {
      if ('IntersectionObserver' in window) {
        var cObs = new IntersectionObserver(function (es) {
          if (es[0].isIntersecting) {
            runners.forEach(function (r, i) { setTimeout(r, i * 140); });
            cObs.disconnect();
          }
        }, { threshold: 0.4 });
        cObs.observe(stats);
      } else {
        runners.forEach(function (r) { r(); });
      }
    }
  }

  /* ---------- 6. スクロール連動（パララックス／ヘッダー／レール） ---------- */
  var mark = document.querySelector('.cwh__stage');
  var hero = document.querySelector('.cwh');
  var ticking = false;

  /* スクロール量。body がスクロールコンテナ化していても正しく取れる方法で測る */
  function scrollY() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (!y) {
      var r = document.body.getBoundingClientRect();
      var m = parseFloat(getComputedStyle(document.body).marginTop) || 0;
      y = Math.max(0, -(r.top - m));
    }
    return y;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = scrollY();

      body.classList.toggle('is-scrolled', y > 80);

      /* 最終CTA以降ではレールを引っ込める */
      var last = document.querySelector('.t-final');
      if (last) {
        body.classList.toggle('is-bottom',
          last.getBoundingClientRect().top < window.innerHeight * 0.75);
      }

      if (mark && hero && !reduce) {
        var h = hero.offsetHeight || 1;
        var p = Math.max(0, Math.min(1, y / h));
        mark.style.setProperty('--v4-mark-y', (p * 74).toFixed(1) + 'px');
      }

      if (!reduce) {
        var vh = window.innerHeight;
        labelled.forEach(function (o) {
          var r = o.el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          var prog = (vh - r.top) / (vh + r.height);   /* 0→1 */
          o.el.style.setProperty('--v4-wm-shift', ((prog - 0.5) * -130).toFixed(1) + 'px');
        });
      }

      if (railItems.length) {
        var best = -1, bestD = Infinity, mid = window.innerHeight * 0.42;
        labelled.forEach(function (o, i) {
          var r = o.el.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) { best = i; bestD = 0; return; }
          var d = Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
          if (d < bestD) { bestD = d; best = i; }
        });
        railItems.forEach(function (a, i) { a.classList.toggle('is-on', i === best); });
      }

      ticking = false;
    });
  }

  /* 横スクロールが発生していないかの自己診断（?v4debug=1 のときだけ） */
  if (/[?&]v4debug=1/.test(location.search)) {
    setTimeout(function () {
      var de = document.documentElement;
      if (de.scrollWidth > de.clientWidth + 1) {
        console.warn('[top-v4] 横スクロールが発生しています', de.scrollWidth, de.clientWidth);
      }
    }, 800);
  }

  /* body がスクロールコンテナのときは scroll が window まで上がってこないので
     document でキャプチャして拾う */
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- 7. 3Dロゴのマウス追従（PCのみ） ---------- */
  if (mark && !reduce && window.matchMedia('(hover:hover)').matches) {
    var mw = document.querySelector('.cwh');
    mw.addEventListener('mousemove', function (e) {
      var r = mw.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5;
      var ny = (e.clientY - r.top) / r.height - 0.5;
      mark.style.setProperty('--v4-mx', (nx * 18).toFixed(1) + 'px');
      mark.style.setProperty('--v4-my', (ny * 14).toFixed(1) + 'px');
    });
    mw.addEventListener('mouseleave', function () {
      mark.style.setProperty('--v4-mx', '0px');
      mark.style.setProperty('--v4-my', '0px');
    });
  }
})();
