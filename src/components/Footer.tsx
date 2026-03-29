import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/logo.webp";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-10 md:py-16 px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Dream Decor" className="h-10 md:h-12 w-auto brightness-200" />
              <div>
                <span className="font-display text-base md:text-lg font-bold text-background block">Dream Decor</span>
                <span className="text-[9px] md:text-[10px] tracking-widest uppercase text-background/60">Furniture</span>
              </div>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-background/60 mb-4">
              Crafting premium furniture for modern Indian homes since 2010. Quality, comfort & elegance in every piece.
            </p>
            <div className="flex gap-2.5 md:gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm md:text-base font-semibold text-background mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {[
                { label: "Shop All", path: "/shop" },
                { label: "Design Ideas", path: "/design-ideas" },
                { label: "Turnkey Projects", path: "/turnkey-projects" },
                { label: "Blog", path: "/blog" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display text-sm md:text-base font-semibold text-background mb-3 md:mb-4">Customer Care</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {["About Us", "Contact Us", "Shipping Policy", "Return Policy", "Privacy Policy", "Terms & Conditions"].map((l) => (
                <li key={l}>
                  <Link to="#" className="hover:text-primary transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-sm md:text-base font-semibold text-background mb-3 md:mb-4">Contact Us</h4>
            <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm">
              <li className="flex gap-2.5 md:gap-3">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 mt-0.5 text-primary" />
                <span>Above Chandra Motors, Opp. Townhall, Jamnagar</span>
              </li>
              <li className="flex gap-2.5 md:gap-3">
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-primary" />
                <a href="tel:02882661287" className="hover:text-primary transition-colors">0288 - 2661287 / 87582 99988</a>
              </li>
              <li className="flex gap-2.5 md:gap-3">
                <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-primary" />
                <a href="mailto:dream_decor@rediffmail.com" className="hover:text-primary transition-colors break-all">dream_decor@rediffmail.com</a>
              </li>
            </ul>
            <div className="mt-3 md:mt-4 text-[10px] md:text-xs text-background/40">
              <p>Serving: Jamnagar • Porbandar • Bhavnagar • Surat</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 md:mt-10 pt-5 md:pt-6 text-center text-[10px] md:text-xs text-background/40">
          <p>© {new Date().getFullYear()} Dream Decor Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
