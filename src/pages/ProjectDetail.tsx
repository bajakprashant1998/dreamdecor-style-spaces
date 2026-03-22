import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin, Maximize2, Calendar, Ruler, Building2, Star,
  ArrowRight, Phone, Mail, Clock, ChevronLeft, X, ChevronRight,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface ProjectData {
  id: string; slug: string; title: string; tagline: string | null;
  location: string | null; area: string | null; type: string | null;
  completion_year: string | null; description: string | null;
  hero_image: string | null; gallery: any; video_url: string | null;
  overview: string | null; materials: any; timeline: any;
  before_after: any; testimonial: any; address: string | null;
  map_embed: string | null; meta_title: string | null;
  meta_description: string | null; keywords: string[] | null;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [related, setRelated] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", preferredDate: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    const load = async () => {
      setLoading(true);
      const { data } = await supabase.from("projects").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
      setProject(data as ProjectData | null);
      if (data) {
        const { data: rel } = await supabase.from("projects").select("*").eq("is_published", true).neq("id", data.id).limit(3);
        setRelated((rel || []) as ProjectData[]);
      }
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) return <div className="min-h-screen"><Header /><div className="flex items-center justify-center py-20">Loading...</div><Footer /></div>;

  if (!project) return (
    <div className="min-h-screen flex flex-col"><Header />
      <div className="flex-1 flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Project Not Found</h1><Link to="/turnkey-projects"><Button>Back to Projects</Button></Link></div></div>
      <Footer /></div>
  );

  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const materials = Array.isArray(project.materials) ? project.materials : [];
  const timeline = Array.isArray(project.timeline) ? project.timeline : [];
  const beforeAfter = Array.isArray(project.before_after) ? project.before_after : [];
  const testimonial = project.testimonial && typeof project.testimonial === "object" ? project.testimonial : null;

  const categories = ["All", ...Array.from(new Set(gallery.map((img: any) => img.category).filter(Boolean)))];
  const filteredGallery = activeCategory === "All" ? gallery : gallery.filter((img: any) => img.category === activeCategory);

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      name: formData.name, phone: formData.phone, email: formData.email || null,
      preferred_date: formData.preferredDate || null, message: formData.message || null,
      source: "project_page", project_reference: project.title,
    });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Visit Scheduled!", description: "We'll contact you shortly." }); setFormData({ name: "", phone: "", email: "", preferredDate: "", message: "" }); }
    setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{project.meta_title || `${project.title} — Interior Design`}</title>
        <meta name="description" content={project.meta_description || project.description || ""} />
        {project.keywords && <meta name="keywords" content={project.keywords.join(", ")} />}
      </Helmet>
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Header />

        {/* 1. HEADER */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img src={project.hero_image || ""} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container">
              <Link to="/turnkey-projects" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm"><ChevronLeft className="h-4 w-4 mr-1" /> Back to Projects</Link>
              <motion.h1 initial="hidden" animate="visible" variants={fadeIn} className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">{project.title} — Interior Design</motion.h1>
              <p className="text-lg text-white/80 mb-6 font-light">{project.tagline}</p>
              <div className="flex flex-wrap gap-3">
                {project.location && <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5"><MapPin className="h-3.5 w-3.5 mr-1.5" /> {project.location}</Badge>}
                {project.area && <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5"><Ruler className="h-3.5 w-3.5 mr-1.5" /> {project.area}</Badge>}
                {project.type && <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5"><Building2 className="h-3.5 w-3.5 mr-1.5" /> {project.type}</Badge>}
                {project.completion_year && <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5"><Calendar className="h-3.5 w-3.5 mr-1.5" /> {project.completion_year}</Badge>}
              </div>
            </div>
          </div>
        </section>

        {/* 2. GALLERY */}
        {gallery.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-heading font-bold mb-2">Project Gallery</h2>
              <p className="text-muted-foreground mb-8">Explore every corner of this stunning project</p>
              <div className="flex gap-2 mb-8 flex-wrap">
                {categories.map((cat) => <Button key={cat as string} variant={activeCategory === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(cat as string)}>{cat as string}</Button>)}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredGallery.map((img: any, i: number) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group" onClick={() => openLightbox(i)}>
                    <img src={img.url} alt={img.alt || project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
            <button className="absolute top-4 right-4 text-white z-10" onClick={() => setLightboxOpen(false)}><X className="h-8 w-8" /></button>
            <button className="absolute left-4 text-white z-10" onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p - 1 + filteredGallery.length) % filteredGallery.length); }}><ChevronLeft className="h-10 w-10" /></button>
            <img src={filteredGallery[lightboxIndex]?.url} alt={filteredGallery[lightboxIndex]?.alt} className="max-h-[85vh] max-w-[90vw] object-contain" onClick={(e) => e.stopPropagation()} />
            <button className="absolute right-4 text-white z-10" onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p + 1) % filteredGallery.length); }}><ChevronRight className="h-10 w-10" /></button>
          </div>
        )}

        {/* 3. VIDEO */}
        {project.video_url && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-heading font-bold mb-8">Video Walkthrough</h2>
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe src={project.video_url} title={`${project.title} walkthrough`} className="w-full h-full" allowFullScreen />
              </div>
            </div>
          </section>
        )}

        {/* 4. OVERVIEW */}
        {project.overview && (
          <section className="py-16 bg-background">
            <div className="container px-4 md:px-6 max-w-4xl">
              <h2 className="text-3xl font-heading font-bold mb-6">Project Overview</h2>
              {project.overview.split("\n\n").map((para, i) => <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-lg">{para}</p>)}
            </div>
          </section>
        )}

        {/* 5. MATERIALS */}
        {materials.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-heading font-bold mb-8">Materials & Specifications</h2>
              <div className="bg-card rounded-xl overflow-hidden shadow-sm border">
                <Table>
                  <TableHeader><TableRow className="bg-primary/5"><TableHead className="font-bold text-foreground">Category</TableHead><TableHead className="font-bold text-foreground">Details</TableHead><TableHead className="font-bold text-foreground">Brand</TableHead></TableRow></TableHeader>
                  <TableBody>{materials.map((mat: any, i: number) => (<TableRow key={i}><TableCell className="font-semibold">{mat.category}</TableCell><TableCell>{mat.details}</TableCell><TableCell><Badge variant="secondary">{mat.brand || "—"}</Badge></TableCell></TableRow>))}</TableBody>
                </Table>
              </div>
            </div>
          </section>
        )}

        {/* 6. TIMELINE */}
        {timeline.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-heading font-bold mb-10">Project Timeline</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {timeline.map((step: any, i: number) => (
                  <Card key={i} className="relative overflow-hidden h-full border-t-4 border-t-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{i + 1}</div>
                        <Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium text-primary">{step.duration}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{step.phase}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. BEFORE & AFTER */}
        {beforeAfter.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-heading font-bold mb-8">Before & After</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {beforeAfter.map((pair: any, i: number) => (
                  <React.Fragment key={i}>
                    <div className="relative rounded-xl overflow-hidden"><img src={pair.before} alt="Before" className="w-full aspect-[4/3] object-cover" /><Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">Before</Badge></div>
                    <div className="relative rounded-xl overflow-hidden"><img src={pair.after} alt="After" className="w-full aspect-[4/3] object-cover" /><Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">After</Badge></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8. TESTIMONIAL */}
        {testimonial && (
          <section className="py-16 bg-background">
            <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold mb-8">Client Testimonial</h2>
              <Card className="p-8 md:p-12 border-primary/20">
                <div className="flex justify-center gap-1 mb-6">{Array.from({ length: testimonial.rating || 5 }).map((_, i) => <Star key={i} className="h-6 w-6 fill-accent text-accent" />)}</div>
                <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed mb-6">"{testimonial.text}"</blockquote>
                <p className="font-bold text-lg">— {testimonial.name}</p>
              </Card>
            </div>
          </section>
        )}

        {/* 9. LOCATION */}
        {project.address && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-heading font-bold mb-2">Project Location</h2>
              <p className="text-muted-foreground mb-8 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> {project.address}</p>
              {project.map_embed && <div className="rounded-xl overflow-hidden shadow-lg h-[400px]"><iframe src={project.map_embed} className="w-full h-full border-0" allowFullScreen loading="lazy" title={`Map of ${project.title}`} /></div>}
            </div>
          </section>
        )}

        {/* 10. LEAD FORM */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-4">Schedule a Site Visit</h2>
                <p className="text-muted-foreground text-lg mb-6">Impressed? Book a visit or discuss your requirements with our experts.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /><a href="tel:+919978299988" className="hover:text-primary">+91 99782 99988 / 0288-2661287</a></div>
                  <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /><a href="mailto:dream_decor@rediffmail.com" className="hover:text-primary">dream_decor@rediffmail.com</a></div>
                  <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /><span>Above Chandra Motors, Opp. Townhall, Jamnagar</span></div>
                </div>
              </div>
              <Card className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><Label htmlFor="name">Full Name *</Label><Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your name" maxLength={100} /></div>
                  <div><Label htmlFor="phone">Phone Number *</Label><Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" maxLength={15} /></div>
                  <div><Label htmlFor="email">Email Address</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" maxLength={255} /></div>
                  <div><Label htmlFor="date">Preferred Visit Date</Label><Input id="date" type="date" value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} /></div>
                  <div><Label htmlFor="message">Message</Label><Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your requirements..." maxLength={1000} rows={3} /></div>
                  <Button type="submit" className="w-full" size="lg" disabled={submitting}>{submitting ? "Submitting..." : "Book Site Visit"}</Button>
                  <Button type="button" variant="outline" className="w-full" size="lg" onClick={() => window.open(`https://wa.me/919978299988?text=${encodeURIComponent(`Hi, I'm interested in "${project.title}". I'd like a consultation.`)}`)}>Get Free Consultation on WhatsApp</Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* 11. RELATED */}
        {related.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-heading font-bold mb-8">Related Projects</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map((rp) => (
                  <Link key={rp.id} to={`/project/${rp.slug}`}>
                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="aspect-[4/3] overflow-hidden"><img src={rp.hero_image || ""} alt={rp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" /></div>
                      <CardContent className="p-5"><Badge variant="secondary" className="mb-2">{rp.type}</Badge><h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{rp.title}</h3><p className="text-muted-foreground text-sm flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {rp.location}</p></CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 12. FINAL CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Start Your Interior Project Today</h2>
            <p className="text-background/70 text-lg max-w-2xl mx-auto mb-10">Transform your space with Dream Decor — 60% time savings, 30% cost savings, 10-year warranty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 h-auto">Get Free Consultation</Button>
              <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 text-lg px-8 py-6 h-auto" onClick={() => window.open("https://wa.me/919978299988")}>Chat on WhatsApp</Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;
