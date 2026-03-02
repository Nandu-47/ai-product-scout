export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  rating: number;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Nova Pro Laptop",
    category: "Laptops",
    price: 1299,
    description: "Ultra-thin 14\" laptop with M3 chip, 16GB RAM, 512GB SSD. Perfect for professionals who need power on the go.",
    tags: ["premium", "ultrabook", "professional"],
    rating: 4.8,
    image: "💻",
  },
  {
    id: "2",
    name: "BudgetBook 15",
    category: "Laptops",
    price: 449,
    description: "Affordable 15.6\" laptop with Intel i5, 8GB RAM, 256GB SSD. Great value for everyday computing and light work.",
    tags: ["budget", "value", "everyday"],
    rating: 4.2,
  image: "💻",
  },
  {
    id: "3",
    name: "Titan Gaming Rig",
    category: "Laptops",
    price: 2199,
    description: "17\" gaming powerhouse with RTX 4080, 32GB RAM, 1TB SSD, 240Hz display. Dominate every game.",
    tags: ["gaming", "high-performance", "premium"],
    rating: 4.9,
    image: "🎮",
  },
  {
    id: "4",
    name: "AirPods Max Ultra",
    category: "Audio",
    price: 549,
    description: "Premium over-ear headphones with spatial audio, active noise cancellation, and 30-hour battery life.",
    tags: ["premium", "audio", "noise-cancelling"],
    rating: 4.7,
    image: "🎧",
  },
  {
    id: "5",
    name: "SmartWatch X200",
    category: "Wearables",
    price: 399,
    description: "Advanced fitness tracker with ECG, blood oxygen monitoring, GPS, and 5-day battery. Water resistant to 50m.",
    tags: ["fitness", "health", "smart"],
    rating: 4.5,
    image: "⌚",
  },
  {
    id: "6",
    name: "ProTab 12.9",
    category: "Tablets",
    price: 899,
    description: "12.9\" tablet with stylus support, 256GB storage, perfect for digital artists and note-takers.",
    tags: ["creative", "professional", "stylus"],
    rating: 4.6,
    image: "📱",
  },
  {
    id: "7",
    name: "MechKey Pro",
    category: "Accessories",
    price: 159,
    description: "Wireless mechanical keyboard with hot-swappable switches, RGB backlighting, and USB-C charging.",
    tags: ["mechanical", "wireless", "rgb"],
    rating: 4.4,
    image: "⌨️",
  },
  {
    id: "8",
    name: "UltraCam 4K",
    category: "Cameras",
    price: 799,
    description: "Compact mirrorless camera with 4K video, 26MP sensor, and in-body stabilization. Perfect for content creators.",
    tags: ["camera", "4k", "content-creation"],
    rating: 4.7,
    image: "📷",
  },
];
