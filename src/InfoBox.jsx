import "./InfoBox.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SunnyIcon from "@mui/icons-material/Sunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

function formatTime(unixTime, timezoneOffset = 0) {
  const date = new Date((unixTime + timezoneOffset) * 1000); // add offset
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const minutesStr = minutes.toString().padStart(2, "0");
  return `${hours}:${minutesStr} ${ampm}`;
}

export default function InfoBox({ info }) {
  const iconMap = {
    Clear: SunnyIcon,
    Clouds: CloudIcon,
    Rain: ThunderstormIcon,
    Drizzle: ThunderstormIcon,
    Thunderstorm: ThunderstormIcon,
    Snow: AcUnitIcon,
    Mist: CloudIcon,
  };

  const WeatherIcon = iconMap[info.weatherMain] || CloudIcon;

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card className="weatherCard">
          <CardContent className="cardContent">
            <Typography component="div" className="cityName">
              {info.city}, {info.country}
            </Typography>

            <div className="iconTemp">
              <WeatherIcon className="weatherIcon" />
              <h1>{Math.round(info.temp)}°C</h1>
            </div>

            <Typography className="weatherText">{info.weather}</Typography>

            <Typography className="detailsText">
              Min: {Math.round(info.tempMin)}°C &nbsp; | &nbsp; Max:{" "}
              {Math.round(info.tempMax)}°C
            </Typography>

            <Typography className="detailsText">
              Feels like: {Math.round(info.feels_like)}°C &nbsp; | &nbsp;
              Humidity: {info.humidity}% &nbsp; | &nbsp; Wind: {info.wind} m/s
            </Typography>

            <div className="sunTime">
              <WbSunnyIcon />
              Sunrise: {formatTime(info.sunrise, info.timezone)} &nbsp; | &nbsp;
              <BedtimeIcon />
              Sunset: {formatTime(info.sunset, info.timezone)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
