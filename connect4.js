var _board = [];
var _isCurrentPlayerRed = true;
var _rowsNames = ['A', 'B', 'C', 'D', 'E', 'F'];
var _rows = 6;
var _columns = 7;
var _players = ['red', 'yellow'];


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
    var myColor = GetCurrentColor();
    $(".currentTurn").css('background-color', myColor);
}

function GetCurrentColor() {
    return _isCurrentPlayerRed === true ? _players[0] : _players[1];
}

function ResetBoard() {
    for (var i = 0; i < _rows; i++) {
        _board.push([0]);
        for (var j = 0; j < _columns; j++) {
            _board[i][j] = 0;
        }
    }
    UpdateBoardGui();
}

function UpdateBoard(myCellId) {
    for (var i = 0; i < _rows; i++) {
        if (_board[i][myCellId.substring(1) - 1] === 0) {
            _board[i][myCellId.substring(1) - 1] = _isCurrentPlayerRed === true ? 1 : 2;
            UpdateBoardGui();
            return true;
        }
    }
    return false;
}

function UpdateBoardGui() {
    for (var i = 0; i < _rows; i++) {
        for (var j = 0; j < _columns; j++) {
            var myId = '#' + _rowsNames[i] + (j + 1);
            var myColor = _board[i][j] === 0 ? "empty" : _board[i][j] === 1 ? "red" : "yellow";
            $(myId).attr('src', 'images/' + myColor + '.jpg');
        }
    }
}

function IsGameOver() {
    var isWin = false;

    isWin = CheckHorizontal();

    if (!isWin) {
        isWin = CheckVertical();
    }

    if (!isWin) {
        isWin = CheckDiagonalLtr();
    }

    if (!isWin) {
        isWin = CheckDiagonalRtl();
    }

    return isWin;
}

function CheckHorizontal() {
    var isWin = false;
    var myCounter = 0;

    for (var i = _rows - 1; i >= 0; i--) {
        for (var j = 0; j < _columns - 1; j++) {
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
    var isWin = false;
    var myCounter = 0;

    for (var j = 0; j < _columns; j++) {
        for (var i = _rows - 1; i >= 3; i--) {
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

function CheckDiagonalLtr() {
    var isWin = false;
    var myCounter = 0;

    for (var j = 0; j < _columns; j++) {
        for (var i = _rows - 1; i >= 3; i--) {
            if (_board[i][j] !== 0) {
                for (myCounter = 1; myCounter < 5; myCounter++) {
                    if (_board[i][j] === _board[i - myCounter][j + myCounter]) {
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

function CheckDiagonalRtl() {
    var isWin = false;
    var myCounter = 0;

    for (var j = 0; j < _columns; j++) {
        for (var i = _rows - 1; i >= 3; i--) {
            if (_board[i][j] !== 0) {
                for (myCounter = 1; myCounter < 5; myCounter++) {
                    if (_board[i][j] === _board[i - myCounter][j - myCounter]) {
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
    var myColor = GetCurrentColor();

    setTimeout(() => {
        alert("Game Over - " + myColor + " win!!!");
        ResetBoard();
    }, 10);
}