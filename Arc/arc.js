const canvas = document.getElementById("arkanoid");
const ctx = canvas.getContext("2d");
let ballRadius = 8;
const brickRowCount = 3;
const brickSizeWidth = 30;
const brickSizeHeight = 13;
const brickPadding = 5;
let paddleWidth = 50;
let paddleHeight = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height - 60;
let paddleX = canvas.width / 2 - (paddleWidth / 2);
let paddleY = canvas.height - 20;
let leftPressed = 1;
let rightPressed = 1;
let dx = 2;
let dy = 2;

let score = 0;
let bricks = [];


function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#82ffe1";
  ctx.strokeStyle = "#00f4ba";
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = '#00fff6';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "rgba(0, 111, 255, 0.99)";
  ctx.fillText("Score: " + score, 8, 90);
}

window.run = function () {
  window.requestAnimationFrame(run);
  update();
  draw();
};

//Движение штуки
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  }
  else if (e.keyCode == 39) {
    rightPressed = true;
  }
}

function keyUpHandler(k) {
  if (k.keyCode == 37) {
    leftPressed = false;
  }
  else if (k.keyCode == 39) {
    rightPressed = false;
  }
}
run();


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBricks();
  drawPaddle();
  drawScore();
}


function checkWalls() {
  if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
    dx = -dx;
  }

  if (ballY + ballRadius > canvas.height) {

    dy -= 2;
    alert('Ooops! Try again!');
    if (dy == 0) {
      ballX = canvas.width / 2;
      ballY = canvas.height - 80;
      dy = 2;
      dx = 2;
    }
  }
  if (ballY - ballRadius < 0) {
    dy = -dy;
  }
}

function drawBricks() {
  for (let i = 0; i < bricks.length; i++) {
    ctx.beginPath();
    ctx.rect(bricks[i].x, bricks[i].y, brickSizeWidth, brickSizeHeight);
    ctx.fillStyle = "#00ffd4";
    ctx.strokeStyle = "6f828a";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}

function checkBricksWalls() {
  let collidedIndex = -1;
  bricks.forEach(function (item, i) {
    if (ballX + ballRadius > bricks[i].x && ballX - ballRadius < bricks[i].x + brickSizeWidth && ballY + ballRadius > bricks[i].y && ballY - ballRadius < bricks[i].y + brickSizeHeight) {
      dx = Math.random() * dx;
      dy = -dy;
      collidedIndex = i;
      score++;
      return;
    }
  });
  if (collidedIndex >= 0) {
    bricks.splice(collidedIndex, 1)
  }
}

function checkWallsForPaddle() {
  if (leftPressed && paddleX < 0) {
    paddleX = paddleX + 3;
  }
  else if (rightPressed && paddleX + paddleWidth > canvas.width) {
    paddleX = paddleX - 3;
  }
}

function checkPaddleByBall() {
  if (ballX + ballRadius > paddleX && ballX - ballRadius < paddleX + paddleWidth && ballY + ballRadius > paddleY && ballY - ballRadius < paddleY + paddleHeight) {
    dx = Math.random() * 3;
    dy = -dy;
  }
}

function update() {
  if (rightPressed) {
    paddleX += 3;
  }
  else if (leftPressed) {
    paddleX -= 3;
  }

  ballX += dx;
  ballY += dy;
  checkWalls();
  checkBricksWalls();
  checkWallsForPaddle();
  checkPaddleByBall();
}

bricks.push({ x: 0, y: 0 });
bricks.push({ x: 40, y: 0 });
bricks.push({ x: 80, y: 0 });
bricks.push({ x: 120, y: 0 });
bricks.push({ x: 160, y: 0 });
bricks.push({ x: 200, y: 0 });
bricks.push({ x: 240, y: 0 });

bricks.push({ x: 0, y: 25 });
bricks.push({ x: 40, y: 25 });
bricks.push({ x: 80, y: 25 });
bricks.push({ x: 120, y: 25 });
bricks.push({ x: 160, y: 25 });
bricks.push({ x: 200, y: 25 });
bricks.push({ x: 240, y: 25 });

bricks.push({ x: 0, y: 50 });
bricks.push({ x: 40, y: 50 });
bricks.push({ x: 80, y: 50 });
bricks.push({ x: 120, y: 50 });
bricks.push({ x: 160, y: 50 });
bricks.push({ x: 200, y: 50 });
bricks.push({ x: 240, y: 50 });

// bricks.push({ x: 280, y: 50 });
// function pushBricks(){
// for (let i = 0; i < 8; i++){
// let j = 0;
// let igrik = 50;
// bricks.push({x:j, y:igrik});

// }
// }
// pushBricks();


