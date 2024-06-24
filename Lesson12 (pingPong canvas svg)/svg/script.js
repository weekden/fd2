const svgNS = "http://www.w3.org/2000/svg";

const buttonStart = document.getElementById("button-start");
const gameCounter = document.getElementById("game-score");
const svgConteiner = document.getElementById("svg-conteiner");

// Объявляем константы ширины и высоты
const gameBoardWidth = parseFloat(svgConteiner.getAttributeNS(null, "width"));
const gameBoardHeight = parseFloat(svgConteiner.getAttributeNS(null, "height"));
const gameBoardColor = "#800080";

// Разметка игрового поля
const centerCirclePosX = gameBoardWidth / 2;
const centerCirclePosY = gameBoardHeight / 2;
const centerCircleRadius = gameBoardWidth / 8;
const lineWidth = 4.5;
const lineColor = "#ff00bf";

// Платформы
const handWidth = 20;
const handHight = 100;
const initHandsSpeed = 10;
const initleftHandPosX = 0;
const initLefrHandPosY = (gameBoardHeight - handHight) / 2;
const initRightHandPosY = (gameBoardHeight - handHight) / 2;
const initrightHandPosX = gameBoardWidth - handWidth;
const handsColor = "#00ff00";
let leftHandPosY = initLefrHandPosY;
let rightHandPosY = initRightHandPosY;
let handSpeed = initHandsSpeed;

// Мяч
const ballRadius = 10;
const ballMaxSpeedX = 15;
const initBallPosX = gameBoardWidth / 2;
const initBallPosY = gameBoardHeight / 2;
const initBallSpeedX = 5;
const initBallSpeedY = 5;
const ballColor = "#ffff00";
let ballSpeedX = initBallSpeedX;
let ballSpeedY = initBallSpeedY;
let ballPosX = initBallPosX;
let ballPosY = initBallPosY;

// Обратный отчет
const downCounterPosX = gameBoardWidth / 2;
const downCounterPosY = gameBoardHeight / 3;
const downCounterColor = "white";
const downCounterSize = 80;
const initCount = 3; // Начальный отсчет
let count = initCount;

// Информациолнное сообщение1 "Конец игры"
const ggMessagePosX = gameBoardWidth / 2;
const ggMessagePosY = gameBoardHeight / 5;
const ggMessageColor = "white";
const ggMessageSize = 80;
const ggMessageText = "GG!";

// Информациолнное сообщение2 "Перезапуск игры"
const restartMessagePosX = gameBoardWidth / 2;
const restartMessagePosY = gameBoardHeight / 3;
const restartMessageColor = "white";
const restartMessageSize = 20;
const restartMessageText = "For next try please press START";

// Лого
const gameBoardLogoPosX = (gameBoardWidth * 4) / 5;
const gameBoardLogoPosY = (gameBoardHeight * 5) / 6;
const gameBoardLogoColor = "#ff00bf";
const gameBoardLogoTextSize = 60;
const gameBoardLogoText = "SVG";

// Флаги для перемещения платформ
let isRightHandMovingUp = false;
let isRightHandMovingDown = false;
let isLeftHandMovingUp = false;
let isLeftHandMovingDown = false;

const finalCount = 5; // Победное количество очков
const speedBallCoef = 1.1; // Коэфицент ускорения
let rightPlayerScore = 0; // Начальное количество очков
let leftPlayerScore = 0; // Начальное количество очков
let angle = null; //  угол старта мяча
let animationId; //  id  анимации

