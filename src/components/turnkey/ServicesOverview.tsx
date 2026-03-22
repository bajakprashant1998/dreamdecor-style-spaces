import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, IndianRupee, Users, Wrench, Lightbulb, CheckCircle2, Home, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const whyTurnkey = [
  { icon: <Sparkles className="h-8 w-8 text-primary" />, title: "Hassle-Free Experience", description: "One team handles everything from design to execution — zero coordination stress for you." },
  { icon: <Clock className="h-8 w-8 text-primary" />, title: "Timely Delivery", description: "Committed project timelines with weekly progress updates. 3BHK in just 30 days." },
  { icon: <IndianRupee className="h-8 w-8 text-primary" />, title: "Cost-Effective", description: "60% time savings & 30% cost savings with our factory-direct turnkey model." },
  { icon: <Users className="h-8 w-8 text-primary" />, title: "Expert & Personalized", description: "Dedicated design team crafting personalized solutions for your unique space and lifestyle." },
  { icon: <Wrench className="h-8 w-8 text-primary" />, title: "Seamless Execution", description: "From civil work to furniture installation — everything under one expert roof." },
  { icon: <Lightbulb className="h-8 w-8 text-primary" />, title: "Innovative & Modern", description: "Latest design trends with European-standard furniture and top-tier brand materials." },
  { icon: <CheckCircle2 className="h-8 w-8 text-primary" />, title: "Stress-Free Process", description: "146 quality checks, transparent pricing, and dedicated project managers." },
  { icon: <Home className="h-8 w-8 text-primary" />, title: "Move-In Ready", description: "Complete turnkey handover — just walk in with your bags and start living." },
  { icon: <Truck className="h-8 w-8 text-primary" />, title: "One-Stop Solution", description: "Design, manufacturing, civil work, electricals, furniture — all from Dream Decor." },
];

const ServicesOverview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Turnkey Interiors?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            60% Time Savings & 30% Cost Savings with Dream Decor Turnkey Solutions
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyTurnkey.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-start p-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
