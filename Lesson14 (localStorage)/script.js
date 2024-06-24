// Форма проверки пользователя
const checkInputName = document.getElementById("check-name");
const checkButton = document.getElementById("btn-check");
const checkUserForm = document.querySelector(".form__check-user");
checkUserForm.classList.add("hide-elem");
const nocheckInputName = checkUserForm.lastElementChild;
nocheckInputName.classList.add("notvisible-elem");

// Форма добавления пользователя
const createUserForm = document.querySelector(".form__data-birth");
createUserForm.classList.add("hide-elem");
const createNeme = document.getElementById("name");
const createDay = document.getElementById("select-day");
const createMonth = document.getElementById("select-month");
const createButton = document.getElementById("btn-add");


// Форма побратного отсчета
const downTimer = document.querySelector(".form__down-timer");
downTimer.classList.add("hide-elem");

// очистка lockalStorage
const clearBtn = document.getElementById("clear-btn");

// Хэш для хранения данных данные lockalStorage
let currentUser = {};

// получаем данные lockalStorage
let currentUserObj = JSON.parse(localStorage.getItem("currentUser"));



// Получаем массивы дней и месяцев
const monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
const days = [];
for (let day = 1; day <= 31; day++) {
    days.push(day);
}

// Скрываем первые опции в селектах и заполняем селекторы мясяцами и днями
const selects = document.querySelectorAll("select");
const firstOptionArray = ["день", "месяц"];

selects.forEach((select, index) => {
    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.innerHTML = firstOptionArray[index];
    firstOption.style.display = "none";
    select.append(firstOption);
});

monthNames.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.innerHTML = month;
    createMonth.append(option);
});

days.forEach((day) => {
    const option = document.createElement("option");
    option.value = day;
    option.innerHTML = day;
    createDay.append(option);
});

// Проверяем на заполненность всех полей ввода и разблокируем кнопки
function checkDisabledButton() {
    if ((createNeme.value.length != 0 && createMonth.value != "" && createDay.value != "") || (checkInputName.value.length != 0)) {
        onDisabledButton();
    } else {
        disabledButton();
    }
}

function disabledButton() {
    checkButton.classList.add("disabled-btn");
    checkButton.disabled = true;

    createButton.classList.add("disabled-btn");
    createButton.disabled = true;
}
disabledButton();

function onDisabledButton() {
    checkButton.classList.remove("disabled-btn");
    checkButton.disabled = false;

    createButton.classList.remove("disabled-btn");
    createButton.disabled = false;
}


// Функции для добавления данных в localStorage
function addInfoInStorage() {
    currentUser  = {"name": createNeme.value, "birdDay": createDay.value, "birdtMonth": createMonth.value }
    let jsonString = JSON.stringify(currentUser);
    localStorage.setItem("currentUser", jsonString)
}


    
// Функции для очистки localStorage
function clearStorage() {
    localStorage.removeItem("currentUser");
    currentUserObj = "";
    firstLoadPage();
}

// Слушатель события нажатия кнопки "Создать", по клику добавляем данные в localStorage и скрываем форму
createButton.addEventListener("click", () => {
    addInfoInStorage();
    createUserForm.classList.add("hide-elem");
});

// Слушатель события нажатия кнопки "Проверить", по клику проверяем введеное имя с именем хранящимся в localStorage
function checkNameInStorage(ev) {
    ev.preventDefault();
    // Если имя существует, то показываем форму с обратным отсчетом, в противном случае очщаем поле ввода и проявляем сообщение о том, что введеного имнеи пользователя не существует
    if (checkInputName.value === currentUserObj.name) {
        checkUserForm.classList.add("hide-elem");
        downTimer.classList.remove("hide-elem");
        updateTimer();
    } else 
    disabledButton();
    nocheckInputName.classList.remove("notvisible-elem");
    nocheckInputName.innerHTML = `Пользователя с именем ${checkInputName.value} не существует`;
    checkInputName.value = "";
    
}

//  Скраваем сообщение о несуществовании пользователя в locklStorage
function hideMessage() {
    nocheckInputName.classList.add("notvisible-elem");
    
}

// Первая загрузка страницы.
function firstLoadPage() {
    // Проверка на существование данных о пользователе в lockalStorage. При их отсутствии оттображаем форму создания пользователя, в противном случае проявляем форму проверки рользователя
    if (!currentUserObj) {
        createUserForm.classList.remove("hide-elem");
        checkUserForm.classList.add("hide-elem");
        downTimer.classList.add("hide-elem");
        clearBtn.classList.add("disabled-btn");
        clearBtn.disabled = true;
    } else {
        checkUserForm.classList.remove("hide-elem");
        createUserForm.classList.add("hide-elem");
    }
}
// Вызаваем функцию при  загрузка страницы.
firstLoadPage();

// Функция обратного отсчета
function updateTimer() {
    // Получаем текущую дату
    const dateNow = new Date();
    // Получаем в текущем году дату с мясяцем и днем из lockalStorage
    const dateStorage = new Date(dateNow.getFullYear(), currentUserObj.birdtMonth - 1, currentUserObj.birdDay);
   
    // Если текущая дата больше даты полученной ои lockalStorage то к текущей дате добавляем 1 год
    if (dateNow > dateStorage) {
        dateStorage.setFullYear(dateNow.getFullYear() + 1);
    }

    // Получаем разность между датами в м.с.
    const different = dateStorage - dateNow;

    // Создаем переменный и округляем до меньшего целого в днях
    let months = Math.floor(different / (1000 * 60 * 60 * 24 * 30)); 
    let days = Math.floor(different / (1000 * 60 * 60 * 24)) % 30; // different / (сек * мин * час * сутки)
    let hours = Math.floor((different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); //  остатток от деленя на кол-во целых дней / (сек * мин * час)
    let minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60)); //  остатток от деленя на кол-во целых часов / (сек * мин)
    let seconds = Math.floor((different % (1000 * 60)) / 1000); //  остатток от деленя на кол-во целых мин / (сек)

    // Выводим сообщение в форму с интервалом 1с
    const timerMessage = `Дорогой пользователь ${currentUserObj.name} вышего ДР осталось ${months} месяцев ${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`;
    downTimer.innerHTML = timerMessage;
    setInterval(updateTimer, 1000);
}

// Слушатели событий по select
createNeme.addEventListener("input", checkDisabledButton);
createDay.addEventListener("change", checkDisabledButton);
createMonth.addEventListener("change", checkDisabledButton);

// Слушатели событий по кнопкам
checkButton.addEventListener("click", checkNameInStorage);
clearBtn.addEventListener("click", clearStorage);

// Слушатели событий по input
checkInputName.addEventListener("click", hideMessage);
checkInputName.addEventListener("input", checkDisabledButton);

