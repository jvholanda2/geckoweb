import AbstractView from "./AbstractView.js";
import { updateGameState, getGameState } from "../gameState.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Passe o Telefone Para:");
        this.players = [];
        this.selectedThemeAndWord = null;
        this.currentPlayerIndex = 0;
    }

    loadGameData() {
        const gameState = getGameState();
        this.players = JSON.parse(localStorage.getItem("players")) || [];
        this.selectedThemeAndWord = JSON.parse(localStorage.getItem("selectedThemeAndWord")) || null;
        this.currentPlayerIndex = gameState.currentPlayerIndex || 0;

        // Garantir que o currentPlayerIndex é válido
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;  // Ou outro valor válido
        }
    }

    async getHtml() {
        this.loadGameData();

        if (!this.players.length || !this.selectedThemeAndWord) {
            console.error("Erro: Dados do jogo não carregados corretamente.");
            return `
                <div class="gecko_view">
                    <div class="gecko_wrap">
                        <h2 class="gecko_title">Erro</h2>
                        <p class="gecko_text">Não foi possível carregar os dados do jogo.</p>
                        <a class="gecko_button_main" href="/">Voltar ao início</a>
                    </div>
                </div>
            `;
        }

        const currentPlayer = this.players[this.currentPlayerIndex];

        if (!currentPlayer || !currentPlayer.name) {
            console.error("Erro: Jogador atual não definido ou sem nome.");
            return `
                <div class="gecko_view">
                    <div class="gecko_wrap">
                        <h2 class="gecko_title">Erro</h2>
                        <p class="gecko_text">Não foi possível determinar o jogador atual.</p>
                        <a class="gecko_button_main" href="/">Voltar ao início</a>
                    </div>
                </div>
            `;
        }

        const { theme, word } = this.selectedThemeAndWord;

        return `
            <div class="gecko_view">
                <div class="gecko_wrap">
                    <h2 class="gecko_title">Passe o celular para:</h2>
                    <div class="gecko_name_eyes">
                        <img src="static/assets/eyes.png" alt="">
                        <span class="gecko_title">${currentPlayer.name}</span>
                    </div>
                    <p class="gecko_text">O tema sorteado é: <strong>${theme}</strong></p>
                    <p class="gecko_text">A palavra é: <strong>${word}</strong></p>
                    <a class="gecko_button_main gecko_button_bottom" id="confirmPlayer">Sim, eu sou ${currentPlayer.name}!</a>
                </div>
            </div>
        `;
    }

    async setupEventListeners() {
        const confirmButton = document.getElementById("confirmPlayer");
        if (confirmButton) {
            confirmButton.addEventListener("click", () => {
                // Não muda o índice aqui, ele será alterado quando o jogador ver a palavra
                window.location.href = "TheWordIs"; // Vai para a tela onde a palavra será mostrada
            });
        }
    }

    async init() {
        await this.setupEventListeners();
    }
}