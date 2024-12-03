// import AbstractView from "./AbstractView.js";

// export default class from extends AbstractView {
//     constructor(){
//         super();
//         this.setTitle("Quem vai jogar?");
//         this.players = []
//     }  

//     setTitle(title) {
//         document.title = title;
//     }

//     addPlayer(player) {

//     }

//     async getHtml() {
//         return ` 
//             <div class="gecko_view">
//                 <div class="gecko_div_title">
//                     <h1 id="gecko_div_title_title" class="gecko_title">GeckoWeb MVP</h1>
//                 </div>
//                 <div class="gecko_wrap">
//                     <h2 class="gecko_title">Quem vai jogar?</h2>
//                     <p class="gecko_text">Coloque aqui o nome do jogador que quer adicionar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
//                     <input class="gecko_input" type="text" placeholder="">
//                     <button class="gecko_button_main">Adicionar</button>

//                     <h2 class="gecko_title">Participantes</h2>
//                     <p class="gecko_text">Aqui estão todos os participantes até o momento</p>
//                     <div id="gecko_players_list">
//                         <div class="gecko_players_list_item">
//                             <p>jogador1</p>
//                             <img src="static/assets/x.png" alt="">
//                         </div>
//                         <div class="gecko_players_list_item">
//                             <p>jogador1</p>
//                             <img src="static/assets/x.png" alt="">
//                         </div>
//                         <div class="gecko_players_list_item">
//                             <p>jogador1</p>
//                             <img src="static/assets/x.png" alt="">
//                         </div>
//                         <div class="gecko_players_list_item">
//                             <p>jogador1</p>
//                             <img src="static/assets/x.png" alt="">
//                         </div>
//                         <div class="gecko_players_list_item">
//                             <p>jogador1</p>
//                             <img src="static/assets/x.png" alt="">
//                         </div>
//                     </div>
//                     <a class="gecko_button_main" href="Themes" id="gecko_button_bottom">Jogar</a>
//                 </div>
//             </div>
//         `; 
//     }
// }

import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor() {
        super();
        this.setTitle("Quem vai jogar?");
        this.players = []; // Inicializa o array de participantes
    }

    setTitle(title) {
        document.title = title;
    }

    addPlayer(playerName) {
        if (playerName.trim() !== "" && !this.players.includes(playerName.trim())) {
            this.players.push(playerName.trim());
            console.log("Jogador adicionado:", this.players);
            this.renderPlayers();
            this.togglePlayButton(); // Atualiza o estado do botão
        } else {
            console.log("Jogador inválido ou duplicado!");
        }
    }
    
    removePlayer(index) {
        this.players.splice(index, 1);
        console.log("Jogador removido. Nova lista:", this.players);
        this.renderPlayers();
        this.togglePlayButton(); // Atualiza o estado do botão
    }

    togglePlayButton() {
        const playButton = document.querySelector("#gecko_button_bottom");
        if (this.players.length >= 3) {
            playButton.removeAttribute("disabled");
            playButton.classList.remove("disabled"); // Opcional: remover estilo de desabilitado
        } else {
            playButton.setAttribute("disabled", "true");
            playButton.classList.add("disabled"); // Opcional: adicionar estilo de desabilitado
        }
    }
    

    renderPlayers() {
        const playersList = document.querySelector("#gecko_players_list");
        playersList.innerHTML = ""; // Limpa a lista atual

        this.players.forEach((player, index) => {
            const playerDiv = document.createElement("div");
            playerDiv.className = "gecko_players_list_item";
            playerDiv.innerHTML = `
                <p>${player}</p>
                <img src="static/assets/x.png" alt="Remover" data-index="${index}" style="cursor: pointer;">
            `;
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
                    
                    <a class="gecko_button_main" href="Themes" id="gecko_button_bottom" disabled>Jogar</a>
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
    }

    async init() {
        // Chamado para configurar eventos após o DOM ser carregado
        await this.setupEventListeners();
        this.renderPlayers(); // Renderiza a lista inicial de jogadores
    }
}
