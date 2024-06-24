const style = document.createElement("style");
style.innerHTML = `
.mouseover-cell_color { 
    background-color: hotpink !important; 
}
`;
document.head.append(style);

const headerSelect = document.createElement("header");
const selectYear = document.createElement("select");
const selectMonth = document.createElement("select");
const selectDay = document.createElement("select");
const calendarsContainer = document.createElement("div");
calendarsContainer.classList.add("conteiner");
document.body.append(calendarsContainer); // Переместили эту строку сюда
document.body.prepend(headerSelect);
headerSelect.append(selectYear, selectMonth, selectDay);

const createButton = document.createElement("button");
createButton.innerHTML = "Создать";
headerSelect.append(createButton);

const deleteButton = document.createElement("button");
deleteButton.innerHTML = "Удалить";
deleteButton.disabled = true;
headerSelect.append(deleteButton);

const calendarsDateArray = [];

let currentYear = "";
let currentMonth = "";
let currentDay = "";

// Генерируем массивы с годами, месяцами и днями
const years = [];
for (let year = 1980; year <= 2024; year++) {
    years.push(year);
}

const monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

const days = [];
for (let day = 1; day <= 31; day++) {
    days.push(day);
}

// Скрываем первые опции в селектах
const selects = document.querySelectorAll("select");
const firstOptionArray = ["год", "месяц", "день"];

selects.forEach((select, index) => {
    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.innerHTML = firstOptionArray[index];
    firstOption.style.display = "none";
    select.append(firstOption);
});

// Заполняем селекты годами, месяцами и днями
years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.innerHTML = year;
    selectYear.append(option);
});

monthNames.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.innerHTML = month;
    selectMonth.append(option);
});

days.forEach((day) => {
    const option = document.createElement("option");
    option.value = day;
    option.innerHTML = day;
    selectDay.append(option);
});

// Функция для проверки активации кнопки добавления
function checkCreateButton() {
    createButton.disabled = selectYear.value === "" || selectMonth.value === "" || selectDay.value === "";
}

// Слушатели событий по select
selectYear.addEventListener("change", checkCreateButton);
selectMonth.addEventListener("change", checkCreateButton);
selectDay.addEventListener("change", checkCreateButton);

selectYear.addEventListener("change", () => {
    currentYear = selectYear.value;
});

selectMonth.addEventListener("change", () => {
    currentMonth = selectMonth.value;
});

selectDay.addEventListener("change", () => {
    currentDay = selectDay.value;
});
checkCreateButton();

function getDayOfWeek(date) {
    let day = date.getDay();
    if (day === 0) day = 7;
    return day - 1;
}

createButton.addEventListener("click", () => {
    if (!createButton.disabled) {
        currentYear = selectYear.value;
        currentMonth = selectMonth.value;
        currentDay = selectDay.value;
        addCalendar();
    }
});

deleteButton.addEventListener("click", () => {
    if (calendarsDateArray.length > 0) {
        calendarsDateArray.shift();
        calendarsContainer.firstChild.remove();
    }
    if (calendarsDateArray.length === 0) {
        deleteButton.disabled = true;
    }
});

