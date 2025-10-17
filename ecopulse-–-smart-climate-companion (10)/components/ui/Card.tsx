
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-gray-900/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50 ${className}`}>
            {children}
        </div>
    );
};

export default Card;