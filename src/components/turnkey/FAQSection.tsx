
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is included in a Turnkey Interior Project?",
        answer: "Our turnkey service is end-to-end. It includes design consultation, 2D/3D visualization, material selection, procurement, custom furniture manufacturing, false ceiling, electrical, plumbing, painting, and final installation. You get a ready-to-move-in space.",
    },
    {
        question: "How long does a typical 3BHK project take?",
        answer: "A standard 3BHK interior project typically takes 45 to 60 days from the design approval stage. Timeline may vary based on the scope of work and design complexity.",
    },
    {
        question: "Do you provide a warranty for your work?",
        answer: "Yes, we provide up to 10 years of warranty on our custom-manufactured furniture and woodwork. We also offer a 1-year comprehensive service warranty on on-site execution work.",
    },
    {
        question: "Can I customize the furniture dimensions?",
        answer: "Absolutely. Since we have our own manufacturing facility, every piece of furniture is custom-made to mm-level precision to fit your specific floor plan and requirements.",
    },
    {
        question: "Do you charge a design fee?",
        answer: "We charge a nominal booking amount to start the design process, which is fully adjusted against your final project value. So, effectively, the design is complimentary with the project execution.",
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
                        Everything you need to know about our services
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
