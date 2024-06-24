// Создание оболочки
const gameDiv = document.createElement("div");
gameDiv.classList.add("game-wrapper");
document.body.append(gameDiv);

// Отрисовка кнопки старт
const buttonStart = document.createElement("button");
buttonStart.innerHTML = "Start";
buttonStart.classList.add("button-start");
gameDiv.append(buttonStart);

// Отрисовка счета игры
const gameCounter = document.createElement("div");
gameCounter.classList.add("count");
gameDiv.append(gameCounter);

// Отрисовка игрового поля
const gameBoard = document.createElement("div");
gameBoard.classList.add("game-board");
gameDiv.append(gameBoard);

// Отрисовка средней линии поля
const centerLine = document.createElement("div");
centerLine.classList.add("center-line");
gameBoard.append(centerLine);

// Отрисовка круга
const centerCircleL = document.createElement("div");
centerCircleL.classList.add("center-cyrcleL");
gameBoard.append(centerCircleL);

const centerCircleM = document.createElement("div");
centerCircleM.classList.add("center-cyrcleM");
gameBoard.append(centerCircleM);

// Отрисовка лого
const gameBoardLogo = document.createElement("div");
gameBoardLogo.classList.add("gameboard-logo");
gameBoardLogo.innerHTML = "DOM";
gameBoard.append(gameBoardLogo);

// Отрисовка левой платформы
const leftHand = document.createElement("div");
leftHand.classList.add("game-lefthand", "hands");

// Отрисовка правой платформы
const rightHand = document.createElement("div");
rightHand.classList.add("game-righthand", "hands");

// Отрисовка мяча
const ball = document.createElement("div");
ball.classList.add("game-ball");
gameBoard.append(ball, leftHand, rightHand);

// Отрисовка обратного отсчета
const countdownElement = document.createElement("div");
countdownElement.classList.add("downcounter-elem");
gameBoard.append(countdownElement);

// Отрисовка табло сообщений
const messageElement = document.createElement("div");
messageElement.classList.add("message-elem", "animation");
messageElement.style.opacity = 0;
gameBoard.append(messageElement);

const messageElementPrev = document.createElement("p");
const messageElementPost = document.createElement("p");
messageElementPrev.classList.add("prev-message");
messageElementPost.classList.add("post-message");
messageElementPrev.textContent = "Конец игры";
messageElementPost.textContent = "Чтобы начать Нажмите START";
messageElement.append(messageElementPrev, messageElementPost);



// Счет
const finalCount = 5;
let rightPlayerScore = 0;
let leftPlayerScore = 0;
gameCounter.textContent = `${leftPlayerScore} : ${rightPlayerScore}`;

// Игровое поле
const gameBoardWidth = gameBoard.offsetWidth;
const gameBoardHeight = gameBoard.offsetHeight;

// Скорость платформ
const initHandsSpeed = 10;
let handsSpeed = initHandsSpeed;

// Левая платформа
const leftHandHeight = leftHand.offsetHeight;
const leftHandWidth = leftHand.offsetWidth;
const leftHandPosX = 0;
const initLefHandPosY = (gameBoardHeight - leftHandHeight) / 2;;
let leftHandPosY = initLefHandPosY;

// Правая платформа
const rightHandHeight = rightHand.offsetHeight;
const rightHandWidth = rightHand.offsetWidth;
const rightHandPosX = gameBoardWidth - rightHandWidth;
const initRightHandPosY = (gameBoardHeight - rightHandHeight) / 2;;
let rightHandPosY = initRightHandPosY;

// Мяч
const ballWidth = ball.offsetWidth;
const ballHeight = ball.offsetHeight;
const initBallPosX = (gameBoardWidth - ballWidth) / 2;
const initBallPosY = (gameBoardHeight - ballHeight) / 2;
const initBallSpeedX = 5;
const initballSpeedY = 5;
const ballMaxSpeedX = 15;
let ballPosX = initBallPosX;
let ballPosY = initBallPosY;
let ballSpeedX = initBallSpeedX;
let ballSpeedY = initballSpeedY;
const speedCoef = 1.1;

