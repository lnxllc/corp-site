/* =========================================================
   BG-03 星座ネットワーク（LP設計辞典 v2.1 より・色をLnXの青系に変更）
   TOPヒーロー .cwh の背景。画面外では停止し、
   prefers-reduced-motion では静止画1枚だけ描く。
   ========================================================= */
/* Constellation — 回転する球体ネットワーク（Canvas 2D で3D投影）
   点を線で結び、金色の光が線をつたって移動する。マウスで傾く。
   使い方: BG_PATTERNS.constellation(document.getElementById('bg'))  → { stop() } */
(function () {
  var REG = (window.BG_PATTERNS = window.BG_PATTERNS || {});
  REG.constellation = function (host) {
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* LnX配色：左上の紺 → 右下の水色 */
    host.style.background = 'linear-gradient(135deg, #08205C 0%, #0F3A9E 34%, #1E6BFF 66%, #35C0F2 100%)';
    var stars = document.createElement('canvas'), c = document.createElement('canvas');
    stars.style.cssText = c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    host.appendChild(stars); host.appendChild(c);
    var sctx = stars.getContext('2d'), ctx = c.getContext('2d');

    var W, H, dpr, N, P, pairs, adj, pulses, cx, cy, R;
    function build() {
      N = W < 700 ? 150 : 240;
      P = [];
      for (var i = 0; i < N; i++) { // フィボナッチ球面で均等配置
        var y = 1 - 2 * (i + 0.5) / N, r = Math.sqrt(1 - y * y), th = i * 2.399963;
        P.push([Math.cos(th) * r, y, Math.sin(th) * r]);
      }
      var thr = 3.7 / Math.sqrt(N);
      pairs = []; adj = P.map(function () { return []; });
      for (var a = 0; a < N; a++) for (var b = a + 1; b < N; b++) {
        var dx = P[a][0] - P[b][0], dy = P[a][1] - P[b][1], dz = P[a][2] - P[b][2];
        if (dx * dx + dy * dy + dz * dz < thr * thr) { adj[a].push(b); adj[b].push(a); pairs.push(a, b); }
      }
      pulses = [];
      for (var k = 0; k < 16; k++) { var s = (Math.random() * N) | 0; pulses.push({ a: s, b: adj[s][0], u: Math.random(), v: 0.35 + Math.random() * 0.5 }); }
    }
    function paintStars() {
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.clearRect(0, 0, W, H);
      var n = Math.round(W * H / 5000);
      for (var i = 0; i < n; i++) {
        sctx.fillStyle = 'rgba(220,240,255,' + (0.1 + Math.random() * 0.4).toFixed(2) + ')';
        sctx.fillRect(Math.random() * W, Math.random() * H, Math.random() < 0.9 ? 1 : 1.6, Math.random() < 0.9 ? 1 : 1.6);
      }
    }
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight;
      c.width = stars.width = W * dpr; c.height = stars.height = H * dpr;
      var wide = W > 900;
      cx = wide ? W * 0.68 : W * 0.5; cy = wide ? H * 0.5 : H * 0.6;
      R = wide ? Math.min(W, H) * 0.36 : Math.min(W, H) * 0.44;
      build(); paintStars();
      if (reduce) draw(6);
    }
    var mouse = { x: 0, y: 0 }, sm = { x: 0, y: 0 };
    function onMove(e) { mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; }

    var X = [], Y = [], D = [];
    function draw(t) {
      sm.x += (mouse.x - sm.x) * 0.04; sm.y += (mouse.y - sm.y) * 0.04;
      var ry = t * 0.07 + sm.x * 0.6, rx = 0.38 + sm.y * 0.35;
      var cyy = Math.cos(ry), syy = Math.sin(ry), cxx = Math.cos(rx), sxx = Math.sin(rx), CAM = 3.2;
      for (var i = 0; i < N; i++) {
        var w = 1 + 0.035 * Math.sin(t * 0.9 + i * 1.7);
        var x = P[i][0] * w, y = P[i][1] * w, z = P[i][2] * w;
        var x1 = x * cyy + z * syy, z1 = -x * syy + z * cyy;
        var y1 = y * cxx - z1 * sxx, z2 = y * sxx + z1 * cxx;
        var s = CAM / (CAM - z2);
        X[i] = cx + x1 * R * s; Y[i] = cy + y1 * R * s; D[i] = (z2 + 1) / 2;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      for (var p = 0; p < pairs.length; p += 2) {
        var a = pairs[p], b = pairs[p + 1], d = (D[a] + D[b]) / 2;
        ctx.strokeStyle = 'rgba(170,225,255,' + (0.05 + 0.36 * d * d).toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(X[a], Y[a]); ctx.lineTo(X[b], Y[b]); ctx.stroke();
      }
      for (var j = 0; j < N; j++) {
        var dd = D[j];
        ctx.fillStyle = 'rgba(235,248,255,' + (0.2 + 0.8 * dd).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(X[j], Y[j], 0.6 + 1.7 * dd, 0, 6.283); ctx.fill();
      }
      for (var k = 0; k < pulses.length; k++) {
        var q = pulses[k];
        var px = X[q.a] + (X[q.b] - X[q.a]) * q.u, py = Y[q.a] + (Y[q.b] - Y[q.a]) * q.u;
        var pd = D[q.a] + (D[q.b] - D[q.a]) * q.u;
        ctx.fillStyle = 'rgba(53,192,242,' + (0.14 + 0.2 * pd).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(px, py, 7 * (0.5 + pd), 0, 6.283); ctx.fill();
        ctx.fillStyle = 'rgba(190,240,255,' + (0.5 + 0.5 * pd).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(px, py, 1.2 + 1.3 * pd, 0, 6.283); ctx.fill();
      }
    }
    function stepPulses(dt) {
      for (var k = 0; k < pulses.length; k++) {
        var q = pulses[k];
        q.u += q.v * dt;
        if (q.u >= 1) { // 到着したら隣の線へ乗り換える
          var nb = adj[q.b], next = nb[(Math.random() * nb.length) | 0];
          if (next === q.a && nb.length > 1) next = nb[(nb.indexOf(next) + 1) % nb.length];
          q.a = q.b; q.b = next; q.u = 0;
        }
      }
    }

    resize();
    addEventListener('resize', resize);
    addEventListener('pointermove', onMove);
    var raf = 0, last = performance.now(), t = 6;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      if (document.hidden) return;
      t += dt; stepPulses(dt); draw(t);
    }
    if (!reduce) raf = requestAnimationFrame(frame);
    return {
      stop: function () {
        cancelAnimationFrame(raf);
        removeEventListener('resize', resize);
        removeEventListener('pointermove', onMove);
        host.innerHTML = ''; host.style.background = '';
      }
    };
  };
})();

/* 起動：[data-bg="constellation"] を探し、画面に入っている間だけ動かす */
document.querySelectorAll('[data-bg="constellation"]').forEach(function (el) {
  var inst = null;
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting && !inst) inst = BG_PATTERNS.constellation(el);
      else if (!e.isIntersecting && inst) { inst.stop(); inst = null; }
    });
  }).observe(el);
});
