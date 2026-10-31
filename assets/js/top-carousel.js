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
