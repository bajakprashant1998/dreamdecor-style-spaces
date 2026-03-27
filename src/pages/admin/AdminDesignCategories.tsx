import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, X, GripVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  seo_content: string | null;
  cover_image: string | null;
  icon: string | null;
  meta_title: string | null;
  meta_description: string | null;
  sort_order: number | null;
  is_published: boolean | null;
}

const emptyCategory: Omit<Category, "id"> = {
  name: "",
  slug: "",
  description: "",
  seo_content: "",
  cover_image: "",
  icon: "",
  meta_title: "",
  meta_description: "",
  sort_order: 0,
  is_published: true,
};

export default function AdminDesignCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyCategory);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("design_idea_categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setCategories(data as unknown as Category[]);
  };

  useEffect(() => { fetchCategories(); }, []);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleNameChange = (name: string) => {
    setForm(prev => ({
      ...prev,
      name,
      slug: editingId ? prev.slug : generateSlug(name),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `design-categories/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", variant: "destructive" });
    } else {
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
      setForm(prev => ({ ...prev, cover_image: urlData.publicUrl }));
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      toast({ title: "Name and slug are required", variant: "destructive" });
      return;
    }
    const payload = { ...form };

    if (editingId) {
      const { error } = await supabase.from("design_idea_categories").update(payload).eq("id", editingId);
      if (error) { toast({ title: error.message, variant: "destructive" }); return; }
      toast({ title: "Category updated!" });
    } else {
      const { error } = await supabase.from("design_idea_categories").insert(payload);
      if (error) { toast({ title: error.message, variant: "destructive" }); return; }
      toast({ title: "Category created!" });
    }
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyCategory);
    fetchCategories();
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      seo_content: cat.seo_content || "",
      cover_image: cat.cover_image || "",
      icon: cat.icon || "",
      meta_title: cat.meta_title || "",
      meta_description: cat.meta_description || "",
      sort_order: cat.sort_order || 0,
      is_published: cat.is_published ?? true,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category and ALL its design ideas?")) return;
    await supabase.from("design_idea_categories").delete().eq("id", id);
    toast({ title: "Category deleted" });
    fetchCategories();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Design Idea Categories</h1>
          <p className="text-muted-foreground text-sm">Manage categories like Kitchen, Bedroom, Living Room etc.</p>
        </div>
        <Button onClick={() => { setEditingId(null); setForm(emptyCategory); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>

      <div className="grid gap-4">
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              {cat.cover_image && (
                <img src={cat.cover_image} alt={cat.name} className="h-16 w-24 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">/design-ideas/{cat.slug}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${cat.is_published ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {cat.is_published ? "Published" : "Draft"}
              </span>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </CardContent>
          </Card>
        ))}
        {categories.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No categories yet. Add your first category!</p>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category Name *</Label>
                <Input value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Kitchen Designs" />
              </div>
              <div>
                <Label>Slug *</Label>
                <Input value={form.slug} onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="kitchen-designs" />
              </div>
            </div>

            <div>
              <Label>Short Description</Label>
              <Textarea value={form.description || ""} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
            </div>

            <div>
              <Label>SEO Content (Long description for page)</Label>
              <Textarea value={form.seo_content || ""} onChange={(e) => setForm(p => ({ ...p, seo_content: e.target.value }))} rows={5} placeholder="Detailed content shown on the category page..." />
            </div>

            <div>
              <Label>Cover Image</Label>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              {form.cover_image ? (
                <div className="relative inline-block mt-2">
                  <img src={form.cover_image} alt="Cover" className="h-32 w-48 object-cover rounded" />
                  <button onClick={() => setForm(p => ({ ...p, cover_image: "" }))} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"><X className="h-3 w-3" /></button>
                </div>
              ) : (
                <Button variant="outline" className="mt-2" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  <Upload className="h-4 w-4 mr-2" /> {uploading ? "Uploading..." : "Upload Image"}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Meta Title</Label>
                <Input value={form.meta_title || ""} onChange={(e) => setForm(p => ({ ...p, meta_title: e.target.value }))} />
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input type="number" value={form.sort_order || 0} onChange={(e) => setForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} />
              </div>
            </div>

            <div>
              <Label>Meta Description</Label>
              <Textarea value={form.meta_description || ""} onChange={(e) => setForm(p => ({ ...p, meta_description: e.target.value }))} rows={2} />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={form.is_published ?? true} onCheckedChange={(v) => setForm(p => ({ ...p, is_published: v }))} />
              <Label>Published</Label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingId ? "Update" : "Create"} Category</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
