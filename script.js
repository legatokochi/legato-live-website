const header=document.getElementById('header');
const progress=document.getElementById('progress');
const menuToggle=document.getElementById('menuToggle');
const navigation=document.getElementById('navigation');
function updateScroll(){header.classList.toggle('scrolled',window.scrollY>35);const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+'%'}
window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();
menuToggle.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuToggle.textContent=open?'✕':'☰'});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
document.getElementById('year').textContent=new Date().getFullYear();


// Lightweight Get Rates form for static GitHub Pages. FormSubmit requires
// one-time verification of bookings@legatolive.com before going live.
const rateForm=document.getElementById('rateEnquiryForm');
if(rateForm){
  const eventSelect=document.getElementById('rateEvent');
  const otherWrap=document.getElementById('rateOtherWrap');
  const otherInput=document.getElementById('rateOther');
  const dateInput=document.getElementById('rateDate');
  const rateButton=document.getElementById('rateSubmit');
  const rateStatus=document.getElementById('rateFormStatus');
  // Local date, without converting to UTC, so Indian dates are not shifted.
  const now=new Date();
  const localToday=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  dateInput.min=localToday;
  eventSelect.addEventListener('change',()=>{
    const isOther=eventSelect.value==='Other';
    otherWrap.hidden=!isOther;
    otherInput.required=isOther;
    if(!isOther)otherInput.value='';
  });
  rateForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    rateStatus.hidden=true;
    rateStatus.classList.remove('error');
    const phone=document.getElementById('ratePhone');
    const digits=phone.value.replace(/\D/g,'');
    if(digits.length<10||digits.length>15){
      phone.setCustomValidity('Please enter a valid phone number with at least 10 digits.');
      phone.reportValidity();
      return;
    }
    phone.setCustomValidity('');
    if(!rateForm.reportValidity())return;
    if(document.getElementById('rateWebsite').value)return;
    const previousButton=rateButton.innerHTML;
    rateButton.disabled=true;
    rateButton.textContent='SENDING…';
    try{
      const payload=Object.fromEntries(new FormData(rateForm).entries());
      const response=await fetch("https://formsubmit.co/ajax/bookings@legatolive.com",{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload)
      });
      if(!response.ok)throw new Error('Could not send the request.');
      const result=await response.json();
      if(result.success===false||result.success==='false')throw new Error(result.message||'Could not send the request.');
      rateForm.reset();otherWrap.hidden=true;otherInput.required=false;
      rateStatus.textContent='Thanks! Your rates enquiry has been submitted.';
      rateStatus.hidden=false;
      if(Array.isArray(window.dataLayer))window.dataLayer.push({event:'legato_rates_enquiry_submitted'});
    }catch(error){
      rateStatus.classList.add('error');
      rateStatus.innerHTML='We couldn’t submit your request right now. Please try again, or <a href="https://wa.me/919895534353" target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.';
      rateStatus.hidden=false;
      console.warn('Legato Live enquiry could not be submitted:',error);
    }finally{
      rateButton.innerHTML=previousButton;
      rateButton.disabled=false;
    }
  });
  document.getElementById('ratePhone').addEventListener('input',(e)=>e.target.setCustomValidity(''));
}
