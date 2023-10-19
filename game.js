let displayController = {
    body: document.querySelector('body'),
    grid: document.getElementById('grid'),
    startDialog: document.querySelector('dialog'),
    startForm: document.getElementById('start'),
    startButton: document.getElementById('start-new-game'),
    currentPlayer: document.getElementById('current-player'),
    player1: document.getElementById('player-1-info'),
    player2: document.getElementById('player-2-info'),
    gameSetup: false,

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
                    if (!this.gameSetup) {
                        this.startDialog.showModal();
                    } else if (cellButton.textContent === '') {
                        gameController.playRound(row, column);
                        this.currentPlayer.textContent = `It is ${gameController.currentPlayer.name}'s turn.`;
                    }
                });

                this.grid.appendChild(cellButton);
            }
        }

        this.body.appendChild(this.grid);
    },

    init: function (board) {
        this.player1.textContent = ``;
        this.player2.textContent = ``;
        this.currentPlayer.textContent = ``;
        this.gameSetup = false;
        this.render(board);

        this.startDialog.showModal();

        this.startButton.addEventListener('click', () => {
            const player1name = document.getElementById('player-1').value;
            const player1isComputer = document.getElementById('player-1-is-computer').value === 'true';
            const player1symbol = document.getElementById('player-1-symbol').value;
            const player2name = document.getElementById('player-2').value;
            const player2isComputer = document.getElementById('player-2-is-computer').value === 'true';
            const player2symbol = player1symbol === 'X' ? 'O' : 'X';
            const player1isFirst = document.getElementById('player-1-first').value === 'true';

            if (player1name && player2name) {
                this.startForm.reset();

                const player1 = playerFactory(player1symbol, player1name, player1isComputer);
                const player2 = playerFactory(player2symbol, player2name, player2isComputer);
                gameController.setPlayer1(player1);
                gameController.setPlayer2(player2);
                gameController.setCurrentPlayer(player1isFirst ? player1 : player2);

                this.player1.textContent = `${player1name}: ${player1symbol}`;
                this.player2.textContent = `${player2name}: ${player2symbol}`;
                this.currentPlayer.textContent = `It is ${gameController.currentPlayer.name}'s turn.`;

                this.startDialog.close();
                this.gameSetup = true;
            }
        });
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
    },

    init: function () {
        this.board = [];

        for (let i = 0; i < 9; i++) {
            this.board.push('');
        }

        displayController.init(this.board);
    }
}

function playerFactory(playerSymbol, name, isComputer) {
    return {playerSymbol, name, isComputer};
}

let gameController = {
    gameBoard: gameBoard,
    player1: null,
    player2: null,
    currentPlayer: null,

    setPlayer1: function (player) {
        this.player1 = player;
    },

    setPlayer2: function (player) {
        this.player2 = player;
    },

    setCurrentPlayer: function (player) {
        this.currentPlayer = player;
    },

    swapCurrentPlayer: function () {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    },

    checkGameEnd: function () {
        if (gameBoard.checkWinForPlayer(this.currentPlayer.playerSymbol)) {
            alert(`${this.currentPlayer.name} wins!`);
            return true;
        } else if (gameBoard.checkBoardFull()) {
            alert('Tie...');
            return true;
        }

        return false;
    },

    playRound: function (row, column) {
        if (this.currentPlayer) {
            gameBoard.addMark(this.currentPlayer.playerSymbol, row, column);

            if (this.checkGameEnd()) {
                this.init();
            } else {
                this.swapCurrentPlayer();
            }
        }
    },

    init: function () {
        this.player1 = null;
        this.player2 = null;
        this.currentPlayer = null;
        gameBoard.init();
    }
}

gameController.init();