function addCalendar() {
    const calendarInfo = {
        year: currentYear,
        month: currentMonth,
        day: currentDay,
    };
    calendarsDateArray.push(calendarInfo);
    const calendarContainer = document.createElement("div");
    calendarContainer.innerHTML = generateCalendarHTML(calendarInfo);
    calendarsContainer.append(calendarContainer);

    function tdMouseClickHandler(event) {
        if (!event.target.classList.contains("calendar-cell")) {
            calendarContainer.addEventListener("click", tdMouseClickHandler, { once: true });
            return;
        }
        event.target.style.backgroundColor = "hotpink";
        // Удаляем слушатели событий mouseover и mouseout
        calendarContainer.removeEventListener("mouseover", tdMouseOverHandler);
        calendarContainer.removeEventListener("mouseout", tdMouseOutHandler);
    }

    // Функция изменения цвета ячейки по ховеру, добавление класса с другим цветом
    function tdMouseOverHandler(event) {
        if (event.target.classList.contains("calendar-cell")) {
            event.target.classList.add("mouseover-cell_color");
        }
    }

    // Функция изменения цвета ячейки по ховеру, удаление класса с другим цветом
    function tdMouseOutHandler(event) {
        if (event.target.classList.contains("calendar-cell")) {
            event.target.classList.remove("mouseover-cell_color");
        }
    }

    // Добавляем слушатели событий

    function prevYearClickHandler(event) {
        if (event.target.id === "prewYear") {
            calendarInfo.year--;
            calendarContainer.innerHTML = generateCalendarHTML(calendarInfo);
            addEventListenersForButtons();
        }
    }

    function prevMounthClickHandler(event) {
        if (event.target.id === "prewMonth") {
            if (calendarInfo.month === 1) {
                calendarInfo.year--;
                calendarInfo.month = 12;
            } else {
                calendarInfo.month--;
            }
            calendarContainer.innerHTML = generateCalendarHTML(calendarInfo);
            addEventListenersForButtons();
        }
    }

    function nextMounthClickHandler(event) {
        if (event.target.id === "nextMonth") {
            if (calendarInfo.month === 12) {
                calendarInfo.year++;
                calendarInfo.month = 1;
            } else {
                calendarInfo.month++;
            }
            calendarContainer.innerHTML = generateCalendarHTML(calendarInfo);
            addEventListenersForButtons();
        }
    }

    function nextYearClickHandler(event) {
        if (event.target.id === "nextYear") {
            calendarInfo.year++;
            calendarContainer.innerHTML = generateCalendarHTML(calendarInfo);
            addEventListenersForButtons();
        }
    }

    function addEventListenersForButtons() {
        
        calendarContainer.addEventListener("click", tdMouseClickHandler, { once: true });
        calendarContainer.addEventListener("mouseover", tdMouseOverHandler);
        calendarContainer.addEventListener("mouseout", tdMouseOutHandler);
    }




    calendarContainer.addEventListener("click", prevYearClickHandler);
    calendarContainer.addEventListener("click", prevMounthClickHandler);
    calendarContainer.addEventListener("click", nextMounthClickHandler);
    calendarContainer.addEventListener("click", nextYearClickHandler);

    
    addEventListenersForButtons();

}

function generateCalendarHTML(calendarInfo) {
    const { year, month, day } = calendarInfo;
    const mon = month - 1;
    const d = new Date(year, mon, 1);
    let today = new Date(year, mon, day);
    const prevMonthDays = new Date(year, mon, 0).getDate();
    const monthName = monthNames[mon];
    const daySut = new Date(year, mon, 5);
    const daySun = new Date(year, mon, 6);

    selectYear.selectedIndex = 0;
    selectMonth.selectedIndex = 0;
    selectDay.selectedIndex = 0;
    createButton.disabled = true;
    deleteButton.disabled = false;

    let calendarsHTML = `
    <table style="border: 1px solid black; margin: 10px 0; text-align: center; width: 500px; height: 300px" display: block;">
        <thead style="background-color: palegoldenrod; height: 40px;">
        <tr>
        <th style="border: none;"><button  id="prewYear"><<</button></th>
        <th style="border: none;"><button  id="prewMonth"><</button></th>
        <th colspan="3" style="border: none;">${monthName} ${year} года</th>
        <th style="border: none;"><button  id="nextMonth">></button></th>
        <th style="border: none;"><button  id="nextYear">>></button></th>
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
    // Добавляем дни предыдущего месяца
    for (let i = getDayOfWeek(d); i > 0; i--) {
        const prevMonthDay = prevMonthDays - i + 1;
        calendarsHTML += `<td  class="calendar-cell" style="color: gray; background-color: #ebebeb;">${prevMonthDay}</td>`;
    }
    // Заполняем дни текущего месяца
    while (d.getMonth() === mon) {
        if (d.getDate() === today.getDate()) {
            calendarsHTML += `<td  class="calendar-cell" style="background-color: lightcoral;">${d.getDate()}</td>`;
        } else if (getDayOfWeek(d) === daySun.getDate() || getDayOfWeek(d) === daySut.getDate()) {
            calendarsHTML += `<td  class="calendar-cell" style="background-color: lightblue;">${d.getDate()}</td>`;
        } else {
            calendarsHTML += `<td  class="calendar-cell" style="background-color: lightgrey;">${d.getDate()}</td>`;
        }

        if (getDayOfWeek(d) / 6 == 1) {
            calendarsHTML += "</tr>";
        }
        d.setDate(d.getDate() + 1);
    }
    // Заполняем дни следуещего месяца
    for (let i = 1; getDayOfWeek(d) !== 0; i++) {
        calendarsHTML += `<td  class="calendar-cell" style="color: #838383; background-color: #ebebeb;">${i}</td>`;
        d.setDate(d.getDate() + 1);
    }

    calendarsHTML += `</tr></table>`;
    return calendarsHTML;
}