import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Menu, X, MapPin, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.webp";
import { motion, AnimatePresence } from "framer-motion";

interface DesignCategory {
  id: string;
  name: string;
  slug: string;
}

const cities = ["Jamnagar", "Porbandar", "Bhavnagar", "Surat"];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [designCategories, setDesignCategories] = useState<DesignCategory[]>([]);
  const [designDropdownOpen, setDesignDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    supabase
      .from("design_idea_categories")
      .select("id, name, slug")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setDesignCategories(data as unknown as DesignCategory[]);
      });
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Turnkey Projects", path: "/turnkey-projects" },
    { name: "Shop", path: "/shop" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top bar */}
      <div className="bg-accent text-accent-foreground text-xs py-1.5 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-5">
            <a href="tel:02882661287" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="h-3 w-3" />
              0288 - 2661287 / 87582 99988
            </a>
            <a href="mailto:dream_decor@rediffmail.com" className="hover:opacity-80 transition-opacity">
              dream_decor@rediffmail.com
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent border-none text-accent-foreground text-xs cursor-pointer focus:outline-none"
            >
              {cities.map((c) => (
                <option key={c} value={c} className="text-foreground">{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg border-border/50"
            : "bg-background border-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo only */}
          <Link to="/" className="shrink-0">
            <img src={logo} alt="Dream Decor Furniture" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Design Ideas Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesignDropdownOpen(true)}
              onMouseLeave={() => setDesignDropdownOpen(false)}
            >
              <Link
                to="/design-ideas"
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith("/design-ideas")
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                Design Ideas
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${designDropdownOpen ? "rotate-180" : ""}`} />
              </Link>
              <AnimatePresence>
                {designDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-xl py-1.5 min-w-[240px] z-50"
                  >
                    <Link
                      to="/design-ideas"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/60 transition-colors font-medium"
                    >
                      All Design Ideas
                    </Link>
                    <div className="h-px bg-border mx-3 my-1" />
                    {designCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/design-ideas/${cat.slug}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-9 w-9 rounded-full hover:bg-muted"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted">
                <Heart className="h-[18px] w-[18px]" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted">
                <ShoppingCart className="h-[18px] w-[18px]" />
              </Button>
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/login" className="hidden md:block">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted">
                <User className="h-[18px] w-[18px]" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-full"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-background overflow-hidden"
            >
              <nav className="container py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Design Ideas in mobile */}
                <Link
                  to="/design-ideas"
                  className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                    location.pathname.startsWith("/design-ideas")
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  Design Ideas
                </Link>
                {designCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/design-ideas/${cat.slug}`}
                    className="text-sm py-2 pl-6 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
                <div className="flex items-center gap-2 pt-3 mt-2 border-t border-border text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent border-none text-xs cursor-pointer focus:outline-none"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
