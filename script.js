document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initHorarios();
    initTestimonials();
    initIntersectionObserver();
    initFormValidation();
});

// 1. Control del Header Dinámico al hacer Scroll
function initHeader() {
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });
}

// 2. Control Dinámico del Menú Móvil Hamburguesa
function initMobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    const toggleMenu = () => {
        menuBtn.classList.toggle("open");
        if (mobileMenu.classList.contains("opacity-0")) {
            mobileMenu.classList.remove("opacity-0", "pointer-events-none");
            mobileMenu.classList.add("opacity-100", "pointer-events-auto");
        } else {
            mobileMenu.classList.add("opacity-0", "pointer-events-none");
            mobileMenu.classList.remove("opacity-100", "pointer-events-auto");
        }
    };

    menuBtn.addEventListener("click", toggleMenu);
    mobileLinks.forEach(link => link.addEventListener("click", toggleMenu));
}

// 3. Generación Automática de Horarios Estrictos y Validación de Días CERRADOS
function initHorarios() {
    const dateInput = document.getElementById("date");
    const timeSelect = document.getElementById("time");
    const messageContainer = document.getElementById("form-message");

    // Limitar que no puedan seleccionar fechas anteriores al día de hoy
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    dateInput.addEventListener("change", (e) => {
        const selectedDate = new Date(e.target.value);
        const dayOfWeek = selectedDate.getUTCDay(); // 0: Domingo, 1: Lunes, 2: Martes...

        timeSelect.innerHTML = "";
        messageContainer.classList.add("hidden");
        timeSelect.disabled = true;

        // Domingo (0) o Lunes (1) -> Cerrado
        if (dayOfWeek === 0 || dayOfWeek === 1) {
            messageContainer.textContent = "Lo sentimos, ese día permanecemos cerrados.";
            messageContainer.classList.remove("hidden");
            timeSelect.innerHTML = '<option value="">Cerrado</option>';
            return;
        }

        timeSelect.disabled = false;
        let startHour, startMin, endHour;

        // Martes a Viernes (2, 3, 4, 5) vs Sábados (6)
        if (dayOfWeek >= 2 && dayOfWeek <= 5) {
            startHour = 10;
            startMin = 15;
            endHour = 19;
        } else if (dayOfWeek === 6) {
            startHour = 10;
            startMin = 0;
            endHour = 18;
        }

        // Generar intervalos exactos cada 15 minutos
        let currentHour = startHour;
        let currentMin = startMin;

        timeSelect.innerHTML = '<option value="">Selecciona una hora</option>';

        while (currentHour < endHour || (currentHour === endHour && currentMin === 0)) {
            const formatHour = currentHour.toString().padStart(2, "0");
            const formatMin = currentMin.toString().padStart(2, "0");
            const timeString = `${formatHour}:${formatMin}`;
            
            const option = document.createElement("option");
            option.value = timeString;
            option.textContent = timeString;
            timeSelect.appendChild(option);

            currentMin += 15;
            if (currentMin >= 60) {
                currentMin = 0;
                currentHour++;
            }
        }
    });
}

// 4. Preselección Dinámica del Tratamiento desde las tarjetas
window.selectService = function(serviceName) {
    const treatmentSelect = document.getElementById("treatment");
    const targetSection = document.getElementById("reservas");

    if (treatmentSelect) {
        treatmentSelect.value = serviceName;
        // Scroll suave directo al formulario de reserva
        targetSection.scrollIntoView({ behavior: "smooth" });
    }
};

// 5. Carrusel de Testimonios Automático
function initTestimonials() {
    const slides = document.querySelectorAll(".testimonial-slide");
    if (slides.length === 0) return;
    
    let currentIndex = 0;

    setInterval(() => {
        slides[currentIndex].classList.remove("opacity-100");
        slides[currentIndex].classList.add("opacity-0");

        currentIndex = (currentIndex + 1) % slides.length;

        slides[currentIndex].classList.remove("opacity-0");
        slides[currentIndex].classList.add("opacity-100");
    }, 5000);
}

// 6. Animaciones Orgánicas con Intersection Observer sin Librerías Externas
function initIntersectionObserver() {
    const items = document.querySelectorAll(".reveal-item");
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    items.forEach(item => observer.observe(item));
}

// 7. Validación y Envío Estructurado Directo a WhatsApp Business
function initFormValidation() {
    const form = document.getElementById("appointment-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const treatment = document.getElementById("treatment").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (!name || !phone || !treatment || !date || !time) {
            alert("Por favor, rellene todos los campos requeridos.");
            return;
        }

        // Formatear mensaje para la URL de WhatsApp
        const phoneNumberStr = "34614410199"; 
        const message = `Hola Royal Beauty Centre.
Mi nombre es ${name}.
Quisiera reservar:
Tratamiento: ${treatment}
Fecha: ${date}
Hora: ${time}
Teléfono: ${phone}
Muchas gracias.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumberStr}?text=${encodedMessage}`;

        // Redirección directa al canal de atención
        window.open(whatsappUrl, "_blank");
    });
}
