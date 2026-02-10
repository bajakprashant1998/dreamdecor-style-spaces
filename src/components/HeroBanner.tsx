import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Crafted for Comfort",
    subtitle: "Transform Your Living Space",
    description: "Premium handcrafted furniture for modern Indian homes. Discover timeless elegance.",
    cta: "Shop Collection",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80",
  },
  {
    title: "Solid Wood Heritage",
    subtitle: "Bedroom Collections",
    description: "Sheesham & teak wood beds built to last generations. Experience true craftsmanship.",
    cta: "Explore Bedrooms",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=80",
  },
  {
    title: "Dine in Style",
    subtitle: "New Dining Range",
    description: "Gather around beautifully crafted dining sets that bring families together.",
    cta: "View Dining Sets",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1400&q=80",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-primary-foreground"
          >
            <span className="text-sm md:text-base font-medium tracking-widest uppercase text-primary">
              {slide.subtitle}
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mt-2 mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-base md:text-lg opacity-90 mb-8 max-w-md">
              {slide.description}
            </p>
            <Button size="lg" className="rounded-none px-8 text-base font-semibold">
              {slide.cta}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3">
        <button
          onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
          className="h-10 w-10 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center hover:bg-primary-foreground/40 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-primary-foreground" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-8 bg-primary" : "w-2 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent((p) => (p + 1) % slides.length)}
          className="h-10 w-10 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center hover:bg-primary-foreground/40 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-primary-foreground" />
        </button>
      </div>
    </section>
  );
}
