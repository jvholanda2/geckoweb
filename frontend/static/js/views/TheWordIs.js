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
            <div>
                <span>Nome2</span>
                <p>A palavra da rodada é:</p>
                <div>
                    <span>Michael Jackson</span>
                </div>
                <p>Todos irão receber essa mesma palavra, exceto o <span>impostor</span></p>
                <button>Entendido!</button>
            </div>
            <div>
                <span>Nome3</span>
                <p>Se prepate, pois você é:</p>
                <div>
                    <span>O Impostor</span>
                </div>
                <p>O tema da rodada é <span>Famosos</span>, agora é só fingir que você sabe qual é a palavra!</p>
                <button>Entendido!</button>
            </div>
            <a href="/dashboard" data-lin>Go To dashboard</a>
        `; 
    }
}