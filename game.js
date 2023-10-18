let displayController = {

}

let gameBoard = {
    board: []
}

let gameController = {
    gameBoard: gameBoard,
    displayController: displayController
}

function playerFactory(symbol) {
    let playerSymbol = symbol;
    return {playerSymbol};
}