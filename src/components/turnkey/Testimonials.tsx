import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Reliance Industries",
    project: "500 Bedroom Sets, Vantara – Jamnagar",
    content: "Dream Decor delivered 500 bedroom sets for our Vantara project with exceptional quality and on-time delivery. Their turnkey approach made the entire process seamless.",
    rating: 5,
    avatar: "RI",
  },
  {
    name: "INS Valsura",
    project: "Presidential Suite, Jamnagar",
    content: "The Presidential Suite crafted for the Honorable President's visit was world-class. Dream Decor's attention to detail and commitment to quality is unmatched.",
    rating: 5,
    avatar: "IN",
  },
  {
    name: "Aarya Bhagwati Group",
    project: "Weekend Villa, Jamnagar",
    content: "Our weekend villa was transformed with modern contemporary design. The in-house manufacturing ensured custom furniture that fits perfectly. Highly recommended!",
    rating: 5,
    avatar: "AB",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted By Gujarat's Best
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From Reliance to Indian Navy — our work speaks for itself
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-none shadow-lg bg-gray-50/50">
              <CardContent className="pt-8 px-8 pb-8 relative">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 rotate-180" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.project}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
