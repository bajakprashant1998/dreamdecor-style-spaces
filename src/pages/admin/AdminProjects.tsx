import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Image as ImageIcon, GripVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryImage {
  url: string;
  alt: string;
  category: string;
}

interface MaterialItem {
  name: string;
  value: string;
}

interface TimelineItem {
  phase: string;
  duration: string;
  status: string;
}

interface TestimonialData {
  name: string;
  text: string;
  rating: number;
  video_url?: string;
}

interface BeforeAfterItem {
  before: string;
  after: string;
  label: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  location: string | null;
  area: string | null;
  type: string | null;
  completion_year: string | null;
  description: string | null;
  hero_image: string | null;
  gallery: GalleryImage[] | null;
  video_url: string | null;
  overview: string | null;
  materials: MaterialItem[] | null;
  timeline: TimelineItem[] | null;
  before_after: BeforeAfterItem[] | null;
  testimonial: TestimonialData | null;
  address: string | null;
  map_embed: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  is_published: boolean | null;
  sort_order: number | null;
  created_at: string | null;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    if (data) setProjects(data as unknown as Project[]);
  };

  useEffect(() => { load(); }, []);

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(fileName, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return null;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file, "projects/hero");
    if (url) setEditing(prev => prev ? { ...prev, hero_image: url } : prev);
    setUploading(false);
    if (heroInputRef.current) heroInputRef.current.value = "";
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setGalleryUploading(true);
    const currentGallery: GalleryImage[] = (editing?.gallery as GalleryImage[]) || [];
    const newImages: GalleryImage[] = [];

    for (const file of Array.from(files)) {
      const url = await uploadFile(file, "projects/gallery");
      if (url) {
        newImages.push({ url, alt: file.name.replace(/\.[^.]+$/, ''), category: "Other Spaces" });
      }
    }

    setEditing(prev => prev ? { ...prev, gallery: [...currentGallery, ...newImages] } : prev);
    setGalleryUploading(false);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const removeGalleryImage = (index: number) => {
    const gallery = [...((editing?.gallery as GalleryImage[]) || [])];
    gallery.splice(index, 1);
    setEditing(prev => prev ? { ...prev, gallery } : prev);
  };

  const updateGalleryImage = (index: number, field: keyof GalleryImage, value: string) => {
    const gallery = [...((editing?.gallery as GalleryImage[]) || [])];
    gallery[index] = { ...gallery[index], [field]: value };
    setEditing(prev => prev ? { ...prev, gallery } : prev);
  };

  // Materials helpers
  const addMaterial = () => {
    const materials = [...((editing?.materials as MaterialItem[]) || []), { name: "", value: "" }];
    setEditing(prev => prev ? { ...prev, materials } : prev);
  };
  const updateMaterial = (i: number, field: keyof MaterialItem, val: string) => {
    const materials = [...((editing?.materials as MaterialItem[]) || [])];
    materials[i] = { ...materials[i], [field]: val };
    setEditing(prev => prev ? { ...prev, materials } : prev);
  };
  const removeMaterial = (i: number) => {
    const materials = [...((editing?.materials as MaterialItem[]) || [])];
    materials.splice(i, 1);
    setEditing(prev => prev ? { ...prev, materials } : prev);
  };

  // Timeline helpers
  const addTimeline = () => {
    const timeline = [...((editing?.timeline as TimelineItem[]) || []), { phase: "", duration: "", status: "Pending" }];
    setEditing(prev => prev ? { ...prev, timeline } : prev);
  };
  const updateTimeline = (i: number, field: keyof TimelineItem, val: string) => {
    const timeline = [...((editing?.timeline as TimelineItem[]) || [])];
    timeline[i] = { ...timeline[i], [field]: val };
    setEditing(prev => prev ? { ...prev, timeline } : prev);
  };
  const removeTimeline = (i: number) => {
    const timeline = [...((editing?.timeline as TimelineItem[]) || [])];
    timeline.splice(i, 1);
    setEditing(prev => prev ? { ...prev, timeline } : prev);
  };

  const save = async () => {
    if (!editing) return;
    const payload: Record<string, any> = {
      slug: editing.slug || "",
      title: editing.title || "",
      tagline: editing.tagline || null,
      location: editing.location || null,
      area: editing.area || null,
      type: editing.type || "Residential",
      completion_year: editing.completion_year || null,
      description: editing.description || null,
      hero_image: editing.hero_image || null,
      gallery: editing.gallery || [],
      video_url: editing.video_url || null,
      overview: editing.overview || null,
      materials: editing.materials || [],
      timeline: editing.timeline || [],
      before_after: editing.before_after || [],
      testimonial: editing.testimonial || null,
      address: editing.address || null,
      map_embed: editing.map_embed || null,
      meta_title: editing.meta_title || null,
      meta_description: editing.meta_description || null,
      keywords: editing.keywords || [],
      is_published: editing.is_published ?? true,
      sort_order: editing.sort_order ?? 0,
    };

    if (isNew) {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("projects").update(payload).eq("id", editing.id!);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: isNew ? "Project created!" : "Project updated!" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("projects").delete().eq("id", id);
    toast({ title: "Project deleted" });
    load();
  };

  const togglePublish = async (id: string, current: boolean | null) => {
    await supabase.from("projects").update({ is_published: !current }).eq("id", id);
    load();
  };

  const newProject: Partial<Project> = {
    is_published: true, sort_order: 0, type: "Residential",
    gallery: [], materials: [], timeline: [], before_after: [], keywords: [],
  };

  const gallery = (editing?.gallery as GalleryImage[]) || [];
  const materials = (editing?.materials as MaterialItem[]) || [];
  const timeline = (editing?.timeline as TimelineItem[]) || [];
  const testimonial = (editing?.testimonial as TestimonialData) || { name: "", text: "", rating: 5 };

  const categories = ["Living Room", "Bedroom", "Kitchen", "Dining", "Office", "Other Spaces"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => { setIsNew(true); setEditing(newProject); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4 flex items-center gap-4">
              {p.hero_image ? (
                <img src={p.hero_image} alt={p.title} className="w-20 h-14 object-cover rounded" />
              ) : (
                <div className="w-20 h-14 bg-muted rounded flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.location} • {p.type} • {((p.gallery as any[]) || []).length} photos</p>
              </div>
              <Badge variant={p.is_published ? "default" : "secondary"}>
                {p.is_published ? "Published" : "Draft"}
              </Badge>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => togglePublish(p.id, p.is_published)}>
                  {p.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => { setIsNew(false); setEditing(p); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(p.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && <p className="text-muted-foreground text-center py-8">No projects yet</p>}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add Project" : "Edit Project"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              {/* BASIC INFO */}
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Title *</Label><Input value={editing.title || ""} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
                  <div><Label>Slug *</Label><Input value={editing.slug || ""} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="my-project" /></div>
                </div>
                <div><Label>Tagline</Label><Input value={editing.tagline || ""} onChange={e => setEditing({ ...editing, tagline: e.target.value })} placeholder="Modern Minimalist Design" /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Location</Label><Input value={editing.location || ""} onChange={e => setEditing({ ...editing, location: e.target.value })} /></div>
                  <div><Label>Area (sq ft)</Label><Input value={editing.area || ""} onChange={e => setEditing({ ...editing, area: e.target.value })} /></div>
                  <div><Label>Type</Label><Input value={editing.type || ""} onChange={e => setEditing({ ...editing, type: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Completion Year</Label><Input value={editing.completion_year || ""} onChange={e => setEditing({ ...editing, completion_year: e.target.value })} /></div>
                  <div><Label>Sort Order</Label><Input type="number" value={editing.sort_order ?? 0} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} /></div>
                  <div><Label>Address</Label><Input value={editing.address || ""} onChange={e => setEditing({ ...editing, address: e.target.value })} /></div>
                </div>
                <div><Label>Short Description</Label><Textarea value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} /></div>
                <div><Label>Full Overview</Label><Textarea value={editing.overview || ""} onChange={e => setEditing({ ...editing, overview: e.target.value })} rows={5} /></div>
                <div><Label>Video URL (YouTube)</Label><Input value={editing.video_url || ""} onChange={e => setEditing({ ...editing, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." /></div>
                <div><Label>Map Embed URL</Label><Input value={editing.map_embed || ""} onChange={e => setEditing({ ...editing, map_embed: e.target.value })} placeholder="https://maps.google.com/..." /></div>
              </TabsContent>

              {/* MEDIA */}
              <TabsContent value="media" className="space-y-6 mt-4">
                {/* Hero Image */}
                <div>
                  <Label className="text-base font-semibold">Hero Image</Label>
                  <div className="mt-2">
                    {editing.hero_image ? (
                      <div className="relative inline-block">
                        <img src={editing.hero_image} alt="Hero" className="w-full max-w-md h-48 object-cover rounded-lg border" />
                        <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7"
                          onClick={() => setEditing({ ...editing, hero_image: null })}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="w-full max-w-md h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => heroInputRef.current?.click()}
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Click to upload hero image"}</p>
                      </div>
                    )}
                    <input ref={heroInputRef} type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
                    {editing.hero_image && (
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => heroInputRef.current?.click()} disabled={uploading}>
                        <Upload className="h-4 w-4 mr-1" /> {uploading ? "Uploading..." : "Change Image"}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Gallery ({gallery.length} images)</Label>
                    <Button variant="outline" size="sm" onClick={() => galleryInputRef.current?.click()} disabled={galleryUploading}>
                      <Upload className="h-4 w-4 mr-1" /> {galleryUploading ? "Uploading..." : "Upload Photos"}
                    </Button>
                    <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                  </div>
                  {gallery.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {gallery.map((img, i) => (
                        <div key={i} className="relative group border rounded-lg overflow-hidden">
                          <img src={img.url} alt={img.alt} className="w-full h-32 object-cover" />
                          <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeGalleryImage(i)}>
                            <X className="h-3 w-3" />
                          </Button>
                          <div className="p-2 space-y-1">
                            <Input placeholder="Alt text" value={img.alt} onChange={e => updateGalleryImage(i, "alt", e.target.value)} className="h-7 text-xs" />
                            <select value={img.category} onChange={e => updateGalleryImage(i, "category", e.target.value)}
                              className="w-full h-7 text-xs border rounded px-1 bg-background">
                              {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="mt-3 h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => galleryInputRef.current?.click()}
                    >
                      <ImageIcon className="h-10 w-10 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload gallery images</p>
                      <p className="text-xs text-muted-foreground">You can select multiple images at once</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* DETAILS - Materials & Timeline */}
              <TabsContent value="details" className="space-y-6 mt-4">
                {/* Materials */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base font-semibold">Materials & Specifications</Label>
                    <Button variant="outline" size="sm" onClick={addMaterial}><Plus className="h-4 w-4 mr-1" /> Add</Button>
                  </div>
                  {materials.map((m, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Input placeholder="e.g. Flooring" value={m.name} onChange={e => updateMaterial(i, "name", e.target.value)} className="flex-1" />
                      <Input placeholder="e.g. Italian Marble" value={m.value} onChange={e => updateMaterial(i, "value", e.target.value)} className="flex-1" />
                      <Button variant="ghost" size="icon" onClick={() => removeMaterial(i)}><X className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  {materials.length === 0 && <p className="text-sm text-muted-foreground">No materials added yet</p>}
                </div>

                {/* Timeline */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base font-semibold">Project Timeline</Label>
                    <Button variant="outline" size="sm" onClick={addTimeline}><Plus className="h-4 w-4 mr-1" /> Add Phase</Button>
                  </div>
                  {timeline.map((t, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Input placeholder="Phase name" value={t.phase} onChange={e => updateTimeline(i, "phase", e.target.value)} className="flex-1" />
                      <Input placeholder="Duration" value={t.duration} onChange={e => updateTimeline(i, "duration", e.target.value)} className="w-32" />
                      <select value={t.status} onChange={e => updateTimeline(i, "status", e.target.value)}
                        className="h-10 border rounded px-2 bg-background text-sm w-32">
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                      </select>
                      <Button variant="ghost" size="icon" onClick={() => removeTimeline(i)}><X className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  {timeline.length === 0 && <p className="text-sm text-muted-foreground">No timeline added yet</p>}
                </div>

                {/* Keywords */}
                <div>
                  <Label className="text-base font-semibold">SEO Keywords (comma separated)</Label>
                  <Input
                    value={(editing.keywords || []).join(", ")}
                    onChange={e => setEditing({ ...editing, keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean) })}
                    placeholder="interior designer, luxury design, residential project"
                    className="mt-1"
                  />
                </div>
              </TabsContent>

              {/* TESTIMONIAL */}
              <TabsContent value="testimonial" className="space-y-4 mt-4">
                <div><Label>Client Name</Label><Input value={testimonial.name} onChange={e => setEditing({ ...editing, testimonial: { ...testimonial, name: e.target.value } })} /></div>
                <div><Label>Testimonial Text</Label><Textarea value={testimonial.text} onChange={e => setEditing({ ...editing, testimonial: { ...testimonial, text: e.target.value } })} rows={4} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={testimonial.rating} onChange={e => setEditing({ ...editing, testimonial: { ...testimonial, rating: parseInt(e.target.value) || 5 } })} /></div>
                  <div><Label>Video Testimonial URL</Label><Input value={testimonial.video_url || ""} onChange={e => setEditing({ ...editing, testimonial: { ...testimonial, video_url: e.target.value } })} /></div>
                </div>
              </TabsContent>

              {/* SEO */}
              <TabsContent value="seo" className="space-y-4 mt-4">
                <div><Label>Meta Title (50-60 chars)</Label><Input value={editing.meta_title || ""} onChange={e => setEditing({ ...editing, meta_title: e.target.value })} /><p className="text-xs text-muted-foreground mt-1">{(editing.meta_title || "").length}/60</p></div>
                <div><Label>Meta Description (150-160 chars)</Label><Textarea value={editing.meta_description || ""} onChange={e => setEditing({ ...editing, meta_description: e.target.value })} rows={2} /><p className="text-xs text-muted-foreground mt-1">{(editing.meta_description || "").length}/160</p></div>
              </TabsContent>

              <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={save}>{isNew ? "Create Project" : "Update Project"}</Button>
              </div>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