gameCounter.innerHTML = `${leftPlayerScore} : ${rightPlayerScore}`;
// Создаем игровое поле и элементы 
const createElements = () => {
    // игровое поле 
    const gameBoard = document.createElementNS(svgNS, "rect");
    gameBoard.setAttributeNS(null, "x", 0);
    gameBoard.setAttributeNS(null, "y", 0);
    gameBoard.setAttributeNS(null, "width", gameBoardWidth);
    gameBoard.setAttributeNS(null, "height", gameBoardHeight);
    gameBoard.setAttributeNS(null, "fill", gameBoardColor);

    // Центральный круг
    const centerCircle = document.createElementNS(svgNS, "circle");
    centerCircle.setAttributeNS(null, "cx", centerCirclePosX);
    centerCircle.setAttributeNS(null, "cy", centerCirclePosY);
    centerCircle.setAttributeNS(null, "r", centerCircleRadius);
    centerCircle.setAttributeNS(null, "stroke", lineColor);
    centerCircle.setAttributeNS(null, "fill", "transparent");
    centerCircle.setAttributeNS(null, "stroke-width", lineWidth);

    // Центральная линия
    const centerLine = document.createElementNS(svgNS, "line");
    centerLine.setAttributeNS(null, "x1", gameBoardWidth / 2);
    centerLine.setAttributeNS(null, "y1", 0);
    centerLine.setAttributeNS(null, "x2", gameBoardWidth / 2);
    centerLine.setAttributeNS(null, "y2", gameBoardHeight);
    centerLine.setAttributeNS(null, "stroke", lineColor);
    centerLine.setAttributeNS(null, "stroke-width", lineWidth);

    // Лого
    const gameBoardLogo = document.createElementNS(svgNS, "text");
    gameBoardLogo.setAttributeNS(null, "x", gameBoardLogoPosX);
    gameBoardLogo.setAttributeNS(null, "y", gameBoardLogoPosY);
    gameBoardLogo.setAttribute("text-anchor", "middle");
    gameBoardLogo.setAttribute("dominant-baseline", "middle");
    gameBoardLogo.setAttributeNS(null, "font-size", gameBoardLogoTextSize);
    gameBoardLogo.setAttributeNS(null, "fill", gameBoardLogoColor);
    gameBoardLogo.innerHTML = gameBoardLogoText;

    // Обратный отсчет
    const downCounter = document.createElementNS(svgNS, "text");
    downCounter.setAttributeNS(null, "x", downCounterPosX);
    downCounter.setAttributeNS(null, "y", downCounterPosY);
    downCounter.setAttribute("text-anchor", "middle");
    downCounter.setAttribute("dominant-baseline", "middle");
    downCounter.setAttributeNS(null, "font-size", downCounterSize);
    downCounter.setAttributeNS(null, "fill", downCounterColor);

    // Сообщение "Конец игры"
    const ggMesage = document.createElementNS(svgNS, "text");
    ggMesage.setAttributeNS(null, "x", ggMessagePosX);
    ggMesage.setAttributeNS(null, "y", ggMessagePosY);
    ggMesage.setAttribute("text-anchor", "middle");
    ggMesage.setAttribute("dominant-baseline", "middle");
    ggMesage.setAttributeNS(null, "font-size", ggMessageSize);
    ggMesage.setAttributeNS(null, "fill", ggMessageColor);

    // Сообщение "Рестарт игры"
    const restartMesage = document.createElementNS(svgNS, "text");
    restartMesage.setAttributeNS(null, "x", restartMessagePosX);
    restartMesage.setAttributeNS(null, "y", restartMessagePosY);
    restartMesage.setAttribute("text-anchor", "middle");
    restartMesage.setAttribute("dominant-baseline", "middle");
    restartMesage.setAttributeNS(null, "font-size", restartMessageSize);
    restartMesage.setAttributeNS(null, "fill", restartMessageColor);

    // Мяч
    const ball = document.createElementNS(svgNS, "circle");
    ball.setAttributeNS(null, "cx", initBallPosX);
    ball.setAttributeNS(null, "cy", initBallPosY);
    ball.setAttributeNS(null, "r", ballRadius);
    ball.setAttributeNS(null, "fill", ballColor);

    // Ракетки
    const leftHand = document.createElementNS(svgNS, "rect");
    leftHand.setAttributeNS(null, "x", initleftHandPosX);
    leftHand.setAttributeNS(null, "y", initLefrHandPosY);
    leftHand.setAttributeNS(null, "width", handWidth);
    leftHand.setAttributeNS(null, "height", handHight);
    leftHand.setAttributeNS(null, "fill", handsColor);

    const rightHand = document.createElementNS(svgNS, "rect");
    rightHand.setAttributeNS(null, "x", initrightHandPosX);
    rightHand.setAttributeNS(null, "y", initLefrHandPosY);
    rightHand.setAttributeNS(null, "width", handWidth);
    rightHand.setAttributeNS(null, "height", handHight);
    rightHand.setAttributeNS(null, "fill", handsColor);

    // Добавляем отрисованнае элементы на игровое поле
    svgConteiner.append(gameBoard, centerCircle, centerLine, gameBoardLogo, ball, leftHand, rightHand, downCounter, ggMesage, restartMesage);
    
    return {gameBoard, centerCircle, centerLine, gameBoardLogo, ball, leftHand, rightHand, downCounter, ggMesage, restartMesage};
};
const elements = createElements();

