import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor(){
        super();
        this.setTitle("Escolha o tema...");
    }  

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return `
            <div class="gecko_view">
                <div class="gecko_wrap">
                    <h2 class="gecko_title">Escolha os temas da rodada</h2>
                    <p class="gecko_text">A palavra será sorteada dos temas que você escolher abaixo:</p>
                    <div id="gecko_list_themes">
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/places.png" alt="">
                            <p class="gecko_title">Locais</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/famous.png" alt="">
                            <p class="gecko_title">Famosos</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/animals.png" alt="">
                            <p class="gecko_title">Animals</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/characters.png" alt="">
                            <p class="gecko_title">Personagens</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/places.png" alt="">
                            <p class="gecko_title">Locais</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/famous.png" alt="">
                            <p class="gecko_title">Famosos</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/animals.png" alt="">
                            <p class="gecko_title">Animals</p>
                        </div>
                        <div class="gecko_list_themes_item">
                            <img src="static/assets/characters.png" alt="">
                            <p class="gecko_title">Personagens</p>
                        </div>
                    </div>
                    <a class="gecko_button_main" href="PassThePhoneTo" id="gecko_button_bottom">Jogar</a>
                </div>
            </div>
        `; 
    }
}