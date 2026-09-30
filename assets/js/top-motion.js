/* =========================================================
   TOP  FV以下のモーション（top-motion.css とセット）
   top-v4.js のスクロールリビール（[data-v4-rv] → .is-in）に乗せて、
   ここでは次を足す：
     ・読み進めた量のバー
     ・メッセージセクションの登場
     ・写真のパララックス
     ・実績の数字のカウントアップ
     ・並び順に応じた遅延（--i）
     ・ボタンの光、淡い面の光の玉、SCOPEの光の粒
   「視差効果を減らす」設定では何もしない（すべて静止で表示）。
   ========================================================= */
(function () {
  'use strict';
  var body = document.body;
  if (!body || !body.classList.contains('top-v4')) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('t-motion');

  function $all(sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); }
  function once(els, cb, opt) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); }
      });
    }, opt || { rootMargin: '0px 0px -15% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* 1. 読み進めた量のバー */
  var bar = document.createElement('div');
  bar.className = 't-progress';
  bar.setAttribute('aria-hidden', 'true');
  body.appendChild(bar);

  /* 2. 並び順の遅延 */
  $all('.v3-scope__grid > li').forEach(function (el, i) { el.style.setProperty('--i', i); });
  $all('.t-flow__step').forEach(function (el, i) { el.style.setProperty('--i', i); });

  /* 3. メッセージ・比較表は自前で .is-in を付ける */
  once($all('.t-msg, .v3-table-wrap'), function (el) { el.classList.add('is-in'); });
  /* 窓は画面に入ったら開く */
  /* 窓は画面に入ったら開く。窓自体は閉じている間 clip-path で面積0になり
     IntersectionObserver が反応しないので、同じ位置に置いた透明の目印で判定する */
  $all('.t-hole').forEach(function (w) {
    var probe = document.createElement('span');
    probe.className = 't-window__probe';
    probe.setAttribute('aria-hidden', 'true');
    w.parentNode.insertBefore(probe, w);
    var sync = function () {
      probe.style.cssText = 'position:absolute;pointer-events:none;visibility:hidden;' +
        'left:' + w.offsetLeft + 'px;top:' + w.offsetTop + 'px;width:' + w.offsetWidth + 'px;height:' + w.offsetHeight + 'px';
    };
    sync(); addEventListener('resize', sync);
    once([probe], function () { w.classList.add('is-open'); }, { rootMargin: '0px 0px -15% 0px', threshold: 0.05 });
  });

  /* 4. 実績の数字（<b>の中の数字）をカウントアップ */
  function counter(b) {
    var node = null;
    for (var i = 0; i < b.childNodes.length; i++) {
      var n = b.childNodes[i];
      if (n.nodeType === 3 && /\d/.test(n.nodeValue)) { node = n; break; }
    }
    if (!node) return;
    var raw = node.nodeValue;
    var m = raw.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    var target = parseFloat(m[2].replace(/,/g, ''));
    var dec = (m[2].split('.')[1] || '').length;
    var grouped = m[2].indexOf(',') > -1;
    function render(v) {
      var s = dec ? v.toFixed(dec) : String(Math.round(v));
      if (grouped) s = Number(s).toLocaleString('en-US');
      node.nodeValue = m[1] + s + m[3];
    }
    render(0);
    return function () {
      var t0 = performance.now(), dur = 1300;
      (function step(t) {
        var p = Math.min(1, (t - t0) / dur);
        render(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(step); else node.nodeValue = raw;
      })(t0);
    };
  }
  var nums = $all('.v3-case__num b');
  var runs = new Map();
  nums.forEach(function (b) { var r = counter(b); if (r) runs.set(b, r); });
  once(nums.filter(function (b) { return runs.has(b); }), function (b) {
    setTimeout(runs.get(b), 350);
  }, { threshold: 0.6 });

  /* 5. ボタンに光を仕込む */
  $all('.btn--primary, .t-final__btn').forEach(function (b) {
    if (b.closest('.cwh')) return;               /* FVは白ボタンなので不要 */
    var s = document.createElement('span');
    s.className = 't-shine';
    s.setAttribute('aria-hidden', 'true');
    b.appendChild(s);
  });

  /* 6. 淡い面に光の玉、SCOPEに光の粒 */
  var lite = window.innerWidth < 720;
  [['.t-msg', [['-6%', '8%', 420, 20, ''], ['78%', '52%', 300, 24, 't-orb--b']]],
   ['.v3-cases', [['82%', '6%', 380, 22, ''], ['-8%', '58%', 320, 26, 't-orb--b']]],
   ['.t-flow', [['70%', '-4%', 340, 19, 't-orb--b']]]
  ].forEach(function (cfg) {
    var sec = document.querySelector(cfg[0]);
    if (!sec) return;
    cfg[1].forEach(function (o, i) {
      if (lite && i > 0) return;
      var d = document.createElement('span');
      d.className = 't-orb ' + o[4];
      d.setAttribute('aria-hidden', 'true');
      d.style.left = o[0]; d.style.top = o[1];
      d.style.setProperty('--s', (lite ? o[2] * 0.6 : o[2]) + 'px');
      d.style.setProperty('--t', o[3] + 's');
      sec.insertBefore(d, sec.firstChild);
    });
  });
  /* 光の粒：SCOPE と FV に同じものを敷く */
  function addDust(host, n, cls) {
    if (!host) return;
    var dust = document.createElement('div');
    dust.className = 't-dust' + (cls ? ' ' + cls : '');
    dust.setAttribute('aria-hidden', 'true');
    for (var k = 0; k < n; k++) {
      var p = document.createElement('i');
      p.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
      p.style.setProperty('--s', (2 + Math.random() * 4).toFixed(1) + 'px');
      p.style.setProperty('--t', (10 + Math.random() * 12).toFixed(1) + 's');
      p.style.setProperty('--d', (-Math.random() * 20).toFixed(1) + 's');
      dust.appendChild(p);
    }
    host.insertBefore(dust, host.firstChild);
    var setH = function () { dust.style.setProperty('--h', host.offsetHeight + 40 + 'px'); };
    setH(); addEventListener('resize', setH);
  }
  addDust(document.querySelector('.v3-scope'), lite ? 12 : 26);
  addDust(document.querySelector('.cwh'), lite ? 14 : 30, 't-dust--fv');

  /* FVの「Digital Marketing Company」を1文字ずつ出す */
  var brand = document.querySelector('.cwh__brandText');
  if (brand && !brand.dataset.split) {
    var txt = brand.textContent;
    brand.setAttribute('aria-label', txt);
    brand.innerHTML = txt.split('').map(function (ch, i) {
      return '<span aria-hidden="true" style="--c:' + i + '">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>';
    }).join('');
    brand.dataset.split = '1';
  }

  /* ISSUE の矢印：スクロール量に合わせて伸ばし、届いたら答えのカードを出す */
  var flow = document.querySelector('.t-msg__flow');
  var msg = document.querySelector('.t-msg');
  function updateFlow() {
    if (!flow || !msg) return;
    var r = flow.getBoundingClientRect(), vh = innerHeight;
    /* 矢印の上端が画面の90%に来たら描き始め、下端が画面の50%まで上がったら描き終わる */
    var p = (vh * 0.9 - r.top) / (vh * 0.4 + r.height);
    p = Math.max(0, Math.min(1, p));
    flow.style.setProperty('--draw', (1 - p).toFixed(4));
    if (p >= 0.98) msg.classList.add('is-arrived');
    else if (p < 0.6) msg.classList.remove('is-arrived');
  }

  /* 7. スクロール連動：バーと写真のパララックス */
  var imgs = [];   /* 実績の画像は見切れを防ぐため動かさない */
  var ticking = false;
  function update() {
    ticking = false;
    updateFlow();
    var de = document.documentElement;
    var y = window.pageYOffset || de.scrollTop || 0;
    var max = Math.max(1, de.scrollHeight - innerHeight);
    bar.style.setProperty('--p', Math.min(1, y / max).toFixed(4));
    var vh = innerHeight;
    imgs.forEach(function (img) {
      var r = img.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var c = (r.top + r.height / 2 - vh / 2) / vh;   /* 画面中央で0 */
      img.style.setProperty('--py', (c * -26).toFixed(1) + 'px');
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('scroll', onScroll, { passive: true, capture: true });
  addEventListener('resize', onScroll);
  update();
})();
