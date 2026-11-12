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


// Package details: precise line-up information without assuming unconfirmed duo/trio personnel.
const packageDetails = {
  full: {
    title: 'FULL BAND', lineup: '4-PIECE / SIGNATURE LINE-UP',
    description: 'The signature Legato Live experience. All four musicians come together for a full-band performance that can move from soulful sets to high-energy live music.',
    includes: ['Lead vocalist', 'Bass guitar / vocals', 'Lead guitar / backing vocals', 'Drums'],
    ideal: 'Professional shows, corporate events, college fests and weddings.',
    notes: 'Musical selections and set flow can be discussed for your event.',
    subject: 'Full Band (4-piece)'
  },
  duo: {
    title: 'DUO', lineup: '2-PIECE / FLEXIBLE LINE-UP',
    description: 'An intimate live music format with two performers, designed to complement smaller spaces and personal celebrations.',
    includes: ['Two performing musicians', 'Performance approach tailored to the occasion', 'Instrumentation discussed when enquiring'],
    ideal: 'Weddings, anniversaries and other private events.',
    notes: 'The exact combination of musicians and instruments is confirmed based on your event requirements and availability.',
    subject: 'Duo (2-piece)'
  },
  triune: {
    title: 'TRIUNE', lineup: '3-PIECE / FLEXIBLE LINE-UP',
    description: 'A versatile three-piece performance designed to bring additional musical depth while remaining adaptable to the atmosphere of your event.',
    includes: ['Three performing musicians', 'A tailored live music arrangement', 'Instrumentation discussed when enquiring'],
    ideal: 'Weddings, corporate events, intimate gatherings and other private events.',
    notes: 'The exact combination of musicians and instruments is confirmed based on your event requirements and availability.',
    subject: 'Triune (3-piece)'
  },
  custom: {
    title: 'CUSTOM ENSEMBLE', lineup: 'TAILORED / ADD-ON PERFORMERS',
    description: 'Shape the live sound around your event. Ask about expanding your chosen line-up with additional performers and instruments.',
    includes: ['Violin', 'Keyboard', 'Tabla', 'Additional vocalist'],
    ideal: 'Bespoke shows, weddings, corporate events and special performances.',
    notes: 'Add-ons are subject to availability and can be discussed alongside the full band, duo or triune formats.',
    subject: 'Custom Ensemble / Add-on Musicians'
  }
};
const packageDialog = document.getElementById('packageDialog');
const packageDialogClose = document.getElementById('packageDialogClose');
if (packageDialog && typeof packageDialog.showModal === 'function') {
  document.querySelectorAll('[data-package]').forEach(button => button.addEventListener('click', () => {
    const selected = packageDetails[button.dataset.package];
    if (!selected) return;
    document.getElementById('packageDialogTitle').textContent = selected.title;
    document.getElementById('packageDialogLineup').textContent = selected.lineup;
    document.getElementById('packageDialogDescription').textContent = selected.description;
    document.getElementById('packageDialogIdeal').textContent = selected.ideal;
    document.getElementById('packageDialogNotes').textContent = selected.notes;
    const list = document.getElementById('packageDialogIncludes');
    list.replaceChildren();
    selected.includes.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.append(li);
    });
    const message = `Hi Legato Live! I'd like to enquire about the ${selected.subject} package for an event. Please share the available options and booking details.`;
    document.getElementById('packageDialogWhatsapp').href = 'https://wa.me/919895534353?text=' + encodeURIComponent(message);
    document.getElementById('packageDialogEmail').href = 'mailto:bookings@legatolive.com?subject=' + encodeURIComponent('Enquiry: Legato Live ' + selected.subject) + '&body=' + encodeURIComponent(message);
    packageDialog.showModal();
  }));
  packageDialogClose.addEventListener('click', () => packageDialog.close());
  packageDialog.addEventListener('click', event => { if (event.target === packageDialog) packageDialog.close(); });
}
