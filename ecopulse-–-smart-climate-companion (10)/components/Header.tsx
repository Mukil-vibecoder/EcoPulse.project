
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-15.02 1.202A2.25 2.25 0 012.25 18v-2.192l15.02-1.201a2.25 2.25 0 011.98-2.193zM6.75 8.25h.008v.008H6.75V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
const CoolSpaceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const MarketplaceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.858-6.195a.75.75 0 00-.65-1.026H4.25" /></svg>;
const SafetyTipsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.62-3.749A11.959 11.959 0 0118 6c-.22.28-.45.555-.69.832m-12.12.366A11.933 11.933 0 0112 3.5c2.12 0 4.1.597 5.808 1.632M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>;
const HeatwaveCheckerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


const Header: React.FC = () => {
    const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
        `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            isActive 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
        }`;

    return (
        <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800"
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center text-white">
                             <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full font-bold text-white text-lg">E</div>
                             <span className="ml-3 text-2xl font-extrabold">EcoPulse</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:flex md:items-center">
                        <div className="flex items-baseline space-x-1">
                            <NavLink to="/" className={navLinkClass}><HomeIcon /><span>Home</span></NavLink>
                            <NavLink to="/chatbot" className={navLinkClass}><ChatIcon /><span>Chatbot</span></NavLink>
                            <NavLink to="/coolspace-finder" className={navLinkClass}><CoolSpaceIcon /><span>CoolSpace Finder</span></NavLink>
                            <NavLink to="/marketplace" className={navLinkClass}><MarketplaceIcon /><span>Marketplace</span></NavLink>
                            <NavLink to="/safety-tips" className={navLinkClass}><SafetyTipsIcon /><span>Safety Tips</span></NavLink>
                             <NavLink to="/heatwave-checker" className={navLinkClass}><HeatwaveCheckerIcon /><span>Heatwave Checker</span></NavLink>
                            <NavLink to="/about" className={navLinkClass}><AboutIcon /><span>About</span></NavLink>
                        </div>
                         <div className="ml-4 border-l border-gray-700 pl-4">
                            <NavLink to="/profile" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <UserIcon />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
};

export default Header;
