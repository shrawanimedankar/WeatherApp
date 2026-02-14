🌤️ Weather App | React 

A **responsive Weather Application** built with **React.js** that fetches real-time weather data from an API and dynamically changes the background according to weather conditions.

---

## 🌐 Live Demo: &nbsp; *https://weatherapp-vw8v.onrender.com*

## 📌 Features
- Fetches **current weather data** for any city worldwide using a weather API.  
- Displays detailed information:
  - Temperature, Min/Max Temperature, Feels like temperature, Humidity, Wind speed, Sunrise & Sunset time, Weather description (e.g., clear sky, rain, snow)
- **Dynamic background images** based on:
 ◦ Temperature (`hot`, `cold`, `mild`)
 ◦ Humidity (`rainy`, `drizzle`)
 ◦ Wind speed (`thunderstorm`)
- **Responsive design** for mobile and tablet screens using media queries.
- Shows **error messages** when the city is not found.
- **Smooth transitions** for background changes.

---

## Technologies Used
- **Frontend:** React.js, Material UI (MUI)  
- **State Management:** `useState`, `useEffect`  
- **API:** OpenWeatherMap API (or any weather API)  
- **CSS:** Modular component CSS, responsive media queries  
- **Icons:** Material UI Icons  

---

## Future Improvements
- Add 7-day weather forecast.
- Add animations for rain, snow, and thunderstorms.

---

## Install dependencies
- npm install

## Set up environment variables
◦ Create a .env file in the root directory: 
- VITE_WEATHER_API_KEY=YOUR_API_KEY_HERE
- VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather

*NOTE* Replace YOUR_API_KEY_HERE with your actual API key from OpenWeatherMap.

## Start the development server
- npm run dev

Open your browser at http://localhost:5173 (or the URL given in the terminal).


