/* ==========================================
   1. EFEITO HACKER NO NOME
   ========================================== */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function startCodingEffect(element) {
    let iteration = 0;
    const interval = setInterval(() => {
        element.innerText = element.innerText.split("").map((letter, index) => {
            if (index < iteration) return element.dataset.value[index];
            return letters[Math.floor(Math.random() * letters.length)];
        }).join("");
        
        if (iteration >= element.dataset.value.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}

/* ==========================================
   2. BUSCA DINÂMICA GITHUB
   ========================================== */
async function getRepositories() {
    const user = 'LuisPauloCN507';
    const repoList = document.getElementById('repo-list');
    const langMap = { 'JavaScript': 'js', 'HTML': 'html', 'CSS': 'css', 'Python': 'py', 'Go': 'go', 'C++': 'cpp', 'C': 'c', 'TypeScript': 'ts' };
    
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos?sort=updated`);
        const repos = await response.json();
        if (repoList) repoList.innerHTML = ''; 
        
        const exclude = ['note-keeper', 'focus-timer', 'dev-finder', 'Novoportifolio', user];

        repos.filter(repo => !exclude.includes(repo.name)).slice(0, 4).forEach(repo => {
            const iconKey = langMap[repo.language] || 'code';
            repoList.innerHTML += `
                <article class="project-card">
                    <div>
                        <h3>${repo.name.replace(/-/g, ' ')}</h3>
                        <p>${repo.description || 'Tecnologia de ponta e alta performance.'}</p>
                        <div class="project-tags">
                            <img src="https://skillicons.dev/icons?i=${iconKey}" style="height:28px;">
                        </div>
                    </div>
                    <div style="margin-top: 20px;">
                        <a href="${repo.html_url}" target="_blank" class="github-icon-link">
                            <img src="https://skillicons.dev/icons?i=github" alt="GitHub" style="width: 32px; filter: drop-shadow(0 0 5px var(--primary-color));">
                        </a>
                    </div>
                </article>`;
        });
    } catch (e) { console.error("Erro ao carregar GitHub:", e); }
}

/* ==========================================
   3. FUNDO DE PARTÍCULAS AZUIS
   ========================================== */
function initParticleBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 1.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 209, 255, 0.3)'; // AZUL NEON
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.strokeStyle = `rgba(0, 209, 255, ${(1 - dist/150) * 0.12})`; // LINHAS SUTIS
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { 
        setCanvasSize(); 
        particles = []; 
        for(let i=0; i<80; i++) particles.push(new Particle()); 
    });

    setCanvasSize();
    for(let i=0; i<80; i++) particles.push(new Particle());
    animate();
}

/* ==========================================
   4. INICIALIZAÇÃO
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector("#coding-name");
    if (el) { 
        startCodingEffect(el); 
        el.onmouseover = e => startCodingEffect(e.target); 
    }
    getRepositories();
    initParticleBackground();
});