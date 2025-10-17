
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    return (
        <motion.footer 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="w-full py-6 mt-auto border-t border-gray-800"
        >
            <div className="container mx-auto text-center text-gray-500 text-sm">
                 © {new Date().getFullYear()} EcoPulse. All Rights Reserved.
            </div>
        </motion.footer>
    );
};

export default Footer;