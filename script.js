
// ======================================================
// AFVAN'S PORTFOLIO
// JAVASCRIPT INTERACTIONS
// ======================================================


// ======================================================
// 1. MOBILE NAVIGATION
// ======================================================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

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
            navMenu.contains(event.target) ||
            menuButton.contains(event.target);

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

        const isDark =
            document.body.classList.contains("dark-mode");

        themeButton.textContent = isDark ? "☀️" : "🌗";

        themeButton.setAttribute(
            "aria-pressed",
            String(isDark)
        );
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
            threshold: 0.12
        }
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");

        element.style.transitionDelay =
            `${(index % 4) * 100}ms`;

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
                    publicKey: EMAILJS_PUBLIC_KEY
                }
            );

            // Jika berhasil
            formStatus.textContent =
                "Message sent successfully! Thank you.";

            formStatus.className = "success-message";

            // Kosongkan formulir
            contactForm.reset();

        } catch (error) {
            // Jika terjadi kesalahan
            console.error("EmailJS Error:", error);

            formStatus.textContent =
                "Failed to send message. Please try again.";

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

        const targetElement =
            document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ======================================================
// 7. PROJECT CARD MOUSE EFFECT
// ======================================================

const projectCards =
    document.querySelectorAll(".project-card");

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
    "color: #b78b58; font-size: 20px; font-weight: bold;"
);

console.log(
    "Built with HTML, CSS, and JavaScript."
);