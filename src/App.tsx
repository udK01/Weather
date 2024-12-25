import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");

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
    <div className="w-full h-screen flex justify-center items-center flex-col space-y-10 bg-sky-700">
      <h1 className="flex text-[32px] text-white">
        {city !== "" ? (
          <>
            Weather in <p className="ml-2 text-orange-500">{city}</p>
          </>
        ) : (
          <>
            Please Enter A City<p className="text-orange-500">.</p>
          </>
        )}
      </h1>
      <input type="text" placeholder="Enter city" />
      <button className="bg-orange-400 text-[24px] px-10 rounded-md hover:bg-orange-600 transition-colors duration-150">
        Search
      </button>
    </div>
  );
}

export default App;
