const MyModule = (function () {
    function Constructor() {
        let myModel = null; // с какой моделью работаем
        let myContainer = null; // внутри какого элемента наша вёрстка

        this.init = function (model, container) {
            myModel = model;
            myContainer = container;

            const btnStart = myContainer.querySelector(".btn-start");
            btnStart.addEventListener("click", this.runTime);

            const btnStop = myContainer.querySelector(".btn-stop");
            btnStop.addEventListener("click", this.stopTime);

            const timeZoneSelect = myContainer.querySelector(".time-zone");
            timeZoneSelect.addEventListener("change", this.getTimeZoneAndCity);

            document.addEventListener("DOMContentLoaded", this.getTimeZoneAndCity);
            // document.documentElement.style.setProperty("--size", size);
        };

        this.runTime = function () {
            myModel.runTime();
        };

        this.stopTime = function () {
            myModel.stopTime();
        };

        this.getTimeZoneAndCity = function () {
            // Вот тут с селектором подсмотрел никак не получалось обработать событие "change" при загрузке
            const selectedOption = myContainer.querySelector(".time-zone option:checked");
            id = selectedOption.value;
            city = selectedOption.textContent;

            myModel.setTimeZone(id);
            myModel.setTimeZoneCity(city);
        };
    }

    function Model() {
        let myView = null;
        let intervalId = null;
        let timeZoneOffset = null;
        let isRuning = false;
        let degreeObj = {
            hours: "",
            minutes: "",
            seconds: "",
            hourDeg: 0,
            minuteDeg: 0,
            secondDeg: 0,
            currentDate: "",
        };

        this.init = function (view) {
            myView = view;
            this.runTime();
        };

        this.runTime = function () {
            isRuning = true;
            intervalId = setInterval(() => {
                this.updateTime();
            }, 1000);
        };

        this.stopTime = function () {
            isRuning = false;
            clearInterval(intervalId);
        };

        this.setTimeZone = function (id) {
            timeZoneOffset = id;
        };

        this.setTimeZoneCity = function (city) {
            myView.showCity(city);
        };

        this.updateTime = function () {
            if (!isRuning) return;
            const degreeCircle = 360;
            const minutesSecondsClockTicks = 60;
            const hoursClockTicks = 12;
            const hourClockDegree = degreeCircle / hoursClockTicks;
            const minutClockDegree = degreeCircle / minutesSecondsClockTicks;

            const hoursLenghtMS = 3600000;

            const dateNow = new Date();
            const currentTimeZoneOffsetInMS = dateNow.getTimezoneOffset() * 60000;
            const newDate = new Date(dateNow.getTime() + currentTimeZoneOffsetInMS + timeZoneOffset * hoursLenghtMS);
            const currentDate = newDate.toDateString();
            let hours = newDate.getHours();
            let minutes = newDate.getMinutes();
            let seconds = newDate.getSeconds();

            const hoursDegreeCoef = degreeCircle / hoursClockTicks;
            const minutesSecondsDegreeCoef = degreeCircle / minutesSecondsClockTicks;
            const hoursOffsetDegree = (hourClockDegree * minutes) / minutesSecondsClockTicks;
            const minutsOffsetDegree = (minutClockDegree * seconds) / minutesSecondsClockTicks;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            const hourDeg = hoursDegreeCoef * hours + hoursOffsetDegree;
            const minuteDeg = minutesSecondsDegreeCoef * minutes + minutsOffsetDegree;
            const secondDeg = minutesSecondsDegreeCoef * seconds;
            degreeObj = {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                hourDeg: hourDeg,
                minuteDeg: minuteDeg,
                secondDeg: secondDeg,
                currentDate: currentDate,
            };

            myView.showTime(degreeObj);
        };
    }

    function ViewDOM() {
        let myContainer = null;
        let clock = null;

        this.init = function (container) {
            myContainer = container;
            this.showCity();
            this.crateClockTable();
        };

        this.showCity = function (city) {
            const cityString = myContainer.querySelector(".city");
            cityString.innerHTML = city;
        };

        this.crateClockTable = function () {
            const clockTable = document.createElement("div");
            clockTable.classList.add("clock-table");
            myContainer.append(clockTable);

            const degreeCircle = 360;
            const hoursClockTicks = 12;
            const hourClockDegree = degreeCircle / hoursClockTicks;
            const radius = Math.min(clockTable.offsetWidth / 2, clockTable.offsetHeight / 2);
            const radiusSmall = radius * 0.8;

            //Объявляем часовую стрелку
            const hoursHand = document.createElement("div");
            hoursHand.classList.add("hour-hand");

            //Объявляем минутную стрелку
            const minutsHand = document.createElement("div");
            minutsHand.classList.add("minute-hand");

            //Объявляем секундную стрелку
            const secondsHand = document.createElement("div");
            secondsHand.classList.add("second-hand");

            //Объявляем центр циферблата
            const centerClockTable = document.createElement("div");
            centerClockTable.classList.add("clock-table__center");

            //Объявляем электонный циферблат времени
            const digitalClock = document.createElement("div");
            digitalClock.classList.add("digital-clock");

            //Объявляем электонный циферблат даты
            const digitalDate = document.createElement("div");
            digitalDate.classList.add("digital-date");

            //Объявляем логотип часов
            const clockLogo = document.createElement("div");
            clockLogo.classList.add("clock-logo");
            clockLogo.innerHTML = "DOM";

            clockTable.prepend(centerClockTable, hoursHand, minutsHand, secondsHand, digitalClock, digitalDate, clockLogo);

            for (let i = 0; i < hoursClockTicks; i++) {
                // Определяем угол для каждого элемента циферблата
                const angle = (i + 4) * hourClockDegree;
                const radians = (angle * Math.PI) / 180;

                // Определяем координаты x и y для отрисовки элементов циферблата
                const x = Math.cos(radians) * radiusSmall;
                const y = Math.sin(radians) * radiusSmall;

                // Создаем элемент кружка на циферблате
                const circle = document.createElement("div");
                circle.classList.add("cyrcle-number");

                // Устанавливаем позицию кружка
                circle.style.left = `${radiusSmall + radius / 10 - x}px`;
                circle.style.top = `${radiusSmall + radius / 10 - y}px`;

                const clockNumber = document.createElement("div");
                clockNumber.classList.add("clock-number");
                clockNumber.innerHTML = i + 1;

                // Устанавливаем позицию цифры в центре кружка
                clockNumber.style.left = "50%";
                clockNumber.style.top = "50%";
                clockNumber.style.transform = "translate(-50%, -50%)";

                circle.append(clockNumber);
                clockTable.append(circle);
            }

            clock = {
                hoursHand: hoursHand,
                minutsHand: minutsHand,
                secondsHand: secondsHand,
                digitalClock: digitalClock,
                digitalDate: digitalDate,
            };

            return clock;
        };
        this.showTime = function (degreeObj) {
            if (!clock && !degreeObj) this.init();
            clock.hoursHand.style.transform = `rotate(${degreeObj.hourDeg}deg)`;
            clock.minutsHand.style.transform = `rotate(${degreeObj.minuteDeg}deg)`;
            clock.secondsHand.style.transform = `rotate(${degreeObj.secondDeg}deg)`;

            clock.digitalClock.innerHTML = `${degreeObj.hours} : ${degreeObj.minutes} : ${degreeObj.seconds}`;
            clock.digitalDate.innerHTML = `${degreeObj.currentDate}`;
        };
    }

    const ViewSVG = function () {
        let myContainer = null;
        let clock = null;
        let mySize = null;

        this.init = function (container, size) {
            myContainer = container;
            mySize = size;
            this.showCity();
            this.crateClockTable(mySize);
        };

        this.showCity = function (city) {
            const cityString = myContainer.querySelector(".city");
            cityString.innerHTML = city;
        };

        this.crateClockTable = function () {
            const svgNS = "http://www.w3.org/2000/svg";

            // Создаем SVG поле и объявляем  ширину и высоту
            const svgClock = document.createElementNS(svgNS, "svg");
            svgClock.setAttribute("width", mySize);
            svgClock.setAttribute("height", mySize);
            myContainer.append(svgClock);

            w = svgClock.getAttributeNS(null, "width");
            h = svgClock.getAttributeNS(null, "height");

            degreeCircle = 360;
            hoursClockTicks = 12;
            hourClockDegree = degreeCircle / hoursClockTicks;

            // Данные значение которые заданы относительно радиуса циферблата, что делает размеры циферблата динамическими
            radius = Math.min(w, h) / 2;
            radiusSmallCyrcle = radius / 10;
            radiusSmall = radius * 0.8;
            centerClockTableSize = radius / 30;

            clockTable = document.createElementNS(svgNS, "circle");
            clockTableCenter = document.createElementNS(svgNS, "circle");
            secondsHand = document.createElementNS(svgNS, "line");
            minutsHand = document.createElementNS(svgNS, "line");
            hoursHand = document.createElementNS(svgNS, "line");
            digitalClock = document.createElementNS(svgNS, "text");
            digitalDate = document.createElementNS(svgNS, "text");
            clockLogo = document.createElementNS(svgNS, "text");

            clockTable.setAttributeNS(null, "cx", w / 2);
            clockTable.setAttributeNS(null, "cy", h / 2);
            clockTable.setAttributeNS(null, "r", radius);
            clockTable.setAttributeNS(null, "fill", "#f0f0f0");
            svgClock.prepend(clockTable);

            for (let i = 0; i < hoursClockTicks; i++) {
                // Выставляем нулевой угол для элементов циферблата
                const angle = (i + 4) * hourClockDegree;
                const radians = (angle * Math.PI) / 180;

                // Опредляем координаты х для отрисовки элементов циферблата
                const x = Math.cos(radians) * radiusSmall;

                // Опредляем координаты y для отрисовки элементов циферблата
                const y = Math.sin(radians) * radiusSmall;
                const cyrcleSmall = document.createElementNS(svgNS, "circle");
                const cyrcleSmallNumber = document.createElementNS(svgNS, "text");

                //Элементы циферблата
                cyrcleSmall.setAttributeNS(null, "r", radiusSmallCyrcle);
                cyrcleSmall.setAttributeNS(null, "cx", `${radiusSmall + w / 10 - x}`);
                cyrcleSmall.setAttributeNS(null, "cy", `${radiusSmall + h / 10 - y}`);
                cyrcleSmall.setAttributeNS(null, "fill", "#989898");
                svgClock.append(cyrcleSmall);

                //Добавляем номера элементам циферблата
                cyrcleSmallNumber.setAttributeNS(null, "x", radiusSmall + w / 10 - x);
                cyrcleSmallNumber.setAttributeNS(null, "y", radiusSmall + h / 10 - y);
                cyrcleSmallNumber.setAttributeNS(null, "fill", "#333333");
                cyrcleSmallNumber.setAttributeNS(null, "font-size", radius * 0.1);
                cyrcleSmallNumber.setAttributeNS(null, "font-weight", "bold");
                cyrcleSmallNumber.setAttributeNS(null, "text-anchor", "middle");
                cyrcleSmallNumber.setAttributeNS(null, "alignment-baseline", "middle");
                cyrcleSmallNumber.innerHTML = i + 1;
                svgClock.append(cyrcleSmallNumber);
            }

            // Центр циферблата
            clockTableCenter.setAttributeNS(null, "cx", w / 2);
            clockTableCenter.setAttributeNS(null, "cy", h / 2);
            clockTableCenter.setAttributeNS(null, "r", centerClockTableSize);
            clockTableCenter.setAttributeNS(null, "fill", "#333333");
            svgClock.append(clockTableCenter);

            // Секундная стрелка
            secondsHand.setAttributeNS(null, "x1", w / 2);
            secondsHand.setAttributeNS(null, "y1", h / 2 + h / 20);
            secondsHand.setAttributeNS(null, "x2", w / 2);
            secondsHand.setAttributeNS(null, "y2", h / 6);
            secondsHand.setAttributeNS(null, "stroke", "#333333");
            secondsHand.setAttributeNS(null, "stroke-width", radius * 0.01);
            secondsHand.setAttributeNS(null, "stroke-linecap", "round");
            svgClock.append(secondsHand);

            // Минутная стрелка
            minutsHand.setAttributeNS(null, "x1", w / 2);
            minutsHand.setAttributeNS(null, "y1", h / 2 + h / 20);
            minutsHand.setAttributeNS(null, "x2", w / 2);
            minutsHand.setAttributeNS(null, "y2", h / 5);
            minutsHand.setAttributeNS(null, "stroke", "#333333");
            minutsHand.setAttributeNS(null, "stroke-width", radius * 0.025);
            minutsHand.setAttributeNS(null, "stroke-linecap", "round");
            svgClock.append(minutsHand);

            // Часовая стрелка
            hoursHand.setAttributeNS(null, "x1", w / 2);
            hoursHand.setAttributeNS(null, "y1", h / 2 + h / 20);
            hoursHand.setAttributeNS(null, "x2", w / 2);
            hoursHand.setAttributeNS(null, "y2", h / 4);
            hoursHand.setAttributeNS(null, "stroke", "#333333");
            hoursHand.setAttributeNS(null, "stroke-width", radius * 0.035);
            hoursHand.setAttributeNS(null, "stroke-linecap", "round");
            svgClock.append(hoursHand);

            // Элентронное табло время
            digitalClock.setAttribute("x", w / 2);
            digitalClock.setAttribute("y", h / 3);
            clockLogo.setAttribute("font-weight", "bold");
            digitalClock.setAttribute("text-anchor", "middle");
            digitalClock.setAttribute("dominant-baseline", "middle");
            digitalClock.setAttribute("font-size", radius * 0.075);
            svgClock.append(digitalClock);

            // Элентронное табло дата
            digitalDate.setAttribute("x", w / 2);
            digitalDate.setAttribute("y", h / 4);
            clockLogo.setAttribute("font-weight", "bold");
            digitalDate.setAttribute("text-anchor", "middle");
            digitalDate.setAttribute("dominant-baseline", "middle");
            digitalDate.setAttribute("font-size", radius * 0.075);
            svgClock.append(digitalDate);

            // Лого часов
            clockLogo.setAttribute("x", w / 2);
            clockLogo.setAttribute("y", h - h / 40);
            clockLogo.setAttribute("text-anchor", "middle");
            clockLogo.setAttribute("dominant-baseline", "middle");
            clockLogo.setAttribute("font-weight", "bold");
            clockLogo.setAttribute("font-size", radius * 0.05);
            clockLogo.innerHTML = "SVG";
            svgClock.append(clockLogo);

            clock = {
                hoursHand: hoursHand,
                minutsHand: minutsHand,
                secondsHand: secondsHand,
                digitalClock: digitalClock,
                w: w,
                h: h,
                digitalDate: digitalDate,
            };

            return clock;
        };

        this.showTime = function (degreeObj) {
            if (!degreeObj) {
                this.init();
            }

            clock.hoursHand.setAttribute("transform", `rotate(${degreeObj.hourDeg}, ${w / 2}, ${h / 2})`);
            clock.minutsHand.setAttribute("transform", `rotate(${degreeObj.minuteDeg}, ${w / 2}, ${h / 2})`);
            clock.secondsHand.setAttribute("transform", `rotate(${degreeObj.secondDeg}, ${w / 2}, ${h / 2})`);

            clock.digitalClock.innerHTML = `${degreeObj.hours} : ${degreeObj.minutes} : ${degreeObj.seconds}`;
            clock.digitalDate.innerHTML = `${degreeObj.currentDate}`;
        };
    };

    const ViewCanvas = function () {
        let myContainer = null;
        let mySize = null;

        let canvas = null;
        let ctx = null;

        this.init = function (container, size) {
            myContainer = container;
            mySize = size;
            this.showCity();
            canvas = document.createElement("canvas");
            canvas.setAttribute("width", mySize);
            canvas.setAttribute("height", mySize);
            container.append(canvas);
            ctx = canvas.getContext("2d");
            centerX = canvas.width / 2;
            centerY = canvas.height / 2;
            radius = Math.min(canvas.width, canvas.height) / 2;
            radiusSmallCyrcle = radius / 10;
            radiusSmall = radius * 0.8;
            centerClockTableSize = radius / 30;
            this.crateClockTable();
            this.createHannds();
        };

        this.showCity = function (city) {
            const cityString = myContainer.querySelector(".city");
            cityString.innerHTML = city;
        };

        this.crateClockTable = function () {
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
                ctx.fillStyle = "#000000";
                ctx.font = `${radius * 0.1}px serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`${i + 1}`, x, y);
                ctx.closePath();
            }

            // Рисуем Лого
            ctx.beginPath();
            ctx.font = `${radius * 0.075}px bold Times New Roman`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000000";

            ctx.fillText("Canvas", centerX, centerY + centerY * 0.95);
            ctx.closePath();
        };
        // Возможно не самый красивый вариант(так себе аргумент у функции данного метода), при первой загрузке электронное табло на мгновенье отрисовывает undefined.
        // ДЛя первой отрисовки можно было оставить нулевой угол для стрелок и пустые строки в электронном табло, но не хотелось писать однотипный код для новых отрисовок с получаемым значением приходящих углов стрелок и даты
        this.createHannds = function (degreeObj = "") {
            // Рисуем секундную стрелку
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.lineWidth = radius * 0.01;
            ctx.translate(centerX, centerY);
            ctx.rotate((Math.PI * degreeObj.secondDeg) / 180);
            ctx.moveTo(0, radius * 0.1);
            ctx.lineTo(0, -radius * 0.65);
            ctx.stroke();
            ctx.resetTransform();
            ctx.closePath();

            // Рисуем минутную стрелку
            ctx.beginPath();
            ctx.lineWidth = radius * 0.02;
            ctx.translate(centerX, centerY);
            ctx.rotate((Math.PI * degreeObj.minuteDeg) / 180);
            ctx.moveTo(0, radius * 0.1);
            ctx.lineTo(0, -radius * 0.6);
            ctx.stroke();
            ctx.resetTransform();
            ctx.closePath();

            // Рисуем часовую стрелку
            ctx.beginPath();
            ctx.lineWidth = radius * 0.033;
            ctx.translate(centerX, centerY);
            ctx.rotate((Math.PI * degreeObj.hourDeg) / 180);
            ctx.moveTo(0, radius * 0.1);
            ctx.lineTo(0, -radius * 0.5);
            ctx.stroke();
            ctx.resetTransform();
            ctx.closePath();

            // Рисуем электронного табло
            ctx.beginPath();
            ctx.font = `${radius * 0.075}px Times New Roman`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000000";
            ctx.fillText(`${degreeObj.hours} : ${degreeObj.minutes} : ${degreeObj.seconds}`, centerX, centerY / 1.5);
            ctx.closePath();

            // Рисуем электронного табло
            ctx.beginPath();
            ctx.font = `${radius * 0.075}px Times New Roman`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000000";
            ctx.fillText(`${degreeObj.currentDate}`, centerX, centerY / 2);
            ctx.closePath();
        };

        this.showTime = function (degreeObj) {
            if (!degreeObj) {
                this.init();
            }

            canvas.width = canvas.width;

            this.crateClockTable();
            this.createHannds(degreeObj);
        };
    };
    return {
        inition: function () {
            this.main();
            // size уже потом привязал раз SVG Canvas в динамических размерах, добавил еще и для DOM динамическое измененния размера. Тепеь прямо тут можно задавать размер всем часам.
            const size = 400;
            document.documentElement.style.setProperty("--size", size);

            const domConstructor1 = new Constructor();
            const domModel1 = new Model();
            const domViewDOM1 = new ViewDOM();
            const domContainer1 = document.querySelector("#dom-clock1");
            domModel1.init(domViewDOM1);
            domViewDOM1.init(domContainer1);
            domConstructor1.init(domModel1, domContainer1);

            const domConstructor2 = new Constructor();
            const domModel2 = new Model();
            const domViewDOM2 = new ViewDOM();
            const domContainer2 = document.querySelector("#dom-clock2");
            domModel2.init(domViewDOM2);
            domViewDOM2.init(domContainer2);
            domConstructor2.init(domModel2, domContainer2);

            const svgConstructor1 = new Constructor();
            const svgModel1 = new Model();
            const svgViewSVG1 = new ViewSVG();
            const svgContainer1 = document.querySelector("#svg-clock1");
            svgModel1.init(svgViewSVG1);
            svgViewSVG1.init(svgContainer1, size);
            svgConstructor1.init(svgModel1, svgContainer1);

            const svgConstructor2 = new Constructor();
            const svgModel2 = new Model();
            const svgViewSVG2 = new ViewSVG();
            const svgContainer2 = document.querySelector("#svg-clock2");
            svgModel2.init(svgViewSVG2);
            svgViewSVG2.init(svgContainer2, size);
            svgConstructor2.init(svgModel2, svgContainer2);

            const canvasConstructor1 = new Constructor();
            const canvasModel1 = new Model();
            const canvasViewCanvas1 = new ViewCanvas();
            const canvasContainer1 = document.querySelector("#canvas-clock1");
            canvasModel1.init(canvasViewCanvas1);
            canvasViewCanvas1.init(canvasContainer1, size);
            canvasConstructor1.init(canvasModel1, canvasContainer1);

            const canvasConstructor2 = new Constructor();
            const canvasModel2 = new Model();
            const canvasViewCanvas2 = new ViewCanvas();
            const canvasContainer2 = document.querySelector("#canvas-clock2");
            canvasModel2.init(canvasViewCanvas2);
            canvasViewCanvas2.init(canvasContainer2, size);
            canvasConstructor2.init(canvasModel2, canvasContainer2);
        },

        main: function () {
            console.log(`MyModule was inicializired`);
        },
    };
})();
const clocksConteiner = document.querySelector("#clocks-conteiner")
MyModule.inition(clocksConteiner);
