let displayController = {
    render: function() {

    }
}

let gameBoard = {
    board: [],
    displayController: displayController,

    addMark: function(playerSymbol, row, column) {
        const index = (row * 3) + column;
        board[index] = playerSymbol;
    },

    clearBoard: function() {
        this.board = [];

        for (let i = 0; i < 9; i++) {
            this.board.push('');
        }

        displayController.render();
    }
}

let gameController = {
    gameBoard: gameBoard,
    xPlayer: null,
    oPlayer: null,
    currentPlayerSymbol: null,

    setXPlayer: function(player) {
        this.xPlayer = player;
    },

    setOPlayer: function(player) {
        this.oPlayer = player;
    },

    setCurrentPlayerSymbol: function(playerSymbol) {
        this.currentPlayerSymbol = playerSymbol;
    },

    addMark: function(row, column) {
        if (this.currentPlayer) {
            gameBoard.addMark(this.currentPlayerSymbol, row, column);
        }
    }
}

function playerFactory(playerSymbol) {
    return {playerSymbol};
}

gameController.setXPlayer(playerFactory('X'));
gameController.setOPlayer(playerFactory('O'));