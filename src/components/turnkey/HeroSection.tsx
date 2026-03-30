import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const useCountUp = (end: number, duration = 2000, suffix = "") => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count.toLocaleString("en-IN") + suffix;
};

const HeroSection = () => {
  const projects = useCountUp(1100, 2000, "+");
  const customers = useCountUp(500000, 2500, "+");
  const products = useCountUp(100000, 2500, "+");

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden bg-foreground text-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="container relative z-10 flex min-h-[90vh] flex-col justify-center px-4 md:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Gujarat's No.1 Brand — Jamnagar · Porbandar · Bhavnagar
          </motion.div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-display">
            Turnkey Interior
            <br />
            <span className="bg-gradient-to-r from-primary to-orange-300 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>

          <p className="max-w-2xl text-base text-white/80 sm:text-lg md:text-xl leading-relaxed">
            <strong className="text-white">60% Time Savings & 30% Cost Savings</strong> — Complete interior solutions from concept to move-in ready handover with our in-house manufacturing unit.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-8 py-6 h-auto rounded-full shadow-lg shadow-primary/30"
              onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/15 text-base sm:text-lg px-8 py-6 h-auto rounded-full backdrop-blur-sm"
              asChild
            >
              <a href="tel:+919978299988">
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 max-w-3xl"
        >
          {[
            { value: products, label: "Products" },
            { value: projects, label: "Projects" },
            { value: customers, label: "Customers" },
            { value: "10 Yr", label: "Warranty" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown className="h-5 w-5 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
