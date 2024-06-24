class WeatherWidget {
    constructor() {
        this.city = "Brest";
        this.apiKey = "4beda53b892bbb9f26098745fb4621eb";
        this.apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&cnt=96&APPID=${this.apiKey}&lang=ru&units=metric`;

        this.weatherData = null;
        this.forecastData = null;
    }

    initAnimation() {
        this.weatherContainer = document.querySelector("#weather-widget");
        this.animationContainer = document.createElement("div");
        this.animationContainer.classList.add("animation");

        this.animation = document.createElement("i");
        this.animation.className = "fa-solid fa-spinner fa-spin-pulse fa-xl";
        this.animationContainer.append(this.animation);
        this.weatherContainer.append(this.animationContainer);
    }

    showLoadingAnimation() {
        if (!this.animationContainer) {
            this.initAnimation();
        }
        this.animationContainer.style.display = "block";
    }

    hideLoadingAnimation() {
        if (this.animationContainer) {
            this.animationContainer.style.display = "none";
        }
    }

    async getWeather() {
        try {
            this.showLoadingAnimation();
            const response = await fetch(`${this.apiUrl}`);
            const data = await response.json();
            this.weatherData = data;
            this.setWeatherData();
            this.renderWidgetForNow();
            this.hideLoadingAnimation();
        } catch (error) {
            this.hideLoadingAnimation();
            console.error("Error fetching weather data:", error);
        }
    }

    setWeatherData() {
        // Массив для нужны[] дней
        const forecastData = [];

        // Для текущего дня он с нулевым индексом в массиве
        const cityName = this.weatherData.city.name;
        const currentWeather = this.weatherData.list[0];
        const currentTemperature = Math.ceil(currentWeather.main.temp);
        const currentWindSpeed = currentWeather.wind.speed;
        const currentDescriptionData = currentWeather.weather[0];
        const currentIconCode = currentDescriptionData.icon;
        const currentDescription = currentDescriptionData.description;
        const currentDay = new Date(currentWeather.dt * 1000);
        const currentDayOfWeek = currentDay.toLocaleDateString("ru-RU", { weekday: "long" });
        const currentIconUrl = `https://openweathermap.org/img/wn/${currentIconCode}.png`;

        // Добавляем текущий день в массив
        forecastData.push({
            cityName: cityName,
            dayOfWeek: currentDayOfWeek,
            temperature: currentTemperature,
            windSpeed: currentWindSpeed,
            description: currentDescription,
            iconUrl: currentIconUrl,
        });

        // Фильтрация данных для получения только прогнозов на 12:00 каждого следующего дня
        const filteredData = this.weatherData.list.filter((data, index) => {
            // Проверяем, является ли время dt_txt равным "12:00:00" и не текущтй ли это день днем
            return data.dt_txt.includes("12:00:00") && index !== 0;
        });

        // ТТеперь снимаем данные с отфильтрованного массива list
        filteredData.forEach((currentDayData) => {
            const cityName = this.weatherData.city.name;
            const temperature = Math.ceil(currentDayData.main.temp);
            const windSpeed = currentDayData.wind.speed;
            const descriptionData = currentDayData.weather[0];
            const iconCode = descriptionData.icon;
            const description = descriptionData.description;
            const day = new Date(currentDayData.dt * 1000); // получаем дату
            const dayOfWeek = day.toLocaleDateString("ru-RU", { weekday: "long" }); // формат отображения даты в  виде дня недели
            // получаем иконку погоды
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            // Добавляем данные текущего дня в массив
            forecastData.push({
                cityName: cityName,
                dayOfWeek: dayOfWeek,
                temperature: temperature,
                windSpeed: windSpeed,
                description: description,
                iconUrl: iconUrl,
            });
        });

        console.log(forecastData);
        this.forecastData = forecastData;
    }

    renderWidgetForNow() {
        const widgetContainer = document.querySelector("#weather-widget");

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-widget");

        const currentDay = this.forecastData[0];
        const iconElement = document.createElement("img");
        iconElement.src = currentDay.iconUrl;

        const markElement = document.createElement("i");
        markElement.classList.add("fas", "fa-xmark", "fa-sm");
        markElement.id = "mark-hide-widget";

        const widgetContainerforCurrentDay = document.createElement("div");
        widgetContainerforCurrentDay.classList.add("warapper-current-day");

        widgetContainerforCurrentDay.innerHTML = `
        <div class="wrapper">
            <div class="container">
                <div class="top">
                    <div class="visual">
                        <p>${iconElement.outerHTML}</P>
                        <p>${currentDay.description}</p>
                        <p>${currentDay.dayOfWeek}</p>
                        
                    </div>
                    ${markElement.outerHTML}
                </div>
                <div class="middle">
                    <h1 class="temp">${currentDay.temperature} °C</h1>
                    <h2 class="city">${currentDay.cityName}</h2>
                    <h4 class="wind">Ветер: ${currentDay.windSpeed} м/c</h4>
                    
                </div>
                <div class="button">
                    <button>Прогноз на 3 дня</button>
                </div>
            </div>
        </div>
        `;
        widgetContainer.innerHTML = "";
        widgetContainer.append(widgetContainerforCurrentDay);

        const forecastButton = document.querySelector("#weather-widget button");
        forecastButton.addEventListener("click", () => {
            weatherWidget.renderWidgetForThreeDays();
            widgetContainerforCurrentDay.style.display = "none";
        });
        const hideWidget = document.querySelector("#mark-hide-widget");
        hideWidget.addEventListener("click", () => {
            widgetContainerforCurrentDay.classList.add("hide-widget");
            iconContainer.style.display = "block";
            iconContainer.append(iconElement);
            widgetContainerforCurrentDay.append(iconContainer);
        });

        iconContainer.addEventListener("click", () => {
            widgetContainerforCurrentDay.classList.remove("hide-widget");
            iconContainer.style.display = "none";
        });
    }

    renderWidgetForThreeDays() {
        const widgetContainer = document.querySelector("#weather-widget");

        const wrapper = document.createElement("div");
        wrapper.classList.add("warapper-three-days");
        const markElement = document.createElement("i");
        markElement.classList.add("fas", "fasd", "fa-xmark", "fa-sm");
        markElement.id = "close-three-days";
        wrapper.prepend(markElement);
        const day = this.forecastData;
        const dayCoin = 3;
        for (let i = 1; i <= dayCoin; i++) {
            let currentDay = day[i];
            const widgetContainerforThree = document.createElement("div");
            widgetContainerforThree.classList.add("container-thee-days");

            const iconElement = document.createElement("img");
            iconElement.src = currentDay.iconUrl;
            widgetContainerforThree.innerHTML = `
        <div class="wrapper">
            <div class="container">
                <div class="top">
                    <div class="visual">
                        <p>${iconElement.outerHTML}</P>
                        <p>${currentDay.description}</p>
                        <p>${currentDay.dayOfWeek}</p>
                        
                    </div>
                </div>
                <div class="middle">
                    <h1 class="temp">${currentDay.temperature} °C</h1>
                    <h2 class="city">${currentDay.cityName}</h2>
                    <h4 class="wind">Ветер: ${currentDay.windSpeed} м/c</h4>
                    
                </div>
            </div>
        </div>
        `;

            wrapper.append(widgetContainerforThree);
        }
        widgetContainer.innerHTML = "";
        widgetContainer.append(wrapper);

        const closeThreeDays = document.querySelector("#close-three-days");
        closeThreeDays.addEventListener("click", () => {
            weatherWidget.renderWidgetForNow();
            wrapper.style.display = "none";
        });
    }
}

const weatherWidget = new WeatherWidget();
weatherWidget.getWeather();
