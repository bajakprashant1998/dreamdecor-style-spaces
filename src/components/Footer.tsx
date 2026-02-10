import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/logo.webp";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Dream Decor" className="h-12 w-auto brightness-200" />
              <div>
                <span className="font-display text-lg font-bold text-background block">Dream Decor</span>
                <span className="text-[10px] tracking-widest uppercase text-background/60">Furniture</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-background/60 mb-4">
              Crafting premium furniture for modern Indian homes since 2010. Quality, comfort & elegance in every piece.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Shop All", "Living Room", "Bedroom", "Dining", "Office", "Decor"].map((l) => (
                <li key={l}>
                  <Link to="/shop" className="hover:text-primary transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display text-base font-semibold text-background mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Contact Us", "Shipping Policy", "Return Policy", "Privacy Policy", "Terms & Conditions"].map((l) => (
                <li key={l}>
                  <Link to="#" className="hover:text-primary transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold text-background mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                <span>Above Chandra Motors, Opp. Townhall, Jamnagar</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>0288 - 2661287 / 87582 99988</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>dream_decor@rediffmail.com</span>
              </li>
            </ul>
            <div className="mt-4 text-xs text-background/40">
              <p>Serving: Jamnagar • Porbandar • Bhavnagar • Surat</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs text-background/40">
          <p>© {new Date().getFullYear()} Dream Decor Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
