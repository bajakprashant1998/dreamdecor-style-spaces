import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, PenTool, Ruler, FileText, HandshakeIcon, ShoppingCart, HardHat, Key } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Brief", description: "We meet to discuss your requirements, scope, and timelines." },
  { icon: PenTool, title: "Concept", description: "Provisional layouts, concepts, and budgetary costing." },
  { icon: Ruler, title: "Design", description: "Complete design with detailed space plans and specifications." },
  { icon: FileText, title: "Quotation", description: "Quotes, bill of quantities, and our proposal." },
  { icon: HandshakeIcon, title: "Agreement", description: "Contract file with key documents, plans, and samples." },
  { icon: ShoppingCart, title: "Procurement", description: "Supplier contracts, compliance, and site setup." },
  { icon: HardHat, title: "Execution", description: "Site oversight with weekly meetings for quality and progress." },
  { icon: Key, title: "Handover", description: "Move-in ready with certificates, warranties, and manual." },
];

const ProcessTimeline = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">Process</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-display">
            Our 8-Step Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From brief to handover — a seamless turnkey experience
          </p>
        </motion.div>

        {/* Desktop: Horizontal flowing timeline */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6 mb-6">
            {steps.slice(0, 4).map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="absolute top-8 left-[calc(50%+2rem)] right-0 h-0.5 bg-gradient-to-r from-primary/40 to-border last:hidden" />
                    <span className="mt-4 text-xs font-bold text-primary uppercase tracking-wider">Step {i + 1}</span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center my-4">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              className="w-0.5 h-8 bg-primary/30"
            />
          </div>
          <div className="grid grid-cols-4 gap-6">
            {steps.slice(4).map((step, i) => {
              const Icon = step.icon;
              const idx = i + 4;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="mt-4 text-xs font-bold text-primary uppercase tracking-wider">Step {idx + 1}</span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex gap-5 items-start"
                >
                  <div className="relative z-10 flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="pt-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {i + 1}</span>
                    <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
