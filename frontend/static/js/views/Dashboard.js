import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor(){
        super();
        this.setTitle("Dashboard");
    }  

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return `
            <a href="/dashboard" data-lin>Go To dashboard</a>
        `; 
    }
}