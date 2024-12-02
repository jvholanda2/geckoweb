//console.log("JS tá carregando!")
import Dashboard from "./views/Dashboard.js"
import Posts from "./views/Posts.js"
import Settings from "./views/Settings.js"
import WhoWillPlay from "./views/WhoWillPlay.js"
import Themes from "./views/Themes.js"
import PassThePhoneTo from "./views/PassThePhoneTo.js"
import TheWordIs from "./views/TheWordIs.js"
import StartTheRound from "./views/StartTheRound.js"

const navigateTo = url => {
    history.pushState(null, null, url);
    router();  
} 
 
const router = async () => {
    const routes = [
        {path: "/", view: WhoWillPlay},
        {path: "/dashboard", view: Dashboard },
        {path: "/posts", view: Posts },
        {path: "/settings", view: Settings},
        {path: "/WhoWillPlay", view: WhoWillPlay},
        {path: "/Themes", view: Themes},
        {path: "/PassThePhoneTo", view: PassThePhoneTo},
        {path: "/TheWordIs", view: TheWordIs},
        {path: "/StartTheRound", view: StartTheRound},
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }


    const view = new match.route.view()

    document.querySelector("#app").innerHTML = await view.getHtml();
   // console.log(potentialMatches)
    console.log(match.route.view)

};

window.addEventListener("popstate", router);  

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]"))  {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})