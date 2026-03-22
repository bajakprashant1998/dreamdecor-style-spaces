import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectItem {
  id: string; slug: string; title: string; description: string | null;
  hero_image: string | null; location: string | null; type: string | null;
}

const PortfolioSection = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    supabase.from("projects").select("id, slug, title, description, hero_image, location, type")
      .eq("is_published", true).order("sort_order")
      .then(({ data }) => { if (data) setProjects(data as ProjectItem[]); });
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Project Achievements</h2>
            <p className="mt-4 text-lg text-muted-foreground">From presidential suites to 500-unit deliveries — trusted by India's biggest names</p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} to={`/project/${project.slug}`}>
              <Card className="overflow-hidden border-none shadow-md group h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={project.hero_image || ""} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="icon" className="rounded-full" tabIndex={-1}><Maximize2 className="h-5 w-5" /></Button>
                  </div>
                  <div className="absolute top-4 left-4"><Badge variant="secondary" className="bg-background/90 text-foreground hover:bg-background">{project.type}</Badge></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3"><MapPin className="h-4 w-4" /><span>{project.location}</span></div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary" tabIndex={-1}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        {projects.length === 0 && <p className="text-center text-muted-foreground py-8">No projects yet</p>}
      </div>
    </section>
  );
};

export default PortfolioSection;
