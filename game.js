let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');


let chompEffect = document.getElementById('chomp-effect'); 

const WIDTH = canvas.width; 
const HEIGHT = canvas.height; 
const SCALE = 20; 

let gridLines = document.getElementById('background'); 
let gridLinesCtx = gridLines.getContext('2d'); 
gridLinesCtx.beginPath(); 
gridLinesCtx.strokeStyle = '#fff';
for(var i = 0; i < WIDTH; i+= SCALE){
    gridLinesCtx.moveTo(i, 0);
    gridLinesCtx.lineTo(i, HEIGHT);
    gridLinesCtx.stroke();
}
for(var j = 0; j < HEIGHT; j+= SCALE) {
    gridLinesCtx.moveTo(0, j);
    gridLinesCtx.lineTo(WIDTH, j);
    gridLinesCtx.stroke();
}
gridLinesCtx.closePath();

let state;
startGame();

function startGame() {
    state = {
        snake: new Snake (0, 0, 'white', WIDTH, HEIGHT, SCALE), 
        snake1: new Snake(WIDTH - SCALE, HEIGHT - SCALE, 'purple', WIDTH, HEIGHT, SCALE),
        food : new Food(WIDTH, HEIGHT, SCALE),
        lastTimeStamp: 0,
        lag: 0,
        score: 0, 
    };
}

function draw(ctx, state) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    state.food.draw(ctx);
    state.snake.draw(ctx);
    state.snake1.draw(ctx);
}

function update(state) {
    if (state.snake.hitsItself()) {
        alert('Game over.') 
        startGame();
    } 

    if (state.snake1.hitsItself()) {
        alert('Game over.') 
        startGame();
    } 
    state.snake.update();
    state.snake1.update();

    if (state.snake.eats(state.food)) {
        chompEffect.play();
        state.food.placeFood();
        state.score++; 
        if (state.score % 2 == 0) {
            state.snake.grow();
            state.snake1.grow();
        }
    }
    if (state.snake1.eats(state.food)) {
        chompEffect.play();
        state.food.placeFood();
        state.score++; 
        if (state.score % 2 == 0) {
            state.snake.grow();
            state.snake1.grow();
        }
    }
}

function frame(timestamp) {
    const MS_PER_UPDATE = 100;

    let elapsed = timestamp - state.lastTimeStamp;
    state.lastTimeStamp = timestamp;

    state.lag += elapsed;
    while (state.lag >= MS_PER_UPDATE) {
        update(state);
        state.lag -= MS_PER_UPDATE; 
    }

    draw(ctx, state); 
    requestAnimationFrame(frame);
}

document.addEventListener('keydown', function (e) {
    if (e.key == 'Left' || e.key == 'ArrowLeft') {
        state.snake.left();
    } else if (e.key == 'Right' || e.key == 'ArrowRight') {
        state.snake.right();
    } else if (e.key == 'Up' || e.key == 'ArrowUp') {
        state.snake.up();
    } else if (e.key == 'Down' || e.key == 'ArrowDown') {
        state.snake.down();
    } else if (e.key == 'w' ) {
        state.snake1.up();
    } else if (e.key == 'd') {
        state.snake1.right();
    } else if (e.key == 's') {
        state.snake1.down();
    } else if (e.key == 'a') {
        state.snake1.left();
    }
}); 

requestAnimationFrame(frame); 
