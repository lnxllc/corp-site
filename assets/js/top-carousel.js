/* TOP：支援実績の横カルーセル */
(function(){
  document.querySelectorAll('[data-nx3-car]').forEach(function(car){
    var tr=car.querySelector('.nx3-car__track'), dots=car.querySelector('.nx3-car__dots');
    var cards=[].slice.call(tr.children);
    cards.forEach(function(c,i){c.classList.add('is-in');var d=document.createElement('span');dots.appendChild(d);});
    function step(){return cards[0].getBoundingClientRect().width+18;}
    function upd(){var i=Math.round(tr.scrollLeft/step());[].forEach.call(dots.children,function(d,j){d.classList.toggle('on',j===i);});
      car.querySelector('[data-dir="-1"]').disabled=tr.scrollLeft<4;
      car.querySelector('[data-dir="1"]').disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4;}
    car.querySelectorAll('.nx3-car__btn').forEach(function(b){b.addEventListener('click',function(){tr.scrollBy({left:step()*(+b.dataset.dir),behavior:'smooth'});});});
    tr.addEventListener('scroll',function(){window.requestAnimationFrame(upd);},{passive:true});
    upd();
  });
})();

/* TOP：費用比較グラフ（スクロール到達で棒が伸び、数字がカウントアップ） */
(function(){
  var charts=document.querySelectorAll('[data-nx6]');
  if(!charts.length||!('IntersectionObserver' in window))return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function count(el,delay,dur){
    var to=parseFloat(el.getAttribute('data-to')),dec=(el.getAttribute('data-to').split('.')[1]||'').length;
    el.textContent=(0).toFixed(dec);
    setTimeout(function(){
      var t0=null;
      function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=(to*e).toFixed(dec);if(p<1)requestAnimationFrame(f);}
      requestAnimationFrame(f);
    },delay);
  }
  charts.forEach(function(c){
    if(reduce)return;
    c.classList.add('is-armed');
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting)return;
        io.disconnect();
        c.classList.add('is-on');
        var v=c.querySelectorAll('[data-to]');
        count(v[0],300,900); count(v[1],1750,900); count(v[2],1000,600);
      });
    },{threshold:.45});
    io.observe(c);
  });
})();
