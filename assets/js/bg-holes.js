/* =========================================================
   FV以降の「穴」：FVの球体（BG-03）を画面に固定した1枚のキャンバスに描き、
   ページ内に散らした .t-hole（不規則な多角形）の形の中だけを見せる。
   スクロールすると穴だけが動き、球体は画面に貼り付いたまま。
   穴が1つも画面に無いときは描画を省く。
   ========================================================= */
(function () {
  'use strict';
  var host = document.querySelector('.t-holes');
  if (!host || !window.BG_PATTERNS || !BG_PATTERNS.constellation) return;
  host.dataset.cx = '.5'; host.dataset.cy = '.5'; host.dataset.r = '.78';   /* 画面いっぱいに広げ、どの穴からも網目が見えるようにする */
  BG_PATTERNS.constellation(host);
})();
