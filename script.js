 /* ── Cursor ── */
 const cur = document.getElementById('cursor');
 const ring = document.getElementById('cursorRing');
 let mx=0,my=0,rx=0,ry=0;
 document.addEventListener('mousemove', e => {
   mx=e.clientX; my=e.clientY;
   cur.style.transform = `translate(${mx-4}px,${my-4}px)`;
 });
 (function loop(){ rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1; ring.style.transform=`translate(${rx-16}px,${ry-16}px)`; requestAnimationFrame(loop); })();

 /* ── Efeito de digitação ──
    ✏️ Troque 'Seu Nome' pelo seu nome real.
    As demais palavras aparecem no efeito animado. */
 const words = ['João', 'Programador', 'Lutador'];
 let wi=0,ci=0,del=false;
 const tEl = document.getElementById('typed-name');
 function type(){
   const w = words[wi];
   tEl.textContent = del ? w.slice(0,--ci) : w.slice(0,++ci);
   if(!del && ci===w.length){ del=true; setTimeout(type,800); return; }
   if(del && ci===0){ del=false; wi=(wi+1)%words.length; }
   setTimeout(type, del?55:115);
 }
 type();

 /* ── Scroll reveal + barras de habilidade ── */
 const obs = new IntersectionObserver(entries => {
   entries.forEach(e => {
     if(e.isIntersecting){
       e.target.classList.add('visible');
       e.target.querySelectorAll('.bar-fill').forEach(b => b.style.width = b.dataset.width+'%');
     }
   });
 }, { threshold: 0.15 });
 document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.obj-item').forEach(r => obs.observe(r));

 /* ── Esconde placeholder de fundo quando a foto está configurada ── */
 ['sobre-bg','traj-bg'].forEach((cls,i) => {
   const el = document.querySelector('.'+cls);
   const ph = document.getElementById(['ph-sobre','ph-traj'][i]);
   if(!el||!ph) return;
   const bg = getComputedStyle(el).backgroundImage;
   if(bg && bg!=='none' && !bg.includes('SUA_FOTO')) ph.remove();
 });

 /* ── Esconde placeholder de fotos normais quando a img carrega ── */
 document.querySelectorAll('img').forEach(img => {
   img.addEventListener('load', () => {
     img.style.display = 'block';
     const ph = img.nextElementSibling;
     if(ph && ph.classList.contains('photo-ph')) ph.style.display = 'none';
   });
   if(img.complete && img.naturalWidth) {
     img.style.display = 'block';
     const ph = img.nextElementSibling;
     if(ph && ph.classList.contains('photo-ph')) ph.style.display = 'none';
   }
 });

 /* ── Nav active ── */
 const secs = document.querySelectorAll('section[id]');
 const links = document.querySelectorAll('.nav-links a');
 window.addEventListener('scroll', () => {
   let active='';
   secs.forEach(s => { if(window.scrollY >= s.offsetTop-200) active=s.id; });
   links.forEach(a => { a.style.color = a.getAttribute('href')==='#'+active ? 'var(--accent)':'' });
 });