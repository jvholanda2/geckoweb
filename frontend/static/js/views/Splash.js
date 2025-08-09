import AbstractView from "./AbstractView.js";

export default class {
    constructor(){

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
                    <img src="static/assets/eyes.png" alt="" class="gecko_eye">                    
                    <a class="gecko_button_main gecko_button_bottom" href="WhoWillPlay" id="gecko_button_WhoWillPlay" disabled>Jogar</a>
                </div>
            </div>
        `;
    }
}