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
            <div>
                <h2>Passe o celular para:</h2>
                <div>
                    <img src="" alt="">
                    <span>Nome1</span>
                </div>
                <button>Sim, eu sou Nome1!</button>
            </div>
            <a href="/dashboard" data-lin>Go To dashboard</a>
        `; 
    }
}