
/* mobile hamburger nav — toggle the collapsed menu; close on link click or outside tap */
(function(){
  var nav=document.querySelector('.nav'); if(!nav)return;
  var burger=nav.querySelector('.nav__burger'), menu=nav.querySelector('.nav__menu');
  if(!burger||!menu)return;
  function setOpen(o){ nav.classList.toggle('nav--open',o); burger.setAttribute('aria-expanded',o?'true':'false'); }
  burger.addEventListener('click',function(e){ e.stopPropagation(); setOpen(!nav.classList.contains('nav--open')); });
  menu.addEventListener('click',function(e){ if(e.target.closest('a')) setOpen(false); });
  document.addEventListener('click',function(e){ if(nav.classList.contains('nav--open') && !nav.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') setOpen(false); });
})();
/* vertical pipeline — single-open accordion; a second click on an open row deep-links to the program */
(function(){
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.pl__row'); if(!btn)return;
    var group=btn.closest('.pl'); if(!group)return;
    var wasOpen=btn.getAttribute('aria-expanded')==='true';
    var panel=document.getElementById(btn.getAttribute('aria-controls'));
    /* already open → jump to the full program in Products instead of collapsing */
    if(wasOpen){
      var link=panel&&panel.querySelector('.pl__link');
      if(link){ link.click(); return; }
    }
    /* otherwise behave as a single-open accordion: close all, open the clicked one */
    [].forEach.call(group.querySelectorAll('.pl__row'),function(b){
      b.setAttribute('aria-expanded','false');
      var p=document.getElementById(b.getAttribute('aria-controls'));
      if(p)p.setAttribute('hidden','');
    });
    btn.setAttribute('aria-expanded','true');
    if(panel)panel.removeAttribute('hidden');
  });
})();
/* pipeline search + facet filter */
(function(){
  var pl=document.getElementById('mx-pl'); if(!pl)return;
  var bar=document.querySelector('.plf'); if(!bar)return;
  var items=[].slice.call(pl.querySelectorAll('.pl__item'));
  var q=bar.querySelector('#plf-q');
  var pills=[].slice.call(bar.querySelectorAll('.plf__pill'));
  var countEl=bar.querySelector('.plf__count');
  var resets=[].slice.call(document.querySelectorAll('.plf__reset'));
  var empty=document.querySelector('.plf__empty');
  function sel(kind){return pills.filter(function(p){return p.getAttribute('data-filter')===kind && p.getAttribute('aria-pressed')==='true';}).map(function(p){return p.getAttribute('data-val');});}
  function apply(){
    var term=(q&&q.value||'').trim().toLowerCase();
    var st=sel('stage'), ar=sel('area'), shown=0;
    items.forEach(function(it){
      var ok=true;
      if(term && it.getAttribute('data-text').indexOf(term)===-1) ok=false;
      if(ok && st.length && st.indexOf(it.getAttribute('data-stage'))===-1) ok=false;
      if(ok && ar.length && ar.indexOf(it.getAttribute('data-area'))===-1) ok=false;
      if(ok){it.removeAttribute('hidden');shown++;}else{it.setAttribute('hidden','');}
    });
    if(countEl)countEl.textContent='Showing '+shown+' of '+items.length;
    if(empty)empty.hidden=(shown!==0);
    var active=!!term||st.length||ar.length;
    resets.forEach(function(r){r.hidden=!active;});
  }
  if(q)q.addEventListener('input',apply);
  pills.forEach(function(p){p.addEventListener('click',function(){p.setAttribute('aria-pressed',p.getAttribute('aria-pressed')==='true'?'false':'true');apply();});});
  resets.forEach(function(r){r.addEventListener('click',function(){if(q)q.value='';pills.forEach(function(p){p.setAttribute('aria-pressed','false');});apply();});});
})();
(function(){var open=null;
 function close(){if(open){open.pop.removeAttribute('data-open');open.btn.setAttribute('aria-expanded','false');open=null;}}
 document.addEventListener('click',function(e){var b=e.target.closest('.gloss');
   if(b){e.preventDefault();var pop=b.parentNode.querySelector('.gloss-pop');
     if(open&&open.btn===b){close();return;}close();
     if(pop){pop.setAttribute('data-open','');b.setAttribute('aria-expanded','true');open={btn:b,pop:pop};}return;}
   if(open&&!e.target.closest('.gloss-pop'))close();});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});})();


