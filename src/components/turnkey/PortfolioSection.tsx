import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    title: "Aarya Bhagwati Weekend Villa",
    location: "Jamnagar, Gujarat",
    type: "Residential",
    description: "Modern & Contemporary Design – A complete luxury villa interior with custom furniture and premium finishes.",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    title: "Presidential Suite – INS Valsura",
    location: "INS Valsura, Jamnagar",
    type: "Prestigious",
    description: "Presidential Suite crafted for Honorable President Shri Ramnath Kovind's visit to INS Valsura.",
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    title: "500 Bedroom Sets – Vantara Reliance",
    location: "Reliance, Jamnagar",
    type: "Commercial",
    description: "Delivered 500 bedroom sets for Vantara at Reliance Jamnagar – a massive turnkey execution milestone.",
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    title: "Casa Lusso @ Vision Heights",
    location: "Gujarat",
    type: "Residential",
    description: "Luxury apartment interiors with Italian-inspired design and bespoke furniture manufacturing.",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    title: "Shanti Harmony Residences",
    location: "Gujarat",
    type: "Turnkey Sample",
    description: "Complete sample house interior for Shanti Harmony residential project with modern finishes.",
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    title: "Indian Ethnic 3BHK Design",
    location: "Jamnagar, Gujarat",
    type: "Residential",
    description: "Traditional Indian ethnic design transformed into a beautiful 3BHK interior with woodwork mastery.",
  },
];

const PortfolioSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Project Achievements
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From presidential suites to 500-unit deliveries — trusted by India's biggest names
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
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">{project.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
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
