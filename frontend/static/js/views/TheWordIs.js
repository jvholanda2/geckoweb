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

        // Verifica se todos os jogadores já passaram
        if (this.currentPlayerIndex >= this.players.length) {
            window.location.href = "StartTheRound"; // Redireciona para a tela final
            return "";
        }

        const currentPlayer = this.players[this.currentPlayerIndex];
        const { theme, word } = this.selectedThemeAndWord;

        // Exibição da palavra para o jogador atual
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
                            ? "Você é o impostor! Finja que sabe a palavra!" 
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
                const nextIndex = this.currentPlayerIndex + 1;
                const gameState = getGameState();
                gameState.currentPlayerIndex = nextIndex;

                updateGameState(gameState);

                // Verifica se chegou ao fim
                if (nextIndex >= this.players.length) {
                    window.location.href = "StartTheRound"; // Redireciona para a tela final
                } else {
                    window.location.href = "PassThePhoneTo"; // Redireciona para o próximo jogador
                }
            });
        }
    }

    async init() {
        await this.setupEventListeners();
    }
}
