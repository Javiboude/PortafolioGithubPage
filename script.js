document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Toggle del tema oscuro/claro
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Comprobar preferencia del sistema o tema guardado
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Aplicar tema guardado
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }

    // Alternar tema
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Botón "Volver arriba"
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Scroll suave para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambiar clase activa en navbar al hacer scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Animación de las barras de progreso
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress-bar');
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, 200);
        });
    }
    
    // Activar animación cuando la sección es visible
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el formulario
            // Por ahora solo mostramos un mensaje
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulamos el envío
            setTimeout(() => {
                submitButton.textContent = '¡Mensaje Enviado!';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Efecto parallax para la imagen del héroe
    const heroImg = document.querySelector('.hero-img');
    
    if (heroImg) {
        window.addEventListener('scroll', function() {
            const scrollValue = window.scrollY;
            heroImg.style.transform = `translateY(${scrollValue * 0.1}px)`;
        });
    }
});

// Inicializar tooltips de Bootstrap
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

function downloadCV() {
    const link = document.createElement('a');
    link.href = 'Screens/CurriculumTrab.pdf';
    link.download = 'JavierBoudereCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}