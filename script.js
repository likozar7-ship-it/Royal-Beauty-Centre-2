/* =========================================================
   Royal Beauty Centre — script.js
   Menú móvil, header dinámico, tarjetas de servicios, galería,
   carrusel de opiniones, horarios automáticos, validación de
   formulario y envío por WhatsApp.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  renderServices();
  renderGallery();
  initTestimonials();
  initScheduleLogic();
  initBookingForm();
  initScrollReveal();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------
   1. Header dinámico al hacer scroll
--------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const toggle = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------------------------------------------------------
   2. Menú móvil
--------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  const closeMenu = () => {
    btn.classList.remove('open');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}

/* ---------------------------------------------------------
   3. Datos y renderizado de tratamientos
--------------------------------------------------------- */
const SERVICES = [
  {
    name: 'Manicura',
    desc: 'Cuidado completo de manos con esmaltado semipermanente de larga duración.',
    price: '25€',
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Pedicura',
    desc: 'Tratamiento relajante de pies con exfoliación e hidratación profunda.',
    price: '30€',
    img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Extensiones de pestañas',
    desc: 'Efecto natural o volumen ruso, adaptado a la forma de tu mirada.',
    price: '45€',
    img: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Diseño de cejas',
    desc: 'Perfilado, laminado y tinte para una mirada definida y armoniosa.',
    price: '20€',
    img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Limpieza facial',
    desc: 'Limpieza profunda con extracción, hidratación y mascarilla final.',
    price: '40€',
    img: 'https://images.unsplash.com/photo-1596178060810-72660f8dd287?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Masajes',
    desc: 'Masaje relajante o descontracturante adaptado a tus necesidades.',
    price: '35€',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Micropigmentación',
    desc: 'Técnica de precisión para cejas o labios con resultado natural.',
    price: '80€',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Depilación facial',
    desc: 'Depilación con hilo o cera especializada para pieles sensibles.',
    price: '15€',
    img: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=600&q=80',
  },
];

function renderServices() {
  const grid = document.getElementById('services-grid');
  const cardsHtml = SERVICES.map((s, i) => `
    <article class="service-card reveal slide-up delay-${(i % 3) + 1}">
      <div class="img-wrap">
        <img src="${s.img}" alt="${s.name} en Royal Beauty Centre" loading="lazy">
      </div>
      <div class="body">
        <h3>${s.name}</h3>
        <p class="desc">${s.desc}</p>
        <div class="row">
          <span class="price">${s.price}</span>
          <button type="button" class="book-btn" data-treatment="${s.name}" aria-label="Reservar ${s.name}">Reservar →</button>
        </div>
      </div>
    </article>
  `).join('');
  grid.innerHTML = cardsHtml;

  // Preselección del tratamiento al pulsar "Reservar"
  grid.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const select = document.getElementById('tratamiento');
      select.value = btn.dataset.treatment;
      document.getElementById('reservas').scrollIntoView({ behavior: 'smooth' });
    });
  });

  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ---------------------------------------------------------
   4. Galería
