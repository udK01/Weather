export interface WeatherData {
  name: string;
  weather: Array<{ description: string; icon: string }>;
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  sys: { country: string };
}
