import "./WeatherApp.css";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState, useEffect } from "react";

const DEFAULT_CITY = "Pune"; // initial city

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [bgImage, setBgImage] = useState("/clear.jpg");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = import.meta.env.VITE_WEATHER_API_URL;

  // Function to fetch weather info
  const fetchWeather = async (city = DEFAULT_CITY) => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      );
      const data = await response.json();

      const info = {
        country: data.sys.country,
        city: data.name,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        weather: data.weather[0].description,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
      };

      setWeatherInfo(info);
      setBackground(info); // set background based on weather
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    }
  };

  //  Determine background image based on temp, feels_like, humidity, wind
  const setBackground = (info) => {
    let bg = "";

    if (info.temp > 35 || info.feels_like > 35) bg = "/hot.jpg";
    else if (info.temp > 30 || info.feels_like > 30) bg = "/sunny.jpg";
    else if (info.temp >= 16 && info.temp <= 30) bg = "/clear.jpg";
    else if (info.temp >= 10 && info.temp < 16) bg = "/overcast.jpg";
    else if (info.temp >= 0 && info.temp < 10) bg = "/cold.jpg";
    else if (info.temp < 0) bg = "/snow.jpg";

    // Humidity overrides
    if (info.humidity > 85) bg = "/rainy.jpg";
    else if (info.humidity > 70 && info.humidity <= 85) bg = "/drizzle.jpg";

    // Extreme wind overrides everything
    if (info.wind > 15) bg = "/thunderstorm.jpg";

    setBgImage(bg);
  };

  // Fetch initial Pune weather on page load
  useEffect(() => {
    fetchWeather();
  }, []);

  // Update weather info from SearchBox
  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
    setBackground(newInfo);
  };

  return (
    <div className="WeatherApp" style={{ backgroundImage: `url(${bgImage})`, transition: "background 0.5s ease", }}>
      <div className="headerFull">
        <h2>Weather App</h2>
      </div>
      <SearchBox updateInfo={updateInfo} />
      {weatherInfo && <InfoBox info={weatherInfo} />}
    </div>
  );
}
