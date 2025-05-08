const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    }
}

function rectCollision({rectangle1, rectangle2}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

let winnerDeclared = false;

function determineWinner({ player1, player2, timerID }) {
    if (winnerDeclared) return;
    winnerDeclared = true;

    clearTimeout(timerID);

    setTimeout(() => {
        document.querySelector('#restartScreen').style.display = 'flex';

        if (player1.health <= 0 && player2.health > 0) {
            document.querySelector('#winnerText').innerText = 'Player 2 Wins!';
            player2Wins++;
        } else if (player2.health <= 0 && player1.health > 0) {
            document.querySelector('#winnerText').innerText = 'Player 1 Wins!';
            player1Wins++;
        } else {
            document.querySelector('#winnerText').innerText = 'Tie!';
        }

        document.querySelector('#player1Wins').innerText = `Player 1 Wins: ${player1Wins}`;
        document.querySelector('#player2Wins').innerText = `Player 2 Wins: ${player2Wins}`;
    }, 500);
}

let timer = 60
let timerID

function decreaseTimer(){
    timerID = setTimeout(decreaseTimer, 1000);
    if(timer > 0) {
        timer--;
        document.querySelector("#timer").innerHTML = timer
    }

    if(timer === 0){
        determineWinner({player1, player2});
    }
}