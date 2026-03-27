import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, X, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Category { id: string; name: string; slug: string; }

interface ColourItem { label: string; value: string; }

interface DesignIdea {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  images: string[];
  layout: string | null;
  room_dimension: string | null;
  style: string | null;
  colours: ColourItem[];
  shutter_finish: ColourItem[];
  countertop_material: string | null;
  backsplash: string | null;
  storage_features: string | null;
  special_features: string | null;
  ideal_for: string | null;
  description: string | null;
  short_description: string | null;
  tags: string[] | null;
  is_trending: boolean | null;
  is_published: boolean | null;
  sort_order: number | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
}

const emptyForm = {
  category_id: "",
  title: "",
  slug: "",
  images: [] as string[],
  layout: "",
  room_dimension: "",
  style: "",
  colours: [] as ColourItem[],
  shutter_finish: [] as ColourItem[],
  countertop_material: "",
  backsplash: "",
  storage_features: "",
  special_features: "",
  ideal_for: "",
  description: "",
  short_description: "",
  tags: [] as string[],
  is_trending: false,
  is_published: true,
  sort_order: 0,
  meta_title: "",
  meta_description: "",
  focus_keyword: "",
};

export default function AdminDesignIdeas() {
  const [ideas, setIdeas] = useState<DesignIdea[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchCategories = async () => {
    const { data } = await supabase.from("design_idea_categories").select("id, name, slug").order("sort_order");
    if (data) setCategories(data as unknown as Category[]);
  };

  const fetchIdeas = async () => {
    let q = supabase.from("design_ideas").select("*").order("sort_order");
    if (filterCat !== "all") q = q.eq("category_id", filterCat);
    const { data } = await q;
    if (data) setIdeas(data.map((d: any) => ({
      ...d,
      images: Array.isArray(d.images) ? d.images : [],
      colours: Array.isArray(d.colours) ? d.colours : [],
      shutter_finish: Array.isArray(d.shutter_finish) ? d.shutter_finish : [],
      tags: Array.isArray(d.tags) ? d.tags : [],
    })));
  };

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchIdeas(); }, [filterCat]);

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setForm(p => ({ ...p, title, slug: editingId ? p.slug : generateSlug(title) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const newImages = [...form.images];
    for (let i = 0; i < files.length && newImages.length < 10; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop();
      const path = `design-ideas/${Date.now()}-${i}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
        newImages.push(urlData.publicUrl);
      }
    }
    setForm(p => ({ ...p, images: newImages }));
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (idx: number) => {
    setForm(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  };

  const addColour = () => setForm(p => ({ ...p, colours: [...p.colours, { label: "", value: "" }] }));
  const updateColour = (idx: number, field: string, val: string) => {
    setForm(p => ({ ...p, colours: p.colours.map((c, i) => i === idx ? { ...c, [field]: val } : c) }));
  };
  const removeColour = (idx: number) => setForm(p => ({ ...p, colours: p.colours.filter((_, i) => i !== idx) }));

  const addFinish = () => setForm(p => ({ ...p, shutter_finish: [...p.shutter_finish, { label: "", value: "" }] }));
  const updateFinish = (idx: number, field: string, val: string) => {
    setForm(p => ({ ...p, shutter_finish: p.shutter_finish.map((c, i) => i === idx ? { ...c, [field]: val } : c) }));
  };
  const removeFinish = (idx: number) => setForm(p => ({ ...p, shutter_finish: p.shutter_finish.filter((_, i) => i !== idx) }));

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(p => ({ ...p, tags: [...p.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.category_id) {
      toast({ title: "Title, slug and category are required", variant: "destructive" });
      return;
    }
    const payload: any = {
      ...form,
      images: form.images,
      colours: form.colours,
      shutter_finish: form.shutter_finish,
    };

    if (editingId) {
      const { error } = await supabase.from("design_ideas").update(payload).eq("id", editingId);
      if (error) { toast({ title: error.message, variant: "destructive" }); return; }
      toast({ title: "Design idea updated!" });
    } else {
      const { error } = await supabase.from("design_ideas").insert(payload);
      if (error) { toast({ title: error.message, variant: "destructive" }); return; }
      toast({ title: "Design idea created!" });
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    fetchIdeas();
  };

  const handleEdit = (idea: DesignIdea) => {
    setEditingId(idea.id);
    setForm({
      category_id: idea.category_id,
      title: idea.title,
      slug: idea.slug,
      images: idea.images || [],
      layout: idea.layout || "",
      room_dimension: idea.room_dimension || "",
      style: idea.style || "",
      colours: idea.colours || [],
      shutter_finish: idea.shutter_finish || [],
      countertop_material: idea.countertop_material || "",
      backsplash: idea.backsplash || "",
      storage_features: idea.storage_features || "",
      special_features: idea.special_features || "",
      ideal_for: idea.ideal_for || "",
      description: idea.description || "",
      short_description: idea.short_description || "",
      tags: idea.tags || [],
      is_trending: idea.is_trending ?? false,
      is_published: idea.is_published ?? true,
      sort_order: idea.sort_order || 0,
      meta_title: idea.meta_title || "",
      meta_description: idea.meta_description || "",
      focus_keyword: idea.focus_keyword || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this design idea?")) return;
    await supabase.from("design_ideas").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchIdeas();
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Design Ideas</h1>
          <p className="text-muted-foreground text-sm">Manage all design ideas across categories</p>
        </div>
        <div className="flex gap-3">
          <Select value={filterCat} onValueChange={setFilterCat}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Categories" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => { setEditingId(null); setForm(emptyForm); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" /> Add Design Idea
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <Card key={idea.id} className="overflow-hidden">
            {idea.images?.[0] && (
              <img src={idea.images[0]} alt={idea.title} className="h-48 w-full object-cover" />
            )}
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-2">{idea.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{getCategoryName(idea.category_id)}</p>
                  {idea.room_dimension && <p className="text-xs text-muted-foreground">{idea.room_dimension}</p>}
                </div>
                <div className="flex gap-1 shrink-0">
                  {idea.is_trending && <Star className="h-4 w-4 text-primary fill-primary" />}
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <Badge variant={idea.is_published ? "default" : "secondary"} className="text-xs">
                  {idea.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => handleEdit(idea)}><Pencil className="h-3 w-3 mr-1" /> Edit</Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(idea.id)}><Trash2 className="h-3 w-3 mr-1 text-destructive" /> Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {ideas.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No design ideas yet. Add your first one!
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Design Idea" : "Add Design Idea"}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Design Details</TabsTrigger>
              <TabsTrigger value="media">Images</TabsTrigger>
              <TabsTrigger value="seo">SEO & Tags</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label>Category *</Label>
                <Select value={form.category_id} onValueChange={(v) => setForm(p => ({ ...p, category_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title *</Label>
                  <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Contemporary L-Shaped Kitchen Design..." />
                </div>
                <div>
                  <Label>Slug *</Label>
                  <Input value={form.slug} onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label>Short Description</Label>
                <Textarea value={form.short_description} onChange={(e) => setForm(p => ({ ...p, short_description: e.target.value }))} rows={2} />
              </div>
              <div>
                <Label>Full Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} rows={5} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={form.is_published} onCheckedChange={(v) => setForm(p => ({ ...p, is_published: v }))} />
                  <Label>Published</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.is_trending} onCheckedChange={(v) => setForm(p => ({ ...p, is_trending: v }))} />
                  <Label>Trending</Label>
                </div>
                <div>
                  <Label>Sort Order</Label>
                  <Input type="number" value={form.sort_order} onChange={(e) => setForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className="w-24" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Layout</Label>
                  <Input value={form.layout} onChange={(e) => setForm(p => ({ ...p, layout: e.target.value }))} placeholder="L-Shape / U-Shape / Parallel..." />
                </div>
                <div>
                  <Label>Room Dimension</Label>
                  <Input value={form.room_dimension} onChange={(e) => setForm(p => ({ ...p, room_dimension: e.target.value }))} placeholder="11x11 Feet" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Style</Label>
                  <Input value={form.style} onChange={(e) => setForm(p => ({ ...p, style: e.target.value }))} placeholder="Contemporary / Modern / Classic" />
                </div>
                <div>
                  <Label>Ideal For</Label>
                  <Input value={form.ideal_for} onChange={(e) => setForm(p => ({ ...p, ideal_for: e.target.value }))} placeholder="Medium-families" />
                </div>
              </div>

              {/* Colours */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Colours</Label>
                  <Button variant="outline" size="sm" onClick={addColour}><Plus className="h-3 w-3 mr-1" /> Add</Button>
                </div>
                {form.colours.map((c, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input placeholder="Label (e.g. Base unit)" value={c.label} onChange={(e) => updateColour(i, "label", e.target.value)} />
                    <Input placeholder="Value (e.g. Pastel green)" value={c.value} onChange={(e) => updateColour(i, "value", e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeColour(i)}><X className="h-3 w-3" /></Button>
                  </div>
                ))}
              </div>

              {/* Shutter Finish */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Shutter Finish</Label>
                  <Button variant="outline" size="sm" onClick={addFinish}><Plus className="h-3 w-3 mr-1" /> Add</Button>
                </div>
                {form.shutter_finish.map((c, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input placeholder="Label (e.g. Base unit)" value={c.label} onChange={(e) => updateFinish(i, "label", e.target.value)} />
                    <Input placeholder="Value (e.g. Laminate in high gloss)" value={c.value} onChange={(e) => updateFinish(i, "value", e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeFinish(i)}><X className="h-3 w-3" /></Button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Countertop Material</Label>
                  <Input value={form.countertop_material} onChange={(e) => setForm(p => ({ ...p, countertop_material: e.target.value }))} placeholder="Marble / Granite / Quartz" />
                </div>
                <div>
                  <Label>Backsplash</Label>
                  <Input value={form.backsplash} onChange={(e) => setForm(p => ({ ...p, backsplash: e.target.value }))} placeholder="Marble dado tile" />
                </div>
              </div>

              <div>
                <Label>Storage Features</Label>
                <Textarea value={form.storage_features} onChange={(e) => setForm(p => ({ ...p, storage_features: e.target.value }))} rows={3} />
              </div>
              <div>
                <Label>Special Features</Label>
                <Textarea value={form.special_features} onChange={(e) => setForm(p => ({ ...p, special_features: e.target.value }))} rows={3} />
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <div>
                <Label>Images (max 10)</Label>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                <Button variant="outline" className="mt-2" onClick={() => fileRef.current?.click()} disabled={uploading || form.images.length >= 10}>
                  <Upload className="h-4 w-4 mr-2" /> {uploading ? "Uploading..." : `Upload Images (${form.images.length}/10)`}
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt={`Image ${i + 1}`} className="h-32 w-full object-cover rounded" />
                    <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3" />
                    </button>
                    {i === 0 && <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded">Main</span>}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Meta Title</Label>
                  <Input value={form.meta_title} onChange={(e) => setForm(p => ({ ...p, meta_title: e.target.value }))} />
                </div>
                <div>
                  <Label>Focus Keyword</Label>
                  <Input value={form.focus_keyword} onChange={(e) => setForm(p => ({ ...p, focus_keyword: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea value={form.meta_description} onChange={(e) => setForm(p => ({ ...p, meta_description: e.target.value }))} rows={3} />
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag and press Enter" />
                  <Button variant="outline" onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.tags.map((t, i) => (
                    <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => setForm(p => ({ ...p, tags: p.tags.filter((_, idx) => idx !== i) }))}>
                      {t} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingId ? "Update" : "Create"} Design Idea</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
