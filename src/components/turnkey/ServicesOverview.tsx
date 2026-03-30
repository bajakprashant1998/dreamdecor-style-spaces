import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, IndianRupee, Users, Wrench, Lightbulb, CheckCircle2, Home, Truck } from "lucide-react";

const whyTurnkey = [
  { icon: Sparkles, title: "Hassle-Free Experience", description: "One team handles everything from design to execution — zero coordination stress." },
  { icon: Clock, title: "Timely Delivery", description: "Committed timelines with weekly progress updates. 3BHK in just 30 days." },
  { icon: IndianRupee, title: "Cost-Effective", description: "60% time savings & 30% cost savings with our factory-direct turnkey model." },
  { icon: Users, title: "Expert & Personalized", description: "Dedicated design team crafting personalized solutions for your lifestyle." },
  { icon: Wrench, title: "Seamless Execution", description: "From civil work to furniture installation — everything under one expert roof." },
  { icon: Lightbulb, title: "Innovative & Modern", description: "Latest design trends with European-standard furniture and top-tier materials." },
  { icon: CheckCircle2, title: "146 Quality Checks", description: "Transparent pricing, rigorous quality control, and dedicated project managers." },
  { icon: Home, title: "Move-In Ready", description: "Complete turnkey handover — just walk in with your bags and start living." },
  { icon: Truck, title: "One-Stop Solution", description: "Design, manufacturing, civil, electricals, furniture — all from one team." },
];

const ServicesOverview = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">Why Turnkey?</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-display">
            Why Choose Turnkey Interiors?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Save 60% time & 30% costs with our end-to-end interior solutions
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {whyTurnkey.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
