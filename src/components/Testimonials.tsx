import { Star } from "lucide-react";
import { testimonials } from "@/data/products";
import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="py-10 md:py-24">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary">Reviews</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold mt-1.5 md:mt-2">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-4 md:p-6 border h-full flex flex-col"
            >
              <div className="flex gap-0.5 mb-3 md:mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-3.5 w-3.5 md:h-4 md:w-4 ${j < t.rating ? "text-primary fill-primary" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs md:text-sm font-bold text-primary shrink-0">
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{t.name}</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground truncate">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
