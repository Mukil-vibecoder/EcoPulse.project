import React from 'react';
import Card from './ui/Card';
// FIX: Import motion from framer-motion instead of accessing it from window.
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="max-w-4xl mx-auto">
                <Card>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4 gradient-text">About EcoPulse</h2>
                        <p className="text-lg text-gray-300 mb-6">
                            EcoPulse is your smart companion in the fight against climate change. We leverage the power of AI to provide you with real-time information, actionable tips, and community-driven platforms to help you make a tangible difference. From staying safe during heatwaves to making recycling easier, EcoPulse is here to empower every individual to contribute to a cooler, healthier planet.
                        </p>
                        <blockquote className="mt-8 p-4 border-l-4 border-yellow-400 bg-gray-800/50 rounded-r-lg">
                            <p className="text-xl italic text-gray-200">
                                “Technology can cool the planet — one action at a time.”
                            </p>
                        </blockquote>
                    </div>
                </Card>
            </div>
        </motion.div>
    );
};

export default About;