
import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, PenTool, Calculator, Factory, Wrench, CheckSquare, Key } from "lucide-react";

const steps = [
    {
        icon: <ClipboardList />,
        title: "Consultation & Analysis",
        description: "We understand your requirements, lifestyle, and preferences.",
        time: "Week 1",
    },
    {
        icon: <PenTool />,
        title: "Space Planning & Design",
        description: "Detailed 2D layouts and 3D visualizations of your future space.",
        time: "Week 2-3",
    },
    {
        icon: <Calculator />,
        title: "Budgeting & Approval",
        description: "Transparent cost estimation and final material selection.",
        time: "Week 3",
    },
    {
        icon: <Factory />,
        title: "Manufacturing",
        description: "Custom furniture production in our state-of-the-art factory.",
        time: "Week 4-7",
    },
    {
        icon: <Wrench />,
        title: "Execution & Installation",
        description: "On-site civil work, electricals, and furniture assembly.",
        time: "Week 6-8",
    },
    {
        icon: <CheckSquare />,
        title: "Quality Inspection",
        description: "Rigorous quality checks to ensure everything is perfect.",
        time: "Week 9",
    },
    {
        icon: <Key />,
        title: "Final Handover",
        description: "Walkthrough and key handover of your dream space.",
        time: "Week 10",
    },
];

const ProcessTimeline = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container px-4 md:px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Our Turnkey Process
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        A seamless journey from concept to reality
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-gray-200 lg:block" />

                    <div className="space-y-12 lg:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`flex flex-col gap-8 lg:flex-row ${index % 2 === 0 ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                <div className="flex-1 lg:text-right">
                                    <div className={`hidden lg:block ${index % 2 === 0 ? "pr-12" : "pl-12 text-left"}`}>
                                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                            {step.time}
                                        </div>
                                        <h3 className="mt-2 text-xl font-bold text-gray-900">{step.title}</h3>
                                        <p className="mt-2 text-gray-600">{step.description}</p>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white z-10">
                                        {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className={`block lg:hidden text-center`}>
                                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
                                            {step.time}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                        <p className="mt-2 text-gray-600">{step.description}</p>
                                    </div>
                                    <div className={`hidden lg:block ${index % 2 === 0 ? "pl-12 text-left" : "pr-12 text-right"}`}>
                                        {/* Content for opposite side if needed, or empty */}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
