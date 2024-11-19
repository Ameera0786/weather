// const apiKey = "a2c74231de36583e737898d5a0dc1cbd";
//
// const weatherForm = document.querySelector("#singleWeatherForm");
// const weatherFeedback = document.querySelector("#feedback");
// const weatherTable = document.querySelector("#weatherTable");
//
//
// weatherForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     await submittedInfo(event);
// })
//
// weatherForm.addEventListener("keypress", async (event)  => {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         await submittedInfo(event);
//     }
// })
//
// async function submittedInfo(event)  {
//     //Prevent form from reloading page
//     event.preventDefault();
//
//     //Gets the value from the id city without any whitespace
//     const cityInput = document.querySelector("#cityInput").value.trim();
//
//     //Checks if cityInput has value or not
//     if (cityInput) {
//         await getWeatherData(cityInput);
//     } else {
//         weatherFeedback.innerHTML = "Please enter a city";
//     }
// }
// //This gets the weather information for the specific city
// async function getWeatherData(city){
//     //URL using my api key and the parameter city
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
//
//     //Will attempt to fetch data
//     try{
//         const response = await fetch(url);
//
//         //Checks if fetch was successful, if it wasn't, breaks out
//         if (!response.ok){
//             weatherFeedback.innerHTML = "Please try again. City could not be found.";
//             weatherTable.style.visibility = "hidden";
//             return;
//         }
//
//         //Parses response and converts into a string
//         const data = await response.json();
//         const weatherData = {
//             "weather": data.weather[0].description,
//             "temperature": `${data.main.temp}°F`,
//             "feelsLike": `${data.main.feels_like}°F`,
//             "minTemperature": `${data.main.temp_min}°F`,
//             "maxTemperature": `${data.main.temp_max}°F`,
//             "humidity": `${data.main.humidity}%`,
//             "pressure": `${data.main.pressure} hPa`,
//             "windSpeed": `${data.wind.speed} m/s`,
//             "windDirection": `${data.wind.deg}°`,
//             "cloudiness": `${data.clouds.all}%`,
//             "visibility": `${data.visibility / 1000} km`,
//             "sunrise": new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
//             "sunset": new Date(data.sys.sunset * 1000).toLocaleTimeString()
//         }
//         for (let key in weatherData){
//             document.getElementById(key).textContent = weatherData[key];
//         }
//
//         // Make the table visible
//         weatherTable.style.visibility = "visible";
//         weatherFeedback.innerHTML = "";
//
//     // HTML unknown GET errors
//     } catch (error) {
//         weatherFeedback.innerHTML = "Error found. Try again."
//     }
// }
//
// //Fetch - Make HTTP requests, get data from API
// //Sends GET request
// //Promise - States if request is complete(success or fail)
// //Await - Used in async functions to pause execution of code
// //until promise is complete
// //.json - Converts response into javascript object and returns promise
// //Async - Run functions that take time without crashing or blocking
// //Prevents crashes or pauses and lets program execute

//Declarations
const apiKey = "a2c74231de36583e737898d5a0dc1cbd";
const weatherForm = document.querySelector("#weatherForm");
const weatherFeedback = document.querySelector("#weatherFeedback");
const weatherTable = document.querySelector("#weatherTable");
const temperatureSection = document.querySelector("#temperatureSection");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const weatherIcon = document.querySelector("#weatherIcon");

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Gets value of city and calls getData function if valid
    const cityInput = document.querySelector("#cityInput").value.trim();
    if (cityInput) {
        await getWeatherData(cityInput);
    } else {
        weatherFeedback.textContent = "Please enter a city.";
    }
});

//Gets the data for the specific city. Attempts to use GET request
async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found.");
        }
        const data = await response.json();

        //Specific data to get, stores in dictionary
        // https://openweathermap.org/api/one-call-3
        const weatherData = {
            "weather": data.weather[0].description,
            "feelsLike": `${data.main.feels_like}°F`,
            "minTemperature": `${data.main.temp_min}°F`,
            "maxTemperature": `${data.main.temp_max}°F`,
            "humidity": `${data.main.humidity}%`,
            "pressure": `${data.main.pressure} hPa`,
            "windSpeed": `${data.wind.speed} m/s`,
            "windDirection": `${data.wind.deg}°`,
            "cloudiness": `${data.clouds.all}%`,
            "visibility": `${data.visibility / 1000} km`,
            "sunrise": new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            "sunset": new Date(data.sys.sunset * 1000).toLocaleTimeString()
        };

        // Set the city name and temperature
        const capCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        cityName.textContent = `Weather in ${capCity}`;
        temperature.textContent = `${data.main.temp}°F`;

        // Set the weather icon
        //https://openweathermap.org/weather-conditions#How-to-get-icon-URL
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Update weather data in the table
        for (let key in weatherData) {
            const cell = document.getElementById(key);
            if (cell) cell.textContent = weatherData[key];
        }

        changeTemperatureColor(data.main.temp);

        // Show the table and weather section
        temperatureSection.style.visibility = "visible";
        weatherTable.style.visibility = "visible";
        weatherFeedback.textContent = "";
    } catch (error) {
        weatherFeedback.textContent = error.message;
        temperatureSection.style.visibility = "hidden";
        weatherTable.style.visibility = "hidden";
    }
}

function changeTemperatureColor(temp) {
    if (temp < 32) temperatureSection.style.backgroundColor = "lightBlue";  // Cold (Blue)
    else if (temp < 60) temperatureSection.style.backgroundColor = "darkCyan";  // Cool (Green)
    else if (temp < 85) temperatureSection.style.backgroundColor = "orange";  // Warm (Orange)
    else temperatureSection.style.backgroundColor = "red";  // Hot (Red)
}
