const gameBoard = document.getElementById("game-canvas");
const buttonStart = document.getElementById("button-start");
const gameCounter = document.getElementById("game-score");
const ctx = gameBoard.getContext("2d");

// Размеры игрового поля
const gameBoardWidth = gameBoard.width;
const gameBoardHeight = gameBoard.height;

// Разметка игрового поля
const centerCirclePosX = gameBoardWidth / 2;
const centerCirclePosY = gameBoardHeight / 2;
const centerCircleRadius = gameBoardWidth / 8;

// Платформы
const handWidth = 20;
const handHight = 100;
const initHandSpeed = 10;
const leftHandPosX = 0;
const initLefrHandPosY = (gameBoardHeight - handHight) / 2;
const initRightHandPosY = (gameBoardHeight - handHight) / 2;
const rightHandPosX = gameBoardWidth - handWidth;
let leftHandPosY = initLefrHandPosY;
let rightHandPosY = initRightHandPosY;
let handSpeed = initHandSpeed;

// Мяч
const ballRadius = 10;
const ballHeight = 20;
const ballWidth = 20;
const ballMaxSpeedX = 15;
const initBallPosX = gameBoardWidth / 2;
const initBallPosY = gameBoardHeight / 2;
const initBallSpeedX = 5;
const initBallSpeedY = 5;
let ballSpeedX = initBallSpeedX;
let ballSpeedY = initBallSpeedY;
let ballPosX = initBallPosX;
let ballPosY = initBallPosY;


// Флаги для перемещения платформ
let isRightHandMovingUp = false;
let isRightHandMovingDown = false;
let isLeftHandMovingUp = false;
let isLeftHandMovingDown = false;


const finalCount = 5;            // Победное количество очков
const speedBallCoef = 1.1;       // Коэфицент ускорения
const initCount = 3; 
let count = initCount;                 // Начальный отсчет
let rightPlayerScore = 0;      // Начальное количество очков
let leftPlayerScore = 0;        // Начальное количество очков
let angle = null;               //  угол старта мяча
let animationId;                //  id  анимации

gameCounter.innerHTML = `${leftPlayerScore} : ${rightPlayerScore}`;

// Игровое поле
const drawGameBoard = () => {
    ctx.beginPath();
    ctx.fillStyle = "#800080";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(0, 0, gameBoardWidth, gameBoardHeight);
    ctx.fillStyle = "#ff00bf"; 
    ctx.font = `80px serif`;
    ctx.textAlign = "center";      
    ctx.textBaseline = "middle";   
    ctx.fillText(`canvas`, (gameBoardWidth * 3) / 4, gameBoardHeight * 5 / 6);
    ctx.fillStyle = "#800080"; 
    ctx.strokeRect(0, 0, gameBoardWidth, gameBoardHeight);
    ctx.closePath();
}

// Центральный круг
const drawCenterCircle = () => {
    ctx.beginPath();
    ctx.fillStyle = "#800080";
    ctx.strokeStyle = "#ff00bf";
    ctx.lineWidth = 7.5;
    ctx.arc(centerCirclePosX, centerCirclePosY, centerCircleRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

// Центральная линия
const drawCenterLine = () => {
    ctx.beginPath();
    ctx.strokeStyle = "#ff00bf";
    ctx.lineWidth = 4.5;
    ctx.moveTo(gameBoardWidth / 2, 0);
    ctx.lineTo(gameBoardWidth / 2, gameBoardHeight);
    ctx.stroke();
    ctx.closePath();
}

// Мяч
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ballPosX, ballPosY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffff00";
    ctx.fill();
    ctx.closePath();
}

// Платформы
const drawHands = () => {
    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(0, leftHandPosY, handWidth, handHight);
    ctx.fillRect(gameBoardWidth - handWidth, rightHandPosY, handWidth, handHight);
    ctx.closePath();
}

// Обратный отчсет
const drawMessageDownCounter = () => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = `80px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${count}`, gameBoardWidth / 2, gameBoardHeight / 3);
    ctx.closePath();
}

// Информационное сообщение
const drawMessageGameOver = () => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = `80px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Конец игры`, gameBoardWidth / 2, gameBoardHeight / 5);
    ctx.closePath();
    gameBoard.classList.add("gameover-animation");
}

// Информационное сообщение
const drawMessageResetGame = () => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = `20px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Чтобы начать Нажмите START`, gameBoardWidth / 2, gameBoardHeight / 3);
    ctx.closePath();
    gameBoard.classList.add("gameover-animation");
}

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
}

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
}

