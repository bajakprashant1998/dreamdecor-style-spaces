export interface ProjectImage {
  url: string;
  alt: string;
  category: "Living Room" | "Bedroom" | "Kitchen" | "Other Spaces";
}

export interface ProjectTimeline {
  phase: string;
  duration: string;
  description: string;
}

export interface ProjectMaterial {
  category: string;
  details: string;
  brand?: string;
}

export interface ProjectTestimonial {
  name: string;
  rating: number;
  text: string;
  videoUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  location: string;
  area: string;
  type: "Residential" | "Commercial" | "Prestigious" | "Turnkey Sample";
  completionYear: string;
  description: string;
  heroImage: string;
  gallery: ProjectImage[];
  videoUrl?: string;
  overview: string;
  materials: ProjectMaterial[];
  timeline: ProjectTimeline[];
  beforeAfter?: { before: string; after: string }[];
  testimonial?: ProjectTestimonial;
  mapEmbed?: string;
  address?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "aarya-bhagwati-weekend-villa",
    title: "Aarya Bhagwati Weekend Villa",
    tagline: "Modern & Contemporary Luxury Villa Design",
    location: "Jamnagar, Gujarat",
    area: "4,500 sq ft",
    type: "Residential",
    completionYear: "2023",
    description: "A complete luxury villa interior with custom furniture and premium finishes.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", alt: "modern living room interior design Jamnagar villa", category: "Living Room" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80", alt: "luxury bedroom interior design Dream Decor", category: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", alt: "modern modular kitchen design Jamnagar", category: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", alt: "contemporary villa entrance design Gujarat", category: "Other Spaces" },
      { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", alt: "luxury dining room interior Jamnagar", category: "Living Room" },
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", alt: "master bedroom wardrobe design Dream Decor", category: "Bedroom" },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    overview: `The Aarya Bhagwati Weekend Villa project was a prestigious residential interior design undertaking in Jamnagar, Gujarat. The client envisioned a modern weekend retreat that blends contemporary aesthetics with the warmth of Indian hospitality. Dream Decor Furniture, as a leading interior designer in Jamnagar, delivered a stunning home interior design project that exceeded expectations.\n\nThe design concept revolved around open spaces, natural light, and a seamless indoor-outdoor connection. Our team tackled challenges including structural modifications for an open-plan layout and custom furniture manufacturing for unique curved elements. The result is a modern interior design masterpiece featuring Italian marble flooring, teak wood paneling, and smart home integration throughout all 4,500 sq ft.`,
    materials: [
      { category: "Furniture", details: "Solid Teak Wood, Italian Veneer, High-Density Foam", brand: "Dream Decor In-House" },
      { category: "Finishes", details: "PU Polish, Laminate (Merino & Century), Acrylic Panels", brand: "Merino, Century" },
      { category: "Flooring", details: "Italian Marble (Statuario), Vitrified Tiles", brand: "Imported Italian" },
      { category: "Lighting", details: "LED Panel Lights, Chandelier, Cove Lighting, Spot Lights", brand: "Philips, Havells" },
      { category: "Hardware", details: "Soft-Close Hinges, Telescopic Channels, Handles", brand: "Hettich, Hafele" },
    ],
    timeline: [
      { phase: "Design Phase", duration: "2 Weeks", description: "3D visualization, material selection, and client approvals" },
      { phase: "Civil Work", duration: "3 Weeks", description: "Structural modifications, electrical & plumbing updates" },
      { phase: "Execution", duration: "6 Weeks", description: "Furniture manufacturing, installation, painting & finishing" },
      { phase: "Final Handover", duration: "1 Week", description: "Quality inspection (146 checks), cleaning & handover" },
    ],
    beforeAfter: [
      {
        before: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80",
        after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      },
    ],
    testimonial: {
      name: "Mr. Rajesh Patel",
      rating: 5,
      text: "Dream Decor transformed our weekend villa into a paradise. The attention to detail, quality of materials, and timely delivery was exceptional. Their 146-point quality check gave us complete confidence. Highly recommended for anyone looking for premium interior design in Jamnagar!",
    },
    address: "Aarya Bhagwati Township, Jamnagar, Gujarat",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d70.0577!3d22.4707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDI4JzE0LjUiTiA3MMKwMDMnMjcuNyJF!5e0!3m2!1sen!2sin!4v1",
    metaTitle: "Aarya Bhagwati Villa Interior Design | Dream Decor Jamnagar",
    metaDescription: "Explore the luxury interior design of Aarya Bhagwati Weekend Villa by Dream Decor Furniture Jamnagar. 4500 sq ft modern contemporary villa with custom furniture.",
    keywords: ["interior designer Jamnagar", "luxury villa interior", "residential interior project", "modern interior design"],
  },
  {
    id: "2",
    slug: "presidential-suite-ins-valsura",
    title: "Presidential Suite – INS Valsura",
    tagline: "Prestigious Interior for Honorable President's Visit",
    location: "INS Valsura, Jamnagar",
    area: "2,200 sq ft",
    type: "Prestigious",
    completionYear: "2022",
    description: "Presidential Suite crafted for Honorable President Shri Ramnath Kovind's visit to INS Valsura.",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", alt: "presidential suite living area INS Valsura", category: "Living Room" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", alt: "luxury bedroom presidential suite Dream Decor", category: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", alt: "presidential suite dining area Jamnagar", category: "Other Spaces" },
      { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80", alt: "VIP suite interior design Gujarat", category: "Other Spaces" },
    ],
    overview: `The Presidential Suite at INS Valsura stands as Dream Decor Furniture's most prestigious interior design project. Commissioned for the visit of Honorable President Shri Ramnath Kovind, this project demanded the highest standards of luxury interior design and impeccable execution under a tight timeline.\n\nAs a trusted interior designer in Jamnagar, Dream Decor was entrusted with this prestigious residential interior project. The design concept embodied dignity, elegance, and modern Indian aesthetics. Every piece of furniture was custom-manufactured in our in-house factory with premium materials — solid teak wood, Italian leather upholstery, and hand-finished lacquer work. The modern interior design seamlessly blended comfort with ceremonial grandeur.`,
    materials: [
      { category: "Furniture", details: "Solid Teak, Italian Leather, Gold-Finish Accents", brand: "Dream Decor In-House" },
      { category: "Finishes", details: "High-Gloss PU, Gold Leaf Detailing, Silk Wallpaper", brand: "Premium Imported" },
      { category: "Flooring", details: "Italian Marble, Handcrafted Carpet", brand: "Imported" },
      { category: "Lighting", details: "Crystal Chandeliers, Recessed LEDs, Accent Lighting", brand: "Custom" },
      { category: "Hardware", details: "Brass Handles, Soft-Close European Fittings", brand: "Hafele" },
    ],
    timeline: [
      { phase: "Design Phase", duration: "1 Week", description: "Rapid design conceptualization with defense authority approvals" },
      { phase: "Civil Work", duration: "1 Week", description: "Fast-track civil modifications & electrical upgrades" },
      { phase: "Execution", duration: "2 Weeks", description: "Parallel manufacturing & installation with round-the-clock work" },
      { phase: "Final Handover", duration: "2 Days", description: "Presidential-grade inspection, security clearance & handover" },
    ],
    testimonial: {
      name: "Commanding Officer, INS Valsura",
      rating: 5,
      text: "Dream Decor delivered an extraordinary presidential suite under an extremely tight deadline. The quality and attention to detail was befitting the highest office of our nation. Exceptional work by the entire team.",
    },
    address: "INS Valsura, Indian Navy, Jamnagar, Gujarat",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d70.0577!3d22.4707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDI4JzE0LjUiTiA3MMKwMDMnMjcuNyJF!5e0!3m2!1sen!2sin!4v1",
    metaTitle: "Presidential Suite INS Valsura Interior | Dream Decor",
    metaDescription: "Presidential Suite interior design at INS Valsura by Dream Decor Furniture. Luxury interiors crafted for the Honorable President of India's visit.",
    keywords: ["presidential suite interior", "luxury interior design", "Dream Decor Jamnagar", "VIP interior design"],
  },
  {
    id: "3",
    slug: "vantara-reliance-500-bedrooms",
    title: "500 Bedroom Sets – Vantara Reliance",
    tagline: "Massive Commercial Turnkey Furniture Delivery",
    location: "Reliance, Jamnagar",
    area: "50,000+ sq ft",
    type: "Commercial",
    completionYear: "2023",
    description: "Delivered 500 bedroom sets for Vantara at Reliance Jamnagar – a massive turnkey execution milestone.",
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80", alt: "Vantara Reliance bedroom set Dream Decor", category: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", alt: "commercial bedroom furniture Jamnagar", category: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", alt: "mass furniture production Dream Decor", category: "Other Spaces" },
      { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", alt: "Reliance Jamnagar interior project", category: "Other Spaces" },
    ],
    overview: `The 500 Bedroom Sets project for Vantara at Reliance Jamnagar represents Dream Decor Furniture's capability in large-scale commercial interior design execution. This home interior design project at an industrial scale showcased our in-house manufacturing strength — delivering 500 identical, premium-quality bedroom sets within a demanding timeline.\n\nAs a premier interior designer in Jamnagar, Dream Decor leveraged its 25,000 sq ft manufacturing facility to execute this modern interior design project with military precision. Each bedroom set included a king-size bed, side tables, wardrobe, dresser, and study table — all manufactured with consistent quality using Gurjan plywood and Hettich hardware. This luxury interior design project for India's largest conglomerate stands as a testament to our scalability and reliability.`,
    materials: [
      { category: "Furniture", details: "Gurjan Plywood, Engineered Wood, Laminate Finish", brand: "Dream Decor In-House" },
      { category: "Finishes", details: "Anti-Scratch Laminate, Edge Banding", brand: "Merino, Century" },
      { category: "Flooring", details: "Vinyl Flooring (per Reliance specs)", brand: "As per client" },
      { category: "Lighting", details: "Integrated Bed Head LEDs, Wardrobe Lights", brand: "Philips" },
      { category: "Hardware", details: "Soft-Close Hinges, Heavy-Duty Channels", brand: "Hettich" },
    ],
    timeline: [
      { phase: "Design Phase", duration: "2 Weeks", description: "Prototype development, client approval, production planning" },
      { phase: "Manufacturing", duration: "12 Weeks", description: "Mass production of 500 sets in 25,000 sq ft facility" },
      { phase: "Quality Check", duration: "2 Weeks", description: "146-point quality inspection on each set" },
      { phase: "Delivery & Installation", duration: "4 Weeks", description: "Phased delivery and on-site assembly at Reliance campus" },
    ],
    testimonial: {
      name: "Reliance Project Manager",
      rating: 5,
      text: "Dream Decor delivered 500 bedroom sets with remarkable consistency in quality. Not a single unit was rejected in our quality audit. Their manufacturing capability and project management is truly world-class.",
    },
    address: "Vantara, Reliance Industries, Jamnagar, Gujarat",
    metaTitle: "500 Bedroom Sets for Reliance Vantara | Dream Decor",
    metaDescription: "Dream Decor delivered 500 premium bedroom sets for Vantara at Reliance Jamnagar. Large-scale commercial furniture manufacturing with zero rejection rate.",
    keywords: ["commercial interior design", "bulk furniture manufacturing", "Dream Decor Reliance", "turnkey furniture project"],
  },
  {
    id: "4",
    slug: "casa-lusso-vision-heights",
    title: "Casa Lusso @ Vision Heights",
    tagline: "Italian-Inspired Luxury Apartment Interiors",
    location: "Gujarat",
    area: "3,200 sq ft",
    type: "Residential",
    completionYear: "2023",
    description: "Luxury apartment interiors with Italian-inspired design and bespoke furniture manufacturing.",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", alt: "Italian luxury apartment interior Gujarat", category: "Living Room" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80", alt: "luxury bedroom Italian design Dream Decor", category: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", alt: "Italian modular kitchen design Gujarat", category: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", alt: "luxury living room Casa Lusso", category: "Living Room" },
    ],
    overview: `Casa Lusso at Vision Heights is a premium residential interior project that brings the essence of Italian luxury design to Gujarat. Dream Decor Furniture, as a sought-after interior designer, crafted this home interior design project with meticulous attention to European aesthetics while maintaining Indian sensibilities.\n\nThe modern interior design concept features imported Italian marble, custom-made furniture with Italian veneer finishes, and a sophisticated color palette of cream, gold, and midnight blue. Challenges included sourcing specific Italian materials and achieving flawless veneer matching across all rooms. The luxury interior design result is a home that feels like a curated art gallery — every corner tells a story of craftsmanship.`,
    materials: [
      { category: "Furniture", details: "Italian Veneer, Solid Wood Frame, Premium Upholstery", brand: "Dream Decor In-House" },
      { category: "Finishes", details: "Italian PU, Gold Leaf, Textured Wallpaper", brand: "ICA Italian Coatings" },
      { category: "Flooring", details: "Italian Statuario Marble, Wooden Flooring", brand: "Imported" },
      { category: "Lighting", details: "Murano Glass Pendants, LED Cove, Crystal Fixtures", brand: "Imported" },
      { category: "Hardware", details: "Italian Brass Handles, Blum Soft-Close Systems", brand: "Hafele, Blum" },
    ],
    timeline: [
      { phase: "Design Phase", duration: "3 Weeks", description: "Italian mood boards, 3D renders, material sourcing" },
      { phase: "Civil Work", duration: "4 Weeks", description: "Marble laying, false ceiling, electrical modifications" },
      { phase: "Execution", duration: "8 Weeks", description: "Custom furniture manufacturing, Italian finish application" },
      { phase: "Final Handover", duration: "1 Week", description: "146-point quality check, professional photography, handover" },
    ],
    testimonial: {
      name: "Mrs. Sharma",
      rating: 5,
      text: "Our apartment looks like it belongs in Milan! Dream Decor's Italian-inspired design is breathtaking. Every guest compliments the interiors. The quality of craftsmanship is unmatched in Gujarat.",
    },
    address: "Vision Heights, Gujarat",
    metaTitle: "Casa Lusso Luxury Apartment Interior | Dream Decor",
    metaDescription: "Italian-inspired luxury apartment interior at Vision Heights by Dream Decor. 3200 sq ft of premium residential design with imported materials and bespoke furniture.",
    keywords: ["luxury apartment interior", "Italian interior design", "residential interior project", "premium home design"],
  },
  {
    id: "5",
    slug: "shanti-harmony-residences",
    title: "Shanti Harmony Residences",
    tagline: "Complete Sample House Interior – Modern Elegance",
    location: "Gujarat",
    area: "2,800 sq ft",
    type: "Turnkey Sample",
    completionYear: "2022",
    description: "Complete sample house interior for Shanti Harmony residential project with modern finishes.",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", alt: "modern sample flat interior design Gujarat", category: "Living Room" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80", alt: "sample flat bedroom design Dream Decor", category: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", alt: "modular kitchen sample flat Gujarat", category: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80", alt: "kids room interior sample house", category: "Other Spaces" },
    ],
    overview: `Shanti Harmony Residences engaged Dream Decor Furniture to design and execute a complete sample house interior that would serve as the benchmark for their residential township. As an experienced interior designer, Dream Decor created a home interior design project that appeals to modern Indian families while maintaining aspirational luxury.\n\nThe modern interior design approach combined practical living with aesthetic excellence. Every room was designed to maximize space utility while showcasing premium materials and finishes. This luxury interior design sample house helped Shanti Harmony achieve a 40% increase in sales inquiries — a direct result of the immersive design experience Dream Decor created.`,
    materials: [
      { category: "Furniture", details: "Engineered Wood, MDF, Premium Laminate", brand: "Dream Decor In-House" },
      { category: "Finishes", details: "Matt & Gloss Laminate, Acrylic Shutters", brand: "Merino, Greenlam" },
      { category: "Flooring", details: "Double-Charged Vitrified Tiles, Wooden Laminate", brand: "Kajaria" },
      { category: "Lighting", details: "LED Downlights, Strip Lights, Statement Pendants", brand: "Philips, Syska" },
      { category: "Hardware", details: "Soft-Close Fittings, Basket Systems", brand: "Hettich" },
    ],
    timeline: [
      { phase: "Design Phase", duration: "2 Weeks", description: "Builder coordination, design development, approvals" },
      { phase: "Civil Work", duration: "2 Weeks", description: "False ceiling, tiling, electrical & plumbing" },
      { phase: "Execution", duration: "4 Weeks", description: "Furniture installation, painting, final touches" },
      { phase: "Final Handover", duration: "3 Days", description: "Staging, photography session, builder handover" },
    ],
    testimonial: {
      name: "Shanti Group Director",
      rating: 5,
      text: "Dream Decor's sample house design directly boosted our sales by 40%. The quality and design sense they brought was exceptional. Every flat buyer wanted the same interiors. Truly a game-changer for our project.",
    },
    address: "Shanti Harmony Township, Gujarat",
    metaTitle: "Shanti Harmony Sample House Interior | Dream Decor",
    metaDescription: "Complete sample house interior design for Shanti Harmony Residences by Dream Decor. Modern turnkey interiors that boosted sales inquiries by 40%.",
    keywords: ["sample house interior", "builder project interior", "turnkey interior design", "modern residential design"],
  },
  {
    id: "6",
    slug: "indian-ethnic-3bhk-design",
    title: "Indian Ethnic 3BHK Design",
    tagline: "Traditional Indian Craftsmanship Meets Modern Living",
    location: "Jamnagar, Gujarat",
    area: "1,800 sq ft",
    type: "Residential",
    completionYear: "2023",
    description: "Traditional Indian ethnic design transformed into a beautiful 3BHK interior with woodwork mastery.",
    heroImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80", alt: "Indian ethnic living room interior Jamnagar", category: "Living Room" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80", alt: "traditional Indian bedroom design Dream Decor", category: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", alt: "Indian style kitchen with modern amenities", category: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", alt: "pooja room interior design Jamnagar", category: "Other Spaces" },
    ],
    overview: `This Indian Ethnic 3BHK project in Jamnagar is a celebration of traditional Indian craftsmanship reimagined for modern living. Dream Decor Furniture, a passionate interior designer in Jamnagar, took on the challenge of creating a home interior design project that honors Indian heritage while delivering contemporary comfort.\n\nThe modern interior design approach here is unique — hand-carved wooden jali work, traditional brass accents, and rich textile upholstery blend seamlessly with modern modular systems and smart storage solutions. This luxury interior design project features a dedicated pooja room with intricate woodwork, a living room with Rajasthani-inspired jharokha windows, and bedrooms that combine ethnic charm with plush modern comfort.`,
    materials: [
      { category: "Furniture", details: "Solid Sheesham Wood, Hand-Carved Panels, Brass Inlay", brand: "Dream Decor In-House" },
      { category: "Finishes", details: "Natural Wood Polish, Traditional Lacquer, Brass Fittings", brand: "In-House Artisans" },
      { category: "Flooring", details: "Kota Stone, Indian Marble, Mosaic Tiles", brand: "Indian Quarried" },
      { category: "Lighting", details: "Brass Pendant Lamps, Diyas, LED Warm Lights", brand: "Artisan + Philips" },
      { category: "Hardware", details: "Antique Brass Handles, Traditional Latches", brand: "Custom Made" },
    ],
    timeline: [
      { phase: "Design Phase", duration: "3 Weeks", description: "Heritage research, artisan coordination, 3D visualization" },
      { phase: "Civil Work", duration: "3 Weeks", description: "Arch construction, stone flooring, electrical work" },
      { phase: "Execution", duration: "6 Weeks", description: "Hand-carving, furniture assembly, brass work installation" },
      { phase: "Final Handover", duration: "1 Week", description: "Artisan finishing touches, quality check, handover" },
    ],
    testimonial: {
      name: "Dr. Mehta Family",
      rating: 5,
      text: "Dream Decor captured the soul of Indian design in our home. The wooden jali work, brass accents, and pooja room are absolutely stunning. Every visitor feels the warmth and tradition. This is not just a house — it's our heritage made modern.",
    },
    address: "Jamnagar, Gujarat",
    metaTitle: "Indian Ethnic 3BHK Interior Design | Dream Decor Jamnagar",
    metaDescription: "Traditional Indian ethnic 3BHK interior design by Dream Decor Jamnagar. Hand-carved woodwork, brass accents, and modern comfort in 1800 sq ft.",
    keywords: ["Indian ethnic interior", "traditional interior design", "3BHK interior Jamnagar", "heritage home design"],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getRelatedProjects = (currentId: string, limit = 3): Project[] => {
  return projects.filter((p) => p.id !== currentId).slice(0, limit);
};
