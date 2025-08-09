import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Quem vai jogar?");
        this.players = JSON.parse(localStorage.getItem("players")) || []; 
    }

    setTitle(title) {
        document.title = title;
    }

    addPlayer(playerName) {
        playerName = playerName.trim();

        if (playerName !== "" && !this.players.some(player => player.name === playerName)) {
            const player = { name: playerName };
            this.players.unshift(player);
            localStorage.setItem("players", JSON.stringify(this.players));
            this.renderPlayers();
            this.togglePlayButton(); 
        } else {
            alert("Jogador inválido ou nome duplicado!"); 
        }
    }

    removePlayer(index) {
        this.players.splice(index, 1);
        localStorage.setItem("players", JSON.stringify(this.players)); 
        this.renderPlayers(); 
        this.togglePlayButton(); 
    }

    togglePlayButton() {
        const playButton = document.querySelector("#gecko_button_WhoWillPlay");
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
        playersList.innerHTML = ""; 

        this.players.forEach((player, index) => {
            const playerDiv = document.createElement("div");
            playerDiv.className = "gecko_players_list_item";
            playerDiv.innerHTML = `
                <p>${player.name}</p>
                <img src="static/assets/x.png" alt="Remover" data-index="${index}" style="cursor: pointer;">`;
            playersList.appendChild(playerDiv);
        });

      
        document.querySelectorAll("#gecko_players_list img").forEach(img => {
            img.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                this.removePlayer(index);
            });
        });
    }

    assignImpostor() {
        const playerCount = this.players.length;

        if (playerCount >= 3) {
            const impostorCount = Math.max(1, Math.floor(playerCount / 4));
            const impostorIndexes = [];
            while (impostorIndexes.length < impostorCount) {
                const randomIndex = Math.floor(Math.random() * playerCount);
                if (!impostorIndexes.includes(randomIndex)) {
                    impostorIndexes.push(randomIndex);
                }
            }

            this.players.forEach((player, index) => {
                player.impostor = impostorIndexes.includes(index);
            });

            localStorage.setItem("players", JSON.stringify(this.players));
        } else {
            alert("É necessário pelo menos 3 jogadores para iniciar o jogo com impostores!");
        }
    }

    resetImpostors() {
        this.players.forEach(player => {
            player.impostor = false; 
        });
        localStorage.setItem("players", JSON.stringify(this.players));
    }

    async getHtml() {
        return `
            <div class="gecko_view">
                <div class="gecko_div_title">
                    <h1 id="gecko_div_title_title" class="gecko_title">GeckoWeb MVP</h1>
                </div>
                <div class="gecko_wrap">
                    <h2 class="gecko_title">Quem vai jogar?</h2>
                    <p class="gecko_text">Coloque aqui o nome do jogador que deseja adicionar:</p>
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
            this.addPlayer(input.value);
            input.value = ""; 
        });

        document.querySelector("#gecko_button_WhoWillPlay").addEventListener("click", () => {
            this.resetImpostors(); 
            this.assignImpostor(); 
        });
    }

    async init() {
        this.renderPlayers();
        this.togglePlayButton(); 
        await this.setupEventListeners();
    }
}
