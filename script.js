const apiKey = "66277b3c667502ca9f02e546959cf783"; 



async function fetchWeather(city) {
    if (!city) return; 

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        updateUI(data);
        updateBackground(data.main.temp); 
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("City not found. Please enter a valid city.");
    }
}


function updateUI(data) {
    document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("highLow").innerText = `H: ${Math.round(data.main.temp_max)}°C  L: ${Math.round(data.main.temp_min)}°C`;
    document.getElementById("wind").innerText = `${data.wind.speed} km/h`;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("feelsLike").innerText = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById("rain").innerText = data.rain ? `${data.rain["1h"]} mm` : "No rain";
}

function updateBackground(temp) {
    let imageUrl = "main.jpg";

    if (temp <= 5) {
        imageUrl = "winter.jpg"; // Cold weather
    } else if (temp > 5 && temp <= 19) {
        imageUrl = "fall.jpg"; // Medium weather
    } else {
        imageUrl = "summer.jpg"; // Hot weather
    }

    document.body.style.backgroundImage = `url(${imageUrl})`;
}


document.getElementById("cityInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        fetchWeather(this.value.trim());
    }
});


document.body.style.backgroundImage = `url(main.jpg)`;


document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    const moveX = (clientX / window.innerWidth - 0.5) * 10; // Adjust sensitivity
    const moveY = (clientY / window.innerHeight - 0.5) * 10;

    document.body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});
