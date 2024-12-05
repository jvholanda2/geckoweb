// gameState.js

// Atualiza o estado do jogo no localStorage
export function updateGameState(newState) {
    const currentState = JSON.parse(localStorage.getItem("gameState")) || {};
    const updatedState = { ...currentState, ...newState };
    localStorage.setItem("gameState", JSON.stringify(updatedState));
}

// Recupera o estado do jogo do localStorage
export function getGameState() {
    return JSON.parse(localStorage.getItem("gameState")) || {};
}

// Reseta o estado do jogo
export function resetGameState() {
    localStorage.removeItem("gameState");
}

