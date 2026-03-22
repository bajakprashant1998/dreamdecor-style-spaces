import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProjectBySlug, getRelatedProjects, type ProjectImage } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin, Maximize2, Calendar, Ruler, Building2, Star,
  ArrowRight, Play, Phone, Mail, Clock, ChevronLeft, X,
  ChevronRight,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", preferredDate: "", message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <Link to="/turnkey-projects">
              <Button>Back to Projects</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProjects = getRelatedProjects(project.id);
  const categories = ["All", ...Array.from(new Set(project.gallery.map((img) => img.category)))];
  const filteredGallery = activeCategory === "All"
    ? project.gallery
    : project.gallery.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Visit Scheduled!", description: "We'll contact you shortly to confirm your site visit." });
    setFormData({ name: "", phone: "", email: "", preferredDate: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>{project.metaTitle}</title>
        <meta name="description" content={project.metaDescription} />
        <meta name="keywords" content={project.keywords.join(", ")} />
      </Helmet>

      <div className="min-h-screen bg-background font-sans text-foreground">
        <Header />

        {/* 1. PROJECT HEADER */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container">
              <Link to="/turnkey-projects" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Projects
              </Link>
              <motion.h1 initial="hidden" animate="visible" variants={fadeIn}
                className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
                {project.title} — Interior Design
              </motion.h1>
              <p className="text-lg text-white/80 mb-6 font-light">{project.tagline}</p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" /> {project.location}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5">
                  <Ruler className="h-3.5 w-3.5 mr-1.5" /> {project.area}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5">
                  <Building2 className="h-3.5 w-3.5 mr-1.5" /> {project.type}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" /> {project.completionYear}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROJECT GALLERY */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl font-heading font-bold mb-2">Project Gallery</h2>
              <p className="text-muted-foreground mb-8">Explore every corner of this stunning project</p>
            </motion.div>
            <div className="flex gap-2 mb-8 flex-wrap">
              {categories.map((cat) => (
                <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm"
                  onClick={() => setActiveCategory(cat)}>
                  {cat}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredGallery.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(i)}>
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
            <button className="absolute top-4 right-4 text-white z-10" onClick={() => setLightboxOpen(false)}><X className="h-8 w-8" /></button>
            <button className="absolute left-4 text-white z-10" onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p - 1 + filteredGallery.length) % filteredGallery.length); }}>
              <ChevronLeft className="h-10 w-10" />
            </button>
            <img src={filteredGallery[lightboxIndex]?.url} alt={filteredGallery[lightboxIndex]?.alt}
              className="max-h-[85vh] max-w-[90vw] object-contain" onClick={(e) => e.stopPropagation()} />
            <button className="absolute right-4 text-white z-10" onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p + 1) % filteredGallery.length); }}>
              <ChevronRight className="h-10 w-10" />
            </button>
          </div>
        )}

        {/* 3. VIDEO WALKTHROUGH */}
        {project.videoUrl && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-3xl font-heading font-bold mb-2">Video Walkthrough</h2>
                <p className="text-muted-foreground mb-8">Take a virtual tour of this beautifully designed space</p>
              </motion.div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe src={project.videoUrl} title={`${project.title} walkthrough`}
                  className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
          </section>
        )}

        {/* 4. PROJECT OVERVIEW */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-4xl">
              <h2 className="text-3xl font-heading font-bold mb-6">Project Overview</h2>
              {project.overview.split("\n\n").map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-lg">{para}</p>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. MATERIALS & SPECIFICATIONS */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl font-heading font-bold mb-2">Materials & Specifications</h2>
              <p className="text-muted-foreground mb-8">Premium materials sourced from trusted brands</p>
            </motion.div>
            <div className="bg-card rounded-xl overflow-hidden shadow-sm border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-bold text-foreground">Category</TableHead>
                    <TableHead className="font-bold text-foreground">Details</TableHead>
                    <TableHead className="font-bold text-foreground">Brand</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.materials.map((mat, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-semibold">{mat.category}</TableCell>
                      <TableCell>{mat.details}</TableCell>
                      <TableCell><Badge variant="secondary">{mat.brand || "—"}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* 6. PROJECT TIMELINE */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl font-heading font-bold mb-2">Project Timeline</h2>
              <p className="text-muted-foreground mb-10">From concept to completion — our structured approach</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {project.timeline.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <Card className="relative overflow-hidden h-full border-t-4 border-t-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </div>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-primary">{step.duration}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{step.phase}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. BEFORE & AFTER */}
        {project.beforeAfter && project.beforeAfter.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-3xl font-heading font-bold mb-2">Before & After</h2>
                <p className="text-muted-foreground mb-8">See the stunning transformation</p>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-8">
                {project.beforeAfter.map((pair, i) => (
                  <React.Fragment key={i}>
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={pair.before} alt="Before renovation" className="w-full aspect-[4/3] object-cover" />
                      <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">Before</Badge>
                    </div>
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={pair.after} alt="After renovation by Dream Decor" className="w-full aspect-[4/3] object-cover" />
                      <Badge className="absolute top-4 left-4 bg-green-500 text-white">After</Badge>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8. CLIENT TESTIMONIAL */}
        {project.testimonial && (
          <section className="py-16 bg-background">
            <div className="container px-4 md:px-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-heading font-bold mb-8">Client Testimonial</h2>
                <Card className="p-8 md:p-12 border-primary/20">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: project.testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed mb-6">
                    "{project.testimonial.text}"
                  </blockquote>
                  <p className="font-bold text-lg">— {project.testimonial.name}</p>
                </Card>
              </motion.div>
            </div>
          </section>
        )}

        {/* 9. PROJECT LOCATION */}
        {project.address && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-3xl font-heading font-bold mb-2">Project Location</h2>
                <p className="text-muted-foreground mb-8 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> {project.address}
                </p>
              </motion.div>
              {project.mapEmbed && (
                <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
                  <iframe src={project.mapEmbed} className="w-full h-full border-0" allowFullScreen loading="lazy"
                    title={`Map of ${project.title}`} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* 10. LEAD FORM */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-3xl font-heading font-bold mb-4">Schedule a Site Visit</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Impressed by this project? Book a visit to our showroom or discuss your interior design requirements with our experts.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+919978299988" className="hover:text-primary">+91 99782 99988 / 0288-2661287</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:dream_decor@rediffmail.com" className="hover:text-primary">dream_decor@rediffmail.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Above Chandra Motors, Opp. Townhall, Jamnagar</span>
                  </div>
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <Card className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name" maxLength={100} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX" maxLength={15} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com" maxLength={255} />
                    </div>
                    <div>
                      <Label htmlFor="date">Preferred Visit Date</Label>
                      <Input id="date" type="date" value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project requirements..." maxLength={1000} rows={3} />
                    </div>
                    <Button type="submit" className="w-full" size="lg">Book Site Visit</Button>
                    <Button type="button" variant="outline" className="w-full" size="lg"
                      onClick={() => window.open(`https://wa.me/919978299988?text=${encodeURIComponent(`Hi, I'm interested in a project like "${project.title}". I'd like to schedule a consultation.`)}`)}>
                      Get Free Consultation on WhatsApp
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 11. RELATED PROJECTS */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl font-heading font-bold mb-2">Related Projects</h2>
              <p className="text-muted-foreground mb-8">Explore more of our interior design work</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((rp) => (
                <Link key={rp.id} to={`/project/${rp.slug}`}>
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={rp.heroImage} alt={rp.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-2">{rp.type}</Badge>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{rp.title}</h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {rp.location}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 12. FINAL CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="container px-4 md:px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Start Your Interior Project Today</h2>
              <p className="text-background/70 text-lg max-w-2xl mx-auto mb-10">
                Transform your space with Dream Decor Furniture — 60% time savings, 30% cost savings, and a 10-year warranty on every project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 h-auto">
                  Get Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 text-lg px-8 py-6 h-auto"
                  onClick={() => window.open("https://wa.me/919978299988")}>
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;
