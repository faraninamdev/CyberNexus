const canvas = document.getElementById('particle-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 1,
        speed: Math.random() * 1 + 0.5,
        color: ['var(--primary-neon)', 'var(--secondary-neon)'][Math.floor(Math.random() * 2)]
    });
}

let lastTime = 0;
function animateParticles(timestamp) {
    if (timestamp - lastTime > 16) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.y += p.speed;
            if (p.y > canvas.height) p.y = 0;
        });
        lastTime = timestamp;
    }
    requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'purple' ? '' : 'purple';
});

document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.style.transform = menu.classList.contains('hidden') ? 'translateX(100%)' : 'translateX(0)';
});

document.getElementById('jack-in').addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.display = 'none';
        alert('Connected to CyberNexus Grid! Welcome to the Abyss.');
    }, 2000);
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const newsletter = document.getElementById('newsletter').checked;

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    messageError.classList.add('hidden');

    let valid = true;
    if (!name.value) {
        nameError.classList.remove('hidden');
        valid = false;
    }
    if (!email.value || !email.value.includes('@')) {
        emailError.classList.remove('hidden');
        valid = false;
    }
    if (!message.value) {
        messageError.classList.remove('hidden');
        valid = false;
    }

    if (valid) {
        console.log('Form submitted:', { name: name.value, email: email.value, message: message.value, newsletter });
        alert(newsletter ? 'Signal sent! Subscribed to Neon Signals.' : 'Signal sent to the Grid!');
        document.getElementById('contact-form').reset();
    }
});

const tickerMessages = [
    'Data Stream: Node 47 online | Hack detected in Sector 9',
    'Data Stream: Quantum breach thwarted | Server 13 offline',
    'Data Stream: New node activated in Tokyo Sprawl | Grid stable'
];
let tickerIndex = 0;
function updateTicker() {
    document.getElementById('data-ticker').textContent = tickerMessages[tickerIndex];
    tickerIndex = (tickerIndex + 1) % tickerMessages.length;
    setTimeout(updateTicker, 6000);
}
updateTicker();

const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const commands = {
    'help': 'Available commands: help, hack, status, clear',
    'hack': 'Initiating hack... Access denied. Upgrade your clearance.',
    'status': 'Grid online. 47 nodes active. Threat level: Low.',
    'clear': ''
};
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim().toLowerCase();
        terminalOutput.innerHTML += `<p class="terminal-output">> ${input}</p>`;
        terminalOutput.innerHTML += `<p class="terminal-output">${commands[input] || 'Error: Command not found. Type "help" for options.'}</p>`;
        if (input === 'clear') terminalOutput.innerHTML = '';
        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 10,
        speed: 600,
        glare: true,
        'max-glare': 0.3
    });
});

const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));