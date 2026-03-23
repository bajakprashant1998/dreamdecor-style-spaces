import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Star, Truck, ShieldCheck, Undo2, ChevronRight, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

export default function ProductDetail() {
  const { id } = useParams(); // slug-based
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      // Try by slug first, then by id
      let { data } = await supabase.from("products").select("*").eq("slug", id!).eq("is_published", true).maybeSingle();
      if (!data) {
        const res = await supabase.from("products").select("*").eq("id", id!).eq("is_published", true).maybeSingle();
        data = res.data;
      }
      if (data) {
        data.images = Array.isArray(data.images) ? data.images : [];
        setProduct(data);
        // Fetch related
        const { data: rel } = await supabase.from("products").select("id, name, slug, price, original_price, images, material, rating, review_count, badge").eq("is_published", true).eq("category", data.category).neq("id", data.id).limit(4);
        if (rel) setRelated(rel.map((r: any) => ({ ...r, images: Array.isArray(r.images) ? r.images : [] })));
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20"><div className="h-96 bg-secondary animate-pulse rounded-lg" /></div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl">Product not found</h1>
          <Link to="/shop"><Button className="mt-4">Back to Shop</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images: string[] = product.images || [];
  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : null;
  const categoryLabel = product.category || "Furniture";

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{product.meta_title || `${product.name} | Dream Decor Furniture`}</title>
        <meta name="description" content={product.meta_description || product.short_description || product.description?.slice(0, 160)} />
      </Helmet>
      <Header />
      <main className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary">{categoryLabel}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-3">
              {images.length > 0 ? (
                <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${i === activeImage ? "border-primary" : "border-transparent hover:border-muted-foreground/30"}`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {product.video_url && (
              <a href={product.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-4 text-sm text-primary hover:underline">
                <Play className="h-4 w-4" /> Watch Video Walkthrough
              </a>
            )}
          </div>

          {/* Details */}
          <div>
            {product.badge && (
              <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-3">{product.badge}</span>
            )}
            <h1 className="font-display text-2xl md:text-3xl font-bold">{product.name}</h1>
            {product.brand && <p className="text-sm text-muted-foreground mt-1">by {product.brand}</p>}

            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "text-primary fill-primary" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.review_count || 0} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.original_price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
                  <span className="text-sm font-semibold text-destructive">-{discount}% OFF</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>

            {product.short_description && <p className="text-muted-foreground mt-4">{product.short_description}</p>}
            {product.description && <p className="text-muted-foreground mt-2 leading-relaxed">{product.description}</p>}

            {/* Specs Table */}
            <div className="mt-6 border rounded-lg divide-y">
              {[
                product.material && ["Material", product.material],
                product.style && ["Style", product.style],
                product.color && ["Color", product.color],
                product.dimensions && ["Dimensions", product.dimensions],
                product.weight && ["Weight", product.weight],
                ["Category", categoryLabel],
                ["Availability", product.in_stock ? "In Stock" : "Out of Stock"],
                product.sku && ["SKU", product.sku],
                product.warranty && ["Warranty", product.warranty],
                product.delivery_time && ["Delivery", product.delivery_time],
              ].filter(Boolean).map(([k, v]) => (
                <div key={k as string} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>

            {/* Qty + actions */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border rounded-md">
                <button className="px-3 py-2 text-lg hover:bg-secondary" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="px-4 py-2 text-sm font-medium border-x">{qty}</span>
                <button className="px-3 py-2 text-lg hover:bg-secondary" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <Button className="flex-1 gap-2 rounded-none h-11" disabled={!product.in_stock}>
                <ShoppingCart className="h-4 w-4" /> {product.in_stock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0"><Heart className="h-5 w-5" /></Button>
            </div>

            {/* Pincode */}
            <div className="mt-6 border rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-2">Check Delivery Availability</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="flex-1" maxLength={6} />
                <Button variant="outline">Check</Button>
              </div>
            </div>

            {/* Return Policy */}
            {product.return_policy && (
              <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                <p className="text-xs text-muted-foreground"><strong>Return Policy:</strong> {product.return_policy}</p>
              </div>
            )}

            {/* Trust */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: Truck, label: "Free Delivery" },
                { icon: Undo2, label: "Easy Returns" },
                { icon: ShieldCheck, label: "Genuine Product" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon className="h-5 w-5 mx-auto text-primary mb-1" />
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* Brochure */}
            {product.brochure_url && (
              <a href={product.brochure_url} target="_blank" rel="noopener noreferrer" className="block mt-4 text-sm text-primary hover:underline">
                📄 Download Product Brochure
              </a>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => {
                const img = p.images?.[0] || "/placeholder.svg";
                return (
                  <Link to={`/product/${p.slug}`} key={p.id} className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img src={img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-muted-foreground uppercase">{p.material}</p>
                      <h3 className="font-display text-sm font-semibold line-clamp-2 mt-1">{p.name}</h3>
                      <p className="text-lg font-bold mt-2">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