// Обработка нажатия клавиши
const keyUpHandler = (event) => {
    if (event.code === "ArrowUp") {
        isRightHandMovingUp = false;
    } else if (event.code === "ArrowDown") {
        isRightHandMovingDown = false;
    } else if (event.code === "ShiftLeft") {
        isLeftHandMovingUp = false;
    } else if (event.code === "ControlLeft") {
        isLeftHandMovingDown = false;
    }
};

// Обработка отпускания клавиши
const keyDownHandler = (event) => {
    if (event.code === "ArrowUp") {
        isRightHandMovingUp = true;
    } else if (event.code === "ArrowDown") {
        isRightHandMovingDown = true;
    } else if (event.code === "ShiftLeft") {
        isLeftHandMovingUp = true;
    } else if (event.code === "ControlLeft") {
        isLeftHandMovingDown = true;
    }
};

// Генерация случайного направления мяча при старте
const randomMoveBall = () => {
    if (Math.random() < 0.5) {
        angle = ((Math.random() * 120 - 60) * Math.PI) / 180;
    } else {
        angle = ((Math.random() * 120 + 120) * Math.PI) / 180;
    }
};

// Передвижение платформ
const movePlatforms = () => {
    // Передвижение платформ по Y
    if (isRightHandMovingUp) {
        rightHandPosY -= handSpeed;
    }
    if (isRightHandMovingDown) {
        rightHandPosY += handSpeed;
    }
    if (isLeftHandMovingUp) {
        leftHandPosY -= handSpeed;
    }
    if (isLeftHandMovingDown) {
        leftHandPosY += handSpeed;
    }

    // Условие вертикального хода платформ
    if (leftHandPosY < 0) {
        leftHandPosY = 0;
    }

    if (leftHandPosY + handHight > gameBoardHeight) {
        leftHandPosY = gameBoardHeight - handHight;
    }

    if (rightHandPosY < 0) {
        rightHandPosY = 0;
    }

    if (rightHandPosY + handHight > gameBoardHeight) {
        rightHandPosY = gameBoardHeight - handHight;
    }
};

// Движение мяча
const moveBall = () => {
    ballPosX += Math.cos(angle) * ballSpeedX; //  направление по X
    ballPosY += Math.sin(angle) * ballSpeedY; //  направление по Y

    // Отскок от левой платформы
    if (ballPosX - ballRadius <= initleftHandPosX + handWidth && ballPosY + ballRadius >= leftHandPosY && ballPosY - ballRadius <= leftHandPosY + handHight) {
        ballPosX = handWidth + ballRadius;
        if (ballSpeedX < ballMaxSpeedX) {
            ballSpeedX = -ballSpeedX * speedBallCoef;
        } else {
            ballSpeedX = -ballMaxSpeedX;
        }
    }

    // Отскок от правой платформы
    if (ballPosX + ballRadius >= initrightHandPosX && ballPosY + ballRadius >= rightHandPosY && ballPosY - ballRadius <= rightHandPosY + handHight) {
        ballPosX = gameBoardWidth - handWidth - ballRadius;
        if (ballSpeedX < ballMaxSpeedX) {
            ballSpeedX = -ballSpeedX * speedBallCoef;
        } else {
            ballSpeedX = -ballMaxSpeedX;
        }
    }

    // Пролет мимо платформ, мяч попадает в правую или левую стенку
    if (ballPosX - ballRadius <= 0 || ballPosX + ballRadius >= gameBoardWidth) {
        isGoal();
        return;
    }

    // Отскок от верхней стенки
    if (ballPosY + ballRadius >= gameBoardHeight) {
        ballSpeedY = -ballSpeedY;
        ballPosY = gameBoardHeight - ballRadius;
    }

    // Отскок от нижней стенки
    if (ballPosY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
        ballPosY = ballRadius;
    }
};

