import { WeatherData } from "./WeatherData";

interface WeatherCardProps {
  weatherData: WeatherData;
  kelvinToCelsius: (kelvin: number) => string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  kelvinToCelsius,
}) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center">
        <p className="text-xl font-semibold mb-2">
          Weather in {weatherData.name}, {weatherData.sys.country}
        </p>
        <img
          src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
          alt={`Flag of ${weatherData.sys.country}`}
          className="mx-auto mb-4 w-20 h-10"
        />
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="mx-auto mb-4 w-[40%]"
        />
        <p className="text-lg">Weather: {weatherData.weather[0].description}</p>
        <p className="text-lg">
          Temperature: {kelvinToCelsius(weatherData.main.temp)}°C
        </p>
        <p className="text-lg">
          Feels Like: {kelvinToCelsius(weatherData.main.feels_like)}°C
        </p>
        <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
        <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
