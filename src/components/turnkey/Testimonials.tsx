
import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
    {
        name: "Aarav Patel",
        project: "3BHK Villa, Pune",
        content: "DreamDecor completely transformed our villa. The turnkey service was a lifesaver – we barely had to visit the site, and the quality of the furniture is outstanding.",
        rating: 5,
        avatar: "AP"
    },
    {
        name: "Meera Reddy",
        project: "Tech Office, Hyderabad",
        content: "We needed a modern office space delivered in 45 days. Their team not only met the deadline but exceeded our design expectations. Highly professional.",
        rating: 5,
        avatar: "MR"
    },
    {
        name: "Sandeep Gupta",
        project: "Penthouse, Mumbai",
        content: "The level of detail in the woodwork is amazing. I appreciate the transparency in pricing and the regular updates I received throughout the project.",
        rating: 5,
        avatar: "SG"
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        What Our Clients Say
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Real stories from happy homeowners and business owners
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
                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
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
