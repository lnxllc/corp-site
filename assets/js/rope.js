/* =========================================================
   DEC-29 Rope — スクロールで描かれる紐ライン（LP設計辞典 v2.2 より）
   ========================================================= */
/* Rope — スクロールで描かれる紐ライン（SVG、ライブラリ不要）
   data-rope="reveal" … 画面の7割まで入ったら、一度だけ左から描く
   data-rope="scrub"  … スクロール量に合わせて伸び縮みする（戻ると縮む）
   使い方: initRopes()  ※スクロールする箱の中で使うときは initRopes(箱, 箱)
   戻り値は後片付け用の関数 */
(function () {
  function initRopes(scope, scroller) {
    scope = scope || document;
    scroller = scroller || window;
    var isWin = scroller === window;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var svgs = [].slice.call(scope.querySelectorAll('[data-rope]'));
    svgs.forEach(function (s) {
      [].forEach.call(s.querySelectorAll('path'), function (p) { p.setAttribute('pathLength', '1'); });
      if (reduce) s.classList.add('is-drawn');
    });
    if (reduce) return function () {};

    var reveal = svgs.filter(function (s) { return s.dataset.rope !== 'scrub'; });
    var scrub = svgs.filter(function (s) { return s.dataset.rope === 'scrub'; });

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-drawn'); io.unobserve(e.target); }
      });
    }, { root: isWin ? null : scroller, rootMargin: '0px 0px -30% 0px' });
    reveal.forEach(function (s) { io.observe(s); });

    var ticking = false;
    function update() {
      ticking = false;
      var top0 = isWin ? 0 : scroller.getBoundingClientRect().top;
      var vh = isWin ? innerHeight : scroller.clientHeight;
      scrub.forEach(function (s) {
        var r = s.getBoundingClientRect();
        var p = (vh * 0.9 - (r.top - top0)) / (r.height + vh * 0.45);
        p = Math.max(0, Math.min(1, p));
        s.style.setProperty('--draw', (1.05 * (1 - p)).toFixed(4));
      });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    scroller.addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
    return function () {
      io.disconnect();
      scroller.removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }
  window.initRopes = initRopes;
})();

/* 起動（ページ全体） */
initRopes();
