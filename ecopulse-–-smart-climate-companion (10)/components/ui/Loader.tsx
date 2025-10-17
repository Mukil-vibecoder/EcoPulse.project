import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="w-12 h-12 border-4 border-t-orange-500 border-r-orange-500 border-b-orange-500 border-l-white rounded-full animate-spin"></div>
    );
};

export default Loader;