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
        {/* Title */}
        <div className="flex items-center justify-center">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="mx-auto mb-4"
          />
          <p className="text-xl font-semibold mb-2">
            {weatherData.name}, {weatherData.sys.country}
          </p>
          <img
            src={`https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png`}
            alt={`Flag of ${weatherData.sys.country}`}
            className="mx-auto mb-4 w-20 h-10"
          />
        </div>

        {/* Data */}
        <div className="text-white">
          <table className="table-auto w-full text-lg">
            <tbody>
              <tr>
                <td className="px-4 py-2 text-left">Weather</td>
                <td className="px-4 py-2 text-right">
                  {weatherData.weather[0].description}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Temperature</td>
                <td className="px-4 py-2 text-right">
                  {kelvinToCelsius(weatherData.main.temp)}°C
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Feels Like</td>
                <td className="px-4 py-2 text-right">
                  {kelvinToCelsius(weatherData.main.feels_like)}°C
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Humidity</td>
                <td className="px-4 py-2 text-right">
                  {weatherData.main.humidity}%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-left">Wind Speed</td>
                <td className="px-4 py-2 text-right">
                  {weatherData.wind.speed} m/s
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
