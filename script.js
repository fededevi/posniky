// Scroll-based navigation
const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');

// Update active dot on scroll
container.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (container.scrollTop >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current || 
            (current === 'besenello' && dot.getAttribute('data-section') === 'intro')) {
            dot.classList.add('active');
        }
    });
});

// Smooth scroll to section
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax effect on scroll
container.addEventListener('scroll', () => {
    const scrolled = container.scrollTop;
    
    sections.forEach((section, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrolled * speed);
        section.style.backgroundPositionY = yPos + 'px';
    });
});

// Add stagger animation to cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.school-card, .work-card, .place-card, .info-card').forEach(card => {
    observer.observe(card);
});

// Dynamic gradient background
let gradientAngle = 135;
setInterval(() => {
    gradientAngle = (gradientAngle + 1) % 360;
    document.body.style.background = `linear-gradient(${gradientAngle}deg, var(--light-blue) 0%, var(--light-purple) 50%, var(--light-pink) 100%)`;
}, 100);
