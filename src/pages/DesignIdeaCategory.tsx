import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  seo_content: string | null;
  cover_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

interface DesignIdea {
  id: string;
  title: string;
  slug: string;
  images: string[];
  room_dimension: string | null;
  style: string | null;
  is_trending: boolean | null;
  category_id: string;
}

interface AllCategory {
  id: string;
  name: string;
  slug: string;
}

export default function DesignIdeaCategory() {
  const { categorySlug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [ideas, setIdeas] = useState<DesignIdea[]>([]);
  const [allCategories, setAllCategories] = useState<AllCategory[]>([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [trendingIdeas, setTrendingIdeas] = useState<DesignIdea[]>([]);

  useEffect(() => {
    supabase.from("design_idea_categories").select("*").eq("is_published", true).order("sort_order")
      .then(({ data }) => { if (data) setAllCategories(data as unknown as AllCategory[]); });
  }, []);

  useEffect(() => {
    if (!categorySlug) return;
    supabase.from("design_idea_categories").select("*").eq("slug", categorySlug).single()
      .then(({ data }) => {
        if (data) {
          const cat = data as unknown as Category;
          setCategory(cat);
          // Fetch ideas for this category
          supabase.from("design_ideas").select("*").eq("category_id", cat.id).eq("is_published", true).order("sort_order")
            .then(({ data: ideas }) => {
              if (ideas) {
                const mapped = ideas.map((d: any) => ({ ...d, images: Array.isArray(d.images) ? d.images : [] }));
                setIdeas(mapped);
                setTrendingIdeas(mapped.filter((i: any) => i.is_trending));
              }
            });
        }
      });
  }, [categorySlug]);

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20 text-center text-muted-foreground">Loading...</div>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.meta_title || `${category.name} - Dream Decor`,
    description: category.meta_description || category.description,
    url: `https://dreamdecor-style-spaces.lovable.app/design-ideas/${category.slug}`,
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{category.meta_title || `${category.name} - Design Ideas | Dream Decor`}</title>
        <meta name="description" content={category.meta_description || category.description || ""} />
        <link rel="canonical" href={`https://dreamdecor-style-spaces.lovable.app/design-ideas/${category.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-muted/50 py-3">
          <div className="container flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/design-ideas" className="hover:text-primary">Design Ideas</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{category.name}</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b bg-background sticky top-16 md:top-20 z-40">
          <div className="container">
            <div className="flex gap-6 overflow-x-auto py-3 scrollbar-hide">
              {allCategories.map((c) => (
                <Link
                  key={c.id}
                  to={`/design-ideas/${c.slug}`}
                  className={`text-sm whitespace-nowrap pb-1 border-b-2 transition-colors ${
                    c.slug === categorySlug
                      ? "text-primary border-primary font-semibold"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <section className="container py-8 md:py-12">
          <p className="text-sm text-muted-foreground mb-2">
            Showing {ideas.length} Results for
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {category.name}
          </h1>
          {category.description && (
            <div className="max-w-3xl">
              <p className={`text-muted-foreground leading-relaxed ${!showFullDesc ? "line-clamp-3" : ""}`}>
                {category.seo_content || category.description}
              </p>
              {(category.seo_content || category.description || "").length > 200 && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-primary text-sm font-medium mt-2 flex items-center gap-1"
                >
                  {showFullDesc ? "Show Less" : "Read More"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFullDesc ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
          )}
        </section>

        {/* Trending Section */}
        {trendingIdeas.length > 0 && (
          <section className="bg-gradient-to-r from-secondary/30 to-primary/5 py-10">
            <div className="container">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  Top Trending {category.name}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Design ideas chosen by homeowners this month
              </p>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {trendingIdeas.slice(0, 6).map((idea) => (
                  <Link
                    key={idea.id}
                    to={`/design-ideas/${categorySlug}/designs/${idea.slug}`}
                    className="group min-w-[280px] md:min-w-[320px] bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {idea.images?.[0] && (
                      <img src={idea.images[0]} alt={idea.title} className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    )}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold line-clamp-2 text-foreground">{idea.title}</h3>
                      <Button variant="outline" size="sm" className="mt-3 w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                        <Phone className="h-3 w-3 mr-2" /> Book Free Consultation
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Design Ideas Grid */}
        <section className="container py-10 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <Link
                key={idea.id}
                to={`/design-ideas/${categorySlug}/designs/${idea.slug}`}
                className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {idea.images?.[0] ? (
                    <img src={idea.images[0]} alt={idea.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">No Image</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold line-clamp-2 text-foreground group-hover:text-primary transition-colors">{idea.title}</h3>
                  {idea.room_dimension && (
                    <p className="text-xs text-muted-foreground mt-1">Size: {idea.room_dimension}</p>
                  )}
                  <Button variant="outline" size="sm" className="mt-3 w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    <Phone className="h-3 w-3 mr-2" /> Book Free Consultation
                  </Button>
                </div>
              </Link>
            ))}
          </div>
          {ideas.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No design ideas in this category yet.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
