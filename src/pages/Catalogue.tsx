import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Eye, SlidersHorizontal, X, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface CatalogueItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  thumbnail_url: string | null;
  pdf_url: string | null;
  file_size: string | null;
  tag: string | null;
}

const categories = ["All", "Living Room", "Bedroom", "Office", "Kitchen"];
const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "az", label: "A–Z" },
];

const tagColors: Record<string, string> = {
  New: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  Trending: "bg-primary/10 text-primary border-primary/20",
  Popular: "bg-violet-500/10 text-violet-700 border-violet-200",
};

const ITEMS_PER_PAGE = 8;

export default function Catalogue() {
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchCatalogues = async () => {
      const { data } = await supabase
        .from("catalogues")
        .select("id, title, slug, category, description, thumbnail_url, pdf_url, file_size, tag")
        .eq("is_published", true)
        .order("sort_order");
      if (data) setItems(data as CatalogueItem[]);
      setLoading(false);
    };
    fetchCatalogues();
  }, []);

  const filtered = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          (i.description || "").toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((i) => i.category === activeCategory);
    }

    if (sortBy === "az") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "popular") result.sort((a, b) => (a.tag === "Popular" ? -1 : b.tag === "Popular" ? 1 : 0));

    return result;
  }, [items, search, activeCategory, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <Helmet>
        <title>Furniture Interiors Catalogue | Dream Decor</title>
        <meta name="description" content="Browse and download premium furniture interior catalogues. Living room, bedroom, office, and kitchen designs." />
      </Helmet>
      <Header />

      {/* Hero */}
      <section className="relative bg-accent pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-accent-foreground">
            Furniture Interiors Catalogue
          </h1>
          <p className="mt-3 text-accent-foreground/70 max-w-xl mx-auto">
            Browse our curated collection of premium interior design catalogues. Preview and download in one click.
          </p>

          <div className="mt-8 max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search catalogues by title or category..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="pl-12 h-12 rounded-full border-border bg-background text-base shadow-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Category</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Sort By</h3>
                <div className="space-y-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        sortBy === opt.value
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{filtered.length} catalogue{filtered.length !== 1 ? "s" : ""}</p>
            <Button variant="outline" size="sm" onClick={() => setFiltersOpen(!filtersOpen)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters <ChevronDown className={`h-3 w-3 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden -mt-4">
                <div className="bg-card border rounded-lg p-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary"}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Sort</h4>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((opt) => (
                        <button key={opt.value} onClick={() => setSortBy(opt.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${sortBy === opt.value ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary"}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          <div className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{filtered.length} catalogue{filtered.length !== 1 ? "s" : ""} found</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : visible.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No catalogues match your search.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {visible.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }}>
                      <div className="group relative bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={item.thumbnail_url || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                                <Eye className="h-6 w-6 text-foreground" />
                              </div>
                            </div>
                          </div>
                          {item.tag && (
                            <Badge className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider border ${tagColors[item.tag] || ""}`}>
                              {item.tag}
                            </Badge>
                          )}
                        </div>

                        <div className="p-5">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">{item.category}</span>
                          <h3 className="font-display text-base font-semibold mt-1 leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                          )}

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                            <span className="text-xs text-muted-foreground font-medium">PDF • {item.file_size || "—"}</span>
                            <Button
                              size="sm"
                              className="gap-2 rounded-full text-xs h-9 px-5"
                              onClick={() => {
                                if (item.pdf_url) window.open(item.pdf_url, "_blank");
                              }}
                              disabled={!item.pdf_url}
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-10">
                    <Button variant="outline" size="lg" onClick={() => setVisibleCount((p) => p + ITEMS_PER_PAGE)} className="rounded-full px-10">
                      Load More Catalogues
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