// Проверяем кому гол и зачисляем очки
const isGoal = () => {
    const rightUserGoal = ballPosX + ballRadius > gameBoardWidth;
    const leftUserGoal = ballPosX - ballRadius < 0;

    if (!rightUserGoal && !leftUserGoal) {
        return;
    }

    if (leftUserGoal) {
        rightPlayerScore++;
        ballSpeedX = 0;
        ballSpeedY = 0;
        handSpeed = 0;
        ballPosX = ballRadius;
    }

    if (rightUserGoal) {
        leftPlayerScore++;
        ballSpeedX = 0;
        ballSpeedY = 0;
        handSpeed = 0;
        ballPosX = gameBoardWidth - ballRadius;
    }
    // Залипание мяча у стенки на 1сек
    setTimeout(resetBall, 1000);
    // Обновляем табло с очками
    updateScore();
    return;
};

// Сброс позиций на начальные
const resetPos = () => {
    ballPosX = initBallPosX;
    ballPosY = initBallPosY;
    ballSpeedX = initBallSpeedX;
    ballSpeedY = initBallSpeedY;
    leftHandPosY = initLefrHandPosY;
    rightHandPosY = initRightHandPosY;
    handSpeed = initHandsSpeed;
    count = initCount;
};

// Перезапуск мяча
const resetBall = () => {
    cancelAnimationFrame(animationId); // Отменяем текущую анимацию
    resetPos(); // Сброс позиций на начальные
    resetPositionMotionElements(); // Обновляем позиции элементов в SVG
    startGame(); // Запускаем игру
};

// Обновляем табло с очками
const updateScore = () => {
    gameCounter.innerHTML = `${leftPlayerScore} : ${rightPlayerScore}`;
};

// Функция запуска анимации
const motion = () => {
    moveBall(); // Движение мяча
    movePlatforms(); // Движение платформ
    resetPositionMotionElements(); // Обновляем позиции элементов в SVG
    animationId = requestAnimationFrame(motion);
};

// Обратный отсчет
const counterDown = () => {
    elements.downCounter.innerHTML = count; // Выводим первоначальное значение счетчика
    // Объявляем интервал
    const countDownInterval = setInterval(() => {
        count--;
        elements.downCounter.innerHTML = count; // Выводим  значение счетчика
        if (count === 0) {
            elements.downCounter.innerHTML = "";
            clearInterval(countDownInterval); // Удаляем интервал
            randomMoveBall(); // Расчитываем случайный угол для стартового запуска мяча
            motion();
        }
    }, 1000);
};


// Обновляем позиции элементов в SVG
const resetPositionMotionElements = () => {
    elements.ball.setAttributeNS(null, "cx", ballPosX);
    elements.ball.setAttributeNS(null, "cy", ballPosY);
    elements.leftHand.setAttributeNS(null, "y", leftHandPosY);
    elements.rightHand.setAttributeNS(null, "y", rightHandPosY);
};

// Проверка окончания игры
const isGameOver = (leftPlayerScore, rightPlayerScore) => {
    if (leftPlayerScore === finalCount || rightPlayerScore === finalCount) {
        removeEventListeners(); // Удаляем слушатели событий
        cancelAnimationFrame(animationId); // Отменяем текущую анимацию
        elements.ggMesage.innerHTML = ggMessageText; // Выводим сообщения об окончании игры
        elements.restartMesage.innerHTML = restartMessageText; // Выводим сообщения о возможности перезапуска игшры
        addEventListeners(); // Добавляем слушатели событий
        return true;
    }
    return false;
};

// Начало игры
const startGame = () => {
    // Проверяем не окончена ли игра
    if (!isGameOver(leftPlayerScore, rightPlayerScore)) {
        counterDown();
    }
};

// Сброс счета игры и сообщений при рестарте
const restartGame = () => {
    elements.ggMesage.innerHTML = "";
    elements.restartMesage.innerHTML = "";
    rightPlayerScore = 0;
    leftPlayerScore = 0;
    updateScore();
    startGame();
};

const removeEventListeners = () => {
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    buttonStart.removeEventListener("click", restartGame);
};

const addEventListeners = () => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    buttonStart.addEventListener("click", restartGame);
};

addEventListeners();
