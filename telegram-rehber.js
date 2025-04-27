// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const leftPanel = document.querySelector('.left-panel');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const sections = document.querySelectorAll('.guide-section');
    const navLinks = document.querySelectorAll('.guide-navigation a');

    // Mobil menü butonu kontrolü
    if (mobileMenuBtn && leftPanel) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            leftPanel.classList.toggle('active');
            console.log('Menu button clicked');
        });

        // Panel dışına tıklandığında menüyü kapat
        document.addEventListener('click', (e) => {
            if (!leftPanel.contains(e.target) && 
                !mobileMenuBtn.contains(e.target) && 
                leftPanel.classList.contains('active')) {
                leftPanel.classList.remove('active');
            }
        });

        // Panel içine tıklandığında event'i durdur
        leftPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Scroll to top button
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active section highlighting
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Ekran boyutu değiştiğinde paneli sıfırla
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && leftPanel) {
            leftPanel.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in effect
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate guide cards on scroll
    document.querySelectorAll('.guide-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
}); 