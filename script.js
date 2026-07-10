// Configuración dinámica inline para Tailwind (Clases de color personalizadas)
tailwind.config = {
    theme: {
        extend: {
            colors: {
                cream: '#FAFAF6',
                pastelPink: '#F3E8EE',
                goldAccent: '#D4AF37',
                darkGrey: '#2C2C2C'
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif']
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. LÓGICA DEL MENÚ MÓVIL
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. EFECTO DEL HEADER AL HACER SCROLL
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 20) {
            header.classList.add('shadow-md', 'bg-cream');
        } else {
            header.classList.remove('shadow-md');
        }
    });

    // 3. PRE-SELECCIÓN DE TRATAMIENTOS DESDE LAS TARJETAS
    const selectServiceButtons = document.querySelectorAll('.btn-select-service');
    const selectElement = document.getElementById('treatment');

    selectServiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            if (selectElement && serviceName) {
                selectElement.value = serviceName;
            }
        });
    });

    // 4. LÓGICA DE ENVÍO DE FORMULARIO INTEGRADO CON WHATSAPP
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const treatment = document.getElementById('treatment').value;
            const dateInput = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            // Convertir formato de fecha (de YYYY-MM-DD a DD/MM/YYYY)
            let formattedDate = dateInput;
            if (dateInput) {
                const dateParts = dateInput.split('-');
                formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            }

            // Construcción del mensaje con la estructura exacta requerida
            const baseMessage = `Hola Royal Beauty Center, me gustaría solicitar una cita. Mi nombre es ${name}. Quiero el tratamiento de ${treatment} para el día ${formattedDate} a las ${time}.`;
            
            // Codificación segura para URLs
            const encodedMessage = encodeURIComponent(baseMessage);
            
            // Apertura de ventana hacia la API oficial de WhatsApp
            window.open(`https://wa.me/34614410199?text=${encodedMessage}`, '_blank');
        });
    }
});
