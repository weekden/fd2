let currentYear = +prompt("Введите год", "");
let currentMonth = +prompt("Введите месяц", "");
let currentDay = +prompt("Введите день", "");
const monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

function getDayOfWeek(date) {
    let day = date.getDay();
    if (day === 0) day = 7;
    return (day = day - 1);
}

function createCalendar(elem, year, month, day) {
    elem = document.querySelector(elem);
    let mon = month - 1;
    let d = new Date(year, mon, 1);
    let prevMonthDays = new Date(year, mon, 0).getDate();

    

    let monthName = monthNames[mon];
    let today = new Date(year, mon, day);
    const daySut = new Date(year, mon, 5);
    const daySun = new Date(year, mon, 6);

    let table = `
    
    <table style = "text-align: center; width: 500px; height: 300px">
    <thead style="background-color: palegoldenrod; height: 40px;">
        <tr>
            <th style="border: none;"><button id="prewYear"><<</button></th>
            <th style="border: none;"><button id="prewMonth"><</button></th>
            <th colspan="3" style="border: none;">${monthName} ${year} года</th>
            <th style="border: none;"><button id="nextMonth">></button></th>
            <th style="border: none;"><button id="nextYear">>></button></th>
        </tr>
    </thead>
    <tr style="background-color: lightslategrey;">
        <th style="width: calc(100% / 7);">Пн</th>
        <th style="width: calc(100% / 7);">Вт</th>
        <th style="width: calc(100% / 7);">Ср</th>
        <th style="width: calc(100% / 7);">Чт</th>
        <th style="width: calc(100% / 7);">Пт</th>
        <th style="width: calc(100% / 7);">Сб</th>
        <th style="width: calc(100% / 7);">Вс</th>
    </tr>

    <tr>
    `;

    for (let i = getDayOfWeek(d); i > 0; i--) {
        const prevMonthDay = prevMonthDays - i + 1;
        table += `<td style="color: gray; background-color: #ebebeb;">${prevMonthDay}</td>`;
    }

    while (d.getMonth() === mon) {
        if (d.getDate() === today.getDate()) {
            table += `<td style="background-color: lightcoral;">${d.getDate()}</td>`;
        } else
        
        if (getDayOfWeek(d) === daySun.getDate() || getDayOfWeek(d) === daySut.getDate()) {
            table += `<td style="background-color: lightblue;">${d.getDate()}</td>`;
        } else {
            table += `<td style="background-color: lightgrey;">${d.getDate()}</td>`;
        }


        if (getDayOfWeek(d) / 6 == 1) {
            table += "</tr>";
        }
        d.setDate(d.getDate() + 1);
    }

    for (let i = 1; getDayOfWeek(d) !== 0; i++) {
        table += `<td style="color: #838383; background-color: #ebebeb;">${i}</td>`;
        d.setDate(d.getDate() + 1);
    }
    table += `</tr></table>`;
    elem.innerHTML = table;

    function updateCalendar() {
        createCalendar("body", currentYear, currentMonth, currentDay);
    }

    function goPrewMonth() {
        if (currentMonth === 1) {
            currentYear = currentYear - 1;
            currentMonth = 12;
        } else {
            currentMonth = currentMonth - 1;
        }

        updateCalendar();
    }

    function goNextMonth() {
        if (currentMonth === 12) {
            currentYear = currentYear + 1;
            currentMonth = 1;
        } else {
            currentMonth = currentMonth + 1;
        }

        updateCalendar();
    }

    function goPrewYear() {
        currentYear = currentYear - 1;
        updateCalendar();
    }

    function goNextYear() {
        currentYear = currentYear + 1;
        updateCalendar();
    }

    document.getElementById("prewYear").addEventListener("click", goPrewYear);
    document.getElementById("nextYear").addEventListener("click", goNextYear);
    document.getElementById("prewMonth").addEventListener("click", goPrewMonth);
    document.getElementById("nextMonth").addEventListener("click", goNextMonth);
}

createCalendar("body", currentYear, currentMonth, currentDay);