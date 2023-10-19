let displayController = {
    body: document.querySelector('body'),
    grid: document.getElementById('grid'),

    render: function (board) {
        this.grid.remove();
        this.grid = document.createElement('div');
        this.grid.id = 'grid';

        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                const cellButton = document.createElement('button');
                const index = (row * 3) + column;
                cellButton.textContent = board[index];
                cellButton.addEventListener('click', () => {
                    if (cellButton.textContent === '') {
                        gameController.addMark(row, column);
                    }
                });

                this.grid.appendChild(cellButton);
            }
        }

        this.body.appendChild(this.grid);
    }
}

let gameBoard = {
    board: [],
    displayController: displayController,

    checkBoardFull: function () {
        for (const cell of this.board) {
            if (cell === '') {
                return false;
            }
        }

        return true;
    },

    checkWinForPlayer: function (playerSymbol) {
        // Check rows
        rowLoop:
            for (let row = 0; row < 3; row++) {
                for (let column = 0; column < 3; column++) {
                    if (this.board[(row * 3) + column] !== playerSymbol) {
                        continue rowLoop;
                    }
                }

                return true;
            }

        // Check columns
        columnLoop:
            for (let column = 0; column < 3; column++) {
                for (let row = 0; row < 3; row++) {
                    if (this.board[(row * 3) + column] !== playerSymbol) {
                        continue columnLoop;
                    }
                }

                return true;
            }

        // Check diagonals
        if (this.board[0] === playerSymbol && this.board[4] === playerSymbol && this.board[8] === playerSymbol) {
            return true;
        } else if (this.board[2] === playerSymbol && this.board[4] === playerSymbol && this.board[6] === playerSymbol) {
            return true
        }

        return false;
    },

    addMark: function (playerSymbol, row, column) {
        this.board[(row * 3) + column] = playerSymbol;
        displayController.render(this.board);
        if (this.checkWinForPlayer(playerSymbol)) {
            alert('YOU WIN!');
        } else if (this.checkBoardFull()) {
            alert('TIE...');
        }
    },

    init: function () {
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

    setXPlayer: function (player) {
        this.xPlayer = player;
    },

    setOPlayer: function (player) {
        this.oPlayer = player;
    },

    setCurrentPlayerSymbol: function (playerSymbol) {
        this.currentPlayerSymbol = playerSymbol;
    },

    addMark: function (row, column) {
        if (this.currentPlayerSymbol) {
            gameBoard.addMark(this.currentPlayerSymbol, row, column);
            this.currentPlayerSymbol = this.currentPlayerSymbol === 'X' ? 'O' : 'X';
        }
    },

    init: function () {
        gameController.setXPlayer(playerFactory('X'));
        gameController.setOPlayer(playerFactory('O'));
        gameBoard.init();
    }
}

gameController.init();

