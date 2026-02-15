
import React from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, ShoppingBag, Building2, Sofa, Hammer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
    {
        icon: <Home className="h-8 w-8 text-primary" />,
        title: "Residential Interiors",
        description: "Complete home transformation including living, dining, bedrooms, and modular kitchens.",
    },
    {
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        title: "Office Interiors",
        description: "Ergonomic and modern workspace designs that enhance productivity and brand image.",
    },
    {
        icon: <ShoppingBag className="h-8 w-8 text-primary" />,
        title: "Retail & Showroom",
        description: "Captivating retail environments designed to maximize customer engagement and sales.",
    },
    {
        icon: <Building2 className="h-8 w-8 text-primary" />,
        title: "Commercial Spaces",
        description: "Turnkey solutions for hotels, restaurants, and other commercial establishments.",
    },
    {
        icon: <Sofa className="h-8 w-8 text-primary" />,
        title: "Custom Furniture",
        description: "Bespoke furniture manufacturing tailored to your specific style and dimensions.",
    },
    {
        icon: <Hammer className="h-8 w-8 text-primary" />,
        title: "Renovation & Remodeling",
        description: "Give your existing space a fresh new look with our structural renovation services.",
    },
];

const ServicesOverview = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Our Turnkey Services
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Comprehensive interior solutions tailored to your unique needs
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-none shadow-sm transition-shadow hover:shadow-md">
                                <CardContent className="flex flex-col items-start p-6">
                                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                                        {service.icon}
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {service.description}
                                    </p>
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
