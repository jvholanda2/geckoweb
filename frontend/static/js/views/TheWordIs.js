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

        this.players = this.players.map(player => ({
            ...player,
            impostor: player.impostor === "true" || player.impostor === true
        }));

        console.log("Jogadores após conversão de impostor:", this.players);

        this.selectedThemeAndWord = JSON.parse(localStorage.getItem("selectedThemeAndWord")) || null;
        this.currentPlayerIndex = gameState.currentPlayerIndex || 0;
    }

    async getHtml() {
        this.loadGameData();

        if (this.currentPlayerIndex >= this.players.length) {
            window.location.href = "StartTheRound"; 
            return "";
        }

        const currentPlayer = this.players[this.currentPlayerIndex];
        const { word } = this.selectedThemeAndWord;
        const impostor = currentPlayer.impostor;
        const wordDisplay = impostor ? "Impostor" : word;

        const impostorMessage = impostor
            ? "Você é o impostor! Finja que sabe a palavra!"
            : `A palavra da rodada é: <strong>${word}</strong>`;

        console.log(currentPlayer.name, "impostor:", impostor, "word:", word);
        console.log("Índice do jogador atual:", this.currentPlayerIndex);

        return `
            <div class="gecko_view gecko_view_word">
                <div class="gecko_wrap">
                    <span class="gecko_title">${currentPlayer.name}</span>
                    <p class="gecko_text gecko_text_bold">${impostorMessage}</p>
                    <div class="gecko_word">
                        <span class="gecko_title">
                            ${wordDisplay}
                        </span>
                    </div>
                    <p class="gecko_text gecko_text_bold">
                        ${impostor
                            ? "Finja que você sabe a palavra!"
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

                if (nextIndex >= this.players.length) {
                    window.location.href = "StartTheRound"; 
                } else {
                    window.location.href = "PassThePhoneTo"; 
                }
            });
        }
    }

    async init() {
        await this.setupEventListeners();
    }
}
