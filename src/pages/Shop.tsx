import { useState } from "react";
import { products, categories, formatPrice } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const materials = ["Teak Wood", "Sheesham Wood", "Mango Wood", "Engineered Wood & Fabric", "Mesh & Metal", "Velvet & Wood"];
const styles = ["Traditional", "Modern", "Contemporary", "Rustic", "Ergonomic"];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [sortBy, setSortBy] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedMaterials.length && !selectedMaterials.includes(p.material)) return false;
    if (selectedStyles.length && !selectedStyles.includes(p.style)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return 0;
    return b.reviews - a.reviews;
  });

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((a) => a !== val) : [...arr, val]);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-display font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`block text-sm ${!selectedCategory ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`block text-sm ${selectedCategory === c.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              {c.name} ({c.count})
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-display font-semibold mb-3">Price Range</h4>
        <Slider
          min={0}
          max={150000}
          step={5000}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Material */}
      <div>
        <h4 className="font-display font-semibold mb-3">Material</h4>
        <div className="space-y-2">
          {materials.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={selectedMaterials.includes(m)}
                onCheckedChange={() => toggle(selectedMaterials, m, setSelectedMaterials)}
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <h4 className="font-display font-semibold mb-3">Style</h4>
        <div className="space-y-2">
          {styles.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={selectedStyles.includes(s)}
                onCheckedChange={() => toggle(selectedStyles, s, setSelectedStyles)}
              />
              {s}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border rounded-md px-3 py-2 bg-background"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <div className="hidden md:flex border rounded-md">
              <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="h-9 w-9" onClick={() => setView("grid")}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="h-9 w-9" onClick={() => setView("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterPanel />
          </aside>

          {/* Mobile filters drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowFilters(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-lg font-bold">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            <div className={`grid gap-4 md:gap-6 ${view === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
              {sorted.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {sorted.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No products found matching your filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategory(""); setSelectedMaterials([]); setSelectedStyles([]); setPriceRange([0, 150000]); }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
