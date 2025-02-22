import { useState } from "react";
import WeatherCard from "./WeatherCard";
import { WeatherData } from "./WeatherData";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const fetchWeather = async (city: string): Promise<void> => {
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError("");
      } else {
        setWeatherData(null);
        setError(data.message || "City not found");
      }
    } catch (error) {
      setError("Error fetching weather data");
    }
  };

  const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1);

  return (
    <div className="h-screen bg-gray-700 flex justify-center items-center flex-col space-y-10">
      {/* Input */}
      <div className="w-full flex justify-center items-center gap-5 bg-gray-700 text-white">
        <h1 className="flex text-[32px]">Weather in</h1>
        <input
          id="cityInput"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter City"
          className="w-[250px] h-[40px] text-[24px] text-center rounded-lg bg-transparent ring-2 ring-black focus:ring-orange-500 focus:outline-none"
        />

        <button
          className="bg-orange-400 text-[24px] px-10 rounded-md hover:bg-orange-600 transition-colors duration-150"
          onClick={() => fetchWeather(inputValue)}
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display */}
      {weatherData && (
        <WeatherCard
          weatherData={weatherData}
          kelvinToCelsius={kelvinToCelsius}
        />
      )}
    </div>
  );
}

export default App;
