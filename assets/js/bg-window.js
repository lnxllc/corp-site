/* =========================================================
   FV以降の「窓」：FVの球体（BG-03）を背景に固定し、窓の形に切り抜いて見せる
   .t-window（clip-path で切り抜く）の中に、画面全体に固定した .t-window__bg を置く。
   窓が画面に入っている間だけ球体を動かす（画面外では止める）。
   ========================================================= */
(function () {
  'use strict';
  if (!window.BG_PATTERNS || !BG_PATTERNS.constellation) return;
  var wins = [].slice.call(document.querySelectorAll('.t-window'));
  if (!wins.length || !('IntersectionObserver' in window)) return;
  wins.forEach(function (win) {
    var host = win.querySelector('.t-window__bg');
    if (!host) return;
    var inst = null;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !inst) inst = BG_PATTERNS.constellation(host);
        else if (!e.isIntersecting && inst) { inst.stop(); inst = null; }
      });
    }, { rootMargin: '120px 0px' }).observe(win);
  });
})();
