// FIX: Removed 'LiveSession' as it is not an exported member of '@google/genai'.
import { GoogleGenAI, LiveServerMessage, Chat } from "@google/genai";

export enum MessageSender {
    USER = 'user',
    AI = 'ai',
}

export interface Message {
    id: string;
    text: string;
    sender: MessageSender;
}

export enum MarketplaceCategory {
    PLASTIC = 'Plastic',
    METAL = 'Metal',
    PAPER = 'Paper',
    GLASS = 'Glass',
    ELECTRONICS = 'Electronics',
    OTHER = 'Other'
}

export interface MarketplaceItem {
    id: string;
    name: string;
    category: MarketplaceCategory;
    description: string;
    contact: string;
    imageUrl: string;
    price: number | 'Free';
    currency: string; // e.g., 'USD', 'EUR', 'INR'
    city: string;
}

export interface WeatherData {
    city: string;
    temperature: number;
    humidity: number;
    heatIndex: number;
}