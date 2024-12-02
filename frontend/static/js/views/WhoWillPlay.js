import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor(){
        super();
        this.setTitle("Quem vai jogar?");
    }  

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return ` 
            <div class="gecko_view">
                <div class="gecko_div_title">
                    <h1 id="gecko_div_title_title" class="gecko_title">GeckoWeb MVP</h1>
                </div>
                <div class="gecko_wrap">
                    <h2 class="gecko_title">Quem vai jogar?</h2>
                    <p class="gecko_text">Coloque aqui o nome do jogador que quer adicionar &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
                    <input class="gecko_input" type="text" placeholder="">
                    <button class="gecko_button_main">Adicionar</button>

                    <h2 class="gecko_title">Participantes</h2>
                    <p class="gecko_text">Aqui estão todos os participantes até o momento</p>
                    <div id="gecko_players_list">
                        <div class="gecko_players_list_item">
                            <p>jogador1</p>
                            <img src="static/assets/x.png" alt="">
                        </div>
                        <div class="gecko_players_list_item">
                            <p>jogador1</p>
                            <img src="static/assets/x.png" alt="">
                        </div>
                        <div class="gecko_players_list_item">
                            <p>jogador1</p>
                            <img src="static/assets/x.png" alt="">
                        </div>
                        <div class="gecko_players_list_item">
                            <p>jogador1</p>
                            <img src="static/assets/x.png" alt="">
                        </div>
                        <div class="gecko_players_list_item">
                            <p>jogador1</p>
                            <img src="static/assets/x.png" alt="">
                        </div>
                    </div>
                    <a class="gecko_button_main" href="Themes" id="gecko_button_bottom">Jogar</a>
                </div>
            </div>
        `; 
    }
}