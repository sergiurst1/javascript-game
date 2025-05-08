const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

let player1Wins = 0;
let player2Wins = 0;

const background = new SpriteBackground({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/fsegaBackGround.png'
})

const player1 = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    attackBox: {
        offset: {
            x: 110,
            y: -100
        },
        width: 300,
        height: 50
    },
    offset: {
        x: 290,
        y: 400
    },
    imageSrc: './img/TheLostSamurai/Idle.png',
    framesMax: 8,
    scale: 4.5,
    sprites: {
        idle: {
            imageSrc: './img/TheLostSamurai/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/TheLostSamurai/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/TheLostSamurai/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/TheLostSamurai/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/TheLostSamurai/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/TheLostSamurai/Take Hit.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/TheLostSamurai/Death.png',
            framesMax: 6
        }
    }
});

const player2 = new Fighter({
    position: {   
        x: 974,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    attackBox: {
        offset: {
            x: -350,
            y: -100
        },
        width: 400,
        height: 50
    },
    offset: {
        x: 290,
        y: 428
    },
    imageSrc: './img/TheWaterMaster/Idle.png',
    framesMax: 4,
    scale: 4.5,
    sprites: {
        idle: {
            imageSrc: './img/TheWaterMaster/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/TheWaterMaster/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/TheWaterMaster/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/TheWaterMaster/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/TheWaterMaster/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/TheWaterMaster/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/TheWaterMaster/Death.png',
            framesMax: 7
        }
    }
});

decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    player1.update();
    player2.update();

    player1.velocity.x = 0;
    player2.velocity.x = 0;

    //player1 movement
    if(keys.a.pressed && player1.lastKey === 'a') {
        player1.switchSprite('run');
        player1.velocity.x = -7;
    } else if(keys.d.pressed && player1.lastKey === 'd') {
        player1.switchSprite('run');
        player1.velocity.x = 7;
    } else {
        player1.switchSprite('idle');
    }

    if(player1.velocity.y < 0){
        player1.switchSprite('jump');
    } else if(player1.velocity.y > 0) {
        player1.switchSprite('fall');
    }

    //player2 movement
    if(keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.switchSprite('run');
        player2.velocity.x = -5;
    } else if(keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.switchSprite('run');
        player2.velocity.x = 5;
    } else {
        player2.switchSprite('idle');
    }

    if(player2.velocity.y < 0){
        player2.switchSprite('jump');
    } else if(player2.velocity.y > 0) {
        player2.switchSprite('fall');
    }

    //detect colision player1
    if( rectCollision({rectangle1: player1, rectangle2: player2}) && player1.isAttaking && player1.framesCurrent === 4){
        player2.takeHit();
        player1.isAttaking = false;
        gsap.to('#player2Health', {
            width: player2.health + "%"
        })
    }

    if(player1.isAttaking && player1.framesCurrent === 4){
        player1.isAttaking = false;
    }

    //detect colision player2
    if( rectCollision({rectangle1: player2, rectangle2: player1}) && player2.isAttaking && player2.framesCurrent === 2){
        player1.takeHit()
        player2.isAttaking = false;
        gsap.to('#player1Health', {
            width: player1.health + "%"
        })
    }

    if(player2.isAttaking && player2.framesCurrent === 2){
        player2.isAttaking = false;
    }

    if ((player1.health <= 0 || player2.health <= 0) && !winnerDeclared) {
        determineWinner({ player1, player2, timerID });
    }

}

function restartGame() {
    document.querySelector('#restartScreen').style.display = 'none';
    winnerDeclared = false;

    // Reset players' properties after restart
    player1.health = 100;
    player2.health = 100;

    player1.dead = false;  // Reset dead state
    player2.dead = false;  // Reset dead state

    // Reset positions and velocities
    player1.position = { x: 0, y: 0 };
    player2.position = { x: 974, y: 0 };

    player1.velocity = { x: 0, y: 0 };
    player2.velocity = { x: 0, y: 0 };

    // Reset animation frames and images
    player1.image = player1.sprites.idle.image;
    player1.framesMax = player1.sprites.idle.framesMax;
    player1.framesCurrent = 0; // Ensure frames reset
    player2.image = player2.sprites.idle.image;
    player2.framesMax = player2.sprites.idle.framesMax;
    player2.framesCurrent = 0; // Ensure frames reset

    // Switch to idle sprite after reset
    player1.switchSprite('idle');
    player2.switchSprite('idle');

    // Reset health bars to 100%
    gsap.to('#player1Health', { width: '100%' });
    gsap.to('#player2Health', { width: '100%' });

    timer = 60;

    // Restart the timer if applicable
    decreaseTimer();
}


animate();

window.addEventListener('keydown', (event) => {
    if(!player1.dead){
        switch(event.key){
            case 'd':
                keys.d.pressed = true;
                player1.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player1.lastKey = 'a';
                break;
            case 'w':
                player1.velocity.y = -20;
                break;
            case ' ':
                player1.attack();
                break;
        }
    }

    if(!player2.dead){
        switch(event.key){
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                player2.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                player2.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                player2.velocity.y = -20;
                break;
            case 'Enter':
                player2.attack();
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});