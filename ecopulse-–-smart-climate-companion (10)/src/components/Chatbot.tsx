import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageSender } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import TypingIndicator from './ui/TypingIndicator';
import Button from './ui/Button';
// FIX: Import motion from framer-motion instead of accessing it from window.
import { motion } from 'framer-motion';

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! I am EcoPulse. How can I help you understand and combat climate change today?', sender: MessageSender.AI }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingIntervalRef = useRef<number | null>(null);

    const messageSound = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        messageSound.current = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3');
        // Cleanup interval on unmount
        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
        };
    }, []);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const typeMessage = (id: string, fullText: string) => {
        let currentText = '';
        let index = 0;

        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
        }

        typingIntervalRef.current = window.setInterval(() => {
            if (index < fullText.length) {
                currentText += fullText[index];
                setMessages(prev => prev.map(m => m.id === id ? { ...m, text: currentText } : m));
                index++;
            } else {
                if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                setIsLoading(false);
                if (messageSound.current) {
                    messageSound.current.play().catch(e => console.error("Error playing sound:", e));
                }
            }
        }, 30);
    };

    const handleSendMessage = async (query?: string) => {
        const textToSend = query || input;
        if (textToSend.trim() === '' || isLoading) return;
        
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

        const userMessage: Message = { id: Date.now().toString(), text: textToSend, sender: MessageSender.USER };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponseText = await getChatbotResponse(textToSend);
            const aiMessage: Message = { id: (Date.now() + 1).toString(), text: '', sender: MessageSender.AI };
            setMessages(prev => [...prev, aiMessage]);
            typeMessage(aiMessage.id, aiResponseText);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage: Message = { id: (Date.now() + 1).toString(), text: 'Sorry, I am having trouble connecting. Please try again later.', sender: MessageSender.AI };
            setMessages(prev => [...prev, errorMessage]);
            setIsLoading(false);
        }
    };

    const quickReplies = ["Heatwave Tips", "Sustainable Living", "Recycling Info"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="flex flex-col h-[75vh] max-w-3xl mx-auto">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50 border border-gray-700 rounded-t-2xl shadow-inner">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === MessageSender.USER ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === MessageSender.USER ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.sender === MessageSender.USER && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-gray-800/60 backdrop-blur-lg rounded-b-2xl shadow-md border-x border-b border-gray-700">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {quickReplies.map(reply => (
                            <button key={reply} onClick={() => handleSendMessage(reply)} disabled={isLoading} className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-full transition-colors duration-300 disabled:opacity-50">
                                {reply}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask about climate change..."
                            className="flex-1 p-3 border-none rounded-l-full focus:ring-2 focus:ring-red-500 outline-none bg-gray-900 text-white"
                            disabled={isLoading}
                        />
                        <Button onClick={() => handleSendMessage()} disabled={isLoading} className="rounded-l-none rounded-r-full">
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Chatbot;