import React, { useState, useMemo } from 'react';
import { MarketplaceItem, MarketplaceCategory } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { motion } from 'framer-motion';

const currencies = [
    { code: 'USD', name: 'United States Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'KRW', name: 'South Korean Won' },
];


const initialItems: MarketplaceItem[] = [];

const AddItemModal: React.FC<{onClose: () => void, onAddItem: (item: Omit<MarketplaceItem, 'id' | 'imageUrl'>) => void}> = ({ onClose, onAddItem }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [category, setCategory] = useState<MarketplaceCategory>(MarketplaceCategory.PLASTIC);
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('0');
    const [currency, setCurrency] = useState('USD');
    const [isFree, setIsFree] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddItem({
            name,
            description,
            contact,
            category,
            city,
            price: isFree ? 'Free' : parseFloat(price),
            currency: isFree ? '' : currency,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <h3 className="text-2xl font-bold mb-4 gradient-text">Add a New Item</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Item Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 rounded-lg border-none bg-gray-800 text-white" />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-3 rounded-lg border-none bg-gray-800 text-white" />
                    <input type="text" placeholder="Contact Info (email/phone)" value={contact} onChange={e => setContact(e.target.value)} required className="w-full p-3 rounded-lg border-none bg-gray-800 text-white" />
                    <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required className="w-full p-3 rounded-lg border-none bg-gray-800 text-white" />
                    <select value={category} onChange={e => setCategory(e.target.value as MarketplaceCategory)} className="w-full p-3 rounded-lg border-none bg-gray-800 text-white">
                        {Object.values(MarketplaceCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <div className="flex items-center gap-4">
                        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} disabled={isFree} required className="w-full p-3 rounded-lg border-none bg-gray-800 text-white disabled:bg-gray-700" />
                        <select value={currency} onChange={e => setCurrency(e.target.value)} disabled={isFree} className="p-3 rounded-lg border-none bg-gray-800 text-white disabled:bg-gray-700">
                           {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                        </select>
                    </div>
                     <div className="flex items-center">
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input type="checkbox" checked={isFree} onChange={e => setIsFree(e.target.checked)} className="h-5 w-5 rounded text-red-500 focus:ring-red-500 bg-gray-700 border-gray-600" />
                            Mark as Free
                        </label>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 focus:ring-gray-500">Cancel</Button>
                        <Button type="submit">Add Item</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};


const Marketplace: React.FC = () => {
    const [items, setItems] = useState<MarketplaceItem[]>(initialItems);
    const [categoryFilter, setCategoryFilter] = useState<MarketplaceCategory | 'All'>('All');
    const [cityFilter, setCityFilter] = useState('');
    const [currencyFilter, setCurrencyFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const categoryMatch = categoryFilter === 'All' || item.category === categoryFilter;
            const cityMatch = !cityFilter || item.city.toLowerCase().includes(cityFilter.toLowerCase());
            const currencyMatch = currencyFilter === 'All' || item.currency === currencyFilter;
            const freeMatch = currencyFilter === 'Free' && item.price === 'Free';

            if (currencyFilter === 'Free') return categoryMatch && cityMatch && freeMatch;
            
            return categoryMatch && cityMatch && currencyMatch;
        });
    }, [categoryFilter, cityFilter, currencyFilter, items]);

    const handleAddItem = (newItemData: Omit<MarketplaceItem, 'id' | 'imageUrl'>) => {
        const newItem: MarketplaceItem = {
            ...newItemData,
            id: Date.now().toString(),
            imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`, // random image
        };
        setItems(prevItems => [newItem, ...prevItems]);
    };

    const categories = ['All', ...Object.values(MarketplaceCategory)];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            {isModalOpen && <AddItemModal onClose={() => setIsModalOpen(false)} onAddItem={handleAddItem} />}
            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 gradient-text">Recycling Marketplace</h2>
                        <p className="text-gray-300">Exchange, donate, or sell recyclable materials.</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)} className="flex-shrink-0">Add Your Item +</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                     <input
                        type="text"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        placeholder="Filter by City..."
                        className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-red-500 outline-none bg-gray-800 text-white"
                    />
                     <select value={currencyFilter} onChange={e => setCurrencyFilter(e.target.value)} className="w-full p-3 rounded-lg border-none bg-gray-800 text-white focus:ring-2 focus:ring-red-500 outline-none">
                        <option value="All">All Currencies</option>
                        <option value="Free">Free Items</option>
                        {currencies.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
                    </select>
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat as MarketplaceCategory | 'All')}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                                categoryFilter === cat 
                                ? 'bg-red-600 text-white shadow-md' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <div key={item.id} className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 border border-gray-700/50">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="inline-block bg-red-400/20 text-red-300 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                                        {item.category}
                                    </span>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-white">
                                            {item.price === 'Free' ? 'Free' : `${item.currency} ${item.price}`}
                                        </p>
                                        <p className="text-xs text-gray-400">{item.city}</p>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                <p className="text-gray-400 mt-1 text-sm flex-grow">{item.description}</p>
                                <p className="mt-4 text-xs text-gray-300">
                                    Contact: <a href={`mailto:${item.contact}`} className="text-red-400 hover:underline">{item.contact}</a>
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                        <p className="text-gray-400 text-xl">The marketplace is currently empty.</p>
                        <p className="text-gray-500 mt-2">Why not be the first to list an item?</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Marketplace;