
let year = +prompt("Введите год", "");
let month = +prompt("Введите номер месяца", "");



function createCalendar(elem, year, month) {
    elem = document.querySelector(elem);
    let mon = month - 1; // Преобразовываем месяцы.
    let d = new Date(year, mon);

    switch (month) {
        case 1:
            month = "январь";
            break;
        case 2:
            month = "февраль";
            break;
        case 3:
            month = "март";
            break;
        case 4:
            month = "апрель";
            break;
        case 5:
            month = "май";
            break;
        case 6:
            month = "июнь";
            break;
        case 7:
            month = "июль";
            break;
        case 8:
            month = "август";
            break;
        case 9:
            month = "сентябрь";
            break;
        case 10:
            month = "октябрь";
            break;
        case 11:
            month = "ноябрь";
            break;
        case 12:
            month = "декабрь";
    }

    let table = `
    
    <table style = "width: 500px; height: 300px; text-align: center; border-collapse: collapse; border: 1px solid;">
        <tr>
            <th colspan="7">${month} ${year} года</th>
        </tr>
        <tr style="background-color: lightgray; border: 1px solid ">
            <th>Пн</th>
            <th>Вт</th> 
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
        </tr>
        <tr>
     `;
// Добавляем пустые ячейки перед текущей датой
    for (let i = 0; i < getDayOfWeek(d); i++) {
        table += "<td></td>";
    }
    // Заполняем календарь при условии что если это воскресенье, от закрывае строку и открываем новую увеличивая дату
    while (d.getMonth() === mon) {
        table += `<td>${d.getDate()}</td>`;
        if (getDayOfWeek(d) / 6 == 1) {
            table += "</tr><tr>";
        }
        d.setDate(d.getDate() + 1); // Увеличиваем текущую дату на день
    }
// Закрываем строку у таблицу
    table += `</tr></table>`;
    elem.innerHTML = table;
}
// // Функция для преобразования дней недели. Т.е. теперь Пн - индекс 0.
function getDayOfWeek(date) { 
    let day = date.getDay();
    if (day === 0) day = 7;
    return day = day - 1;
}


createCalendar("body", year, month);