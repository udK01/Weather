import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [inputValue, setInputValue] = useState("");

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

  function handleCity() {
    setCity(inputValue);
    fetchWeather(city);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center gap-5 bg-gray-700 text-white">
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
  );
}

export default App;
