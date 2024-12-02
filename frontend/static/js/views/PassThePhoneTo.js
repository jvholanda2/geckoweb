import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor(){
        super();
        this.setTitle("Passe o Telefone Para:");
    }  

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return `
        <div class="gecko_view">
            <div class="gecko_wrap">
                <h2 class="gecko_title">Passe o celular para:</h2>
                <div class="gecko_name_eyes">
                    <img src="static/assets/eyes.png" alt="">
                    <span class="gecko_title">Nome1</span>
                </div>
                <a class="gecko_button_main" href="TheWordIs" id="gecko_button_bottom">Sim, eu sou Nome1!</a>
                <a class="gecko_button_main" href="StartTheRound" class="gecko_button_bottom">Começar!</a>
            </div>
        </div>
        `; 
    }
}