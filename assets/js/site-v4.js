/* =========================================================
   LnX v4 — 下層ページ用のスクロールリビール
   TOP用の top-v4.js はヒーローの3Dロゴ制御まで抱えていて重いので、
   下層ページにはこの最小版だけを読み込む。

   IntersectionObserver ではなく、スクロールのたびに位置を見る方式にしている。
   IOはコールバックが非同期にまとめられるため、勢いよくスクロールされると
   通り過ぎた要素に印が付かず「中身が消えたまま」になることがある。
   本文が読めなくなる壊れ方なので、確実な方に振っている。

   ・<html> に .v4-rv が付いているときだけ CSS 側が初期状態を隠す
     → このJSが読めなくても中身は普通に見える
   ・load から6秒後には残りを全部出す（保険）
   ========================================================= */
(function () {
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 事例ページはHTMLを触らずに済ませたいので、対象をここで拾って印を付ける */
  var AUTO = {
    'case-v4':  '.lead-box, .result-card, .client-table, .client-info-table, .step-item, ' +
                '.voice-card, .case-img, .hl, .highlight-card, .kpi-tree, ' +
                '.article-faq__item, .article-cta, .article-author',
    'cases-v4': '.case-card, .cases-cta'
  };

  function autotag() {
    for (var k in AUTO) {
      if (!d.body.classList.contains(k)) continue;
      var els = d.querySelectorAll(AUTO[k]);
      for (var i = 0; i < els.length; i++) {
        els[i].setAttribute('data-v4-rv', '');
        els[i].setAttribute('data-v4-rv-stagger', '');
      }
    }
  }

  function start() {
    autotag();
    var items = [].slice.call(d.querySelectorAll('[data-v4-rv]'));
    if (!items.length) return;

    var showAll = function () {
      for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
      items.length = 0;
    };
    if (reduce) { showAll(); return; }

    root.classList.add('v4-rv');

    /* 同じ列に並ぶものは少しずつ遅らせて出す */
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      if (!el.hasAttribute('data-v4-rv-stagger') || !el.parentElement) continue;
      var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
      if (idx > 0) el.style.setProperty('--v4-d', Math.min(idx, 6) * 0.07 + 's');
    }

    var queued = false;
    function check() {
      queued = false;
      var vh = window.innerHeight || root.clientHeight;
      for (var i = items.length - 1; i >= 0; i--) {
        var r = items[i].getBoundingClientRect();
        /* 一度でも画面に触れた／通り過ぎたものは出す */
        if (r.top < vh * 0.92 && r.bottom > -vh * 0.5) {
          items[i].classList.add('is-in');
          items.splice(i, 1);
        } else if (r.bottom <= -vh * 0.5) {
          items[i].classList.add('is-in');
          items.splice(i, 1);
        }
      }
      if (!items.length) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    }
    function onScroll() {
      if (queued) return;
      queued = true;
      (window.requestAnimationFrame || setTimeout)(check);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();

    /* 保険：何かの理由で印が付かなかったぶんは6秒後に必ず出す */
    setTimeout(showAll, 6000);
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start);
  else start();
})();
