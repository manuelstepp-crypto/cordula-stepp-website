// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScroll = 0;

function handleScroll() {
    const scrollY = window.scrollY;

    // Add/remove scrolled class
    if (scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up (mobile only)
    if (window.innerWidth <= 680) {
        if (scrollY > lastScroll && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.style.transform = '';
    }

    lastScroll = scrollY;
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ===== Mobile Menu =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

function openMenu() {
    menuToggle.classList.add('active');
    nav.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Ensure header is visible when menu is open
    header.style.transform = 'translateY(0)';
}

function closeMenu() {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close menu on link click
nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
    }
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 680 && nav.classList.contains('open')) {
        closeMenu();
    }
});

// ===== Active Navigation Highlighting =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ===== Scroll Animations (Intersection Observer) =====
const fadeElements = document.querySelectorAll(
    '.about-grid, .offering-card, .project-card, .event-item, .contact-grid, .section-header'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

// Reduce threshold on mobile for earlier reveal
const isMobile = window.innerWidth <= 680;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: isMobile ? 0.08 : 0.15,
    rootMargin: '0px 0px -20px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ===== Contact Form =====
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
    const action = form.getAttribute('action');
    if (action.includes('PLACEHOLDER')) {
        e.preventDefault();
        alert('Das Kontaktformular ist noch nicht konfiguriert. Bitte kontaktieren Sie mich direkt per E-Mail.');
    }
});
