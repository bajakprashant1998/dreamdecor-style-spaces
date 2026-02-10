import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/data/products";

export default function Checkout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <div className="border rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Shipping Address</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>First Name</Label><Input placeholder="First name" className="mt-1" /></div>
                <div><Label>Last Name</Label><Input placeholder="Last name" className="mt-1" /></div>
                <div className="sm:col-span-2"><Label>Address</Label><Input placeholder="Street address" className="mt-1" /></div>
                <div><Label>City</Label>
                  <select className="mt-1 w-full border rounded-md h-10 px-3 text-sm bg-background">
                    <option>Jamnagar</option><option>Porbandar</option><option>Bhavnagar</option><option>Surat</option><option>Other</option>
                  </select>
                </div>
                <div><Label>Pincode</Label><Input placeholder="Pincode" maxLength={6} className="mt-1" /></div>
                <div><Label>Phone</Label><Input placeholder="Phone number" className="mt-1" /></div>
                <div><Label>Email</Label><Input type="email" placeholder="Email" className="mt-1" /></div>
              </div>
            </div>

            {/* Payment */}
            <div className="border rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                {["Cash on Delivery (COD)", "UPI / Google Pay / PhonePe", "Credit / Debit Card", "Net Banking"].map((m, i) => (
                  <label key={m} className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="payment" defaultChecked={i === 0} className="accent-primary" />
                    <span className="text-sm font-medium">{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="border rounded-lg p-6 h-fit">
            <h3 className="font-display text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(108998)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>FREE</span></div>
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span><span>{formatPrice(108998)}</span>
              </div>
            </div>
            <Button className="w-full mt-6 rounded-none h-11">Place Order</Button>
            <p className="text-[10px] text-muted-foreground text-center mt-3">
              By placing this order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
