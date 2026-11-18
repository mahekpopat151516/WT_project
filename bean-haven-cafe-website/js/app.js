
const menuBtn=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.links');
if(menuBtn) menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));

const slides=[...document.querySelectorAll('.slide')];
const dots=[...document.querySelectorAll('.dot')];
let current=0, timer;
function showSlide(i){
  if(!slides.length)return;
  current=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle('active',n===current));
  dots.forEach((d,n)=>d.classList.toggle('active',n===current));
}
function startSlider(){timer=setInterval(()=>showSlide(current+1),5000)}
document.querySelector('.next')?.addEventListener('click',()=>{showSlide(current+1);clearInterval(timer);startSlider()});
document.querySelector('.prev')?.addEventListener('click',()=>{showSlide(current-1);clearInterval(timer);startSlider()});
dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));
if(slides.length) startSlider();

document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const cat=btn.dataset.filter;
    document.querySelectorAll('.menu-item').forEach(item=>{
      item.style.display=(cat==='all'||item.dataset.category===cat)?'block':'none';
    });
  });
});

document.querySelectorAll('[data-gallery]').forEach(img=>{
  img.addEventListener('click',()=>{
    const modal=document.querySelector('.modal');
    const target=modal?.querySelector('img');
    if(modal&&target){target.src=img.src;modal.classList.add('show')}
  });
});
document.querySelector('.modal-close')?.addEventListener('click',()=>document.querySelector('.modal').classList.remove('show'));
document.querySelector('.modal')?.addEventListener('click',e=>{if(e.target.classList.contains('modal'))e.currentTarget.classList.remove('show')});

document.querySelectorAll('form[data-demo]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const msg=form.dataset.success||'Thank you! Your request has been received.';
    alert(msg); form.reset();
  });
});

const year=document.querySelector('[data-year]');
if(year)year.textContent=new Date().getFullYear();

// Simple demo localStorage for admin edits.
function loadLocalMenu(){
  const stored=localStorage.getItem('beanHavenMenu');
  if(!stored)return;
  const data=JSON.parse(stored);
  const list=document.querySelector('[data-admin-menu]');
  if(!list)return;
  list.innerHTML=data.map((x,i)=>`<tr><td>${x.name}</td><td>${x.category}</td><td>₹${x.price}</td><td><button class="btn" onclick="removeMenu(${i})">Delete</button></td></tr>`).join('');
}
function removeMenu(i){
  const data=JSON.parse(localStorage.getItem('beanHavenMenu')||'[]');
  data.splice(i,1);localStorage.setItem('beanHavenMenu',JSON.stringify(data));loadLocalMenu();
}
document.querySelector('[data-add-menu]')?.addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.currentTarget;
  const data=JSON.parse(localStorage.getItem('beanHavenMenu')||'[]');
  data.push({name:f.name.value,category:f.category.value,price:f.price.value});
  localStorage.setItem('beanHavenMenu',JSON.stringify(data));f.reset();loadLocalMenu();
});
loadLocalMenu();
