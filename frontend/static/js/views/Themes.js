// import AbstractView from "./AbstractView.js";

// export default class from extends AbstractView {
//     constructor(){
//         super();
//         this.setTitle("Escolha o tema...");
//     }  

//     setTitle(title) {
//         document.title = title;
//     }

//     async getHtml() {
//         return `
//             <div class="gecko_view">
//                 <div class="gecko_wrap">
//                     <h2 class="gecko_title">Escolha os temas da rodada</h2>
//                     <p class="gecko_text">A palavra será sorteada dos temas que você escolher abaixo:</p>
//                     <div id="gecko_list_themes">
//                         <div class="gecko_list_themes_item">
//                             <img src="static/assets/places.png" alt="">
//                             <p class="gecko_title">Locais</p>
//                         </div>
//                         <div class="gecko_list_themes_item">
//                             <img src="static/assets/famous.png" alt="">
//                             <p class="gecko_title">Famosos</p>
//                         </div>
//                         <div class="gecko_list_themes_item">
//                             <img src="static/assets/animals.png" alt="">
//                             <p class="gecko_title">Animals</p>
//                         </div>
//                         <div class="gecko_list_themes_item">
//                             <img src="static/assets/characters.png" alt="">
//                             <p class="gecko_title">Personagens</p>
//                         </div>
//                         <div class="gecko_list_themes_item">
//                             <img src="static/assets/places.png" alt="">
//                             <p class="gecko_title">Locais</p>
//                         </div>
//                         <div class="gecko_list_themes_item">
//                             <img src="static/assets/famous.png" alt="">
//                             <p class="gecko_title">Famosos</p>
//                         </div>
//                         <div class="gecko_list_themes_item">
//                             <img src="static/assets/animals.png" alt="">
//                             <p class="gecko_title">Animals</p>
//                         </div>
//                         <div class="gecko_list_themes_item">
//                             <img src="static/assets/characters.png" alt="">
//                             <p class="gecko_title">Personagens</p>
//                         </div>
//                     </div>
//                     <a class="gecko_button_main" href="PassThePhoneTo" id="gecko_button_bottom">Jogar</a>
//                 </div>
//             </div>
//         `; 
//     }
// }

import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor(){
        super();
        this.setTitle("Escolha o tema...");
        this.selectedThemes = []; // Armazena os temas selecionados
    }  

    setTitle(title) {
        document.title = title;
    }

    // Função para alternar a seleção do tema
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
                        <!-- Adicione os outros temas conforme necessário -->
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
    }

    async init() {
        await this.setupEventListeners();
        this.togglePlayButton(); // Inicializa o estado do botão corretamente
    }
}
