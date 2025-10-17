
import { WeatherData } from '../types';
import { getWeatherFromGemini } from './geminiService';

export const getWeatherDataByCity = (city: string): Promise<WeatherData> => {
    return getWeatherFromGemini(city);
};

export const getWeatherDataByCoords = (lat: number, lon: number): Promise<WeatherData> => {
    const locationString = `the location at latitude ${lat.toFixed(4)} and longitude ${lon.toFixed(4)}`;
    return getWeatherFromGemini(locationString);
};
