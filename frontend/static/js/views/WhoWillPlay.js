import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Quem vai jogar?");
        this.players = JSON.parse(localStorage.getItem("players")) || []; // Carrega os jogadores do localStorage
    }

    setTitle(title) {
        document.title = title;
    }

    addPlayer(playerName) {
        playerName = playerName.trim();

        // Verifica se o nome do jogador não está vazio e não é duplicado
        if (playerName !== "" && !this.players.some(player => player.name === playerName)) {
            // Adiciona o jogador na lista, sem definir ainda o impostor
            const player = { name: playerName };
            this.players.unshift(player); // Adiciona o jogador no início da lista

            localStorage.setItem("players", JSON.stringify(this.players)); // Salva a lista no localStorage
            this.renderPlayers(); // Re-renderiza a lista de jogadores
            this.togglePlayButton(); // Atualiza o estado do botão "Jogar"

            // Mostra a lista atualizada de jogadores no console
            console.log("Jogadores atuais:", this.players);
        } else {
            alert("Jogador inválido ou nome duplicado!"); // Feedback ao usuário
        }
    }

    removePlayer(index) {
        this.players.splice(index, 1); // Remove o jogador da lista
        localStorage.setItem("players", JSON.stringify(this.players)); // Atualiza no localStorage
        this.renderPlayers(); // Re-renderiza a lista de jogadores
        this.togglePlayButton(); // Atualiza o estado do botão "Jogar"
    }

    togglePlayButton() {
        const playButton = document.querySelector(".gecko_button_bottom");
        // Habilita o botão "Jogar" quando houver 3 ou mais jogadores
        if (this.players.length >= 3) {
            playButton.removeAttribute("disabled");
            playButton.classList.remove("disabled");
        } else {
            playButton.setAttribute("disabled", "true");
            playButton.classList.add("disabled");
        }
    }

    renderPlayers() {
        const playersList = document.querySelector("#gecko_players_list");
        playersList.innerHTML = ""; // Limpa a lista atual

        // Renderiza a lista de jogadores na ordem correta (do início para o final)
        this.players.forEach((player, index) => {
            const playerDiv = document.createElement("div");
            playerDiv.className = "gecko_players_list_item";
            playerDiv.innerHTML = `
                <p>${player.name}</p>
                <img src="static/assets/x.png" alt="Remover" data-index="${index}" style="cursor: pointer;">`;
            playersList.appendChild(playerDiv);
        });

        // Adiciona event listeners para remover jogadores
        document.querySelectorAll("#gecko_players_list img").forEach(img => {
            img.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                this.removePlayer(index);
            });
        });
    }

    // Lógica para determinar se o jogador será impostor
    assignImpostor() {
        const playerCount = this.players.length;

        // Garante que há um impostor se houver 3 ou mais jogadores
        if (playerCount >= 3) {
            const impostorIndex = Math.floor(Math.random() * playerCount);
            this.players[impostorIndex].impostor = true; // Atribui o impostor aleatoriamente

            // Marca outros jogadores como não impostores
            this.players.forEach((player, index) => {
                if (index !== impostorIndex) {
                    player.impostor = false;
                }
            });

            localStorage.setItem("players", JSON.stringify(this.players)); // Atualiza no localStorage
            console.log("Jogadores com impostor:", this.players);
        } else {
            alert("É necessário pelo menos 3 jogadores para iniciar o jogo com impostor!");
        }
    }

    async getHtml() {
        return `
            <div class="gecko_view">
                <div class="gecko_div_title">
                    <h1 id="gecko_div_title_title" class="gecko_title">GeckoWeb MVP</h1>
                </div>
                <div class="gecko_wrap">
                    <h2 class="gecko_title">Quem vai jogar?</h2>
                    <p class="gecko_text">Coloque aqui o nome do jogador que quer adicionar:</p>
                    <input id="gecko_input_player" class="gecko_input" type="text" placeholder="Nome do jogador">
                    <button id="gecko_button_add_player" class="gecko_button_main">Adicionar</button>

                    <h2 class="gecko_title">Participantes</h2>
                    <p class="gecko_text">Aqui estão todos os participantes até o momento:</p>
                    <div id="gecko_players_list"></div>
                    
                    <a class="gecko_button_main gecko_button_bottom disabled" href="Themes" id="gecko_button_WhoWillPlay" disabled>Jogar</a>
                </div>
            </div>
        `;
    }

    async setupEventListeners() {
        document.querySelector("#gecko_button_add_player").addEventListener("click", () => {
            const input = document.querySelector("#gecko_input_player");
            this.addPlayer(input.value); // Adiciona o jogador
            input.value = ""; // Limpa o input após adicionar
        });

        document.querySelector("#gecko_button_WhoWillPlay").addEventListener("click", () => {
            this.assignImpostor(); // Atribui o impostor ao clicar em "Jogar"
        });
    }

    async init() {
        this.renderPlayers(); // Renderiza a lista de jogadores carregada
        await this.setupEventListeners(); // Configura os eventos
    }
}
