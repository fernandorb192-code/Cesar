document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const form = document.getElementById('budget-form');
    const serviceSelect = document.getElementById('service');
    const otherServiceGroup = document.getElementById('other-service-group');
    const dateInput = document.getElementById('date');
    const thankYouModal = document.getElementById('thank-you-modal');
    const modalOk = document.getElementById('modal-ok');
    const modalClose = document.querySelector('.modal-close');

    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        const loader = item.querySelector('.img-loader');
        if (img.complete) {
            if (loader) loader.remove();
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                if (loader) loader.remove();
                img.classList.add('loaded');
            });
        }
    });

    serviceSelect.addEventListener('change', () => {
        if (serviceSelect.value === 'Outro') {
            otherServiceGroup.style.display = 'block';
            document.getElementById('other-service').setAttribute('required', 'true');
        } else {
            otherServiceGroup.style.display = 'none';
            document.getElementById('other-service').removeAttribute('required');
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        let service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;
        const message = document.getElementById('message').value;

        if (service === 'Outro') {
            service = document.getElementById('other-service').value;
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
        thankYouModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    modalOk.addEventListener('click', () => {
        thankYouModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modalClose.addEventListener('click', () => {
        thankYouModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    thankYouModal.addEventListener('click', (e) => {
        if (e.target === thankYouModal) {
            thankYouModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});