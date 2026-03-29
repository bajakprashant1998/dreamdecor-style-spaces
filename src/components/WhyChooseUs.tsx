import { ShieldCheck, Clock, CheckSquare, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: IndianRupee,
    title: "Price Match Guarantee",
    description: "Factory-direct pricing with no middlemen. Best value for premium quality.",
  },
  {
    icon: Clock,
    title: "45–55 Days Move-In",
    description: "Complete turnkey interior execution in just 45–55 days, on time.",
  },
  {
    icon: ShieldCheck,
    title: "10 Year Warranty",
    description: "Industry-leading warranty on all custom furniture and woodwork.",
  },
  {
    icon: CheckSquare,
    title: "146 Quality Checks",
    description: "Rigorous quality checkpoints ensuring flawless finish and durability.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary">Our Promise</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold mt-1.5 md:mt-2">Why Choose Dream Decor</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-card/60 rounded-xl p-4 md:p-6 border border-border/50"
            >
              <div className="mx-auto mb-3 md:mb-4 h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 md:h-7 md:w-7 text-primary" />
              </div>
              <h3 className="font-display text-sm md:text-lg font-semibold mb-1 md:mb-2 leading-tight">{f.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
