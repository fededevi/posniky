// Scroll-based navigation
const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');

// Create animated animal doodles
function createDoodles() {
    const doodlesContainer = document.querySelector('.bg-doodles');
    const animals = ['🐡', '🐷', '🐾', '🐟', '🐠', '🦈', '🐋', '🐙', '🦀', '🐚', '🦑', '🐬', '🦐', '🐢'];
    
    // Create multiple floating animals
    for (let i = 0; i < 20; i++) {
        const doodle = document.createElement('div');
        doodle.className = 'doodle';
        doodle.textContent = animals[Math.floor(Math.random() * animals.length)];
        
        // Random position
        doodle.style.left = Math.random() * 100 + '%';
        doodle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration and delay
        doodle.style.animationDuration = (15 + Math.random() * 25) + 's';
        doodle.style.animationDelay = Math.random() * 10 + 's';
        
        // Random size
        const size = 30 + Math.random() * 40;
        doodle.style.fontSize = size + 'px';
        
        doodlesContainer.appendChild(doodle);
    }
}

// Initialize doodles
createDoodles();

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
