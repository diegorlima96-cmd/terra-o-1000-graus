document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Parallax on Hero Image
    const heroImg = document.querySelector('.hero-img');
    const heroSection = document.querySelector('.hero');

    heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;

        if (heroImg) {
            heroImg.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // Reset transform on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        if (heroImg) {
            heroImg.style.transform = `translate(0px, 0px)`;
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Optional: Reveal animations on scroll using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply basic reveal style to feature cards to let observer work
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header) => {
        header.style.opacity = 0;
        header.style.transform = 'translateY(20px)';
        header.style.transition = `all 0.6s cubic-bezier(0.25, 1, 0.5, 1)`;
        observer.observe(header);
    });

    // --- CARREGAR CONFIGURAÇÕES DO ADMIN (DINÂMICO) ---
    const loadSettings = () => {
        const savedData = JSON.parse(localStorage.getItem('siteSettings') || '{}');
        if (!savedData.name && !savedData.whatsapp) return; // Nada salvo ainda

        // Atualizar Nome/Logo
        if (savedData.name) {
            const logos = document.querySelectorAll('.logo');
            logos.forEach(logo => {
                const parts = savedData.name.split(' ');
                if (parts.length > 1) {
                    logo.innerHTML = `<span class="logo-hot">${parts[0]}</span>&nbsp;<span class="logo-cold">${parts.slice(1).join(' ')}</span>`;
                } else {
                    logo.innerHTML = `<span class="logo-hot">${savedData.name}</span>`;
                }
            });
        }

        // Atualizar Descrição Hero
        if (savedData.desc) {
            const heroSub = document.querySelector('.hero-subtitle');
            if (heroSub) heroSub.textContent = savedData.desc;
        }

        // Atualizar WhatsApp e Links
        if (savedData.whatsapp) {
            const waLinks = document.querySelectorAll('a[href*="wa.me"]');
            waLinks.forEach(link => {
                link.href = `https://wa.me/55${savedData.whatsapp.replace(/\D/g, '')}`;
            });

            // Texto no footer
            const footerWa = document.querySelector('.footer-contact i.ph-whatsapp-logo + a');
            if (footerWa) {
                // Formatar número simples (XX) XXXXX-XXXX
                const n = savedData.whatsapp.replace(/\D/g, '');
                if (n.length >= 11) {
                    footerWa.textContent = `(${n.substring(0, 2)}) ${n.substring(2, 7)}-${n.substring(7)}`;
                } else {
                    footerWa.textContent = savedData.whatsapp;
                }
            }
        }

        // Atualizar Endereço
        if (savedData.address) {
            const footerAddr = document.querySelector('.footer-contact i.ph-map-pin + p');
            // Nota: o seletor acima pode precisar de ajuste dependendo do HTML
            const contactPs = document.querySelectorAll('.footer-contact p');
            contactPs.forEach(p => {
                if (p.querySelector('.ph-map-pin')) {
                    p.innerHTML = `<i class="ph ph-map-pin"></i> ${savedData.address}`;
                }
            });

            // Seção institucional
            const instSubtitle = document.querySelector('#institucional .section-subtitle strong');
            if (instSubtitle) instSubtitle.textContent = savedData.address;
        }
    };

    loadSettings();

    // --- RENDERIZAR PRODUTOS DINÂMICOS ---
    const renderProducts = () => {
        const productGrid = document.querySelector('.flavor-grid');
        if (!productGrid) return;

        const products = JSON.parse(localStorage.getItem('siteProducts') || '[]');
        if (products.length === 0) return; // Se não houver produtos no admin, mantém os estáticos do HTML

        productGrid.innerHTML = ''; // Limpa os estáticos

        products.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'flavor-card';
            card.style.opacity = 0;
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.1}s`;

            card.innerHTML = `
                <div class="flavor-image">
                    <i class="ph ph-ice-cream" style="font-size: 5rem; color: rgba(255,255,255,0.1);"></i>
                    <div class="flavor-overlay">
                        <button class="btn btn-primary btn-sm">Adicionar</button>
                    </div>
                </div>
                <div class="flavor-info">
                    <div class="flavor-header">
                        <h3 class="flavor-name">${p.name}</h3>
                        <span class="flavor-price">R$ ${parseFloat(p.price).toFixed(2)}</span>
                    </div>
                    <p class="flavor-desc">${p.desc}</p>
                    <div class="flavor-tags">
                        <span class="tag">Artesanal</span>
                        <span class="tag">Premium</span>
                    </div>
                </div>
            `;

            productGrid.appendChild(card);
            observer.observe(card);
        });
    };

    renderProducts();

});
