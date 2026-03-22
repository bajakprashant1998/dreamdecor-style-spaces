import { ShieldCheck, Clock, CheckSquare, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: IndianRupee,
    title: "Price Match Guarantee",
    description: "Factory-direct pricing with no middlemen. We guarantee the best value for premium quality furniture.",
  },
  {
    icon: Clock,
    title: "45–55 Days Move-In",
    description: "Complete turnkey interior execution in just 45 to 55 days. Your dream space, delivered on time.",
  },
  {
    icon: ShieldCheck,
    title: "10 Year Warranty",
    description: "Industry-leading 10-year warranty on all custom-manufactured furniture and woodwork.",
  },
  {
    icon: CheckSquare,
    title: "146 Quality Checks",
    description: "Every project undergoes 146 rigorous quality checkpoints ensuring flawless finish and durability.",
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
