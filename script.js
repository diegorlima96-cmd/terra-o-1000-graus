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

});
