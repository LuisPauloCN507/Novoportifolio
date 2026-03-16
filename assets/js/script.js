const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
let interval = null;

function startCodingEffect(element) {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
        element.innerText = element.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return element.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        if (iteration >= element.dataset.value.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3; // Velocidade da decodificação
    }, 30);
}

// Inicia o efeito ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector("#coding-name");
    startCodingEffect(nameElement);

    // Efeito extra: Reinicia ao passar o mouse por cima
    nameElement.onmouseover = event => {
        startCodingEffect(event.target);
    };
});