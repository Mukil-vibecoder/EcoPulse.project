import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import CoolspaceFinder from './components/CoolspaceFinder';
import Marketplace from './components/Marketplace';
import About from './components/About';
import HeatwaveChecker from './components/HeatwaveChecker';
import Profile from './components/Profile';
import SafetyTips from './components/SafetyTips';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/coolspace-finder" element={<CoolspaceFinder />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/about" element={<About />} />
                <Route path="/safety-tips" element={<SafetyTips />} />
                <Route path="/heatwave-checker" element={<HeatwaveChecker />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className="flex flex-col min-h-screen bg-black text-gray-200">
                <Header />
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-grow">
                    <AnimatedRoutes />
                </motion.main>
                <Footer />
            </div>
        </HashRouter>
    );
};

export default App;