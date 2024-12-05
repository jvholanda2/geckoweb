// import AbstractView from "./AbstractView.js";
// import { updateGameState, getGameState } from "../gameState.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("A palavra é:");
//         this.players = [];
//         this.selectedThemeAndWord = null;
//         this.currentPlayerIndex = 0;
//     }

//     loadGameData() {
//         const gameState = getGameState();
//         this.players = JSON.parse(localStorage.getItem("players")) || [];
//         this.selectedThemeAndWord = JSON.parse(localStorage.getItem("selectedThemeAndWord")) || null;
//         this.currentPlayerIndex = gameState.currentPlayerIndex || 0;
//     }

//     async getHtml() {
//         this.loadGameData();

//         if (this.currentPlayerIndex >= this.players.length) {
//             window.location.href = "RoundStart"; // Redireciona para reiniciar o jogo quando acabar os jogadores
//             return "";
//         }

//         const currentPlayer = this.players[this.currentPlayerIndex];
//         const { theme, word } = this.selectedThemeAndWord;

//         return `
//             <div class="gecko_view gecko_view_word">
//                 <div class="gecko_wrap">
//                     <span class="gecko_title">${currentPlayer.name}</span>
//                     <p class="gecko_text gecko_text_bold">A palavra da rodada é:</p>
//                     <div class="gecko_word">
//                         <span class="gecko_title">${currentPlayer.isImpostor ? "O Impostor" : word}</span>
//                     </div>
//                     <p class="gecko_text gecko_text_bold">${currentPlayer.isImpostor ? 
//                         "Fingir que você sabe a palavra!" : "Boa sorte na rodada!"}</p>
//                 </div>
//                 <a class="gecko_button_main gecko_button_bottom" id="nextPlayer">Entendido!</a>
//             </div>
//         `;
//     }

//     async setupEventListeners() {
//         const nextButton = document.getElementById("nextPlayer");
//         if (nextButton) {
//             nextButton.addEventListener("click", () => {
//                 // Incrementa o índice após o jogador ver a palavra
//                 const nextIndex = (this.currentPlayerIndex + 1) % this.players.length;
//                 updateGameState({ currentPlayerIndex: nextIndex });

//                 // Redireciona para a próxima tela (onde o telefone é passado para o próximo jogador)
//                 window.location.href = "PassThePhoneTo";
//             });
//         }
//     }

//     async init() {
//         await this.setupEventListeners();
//     }
// }

import AbstractView from "./AbstractView.js";
import { updateGameState, getGameState } from "../gameState.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("A palavra é:");
        this.players = [];
        this.selectedThemeAndWord = null;
        this.currentPlayerIndex = 0;
    }

    loadGameData() {
        const gameState = getGameState();
        this.players = JSON.parse(localStorage.getItem("players")) || [];
        this.selectedThemeAndWord = JSON.parse(localStorage.getItem("selectedThemeAndWord")) || null;
        this.currentPlayerIndex = gameState.currentPlayerIndex || 0;
    }

    async getHtml() {
        this.loadGameData();

        if (this.currentPlayerIndex >= this.players.length) {
            window.location.href = "RoundStart"; // Se o índice for maior que o número de jogadores, reinicia o jogo
            return "";
        }

        const currentPlayer = this.players[this.currentPlayerIndex];
        const { theme, word } = this.selectedThemeAndWord;

        // Exibição do jogador atual
        return `
            <div class="gecko_view gecko_view_word">
                <div class="gecko_wrap">
                    <span class="gecko_title">${currentPlayer.name}</span>
                    <p class="gecko_text gecko_text_bold">A palavra da rodada é:</p>
                    <div class="gecko_word">
                        <span class="gecko_title">
                            ${currentPlayer.isImpostor ? "Impostor" : word}
                        </span>
                    </div>
                    <p class="gecko_text gecko_text_bold">
                        ${currentPlayer.isImpostor 
                            ? "Você é o impostor! Fingir que você sabe a palavra!" 
                            : "Boa sorte na rodada!"}
                    </p>
                </div>
                <a class="gecko_button_main gecko_button_bottom" id="nextPlayer">Entendido!</a>
            </div>
        `;
    }

    async setupEventListeners() {
        const nextButton = document.getElementById("nextPlayer");
        if (nextButton) {
            nextButton.addEventListener("click", () => {
                // Atualiza o índice do jogador para o próximo
                const nextIndex = (this.currentPlayerIndex + 1) % this.players.length; // Garante que volta para o primeiro jogador
                updateGameState({ currentPlayerIndex: nextIndex });
                window.location.href = "PassThePhoneTo"; // Redireciona para a tela onde passa o telefone para o próximo jogador
            });
        }
    }

    async init() {
        await this.setupEventListeners();
    }
}
