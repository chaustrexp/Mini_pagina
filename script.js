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

// Chatbot functionality
let chatbotVisible = false;

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbotVisible = !chatbotVisible;
    
    if (chatbotVisible) {
        chatbot.classList.remove('chatbot-hidden');
        chatbot.classList.add('chatbot-visible');
    } else {
        chatbot.classList.remove('chatbot-visible');
        chatbot.classList.add('chatbot-hidden');
    }
}

function sendMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);
    
    // Generate bot response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.innerHTML = getBotResponse(message);
        messagesContainer.appendChild(botMessage);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
    const responses = {
        '¿Qué es Talento Tech?': `
            💡 <strong>Talento Tech Oriente</strong> es un programa de formación <strong>gratuita</strong> que impulsa el desarrollo de habilidades digitales en jóvenes y adultos del oriente colombiano.
            <br><br>
            🎯 A través de bootcamps intensivos, brindamos herramientas prácticas para ingresar al mundo laboral tecnológico con metodología práctica y conexión directa con empresas.
        `,
        '¿Qué bootcamps hay?': `
            🧑‍💻 Tenemos 4 bootcamps disponibles:
            <br><br>
            🌐 <strong>Desarrollo Web Frontend</strong><br>
            📊 <strong>Análisis de Datos</strong><br>
            🔒 <strong>Ciberseguridad</strong><br>
            🤖 <strong>Inteligencia Artificial</strong><br>
            <br>
            ¿Te interesa información detallada de alguno? 😊
        `,
        'Info del bootcamp Frontend': `
            📘 <strong>Desarrollo Web Frontend</strong>
            <br><br>
            📅 <strong>Duración:</strong> 6 meses<br>
            🕕 <strong>Horario:</strong> Lunes a viernes, 6:00 p.m. a 9:00 p.m.<br>
            💻 <strong>Modalidad:</strong> Presencial y Virtual<br>
            🎓 <strong>Certificación:</strong> Incluida<br>
            <br>
            <strong>✅ Requisitos:</strong><br>
            • Ser mayor de 16 años<br>
            • Residir en la región Oriente<br>
            • Computadora con internet<br>
            • Disponibilidad de tiempo completo
        `,
        'Número de inscripciones': `
            📞 <strong>Teléfono de inscripciones:</strong><br>
            <a href="tel:+573200000000" style="color: #2563eb; font-weight: bold;">+57 320 000 0000</a>
            <br><br>
            📅 Horario de atención: Lunes a viernes de 8:00 AM a 6:00 PM
        `,
        'Link web oficial': `
            🔗 <strong>Página oficial:</strong><br>
            <a href="https://talentotech.gov.co" target="_blank" style="color: #2563eb; font-weight: bold;">talentotech.gov.co</a>
            <br><br>
            Allí encontrarás información completa sobre todos nuestros programas y convocatorias 📚
        `,
        'Hablar con humano': `
            👨‍💼 Te conectaré con uno de nuestros asesores humanos
            <br><br>
            <a href="https://wa.me/573200000000?text=Hola,%20necesito%20hablar%20con%20un%20asesor%20sobre%20Talento%20Tech%20Oriente" 
               target="_blank" 
               style="background: #25d366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 10px; font-weight: 500;">
               💬 Abrir WhatsApp
            </a>
            <br><br>
            <small style="color: #64748b;">Nuestros asesores están disponibles de lunes a viernes de 8:00 AM a 6:00 PM</small>
        `
    };
    
    return responses[message] || '🤔 Lo siento, no entiendo tu pregunta. Por favor selecciona una de las opciones disponibles para poder ayudarte mejor.';
}

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
    
    // Initialize chatbot as hidden
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.add('chatbot-hidden');
});