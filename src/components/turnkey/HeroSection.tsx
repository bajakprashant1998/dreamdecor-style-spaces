
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-gray-900 text-white">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="container relative z-10 flex h-full flex-col justify-center px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl space-y-6"
                >
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
                        Accepting New Projects for 2026
                    </div>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Complete Interior & <br />
                        <span className="text-primary-foreground">Turnkey Solutions</span>
                    </h1>

                    <p className="max-w-2xl text-lg text-gray-200 sm:text-xl">
                        From concept to completion. We deliver end-to-end design, custom furniture manufacturing, and execution under one roof.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row pt-4">
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                            Get Free Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 text-lg px-8 py-6 h-auto">
                            Request Project Estimate
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-8 text-sm sm:grid-cols-3 sm:text-base">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <span>500+ Projects Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <span>15+ Years Experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                            <span>98% On-time Delivery</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
