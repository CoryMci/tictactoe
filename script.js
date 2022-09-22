const player = (letter, name=letter) => {
    const getLetter = () => letter;
    const getName = () => name;

    return {getLetter, getName};
};

const gameBoard = (()=>{
    let botActive = false;
    let xmove = true;
    let player1 = player('x');
    let player2 = player('o');

    let board = {"space1":"", "space2":"", "space3":"", "space4":"", "space5":"", "space6":"", "space7":"", "space8":"", "space9":""};

    let refresh = () => {
        for (i in board) {
            let space = document.querySelector(`#${i}`);
            space.textContent = board[i];
        }

        let statusDisplay = document.querySelector('.gamestatus');
        statusDisplay.textContent = gameStatus();
        if (gameStatus() != "") {
            let btn = document.querySelector('.playagain');
            btn.style.display = "inline";
            btn.addEventListener('click', () => {
                reset();
            });
        }
    };

    let toggleBot = () => {
        reset();
        botActive = !botActive;
        botbtn.classList.toggle("greenbot");
    }

    let reset = () => {
        board = {"space1":"", "space2":"", "space3":"", "space4":"", "space5":"", "space6":"", "space7":"", "space8":"", "space9":""};
        xmove = true;
        document.querySelector('.playagain').style.display = "none";
        refresh();
    }

    let gameStatus = () => {
        if (//all rows
            (board['space1'] === player1.getLetter()) && (board['space2'] === player1.getLetter()) && (board['space3'] === player1.getLetter()) ||
            (board['space4'] === player1.getLetter()) && (board['space5'] === player1.getLetter()) && (board['space6'] === player1.getLetter()) ||
            (board['space7'] === player1.getLetter()) && (board['space8'] === player1.getLetter()) && (board['space9'] === player1.getLetter()) ||
            //all columns
            (board['space1'] === player1.getLetter()) && (board['space4'] === player1.getLetter()) && (board['space7'] === player1.getLetter()) ||
            (board['space2'] === player1.getLetter()) && (board['space5'] === player1.getLetter()) && (board['space8'] === player1.getLetter()) ||
            (board['space3'] === player1.getLetter()) && (board['space6'] === player1.getLetter()) && (board['space9'] === player1.getLetter()) ||
            //all diagonals
            (board['space1'] === player1.getLetter()) && (board['space5'] === player1.getLetter()) && (board['space9'] === player1.getLetter()) ||
            (board['space3'] === player1.getLetter()) && (board['space5'] === player1.getLetter()) && (board['space7'] === player1.getLetter())
            ){
                return (`${player1.getName()} wins!`);

        } else if 
            (//all rows
            (board['space1'] === player2.getLetter()) && (board['space2'] === player2.getLetter()) && (board['space3'] === player2.getLetter()) ||
            (board['space4'] === player2.getLetter()) && (board['space5'] === player2.getLetter()) && (board['space6'] === player2.getLetter()) ||
            (board['space7'] === player2.getLetter()) && (board['space8'] === player2.getLetter()) && (board['space9'] === player2.getLetter()) ||
            //all columns
            (board['space1'] === player2.getLetter()) && (board['space4'] === player2.getLetter()) && (board['space7'] === player2.getLetter()) ||
            (board['space2'] === player2.getLetter()) && (board['space5'] === player2.getLetter()) && (board['space8'] === player2.getLetter()) ||
            (board['space3'] === player2.getLetter()) && (board['space6'] === player2.getLetter()) && (board['space9'] === player2.getLetter()) ||
            //all diagonals
            (board['space1'] === player2.getLetter()) && (board['space5'] === player2.getLetter()) && (board['space9'] === player2.getLetter()) ||
            (board['space3'] === player2.getLetter()) && (board['space5'] === player2.getLetter()) && (board['space7'] === player2.getLetter())
            ){
                return (`${player2.getName()} wins!`);
        } else if 
            (//all squares
            (board['space1'] !== "") && (board['space2'] !== "") && (board['space3'] !== "") && (board['space4'] !== "") &&
            (board['space5'] !== "") && (board['space6'] !== "") && (board['space7'] !== "") && (board['space8'] !== "") && 
            (board['space9'] !== "")
        ){
            return ('draw!');
        } else {
            return ('');
        }
    };

    let move = (targetid) => {
        if (board[targetid] === "") {
            if (xmove) {
                board[targetid] = 'x';
            }
            else {
                board[targetid] = 'o';
            }
            xmove = !xmove; 
            bot(botActive);
        } else {
            console.log('already occupied')
        }
;
        refresh();

    }

    let bot = (botActive) => {
        if (botActive) {
            if (!xmove) {
                //identifies and picks a random valid space for computer move.
                let validspaces = []
                for (space in board) {
                    if (board[space] == "") {
                        validspaces.push(space);
                    }
                };
                move(validspaces.at(Math.floor(Math.random() * validspaces.length)));
        }}}

    return {board, move, refresh, toggleBot};
})();


const lis = document.querySelectorAll('li');
lis.forEach((li) => {
    li.addEventListener('click', (e) => {
        gameBoard.move(e.target.id);
    });
});

const resetbtn = document.querySelector('button');

const botbtn = document.querySelector('.bot')
botbtn.addEventListener('click', () => {
    gameBoard.toggleBot();
})