import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import Button from './ui/Button';

const Profile: React.FC = () => {
    const [name, setName] = useState(() => localStorage.getItem('user-profile-name') || '');
    const [location, setLocation] = useState(() => localStorage.getItem('user-profile-location') || '');
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('user-profile-name', name);
        localStorage.setItem('user-profile-location', location);
        console.log('Profile Saved:', { name, location });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000); // Hide message after 3 seconds
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="max-w-2xl mx-auto">
                <Card>
                    <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Your Profile & Settings</h2>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-red-500 outline-none bg-gray-800 text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                                Location (City) (Optional)
                            </label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter your city"
                                className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-red-500 outline-none bg-gray-800 text-white"
                            />
                        </div>
                        <div className="text-center pt-4">
                            <Button type="submit">
                                Save Settings
                            </Button>
                        </div>
                    </form>
                    {saved && (
                        <p className="mt-4 text-center text-green-300 bg-green-800/50 p-3 rounded-lg">
                            Settings saved successfully!
                        </p>
                    )}
                </Card>
            </div>
        </motion.div>
    );
};

export default Profile;