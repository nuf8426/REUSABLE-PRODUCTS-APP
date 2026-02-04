const CONTACT_PHONE = '25167996669';
const CONTACT_DISPLAY = '+251 679 966 69';
const CONTACT_EMAIL = 'abra@gmail.com';

const products = {
  pads: {
    title: 'Abra Reusable Pads',
    price: 'ETB 200',
    description: 'A sustainable starter pack of three washable, high-absorbency cloth pads with breathable cotton tops and waterproof backing. Built for comfort during menstruation, postpartum care, and light leaks. Easy to wash, durable, and cost-saving.',
    uses: [
      'Menstrual protection (regular & light flow)',
      'Postpartum care',
      'Light urinary leakage',
      'Daily eco-friendly alternative'
    ]
  },
  underwear: {
    title: 'Abra Cotton Underwear',
    price: 'ETB 100',
    description: 'Soft, organic cotton underwear designed for breathability and daily comfort. Gentle on sensitive skin and ideal to pair with reusable pads for extra security.',
    uses: [
      'Everyday comfortable wear',
      'Comfort during menstruation',
      'Gentle for sensitive skin',
      'Pairs well with reusable pads'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-product');
      showDetails(key);
    });
  });

  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.addEventListener('click', closeModal);

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Accessibility: FAB focus outline on keyboard navigation
  const fab = document.querySelector('.whatsapp-fab');
  if (fab) {
    fab.addEventListener('keydown', (e) => { if (e.key === 'Enter') fab.click(); });
  }
});

function showDetails(key) {
  const data = products[key];
  if (!data) return;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.description;
  document.getElementById('modal-price').textContent = data.price;

  const usesEl = document.getElementById('modal-uses');
  usesEl.innerHTML = data.uses.map(u => `<li>${u}</li>`).join('');

  const modalOrder = document.getElementById('modal-order');
  modalOrder.href = `https://wa.me/${CONTACT_PHONE}?text=I%20want%20to%20order%20${encodeURIComponent(data.title)}`;
  modalOrder.textContent = `Order via WhatsApp (${CONTACT_DISPLAY})`;

  const modalEmail = document.getElementById('modal-email');
  modalEmail.href = `mailto:${CONTACT_EMAIL}?subject=Order%20Inquiry%20-%20${encodeURIComponent(data.title)}`;
  modalEmail.textContent = `Email: ${CONTACT_EMAIL}`;

  const modal = document.getElementById('modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
