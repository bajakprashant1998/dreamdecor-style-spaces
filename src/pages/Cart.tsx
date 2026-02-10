import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { products, formatPrice } from "@/data/products";
import { useState } from "react";

interface CartItem {
  product: typeof products[0];
  qty: number;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([
    { product: products[0], qty: 1 },
    { product: products[4], qty: 2 },
  ]);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal > 50000 ? 0 : 2999;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/shop"><Button>Continue Shopping</Button></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 border rounded-lg p-4">
                  <img src={product.image} alt={product.name} className="h-24 w-24 rounded object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.id}`} className="font-display font-semibold hover:text-primary line-clamp-1">{product.name}</Link>
                    <p className="text-xs text-muted-foreground mt-1">{product.material}</p>
                    <p className="font-bold mt-2">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => remove(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center border rounded-md">
                      <button className="px-2 py-1 hover:bg-secondary" onClick={() => updateQty(product.id, -1)}><Minus className="h-3 w-3" /></button>
                      <span className="px-3 py-1 text-sm border-x">{qty}</span>
                      <button className="px-2 py-1 hover:bg-secondary" onClick={() => updateQty(product.id, 1)}><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-6 h-fit">
              <h3 className="font-display text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
                <div className="border-t pt-3 flex justify-between font-bold text-base">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link to="/checkout">
                <Button className="w-full mt-6 rounded-none h-11">Proceed to Checkout</Button>
              </Link>
              <Link to="/shop" className="block text-center text-sm text-primary mt-3 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
