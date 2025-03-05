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

function determineWinner({player1, player2, timerID}){
    clearTimeout(timerID);
    document.querySelector("#display_text").style.display = 'flex';
    if(player1.health === player2.health) {
        document.querySelector("#display_text").innerHTML = 'Tie';
    } else if(player1.health > player2.health) {
        document.querySelector("#display_text").innerHTML = 'Player 1 won';
    } else if(player1.health < player2.health) {
        document.querySelector("#display_text").innerHTML = 'Player 2 won';
    }
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