// ======================================================
// 1. MOBILE NAVIGATION
// ======================================================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.textContent = isOpen ? "×" : "≡";
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "≡";
    });
});

document.addEventListener("click", (event) => {
    const clickedInside =
        navMenu.contains(event.target) || menuButton.contains(event.target);

    if (!clickedInside) {
        navMenu.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "≡";
    }
});
}

// ======================================================
// 2. DARK MODE
// ======================================================

const themeButton = document.getElementById("themeButton");

if (themeButton) {
    themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeButton.textContent = isDark ? "☀️" : "🌗";

    themeButton.setAttribute("aria-pressed", String(isDark));
});
}

// ======================================================
// 3. SCROLL REVEAL ANIMATION
// ======================================================

const revealElements = document.querySelectorAll(`
    .section-heading,
    .introduction-content,
    .dream-content,
    .dream-card,
    .project-card,
    .skills-intro,
    .skill-item,
    .contact-container,
    .contact-form-wrapper,
    .footer-container
`);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
        }
    });
    },
    {
    threshold: 0.12,
    },
);

revealElements.forEach((element, index) => {
    element.classList.add("reveal");

    element.style.transitionDelay = `${(index % 4) * 100}ms`;

    revealObserver.observe(element);
});
} else {
    revealElements.forEach((element) => {
    element.classList.add("visible");
});
}

// ======================================================
// 4. EMAILJS CONFIGURATION
// ======================================================

// Ganti dengan data EmailJS milikmu.

const EMAILJS_SERVICE_ID = "service_81t88za";
const EMAILJS_TEMPLATE_ID = "template_muwznem";
const EMAILJS_PUBLIC_KEY = "dN7LFUCp_ANrVq0wH";

// ======================================================
// 5. CONTACT FORM
// ======================================================

const contactForm = document.getElementById("contactForm");
const sendButton = document.getElementById("sendButton");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Cek konfigurasi EmailJS
    if (
        !window.emailjs ||
        EMAILJS_SERVICE_ID.startsWith("EMAILJS_SERVICE_ID") ||
        EMAILJS_TEMPLATE_ID.startsWith("EMAILJS_TEMPLATE_ID") ||
        EMAILJS_PUBLIC_KEY.startsWith("EMAILJS_PUBLIC_KEY")
    ) {
        formStatus.textContent =
        "EmailJS belum dikonfigurasi. Silakan isi ID dan Public Key terlebih dahulu.";

        formStatus.className = "error-message";

        return;
    }

    // Kondisi saat pesan sedang dikirim
    sendButton.disabled = true;
    sendButton.textContent = "Sending...";

    formStatus.textContent = "";
    formStatus.className = "";

    try {
      // Mengirim pesan ke email melalui EmailJS
        await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm,
        {
            publicKey: EMAILJS_PUBLIC_KEY,
        },
    );

      // Jika berhasil
    formStatus.textContent = "Message sent successfully! Thank you.";

    formStatus.className = "success-message";

      // Kosongkan formulir
        contactForm.reset();
    } catch (error) {
      // Jika terjadi kesalahan
        console.error("EmailJS Error:", error);

        formStatus.textContent = "Failed to send message. Please try again.";

        formStatus.className = "error-message";
    } finally {
      // Aktifkan kembali tombol
        sendButton.disabled = false;
        sendButton.textContent = "Send Message →";
    }
});
}

// ======================================================
// 6. SMOOTH SCROLL
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
        return;
    }

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        event.preventDefault();

        targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
    }
});
});

// ======================================================
// 7. PROJECT CARD MOUSE EFFECT
// ======================================================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
    card.style.willChange = "transform";
});

card.addEventListener("mouseleave", () => {
    card.style.willChange = "auto";
});
});

// ======================================================
// 8. CONSOLE MESSAGE
// ======================================================

console.log(
    "%cWelcome to Afvan's Portfolio!",
    "color: #b78b58; font-size: 20px; font-weight: bold;",
);

console.log("Built with HTML, CSS, and JavaScript.");

// ======================================================
// 9. SCROLL ANIMATE
// ======================================================

const scrollElements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
    (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add("show");
    }
    });
}, {
    threshold: 0.2,
    },
);

scrollElements.forEach((element) => {
    observer.observe(element);
});

// ======================================================
// 10. EFEK LINGKARAN KURSOR
// ======================================================

document.addEventListener('DOMContentLoaded', () => {
let lastX = 0;
let lastY = 0;
let hue = 0;

function createParticle(currentX, currentY) {
    if (lastX === 0 && lastY === 0) {
        lastX = currentX;
        lastY = currentY;
    }

    const distance = Math.hypot(currentX - lastX, currentY - lastY);
    const steps = Math.max(1, Math.floor(distance / 4));

    for (let i = 0; i < steps; i++) {
        const x = lastX + (currentX - lastX) * (i / steps);
        const y = lastY + (currentY - lastY) * (i / steps);

        const trail = document.createElement('div');
        document.body.appendChild(trail);

        const size = Math.random() * 6 + 14;
        hue = (hue + 0.5) % 360;
        const color = `hsl(${hue}, 100%, 60%)`;

        Object.assign(trail.style, {
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '99999',
            transform: 'translate(-50%, -50%) scale(1)',
            transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
            boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
            opacity: '0.9'
        });

    setTimeout(() => {
        trail.style.transform = 'translate(-50%, -50%) scale(0)';
        trail.style.opacity = '0';
    }, 15);

    setTimeout(() => {
        trail.remove();
    }, 600);
    }

    lastX = currentX;
    lastY = currentY;
}

  // Event Mouse (Desktop)
window.addEventListener('mousemove', (e) => {
    createParticle(e.clientX, e.clientY);
});

  // Event Sentuhan (HP) - Tetap bisa scroll
window.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    lastX = touch.clientX;
    lastY = touch.clientY;
    createParticle(touch.clientX, touch.clientY);
});

window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    createParticle(touch.clientX, touch.clientY);
});

window.addEventListener('touchend', () => {
    lastX = 0;
    lastY = 0;
});
});