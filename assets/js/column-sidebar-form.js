/* =====================================================
 * コラム記事のサイドバー（PC版の右カラム）にお問い合わせフォームを差し込む。
 * - 送信先・送信項目は contact.html と同じ（同じGAS → 同じスプレッドシート）
 * - お問い合わせ項目は contact.html のラジオボタンと同じ7項目をプルダウンで出す
 * - 流入経路は main.js の window.lnxTrack() をそのまま付与する
 * - .article-sidebar が無いページでは何もしない
 * ===================================================== */
(function () {
  "use strict";
  var GAS_URL = "https://script.google.com/macros/s/AKfycbw0or8jZLXeW_LpvchfWFFPoYUU6_8bYURq-wfvP2JuOFb0AJdl33Xz4DmsWwI0ZBxH/exec";
  var HEARD = ["ランサーズ", "検索（Google・Yahoo!など）", "AI（ChatGPT・Geminiなど）", "SNS", "知人・取引先の紹介", "その他"];
  var ITEMS = [
    "集客全般の相談",
    "広告運用代行のお問い合わせ／資料請求",
    "広告運用に関するお問い合わせ",
    "SNS運用に関するお問い合わせ",
    "制作に関するお問い合わせ",
    "AIに関するお問い合わせ",
    "その他"
  ];

  // 見ている記事のカテゴリ（/column/<カテゴリ>/<記事>/）から、問い合わせ項目の初期値を決める。
  // SEO・Webマーケ・分析カテゴリのうち、AIO・LLMO・GEO・AIの記事は「AI」を選ぶ。どれにも当たらなければ未選択のまま。
  function defaultItem() {
    var m = location.pathname.match(/\/column\/([^\/]+)\/([^\/]+)/);
    if (!m) return "";
    var cat = m[1], slug = m[2];
    if (cat === "ai-katsuyo") return "AIに関するお問い合わせ";
    if (/^(seo|web-marketing|analytics)$/.test(cat) && /(^|-)(aio|llmo|geo|ai)(-|$)/.test(slug)) return "AIに関するお問い合わせ";
    var map = {
      "advertising": "広告運用に関するお問い合わせ",
      "sns-marketing": "SNS運用に関するお問い合わせ",
      "lp-improvement": "制作に関するお問い合わせ",
      "seo": "集客全般の相談",
      "web-marketing": "集客全般の相談",
      "analytics": "集客全般の相談"
    };
    return map[cat] || "";
  }

  function init() {
    var aside = document.querySelector(".article-sidebar");
    if (!aside || document.getElementById("sbcForm")) return;

    // CSSはこのJSと同じ階層の ../css/ から読み込む
    var me = document.querySelector('script[src*="column-sidebar-form.js"]');
    if (me) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = me.src.replace(/js\/column-sidebar-form\.js.*$/, "css/column-sidebar-form.css?v=3");
      document.head.appendChild(link);
    }
    var root = me ? me.src.replace(/assets\/js\/column-sidebar-form\.js.*$/, "") : "/";

    var def = defaultItem();
    var opts = '<option value="" disabled' + (def ? "" : " selected") + '>選択してください</option>' +
      ITEMS.map(function (t) { return "<option" + (t === def ? " selected" : "") + ">" + t + "</option>"; }).join("");

    var box = document.createElement("div");
    box.className = "sbc";
    box.innerHTML =
      '<div class="sbc__head"><p class="sbc__title">無料相談・お問い合わせ</p>' +
      '<p class="sbc__lead">相談無料／1営業日以内にご返信します</p></div>' +
      '<form class="sbc__form" id="sbcForm" novalidate>' +
        '<div class="sbc__field"><label class="sbc__label" for="sbcName">お名前<span class="sbc__req">必須</span></label>' +
          '<input id="sbcName" name="name" type="text" placeholder="山田 太郎" autocomplete="name" required></div>' +
        '<div class="sbc__field"><label class="sbc__label" for="sbcEmail">メールアドレス<span class="sbc__req">必須</span></label>' +
          '<input id="sbcEmail" name="email" type="email" placeholder="example@gmail.com" autocomplete="email" required></div>' +
        '<div class="sbc__field"><label class="sbc__label" for="sbcType">お問い合わせ項目<span class="sbc__req">必須</span></label>' +
          '<select id="sbcType" name="inquiry_type" required>' + opts + "</select></div>" +
        '<div class="sbc__field"><label class="sbc__label" for="sbcMsg">お問い合わせ内容<span class="sbc__req">必須</span></label>' +
          '<textarea id="sbcMsg" name="message" placeholder="お問い合わせ内容をご記入ください" required></textarea></div>' +
        '<div class="sbc__field"><label class="sbc__label" for="sbcHeard">どちらでLnXを知りましたか（任意）</label>' +
          '<select id="sbcHeard" name="heard_from"><option value="">選択してください</option>' + HEARD.map(function (t) { return "<option>" + t + "</option>"; }).join("") + "</select></div>" +
        '<input type="text" name="website" id="sbcHp" class="sbc__hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<button type="submit" class="sbc__btn" id="sbcSubmit">送信する</button>' +
        '<p class="sbc__status" id="sbcStatus" role="status"></p>' +
        '<p class="sbc__note">送信内容は<a href="' + root + 'privacy.html">プライバシーポリシー</a>に沿って取り扱います。</p>' +
      "</form>";
    aside.appendChild(box);

    var form = box.querySelector("#sbcForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var btn = form.querySelector("#sbcSubmit");
      var status = form.querySelector("#sbcStatus");
      var type = form.querySelector("#sbcType").value;
      var data = new URLSearchParams({
        form_type: "contact",
        name: form.querySelector("#sbcName").value.trim(),
        email: form.querySelector("#sbcEmail").value.trim(),
        inquiry_type: type,
        message: form.querySelector("#sbcMsg").value.trim(),
        heard_from: form.querySelector("#sbcHeard").value,
        website: form.querySelector("#sbcHp").value
      });
      var trk = (typeof window.lnxTrack === "function") ? window.lnxTrack() : {};
      Object.keys(trk).forEach(function (k) { data.append(k, trk[k]); });

      btn.disabled = true;
      btn.textContent = "送信中…";
      fetch(GAS_URL, { method: "POST", mode: "no-cors", body: data })
        .then(function () {
          btn.textContent = "送信済み ✓";
          status.style.color = "#16a34a";
          status.textContent = "お問い合わせを受け付けました。担当より折り返しご連絡いたします。";
          status.style.display = "block";
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "contact_form_submit",
            form_name: "column_sidebar_form",
            inquiry_type: type
          });
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = "送信する";
          status.style.color = "#dc2626";
          status.textContent = "送信に失敗しました。通信環境をご確認のうえ、もう一度お試しください。";
          status.style.display = "block";
        });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
