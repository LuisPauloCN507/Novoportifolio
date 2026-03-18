// --- EFEITO DE CODIFICAÇÃO (DECRYPTION) ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
let interval = null;

function startCodingEffect(element) {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
        element.innerText = element.innerText.split("").map((letter, index) => {
            if (index < iteration) return element.dataset.value[index];
            return letters[Math.floor(Math.random() * letters.length)];
        }).join("");
        if (iteration >= element.dataset.value.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}

// --- BUSCA REPOSITÓRIOS GITHUB COM ÍCONE DO GITHUB ---
async function getRepositories() {
    const user = 'LuisPauloCN507';
    const repoList = document.getElementById('repo-list');
    
    const langMap = {
        'JavaScript': 'js', 'HTML': 'html', 'CSS': 'css',
        'Python': 'py', 'Go': 'go', 'C++': 'cpp', 'C': 'c', 'TypeScript': 'ts'
    };

    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos?sort=updated`);
        const repos = await response.json();
        
        if (repoList) repoList.innerHTML = ''; 

        const exclude = ['note-keeper', 'focus-timer', 'dev-finder', 'Novoportifolio', user];

        repos.filter(repo => !exclude.includes(repo.name)).slice(0, 4).forEach(repo => {
            const iconKey = langMap[repo.language] || 'code';
            const iconUrl = `https://skillicons.dev/icons?i=${iconKey}`;

            repoList.innerHTML += `
                <article class="project-card">
                    <div>
                        <h3>${repo.name.replace(/-/g, ' ')}</h3>
                        <p>${repo.description || 'Projeto em desenvolvimento.'}</p>
                        <div class="project-tags">
                            <img src="${iconUrl}" alt="${repo.language}">
                        </div>
                    </div>
                    <div style="margin-top: 20px;">
                        <a href="${repo.html_url}" target="_blank" class="github-icon-link">
                            <img src="https://skillicons.dev/icons?i=github" alt="GitHub" style="width: 32px;">
                        </a>
                    </div>
                </article>`;
        });
    } catch (e) {
        if (repoList) repoList.innerHTML = '<p class="loading-text">Erro ao carregar repositórios.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector("#coding-name");
    if (nameElement) {
        startCodingEffect(nameElement);
        nameElement.onmouseover = event => startCodingEffect(event.target);
    }
    getRepositories();
});