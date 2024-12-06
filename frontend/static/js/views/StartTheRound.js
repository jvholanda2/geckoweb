import AbstractView from "./AbstractView.js";
import { updateGameState } from "../gameState.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Que comece a rodada!");
    }

    // Função para resetar o jogo e atribuir impostores
    resetGameState() {
        // Recupera os jogadores do localStorage
        let players = JSON.parse(localStorage.getItem("players")) || [];

        // Se houver jogadores, atribuímos impostores
        if (players.length > 0) {
            // Reseta todos os jogadores como não impostores
            players = players.map(player => ({
                ...player,
                impostor: false
            }));

            // Calcula quantos impostores devem ser atribuídos
            const numberOfImpostors = Math.max(Math.floor(players.length / 4), 1); // Garantir pelo menos 1 impostor
            console.log("Número de impostores:", numberOfImpostors);

            // Atribui aleatoriamente os impostores
            const impostorIndexes = [];
            while (impostorIndexes.length < numberOfImpostors) {
                const randomIndex = Math.floor(Math.random() * players.length);
                if (!impostorIndexes.includes(randomIndex)) {
                    impostorIndexes.push(randomIndex);
                    players[randomIndex].impostor = true;
                }
            }

            // Armazena os jogadores atualizados com os impostores no localStorage
            localStorage.setItem("players", JSON.stringify(players));

            // Log para depuração
            console.log("Impostores atribuídos:", impostorIndexes.map(index => players[index].name));
        }

        // Reseta o estado global com o índice inicial
        updateGameState({
            currentPlayerIndex: 0, // Reseta o índice para a rodada começar
        });

        console.log("Estado do jogo reiniciado.");
    }

    async getHtml() {
        // Reseta o jogo e atribui impostores ao carregar a View
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
