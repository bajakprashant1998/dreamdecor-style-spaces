import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, MapPin, Heart, Target, Eye, Star, Trophy, Building2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const achievements = [
  "More Than 5,00,000+ Happy Customers in Gujarat",
  "More Than 4,000+ Furniture Users in Reliance Greens",
  "1st Time Award Night in Furniture Industry",
  "Organized 1st Indian International Furniture Fair 2017",
  "Jamnagar Half Marathon Sponsored by Dream Decor 2017",
  "More Than 50+ Product Launching Exhibitions in Gujarat",
  "Top 50 Brands Available Under 1 Roof",
  "Innovation in Home Décor Award by CM Vijay Rupani – 2019",
  "Most Reliable Furniture Brand Award by Gujarat Cabinet Minister – 2022",
];

const clients = [
  "Reliance", "NAYARA Energy", "TATA", "DIGJAM", "Indian Army", "SSB",
  "Larsen & Toubro", "Hero", "Suzuki", "Hyundai", "Honda",
  "Aarya Bhagwati", "Atlantic Shipping", "Decora Group",
];

const brandPartners = [
  "Spacewood", "Geeken", "Supreme", "Zuari", "StyleSpa", "Kurl-on",
  "Damro", "D'Boro", "Nilkamal", "Cello Furniture", "Durian",
  "Siocon", "Royal Decor", "Cabmax",
];

const services = [
  "Retail Furniture Products", "Interior Designing", "Carpentry Work",
  "Modular Kitchen", "False Ceiling", "Lighting", "Wallpaper",
  "Wall Painting", "Door & Window Work", "Water Proofing",
  "Railing", "Curtains", "China Mosaic", "Glass Work",
  "Cladding", "Appliances", "Furnishings",
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[45vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80"
            alt="Dream Decor Workshop"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 container h-full flex items-center">
            <div className="text-primary-foreground">
              <p className="text-sm font-medium tracking-widest uppercase mb-2 opacity-80">Gujarat's No.1 Brand</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold">Our Story</h1>
              <p className="text-lg opacity-80 mt-2">Transforming Houses into Homes Since 2006</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold mb-4">Transforming Houses into Homes!</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dream Décor Furniture was founded in 2006 and has grown to become one of the leading furniture brands of India. With multiple stores in Gujarat, we provide all kinds of interior and furniture solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Dream Decor Furniture, we convert homes, corporate offices, schools, theater rooms, hotels, cafes, club houses and restaurants into well-designed interiors. We provide stylish and quality products at affordable prices with great customer service. We also offer hassle-free furniture import services from the world's top brands.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Whether you're moving into your first apartment, setting up your brand new house or looking to give your spaces a makeover, you can rely on our huge range of products. <strong>Any home, any budget – that's our promise to you!</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Working with leather, cloth, wood, steel, fiber and innovative materials has made us the one and only furniture manufacturer and retailer with a complete in-house production unit.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
                alt="Dream Decor showroom"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Vision & Core Values */}
        <section className="bg-secondary/50 py-16">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="h-full border-none shadow-md bg-background">
                  <CardContent className="p-8 text-center">
                    <Eye className="h-10 w-10 mx-auto text-primary mb-4" />
                    <h3 className="font-display text-xl font-bold mb-3">Vision & Goal</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To be No.1 in Furniture Industry with 1800 outlets and 6000 dealers by 11th September 2035
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <Card className="h-full border-none shadow-md bg-background">
                  <CardContent className="p-8 text-center">
                    <Target className="h-10 w-10 mx-auto text-primary mb-4" />
                    <h3 className="font-display text-xl font-bold mb-3">Core Purpose</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To Honour Commitment for Style, Quality, Comfort and Cost for Better Living Standard
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <Card className="h-full border-none shadow-md bg-background">
                  <CardContent className="p-8 text-center">
                    <Heart className="h-10 w-10 mx-auto text-primary mb-4" />
                    <h3 className="font-display text-xl font-bold mb-3">Core Value</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To Act With Experience, Commitment, Happiness, Innovation, Continuous Upgradation & Improvement
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
              <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">Our Founder</p>
              <h2 className="font-display text-3xl font-bold mb-2">Mr. Bhaskar Rathod</h2>
              <p className="text-muted-foreground font-medium mb-4">Chairman & Managing Director, Dream Decor Group</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A visionary leader and the king of the furniture industry. Known as a creator and innovator, Mr. Bhaskar Rathod is passionate about bringing luxurious furniture to every home.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                He started his career at the age of 14 and with his hard work, dedication and self-confidence, today he is the Chairman and Managing Director of Dream Decor Group with showrooms in Jamnagar, Porbandar, and Bhavnagar.
              </p>
              <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                "A satisfied customer is the best business strategy of all."
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80"
                alt="Mr. Bhaskar Rathod - Founder"
                className="rounded-lg shadow-lg mx-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-foreground text-primary-foreground py-16">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "5,00,000+", label: "Happy Customers" },
              { icon: MapPin, value: "4", label: "Cities in Gujarat" },
              { icon: Award, value: "25+", label: "Years of Trust" },
              { icon: Building2, value: "1,00,000+", label: "Products" },
            ].map(({ icon: Icon, value, label }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-display text-3xl font-bold">{value}</p>
                <p className="text-sm opacity-70">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Services */}
        <section className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-widest uppercase text-primary">What We Do</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Our Services</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-secondary/50 rounded-lg p-4 text-center text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </section>

        {/* INS Valsura - Presidential Project */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-sm font-medium tracking-widest uppercase text-primary">Prestigious Achievement</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">INS Valsura Presidential Project</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Dream Decor was honored to serve the Supreme Authority of our Country at INS Valsura, Jamnagar
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Presidential Suite Room for Honorable President Shri Ramnath Kovind",
                "E-Launch Library at INS Valsura",
                "Kids Audio Visual Theater Room",
                "Kids Activity Room – Naval KG School",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-none shadow-md">
                    <CardContent className="p-6">
                      <Trophy className="h-8 w-8 text-primary mb-3" />
                      <p className="font-medium text-foreground">{item}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Achievements */}
        <section className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-widest uppercase text-primary">Recognition</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Brand Achievements</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30"
              >
                <Star className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Valuable Clients */}
        <section className="bg-foreground text-primary-foreground py-16">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-sm font-medium tracking-widest uppercase text-primary">Trusted By</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Our Valuable Clients</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {clients.map((client, i) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-6 py-3 text-sm font-medium"
                >
                  {client}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Associated Brands */}
        <section className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-widest uppercase text-primary">Since 1989</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Associated With Top Furniture Brands</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {brandPartners.map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-secondary/50 border border-border rounded-lg px-6 py-4 text-sm font-semibold text-foreground hover:border-primary/50 transition-colors"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Locations */}
        <section className="bg-secondary/50 py-16">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold mb-8">Our Presence</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {["Jamnagar", "Porbandar", "Bhavnagar", "Surat"].map((city) => (
                <div key={city} className="bg-background rounded-lg p-6 shadow-sm">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-lg font-bold">{city}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">
              <Briefcase className="inline h-4 w-4 mr-1" />
              Coming Soon: Ahmedabad & Rajkot | Service Available Across All Gujarat
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
