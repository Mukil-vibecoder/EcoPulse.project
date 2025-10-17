import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Icon Components ---
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>;
const ChatbotIconSvg = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-16 h-16"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>;
const ThermometerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-16 h-16"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75v3.75m0 0a.375.375 0 01-.375.375H7.5a.375.375 0 01-.375-.375v-3.75M15.75 6.75v3.75m0 0a.375.375 0 00.375.375h.375a.375.375 0 00.375-.375v-3.75M9 19.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM12 12.75a2.25 2.25 0 00-2.25 2.25v2.25a2.25 2.25 0 004.5 0v-2.25a2.25 2.25 0 00-2.25-2.25z" /></svg>;
const TreeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-16 h-16"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V3m0 9.75a.75.75 0 01-1.064 1.06l-1.06-1.06a.75.75 0 010-1.528l1.06-1.06a.75.75 0 011.064 0l1.06 1.06a.75.75 0 010 1.528l-1.06 1.06a.75.75 0 01-1.064-1.06zM19.5 9.75V15a.75.75 0 01-1.064 1.06l-1.06-1.06a.75.75 0 010-1.528l1.06-1.06a.75.75 0 011.064 0l1.06 1.06a.75.75 0 010 1.528l-1.06 1.06a.75.75 0 01-1.064-1.06zM4.5 9.75V15a.75.75 0 001.064 1.06l1.06-1.06a.75.75 0 000-1.528l-1.06-1.06a.75.75 0 00-1.064 0l-1.06 1.06a.75.75 0 000 1.528l1.06 1.06a.75.75 0 001.064-1.06zM21 21a.75.75 0 01-.75.75H3.75a.75.75 0 010-1.5h16.5a.75.75 0 01.75.75z" /></svg>;
const FireStatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071L12 3.428 11.037 2.286a.75.75 0 00-1.071 1.071L12 5.571l-2.071-2.072a.75.75 0 00-1.071 1.071L12 8.714l-4.071-4.072a.75.75 0 00-1.071 1.071L12 11.857l-6.071-6.072a.75.75 0 00-1.071 1.071L12 15l-8.071-8.072a.75.75 0 00-1.071 1.071L12 18.143l-9.071-9.072a.75.75 0 10-1.071 1.071L12 21.286l1.037-1.142.029.028a.75.75 0 101.071-1.071l-.028-.029 1.142-1.037.028.029a.75.75 0 101.071-1.071l-.029-.028 2.143-2.071.028.029a.75.75 0 101.071-1.071l-.029-.028 3.143-3.071.028.029a.75.75 0 001.071-1.071l-.029-.028L12 9.857l4.071-4.072a.75.75 0 001.071-1.071L12 7.714l2.071-2.072a.75.75 0 001.071-1.071L12 6.571l1.037-1.142.029.028a.75.75 0 001.071-1.071l-.028-.029 1.142-1.037.028.029a.75.75 0 101.071-1.071l-.029-.028z" clipRule="evenodd" /></svg>;
const TempStatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M11.25 4.533A9.708 9.708 0 001.5 12c0 5.374 4.366 9.75 9.75 9.75s9.75-4.376 9.75-9.75c0-4.01-2.427-7.44-5.832-8.917.533.22 1.04.5.15.833a.75.75 0 00-.75-.75V4.5z" /><path fillRule="evenodd" d="M12.75 6a.75.75 0 00-1.5 0v6.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V6z" clipRule="evenodd" /></svg>;
const UsersStatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM2.25 20.25a2.25 2.25 0 012.25-2.25h8.25a2.25 2.25 0 012.25 2.25v.75a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75v-.75zM15.75 16.5a1.5 1.5 0 011.5-1.5h2.25a1.5 1.5 0 011.5 1.5v4.5a.75.75 0 01-.75.75h-3.75a.75.75 0 01-.75-.75v-4.5z" /></svg>;
const TreeStatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path fillRule="evenodd" d="M12.54 2.22a.75.75 0 00-1.08 0l-6.25 6.25a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.08 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25zM9.56 10.44a.75.75 0 00-1.06 0L3.25 15.69a.75.75 0 000 1.06l5.25 5.25a.75.75 0 001.06 0l5.25-5.25a.75.75 0 000-1.06l-5.25-5.25z" clipRule="evenodd" /></svg>;

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
        >
            {/* Hero Section */}
            <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/60 via-black/80 to-black">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-block bg-gray-800/50 border border-gray-700 px-4 py-1 rounded-full text-sm font-semibold tracking-wider"
                    >
                       <span className="text-red-400 mr-2">▵</span> CRITICAL CLIMATE EMERGENCY
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black mt-4 text-white"
                    >
                        Beat the Heat,<br/> <span className="gradient-text-pink">Save Lives</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
                    >
                        Heatwaves kill 150,000+ people every year. EcoPulse connects communities with life-saving cooling spaces, AI safety guidance, and climate action tools.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
                    >
                        <button onClick={() => navigate('/safety-tips')} className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <AlertIcon />
                            Learn Safety Tips NOW
                        </button>
                         <button onClick={() => navigate('/chatbot')} className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-black/30 border border-gray-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 hover:bg-white/10 transition-all duration-300">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Talk to Climate AI
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-black">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold">How EcoPulse Saves Lives</h2>
                    <p className="mt-4 text-lg text-gray-400">Three powerful tools for survival and sustainability</p>
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {/* AI Climate Chatbot */}
                        <div className="rounded-2xl p-0.5 bg-gradient-to-br from-red-500 to-orange-500">
                             <div className="h-full bg-black rounded-[15px] p-8 flex flex-col text-left">
                                <div className="h-48 flex items-center justify-center bg-gradient-to-br from-red-600 to-orange-500 rounded-lg">
                                    <ChatbotIconSvg />
                                </div>
                                <h3 className="text-2xl font-bold mt-6">AI Climate Chatbot</h3>
                                <p className="text-gray-400 mt-2 flex-grow">Instant advice on surviving heatwaves, reducing energy use, and taking climate action.</p>
                                <button onClick={() => navigate('/chatbot')} className="mt-6 w-full text-center py-3 font-semibold rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition-opacity">Get Help Now →</button>
                            </div>
                        </div>
                         {/* CoolSpace Finder */}
                        <div className="rounded-2xl p-0.5 bg-gradient-to-br from-blue-500 to-cyan-400">
                            <div className="h-full bg-[#101c36] rounded-[15px] p-8 flex flex-col text-left">
                                <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg">
                                    <ThermometerIcon />
                                </div>
                                <h3 className="text-2xl font-bold mt-6">CoolSpace Finder</h3>
                                <p className="text-gray-400 mt-2 flex-grow">Find nearby air-conditioned spaces, parks, and cooling centers to escape dangerous heat.</p>
                                <button onClick={() => navigate('/coolspace-finder')} className="mt-6 w-full text-center py-3 font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-opacity">Find Safe Spaces →</button>
                            </div>
                        </div>
                        {/* Recycling Marketplace */}
                        <div className="rounded-2xl p-0.5 bg-gradient-to-br from-green-500 to-emerald-400">
                            <div className="h-full bg-[#0a2821] rounded-[15px] p-8 flex flex-col text-left">
                                <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg">
                                    <TreeIcon />
                                </div>
                                <h3 className="text-2xl font-bold mt-6">Recycling Marketplace</h3>
                                <p className="text-gray-400 mt-2 flex-grow">Buy, sell, or give away items. Reduce waste and fight climate change together.</p>
                                <button onClick={() => navigate('/marketplace')} className="mt-6 w-full text-center py-3 font-semibold rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 hover:opacity-90 transition-opacity">Browse Items →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Stats Section */}
            <div className="py-24 bg-black">
                 <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">The Crisis in Numbers</h2>
                    <p className="mt-4 text-lg text-red-400 font-semibold">Lives are at stake. Action is urgent.</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-left">
                        <div className="bg-gray-900/50 p-6 rounded-2xl border border-red-500/50 relative overflow-hidden"><div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-orange-500"></div><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center"><FireStatIcon /></div></div><p className="text-4xl lg:text-5xl font-extrabold mt-4">150,000+</p><p className="text-gray-400 mt-1">Global heatwave deaths annually</p></div>
                        <div className="bg-gray-900/50 p-6 rounded-2xl border border-orange-500/50 relative overflow-hidden"><div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 to-yellow-500"></div><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center"><TempStatIcon /></div></div><p className="text-4xl lg:text-5xl font-extrabold mt-4">10,635</p><p className="text-gray-400 mt-1">Heat deaths in India (2013-2022)</p></div>
                        <div className="bg-gray-900/50 p-6 rounded-2xl border border-cyan-500/50 relative overflow-hidden"><div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-500"></div><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center"><UsersStatIcon /></div></div><p className="text-4xl lg:text-5xl font-extrabold mt-4">2M+</p><p className="text-gray-400 mt-1">People using cooling spaces</p></div>
                        <div className="bg-gray-900/50 p-6 rounded-2xl border border-green-500/50 relative overflow-hidden"><div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500"></div><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"><TreeStatIcon /></div></div><p className="text-4xl lg:text-5xl font-extrabold mt-4">500K+</p><p className="text-gray-400 mt-1">Items recycled through EcoPulse</p></div>
                     </div>
                 </div>
            </div>
        </motion.div>
    );
};

export default Home;