export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  material: string;
  style: string;
  description: string;
  badge?: string;
  inStock: boolean;
}

export const categories = [
  { id: "living-room", name: "Living Room", icon: "🛋️", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", count: 48 },
  { id: "bedroom", name: "Bedroom", icon: "🛏️", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80", count: 36 },
  { id: "dining", name: "Dining", icon: "🍽️", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", count: 24 },
  { id: "office", name: "Office", icon: "💼", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80", count: 18 },
  { id: "decor", name: "Decor", icon: "🏺", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80", count: 52 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Teak Wood Sofa Set",
    category: "living-room",
    price: 89999,
    originalPrice: 124999,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    rating: 4.8,
    reviews: 124,
    material: "Teak Wood",
    style: "Traditional",
    description: "Handcrafted royal teak wood sofa set with premium upholstery. Perfect for Indian living rooms.",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: "2",
    name: "Modern L-Shape Sectional",
    category: "living-room",
    price: 67999,
    originalPrice: 85999,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
    rating: 4.6,
    reviews: 89,
    material: "Engineered Wood & Fabric",
    style: "Modern",
    description: "Contemporary L-shape sectional sofa with plush cushioning and durable fabric.",
    badge: "Trending",
    inStock: true,
  },
  {
    id: "3",
    name: "Sheesham King Size Bed",
    category: "bedroom",
    price: 54999,
    originalPrice: 72999,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    rating: 4.7,
    reviews: 156,
    material: "Sheesham Wood",
    style: "Contemporary",
    description: "Solid sheesham wood king size bed with storage. Built to last generations.",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: "4",
    name: "6-Seater Dining Table Set",
    category: "dining",
    price: 45999,
    originalPrice: 59999,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    rating: 4.5,
    reviews: 67,
    material: "Mango Wood",
    style: "Rustic",
    description: "Beautiful mango wood dining table with 6 upholstered chairs. Seats the whole family.",
    inStock: true,
  },
  {
    id: "5",
    name: "Executive Office Chair",
    category: "office",
    price: 18999,
    originalPrice: 24999,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80",
    rating: 4.4,
    reviews: 203,
    material: "Mesh & Metal",
    style: "Ergonomic",
    description: "Premium ergonomic office chair with lumbar support and adjustable armrests.",
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: "6",
    name: "Carved Wooden Bookshelf",
    category: "decor",
    price: 32999,
    originalPrice: 41999,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80",
    rating: 4.9,
    reviews: 45,
    material: "Teak Wood",
    style: "Traditional",
    description: "Intricately carved solid teak bookshelf with 5 shelves. A statement piece for your home.",
    badge: "New",
    inStock: true,
  },
  {
    id: "7",
    name: "Velvet Accent Chair",
    category: "living-room",
    price: 15999,
    originalPrice: 21999,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80",
    rating: 4.3,
    reviews: 78,
    material: "Velvet & Wood",
    style: "Modern",
    description: "Luxurious velvet accent chair with solid wood legs. Adds elegance to any room.",
    inStock: true,
  },
  {
    id: "8",
    name: "Bedside Table Set (Pair)",
    category: "bedroom",
    price: 12999,
    originalPrice: 16999,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80",
    rating: 4.6,
    reviews: 92,
    material: "Sheesham Wood",
    style: "Contemporary",
    description: "Pair of sheesham wood bedside tables with drawer storage. Compact and functional.",
    badge: "Value Pack",
    inStock: true,
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Priya Patel",
    location: "Jamnagar",
    rating: 5,
    text: "The quality of the teak sofa set is exceptional. Dream Decor truly delivers on their promise of premium craftsmanship. Our living room looks magnificent!",
    avatar: "PP",
  },
  {
    id: "2",
    name: "Rajesh Mehta",
    location: "Surat",
    rating: 5,
    text: "Ordered a dining table set and it arrived in perfect condition. The wood finish is beautiful and the delivery team was very professional.",
    avatar: "RM",
  },
  {
    id: "3",
    name: "Anjali Shah",
    location: "Bhavnagar",
    rating: 4,
    text: "Beautiful bedroom furniture! The sheesham wood bed is sturdy and elegant. Dream Decor has earned a customer for life.",
    avatar: "AS",
  },
  {
    id: "4",
    name: "Vikram Joshi",
    location: "Porbandar",
    rating: 5,
    text: "Outstanding craftsmanship and attention to detail. The carved bookshelf is a masterpiece. Highly recommend Dream Decor!",
    avatar: "VJ",
  },
];

export function formatPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}

export function getDiscount(price: number, originalPrice?: number): number | null {
  if (!originalPrice) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
