import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, formatPrice, getDiscount } from "@/data/products";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded-sm">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Quick actions */}
      <div className="absolute top-14 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md">
          <Heart className="h-4 w-4" />
        </Button>
        <Button size="icon" className="h-8 w-8 rounded-full shadow-md">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {product.material}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-sm md:text-base font-semibold leading-snug hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted"}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
