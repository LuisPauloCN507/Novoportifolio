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

// --- BUSCA REPOSITÓRIOS GITHUB COM ÍCONES ---
async function getRepositories() {
    const user = 'LuisPauloCN507';
    const repoList = document.getElementById('repo-list');
    
    // Mapeia a linguagem do GitHub para o ID do Skill Icons
    const langMap = {
        'JavaScript': 'js',
        'HTML': 'html',
        'CSS': 'css',
        'Python': 'py',
        'Go': 'go',
        'C++': 'cpp',
        'C': 'c'
    };

    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos?sort=updated`);
        const repos = await response.json();
        repoList.innerHTML = ''; 

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
                    <div style="margin-top: 15px;">
                        <a href="${repo.html_url}" target="_blank" style="color: var(--primary-color); text-decoration: none; border-bottom: 1px solid var(--primary-color); font-size: 0.8rem;">Código GitHub</a>
                    </div>
                </article>`;
        });
    } catch (e) {
        repoList.innerHTML = '<p>Erro ao carregar repositórios.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector("#coding-name");
    startCodingEffect(nameElement);
    getRepositories();
    nameElement.onmouseover = event => startCodingEffect(event.target);
});