const canvas = document.getElementById("canvas-clock");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(canvas.width, canvas.height) / 2;
const radiusSmallCyrcle = radius / 10;
const radiusSmall = radius * 0.8;
const centerClockTableSize = radius / 30;

const degreeCircle = 360;
const minutesSecondsClockTicks = 60;
const hoursClockTicks = 12;
const hourClockDegree = degreeCircle / hoursClockTicks;
const minutesSecondsDegreeCoef = degreeCircle / minutesSecondsClockTicks;
const hoursDegreeCoef = degreeCircle / hoursClockTicks;

function createClockTable() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(centerX, centerY, centerClockTableSize, 0, 2 * Math.PI);
    ctx.fillStyle = "#333333";
    ctx.fill();
    ctx.closePath();

    for (let i = 0; i < 12; i++) {
        const angle = (i - 2) * 30;
        const radians = (angle * Math.PI) / 180;

        const x = centerX + Math.cos(radians) * radiusSmall;
        const y = centerY + Math.sin(radians) * radiusSmall;

        ctx.beginPath();
        ctx.arc(x, y, radiusSmallCyrcle, 0, 2 * Math.PI);
        ctx.fillStyle = "#989898";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "#333333";
        ctx.font = `${radius * 0.1}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${i + 1}`, x, y);
        ctx.closePath();
    }
}
function showTime() {
    let date = new Date();

    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    //Объявляем угол поворота секундной стрелки
    let secondsRotate = seconds * minutesSecondsDegreeCoef;

    //Объявляем угол поворота минутной стрелки
    let minutesRotate = minutes * minutesSecondsDegreeCoef;

    //Объявляем добавочный угол поворота часовой стрелки
    const hoursOffsetDegree = (hourClockDegree * minutes) / minutesSecondsClockTicks;

    //Объявляем угол поворота часовой стрелки
    let hoursRotate = hours * hoursDegreeCoef + hoursOffsetDegree;

    // Рисуем часы с новым временем
    createClockTable(ctx, centerX, centerY, radius);

    // Условие для корректной отрисовки электронного табло
    const digitalHours = hours < 10 ? "0" + hours : hours;
    const digitalMinuts = minutes < 10 ? "0" + minutes : minutes;
    const digitalSeconds = seconds < 10 ? "0" + seconds : seconds;

    // Рисуем электронного табло
    ctx.beginPath();
    ctx.fillStyle = "#333333";
    ctx.font = `${radius * 0.15}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${digitalHours} : ${digitalMinuts} : ${digitalSeconds}`, centerX, centerY / 2);
    ctx.closePath();

    ctx.lineCap = "round";

    // Рисуем секундную стрелку
    ctx.beginPath();
    ctx.lineWidth = radius * 0.01;
    ctx.translate(centerX, centerY);
    ctx.rotate((Math.PI * secondsRotate) / 180);
    ctx.moveTo(0, radius * 0.05);
    ctx.lineTo(0, -radius * 0.65);
    ctx.stroke();
    ctx.resetTransform();
    ctx.closePath();

    // Рисуем минутную стрелку
    ctx.beginPath();
    ctx.lineWidth = radius * 0.02;
    ctx.translate(centerX, centerY);
    ctx.rotate((Math.PI * minutesRotate) / 180);
    ctx.moveTo(0, radius * 0.05);
    ctx.lineTo(0, -radius * 0.6);
    ctx.stroke();
    ctx.resetTransform();
    ctx.closePath();

    // // Рисуем часовую стрелку
    ctx.beginPath();
    ctx.lineWidth = radius * 0.04;
    ctx.translate(centerX, centerY);
    ctx.rotate((Math.PI * hoursRotate) / 180);
    ctx.moveTo(0, radius * 0.05);
    ctx.lineTo(0, -radius * 0.5);
    ctx.stroke();
    ctx.resetTransform();
    ctx.closePath();
}

setInterval(showTime, 1000);