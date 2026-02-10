import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
  filter?: (p: typeof products[0]) => boolean;
}

export default function ProductSection({ title, subtitle, filter }: Props) {
  const items = filter ? products.filter(filter) : products;

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-widest uppercase text-primary">{subtitle}</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">{title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.slice(0, 8).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