// Флаги для перемещения платформ
let isRightHandMovingUp = false;
let isRightHandMovingDown = false;
let isLeftHandMovingUp = false;
let isLeftHandMovingDown = false;


const initCount = 3;
let count = initCount;
let angle = null;
let animationId;

// Функция отрисовки платформ и мяча
function drawElementsGame() {
    ball.style.left = ballPosX + "px";
    ball.style.top = ballPosY + "px";
    rightHand.style.top = rightHandPosY + "px";
    leftHand.style.top = leftHandPosY + "px";
}

// Генерация случайного направления мяча при старте, при этом не попадем в 0 и 180
function randomMoveBall() {
    if (Math.random() < 0.5) {
        angle = ((Math.random() * 120 - 60) * Math.PI) / 180;
    } else {
        angle = ((Math.random() * 120 + 120) * Math.PI) / 180;
    }
}

// Движение Мяча
function moveBall() {
    ballPosX += Math.cos(angle) * ballSpeedX; //  направление по X
    ballPosY += Math.sin(angle) * ballSpeedY; //  направление по Y

    // Проверяем столкновение мяча с левой платформой
    if (ballPosX <= leftHandPosX + leftHandWidth &&
        ballPosY + ballHeight >= leftHandPosY &&
        ballPosY <= leftHandPosY + leftHandHeight) {
        ballPosX = leftHandWidth;

        if (ballSpeedX < ballMaxSpeedX) {
            ballSpeedX = -ballSpeedX * speedCoef;
        } else {
            ballSpeedX = -ballMaxSpeedX;
        }
    }

    // Проверяем столкновение мяча с правой платформой
    if (ballPosX + ballWidth >= rightHandPosX &&
        ballPosY + ballHeight >= rightHandPosY && 
        ballPosY <= rightHandPosY + rightHandHeight) {
        ballPosX = gameBoardWidth - rightHandWidth - ballWidth;

        if (ballSpeedX < ballMaxSpeedX) {
            ballSpeedX = -ballSpeedX * speedCoef;
        } else {
            ballSpeedX = -ballMaxSpeedX;
        }
    }

    // Условие перемещения мяча X
    if (ballPosX + ballWidth >= gameBoardWidth || ballPosX <= 0) {
        isGoal();
        return;
    }

    // Условие перемещения мяча Y
    if (ballPosY + ballHeight > gameBoardHeight) {
        ballSpeedY = -ballSpeedY;
        ballPosY = gameBoardHeight - ballHeight;
    }

    if (ballPosY < 0) {
        ballSpeedY = -ballSpeedY;
        ballPosY = 0;
    }

}

function movePlatforms() {
    // Передвижение платформ
    if (isRightHandMovingUp) {
        rightHandPosY -= handsSpeed;
    }
    if (isRightHandMovingDown) {
        rightHandPosY += handsSpeed;
    }
    if (isLeftHandMovingUp) {
        leftHandPosY -= handsSpeed;
    }
    if (isLeftHandMovingDown) {
        leftHandPosY += handsSpeed;
    }

    // Условие вертикального хода платформ
    if (leftHandPosY < 0) {
        leftHandPosY = 0;
    }

    if (leftHandPosY + leftHandHeight > gameBoardHeight) {
        leftHandPosY = gameBoardHeight - leftHandHeight;
    }

    if (rightHandPosY < 0) {
        rightHandPosY = 0;
    }

    if (rightHandPosY + rightHandHeight > gameBoardHeight) {
        rightHandPosY = gameBoardHeight - rightHandHeight;
    }
}

// Обработка нажатия клавиши
function keyUpHandler(event) {
    if (event.code === "ArrowUp") {
        isRightHandMovingUp = false;
    } else if (event.code === "ArrowDown") {
        isRightHandMovingDown = false;
    } else if (event.code === "ShiftLeft") {
        isLeftHandMovingUp = false;
    } else if (event.code === "ControlLeft") {
        isLeftHandMovingDown = false;
    }
}

