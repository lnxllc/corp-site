console.log("main.js active");

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
