
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Modern Minimalist Villa",
        location: "Alibaug, Maharashtra",
        area: "4,500 Sq. Ft",
        type: "Residential",
        description: "A complete turnkey execution from shell to finish, featuring custom Italian furniture and smart home integration.",
    },
    {
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Tech Startup HQ",
        location: "Bangalore, Karnataka",
        area: "12,000 Sq. Ft",
        type: "Office",
        description: "Open-plan workspace designed for collaboration, with custom acoustic pods and modular workstations.",
    },
    {
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Luxury Boutique Hotel",
        location: "Udaipur, Rajasthan",
        area: "25,000 Sq. Ft",
        type: "Commercial",
        description: "Heritage-inspired interior renovation merging traditional aesthetics with modern luxury amenities.",
    },
];

const PortfolioSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Recent Masterpieces
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Explore our portfolio of delivered turnkey projects across residential and commercial sectors.
                        </p>
                    </div>
                    <Button variant="outline" className="hidden md:flex">
                        View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <Card key={index} className="overflow-hidden border-none shadow-md group">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Button variant="secondary" size="icon" className="rounded-full">
                                        <Maximize2 className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <Badge variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white">
                                        {project.type}
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>{project.location}</span>
                                    <span className="mx-1">•</span>
                                    <span>{project.area}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 line-clamp-2">
                                    {project.description}
                                </p>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Button variant="outline" className="w-full">
                        View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
