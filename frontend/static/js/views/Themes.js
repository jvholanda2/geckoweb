import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Escolha o tema...");
        this.selectedThemes = []; 
        this.themeWords = { 
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

        if (isSelected) {
            themeElement.classList.remove("selected");
            
            this.selectedThemes = this.selectedThemes.filter(theme => theme !== themeName);
        } else {
            themeElement.classList.add("selected");
            this.selectedThemes.push(themeName);
        }

        localStorage.setItem("selectedThemes", JSON.stringify(this.selectedThemes));

        console.log("Temas selecionados:", this.selectedThemes);

        this.togglePlayButton();
    }

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

    drawRandomWord() {
        if (this.selectedThemes.length === 0) return;

        const randomTheme = this.selectedThemes[Math.floor(Math.random() * this.selectedThemes.length)];
        const words = this.themeWords[randomTheme];
        const randomWord = words[Math.floor(Math.random() * words.length)];
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
        const themeItems = document.querySelectorAll(".gecko_list_themes_item");
        themeItems.forEach((item) => {
            const themeName = item.querySelector(".gecko_title").textContent;
            item.addEventListener("click", () => {
                this.toggleThemeSelection(item, themeName);
            });
        });

        const playButton = document.querySelector("#gecko_button_bottom");
        playButton.addEventListener("click", () => {
            this.drawRandomWord();
        });
    }


    async init() {
       
        this.selectedThemes = JSON.parse(localStorage.getItem("selectedThemes")) || [];
        console.log("Temas previamente selecionados:", this.selectedThemes);
    
       
        const players = JSON.parse(localStorage.getItem("players")) || [];
        console.log("Jogadores armazenados:", players); 
    
        const themeItems = document.querySelectorAll(".gecko_list_themes_item");
        themeItems.forEach((item) => {
            const themeName = item.querySelector(".gecko_title").textContent;
            if (this.selectedThemes.includes(themeName)) {
                item.classList.add("selected");
            }
        });
    
        await this.setupEventListeners();
        this.togglePlayButton(); 
    }
    
}








