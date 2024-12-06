export function updateGameState(newState) {
    const currentState = JSON.parse(localStorage.getItem("gameState")) || {};
    const updatedState = { ...currentState, ...newState };
    localStorage.setItem("gameState", JSON.stringify(updatedState));
}

export function getGameState() {
    return JSON.parse(localStorage.getItem("gameState")) || {};
}

export function resetGameState() {
    localStorage.removeItem("gameState");
}

