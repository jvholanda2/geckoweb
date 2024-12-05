// import AbstractView from "./AbstractView.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("Passe o Telefone Para:");
//         this.players = []; // Lista de jogadores
//         this.selectedThemeAndWord = null; // Tema e palavra sorteados
//     }

//     setTitle(title) {
//         document.title = title;
//     }

//     // Função para carregar os dados do localStorage
//     loadGameData() {
//         this.players = JSON.parse(localStorage.getItem("players")) || [];
//         this.selectedThemeAndWord = JSON.parse(localStorage.getItem("selectedThemeAndWord")) || null;
//     }

//     async getHtml() {
//         this.loadGameData(); // Carrega os dados necessários

//         // Verifica se há jogadores e tema/palavra
//         if (!this.players.length || !this.selectedThemeAndWord) {
//             return `
//                 <div class="gecko_view">
//                     <div class="gecko_wrap">
//                         <h2 class="gecko_title">Erro</h2>
//                         <p class="gecko_text">Não foi possível carregar os dados do jogo. Verifique se todas as etapas foram completadas.</p>
//                         <a class="gecko_button_main" href="/">Voltar ao início</a>
//                     </div>
//                 </div>
//             `;
//         }

//         // Pega o primeiro jogador da lista para exibição inicial
//         const currentPlayer = this.players[0];
//         const { theme, word } = this.selectedThemeAndWord;

//         return `
//             <div class="gecko_view">
//                 <div class="gecko_wrap">
//                     <h2 class="gecko_title">Passe o celular para:</h2>
//                     <div class="gecko_name_eyes">
//                         <img src="static/assets/eyes.png" alt="">
//                         <span class="gecko_title">${currentPlayer}</span>
//                     </div>
//                     <p class="gecko_text">O tema sorteado é: <strong>${theme}</strong></p>
//                     <p class="gecko_text">A palavra é: <strong>${word}</strong></p>
//                     <a class="gecko_button_main gecko_button_bottom" href="TheWordIs" id="gecko_button_PassThePhone">Sim, eu sou ${currentPlayer}!</a>

//                 </div>
//             </div>
//         `;
//     }

//     async setupEventListeners() {
//         // Aqui você pode configurar eventos caso necessário
//         console.log("Eventos configurados");
//     }

//     async init() {
//         await this.setupEventListeners();
//     }
// }
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Passe o Telefone Para:");
        this.players = []; // Lista de jogadores
        this.selectedThemeAndWord = null; // Tema e palavra sorteados
    }

    setTitle(title) {
        document.title = title;
    }

    // Função para carregar os dados do localStorage
    loadGameData() {
        this.players = JSON.parse(localStorage.getItem("players")) || [];
        this.selectedThemeAndWord = JSON.parse(localStorage.getItem("selectedThemeAndWord")) || null;
    }

    logGameData() {
        console.log("Jogadores:", this.players);
        console.log("Tema e palavra sorteada:", this.selectedThemeAndWord);
    }

    async getHtml() {
        this.loadGameData(); // Carrega os dados necessários
        this.logGameData();  // Mostra os dados no console

        // Verifica se há jogadores e tema/palavra
        if (!this.players.length || !this.selectedThemeAndWord) {
            console.error("Erro: Não foi possível carregar os dados do jogo. Verifique se todas as etapas foram completadas.");
            return `
                <div class="gecko_view">
                    <div class="gecko_wrap">
                        <h2 class="gecko_title">Erro</h2>
                        <p class="gecko_text">Não foi possível carregar os dados do jogo. Verifique se todas as etapas foram completadas.</p>
                        <a class="gecko_button_main" href="/">Voltar ao início</a>
                    </div>
                </div>
            `;
        }

        // Pega o primeiro jogador da lista para exibição inicial
        const currentPlayer = this.players[0].name;

        return `
            <div class="gecko_view">
                <div class="gecko_wrap">
                    <h2 class="gecko_title">Passe o celular para:</h2>
                    <div class="gecko_name_eyes">
                        <img src="static/assets/eyes.png" alt="">
                        <span class="gecko_title">${currentPlayer}</span>
                    </div>
                    <p class="gecko_text">O tema sorteado é: <strong>${this.selectedThemeAndWord.theme}</strong></p>
                    <p class="gecko_text">A palavra é: <strong>${this.selectedThemeAndWord.word}</strong></p>
                    <a class="gecko_button_main gecko_button_bottom" href="TheWordIs" id="gecko_button_PassThePhone">Sim, eu sou ${currentPlayer}!</a>
                </div>
            </div>
        `;
    }

    async setupEventListeners() {
        // Aqui você pode configurar eventos caso necessário
        console.log("Eventos configurados");
    }

    async init() {
        await this.setupEventListeners();
    }
}
