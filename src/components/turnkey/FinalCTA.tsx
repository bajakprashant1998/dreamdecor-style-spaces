import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-10">
          Book a free consultation with Dream Decor's design experts. 60% time savings & 30% cost savings with our turnkey interior solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 h-auto w-full sm:w-auto">
            Book Free Consultation
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 text-lg px-8 py-6 h-auto w-full sm:w-auto">
            <MessageSquare className="mr-2 h-5 w-5" /> Chat on WhatsApp
          </Button>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-8 text-gray-400">
          <a href="tel:+919978299988" className="flex items-center justify-center gap-2 hover:text-white transition-colors">
            <Phone className="h-5 w-5" /> +91 99782 99988
          </a>
          <a href="mailto:dream_decor@rediffmail.com" className="flex items-center justify-center gap-2 hover:text-white transition-colors">
            <Mail className="h-5 w-5" /> dream_decor@rediffmail.com
          </a>
          <span className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5" /> Opp. Town Hall, Jamnagar
          </span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
