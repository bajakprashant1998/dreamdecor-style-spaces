import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[40vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80"
            alt="Dream Decor Workshop"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 container h-full flex items-center">
            <div className="text-primary-foreground">
              <h1 className="font-display text-4xl md:text-5xl font-bold">Our Story</h1>
              <p className="text-lg opacity-80 mt-2">Crafting dreams into furniture since 2010</p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold mb-4">Crafting Comfort, Building Trust</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dream Decor Furniture was born from a simple belief: every Indian home deserves furniture that combines traditional craftsmanship with modern design. Starting from our showroom in Jamnagar, we've grown to serve families across Gujarat and beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our skilled artisans use only the finest solid wood — teak, sheesham, and mango — sourced responsibly from trusted suppliers. Each piece is handcrafted with attention to detail that makes it not just furniture, but a family heirloom.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, from our showrooms in Jamnagar, Porbandar, Bhavnagar, and Surat, we continue our mission to furnish Indian homes with pieces that inspire comfort, elegance, and pride.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
                alt="Dream Decor showroom"
                className="rounded-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-secondary/50 py-16">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Award, value: "10+", label: "Years of Trust" },
              { icon: Users, value: "5000+", label: "Happy Families" },
              { icon: MapPin, value: "4", label: "Cities Served" },
              { icon: Heart, value: "500+", label: "Products" },
            ].map(({ icon: Icon, value, label }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-display text-3xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
