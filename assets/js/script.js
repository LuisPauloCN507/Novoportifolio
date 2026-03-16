async function getRepositories() {
    const user = 'LuisPauloCN507';
    const url = `https://api.github.com/users/${user}/repos?sort=updated`;

    try {
        const response = await fetch(url);
        const repos = await response.json();
        const repoList = document.getElementById('repo-list');
        
        repoList.innerHTML = '';

        // Filtra para não repetir os que já estão em destaque e o repo do portfólio
        const exclude = ['note-keeper', 'focus-timer', 'dev-finder', 'Novoportifolio', user];
        
        repos
            .filter(repo => !exclude.includes(repo.name))
            .slice(0, 4) // Mostra os 4 mais recentes do GitHub
            .forEach(repo => {
                repoList.innerHTML += `
                    <article class="project-card">
                        <div>
                            <h3>${repo.name.replace(/-/g, ' ')}</h3>
                            <p>${repo.description || 'Explorando novas tecnologias e lógica de programação.'}</p>
                            <div class="project-tags"><span>${repo.language || 'Editor'}</span></div>
                        </div>
                        <a href="${repo.html_url}" target="_blank" class="btn-link">Ver Código GitHub</a>
                    </article>
                `;
            });
    } catch (e) {
        document.getElementById('repo-list').innerHTML = '<p>GitHub offline no momento.</p>';
    }
}
getRepositories();