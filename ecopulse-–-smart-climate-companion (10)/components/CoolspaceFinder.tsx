import React, { useState, useEffect, useRef } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Loader from './ui/Loader';
// FIX: Import motion from framer-motion instead of accessing it from window.
import { motion } from 'framer-motion';

// FIX: Declare L to inform TypeScript about the global Leaflet object.
declare const L: any;

const CoolspaceFinder: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('London');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mapContainerRef = useRef<HTMLDivElement>(null);
    // FIX: Use `any` for Leaflet types since type definitions are not installed. This resolves the "Cannot find namespace 'L'" error.
    const mapRef = useRef<any | null>(null);
    const markersRef = useRef<any | null>(null);
    
    // Custom blue icon for coolspaces
    const blueIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        className: 'hue-change'
    });
    
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `.hue-change { filter: hue-rotate(170deg) saturate(3) brightness(1.2); }`;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        }
    }, []);


    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);
            markersRef.current = L.layerGroup().addTo(mapRef.current);
        }
    }, []);

    const addCoolspaceMarkers = (lat: number, lon: number) => {
        if (!mapRef.current || !markersRef.current) return;
        
        markersRef.current.clearLayers(); // Clear old markers

        // Add a marker for the searched location
        L.marker([lat, lon]).addTo(markersRef.current)
            .bindPopup("Your searched location.")
            .openPopup();

        const coolSpaceTypes = [
            'Public Library',
            'Community Center',
            'Shopping Mall',
            'Public Swimming Pool',
            'Movie Theater',
            'Museum',
            'Community Hall',
            'Place of Worship',
            'Senior Center',
            'Youth Center'
        ];

        // Add mock coolspace markers nearby
        for (let i = 0; i < 10; i++) {
            const randomLat = lat + (Math.random() - 0.5) * 0.05;
            const randomLon = lon + (Math.random() - 0.5) * 0.05;
            const spaceType = coolSpaceTypes[Math.floor(Math.random() * coolSpaceTypes.length)];
            L.marker([randomLat, randomLon], { icon: blueIcon }).addTo(markersRef.current)
                .bindPopup(`<b>${spaceType}</b><br>Cooling Space`);
        }
    };
    
    const findLocation = async (query: string | { lat: number, lon: number }) => {
        setLoading(true);
        setError(null);
        try {
            let lat, lon, displayName;
            if (typeof query === 'string') {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    lat = parseFloat(data[0].lat);
                    lon = parseFloat(data[0].lon);
                    displayName = data[0].display_name;
                    setSearchTerm(displayName.split(',')[0]);
                } else {
                    throw new Error("Location not found. Please try another search.");
                }
            } else {
                lat = query.lat;
                lon = query.lon;
                setSearchTerm("My Location");
            }
            
            if (mapRef.current) {
                mapRef.current.flyTo([lat, lon], 13);
                addCoolspaceMarkers(lat, lon);
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                findLocation({ lat: latitude, lon: longitude });
            },
            () => {
                setError('Unable to retrieve your location. Please grant permission or search manually.');
            }
        );
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        findLocation(searchTerm);
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
                <h2 className="text-3xl font-bold mb-4 gradient-text">Find a Coolspace</h2>
                <p className="text-gray-300 mb-6">Search for a city to find nearby cooling centers during heatwaves.</p>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter a city or address"
                        className="flex-grow p-3 rounded-lg border-none focus:ring-2 focus:ring-red-500 outline-none bg-gray-800 text-white"
                    />
                    <Button type="submit">Search</Button>
                    <Button onClick={handleUseMyLocation} type="button" className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">Use My Location</Button>
                </form>
                
                {loading && <div className="flex justify-center my-4"><Loader /></div>}
                {error && <p className="text-red-300 bg-red-800/50 p-3 rounded-lg my-4">{error}</p>}

                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700 mt-4">
                    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
                </div>
            </Card>
        </motion.div>
    );
};

export default CoolspaceFinder;
