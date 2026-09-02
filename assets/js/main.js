console.log("main.js active");

/* =====================================================
 * LnX 流入経路トラッキング v1
 * -----------------------------------------------------
 * 全ページで読み込まれ、sessionStorageにサイト内の閲覧経路を保持する。
 * フォーム側は window.lnxTrack() を呼ぶだけで下記5項目を取得できる。
 *   lnx_landing : セッション最初に開いたページ（着地ページ）
 *   lnx_prev    : 直前に見ていたサイト内ページ
 *   lnx_ref     : 外部参照元URL（サイト外から来た場合）／(direct)
 *   lnx_dwell   : そのページの読み込みから送信までの秒数
 *   lnx_ua      : UserAgent
 * 表示・レイアウトには一切影響しない。
 * sessionStorageが使えない環境では黙ってスキップする（既存挙動を壊さない）。
 * ===================================================== */
(function () {
  "use strict";

  var KEY = "lnx_track_v1";
  var loadedAt = Date.now();

  function loadState() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || null; }
    catch (e) { return null; }
  }
  function saveState(o) {
    try { sessionStorage.setItem(KEY, JSON.stringify(o)); }
    catch (e) { /* プライベートモード等では保存できない。無視して続行 */ }
  }

  var MAX_PATH = 30; // 保持する閲覧ページ数の上限（sessionStorage肥大化の防止）

  var here = location.pathname + location.search;
  var st = loadState();

  if (!st) {
    // セッション最初のページ
    var ref = document.referrer || "";
    var isExternal = ref && ref.indexOf("//" + location.hostname) === -1;
    st = {
      landing: here,
      ref: isExternal ? ref : "(direct)",
      prev: "",
      last: here,
      path: [here]
    };
  } else if (st.last !== here) {
    // 2ページ目以降：直前ページと閲覧経路を更新
    st.prev = st.last;
    st.last = here;
    // 旧バージョンのセッション（pathを持たない）でも壊れないようガード
    st.path = (st.path || [st.prev]).concat(here).slice(-MAX_PATH);
  } else if (!st.path) {
    // リロード時など、pathだけ欠けている場合の補完
    st.path = [here];
  }
  saveState(st);

  window.lnxTrack = function () {
    return {
      lnx_landing: st.landing,
      lnx_prev: st.prev,
      lnx_ref: st.ref,
      lnx_path: (st.path || [here]).join(" > ").substring(0, 4000),
      lnx_dwell: String(Math.round((Date.now() - loadedAt) / 1000)),
      lnx_ua: navigator.userAgent
    };
  };
})();

window.addEventListener("load", function () {

  const btn = document.getElementById("js-hamburger");
  const drawer = document.getElementById("js-drawer");
  const overlay = document.getElementById("js-overlay");

  if (!btn || !drawer || !overlay) {
    console.error("Drawer elements missing");
    return;
  }

  function openMenu() {
    drawer.classList.add("is-open");
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    drawer.classList.remove("is-open");
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  // 既存イベントを完全に無視して上書き
  btn.onclick = function (e) {
    e.preventDefault();
    drawer.classList.contains("is-open") ? closeMenu() : openMenu();
  };

  overlay.onclick = closeMenu;

});
