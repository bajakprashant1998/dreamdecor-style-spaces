import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  price: number;
  original_price: number | null;
  description: string | null;
  short_description: string | null;
  images: any;
  material: string | null;
  style: string | null;
  rating: number | null;
  in_stock: boolean | null;
  is_featured: boolean | null;
  is_bestseller: boolean | null;
  is_new: boolean | null;
  is_published: boolean | null;
  badge: string | null;
  sort_order: number | null;
}

const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("products").select("*").order("sort_order");
    if (data) setProducts(data as Product[]);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      name: editing.name || "",
      slug: editing.slug || "",
      category: editing.category,
      price: editing.price || 0,
      original_price: editing.original_price,
      description: editing.description,
      short_description: editing.short_description,
      material: editing.material,
      style: editing.style,
      badge: editing.badge,
      in_stock: editing.in_stock ?? true,
      is_featured: editing.is_featured ?? false,
      is_bestseller: editing.is_bestseller ?? false,
      is_new: editing.is_new ?? false,
      is_published: editing.is_published ?? true,
      sort_order: editing.sort_order ?? 0,
    };

    if (isNew) {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("products").update(payload).eq("id", editing.id!);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: isNew ? "Product created!" : "Product updated!" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => { setIsNew(true); setEditing({ is_published: true, in_stock: true, price: 0 }); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.category} • {formatPrice(p.price)} {p.original_price && <span className="line-through">{formatPrice(p.original_price)}</span>}</p>
              </div>
              <div className="flex gap-1 flex-wrap">
                {p.is_featured && <Badge className="text-xs">Featured</Badge>}
                {p.is_bestseller && <Badge variant="secondary" className="text-xs">Bestseller</Badge>}
                {p.is_new && <Badge variant="outline" className="text-xs">New</Badge>}
              </div>
              <Badge variant={p.is_published ? "default" : "secondary"}>
                {p.is_published ? "Published" : "Draft"}
              </Badge>
              <div className="flex gap-1">
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
        {products.length === 0 && <p className="text-muted-foreground text-center py-8">No products yet</p>}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{isNew ? "Add Product" : "Edit Product"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Name *</Label><Input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
                <div><Label>Slug *</Label><Input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Category</Label><Input value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="Living Room" /></div>
                <div><Label>Price (₹) *</Label><Input type="number" value={editing.price || 0} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} /></div>
                <div><Label>Original Price (₹)</Label><Input type="number" value={editing.original_price || ""} onChange={(e) => setEditing({ ...editing, original_price: parseFloat(e.target.value) || null })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Material</Label><Input value={editing.material || ""} onChange={(e) => setEditing({ ...editing, material: e.target.value })} /></div>
                <div><Label>Style</Label><Input value={editing.style || ""} onChange={(e) => setEditing({ ...editing, style: e.target.value })} /></div>
              </div>
              <div><Label>Badge</Label><Input value={editing.badge || ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} placeholder="e.g. Sale, Hot, New Arrival" /></div>
              <div><Label>Short Description</Label><Input value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} /></div>
              <div><Label>Full Description</Label><Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={4} /></div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2"><Switch checked={editing.in_stock ?? true} onCheckedChange={(v) => setEditing({ ...editing, in_stock: v })} /><Label>In Stock</Label></div>
                <div className="flex items-center gap-2"><Switch checked={editing.is_featured ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_featured: v })} /><Label>Featured</Label></div>
                <div className="flex items-center gap-2"><Switch checked={editing.is_bestseller ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_bestseller: v })} /><Label>Bestseller</Label></div>
                <div className="flex items-center gap-2"><Switch checked={editing.is_new ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_new: v })} /><Label>New</Label></div>
                <div className="flex items-center gap-2"><Switch checked={editing.is_published ?? true} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} /><Label>Published</Label></div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={save}>{isNew ? "Create" : "Update"}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