--------------------------------------------------------- */
const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=500&q=80', alt: 'Piedras de spa apiladas en ambiente relajante' },
  { src: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=500&q=80', alt: 'Masaje relajante en cabina de spa' },
  { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=500&q=80', alt: 'Manicura profesional en proceso' },
  { src: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=500&q=80', alt: 'Interior de salón de belleza de lujo' },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80', alt: 'Tratamiento facial de precisión' },
  { src: 'https://images.unsplash.com/photo-1596178060810-72660f8dd287?auto=format&fit=crop&w=500&q=80', alt: 'Limpieza facial en cabina de estética' },
  { src: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=500&q=80', alt: 'Ambiente sereno de spa con velas' },
  { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=500&q=80', alt: 'Extensiones de pestañas aplicadas con precisión' },
];

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = GALLERY_IMAGES.map((g, i) => `
    <div class="gallery-item reveal zoom-in delay-${(i % 3) + 1}">
      <img src="${g.src}" alt="${g.alt}" loading="lazy">
    </div>
  `).join('');
  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ---------------------------------------------------------
   5. Carrusel de opiniones (automático)
--------------------------------------------------------- */
const TESTIMONIALS = [
  {
    name: 'Marta G.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    text: 'Un trato exquisito de principio a fin. Salí con la piel radiante y muy relajada.',
  },
  {
    name: 'Laura P.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    text: 'Las extensiones de pestañas me duraron semanas y el resultado fue muy natural.',
  },
  {
    name: 'Sofía R.',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80',
    text: 'El ambiente es precioso y el equipo súper profesional. Repetiré seguro.',
  },
];

let testimonialIndex = 0;
let testimonialTimer = null;

function initTestimonials() {
  const carousel = document.getElementById('testimonial-carousel');
  const dotsWrap = document.getElementById('testimonial-dots');

  carousel.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
      <img src="${t.avatar}" alt="Foto de ${t.name}" class="testimonial-avatar" loading="lazy">
      <p class="stars" aria-label="5 de 5 estrellas">★★★★★</p>
      <p class="testimonial-quote">&ldquo;${t.text}&rdquo;</p>
      <p class="testimonial-name">${t.name}</p>
    </div>
  `).join('');

  dotsWrap.innerHTML = TESTIMONIALS.map((_, i) => `
    <button class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ver opinión ${i + 1}"></button>
  `).join('');

  dotsWrap.querySelectorAll('.testimonial-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      goToTestimonial(Number(dot.dataset.index));
      resetTestimonialTimer();
    });
  });

  resetTestimonialTimer();
}

function goToTestimonial(index) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  testimonialIndex = index;
}

function resetTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => {
    const next = (testimonialIndex + 1) % TESTIMONIALS.length;
    goToTestimonial(next);
  }, 5000);
}

/* ---------------------------------------------------------
   6. Generación automática de horarios
   Martes-Viernes: 10:15 - 19:00 cada 15 min
   Sábado: 10:00 - 18:00 cada 15 min
   Domingo y lunes: cerrado
--------------------------------------------------------- */
function generateTimeSlots(startH, startM, endH, endM, stepMinutes) {
  const slots = [];
  let current = startH * 60 + startM;
  const end = endH * 60 + endM;
  while (current <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    current += stepMinutes;
  }
  return slots;
}

function getSlotsForDay(dayOfWeek) {
  // 0 = domingo, 1 = lunes, 2 = martes ... 6 = sábado
  if (dayOfWeek === 0 || dayOfWeek === 1) return [];
  if (dayOfWeek === 6) return generateTimeSlots(10, 0, 18, 0, 15);
  return generateTimeSlots(10, 15, 19, 0, 15); // martes a viernes
}

function initScheduleLogic() {
  const dateInput = document.getElementById('fecha');
  const timeSelect = document.getElementById('hora');
  const closedMsg = document.getElementById('closed-message');

  // No permitir fechas pasadas
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateInput.min = today.toISOString().split('T')[0];

  dateInput.addEventListener('change', () => {
    updateTimeOptions(dateInput, timeSelect, closedMsg);
  });
}

function updateTimeOptions(dateInput, timeSelect, closedMsg) {
  if (!dateInput.value) return;

  // Evitar desfases de zona horaria al parsear la fecha
  const [year, month, day] = dateInput.value.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const dayOfWeek = selectedDate.getDay();
  const slots = getSlotsForDay(dayOfWeek);

  timeSelect.innerHTML = '';

  if (slots.length === 0) {
    timeSelect.disabled = true;
    closedMsg.hidden = false;
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Cerrado';
    opt.selected = true;
    timeSelect.appendChild(opt);
    return;
  }

  closedMsg.hidden = true;
  timeSelect.disabled = false;

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Selecciona una hora';
  timeSelect.appendChild(placeholder);

  slots.forEach(slot => {
    const opt = document.createElement('option');
    opt.value = slot;
    opt.textContent = slot;
    timeSelect.appendChild(opt);
  });
}

/* ---------------------------------------------------------
   7. Validación de formulario y envío por WhatsApp
--------------------------------------------------------- */
const WHATSAPP_NUMBER = '34614410199';

function initBookingForm() {
  const form = document.getElementById('booking-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = {
      nombre: form.nombre,
      telefono: form.telefono,
      tratamiento: form.tratamiento,
      fecha: form.fecha,
      hora: form.hora,
    };

    let isValid = true;

    // Nombre
    isValid = validateField(fields.nombre, fields.nombre.value.trim().length >= 2) && isValid;

    // Teléfono (mínimo 9 dígitos, admite +, espacios y guiones)
    const phoneDigits = fields.telefono.value.replace(/[^\d]/g, '');
    isValid = validateField(fields.telefono, phoneDigits.length >= 9) && isValid;

    // Tratamiento
    isValid = validateField(fields.tratamiento, fields.tratamiento.value !== '') && isValid;

    // Fecha
    isValid = validateField(fields.fecha, fields.fecha.value !== '') && isValid;

    // Hora (no debe estar deshabilitada ni vacía -> día cerrado o sin seleccionar)
    const horaValida = !fields.hora.disabled && fields.hora.value !== '';
    isValid = validateField(fields.hora, horaValida) && isValid;

    if (!isValid) return;

    const mensaje =
`Hola Royal Beauty Centre.
Mi nombre es ${fields.nombre.value.trim()}.
Quisiera reservar:
Tratamiento: ${fields.tratamiento.value}
Fecha: ${formatDateForMessage(fields.fecha.value)}
Hora: ${fields.hora.value}
Teléfono: ${fields.telefono.value.trim()}
Muchas gracias.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener');
  });

  // Quitar el estado de error al corregir el campo
  form.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => {
      el.closest('.field')?.classList.remove('invalid');
    });
    el.addEventListener('change', () => {
      el.closest('.field')?.classList.remove('invalid');
    });
  });
}

function validateField(field, condition) {
  const wrapper = field.closest('.field');
  if (!wrapper) return condition;
  wrapper.classList.toggle('invalid', !condition);
  return condition;
}

function formatDateForMessage(isoDate) {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

/* ---------------------------------------------------------
   8. Animaciones on-scroll con Intersection Observer
--------------------------------------------------------- */
function initScrollReveal() {
  observeReveal(document.querySelectorAll('.reveal'));
}

function observeReveal(elements) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}
