import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const materials = {
  wood: [
    { name: "Teak Wood", img: "https://images.unsplash.com/photo-1571205086863-9d186c5cb8fb?auto=format&fit=crop&w=800&q=80" },
    { name: "Oak Veneer", img: "https://images.unsplash.com/photo-1616340877738-af1d98860f1e?auto=format&fit=crop&w=800&q=80" },
    { name: "Walnut Finish", img: "https://images.unsplash.com/photo-1533673614069-40678174ded4?auto=format&fit=crop&w=800&q=80" },
  ],
  fabric: [
    { name: "Velvet", img: "https://images.unsplash.com/photo-1628973116165-8b91e31b5984?auto=format&fit=crop&w=800&q=80" },
    { name: "Linen", img: "https://images.unsplash.com/photo-1686806372892-6a18b402bcef?auto=format&fit=crop&w=800&q=80" },
    { name: "Leather", img: "https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ],
  hardware: [
    { name: "Hettich", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Hafele", img: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Blum", img: "https://images.unsplash.com/photo-1585421892608-54b32a402283?auto=format&fit=crop&w=800&q=80" },
  ],
};

const tabLabels: Record<string, string> = { wood: "Woods & Veneers", fabric: "Fabrics & Upholstery", hardware: "Hardware & Fittings" };

const MaterialsSelection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">Materials</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-display">
            Premium Materials & Finishes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Only the best brands and materials for lasting quality
          </p>
        </motion.div>

        <Tabs defaultValue="wood" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-card p-1.5 rounded-full shadow-sm border border-border">
              {Object.entries(tabLabels).map(([key, label]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-full text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(materials).map(([key, items]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <span className="text-white font-bold text-lg">{item.name}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-center font-semibold text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MaterialsSelection;
