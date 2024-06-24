function HashStorage() {
    this.storage = {};

    this.addValue = function (key, value) {
        this.storage[key] = value;
    };

    this.getValue = function (key) {
        if (this.storage[key]) {
            return this.storage[key];
        }
        return;
    };

    this.deleteValue = function (key) {
        if (this.storage[key] !== undefined) {
            delete this.storage[key];
            return true;
        }
        return false;
    };

    this.getKeys = function () {
        const arrayKeys = [];
        for (key in this.storage) {
            arrayKeys.push(key);
        }
        return arrayKeys;
    };
}

const coctailStorage = new HashStorage();

coctailStorage.addValue("Cosmopolitan", {
    coctailName: "Cosmopolitan",
    isAlcohol: "Да",
    ingredients: [
        { ingredient: "Водка Absolute Citron", ingredientValue: "50ml" },
        { ingredient: "Клюквенный сок", ingredientValue: "30ml" },
        { ingredient: "Лимонный сок", ingredientValue: "15ml" },
        { ingredient: "Ликер Triple sec", ingredientValue: "15ml" },
    ],
    recept: "Наполни шейкер кубиками льда, добавь водку, клюквенный сок, лимонный сок и тройной сек. Встряхни и процеди в охлажденный коктейльный бокал. Укрась цедрой лайма.",
});

coctailStorage.addValue("Whiskey Sour", {
    coctailName: "Whiskey Sour",
    isAlcohol: "Да",
    ingredients: [
        { ingredient: "Виски", ingredientValue: "50ml" },
        { ingredient: "Лимонный сок", ingredientValue: "25ml" },
        { ingredient: "Сахарный сироп", quaningredientValuetity: "25ml" },
        { ingredient: "Яичный белок", ingredientValue: "1" },
        { ingredient: "Лед", ingredientValue: "120g" },
    ],
    recept: "Встряхните с ингредиентами в шейкере без льда, затем добавьте лед и встряхните снова. Процедите в бокал.",
});

coctailStorage.addValue("Aperol Spritz", {
    coctailName: "Aperol Spritz",
    isAlcohol: "Да",
    ingredients: [
        { ingredient: "Aperol", ingredientValue: "60ml" },
        { ingredient: "Prosecco", ingredientValue: "90ml" },
        { ingredient: "Содовая", ingredientValue: "30ml" },
        { ingredient: "Слайс апельсина", ingredientValue: "1" },
    ],
    recept: "Наполните бокал льдом, добавьте Aperol, затем Prosecco и содовую воду. Украсьте коктейль ломтиком апельсина.",
});

coctailStorage.addValue("Negroni", {
    coctailName: "Negroni",
    isAlcohol: "Да",
    ingredients: [
        { ingredient: "Джин", ingredientValue: "30ml" },
        { ingredient: "Ликер Campari", ingredientValue: "30ml" },
        { ingredient: "Сладкий вермут", ingredientValue: "30ml" },
        { ingredient: "Слайс апельсина", ingredientValue: "1" },
        { ingredient: "Лед", ingredientValue: "120gr" },
    ],
    recept: "Наполните стакан кубиками льда, добавьте джин, кампари и сладкий вермут. Перемешайте. Украсьте коктейль цедрой апельсина.",
});

coctailStorage.addValue("Milkshake", {
    coctailName: "Молочный коктейль",
    isAlcohol: "Нет",
    ingredients: [
        { ingredient: "Молоко", ingredientValue: "200мл" },
        { ingredient: "Ванильный мороженое", ingredientValue: "2 шарика" },
        { ingredient: "Карамельный сироп", ingredientValue: "30мл" },
        { ingredient: "Шоколадная стружка", ingredientValue: "по вкусу" },
    ],
    recept: "В блендер положите молоко, ванильное мороженое и карамельный сироп. Взбейте до получения однородной массы. Вылейте в высокий стакан и украсьте шоколадной стружкой.",
});

const checkInput = function () {
    let cocktailName = prompt("Введите название рецепта коктейля", "");
    if (cocktailName === null) return null;

    if (cocktailName === "") {
        alert("Вы не ввели название рецепта коктейля ");
        return null;
    }
    return cocktailName;
};

coctailStorage.addCoctailRecipe = function () {
    let cocktailName = checkInput();

    if (!cocktailName) {
        return;
    }

    const coctailDiscription = {
        name: cocktailName,
        isAlcohol: confirm("Это алкогольный коктейль?") ? "Да" : "Нет",
        ingredients: [],
    };

    while (confirm("Вы хотите добавить ингредиенты")) {
        let ingredient = prompt("Введите ингредиент для коктейля", "");
        let ingredientValue = prompt("Введите количество данного ингредиента", "");
        coctailDiscription.ingredients.push({ ingredient: ingredient, ingredientValue: ingredientValue });
    }
    coctailDiscription.recept = prompt("Введите рецепт для приготовления коктейля");

    this.addValue(cocktailName, coctailDiscription);
};

coctailStorage.getCoctailInfo = function () {
    let cocktailName = checkInput();

    if (!cocktailName) {
        return;
    }

    const cocktailInfo = this.getValue(cocktailName);
    if (!cocktailInfo) {
        return alert(`Нет такого коктейля`);
    }

    const receptInfoTitle = document.querySelector(".recept_info-title");
    receptInfoTitle.innerHTML = `<span>Коктейль&nbsp; <h2>&laquo;${cocktailName}&raquo;</h2> (алкогольный: <h2>${cocktailInfo.isAlcohol}</h2>)</span>`;

    const receptInfoIngredients = document.querySelector(".recept_info-ingredients");
    receptInfoIngredients.innerHTML = "<ul>Необходимые ингредиенты:</ul>";
    cocktailInfo.ingredients.forEach((ingredient) => {
        receptInfoIngredients.innerHTML += `<li>${ingredient.ingredient} : ${ingredient.ingredientValue}</li>`;
    });

    const receptMethod = document.querySelector(".recept_info-method");
    receptMethod.innerHTML = `<p>Рецепт коктейля:</p> <p>${cocktailInfo.recept}</p>`;
};

coctailStorage.deleteCoctail = function () {
    let cocktailName = checkInput();

    if (!cocktailName) {
        return;
    }

    this.deleteValue(cocktailName) ? alert(`Рецепт ${cocktailName} удален`) : alert(`Данного рецепта не существует`);
};

coctailStorage.getCoctailArray = function () {
    const receptList = document.querySelector(".recept_list");
    receptList.innerHTML = `<p>Список всех коктейлей:</p>`;

    const keys = this.getKeys();
    keys.forEach((cocktailName) => {
        receptList.innerHTML += `<p>${cocktailName}</p>`;
    });
    console.log(keys);
};