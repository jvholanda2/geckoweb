import AbstractView from "./AbstractView.js";

export default class from extends AbstractView {
    constructor(){
        super();
        this.setTitle("Setting");
    }  

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return `
            <a href="/settings" data-lin>Go To settings</a>
        `; 
    }
}