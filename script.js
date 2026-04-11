document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu with X button
    const menuClose = document.querySelector('.menu-close');
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    }

    // Lightbox functionality
    if (portfolioItems.length > 0 && lightbox && lightboxImg) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img && lightboxImg) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Budget form handling (for orcamento.html)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('budget-form');
    const serviceSelect = document.getElementById('service');
    const otherServiceGroup = document.getElementById('other-service-group');
    const dateInput = document.getElementById('date');
    const thankYouModal = document.getElementById('thank-you-modal');
    const modalClose = document.querySelector('.modal-close');

    // Set minimum date to today
    if (dateInput) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const minDate = `${year}-${month}-${day}`;
        dateInput.setAttribute('min', minDate);
    }

    // Show "Outro" input field
    if (serviceSelect && otherServiceGroup) {
        serviceSelect.addEventListener('change', () => {
            if (serviceSelect.value === 'Outro') {
                otherServiceGroup.style.display = 'block';
                const otherInput = document.getElementById('other-service');
                if (otherInput) otherInput.setAttribute('required', 'required');
            } else {
                otherServiceGroup.style.display = 'none';
                const otherInput = document.getElementById('other-service');
                if (otherInput) otherInput.removeAttribute('required');
            }
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            let service = serviceSelect?.value || '';
            const date = dateInput?.value || '';
            const location = document.getElementById('location')?.value || '';
            const message = document.getElementById('message')?.value || '';

            if (service === 'Outro') {
                const otherInput = document.getElementById('other-service');
                service = otherInput?.value || '';
            }

            const whatsappNumber = '558892840072';
            
            let text = `*Olá César! Gostaria de fazer um orçamento.*\n\n`;
            text += `*Nome:* ${name}\n`;
            text += `*WhatsApp:* ${phone}\n`;
            text += `*Tipo de sessão:* ${service}\n`;
            text += `*Data:* ${date || 'A definir'}\n`;
            text += `*Local:* ${location || 'A definir'}\n`;
            text += `*Mensagem:* ${message || 'Sem mensagem adicional'}`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');

            form.reset();
            if (otherServiceGroup) otherServiceGroup.style.display = 'none';

            if (thankYouModal) thankYouModal.classList.add('active');
        });
    }

    // Close modal
    if (modalClose && thankYouModal) {
        modalClose.addEventListener('click', () => {
            thankYouModal.classList.remove('active');
        });
    }

    if (thankYouModal) {
        thankYouModal.addEventListener('click', (e) => {
            if (e.target === thankYouModal) {
                thankYouModal.classList.remove('active');
            }
        });
    }
});