// Обработка отпускания клавиши
function keyDownHandler(event) {
    if (event.code === "ArrowUp") {
        isRightHandMovingUp = true;
    } else if (event.code === "ArrowDown") {
        isRightHandMovingDown = true;
    } else if (event.code === "ShiftLeft") {
        isLeftHandMovingUp = true;
    } else if (event.code === "ControlLeft") {
        isLeftHandMovingDown = true;
    }
}

// Обновление счета
function updateScore() {
    gameCounter.textContent = `${leftPlayerScore} : ${rightPlayerScore}`;
}

//  Обновление позиций платформ и мяча
function resetPosition() {
    addAnimationPlatform(); // Анимыция плавного возвращения платформ на страторвые позиции
    ballPosX = initBallPosX;
    ballPosY = initBallPosY;
    leftHandPosY = initLefHandPosY;
    rightHandPosY = initRightHandPosY;
    ballSpeedX = initBallSpeedX;
    ballSpeedY  = initballSpeedY;
    handsSpeed = initHandsSpeed;
    count = initCount;
    setTimeout(deleteAnimationPlatform, 500);
    clearInterval(deleteAnimationPlatform);
}

// Присваивание очков за гол
function isGoal() {
    const rightUserGoal = ballPosX > gameBoardWidth - ballWidth;
    const leftUserGoal = ballPosX < 0;

    if (leftUserGoal) {
        rightPlayerScore++;
        ballSpeedX = 0;
        ballSpeedY = 0;
        handsSpeed = 0;
        ballPosX = 0;
        // Залипание мяча у стенки на 1сек
        setTimeout(resetBall, 1000);
        updateScore();
        return;
    }
    if (rightUserGoal) {
        leftPlayerScore++;
        ballSpeedX = 0;
        ballSpeedY = 0;
        handsSpeed = 0;
        ballPosX = gameBoardWidth - ballWidth;
        // Залипание мяча у стенки на 1сек
        setTimeout(resetBall, 1000);
        updateScore();
        return;
    }
}

// Функция запуска анимации
function moving() {
    moveBall();
    movePlatforms();
    drawElementsGame();
    animationId = requestAnimationFrame(moving);
}

// Перезапуск мяча после гола
function resetBall() {
    cancelAnimationFrame(animationId); // Отменяем текущую анимацию
    resetPosition();
    drawElementsGame();
    startGame();
}

// Проверка окончания игры
const isGameOver = (leftPlayerScore, rightPlayerScore) => {
    if (leftPlayerScore === finalCount || rightPlayerScore === finalCount) {
        removeEventListeners(); // Удаляем слушатели событий
        cancelAnimationFrame(animationId); // Отменяем текущую анимацию
        messageElement.style.opacity = 1; // Выводим сообщения об окончании игры
        addEventListeners(); // Добавляем слушатели событий
        return true;
    }
    return false;
};

// Обратный отчет и генерация запуска
function counterDown() {
    countdownElement.innerHTML = count;
    const countDownInterval = setInterval(function () {
        count--;
        countdownElement.innerHTML = count;
        if (count === 0) {
            clearInterval(countDownInterval);
            countdownElement.innerHTML = "";
            randomMoveBall();
            moving();
        }
    }, 1000);
}

// Начало игры
const startGame = () => {
    // Проверяем не окончена ли игра
    if (!isGameOver(leftPlayerScore, rightPlayerScore)) {
        counterDown();
    }
};


// Сброс счета игры и сообщений при рестарте
const restartGame = () => {
    messageElement.style.opacity = 0;
    rightPlayerScore = 0;
    leftPlayerScore = 0;
    updateScore();
    startGame();
};


function removeEventListeners() {
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    buttonStart.removeEventListener("click", restartGame);
}

function addEventListeners() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    buttonStart.addEventListener("click", restartGame);
}

addEventListeners();

function addAnimationPlatform() {
    rightHand.classList.add("hands-animation");
    leftHand.classList.add("hands-animation");
}

function deleteAnimationPlatform() {
    rightHand.classList.remove("hands-animation");
    leftHand.classList.remove("hands-animation");
}
