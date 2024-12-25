import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("Swansea");

  const fetchWeather = async (city: string): Promise<void> => {
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div>
      <h1>Weather in {city}</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
    </div>
  );
}

export default App;
