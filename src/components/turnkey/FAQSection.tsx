import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in Dream Decor's Turnkey Interior service?",
    answer: "Our turnkey service covers everything end-to-end: design consultation, 2D/3D visualization, material selection, procurement, custom furniture manufacturing, false ceiling, electrical, plumbing, painting, modular kitchen, wallpaper, glass work, cladding, and final installation. You get a move-in ready space.",
  },
  {
    question: "How long does a typical 3BHK project take?",
    answer: "With our in-house manufacturing and efficient processes, a standard 3BHK interior project takes 45 to 55 days. Our unique '3BHK in 30 Days' package is also available for rapid interior execution.",
  },
  {
    question: "What kind of warranty do you provide?",
    answer: "We provide up to 10 years warranty on hardware (Hettich, Hafele, etc.) and custom-manufactured furniture. Each brand used in your project comes with its own brand-specific warranty as per contract.",
  },
  {
    question: "How much can I save with turnkey interiors?",
    answer: "Our turnkey model offers 60% time savings and 30% cost savings compared to traditional contractors. Since we have our own factory, there are no middlemen — you get factory-direct pricing.",
  },
  {
    question: "Which brands and materials do you use?",
    answer: "We use top-tier brands like Hettich, Hafele, Ebco, ICA, Gurjan, Durian, Kurl-on, Saint-Gobain, Modiguard, and more. All furniture is European standard with 146 quality checks.",
  },
  {
    question: "Do you work in my city?",
    answer: "We have showrooms in Jamnagar, Porbandar, Bhavnagar, and Surat. Our interior services are available across all of Gujarat, with Ahmedabad and Rajkot coming soon.",
  },
  {
    question: "Can I customize furniture dimensions?",
    answer: "Absolutely. With our in-house manufacturing unit, every piece of furniture is custom-made to exact specifications. We work with leather, cloth, wood, steel, fiber, and innovative materials.",
  },
  {
    question: "What is your process for turnkey projects?",
    answer: "Our 8-step process: Brief → Concept → Design → Quotation → Agreement → Procurement → Project Management → Handover. You get weekly progress meetings and a complete building manual at handover.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-3xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about Dream Decor's turnkey services
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-gray-200">
              <AccordionTrigger className="text-left text-lg font-medium text-gray-900 hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
