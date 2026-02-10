import { useParams, Link } from "react-router-dom";
import { products, formatPrice, getDiscount } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Star, Truck, ShieldCheck, Undo2, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");

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

  const discount = getDiscount(product.price, product.originalPrice);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            {product.badge && (
              <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-2xl md:text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-semibold text-destructive">-{discount}% OFF</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>

            <p className="text-muted-foreground mt-6 leading-relaxed">{product.description}</p>

            {/* Specs */}
            <div className="mt-6 border rounded-lg divide-y">
              {[
                ["Material", product.material],
                ["Style", product.style],
                ["Category", product.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())],
                ["Availability", product.inStock ? "In Stock" : "Out of Stock"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-2.5 text-sm">
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
              <Button className="flex-1 gap-2 rounded-none h-11">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Pincode */}
            <div className="mt-6 border rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-2">Check Delivery Availability</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1"
                  maxLength={6}
                />
                <Button variant="outline">Check</Button>
              </div>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: Truck, label: "Free Delivery" },
                { icon: Undo2, label: "7-Day Returns" },
                { icon: ShieldCheck, label: "Genuine Product" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon className="h-5 w-5 mx-auto text-primary mb-1" />
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
