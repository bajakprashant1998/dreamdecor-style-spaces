import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Reliance Industries",
    project: "500 Bedroom Sets, Vantara – Jamnagar",
    content: "Dream Decor delivered 500 bedroom sets for our Vantara project with exceptional quality and on-time delivery. Their turnkey approach made the entire process seamless.",
    rating: 5,
    avatar: "RI",
  },
  {
    name: "INS Valsura",
    project: "Presidential Suite, Jamnagar",
    content: "The Presidential Suite crafted for the Honorable President's visit was world-class. Dream Decor's attention to detail and commitment to quality is unmatched.",
    rating: 5,
    avatar: "IN",
  },
  {
    name: "Aarya Bhagwati Group",
    project: "Weekend Villa, Jamnagar",
    content: "Our weekend villa was transformed with modern contemporary design. The in-house manufacturing ensured custom furniture that fits perfectly. Highly recommended!",
    rating: 5,
    avatar: "AB",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">Testimonials</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-display">
            Trusted By Gujarat's Best
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From Reliance to Indian Navy — our work speaks for itself
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10 rotate-180" />
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-foreground/80 italic leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.project}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
