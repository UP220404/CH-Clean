document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Inicializando servicios.js...');
    
    // Carrusel de fondo para el hero
    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }
    
    // Cambiar slide cada 5 segundos
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }
    
    // Animaciones para las tarjetas de servicios
    const animateServiceCards = function() {
        const elements = document.querySelectorAll('.service-card, .process-step, .pricing-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.style.animationDelay = `${index * 0.15}s`;
                element.classList.add('animate');
            }
        });
    };
    
    // Ejecutar animaciones en scroll
    window.addEventListener('scroll', animateServiceCards);
    animateServiceCards();
    
    // Efecto hover mejorado para tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(45, 90, 61, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Efecto especial para la tarjeta featured
    const featuredCard = document.querySelector('.service-card.featured');
    if (featuredCard) {
        featuredCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(45, 90, 61, 0.3)';
        });
        
        featuredCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(45, 90, 61, 0.15)';
        });
    }
    
    // Contador animado para estadísticas
    const animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 80;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 25);
        });
    };
    
    // Observer para estadísticas
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
    
    // Efecto de progreso en pasos del proceso
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.querySelector('.step-number').style.transform = 'scale(1.2) rotate(360deg)';
            this.querySelector('.step-icon').style.transform = 'scale(1.1)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.querySelector('.step-number').style.transform = 'scale(1) rotate(0deg)';
            this.querySelector('.step-icon').style.transform = 'scale(1)';
        });
    });
    
    // Smooth scroll para botones CTA
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ servicios.js cargado exitosamente');
});