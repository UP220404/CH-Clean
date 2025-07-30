document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize animations
    const animateElements = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .value-card, .team-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('animate');
            }
        });
    };
    
    // Run on load and scroll
    window.addEventListener('scroll', animateElements);
    animateElements();
    
    // Tooltips - Solo si Bootstrap está disponible
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Efecto de letras individuales (solo si existe el elemento)
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        const text = "EXPERIENCIAS A LA CARTA";
        let currentLetter = 0;
        
        // Limpiar contenido existente
        heroTitle.innerHTML = '';
        
        // Crear spans para cada letra
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.className = 'letter';
            
            // Marcar letras de "A LA CARTA" como accent
            if (index >= 12) { // "A LA CARTA" empieza en posición 12
                span.classList.add('accent');
            }
            
            heroTitle.appendChild(span);
        });
        
        const letters = heroTitle.querySelectorAll('.letter');
        
        function animateLetters() {
            // Remover clase active de todas las letras
            letters.forEach(letter => letter.classList.remove('active'));
            
            // Activar letra actual
            if (letters[currentLetter]) {
                letters[currentLetter].classList.add('active');
            }
            
            currentLetter = (currentLetter + 1) % letters.length;
        }
        
        // Iniciar animación automática
        setInterval(animateLetters, 150);
        
        // Acelerar animación con scroll
        let lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.pageYOffset;
            if (Math.abs(currentScrollY - lastScrollY) > 30) {
                animateLetters();
                lastScrollY = currentScrollY;
            }
        });
    }
    
    // Efecto de intensidad basado en scroll para todos los efectos
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        // Solo aplicar efectos si la sección existe
        if (heroSection) {
            if (scrolled > 50) {
                heroSection.classList.add('scroll-active');
            } else {
                heroSection.classList.remove('scroll-active');
            }
        }
    });
    
    // Función para mostrar mensajes de éxito/error en la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('success')) {
        showURLMessage('success', '¡Mensaje enviado exitosamente! Te contactaremos pronto.');
    } else if (urlParams.has('error')) {
        const errorType = urlParams.get('error');
        let errorMessage = 'Hubo un error al procesar tu solicitud.';
        
        switch(errorType) {
            case 'missing_fields':
                errorMessage = 'Por favor completa todos los campos obligatorios.';
                break;
            case 'invalid_email':
                errorMessage = 'Por favor ingresa un email válido.';
                break;
            case 'server_error':
                errorMessage = 'Error del servidor. Intenta de nuevo o contáctanos por WhatsApp.';
                break;
        }
        
        showURLMessage('error', errorMessage);
    } else if (urlParams.has('newsletter')) {
        const status = urlParams.get('newsletter');
        if (status === 'success') {
            showURLMessage('success', '¡Suscripción exitosa! Revisa tu email para tu descuento de bienvenida.');
        } else {
            showURLMessage('error', 'Error al suscribirse al newsletter. Intenta de nuevo.');
        }
    }
});

// Función para mostrar mensajes basados en URL
function showURLMessage(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border: none;
        border-radius: 10px;
    `;
    
    const icon = type === 'success' ? '<i class="fas fa-check-circle me-2"></i>' : '<i class="fas fa-exclamation-triangle me-2"></i>';
    
    alertDiv.innerHTML = `
        ${icon}${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
    
    // Limpiar URL
    const url = new URL(window.location);
    url.searchParams.delete('success');
    url.searchParams.delete('error');
    url.searchParams.delete('newsletter');
    window.history.replaceState({}, document.title, url);
}