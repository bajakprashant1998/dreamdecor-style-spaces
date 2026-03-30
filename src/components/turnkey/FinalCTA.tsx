import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(28_80%_52%/0.15),transparent_60%)]" />

      <div className="container px-4 md:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">Get Started</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display mb-6">
            Ready to Transform <br/>Your Space?
          </h2>
          <p className="text-lg text-white/60 mb-10">
            Book a free consultation with our design experts. 60% time savings & 30% cost savings with turnkey solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-10 py-6 h-auto rounded-full shadow-lg shadow-primary/30 w-full sm:w-auto"
              onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/15 text-base sm:text-lg px-10 py-6 h-auto rounded-full backdrop-blur-sm w-full sm:w-auto"
              asChild
            >
              <a href="https://wa.me/919978299988" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 text-white/50"
        >
          <a href="tel:+919978299988" className="flex items-center justify-center gap-2 hover:text-primary transition-colors text-sm">
            <Phone className="h-4 w-4" /> +91 99782 99988
          </a>
          <a href="mailto:dream_decor@rediffmail.com" className="flex items-center justify-center gap-2 hover:text-primary transition-colors text-sm">
            <Mail className="h-4 w-4" /> dream_decor@rediffmail.com
          </a>
          <span className="flex items-center justify-center gap-2 text-sm">
            <MapPin className="h-4 w-4" /> Opp. Town Hall, Jamnagar
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
