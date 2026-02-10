import { Truck, ShieldCheck, Undo2, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "Premium Craftsmanship",
    description: "Handcrafted by skilled artisans using the finest solid wood and premium materials.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Free delivery across Gujarat & affordable shipping to 500+ cities across India.",
  },
  {
    icon: Undo2,
    title: "Easy Returns",
    description: "7-day hassle-free return policy. Not satisfied? We'll pick it up for free.",
  },
  {
    icon: ShieldCheck,
    title: "10+ Years of Trust",
    description: "Serving thousands of happy families from our stores in Jamnagar & beyond.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-widest uppercase text-primary">Our Promise</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Why Choose Dream Decor</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
