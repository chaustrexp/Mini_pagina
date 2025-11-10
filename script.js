// Introducción de la página
let introCompleted = false;

// Textos para el efecto de escritura
const typingTexts = [
    "Bienvenido al futuro digital...",
    "Donde los sueños se convierten en código...",
    "Tu carrera tech comienza aquí..."
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    const typedTextElement = document.getElementById('typed-text');
    const currentText = typingTexts[currentTextIndex];
    
    if (!isDeleting) {
        typedTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        }
    } else {
        typedTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        }
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, typingSpeed);
}

function skipIntro() {
    completeIntro();
}

function completeIntro() {
    if (introCompleted) return;
    
    introCompleted = true;
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    
    introScreen.classList.add('fade-out');
    
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');
        document.body.style.overflow = 'auto';
    }, 1000);
}

// Auto-completar introducción después de 6 segundos
function autoCompleteIntro() {
    setTimeout(() => {
        if (!introCompleted) {
            completeIntro();
        }
    }, 6000);
}

// Inicializar introducción
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar scroll durante la introducción
    document.body.style.overflow = 'hidden';
    
    // Iniciar efecto de escritura
    setTimeout(() => {
        typeWriter();
    }, 1500);
    
    // Auto-completar introducción
    autoCompleteIntro();
    
    // Permitir saltar con Enter o Espacio
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && !introCompleted) {
            e.preventDefault();
            completeIntro();
        }
    });
});

// Modal functionality
function mostrarInscripcion() {
    document.getElementById('modal-inscripcion').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal-inscripcion').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal-inscripcion');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    // Scroll effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrolled / maxScroll) * 100;
        
        // Update scroll progress
        scrollProgress.style.width = scrollPercentage + '%';
        
        // Add scrolled class to navbar
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking on overlay
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offsetTop = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add active state animation
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Initialize all navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScrolling();
});