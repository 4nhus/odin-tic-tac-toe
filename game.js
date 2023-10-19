let displayController = {
    body: document.querySelector('body'),
    grid: document.getElementById('grid'),
    startForm: document.getElementById('start'),
    startButton: document.getElementById('start-new-game'),

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
                        gameController.playRound(row, column);
                        console.log("here");
                    }
                });

                this.grid.appendChild(cellButton);
            }
        }

        this.body.appendChild(this.grid);
    },

    init: function (board) {
        this.render(board);

        document.querySelector('dialog').showModal();

        this.startButton.addEventListener('click', () => {
            const bookTitle = document.getElementById('title').value;
            const bookAuthor = document.getElementById('author').value;
            const bookNumPages = document.getElementById('num-pages').value;
            const bookHasBeenRead = document.getElementById('has-been-read').value === 'true';

            if (bookTitle && bookAuthor && bookNumPages) {
                const form = document.querySelector('form');
                form.reset();

                const book = new Book(bookTitle, bookAuthor, bookNumPages, bookHasBeenRead);
                addBookToLibrary(book);
                displayBook(createBookDiv(book));
                dialog.close();
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

    checkGameEnd: function () {
        if (gameBoard.checkWinForPlayer(this.currentPlayerSymbol)) {
            alert('YOU WIN!');
            return true;
        } else if (gameBoard.checkBoardFull()) {
            alert('TIE...');
            return true;
        }

        return false;
    },

    playRound: function (row, column) {
        if (this.currentPlayerSymbol) {
            gameBoard.addMark(this.currentPlayerSymbol, row, column);

            if (this.checkGameEnd()) {
                this.init();
            } else {
                this.currentPlayerSymbol = this.currentPlayerSymbol === 'X' ? 'O' : 'X';
            }
        }
    },

    init: function () {
        gameController.setXPlayer(playerFactory('X'));
        gameController.setOPlayer(playerFactory('O'));
        gameBoard.init();
    }
}

gameController.init();

