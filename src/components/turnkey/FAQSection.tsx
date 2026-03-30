import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { question: "What is included in Dream Decor's Turnkey Interior service?", answer: "Our turnkey service covers everything end-to-end: design consultation, 2D/3D visualization, material selection, procurement, custom furniture manufacturing, false ceiling, electrical, plumbing, painting, modular kitchen, wallpaper, glass work, cladding, and final installation. You get a move-in ready space." },
  { question: "How long does a typical 3BHK project take?", answer: "With our in-house manufacturing, a standard 3BHK interior project takes 45 to 55 days. Our unique '3BHK in 30 Days' package is also available for rapid execution." },
  { question: "What kind of warranty do you provide?", answer: "We provide up to 10 years warranty on hardware (Hettich, Hafele, etc.) and custom-manufactured furniture. Each brand comes with its own brand-specific warranty." },
  { question: "How much can I save with turnkey interiors?", answer: "Our turnkey model offers 60% time savings and 30% cost savings compared to traditional contractors. No middlemen — factory-direct pricing." },
  { question: "Which brands and materials do you use?", answer: "Top-tier brands like Hettich, Hafele, Ebco, ICA, Gurjan, Durian, Kurl-on, Saint-Gobain, Modiguard, and more. All European standard with 146 quality checks." },
  { question: "Do you work in my city?", answer: "We have showrooms in Jamnagar, Porbandar, Bhavnagar, and Surat. Services available across Gujarat, with Ahmedabad and Rajkot coming soon." },
  { question: "Can I customize furniture dimensions?", answer: "Absolutely. Every piece is custom-made to exact specifications. We work with leather, cloth, wood, steel, fiber, and innovative materials." },
  { question: "What is your process for turnkey projects?", answer: "Our 8-step process: Brief → Concept → Design → Quotation → Agreement → Procurement → Project Management → Handover. Weekly progress meetings and complete building manual at handover." },
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container max-w-3xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">FAQ</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-display">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything about Dream Decor's turnkey services
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border border-border rounded-xl px-5 bg-card shadow-sm data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
