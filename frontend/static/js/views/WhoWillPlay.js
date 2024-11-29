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
            <div>
                <h2>Quem vai jogar?</h2>
                <p>Coloque aqui o nome do jogador que quer adicionar</p>
                <input type="text">
                <button>Adicionar</button>

                <h2>Participantes</h2>
                <p>Aqui estão todos os participantes até o momento</p>
                <div>
                    <p>jogador1</p>
                    <p>jogador2</p>
                    <p>jogador3</p>
                </div>
                <button>Jogar</button>
            </div>    


            <a href="/dashboard" data-lin>Go To dashboard</a>
        `; 
    }
}