import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor(){
        super();
        this.setTitle("A palavra é:");
    }  

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return `
            <div class="gecko_view gecko_view_word">
                <div class="gecko_wrap">
                    <span class="gecko_title">Nome2</span>
                    <p class="gecko_text gecko_text_bold">A palavra da rodada é:</p>
                    <div class="gecko_word">
                        <span class="gecko_title">Michael Jackson</span>
                    </div>
                    <p class="gecko_text gecko_text_bold">Todos irão receber essa mesma palavra, exceto o <span class="gecko_text_impostor">impostor...</span></p>            
                </div>
                <div class="gecko_wrap">
                    <span class="gecko_title">Nome3</span>
                    <p class="gecko_text gecko_text_bold">Se prepate, pois você é:</p>
                    <div class="gecko_word gecko_word_impostor">
                        <span class="gecko_title ">O Impostor</span>
                    </div>
                    <p class="gecko_text gecko_text_bold">O tema da rodada é <span class="gecko_text_theme">Famosos</span>, agora é só fingir que você sabe qual é a palavra!</p>    
                </div>
                <a class="gecko_button_main" href="PassThePhoneTo" class="gecko_button_bottom">Entendido!</a>
            </div>
        `; 
    }
}