// --- EFEITO TYPEWRITER ---
const textElement = document.getElementById('typing-text');
const phrases = ["Paulo", "Developer", "Front-end", "Linux User"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        speed = 1500; // Pausa no final
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// --- BUSCA GITHUB ---
async function getRepositories() {
    const user = 'LuisPauloCN507';
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos?sort=updated`);
        const repos = await response.json();
        const repoList = document.getElementById('repo-list');
        repoList.innerHTML = '';

        const exclude = ['note-keeper', 'focus-timer', 'dev-finder', 'Novoportifolio', user];
        
        repos.filter(repo => !exclude.includes(repo.name)).slice(0, 4).forEach(repo => {
            repoList.innerHTML += `
                <article class="project-card">
                    <div>
                        <h3>${repo.name.replace(/-/g, ' ')}</h3>
                        <p>${repo.description || 'Explorando novas tecnologias.'}</p>
                        <div class="project-tags"><span>${repo.language || 'HTML'}</span></div>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="btn-link">Ver Código GitHub</a>
                </article>`;
        });
    } catch (e) { repoList.innerHTML = '<p>Erro ao carregar repositórios.</p>'; }
}

// Iniciar tudo ao carregar
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    getRepositories();
});