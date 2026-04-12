import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "./SearchBox.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [inputError, setInputError] = useState(false);
  let [apiError, setApiError] = useState(false);

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
    setInputError(false); 
    setApiError(false); 
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    // input validation
    if (!city.trim()) {
      setInputError(true);
      setApiError(false);
      return;
    }
    try {
      setInputError(false);
      setApiError(false);

      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
    } catch (error) {
      setApiError(true);
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
          error={inputError}
          helperText={inputError ? "City name is required" : ""}
          sx={{
            "& .MuiFormHelperText-root": {
              backgroundColor: "#ffefef",
              color: "red",
              padding: "2px 4px",
              borderRadius: "4px",
              textAlign: "center",
            },
            "& .MuiOutlinedInput-input": {
              fontWeight: 900,
              backgroundColor: "#ffffff8a",
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: "black",
              borderWidth: "3px",
            },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: "black",
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "black",
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
          color="primary"
          sx={{ mt: 1 }}
        >
          Search
        </Button>

        {apiError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            We couldn't find this place
          </Alert>
        )}
      </form>
    </div>
  );
}
