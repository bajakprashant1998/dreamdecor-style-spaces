import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const features = [
  { feature: "Manufacturing", us: "In-House Factory", others: "Outsourced" },
  { feature: "Cost Saving", us: "Save 30%", others: "Middlemen Markup" },
  { feature: "Time Saving", us: "Save 60%", others: "Delays Common" },
  { feature: "Customization", us: "100% Custom", others: "Limited" },
  { feature: "Move-In Ready", us: "45-55 Days", others: "90+ Days" },
  { feature: "Quality Checks", us: "146 Checks", others: "Minimal" },
  { feature: "Warranty", us: "10 Years", others: "1-2 Years" },
  { feature: "European Standard", us: true, others: false },
];

const FurnitureAdvantage = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">Advantage</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-display">
            The Dream Decor Advantage
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Only manufacturer & retailer under one roof in Gujarat
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Dream Decor In-House Manufacturing"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent flex items-end p-6 sm:p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 font-display">In-House Manufacturing</h3>
                <p className="text-white/70 text-sm">Leather, cloth, wood, steel, fiber & innovative materials</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-lg"
          >
            {/* Header */}
            <div className="grid grid-cols-3 mb-4 pb-4 border-b border-border">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Feature</div>
              <div className="text-center text-xs font-bold text-primary uppercase tracking-wider">Dream Decor</div>
              <div className="text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">Others</div>
            </div>

            {/* Rows */}
            <div className="space-y-0">
              {features.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 py-3.5 border-b border-border/50 last:border-0 text-sm transition-colors hover:bg-muted/50 rounded-lg px-2 -mx-2"
                >
                  <div className="font-medium text-foreground flex items-center">{row.feature}</div>
                  <div className="text-center flex items-center justify-center">
                    {typeof row.us === "boolean" ? (
                      row.us ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-destructive" />
                    ) : (
                      <span className="font-semibold text-primary text-xs sm:text-sm bg-primary/10 px-2 py-0.5 rounded-full">{row.us}</span>
                    )}
                  </div>
                  <div className="text-center flex items-center justify-center">
                    {typeof row.others === "boolean" ? (
                      row.others ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-destructive/60" />
                    ) : (
                      <span className="text-muted-foreground text-xs sm:text-sm">{row.others}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureAdvantage;
