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
        <div>
            <h2>Escolha os temas</h2>
            <p>A palavra será sorteada dos temas que você escolher abaixo:</p>
            <div>
                <div>
                    <img src="" alt="">
                    <p>tema 1</p>
                </div>
                <div>
                    <img src="" alt="">
                    <p>tema 1</p>
                </div>
            </div>
            <button>Começar</button>
        </div>



            <a href="/dashboard" data-lin>Go To dashboard</a>
        `; 
    }
}