(function(){var els=[].slice.call(document.querySelectorAll('.reveal'));function showAll(){els.forEach(function(e){e.classList.add('is-in');});}if(!('IntersectionObserver' in window)){showAll();return;}var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.06});els.forEach(function(e){io.observe(e);});setTimeout(function(){if(!document.querySelector('.reveal.is-in'))showAll();},500);})();

(function(){
  if(window.__zoomInit) return; window.__zoomInit=true;
  function build(){
    var ov=document.createElement('div'); ov.id='__zoom';
    var img=document.createElement('img'); img.className='__z-img'; img.alt='';
    var close=document.createElement('button'); close.className='__z-close'; close.type='button'; close.setAttribute('aria-label','Close'); close.textContent='✕';
    var hint=document.createElement('div'); hint.className='__z-hint'; hint.textContent='Tap image to zoom · tap outside to close';
    ov.appendChild(img); ov.appendChild(close); ov.appendChild(hint); document.body.appendChild(ov);
    function open(src,alt){ img.src=src; img.alt=alt||''; ov.classList.remove('zoomed'); ov.classList.add('open'); ov.scrollTop=0; ov.scrollLeft=0; document.documentElement.style.overflow='hidden'; }
    function shut(){ ov.classList.remove('open','zoomed'); img.removeAttribute('src'); document.documentElement.style.overflow=''; }
    close.addEventListener('click', function(e){ e.stopPropagation(); shut(); });
    ov.addEventListener('click', function(e){ if(e.target===img){ ov.classList.toggle('zoomed'); ov.scrollTop=0; ov.scrollLeft=0; } else { shut(); } });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && ov.classList.contains('open')) shut(); });
    document.addEventListener('click', function(e){
      var t=e.target && e.target.closest && e.target.closest('.figure img');
      if(t){ e.preventDefault(); open(t.currentSrc||t.src, t.alt); }
    });
  }
  if(document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();

(function(){try{
(function(){
  var root = document.getElementById('mx-frontierkit');
  if(!root) return;

  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduce = mq ? mq.matches : false;

  var hero    = root.querySelector('.fk-hero');
  var canvas  = root.querySelector('.fk-hero-canvas');
  var btn     = root.querySelector('.fk-motion');
  var btnT    = root.querySelector('.fk-motion-t');
  var platform= root.querySelector('.fk-platform');
  var ctx     = canvas ? canvas.getContext('2d') : null;

  /* --- resolve token colours (consumed via var(), read from computed style) --- */
  var cs = getComputedStyle(root);
  function toRgb(name){
    var h = cs.getPropertyValue(name).trim().replace('#','');
    if(h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var n = parseInt(h,16);
    if(isNaN(n)) return [16,181,151];
    return [(n>>16)&255,(n>>8)&255,n&255];
  }
  var cAccent  = toRgb('--accent');
  var cAccent2 = toRgb('--accent-2');
  var cAmber   = toRgb('--amber');

  var dpr = 1;
  var W = 0, H = 0, MIN = 1;
  var cells = [], parts = [];
  var running = false, paused = reduce, raf = 0, last = 0, visible = false;

  function rnd(a,b){ return a + Math.random()*(b-a); }

  function initField(){
    cells = []; parts = [];
    var pal = [cAccent, cAccent2, cAccent, cAccent2, cAccent, cAccent];
    for(var i=0;i<6;i++){
      cells.push({
        x:rnd(.10,.90), y:rnd(.10,.90),
        r:rnd(.15,.28), vx:rnd(-.012,.012), vy:rnd(-.010,.010),
        col:pal[i], a:rnd(.09,.17), ph:rnd(0,6.283)
      });
    }
    for(var j=0;j<16;j++){
      parts.push({
        x:rnd(.05,.95), y:rnd(.05,.95),
        vx:rnd(-.028,.028), vy:rnd(-.028,.028), r:rnd(1.3,2.6)
      });
    }
  }

  function resize(){
    if(!ctx || !hero) return;
    // recompute DPR each time so the canvas stays crisp across zoom / monitor changes
    dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    var w = hero.clientWidth || 1, h = hero.clientHeight || 1;
    W = w; H = h; MIN = Math.min(w,h);
    canvas.width  = Math.round(w*dpr);
    canvas.height = Math.round(h*dpr);
    canvas.style.width  = w+'px';
    canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    if(!running) render(0);
  }

  function moveDot(p, dt, sp){
    p.x += p.vx*dt*sp; p.y += p.vy*dt*sp;
    if(p.x < .02){ p.x = .02; p.vx = Math.abs(p.vx); }
    if(p.x > .98){ p.x = .98; p.vx = -Math.abs(p.vx); }
    if(p.y < .02){ p.y = .02; p.vy = Math.abs(p.vy); }
    if(p.y > .98){ p.y = .98; p.vy = -Math.abs(p.vy); }
  }

  function update(dt){
    var i;
    for(i=0;i<cells.length;i++) moveDot(cells[i], dt, 1);
    for(i=0;i<parts.length;i++) moveDot(parts[i], dt, 1);
  }

  function render(time){
    if(!ctx) return;
    ctx.clearRect(0,0,W,H);

    // soft living cells
    var i;
    for(i=0;i<cells.length;i++){
      var c = cells[i];
      var px = c.x*W, py = c.y*H;
      var pr = c.r*MIN*(1 + 0.06*Math.sin(time*0.4 + c.ph));
      if(pr <= 0) continue;
      var g = ctx.createRadialGradient(px,py,0,px,py,pr);
      var col = c.col;
      g.addColorStop(0,'rgba('+col[0]+','+col[1]+','+col[2]+','+c.a+')');
      g.addColorStop(1,'rgba('+col[0]+','+col[1]+','+col[2]+',0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(px,py,pr,0,6.2832); ctx.fill();
    }

    // faint connective filaments
    var TH = 0.18;
    ctx.lineWidth = 1;
    for(i=0;i<parts.length;i++){
      for(var j=i+1;j<parts.length;j++){
        var dx = parts[i].x - parts[j].x, dy = parts[i].y - parts[j].y;
        var d = Math.sqrt(dx*dx + dy*dy);
        if(d < TH){
          var a = (1 - d/TH) * 0.16;
          ctx.strokeStyle = 'rgba('+cAmber[0]+','+cAmber[1]+','+cAmber[2]+','+a+')';
          ctx.beginPath();
          ctx.moveTo(parts[i].x*W, parts[i].y*H);
          ctx.lineTo(parts[j].x*W, parts[j].y*H);
          ctx.stroke();
        }
      }
    }

    // magnetic amber particles
    for(i=0;i<parts.length;i++){
      var p = parts[i], ppx = p.x*W, ppy = p.y*H;
      var gg = ctx.createRadialGradient(ppx,ppy,0,ppx,ppy,p.r*3.4);
      gg.addColorStop(0,'rgba('+cAmber[0]+','+cAmber[1]+','+cAmber[2]+',0.55)');
      gg.addColorStop(1,'rgba('+cAmber[0]+','+cAmber[1]+','+cAmber[2]+',0)');
      ctx.fillStyle = gg;
      ctx.beginPath(); ctx.arc(ppx,ppy,p.r*3.4,0,6.2832); ctx.fill();
      ctx.fillStyle = 'rgba('+cAmber[0]+','+cAmber[1]+','+cAmber[2]+',0.85)';
      ctx.beginPath(); ctx.arc(ppx,ppy,p.r,0,6.2832); ctx.fill();
    }
  }

  function step(t){
    if(!running) return;
    if(!last) last = t;
    var dt = Math.min(0.05, (t - last)/1000);
    last = t;
    update(dt);
    render(t/1000);
    raf = requestAnimationFrame(step);
  }

  function start(){
    if(running || paused || !visible || !ctx) return;
    running = true; last = 0;
    raf = requestAnimationFrame(step);
  }
  function stop(){
    running = false;
    if(raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function setPaused(p){
    paused = p;
    if(btn){
      btn.setAttribute('aria-pressed', p ? 'true' : 'false');
      btn.setAttribute('aria-label', p ? 'Play background motion' : 'Pause background motion');
      if(btnT) btnT.textContent = p ? 'Play motion' : 'Pause motion';
    }
    if(p){ stop(); render(0); }
    else { start(); }
  }

  /* --- reveal wiring: base is final/visible; only opt into motion if allowed --- */
  if(!reduce) root.classList.add('fk-reveal');
  function finishReveal(){ root.classList.add('fk-in'); }
  // fallback guarantee: reach final state even if the observer never fires
  var revealFallback = setTimeout(finishReveal, 1400);

  initField();

  /* IntersectionObserver: drive canvas visibility + one-shot reveal */
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.target === hero){
          visible = e.isIntersecting;
          if(visible){ resize(); start(); }
          else { stop(); }
        }
        if(e.target === platform && e.isIntersecting){
          clearTimeout(revealFallback);
          finishReveal();
          io.unobserve(platform);
        }
      });
    }, { threshold: 0.08 });
    if(hero) io.observe(hero);
    if(platform) io.observe(platform);
  } else {
    visible = true;
    clearTimeout(revealFallback);
    finishReveal();
    resize(); start();
  }

  /* ResizeObserver: keep canvas crisp + sized when it becomes visible */
  if('ResizeObserver' in window && hero){
    var ro = new ResizeObserver(function(){ resize(); });
    ro.observe(hero);
  }

  if(btn){
    btn.addEventListener('click', function(){ setPaused(!paused); });
  }

  // sync initial UI state (paused when reduced-motion)
  setPaused(paused);
  resize();
})();
}catch(e){console.error('mx-frontierkit',e);}})();
(function(){try{
(function(){
  var root = document.getElementById('mx-evidence-timeline');
  if(!root) return;
  var nodes = root.querySelectorAll('.mx-et-node');
  if(!nodes.length) return;

  function settle(){
    for(var i=0;i<nodes.length;i++){ nodes[i].classList.add('is-in'); }
  }

  var reduce = false;
  try{
    reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }catch(e){}

  // Reduced motion or no observer support: leave content in its default,
  // fully-visible state (no anim class is ever added). Nothing to do.
  if(reduce || typeof IntersectionObserver === 'undefined'){
    return;
  }

  // Progressive enhancement: only now do we hide the nodes so they can
  // animate in. If this line never runs (JS error/absent), content stays visible.
  root.classList.add('mx-et-anim');

  var done = false;
  function finish(obs){
    if(done) return;
    done = true;
    if(obs){ try{ obs.disconnect(); }catch(e){} }
    settle();
  }

  var io = new IntersectionObserver(function(entries, obs){
    for(var i=0;i<entries.length;i++){
      if(entries[i].isIntersecting){ finish(obs); break; }
    }
  }, { threshold:0.12 });
  io.observe(root);

  // Safety net: guarantee the final visible state even if the observer never
  // fires — e.g. revealed inside a display:none tab that was already scrolled
  // into view, so the element reports zero intersection.
  setTimeout(function(){ finish(io); }, 2400);
})();
}catch(e){console.error('mx-evidence-timeline',e);}})();
(function(){try{
var root=document.getElementById('mx-kpi');if(!root)return;var nums=[].slice.call(root.querySelectorAll('.mxk-num'));var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;var done=false;function setFinal(){nums.forEach(function(el){el.textContent=el.getAttribute('data-target');});}function run(){if(done)return;done=true;if(reduce){setFinal();return;}nums.forEach(function(el){var to=parseInt(el.getAttribute('data-target'),10)||0,dur=1100,start=null;function step(ts){if(start===null)start=ts;var p=Math.min((ts-start)/dur,1);var e=1-Math.pow(1-p,3);el.textContent=String(Math.round(to*e));if(p<1){requestAnimationFrame(step);}else{el.textContent=el.getAttribute('data-target');}}requestAnimationFrame(step);});setTimeout(setFinal,1500);}if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){for(var i=0;i<en.length;i++){if(en[i].isIntersecting){run();io.disconnect();break;}}},{threshold:.01});io.observe(root);}else{run();}
}catch(e){console.error('mx-kpi',e);}})();
(function(){try{

var root=document.getElementById('mx-duration'); if(!root) return;
var wrap=root.querySelector('.mxdur'); if(wrap) wrap.classList.add('mxdur-js');
var tabs=[].slice.call(root.querySelectorAll('.mxdur-t'));
var pans=[].slice.call(root.querySelectorAll('.mxdur-p'));
function sel(i,focus){
  tabs.forEach(function(t,n){
    var on=n===i;
    t.setAttribute('aria-selected',on?'true':'false');
    t.tabIndex=on?0:-1;
    if(on&&focus)t.focus();
  });
  pans.forEach(function(p,n){
    if(n===i){p.removeAttribute('data-off');}else{p.setAttribute('data-off','1');}
  });
}
tabs.forEach(function(t,i){
  t.addEventListener('click',function(){sel(i,false);});
  t.addEventListener('keydown',function(e){
    var k=e.key,n=null;
    if(k==='ArrowRight'||k==='ArrowDown')n=(i+1)%tabs.length;
    else if(k==='ArrowLeft'||k==='ArrowUp')n=(i-1+tabs.length)%tabs.length;
    else if(k==='Home')n=0; else if(k==='End')n=tabs.length-1;
    if(n!==null){e.preventDefault();sel(n,true);}
  });
});
sel(0,false);

}catch(e){console.error('mx-duration',e);}})();