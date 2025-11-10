document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    initializeCountdownTimer();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeAnimations();
});

function initializeCountdownTimer() {
    const countdownTimer = document.getElementById('countdownTimer');
    if (!countdownTimer) return;

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    let totalSeconds = 3 * 24 * 60 * 60;

    function updateTimer() {
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            totalSeconds = 3 * 24 * 60 * 60;
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
            
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('show')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    }
}

function initializeSmoothScrolling() {
    document.documentElement.classList.add('scroll-smooth');
    
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.case-card, .warning-block, h2, p');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    const ctaButtons = document.querySelectorAll('.btn-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const countdownAlert = document.querySelector('.countdown-alert');
    if (countdownAlert) {
        setInterval(function() {
            countdownAlert.style.animation = 'none';
            setTimeout(function() {
                countdownAlert.style.animation = 'pulse-glow 2s ease-in-out infinite alternate';
            }, 10);
        }, 4000);
    }
}

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.backgroundColor = 'white';
        nav.style.backdropFilter = 'none';
    }
});

window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    }
});
