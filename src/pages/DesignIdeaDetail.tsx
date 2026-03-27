import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, ChevronDown, Share2, Heart, Phone, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ColourItem { label: string; value: string; }

interface DesignIdea {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  images: string[];
  layout: string | null;
  room_dimension: string | null;
  style: string | null;
  colours: ColourItem[];
  shutter_finish: ColourItem[];
  countertop_material: string | null;
  backsplash: string | null;
  storage_features: string | null;
  special_features: string | null;
  ideal_for: string | null;
  description: string | null;
  short_description: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
}

interface Category { id: string; name: string; slug: string; }

export default function DesignIdeaDetail() {
  const { categorySlug, designSlug } = useParams();
  const [idea, setIdea] = useState<DesignIdea | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [similarIdeas, setSimilarIdeas] = useState<DesignIdea[]>([]);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!designSlug) return;
    supabase.from("design_ideas").select("*").eq("slug", designSlug).eq("is_published", true).single()
      .then(({ data }) => {
        if (data) {
          const d = data as any;
          const mapped: DesignIdea = {
            ...d,
            images: Array.isArray(d.images) ? d.images : [],
            colours: Array.isArray(d.colours) ? d.colours : [],
            shutter_finish: Array.isArray(d.shutter_finish) ? d.shutter_finish : [],
            tags: Array.isArray(d.tags) ? d.tags : [],
          };
          setIdea(mapped);
          // Fetch category
          supabase.from("design_idea_categories").select("id, name, slug").eq("id", d.category_id).single()
            .then(({ data: cat }) => { if (cat) setCategory(cat as unknown as Category); });
          // Fetch similar
          supabase.from("design_ideas").select("*").eq("category_id", d.category_id).neq("id", d.id).eq("is_published", true).limit(6)
            .then(({ data: sim }) => {
              if (sim) setSimilarIdeas(sim.map((s: any) => ({ ...s, images: Array.isArray(s.images) ? s.images : [] })));
            });
        }
      });
  }, [designSlug]);

  if (!idea) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20 text-center text-muted-foreground">Loading...</div>
        <Footer />
      </div>
    );
  }

  const hasDetails = idea.layout || idea.room_dimension || idea.style || idea.colours.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: idea.title,
    description: idea.meta_description || idea.short_description || idea.description,
    image: idea.images[0],
    url: `https://dreamdecor-style-spaces.lovable.app/design-ideas/${categorySlug}/designs/${idea.slug}`,
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{idea.meta_title || `${idea.title} - Dream Decor`}</title>
        <meta name="description" content={idea.meta_description || idea.short_description || ""} />
        <link rel="canonical" href={`https://dreamdecor-style-spaces.lovable.app/design-ideas/${categorySlug}/designs/${idea.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-muted/50 py-3">
          <div className="container flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/design-ideas" className="hover:text-primary">Design Ideas</Link>
            <ChevronRight className="h-3 w-3" />
            {category && (
              <>
                <Link to={`/design-ideas/${category.slug}`} className="hover:text-primary">{category.name}</Link>
                <ChevronRight className="h-3 w-3" />
              </>
            )}
            <span className="text-foreground font-medium line-clamp-1">{idea.title}</span>
          </div>
        </div>

        {/* Main Content - Livspace-style layout */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
            {/* Left: Images */}
            <div>
              {idea.images.length > 0 && (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden aspect-[4/3] bg-muted">
                    <img
                      src={idea.images[selectedImage]}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {idea.images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {idea.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`shrink-0 h-20 w-28 rounded overflow-hidden border-2 transition-colors ${
                            i === selectedImage ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                          }`}
                        >
                          <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description below images */}
              {idea.description && (
                <div className="mt-8 prose prose-sm max-w-none text-muted-foreground">
                  <p>{idea.description}</p>
                </div>
              )}
            </div>

            {/* Right: Details Panel */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {/* Title & Actions */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-xl md:text-2xl font-display font-bold text-foreground leading-tight">
                    {idea.title}
                  </h1>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                {idea.tags && idea.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {idea.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Trust Markers */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Premium Quality", sub: "Guaranteed" },
                  { label: "10 Year", sub: "Warranty" },
                  { label: "Free", sub: "Consultation" },
                ].map((tm, i) => (
                  <div key={i} className="text-center p-3 bg-secondary/50 rounded-lg">
                    <p className="text-xs font-semibold text-foreground">{tm.label}</p>
                    <p className="text-[10px] text-muted-foreground">{tm.sub}</p>
                  </div>
                ))}
              </div>

              {/* Design Details */}
              {hasDetails && (
                <div className="bg-card rounded-lg border p-5 space-y-3">
                  <h2 className="font-display font-bold text-foreground">Design Details:</h2>
                  <div className={`space-y-2 ${!showFullDetails ? "max-h-[200px] overflow-hidden" : ""}`}>
                    {idea.layout && (
                      <p className="text-sm"><span className="font-semibold text-foreground">Layout:</span> <span className="text-muted-foreground">{idea.layout}</span></p>
                    )}
                    {idea.room_dimension && (
                      <p className="text-sm"><span className="font-semibold text-foreground">Room Dimension:</span> <span className="text-muted-foreground">{idea.room_dimension}</span></p>
                    )}
                    {idea.style && (
                      <p className="text-sm"><span className="font-semibold text-foreground">Style:</span> <span className="text-muted-foreground">{idea.style}</span></p>
                    )}
                    {idea.colours.length > 0 && (
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">Colour:</span>
                        {idea.colours.map((c, i) => (
                          <p key={i} className="text-muted-foreground ml-2">- {c.label}: {c.value}</p>
                        ))}
                      </div>
                    )}
                    {idea.shutter_finish.length > 0 && (
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">Shutter Finish:</span>
                        {idea.shutter_finish.map((c, i) => (
                          <p key={i} className="text-muted-foreground ml-2">- {c.label}: {c.value}</p>
                        ))}
                      </div>
                    )}
                    {idea.countertop_material && (
                      <p className="text-sm"><span className="font-semibold text-foreground">Countertop Material:</span> <span className="text-muted-foreground">{idea.countertop_material}</span></p>
                    )}
                    {idea.backsplash && (
                      <p className="text-sm"><span className="font-semibold text-foreground">Backsplash:</span> <span className="text-muted-foreground">{idea.backsplash}</span></p>
                    )}
                    {idea.storage_features && (
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">Storage Features:</span>
                        <p className="text-muted-foreground ml-2">{idea.storage_features}</p>
                      </div>
                    )}
                    {idea.special_features && (
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">Special Features:</span>
                        <p className="text-muted-foreground ml-2">{idea.special_features}</p>
                      </div>
                    )}
                    {idea.ideal_for && (
                      <p className="text-sm"><span className="font-semibold text-foreground">Ideal For:</span> <span className="text-muted-foreground">{idea.ideal_for}</span></p>
                    )}
                  </div>
                  <button
                    onClick={() => setShowFullDetails(!showFullDetails)}
                    className="text-primary text-sm font-medium flex items-center gap-1"
                  >
                    {showFullDetails ? "Show Less" : "Read More"}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showFullDetails ? "rotate-180" : ""}`} />
                  </button>
                </div>
              )}

              {/* CTA */}
              <div className="space-y-3">
                <Link to="/contact">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" /> Book Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Ideas */}
        {similarIdeas.length > 0 && (
          <section className="bg-secondary/20 py-10">
            <div className="container">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-foreground">Similar Ideas</h2>
                {category && (
                  <Link to={`/design-ideas/${category.slug}`} className="text-primary text-sm font-medium hover:underline">
                    View All &gt;
                  </Link>
                )}
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {similarIdeas.map((sim) => (
                  <Link
                    key={sim.id}
                    to={`/design-ideas/${categorySlug}/designs/${sim.slug}`}
                    className="group min-w-[280px] bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border"
                  >
                    {sim.images?.[0] && (
                      <img src={sim.images[0]} alt={sim.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    )}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold line-clamp-2 text-foreground">{sim.title}</h3>
                      {sim.room_dimension && (
                        <p className="text-xs text-muted-foreground mt-1">{sim.room_dimension}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
