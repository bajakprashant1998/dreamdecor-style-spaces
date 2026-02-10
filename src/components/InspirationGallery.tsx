import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
];

export default function InspirationGallery() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-widest uppercase text-primary">Inspiration</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Interior Ideas</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Get inspired by beautifully designed spaces featuring Dream Decor furniture
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`overflow-hidden rounded-lg ${i === 0 || i === 5 ? "row-span-2" : ""}`}
            >
              <img
                src={img}
                alt={`Interior inspiration ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