// Генерация случайного направления мяча при старте
const randomMoveBall = () => {
    if (Math.random() < 0.5) {
        angle = ((Math.random() * 120 - 60) * Math.PI) / 180;
    } else {
        angle = ((Math.random() * 120 + 120) * Math.PI) / 180;
    }
}

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
}

// Движение мяча
const moveBall = () => {
    ballPosX += Math.cos(angle) * ballSpeedX; //  направление по X
    ballPosY += Math.sin(angle) * ballSpeedY; //  направление по Y

    // Отскок от левой платформы
    if (ballPosX - ballRadius <= leftHandPosX + handWidth &&
        ballPosY + ballRadius >= leftHandPosY &&
        ballPosY - ballRadius <= leftHandPosY + handHight) {
            ballPosX = handWidth + ballRadius;
            if (ballSpeedX < ballMaxSpeedX) {
                ballSpeedX = -ballSpeedX * speedBallCoef;
            } else {
                ballSpeedX = -ballMaxSpeedX;
            }
    }

    // Отскок от правой платформы
    if (ballPosX + ballRadius >= rightHandPosX && 
        ballPosY + ballRadius >= rightHandPosY && 
        ballPosY - ballRadius <= rightHandPosY + handHight) {
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
}

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
}

 // Сброс позиций на начальные
const resetPos = () => {
    ballPosX = initBallPosX;
    ballPosY = initBallPosY;
    ballSpeedX = initBallSpeedX;
    ballSpeedY = initBallSpeedY;
    leftHandPosY = initLefrHandPosY;
    rightHandPosY = initRightHandPosY;
    handSpeed = initHandSpeed;
    count = initCount;
}




 // Перезапуск мяча
const resetBall = () => {
    cancelAnimationFrame(animationId);   // Отменяем текущую анимацию
    gameBoard.width = gameBoard.width;   // Очищаем поле  
    resetPos();                          // Обнуляем позиции 
    drawStaticElements();                // Перерисовываем поле и элементы в статике
    startGame();                         // Запускаем игру
}

// Обновляем табло с очками
const updateScore = () => {
    gameCounter.innerHTML = `${leftPlayerScore} : ${rightPlayerScore}`;
}

// Отрисовываем статические элементы
const drawStaticElements = () => {
    drawGameBoard();
    drawCenterCircle();
    drawCenterLine();
    drawBall();
    drawHands();
}
drawStaticElements();

// Отрисовываем  элементы в динамике
const drawMuvigElements = () => {
    moveBall();
    movePlatforms();
}

//Общая отрисовка кадра
const draw = () => {
    drawStaticElements();
    drawMuvigElements();
    animationId = requestAnimationFrame(draw);
}

// Проверка окончания игры
const isGameOver = (leftPlayerScore, rightPlayerScore) => {
    if (leftPlayerScore === finalCount || rightPlayerScore === finalCount) {
        removeEventListeners();                 // Удаляем слушатели событий
        cancelAnimationFrame(animationId);      // Отменяем текущую анимацию
        drawMessageGameOver();                  // Выводим сообщения об окончании игры
        drawMessageResetGame();                 // Выводим сообщения о возможности перезапуска игшры
        addEventListeners();                    // Добавляем слушатели событий
        return true;
    }
    return false;
}

// Начало игры
const startGame = () => {
    gameBoard.width = gameBoard.width;           // Очищаем поле  
    drawStaticElements();                       // Отрисовываем статические элементы
    // Проверяем не окончена ли игра
    if(!isGameOver(leftPlayerScore, rightPlayerScore)) {    
        counterDown();
          
    }  
}

// Обратный отсчет
const counterDown = () => {
    drawMessageDownCounter(count);      // Выводим первоначальное значение счетчика
    const countDownInterval = setInterval(() => {     // Объявляем интервал
        gameBoard.width = gameBoard.width;            // Очищаем поле  
        count--;                                        
        drawStaticElements();                         // Отрисовываем статические элементы 
        drawMessageDownCounter(count);                // Выводим  значение счетчика
        if (count === 0) {
            clearInterval(countDownInterval);           // Удаляем интервал
            drawStaticElements();                       // Отрисовываем статические элементы 
            randomMoveBall();                           // Расчитываем случайный угол для стартового запуска мяча
            draw();                                     // Полная отрисовка ("запуск")
        }
    }, 1000);
}


// Сброс счетчика при рестарте 
const restartGame = () => {
    rightPlayerScore = 0;
    leftPlayerScore = 0;
    updateScore();
    startGame();
}

const removeEventListeners = () => {
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    buttonStart.removeEventListener("click", restartGame);
}

const addEventListeners = () => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    buttonStart.addEventListener("click", restartGame);
}

addEventListeners();
