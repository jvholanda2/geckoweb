import AbstractView from "./AbstractView.js";
import { updateGameState } from "../gameState.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Que comece a rodada!");
    }

    resetGameState() {
        let players = JSON.parse(localStorage.getItem("players")) || [];

        if (players.length > 0) {
            players = players.map(player => ({
                ...player,
                impostor: false
            }));
            const numberOfImpostors = Math.max(Math.floor(players.length / 4), 1);
            console.log("Número de impostores:", numberOfImpostors);

            const impostorIndexes = [];
            while (impostorIndexes.length < numberOfImpostors) {
                const randomIndex = Math.floor(Math.random() * players.length);
                if (!impostorIndexes.includes(randomIndex)) {
                    impostorIndexes.push(randomIndex);
                    players[randomIndex].impostor = true;
                }
            }

            localStorage.setItem("players", JSON.stringify(players));

            console.log("Impostores atribuídos:", impostorIndexes.map(index => players[index].name));
        }

        updateGameState({
            currentPlayerIndex: 0,
        });

        console.log("Estado do jogo reiniciado.");
    }

    async getHtml() {
        this.resetGameState();

        return `
            <div class="gecko_view gecko_view_start">
                <div class="gecko_wrap_start">
                    <img src="static/assets/profile-question.png" alt="">
                    <span class="gecko_title">Que os jogos comecem!</span>
                    <p class="gecko_text gecko_text_bold gecko_margin_bottom_end">Hora de descobrir quem é o impostor!</p>
                </div>
                <a class="gecko_button_main" href="Themes" class="gecko_button_bottom">Nova Rodada!</a>
                <a class="gecko_button_secondary" href="WhoWillPlay" class="gecko_button_bottom">Voltar ao Início!</a>
            </div>
        `;
    }
}
