// 営業職転職支援 LP - script.js
// スライド式の転職診断フォーム（悩み選択→現状確認→連絡先→完了）を制御する

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('diagTrack');
  const viewport = document.getElementById('diagViewport');
  const bannerText = document.getElementById('diagBannerText');

  if (!track || !viewport) return; // 診断フォームが存在しないページでは何もしない

  const slides = Array.from(track.querySelectorAll('.diag-slide'));
  const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
  const numSlides = slides.length;

  const bannerMessages = {
    1: 'まずは、気になるテーマを教えてください',
    2: 'あなたの今の状況を教えてください',
    3: '最後に、ご連絡先を入力してください',
    4: 'ご送信ありがとうございました',
  };

  const answers = {};
  let currentStep = 1;

  function setViewportHeight() {
    const activeSlide = slides[currentStep - 1];
    if (activeSlide) {
      viewport.style.height = activeSlide.offsetHeight + 'px';
    }
  }

  function updateProgress(step) {
    progressSteps.forEach((el) => {
      const n = Number(el.dataset.step);
      el.classList.toggle('is-active', n === step);
      el.classList.toggle('is-done', n < step);
    });
  }

  function goTo(step) {
    if (step < 1 || step > numSlides) return;
    currentStep = step;
    const offset = (step - 1) * (100 / numSlides);
    track.style.transform = `translateX(-${offset}%)`;
    updateProgress(step);
    if (bannerText && bannerMessages[step]) {
      bannerText.textContent = bannerMessages[step];
    }
    // スライド高さの再計算はレイアウト確定後に行う
    requestAnimationFrame(setViewportHeight);
  }

  // 初期表示の高さをセット（画像やフォントの読み込み後にも再計測）
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('load', setViewportHeight);

  // ---------- STEP1：テーマ選択（クリックで自動的に次へ） ----------
  const optionCards = document.querySelectorAll('[data-slide="1"] .option-card');
  optionCards.forEach((card) => {
    card.addEventListener('click', () => {
      optionCards.forEach((c) => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      answers.theme = card.dataset.value;
      setTimeout(() => goTo(2), 350);
    });
  });

  // ---------- STEP2：チップ選択（経験年数・希望時期） ----------
  function setupChipGroup(groupName, onChange) {
    const chips = document.querySelectorAll(`[data-group="${groupName}"] .chip`);
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        answers[groupName] = chip.dataset.value;
        if (onChange) onChange();
      });
    });
  }

  const step2NextBtn = document.getElementById('step2NextBtn');

  function checkStep2Ready() {
    if (!step2NextBtn) return;
    step2NextBtn.disabled = !(answers.experience && answers.timing);
  }

  setupChipGroup('experience', checkStep2Ready);
  setupChipGroup('timing', checkStep2Ready);
  setupChipGroup('method'); // STEP3・任意項目のため次へボタンの制御なし

  if (step2NextBtn) {
    step2NextBtn.addEventListener('click', () => goTo(3));
  }

  // ---------- 戻るボタン（共通） ----------
  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => goTo(currentStep - 1));
  });

  // ---------- STEP3：連絡先フォーム送信 ----------
  const diagForm = document.getElementById('diagForm');
  if (diagForm) {
    diagForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!diagForm.checkValidity()) {
        diagForm.reportValidity();
        return;
      }
      const formData = new FormData(diagForm);
      answers.name = formData.get('name');
      answers.phone = formData.get('phone');
      answers.email = formData.get('email');
      // 実際の送信処理（API連携等）はここに実装してください
      goTo(4);
    });
  }
});
