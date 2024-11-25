//console.log("JS tá carregando!")
const router = async () => {
    const routes = [
        {path: "/", view: () => console.log("Primeira tela") },
        {path: "/posts", view: () => console.log("Segunda tela") },
        {path: "/settings", view: () => console.log("Terceira tela") },

    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

   // console.log(potentialMatches)
    console.log(match)

};

document.addEventListener("DOMContentLoaded", () => {
    router();
})