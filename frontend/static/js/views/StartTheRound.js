import AbstractView from "./AbstractView.js";
import { updateGameState } from "../gameState.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Que comece a rodada!");
    }

    resetGameState() {
        // Atualiza o estado global com o índice inicial (zerado)
        updateGameState({
            currentPlayerIndex: 0, // Reseta o índice
        });
        // Log para verificar se o estado foi resetado
        console.log("Estado do jogo reiniciado. Jogadores mantidos.");
    }

    async getHtml() {
        // Reseta o jogo ao carregar a View
        this.resetGameState();

        return `
            <div class="gecko_view gecko_view_start">
                <div class="gecko_wrap_start">
                    <img src="static/assets/profile-question.png" alt="">
                    <span class="gecko_title">Que os jogos comecem!</span>
                    <p class="gecko_text gecko_text_bold">Hora de descobrir quem é o impostor!</p>
                </div>
                <a class="gecko_button_main" href="Themes" class="gecko_button_bottom">Nova Rodada!</a>
                <a class="gecko_button_secondary" href="WhoWillPlay" class="gecko_button_bottom">Voltar ao Início!</a>
            </div>
        `;
    }
}
