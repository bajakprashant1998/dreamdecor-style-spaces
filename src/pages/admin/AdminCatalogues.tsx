import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Upload, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Catalogue {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  thumbnail_url: string | null;
  pdf_url: string | null;
  file_size: string | null;
  tag: string | null;
  is_published: boolean;
  sort_order: number;
  download_count: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
}

const categories = ["Living Room", "Bedroom", "Office", "Kitchen"];
const tags = ["New", "Trending", "Popular"];

export default function AdminCatalogues() {
  const [items, setItems] = useState<Catalogue[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Catalogue | null>(null);
  const [uploading, setUploading] = useState<{ pdf: boolean; image: boolean }>({ pdf: false, image: false });

  const empty = {
    title: "", slug: "", category: "Living Room", description: "",
    thumbnail_url: "", pdf_url: "", file_size: "100 MB", tag: "",
    is_published: true, sort_order: 0, meta_title: "", meta_description: "",
  };
  const [form, setForm] = useState(empty);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("catalogues")
      .select("*")
      .order("sort_order");
    if (data) setItems(data as any);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setDialogOpen(true);
  };

  const openEdit = (item: Catalogue) => {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      category: item.category,
      description: item.description || "",
      thumbnail_url: item.thumbnail_url || "",
      pdf_url: item.pdf_url || "",
      file_size: item.file_size || "100 MB",
      tag: item.tag || "",
      is_published: item.is_published,
      sort_order: item.sort_order,
      meta_title: item.meta_title || "",
      meta_description: item.meta_description || "",
    });
    setDialogOpen(true);
  };

  const uploadFile = async (file: File, type: "pdf" | "image") => {
    setUploading((prev) => ({ ...prev, [type]: true }));
    const ext = file.name.split(".").pop();
    const path = `catalogues/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading((prev) => ({ ...prev, [type]: false }));
      return;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    if (type === "pdf") {
      // Calculate file size
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setForm((prev) => ({ ...prev, pdf_url: urlData.publicUrl, file_size: `${sizeMB} MB` }));
    } else {
      setForm((prev) => ({ ...prev, thumbnail_url: urlData.publicUrl }));
    }
    toast.success(`${type === "pdf" ? "PDF" : "Image"} uploaded!`);
    setUploading((prev) => ({ ...prev, [type]: false }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    const slug = form.slug || generateSlug(form.title);
    const payload = { ...form, slug, tag: form.tag || null };

    if (editing) {
      const { error } = await supabase.from("catalogues").update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Catalogue updated");
    } else {
      const { error } = await supabase.from("catalogues").insert(payload as any);
      if (error) { toast.error(error.message); return; }
      toast.success("Catalogue created");
    }
    setDialogOpen(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this catalogue?")) return;
    await supabase.from("catalogues").delete().eq("id", id);
    toast.success("Deleted");
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Catalogues</h1>
          <p className="text-sm text-muted-foreground">Manage PDF catalogues for download</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Add Catalogue
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-card">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No catalogues yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-card border rounded-lg p-4">
              {item.thumbnail_url ? (
                <img src={item.thumbnail_url} alt={item.title} className="w-20 h-14 object-cover rounded" />
              ) : (
                <div className="w-20 h-14 bg-muted rounded flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  {item.tag && <Badge variant="secondary" className="text-[10px]">{item.tag}</Badge>}
                  {!item.is_published && <Badge variant="outline" className="text-[10px]">Draft</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.category} • {item.file_size} • {item.download_count} downloads
                </p>
                {item.pdf_url && (
                  <a href={item.pdf_url} target="_blank" rel="noreferrer" className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline">
                    <ExternalLink className="h-3 w-3" /> View PDF
                  </a>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="icon" onClick={() => openEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Catalogue" : "Add Catalogue"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  placeholder="Modern Living Room Catalogue"
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </div>
            </div>

            {/* Category & Tag */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tag / Badge</Label>
                <Select value={form.tag || "none"} onValueChange={(v) => setForm({ ...form, tag: v === "none" ? "" : v })}>
                  <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {tags.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description of this catalogue..."
                rows={3}
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <Label className="mb-2 block">Thumbnail Image</Label>
              {form.thumbnail_url && (
                <img src={form.thumbnail_url} alt="Thumbnail" className="w-40 h-28 object-cover rounded border mb-2" />
              )}
              <label className="flex items-center gap-2 cursor-pointer">
                <Button variant="outline" size="sm" className="gap-2" asChild disabled={uploading.image}>
                  <span>
                    <ImageIcon className="h-4 w-4" />
                    {uploading.image ? "Uploading..." : "Upload Image"}
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadFile(f, "image");
                  }}
                />
              </label>
            </div>

            {/* PDF Upload */}
            <div>
              <Label className="mb-2 block">PDF File</Label>
              {form.pdf_url && (
                <a href={form.pdf_url} target="_blank" rel="noreferrer" className="text-sm text-primary flex items-center gap-1 mb-2 hover:underline">
                  <FileText className="h-4 w-4" /> View uploaded PDF ({form.file_size})
                </a>
              )}
              <label className="flex items-center gap-2 cursor-pointer">
                <Button variant="outline" size="sm" className="gap-2" asChild disabled={uploading.pdf}>
                  <span>
                    <Upload className="h-4 w-4" />
                    {uploading.pdf ? "Uploading..." : "Upload PDF"}
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadFile(f, "pdf");
                  }}
                />
              </label>
              <p className="text-xs text-muted-foreground mt-1">Max 100MB PDF files supported</p>
            </div>

            {/* SEO */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-3">SEO Settings</h4>
              <div className="space-y-3">
                <div>
                  <Label>Meta Title</Label>
                  <Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} />
                </div>
                <div>
                  <Label>Meta Description</Label>
                  <Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={2} />
                </div>
              </div>
            </div>

            {/* Published */}
            <div className="flex items-center gap-3">
              <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <Label>Published</Label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
