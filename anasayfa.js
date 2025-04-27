document.addEventListener('DOMContentLoaded', () => {
    // Premium kartlar için efektler
    const premiumCards = document.querySelectorAll('.premium-channel-card');

    function createFireParticles(card) {
        const overlay = card.querySelector('.fire-overlay');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'fire-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.background = `hsl(${Math.random() * 30 + 15}, 100%, 50%)`;
            particle.style.setProperty('--x-offset', (Math.random() * 100 - 50) + 'px');
            overlay.appendChild(particle);
        }
    }

    premiumCards.forEach(card => {
        // Ateş parçacıkları
        createFireParticles(card);

        // Hover efektleri
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 8px 30px rgba(255, 69, 0, 0.3)';

            // Konfeti efekti
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.8 },
                colors: ['#FFD700', '#FFA500', '#FF4500', '#ff0000'],
                angle: 90,
                startVelocity: 30,
                gravity: 0.5,
                scalar: 0.8,
                ticks: 100
            });
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.boxShadow = '0 4px 15px rgba(30, 40, 55, 0.2)';
        });
    });

    // Swiper Başlatma
    const swiper = new Swiper('.premium-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            }
        }
    });

    // Modal işlevleri
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        
        // Modal açıldığında ekstra konfeti efekti
        const isPremium = modalId === 'premiumModal';
        const colors = isPremium 
            ? ['#FFD700', '#FFA500', '#FF4500', '#ff0000']
            : ['#2962ff', '#0088cc', '#00a8ff', '#4CAF50'];
            
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors,
            angle: isPremium ? 60 : 120,
            startVelocity: 45,
            gravity: 0.7,
            scalar: 1.2,
            ticks: 200
        });
    }

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    }

    // Modal dışına tıklandığında kapatma
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // ESC tuşu ile modal kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });

    // Sol panel için mobil toggle
    const leftPanel = document.querySelector('.left-panel');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(menuToggle);

    // Menü butonuna stil ekle
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            background: #0088cc;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        @media (max-width: 992px) {
            .menu-toggle {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);

    // Menü butonuna tıklandığında
    menuToggle.addEventListener('click', function() {
        leftPanel.classList.toggle('active');
    });

    // Panel dışına tıklandığında paneli kapat
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            !leftPanel.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            leftPanel.classList.contains('active')) {
            leftPanel.classList.remove('active');
        }
    });

    // Ekran boyutu değiştiğinde paneli sıfırla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            leftPanel.classList.remove('active');
        }
    });

    // Sağ panel için mobil toggle
    const rightPanel = document.querySelector('.right-panel');
    
    // Mobil görünümde panel dışı tıklamada kapanma
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (!rightPanel.contains(e.target) && rightPanel.classList.contains('active')) {
                rightPanel.classList.remove('active');
            }
        }
    });

    // Ekran boyutu değiştiğinde paneli sıfırla
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            rightPanel.classList.remove('active');
        }
    });
});