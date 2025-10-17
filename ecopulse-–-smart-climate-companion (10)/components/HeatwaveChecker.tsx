import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Loader from './ui/Loader';
import { WeatherData } from '../types';
import { getWeatherDataByCity, getWeatherDataByCoords } from '../services/weatherService';
// FIX: Import motion from framer-motion instead of accessing it from window.
import { motion } from 'framer-motion';

const WeatherDisplay: React.FC<{ data: WeatherData }> = ({ data }) => {
    const isHeatwave = data.temperature > 38;

    return (
        <div className="mt-6 text-center">
            <div className={`inline-block px-6 py-2 rounded-full text-white font-bold text-lg mb-4 ${isHeatwave ? 'bg-red-500' : 'bg-green-500'}`}>
                {isHeatwave ? 'Heatwave Alert!' : 'Safe Zone'}
            </div>
            <h3 className="text-2xl font-bold text-white">{data.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-white">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-sm text-red-300">Temperature</p>
                    <p className="text-3xl font-semibold">{data.temperature}°C</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-sm text-red-300">Humidity</p>
                    <p className="text-3xl font-semibold">{data.humidity}%</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-sm text-red-300">Heat Index</p>
                    <p className="text-3xl font-semibold">{data.heatIndex}°C</p>
                </div>
            </div>
        </div>
    );
};

const HeatwaveChecker: React.FC = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (fetcher: () => Promise<WeatherData>) => {
        setLoading(true);
        setError(null);
        setWeatherData(null);
        try {
            const data = await fetcher();
            setWeatherData(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!city) {
            setError('Please enter a city name.');
            return;
        }
        fetchWeather(() => getWeatherDataByCity(city));
    };

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(() => getWeatherDataByCoords(latitude, longitude));
            },
            () => {
                setError('Unable to retrieve your location. Please grant permission or search manually.');
            }
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <Card>
                <h2 className="text-3xl font-bold mb-4 gradient-text">Real-Time Heatwave Checker</h2>
                <p className="text-gray-300 mb-6">Enter a city or use your location to check the current heatwave status.</p>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter a city name"
                        className="flex-grow p-3 rounded-lg border-none focus:ring-2 focus:ring-red-500 outline-none bg-gray-800 text-white"
                    />
                    <Button type="submit">Search</Button>
                    <Button onClick={handleUseMyLocation} type="button" className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">Use My Location</Button>
                </form>

                {loading && <div className="flex justify-center my-4"><Loader /></div>}
                {error && <p className="text-red-300 bg-red-800/50 p-3 rounded-lg my-4">{error}</p>}
                {weatherData && <WeatherDisplay data={weatherData} />}
            </Card>
        </motion.div>
    );
};

export default HeatwaveChecker;