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
            <div>
                <div>
                    <img src="" alt="">
                    <p>Que os jogos comecem!</p>
                </div>
                <p>Hora de descobrir quem é o impostor!</p>
                <button>Nova rodada!<button>
            </div>
            <a href="/dashboard" data-lin>Go To dashboard</a>

        `; 
    }
}