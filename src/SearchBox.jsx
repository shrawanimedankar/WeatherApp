import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import "./SearchBox.css";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  let getWeatherInfo = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      );
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let result = {
        country: jsonResponse.sys.country,
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feels_like: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
        weatherMain: jsonResponse.weather[0].main,
        wind: jsonResponse.wind.speed,
        sunrise: jsonResponse.sys.sunrise,
        sunset: jsonResponse.sys.sunset,
        timezone: jsonResponse.timezone,
      };
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
    setError(false);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setError(false); //reset error first
      // console.log(city);
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          label="City Name"
          variant="outlined"
          value={city}
          onChange={handleChange}
          required
          sx={{
            "& .MuiOutlinedInput-input": {
              color: "#0400ff",
              fontWeight: 900,
              backgroundColor: "#ffffffa9",
            },

            "& .MuiOutlinedInput-root fieldset": {
              borderColor: "black",
              borderWidth: "3px",
            },

            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: "black",
            },

            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "black", // fixed typo
            },

            "& label": {
              color: "black",
              fontWeight: 700,
            },

            "& label.Mui-focused": {
              color: "black",
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          endIcon={<SearchIcon />}
          sx={{
            marginTop: "0.4rem",
            backgroundColor: "#00ffd5",
            color: "black",
            fontWeight: 700,
            border: "2px solid blue",
            "&:hover": {
              backgroundColor: "#00c6b5",
            },
          }}
        >
          Search
        </Button>
        {error && (
          <p
            style={{
              color: "red",
              fontWeight: 700,
              backgroundColor: "white",
              marginTop: "0.4rem",
            }}
          >
            We couldn't find this place
          </p>
        )}
      </form>
    </div>
  );
}
