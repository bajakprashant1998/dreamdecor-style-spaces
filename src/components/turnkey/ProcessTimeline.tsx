import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, PenTool, Ruler, FileText, HandshakeIcon, ShoppingCart, HardHat, Key } from "lucide-react";

const steps = [
  {
    icon: <ClipboardList />,
    title: "Brief",
    description: "We meet with you to discuss your requirements, the scope of work and timelines.",
    time: "Step 1",
  },
  {
    icon: <PenTool />,
    title: "Concept",
    description: "We provide provisional layouts and concepts, along with a budgetary costing and our fee proposal.",
    time: "Step 2",
  },
  {
    icon: <Ruler />,
    title: "Design",
    description: "We complete the design, and detailed space plans with all the specifications.",
    time: "Step 3",
  },
  {
    icon: <FileText />,
    title: "Quotation",
    description: "We obtain quotes, compile a bill of quantities, and present our proposal.",
    time: "Step 4",
  },
  {
    icon: <HandshakeIcon />,
    title: "Agreement",
    description: "We compile a contract file with key documents, plans, and samples.",
    time: "Step 5",
  },
  {
    icon: <ShoppingCart />,
    title: "Procurement",
    description: "We handle procurement, supplier contracts, risk policies, OSHACT compliance, and site setup.",
    time: "Step 6",
  },
  {
    icon: <HardHat />,
    title: "Project Management",
    description: "We oversee all site work, ensuring timing, quality, and accuracy, with weekly meetings to review progress.",
    time: "Step 7",
  },
  {
    icon: <Key />,
    title: "Handover",
    description: "We arrange a handover, address snags, then provide certificates, warranties, and a building manual.",
    time: "Step 8",
  },
];

const ProcessTimeline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Turnkey Interior Process
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A seamless 8-step journey from brief to handover
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-gray-200 lg:block" />
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`flex flex-col gap-8 lg:flex-row ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
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
                  <div className="block lg:hidden text-center">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
                      {step.time}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>
                  <div className={`hidden lg:block ${index % 2 === 0 ? "pl-12 text-left" : "pr-12 text-right"}`} />
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
