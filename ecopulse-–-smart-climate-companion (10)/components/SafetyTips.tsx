import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';

const SafetyTips: React.FC = () => {
    const tips = [
        { title: "Stay Hydrated", description: "Drink plenty of water throughout the day, even if you don't feel thirsty. Avoid sugary drinks and alcohol." },
        { title: "Keep Cool Indoors", description: "Stay in air-conditioned places as much as possible. If you don't have AC, go to a cooling center, library, or shopping mall." },
        { title: "Dress Appropriately", description: "Wear lightweight, loose-fitting, and light-colored clothing. A wide-brimmed hat can provide extra shade." },
        { title: "Limit Outdoor Activity", description: "Avoid strenuous activities during the hottest part of the day (usually 11 a.m. to 4 p.m.). If you must be outside, take frequent breaks in the shade." },
        { title: "Never Leave Anyone in a Car", description: "Never leave children, elderly people, or pets in a parked car, even for a short time. Temperatures can rise to dangerous levels within minutes." },
        { title: "Check on Vulnerable People", description: "Check on neighbors, friends, and family members who are elderly, sick, or may need extra help to stay cool." },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Heatwave Safety Tips</h1>
                <p className="text-lg text-gray-400">Essential advice to stay safe during extreme heat.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tips.map((tip, index) => (
                     <Card key={index} className="flex flex-col">
                        <h3 className="text-2xl font-bold mb-3 text-red-400">{tip.title}</h3>
                        <p className="text-gray-300">{tip.description}</p>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
};

export default SafetyTips;