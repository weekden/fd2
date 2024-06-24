const svgNS = "http://www.w3.org/2000/svg";

            // Объявляем константы ширины и высоты 
            const svgClock = document.getElementById("clock");
            const w = parseFloat(svgClock.getAttributeNS(null, "width"));
            const h = parseFloat(svgClock.getAttributeNS(null, "height"));

        
            const degreeCircle = 360;
            const minutesSecondsClockTicks = 60;
            const hoursClockTicks = 12;
            const hourClockDegree = degreeCircle / hoursClockTicks;
            const minutesSecondsDegreeCoef = degreeCircle / minutesSecondsClockTicks;
            const hoursDegreeCoef = degreeCircle / hoursClockTicks;

            
            // Данные константы значение которых задано относительно радиуса циферблата, что делает размеры циферблата динамическими
            const radius = Math.min(w, h) / 2;
            const radiusSmallCyrcle = radius / 10;
            const radiusSmall = radius * 0.8;
            const centerClockTableSize = radius / 30;

            function createClockTable() {
                const clockTable = document.createElementNS(svgNS, "circle");
                const clockTableCenter = document.createElementNS(svgNS, "circle");
                const secondsHand = document.createElementNS(svgNS, "line");
                const minutsHand = document.createElementNS(svgNS, "line");
                const hoursHand = document.createElementNS(svgNS, "line");
                const digitalClock = document.createElementNS(svgNS, "text");



                clockTable.setAttributeNS(null, "cx", w / 2);
                clockTable.setAttributeNS(null, "cy", h / 2);
                clockTable.setAttributeNS(null, "r", radius);
                clockTable.setAttributeNS(null, "fill", "#f0f0f0");
                svgClock.append(clockTable);

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

                // Элентронное табло
                digitalClock.setAttribute("x", w / 2);
                digitalClock.setAttribute("y", h / 3);
                digitalClock.setAttribute("text-anchor", "middle");
                digitalClock.setAttribute("dominant-baseline", "middle");
                digitalClock.setAttribute("font-size", radius * 0.15);
                svgClock.appendChild(digitalClock);

                return { hoursHand, minutsHand, secondsHand, digitalClock };
            }

            function showTime() {
                const clockHands = createClockTable();
                let date = new Date();

                const seconds = date.getSeconds();
                const minutes = date.getMinutes();
                const hours = date.getHours();

                //Объявляем угол поворота секундной стрелки
                const secondsRotate = seconds * minutesSecondsDegreeCoef;

                //Объявляем угол поворота минутной стрелки
                const minutesRotate = minutes * minutesSecondsDegreeCoef;

                //Объявляем добавочный угол поворота часовой стрелки
                const hoursOffsetDegree = (hourClockDegree * minutes) / minutesSecondsClockTicks;

                //Объявляем угол поворота часовой стрелки
                const hoursRotate = hours * hoursDegreeCoef + hoursOffsetDegree;


                //Объявляем время и формат изображения для электронного табло
                const digitalHours = hours < 10 ? "0" + hours : hours;
                const digitalMinuts = minutes < 10 ? "0" + minutes : minutes;
                const digitalSeconds = seconds < 10 ? "0" + seconds : seconds;


                //Вращение стрелок относительно центра циферблата
                clockHands.hoursHand.setAttribute("transform", `rotate(${hoursRotate}, ${w / 2}, ${h / 2})`);
                clockHands.minutsHand.setAttribute("transform", `rotate(${minutesRotate}, ${w / 2}, ${h / 2})`);
                clockHands.secondsHand.setAttribute("transform", `rotate(${secondsRotate}, ${w / 2}, ${h / 2})`);

                //выводим электронное табло на циферблат
                clockHands.digitalClock.innerHTML = `${digitalHours} : ${digitalMinuts} : ${digitalSeconds} `;
            }

            setInterval(showTime, 1000);