import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Grid3X3, List, X, Star, Heart, ShoppingCart } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface DBProduct {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  price: number;
  original_price: number | null;
  images: string[];
  material: string | null;
  style: string | null;
  badge: string | null;
  rating: number | null;
  review_count: number | null;
  short_description: string | null;
  in_stock: boolean | null;
  is_new: boolean | null;
}

const CATEGORIES = ["Living Room", "Bedroom", "Dining", "Office", "Kitchen", "Decor"];
const MATERIALS = ["Teak Wood", "Sheesham Wood", "Mango Wood", "Engineered Wood", "Metal", "Velvet", "Fabric", "Leather"];
const STYLES = ["Modern", "Traditional", "Contemporary", "Minimalist", "Rustic", "Industrial"];

const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;
const getDiscount = (price: number, orig?: number | null) => orig ? Math.round(((orig - price) / orig) * 100) : null;

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "";
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, slug, category, price, original_price, images, material, style, badge, rating, review_count, short_description, in_stock, is_new")
        .eq("is_published", true)
        .order("sort_order");
      if (data) {
        setProducts(data.map((p: any) => ({ ...p, images: Array.isArray(p.images) ? p.images : [] })));
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedMaterials.length && (!p.material || !selectedMaterials.includes(p.material))) return false;
    if (selectedStyles.length && (!p.style || !selectedStyles.includes(p.style))) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return (b.review_count || 0) - (a.review_count || 0);
  });

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((a) => a !== val) : [...arr, val]);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-display font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          <button onClick={() => setSelectedCategory("")} className={`block text-sm ${!selectedCategory ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>All Categories</button>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setSelectedCategory(c)} className={`block text-sm ${selectedCategory === c ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Price Range</h4>
        <Slider min={0} max={500000} step={5000} value={priceRange} onValueChange={setPriceRange} />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Material</h4>
        <div className="space-y-2">
          {MATERIALS.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={selectedMaterials.includes(m)} onCheckedChange={() => toggle(selectedMaterials, m, setSelectedMaterials)} />{m}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Style</h4>
        <div className="space-y-2">
          {STYLES.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={selectedStyles.includes(s)} onCheckedChange={() => toggle(selectedStyles, s, setSelectedStyles)} />{s}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Shop Premium Furniture Online | Dream Decor Furniture</title>
        <meta name="description" content="Browse our curated collection of premium Indian furniture. Handcrafted sofas, beds, dining sets & more. Free delivery across Gujarat." />
      </Helmet>
      <Header />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Shop Furniture</h1>
            <p className="text-sm text-muted-foreground mt-1">{sorted.length} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters
            </Button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border rounded-md px-3 py-2 bg-background">
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <div className="hidden md:flex border rounded-md">
              <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="h-9 w-9" onClick={() => setView("grid")}><Grid3X3 className="h-4 w-4" /></Button>
              <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="h-9 w-9" onClick={() => setView("list")}><List className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0"><FilterPanel /></aside>
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowFilters(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-lg font-bold">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></Button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="aspect-square bg-secondary animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className={`grid gap-4 md:gap-6 ${view === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
                {sorted.map((p) => {
                  const discount = getDiscount(p.price, p.original_price);
                  const mainImage = p.images?.[0] || "/placeholder.svg";
                  return (
                    <div key={p.id} className="group relative bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow duration-300">
                      <Link to={`/product/${p.slug}`} className="block relative aspect-square overflow-hidden">
                        <img src={mainImage} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        {p.badge && <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">{p.badge}</span>}
                        {discount && <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded-sm">-{discount}%</span>}
                      </Link>
                      <div className="absolute top-14 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md"><Heart className="h-4 w-4" /></Button>
                        <Button size="icon" className="h-8 w-8 rounded-full shadow-md"><ShoppingCart className="h-4 w-4" /></Button>
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">{p.material}</p>
                        <Link to={`/product/${p.slug}`}>
                          <h3 className="font-display text-sm md:text-base font-semibold leading-snug hover:text-primary transition-colors line-clamp-2">{p.name}</h3>
                        </Link>
                        <div className="flex items-center gap-1 mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(p.rating || 0) ? "text-primary fill-primary" : "text-muted"}`} />
                          ))}
                          <span className="text-[10px] text-muted-foreground ml-1">({p.review_count || 0})</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-lg font-bold text-foreground">{formatPrice(p.price)}</span>
                          {p.original_price && <span className="text-sm text-muted-foreground line-through">{formatPrice(p.original_price)}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {!loading && sorted.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No products found matching your filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategory(""); setSelectedMaterials([]); setSelectedStyles([]); setPriceRange([0, 500000]); }}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
