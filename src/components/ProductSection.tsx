import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

interface Props {
  title: string;
  subtitle: string;
  filter?: string;
}

export default function ProductSection({ title, subtitle, filter }: Props) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      let query = supabase
        .from("products")
        .select("id, name, slug, price, original_price, images, material, badge, rating, review_count")
        .eq("is_published", true)
        .order("sort_order")
        .limit(8);

      if (filter === "featured") query = query.eq("is_featured", true);
      if (filter === "bestseller") query = query.eq("is_bestseller", true);
      if (filter === "new") query = query.eq("is_new", true);

      const { data } = await query;
      if (data) setItems(data.map((p: any) => ({ ...p, images: Array.isArray(p.images) ? p.images : [] })));
    };
    fetch();
  }, [filter]);

  if (items.length === 0) return null;

  return (
    <section className="py-10 md:py-24">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary">{subtitle}</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold mt-1.5 md:mt-2">{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {items.map((p, i) => {
            const img = p.images?.[0] || "/placeholder.svg";
            const discount = p.original_price ? Math.round(((p.original_price - p.price) / p.original_price) * 100) : null;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="group relative bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <Link to={`/product/${p.slug}`} className="block relative aspect-square overflow-hidden">
                    <img src={img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    {p.badge && (
                      <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-primary text-primary-foreground text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-md uppercase tracking-wider">
                        {p.badge}
                      </span>
                    )}
                    {discount && (
                      <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-destructive text-destructive-foreground text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-md">
                        -{discount}%
                      </span>
                    )}
                  </Link>
                  {/* Quick actions - hidden on mobile for cleaner look */}
                  <div className="hidden md:flex absolute top-14 right-3 flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md"><Heart className="h-4 w-4" /></Button>
                    <Button size="icon" className="h-8 w-8 rounded-full shadow-md"><ShoppingCart className="h-4 w-4" /></Button>
                  </div>
                  <div className="p-3 md:p-4 flex flex-col flex-1">
                    <p className="text-[9px] md:text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5 md:mb-1 truncate">{p.material}</p>
                    <Link to={`/product/${p.slug}`} className="flex-1">
                      <h3 className="font-display text-xs md:text-base font-semibold leading-snug hover:text-primary transition-colors line-clamp-2 min-h-[2.4em]">{p.name}</h3>
                    </Link>
                    <div className="flex items-center gap-0.5 mt-1.5 md:mt-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`h-2.5 w-2.5 md:h-3 md:w-3 ${j < Math.floor(p.rating || 0) ? "text-primary fill-primary" : "text-muted"}`} />
                      ))}
                      <span className="text-[9px] md:text-[10px] text-muted-foreground ml-0.5 md:ml-1">({p.review_count || 0})</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                      <span className="text-sm md:text-lg font-bold text-foreground">{formatPrice(p.price)}</span>
                      {p.original_price && <span className="text-[10px] md:text-sm text-muted-foreground line-through">{formatPrice(p.original_price)}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
