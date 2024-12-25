import { useState } from "react";

interface WeatherData {
  name: string;
  weather: Array<{ description: string }>;
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  sys: { country: string; flagUrl: string };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
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
        data.sys.flagUrl = `https://flagcdn.com/w320/${data.sys.country.toLowerCase()}.png`;
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

  function handleCity() {
    setCity(inputValue);
    fetchWeather(inputValue);
  }

  const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1);

  return (
    <div className="h-screen bg-gray-700 flex justify-center items-center flex-col space-y-10">
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
          onClick={handleCity}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        {weatherData && (
          <div className="text-white">
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
            <p>Feels Like: {kelvinToCelsius(weatherData.main.feels_like)}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <img src={`${weatherData.sys.flagUrl}`} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
