document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Inicializando nosotros.js...');
    
    // Animaciones para las tarjetas de misión y visión
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.mission-card, .vision-card, .value-card, .review-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('animate');
            }
        });
    };
    
    // Ejecutar en carga y scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Efecto hover para las tarjetas de valores
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contador animado para estadísticas del hero
    const animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 60; // Duración de 1 segundo a 60fps
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        });
    };
    
    // Observador para activar contadores cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        });
    });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Efecto de intensidad basado en scroll (sin parallax problemático)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.about-hero');
        
        if (heroSection) {
            // Solo aplicar efectos sutiles sin mover la sección
            if (scrolled > 50) {
                heroSection.classList.add('scroll-active');
            } else {
                heroSection.classList.remove('scroll-active');
            }
        }
    });
    
    console.log('✅ nosotros.js cargado exitosamente');
});