import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Clock } from "lucide-react";

const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment", baseRate: 1500 },
  { value: "villa", label: "Villa / Independent House", baseRate: 1800 },
  { value: "office", label: "Office Space", baseRate: 2000 },
];

const LOCATIONS = [
  { value: "Jamnagar", label: "Jamnagar", factor: 1.2 },
  { value: "Porbander", label: "Porbandar", factor: 1.0 },
  { value: "Bhavnagar", label: "Bhavnagar", factor: 1.1 },
  { value: "Surat", label: "Surat", factor: 0.95 },
];

const DESIGN_LEVELS = [
  { value: "standard", label: "Standard (Essential)", multiplier: 1 },
  { value: "premium", label: "Premium (High-End)", multiplier: 1.5 },
  { value: "luxury", label: "Luxury (Bespoke)", multiplier: 2.2 },
];

const CostEstimator = () => {
  const [area, setArea] = useState([1000]);
  const [propertyType, setPropertyType] = useState("apartment");
  const [location, setLocation] = useState("Jamnagar");
  const [designLevel, setDesignLevel] = useState("premium");
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const type = PROPERTY_TYPES.find((t) => t.value === propertyType) || PROPERTY_TYPES[0];
    const loc = LOCATIONS.find((l) => l.value === location) || LOCATIONS[0];
    const level = DESIGN_LEVELS.find((l) => l.value === designLevel) || DESIGN_LEVELS[1];
    const baseCost = area[0] * type.baseRate * loc.factor * level.multiplier;
    setEstimatedCost({ min: Math.round(baseCost * 0.85), max: Math.round(baseCost * 1.15) });
  }, [area, propertyType, location, designLevel]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumSignificantDigits: 3 }).format(amount);

  return (
    <section className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">Estimator</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display">
              Smart Project <br/>Cost Estimator
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Get an instant approximate budget. Adjust parameters to see real-time cost changes.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Calculator, title: "Transparent", desc: "No hidden costs" },
                { icon: TrendingDown, title: "Save 30%", desc: "Factory-direct pricing" },
                { icon: Clock, title: "Save 60%", desc: "Time savings" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{item.title}</div>
                    <div className="text-xs text-white/50">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-white/10 bg-white/5 text-white backdrop-blur-sm shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Calculate Your Budget</CardTitle>
                <CardDescription className="text-white/50">Enter your property details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-white/80">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="bg-white/10 border-white/10 text-white hover:bg-white/15">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-foreground border-white/10 text-white">
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-white/80">Area Size</Label>
                    <span className="text-primary font-bold text-sm">{area[0]} sq ft</span>
                  </div>
                  <Slider value={area} onValueChange={setArea} max={5000} min={500} step={50} className="py-4" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-white/80">Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="bg-white/10 border-white/10 text-white hover:bg-white/15">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-foreground border-white/10 text-white">
                        {LOCATIONS.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/80">Design Level</Label>
                    <Select value={designLevel} onValueChange={setDesignLevel}>
                      <SelectTrigger className="bg-white/10 border-white/10 text-white hover:bg-white/15">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-foreground border-white/10 text-white">
                        {DESIGN_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t border-white/10 pt-6">
                <div className="w-full text-center">
                  <p className="text-sm text-white/50">Estimated Cost Range</p>
                  <p className="text-3xl sm:text-4xl font-bold text-primary mt-1">
                    {formatCurrency(estimatedCost.min)} — {formatCurrency(estimatedCost.max)}
                  </p>
                </div>
                <Button
                  className="w-full rounded-full h-12 text-base"
                  size="lg"
                  onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get Detailed Quote
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
