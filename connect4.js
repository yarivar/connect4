let _board = [];
let _isCurrentPlayerRed = true;
let _rowsNames = ['A', 'B', 'C', 'D', 'E', 'F'];
let _rows = 6;
let _columns = 7;
let _players = ['red', 'yellow'];


$(document).ready(function () {
    ResetBoard();

    $("img").click(function (event) {
        if (UpdateBoard(event.target.id)) {
            UpdateCurrentTurn();
        }

        if (IsGameOver()) {
            EndGame();
        }
    });

    $("#resetButton").click(function (event) {
        ResetBoard();
    });
});

function UpdateCurrentTurn() {
    _isCurrentPlayerRed = _isCurrentPlayerRed === true ? false : true;
    let myColor = GetCurrentColor();
    $(".currentTurn").css('background-color', myColor);
}

function GetCurrentColor() {
    return _isCurrentPlayerRed === true ? _players[0] : _players[1];
}

function ResetBoard() {
    for (let i = 0; i < _rows; i++) {
        _board.push([0]);
        for (let j = 0; j < _columns; j++) {
            _board[i][j] = 0;
        }
    }
    UpdateBoardGui();
}

function UpdateBoard(myCellId) {
    for (let i = 0; i < _rows; i++) {
        if (_board[i][myCellId.substring(1) - 1] === 0) {
            _board[i][myCellId.substring(1) - 1] = _isCurrentPlayerRed === true ? 1 : 2;
            UpdateBoardGui();
            return true;
        }
    }
    return false;
}

function UpdateBoardGui() {
    for (let i = 0; i < _rows; i++) {
        for (let j = 0; j < _columns; j++) {
            let myId = '#' + _rowsNames[i] + (j + 1);
            let myColor = _board[i][j] === 0 ? "empty" : _board[i][j] === 1 ? "red" : "yellow";
            $(myId).attr('src', 'images/' + myColor + '.jpg');
        }
    }
}

function IsGameOver() {
    let isWin = false;

    isWin = CheckHorizontal();

    if (!isWin) {
        isWin = CheckVertical();
    }

    if (!isWin) {
        isWin = CheckDiagonal(1);
    }

    if (!isWin) {
        isWin = CheckDiagonal(-1);
    }

    return isWin;
}

function CheckHorizontal() {
    let isWin = false;
    let myCounter = 0;

    for (let i = _rows - 1; i >= 0; i--) {
        for (let j = 0; j < _columns - 1; j++) {
            if (_board[i][j] !== 0 && j < 4) {
                for (myCounter = 1; myCounter < 5; myCounter++) {
                    if (_board[i][j] === _board[i][j + myCounter]) {
                        if (myCounter === 3) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
    }
    return isWin;
}

function CheckVertical() {
    let isWin = false;
    let myCounter = 0;

    for (let j = 0; j < _columns; j++) {
        for (let i = _rows - 1; i >= 3; i--) {
            if (_board[i][j] !== 0) {
                for (myCounter = 1; myCounter < 5; myCounter++) {
                    if (_board[i][j] === _board[i - myCounter][j]) {
                        if (myCounter === 3) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
    }
    return isWin;
}

function CheckDiagonal(ltr) {
    let isWin = false;
    let myCounter = 0;

    for (let j = 0; j < _columns; j++) {
        for (let i = _rows - 1; i >= 3; i--) {
            if (_board[i][j] !== 0) {
                for (myCounter = 1; myCounter < 5; myCounter++) {
                    if (_board[i][j] === _board[i - myCounter][j + ltr*myCounter]) {
                        if (myCounter === 3) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
    }
    return isWin;
}

function EndGame() {
    UpdateCurrentTurn();
    let myColor = GetCurrentColor();

    setTimeout(() => {
        alert("Game Over - " + myColor + " win!!!");
        ResetBoard();
    }, 10);
}