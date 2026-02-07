// Scroll-based navigation
const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');

// Create animated animal doodles
function createDoodles() {
    const doodlesContainer = document.querySelector('.bg-doodles');
    const animals = ['🐡', '🐷', '🐾', '🐟', '🐠', '🦈', '🐋', '🐙', '🦀', '🐚', '🦑', '🐬', '🦐', '🐢', '🐠', '🐡', '🦈'];
    
    // Create multiple floating animals
    for (let i = 0; i < 35; i++) {
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

// Anti-scraping email reveal
document.getElementById('email-btn')?.addEventListener('click', function() {
    const user = 'nicolepostinghel';
    const domain = 'gmail';
    const tld = 'com';
    const email = user + '@' + domain + '.' + tld;
    
    const display = document.getElementById('email-display');
    const btn = document.getElementById('email-btn');
    
    display.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    display.classList.remove('email-hidden');
    display.classList.add('email-shown');
    btn.style.display = 'none';
});

// Click explosion effect with gravity
const animals = ['🐡', '🐷', '🐾', '🐟', '🐠', '🦈', '🐋', '🐙', '🦀', '🐚', '🦑', '🐬', '🦐', '🐢'];

document.addEventListener('click', function(e) {
    // Don't trigger on interactive elements
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.sidebar')) {
        return;
    }
    
    const numDoodles = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numDoodles; i++) {
        createExplosionDoodle(e.clientX, e.clientY);
    }
});

function createExplosionDoodle(x, y) {
    const doodle = document.createElement('div');
    doodle.className = 'explosion-doodle';
    doodle.textContent = animals[Math.floor(Math.random() * animals.length)];
    
    // Random size
    const size = 30 + Math.random() * 30;
    doodle.style.fontSize = size + 'px';
    
    // Position at click point
    doodle.style.left = x + 'px';
    doodle.style.top = y + 'px';
    
    // Random explosion direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 150;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - (100 + Math.random() * 100); // Initial upward velocity
    
    doodle.style.setProperty('--vx', vx + 'px');
    doodle.style.setProperty('--vy', vy + 'px');
    
    // Random rotation
    const rotations = 1 + Math.floor(Math.random() * 3);
    doodle.style.setProperty('--rotations', rotations);
    
    document.body.appendChild(doodle);
    
    // Remove after animation
    setTimeout(() => {
        doodle.remove();
    }, 2000);
}
