import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor(){
        super();
        this.setTitle("Que comece a rodada!");
    }  

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return `
            <div class="gecko_view gecko_view_start">
                <div class="gecko_wrap_start">
                    <img src="static/assets/profile-question.png" alt="">
                    <span class="gecko_title">Que os jogos comecem!</span>
                    <p class="gecko_text gecko_text_bold">Hora de descobrir quem é o impostor!</p>
                </div>
                <a class="gecko_button_main" href="Themes" class="gecko_button_bottom">Nova Rodada!</a>
                <a class="gecko_button_secondary" href="WhoWillPlay" class="gecko_button_bottom">Voltar ao Inicio!</a>
            </div>
        `; 
    }
}