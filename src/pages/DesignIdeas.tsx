import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export default function DesignIdeas() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    supabase
      .from("design_idea_categories")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => { if (data) setCategories(data as unknown as Category[]); });
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Design Ideas - Dream Decor Furniture</title>
        <meta name="description" content="Explore stunning interior design ideas for every room. Kitchen, bedroom, living room designs and more by Dream Decor." />
        <link rel="canonical" href="https://dreamdecor-style-spaces.lovable.app/design-ideas" />
      </Helmet>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-muted/50 py-3">
          <div className="container flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Design Ideas</span>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary/50 to-background py-12 md:py-16">
          <div className="container text-center max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Interior Design Ideas
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Discover beautiful design inspirations for every room in your home. Browse through our curated collection of modern, contemporary, and classic designs.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/design-ideas/${cat.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-muted"
              >
                {cat.cover_image ? (
                  <img
                    src={cat.cover_image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-xl font-display font-bold text-background mb-1">
                    {cat.name}
                  </h2>
                  {cat.description && (
                    <p className="text-background/70 text-sm line-clamp-2">{cat.description}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-primary-foreground bg-primary px-3 py-1.5 rounded-full text-xs font-medium mt-3 group-hover:gap-2 transition-all">
                    Explore <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {categories.length === 0 && (
            <p className="text-center text-muted-foreground py-16">Design idea categories coming soon!</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
