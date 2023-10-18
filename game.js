let displayController = {
    render: function(board) {
        const grid = document.getElementById('grid');
        grid.remove();

        const newGrid = document.createElement('div');
        newGrid.id = 'grid';

        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                const cellButton = document.createElement('button');
                const index = (row * 3) + column;
                cellButton.textContent = board[index];
                cellButton.addEventListener('click', () => {
                    gameController.addMark(row, column);
                });

                newGrid.appendChild(cellButton);
            }
        }

        const body = document.querySelector('body');
        body.appendChild(newGrid);
    }
}

let gameBoard = {
    board: [],
    displayController: displayController,

    addMark: function(playerSymbol, row, column) {
        const index = (row * 3) + column;
        this.board[index] = playerSymbol;
        displayController.render(this.board)
    },

    init: function() {
        this.board = [];

        for (let i = 0; i < 9; i++) {
            this.board.push('');
        }

        displayController.render(this.board);
    }
}

function playerFactory(playerSymbol) {
    return {playerSymbol};
}

let gameController = {
    gameBoard: gameBoard,
    xPlayer: null,
    oPlayer: null,
    currentPlayerSymbol: 'X',

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
        if (this.currentPlayerSymbol) {
            gameBoard.addMark(this.currentPlayerSymbol, row, column);
            this.currentPlayerSymbol = this.currentPlayerSymbol === 'X' ? 'O' : 'X';
        }
    },

    init: function() {
        gameController.setXPlayer(playerFactory('X'));
        gameController.setOPlayer(playerFactory('O'));
        gameBoard.init();
    }
}

gameController.init();

