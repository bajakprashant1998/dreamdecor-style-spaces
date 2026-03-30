import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.webp";

const quickLinks = [
  { label: "Shop All", path: "/shop" },
  { label: "Design Ideas", path: "/design-ideas" },
  { label: "Turnkey Projects", path: "/turnkey-projects" },
  { label: "Catalogues", path: "/catalogue" },
  { label: "Blog", path: "/blog" },
  { label: "About Us", path: "/about" },
];

const careLinks = [
  { label: "Contact Us", path: "/contact" },
  { label: "Shipping Policy", path: "#" },
  { label: "Return Policy", path: "#" },
  { label: "Privacy Policy", path: "#" },
  { label: "Terms & Conditions", path: "#" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 py-14 md:py-20 px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <img src={logo} alt="Dream Decor" className="h-11 md:h-14 w-auto brightness-200 group-hover:scale-105 transition-transform" />
            </Link>
            <p className="text-sm leading-relaxed text-background/50 mb-6 max-w-xs">
              Crafting premium interiors & furniture for modern Indian homes since 2010. Quality, comfort & elegance in every piece.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="h-9 w-9 rounded-xl bg-background/8 border border-background/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 md:mb-5">Explore</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-sm text-background/50 hover:text-primary hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 md:mb-5">Support</h4>
            <ul className="space-y-2.5">
              {careLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-sm text-background/50 hover:text-primary hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-4">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 md:mb-5">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-background/50">Above Chandra Motors, Opp. Town Hall, Jamnagar</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <a href="tel:02882661287" className="text-background/50 hover:text-primary transition-colors">
                  0288 - 2661287 / 87582 99988
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a href="mailto:dream_decor@rediffmail.com" className="text-background/50 hover:text-primary transition-colors break-all">
                  dream_decor@rediffmail.com
                </a>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Jamnagar", "Porbandar", "Bhavnagar", "Surat"].map((city) => (
                <span key={city} className="text-[11px] px-2.5 py-1 rounded-full bg-background/5 border border-background/10 text-background/40">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/8 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-background/30">
          <p>© {new Date().getFullYear()} Dream Decor. All rights reserved.</p>
          <p>Designed with passion in Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
}
