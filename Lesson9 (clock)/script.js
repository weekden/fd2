
const degreeCircle = 360;
const minutesSecondsClockTicks = 60;
const hoursClockTicks = 12;
const hourClockDegree = degreeCircle / hoursClockTicks;
const minutesSecondsDegreeCoef = degreeCircle / minutesSecondsClockTicks;
const hoursDegreeCoef = degreeCircle / hoursClockTicks;
const clockNumberArray = [];


//Объявляем основной циферблат
const clockTable = document.createElement("div");
clockTable.classList.add("clock-table");
document.body.append(clockTable);

//Объявляем часовую стрелку
const hourHand = document.createElement("div");
hourHand.classList.add("hour-hand");

//Объявляем минутную стрелку
const minuteHand = document.createElement("div");
minuteHand.classList.add("minute-hand");

//Объявляем секундную стрелку
const secondHand = document.createElement("div");
secondHand.classList.add("second-hand");


//Объявляем центр циферблата
const centerClockTable = document.createElement("div");
centerClockTable.classList.add("clock-table__center");


clockTable.append(centerClockTable, hourHand, minuteHand, secondHand);

for (let i = 0; i < hoursClockTicks; i++) {
    //Объявляем элементы циферблата
    const clockCyrcleNumber = document.createElement("div");
    clockCyrcleNumber.classList.add("cyrcle-number");
    //Добавляем номера элементам циферблата
    const clockNumber = document.createElement("div");
    clockNumber.classList.add("clock-number");
    clockNumber.innerHTML = i + 1;
    clockCyrcleNumber.appendChild(clockNumber);
    //Добавляем  элементам циферблата в массив
    clockNumberArray.push(clockCyrcleNumber);
}

for (let i = 0; i < hoursClockTicks / 2; i++) {
    // Выставляем нулевой угол для пар циферблата
    const angle = (3 - i) * hourClockDegree;
    // Объявляем блок для пар циферблата 
    const twinDiv = document.createElement("div");
    twinDiv.classList.add("twin-div");
    // Создаем пары в блоке
    twinDiv.append(clockNumberArray[clockNumberArray.length - 1 - i]);
    twinDiv.append(clockNumberArray[(clockNumberArray.length / 2) - 1 - i]);
    // Выставляем пары под углом
    twinDiv.style.transform = `rotate(${angle}deg)`;
    // Выставляем в горизонтальном положении  содержимое пар циферблата
    clockNumberArray[clockNumberArray.length - 1 - i].style.transform = `rotate(${-angle}deg)`;
    clockNumberArray[(clockNumberArray.length / 2) - 1 - i].style.transform = `rotate(${-angle}deg)`;

    clockTable.append(twinDiv);
}

function showTime() {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    //Объявляем угол поворота секундной стрелки
    const secondsRotate = seconds * minutesSecondsDegreeCoef;

    //Объявляем угол поворота минутной стрелки
    const minutesRotate = minutes * minutesSecondsDegreeCoef;

    //Объявляем добавочный угол поворота часовой стрелки
    const hoursOffsetDegree = hourClockDegree * minutes / minutesSecondsClockTicks;

    //Объявляем угол поворота часовой стрелки
    const hoursRotate = hours * hoursDegreeCoef + hoursOffsetDegree; 

    if (seconds === 0) {
        document.querySelector(".hour-hand").style.transform = `rotate(${hoursRotate}deg)`;
    } else {
        document.querySelector(".hour-hand").style.transform = `rotate(${hoursRotate}deg)`;
    }


    document.querySelector(".second-hand").style.transform = `rotate(${secondsRotate}deg)`;
    document.querySelector(".minute-hand").style.transform = `rotate(${minutesRotate}deg)`;
}

setInterval(showTime, 1000)