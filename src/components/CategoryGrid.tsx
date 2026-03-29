import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

export default function CategoryGrid() {
  return (
    <section className="py-10 md:py-24">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary">Browse</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold mt-1.5 md:mt-2">Shop by Category</h2>
          <p className="text-muted-foreground mt-2 md:mt-3 text-sm md:text-base max-w-lg mx-auto">
            Explore our curated collections for every room in your home
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat.id}`}
                className="group relative block aspect-[3/4] rounded-xl overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-primary-foreground">
                  <span className="text-xl md:text-2xl mb-0.5 md:mb-1 block">{cat.icon}</span>
                  <h3 className="font-display text-sm md:text-lg font-semibold leading-tight">{cat.name}</h3>
                  <span className="text-[10px] md:text-xs opacity-75">{cat.count} Products</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
