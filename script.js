document.addEventListener('DOMContentLoaded', () => {

    const backToTopBtn = document.getElementById("back-to-top-btn");
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = (window.scrollY > 150) ? "flex" : "none";
        });
    }

    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.getElementById('main-nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const isOpened = nav.classList.contains('nav-open');
            nav.classList.toggle('nav-open');
            document.body.classList.toggle('no-scroll'); // Bloqueia/desbloqueia a rolagem
            hamburger.setAttribute('aria-expanded', !isOpened);
            hamburger.setAttribute('aria-label', isOpened ? 'Abrir menu' : 'Fechar menu');

            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');
        const submitButton = contactForm.querySelector('.btn-submit');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const inputs = [nameInput, emailInput, messageInput];

        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(input => input.classList.remove('invalid'));
            formStatus.textContent = '';

            if (nameInput.value.trim() === '') {
                nameInput.classList.add('invalid');
                isValid = false;
            }
            if (!validateEmail(emailInput.value)) {
                emailInput.classList.add('invalid');
                isValid = false;
            }
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('invalid');
                isValid = false;
            }

            if (!isValid) {
                formStatus.textContent = 'Por favor, verifique os campos destacados.';
                formStatus.style.color = '#ff6b6b';
                return;
            }

            formStatus.textContent = 'Enviando...';
            formStatus.style.color = 'var(--text-color)';
            submitButton.disabled = true;
            setTimeout(() => {
                formStatus.textContent = 'Mensagem enviada com sucesso!';
                formStatus.style.color = '#51cf66';
                contactForm.reset();
                submitButton.disabled = false;
                setTimeout(() => { formStatus.textContent = ''; }, 4000);
            }, 1500);
        });
    }

    const loadingOverlay = document.getElementById('loading-overlay');

    const addLoadingAnimation = (linkId) => {
        const link = document.getElementById(linkId);
        if (link && loadingOverlay) {
            link.addEventListener('click', (e) => {
                if (window.location.pathname.endsWith(link.pathname.split('/').pop())) {
                    return;
                }

                e.preventDefault();
                loadingOverlay.classList.add('show');
                loadingOverlay.classList.remove('hiding');

                setTimeout(() => {
                    loadingOverlay.classList.add('hiding');
                }, 1000);

                setTimeout(() => {
                    window.location.href = link.href;
                }, 1500);
            });
        }
    };

    addLoadingAnimation('sobre-nos-link');
    addLoadingAnimation('inicio-link');

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
});