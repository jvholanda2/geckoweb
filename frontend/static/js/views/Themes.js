import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Escolha o tema...");
        this.selectedThemes = []; // Armazena os temas selecionados
        this.themeWords = { // Dicionário de palavras relacionadas a cada tema
            Locais: ["Praia", "Montanha", "Cidade", "Floresta", "Deserto", "Rio", "Vulcão", "Cachoeira", "Lago", "Caverna"],
            Famosos: ["Beyoncé", "Elon Musk", "Messi", "Rihanna", "Oprah", "Shakira", "Taylor Swift", "Leonardo DiCaprio", "Cristiano Ronaldo", "Angelina Jolie"],
            Animals: ["Cachorro", "Gato", "Leão", "Tigre", "Elefante", "Girafa", "Jacaré", "Cavalo", "Panda", "Urso"],
            Personagens: ["Homem-Aranha", "Harry Potter", "Mickey Mouse", "Sherlock Holmes", "Darth Vader", "Superman", "Mulher Maravilha", "Batman", "Hulk", "Capitão América"]
        };
    }

    setTitle(title) {
        document.title = title;
    }

    toggleThemeSelection(themeElement, themeName) {
        const isSelected = themeElement.classList.contains("selected");

        // Adiciona ou remove a borda do item
        if (isSelected) {
            themeElement.classList.remove("selected");
            // Remove o tema da lista de selecionados
            this.selectedThemes = this.selectedThemes.filter(theme => theme !== themeName);
        } else {
            themeElement.classList.add("selected");
            // Adiciona o tema à lista de selecionados
            this.selectedThemes.push(themeName);
        }

        // Salva os temas selecionados no localStorage
        localStorage.setItem("selectedThemes", JSON.stringify(this.selectedThemes));

        console.log("Temas selecionados:", this.selectedThemes);

        // Habilita ou desabilita o botão de jogar dependendo do número de temas selecionados
        this.togglePlayButton();
    }

    // Função para habilitar/desabilitar o botão "Jogar"
    togglePlayButton() {
        const playButton = document.querySelector("#gecko_button_bottom");
        if (this.selectedThemes.length > 0) {
            playButton.removeAttribute("disabled");
            playButton.classList.remove("disabled");
        } else {
            playButton.setAttribute("disabled", "true");
            playButton.classList.add("disabled");
        }
    }

    // Função para sortear um tema e uma palavra
    drawRandomWord() {
        if (this.selectedThemes.length === 0) return;

        // Escolhe um tema aleatório entre os selecionados
        const randomTheme = this.selectedThemes[Math.floor(Math.random() * this.selectedThemes.length)];

        // Escolhe uma palavra aleatória do tema selecionado
        const words = this.themeWords[randomTheme];
        const randomWord = words[Math.floor(Math.random() * words.length)];

        // Armazena o tema e a palavra sorteados no localStorage
        localStorage.setItem("selectedThemeAndWord", JSON.stringify({ theme: randomTheme, word: randomWord }));

        console.log("Tema e palavra sorteados:", { theme: randomTheme, word: randomWord });
    }

    async getHtml() {
        return `
            <div class="gecko_view">
                <div class="gecko_wrap">
                    <h2 class="gecko_title">Escolha os temas da rodada</h2>
                    <p class="gecko_text">A palavra será sorteada dos temas que você escolher abaixo:</p>
                    <div id="gecko_list_themes">
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/places.png" alt="">
                            <p class="gecko_title">Locais</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/famous.png" alt="">
                            <p class="gecko_title">Famosos</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/animals.png" alt="">
                            <p class="gecko_title">Animals</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/characters.png" alt="">
                            <p class="gecko_title">Personagens</p>
                        </div>
                    </div>
                    <a class="gecko_button_main disabled" href="PassThePhoneTo" id="gecko_button_bottom" disabled>Jogar</a>
                </div>
            </div>
        `;
    }

    async setupEventListeners() {
        // Adiciona o evento de clique para cada item de tema
        const themeItems = document.querySelectorAll(".gecko_list_themes_item");
        themeItems.forEach((item) => {
            const themeName = item.querySelector(".gecko_title").textContent;
            item.addEventListener("click", () => {
                this.toggleThemeSelection(item, themeName);
            });
        });

        // Adiciona evento ao botão "Jogar"
        const playButton = document.querySelector("#gecko_button_bottom");
        playButton.addEventListener("click", () => {
            this.drawRandomWord();
        });
    }

    async init() {
        // Recupera os temas selecionados do localStorage
        this.selectedThemes = JSON.parse(localStorage.getItem("selectedThemes")) || [];
        console.log("Temas previamente selecionados:", this.selectedThemes);

        // Atualiza a interface com os temas previamente selecionados
        const themeItems = document.querySelectorAll(".gecko_list_themes_item");
        themeItems.forEach((item) => {
            const themeName = item.querySelector(".gecko_title").textContent;
            if (this.selectedThemes.includes(themeName)) {
                item.classList.add("selected");
            }
        });

        await this.setupEventListeners();
        this.togglePlayButton(); // Inicializa o estado do botão corretamente
    }
}



