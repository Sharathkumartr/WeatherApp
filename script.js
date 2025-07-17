const apiKey = "c00c9b47e3ae9dee92605872031a96e1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".error");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      errorSection.style.display = "block";
      weatherSection.style.display = "none";
      weatherSection.classList.remove("show");
      return;
    }

    const data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/hr";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "clear.png";
        break;
      case "Rain":
        weatherIcon.src = "rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "mist.png";
        break;
      default:
        weatherIcon.src = "clouds.png";
    }

    weatherSection.style.display = "block";
    weatherSection.classList.add("show");
    errorSection.style.display = "none";

  } catch (err) {
    console.error("Error:", err);
    errorSection.style.display = "block";
    weatherSection.style.display = "none";
    weatherSection.classList.remove("show");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city !== "") {
      checkWeather(city);
    }
  }
});
