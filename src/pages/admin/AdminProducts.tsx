import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, X, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  subcategory: string | null;
  product_type: string | null;
  price: number;
  original_price: number | null;
  description: string | null;
  short_description: string | null;
  images: string[];
  material: string | null;
  style: string | null;
  color: string | null;
  dimensions: string | null;
  weight: string | null;
  badge: string | null;
  sku: string | null;
  brand: string | null;
  model: string | null;
  video_url: string | null;
  brochure_url: string | null;
  stock_quantity: number | null;
  low_stock_alert: number | null;
  warehouse_location: string | null;
  delivery_time: string | null;
  shipping_weight: string | null;
  return_policy: string | null;
  warranty: string | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  interior_tags: string[] | null;
  rating: number | null;
  review_count: number | null;
  in_stock: boolean | null;
  is_featured: boolean | null;
  is_bestseller: boolean | null;
  is_new: boolean | null;
  is_published: boolean | null;
  status: string | null;
  sort_order: number | null;
  specifications: Record<string, string> | null;
}

const CATEGORIES = [
  "Living Room", "Bedroom", "Dining", "Office", "Kitchen", "Bathroom", "Decor", "Outdoor"
];

const PRODUCT_TYPES = [
  "Sofa", "Chair", "Table", "Bed", "Wardrobe", "Bookshelf", "Cabinet", "Desk",
  "Dining Set", "Side Table", "TV Unit", "Shoe Rack", "Dressing Table", "Other"
];

const MATERIALS = [
  "Teak Wood", "Sheesham Wood", "Mango Wood", "Engineered Wood", "Plywood",
  "Metal", "Glass", "Marble", "Fabric", "Leather", "Velvet", "Rattan", "Other"
];

const STYLES = [
  "Modern", "Traditional", "Contemporary", "Minimalist", "Rustic",
  "Industrial", "Bohemian", "Art Deco", "Scandinavian", "Indian Classic"
];

const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;

const generateSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order");
    if (data) {
      setProducts(data.map((p: any) => ({
        ...p,
        images: Array.isArray(p.images) ? p.images : [],
        interior_tags: Array.isArray(p.interior_tags) ? p.interior_tags : [],
        specifications: typeof p.specifications === 'object' && p.specifications ? p.specifications : {},
      })));
    }
  };

  useEffect(() => { load(); }, []);

  const handleImageUpload = async (files: FileList) => {
    if (!files.length) return;
    const currentImages = (editing?.images as string[]) || [];
    if (currentImages.length + files.length > 10) {
      toast({ title: "Maximum 10 images allowed", variant: "destructive" });
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) {
        toast({ title: "Upload failed", description: error.message, variant: "destructive" });
        continue;
      }
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
      newUrls.push(urlData.publicUrl);
    }

    setEditing(prev => prev ? { ...prev, images: [...currentImages, ...newUrls] } : null);
    setUploading(false);
    toast({ title: `${newUrls.length} image(s) uploaded` });
  };

  const removeImage = (index: number) => {
    const imgs = [...((editing?.images as string[]) || [])];
    imgs.splice(index, 1);
    setEditing(prev => prev ? { ...prev, images: imgs } : null);
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    const tags = [...((editing?.interior_tags as string[]) || []), tagInput.trim()];
    setEditing(prev => prev ? { ...prev, interior_tags: tags } : null);
    setTagInput("");
  };

  const removeTag = (index: number) => {
    const tags = [...((editing?.interior_tags as string[]) || [])];
    tags.splice(index, 1);
    setEditing(prev => prev ? { ...prev, interior_tags: tags } : null);
  };

  const save = async () => {
    if (!editing?.name) {
      toast({ title: "Product name is required", variant: "destructive" });
      return;
    }

    const slug = editing.slug || generateSlug(editing.name);
    const payload: any = {
      name: editing.name,
      slug,
      category: editing.category || null,
      subcategory: editing.subcategory || null,
      product_type: editing.product_type || null,
      price: editing.price || 0,
      original_price: editing.original_price || null,
      description: editing.description || null,
      short_description: editing.short_description || null,
      images: editing.images || [],
      material: editing.material || null,
      style: editing.style || null,
      color: editing.color || null,
      dimensions: editing.dimensions || null,
      weight: editing.weight || null,
      badge: editing.badge || null,
      sku: editing.sku || null,
      brand: editing.brand || null,
      model: editing.model || null,
      video_url: editing.video_url || null,
      brochure_url: editing.brochure_url || null,
      stock_quantity: editing.stock_quantity ?? 0,
      low_stock_alert: editing.low_stock_alert ?? 5,
      warehouse_location: editing.warehouse_location || null,
      delivery_time: editing.delivery_time || "5-7 business days",
      shipping_weight: editing.shipping_weight || null,
      return_policy: editing.return_policy || "7-day return policy",
      warranty: editing.warranty || null,
      meta_title: editing.meta_title || null,
      meta_description: editing.meta_description || null,
      focus_keyword: editing.focus_keyword || null,
      interior_tags: editing.interior_tags || [],
      specifications: editing.specifications || {},
      in_stock: editing.in_stock ?? true,
      is_featured: editing.is_featured ?? false,
      is_bestseller: editing.is_bestseller ?? false,
      is_new: editing.is_new ?? false,
      is_published: editing.is_published ?? true,
      status: editing.status || "published",
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
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    load();
  };

  const openNew = () => {
    setIsNew(true);
    setEditing({
      is_published: true,
      in_stock: true,
      price: 0,
      stock_quantity: 0,
      low_stock_alert: 5,
      images: [],
      interior_tags: [],
      specifications: {},
      status: "published",
      delivery_time: "5-7 business days",
      return_policy: "7-day return policy",
    });
  };

  const Field = ({ label, children, span }: { label: string; children: React.ReactNode; span?: string }) => (
    <div className={span || ""}>
      <Label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</Label>
      {children}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">{products.length} products</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4 flex items-center gap-4">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary shrink-0">
                {(p.images as string[])?.length > 0 ? (
                  <img src={(p.images as string[])[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{p.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {p.category} • {formatPrice(p.price)}
                  {p.original_price ? <span className="line-through ml-2">{formatPrice(p.original_price)}</span> : null}
                  {p.sku ? ` • SKU: ${p.sku}` : ""}
                </p>
                <p className="text-xs text-muted-foreground">Stock: {p.stock_quantity ?? 0} • {p.brand || "No brand"}</p>
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
                <Button variant="ghost" size="icon" onClick={() => { setIsNew(false); setEditing({ ...p }); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(p.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {products.length === 0 && <p className="text-muted-foreground text-center py-8">No products yet. Click "Add Product" to create one.</p>}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{isNew ? "Add Product" : "Edit Product"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <Tabs defaultValue="basic" className="mt-2">
              <TabsList className="grid grid-cols-6 w-full">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="specs">Specs</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              {/* ===== BASIC INFO ===== */}
              <TabsContent value="basic" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Product Name *" span="col-span-2">
                      <Input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value, slug: generateSlug(e.target.value) })} placeholder="e.g. Royal Teak Wood Sofa Set" />
                    </Field>
                    <Field label="URL Slug">
                      <Input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-generated-from-name" />
                    </Field>
                    <Field label="Product Status">
                      <Select value={editing.status || "published"} onValueChange={(v) => setEditing({ ...editing, status: v, is_published: v === "published" })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <div className="space-y-4">
                    <Field label="Short Description">
                      <Input value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} placeholder="Brief one-line summary" />
                    </Field>
                    <Field label="Full Description">
                      <Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={5} placeholder="Detailed product description..." />
                    </Field>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Category & Product Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Category">
                      <Select value={editing.category || ""} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Product Type">
                      <Select value={editing.product_type || ""} onValueChange={(v) => setEditing({ ...editing, product_type: v })}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {PRODUCT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Pricing & Identification</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <Field label="SKU">
                      <Input value={editing.sku || ""} onChange={(e) => setEditing({ ...editing, sku: e.target.value })} placeholder="SKU-001" />
                    </Field>
                    <Field label="Brand">
                      <Input value={editing.brand || ""} onChange={(e) => setEditing({ ...editing, brand: e.target.value })} placeholder="Brand name" />
                    </Field>
                    <Field label="Model">
                      <Input value={editing.model || ""} onChange={(e) => setEditing({ ...editing, model: e.target.value })} placeholder="Model number" />
                    </Field>
                    <Field label="Badge">
                      <Input value={editing.badge || ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} placeholder="e.g. Sale, Hot" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Field label="Selling Price (₹) *">
                      <Input type="number" value={editing.price || 0} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} />
                    </Field>
                    <Field label="Original / MRP (₹)">
                      <Input type="number" value={editing.original_price || ""} onChange={(e) => setEditing({ ...editing, original_price: parseFloat(e.target.value) || null })} placeholder="For showing discount" />
                    </Field>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Flags</h3>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2"><Switch checked={editing.in_stock ?? true} onCheckedChange={(v) => setEditing({ ...editing, in_stock: v })} /><Label>In Stock</Label></div>
                    <div className="flex items-center gap-2"><Switch checked={editing.is_featured ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_featured: v })} /><Label>Featured</Label></div>
                    <div className="flex items-center gap-2"><Switch checked={editing.is_bestseller ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_bestseller: v })} /><Label>Bestseller</Label></div>
                    <div className="flex items-center gap-2"><Switch checked={editing.is_new ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_new: v })} /><Label>New Arrival</Label></div>
                  </div>
                </div>
              </TabsContent>

              {/* ===== MEDIA ===== */}
              <TabsContent value="media" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-3">Product Images (Max 10)</h3>
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {((editing.images as string[]) || []).map((url, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border bg-secondary group">
                        <img src={url} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {i === 0 && <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-[9px] px-1.5 py-0.5 rounded">Main</span>}
                      </div>
                    ))}
                    {((editing.images as string[]) || []).length < 10 && (
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        disabled={uploading}
                      >
                        <Upload className="h-5 w-5" />
                        <span className="text-[10px]">{uploading ? "Uploading..." : "Upload"}</span>
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  />
                  <p className="text-xs text-muted-foreground">First image will be the main product image. Drag to reorder (coming soon).</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Video URL">
                    <Input value={editing.video_url || ""} onChange={(e) => setEditing({ ...editing, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
                  </Field>
                  <Field label="PDF / Brochure URL">
                    <Input value={editing.brochure_url || ""} onChange={(e) => setEditing({ ...editing, brochure_url: e.target.value })} placeholder="https://example.com/brochure.pdf" />
                  </Field>
                </div>
              </TabsContent>

              {/* ===== SPECIFICATIONS ===== */}
              <TabsContent value="specs" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-3">Dimensions & Weight</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Dimensions (L × W × H)">
                      <Input value={editing.dimensions || ""} onChange={(e) => setEditing({ ...editing, dimensions: e.target.value })} placeholder="e.g. 72 × 36 × 30 inches" />
                    </Field>
                    <Field label="Weight">
                      <Input value={editing.weight || ""} onChange={(e) => setEditing({ ...editing, weight: e.target.value })} placeholder="e.g. 45 kg" />
                    </Field>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Material & Style</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Field label="Material">
                      <Select value={editing.material || ""} onValueChange={(v) => setEditing({ ...editing, material: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {MATERIALS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Style">
                      <Select value={editing.style || ""} onValueChange={(v) => setEditing({ ...editing, style: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {STYLES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Color">
                      <Input value={editing.color || ""} onChange={(e) => setEditing({ ...editing, color: e.target.value })} placeholder="e.g. Walnut Brown" />
                    </Field>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Interior Tags</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {((editing.interior_tags as string[]) || []).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="gap-1">
                        {tag}
                        <button onClick={() => removeTag(i)}><X className="h-3 w-3" /></button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag (e.g. living-room, luxury)"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button variant="outline" onClick={addTag}>Add</Button>
                  </div>
                </div>
              </TabsContent>

              {/* ===== INVENTORY ===== */}
              <TabsContent value="inventory" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-3">Stock Management</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Stock Quantity *">
                      <Input type="number" value={editing.stock_quantity ?? 0} onChange={(e) => setEditing({ ...editing, stock_quantity: parseInt(e.target.value) || 0 })} />
                    </Field>
                    <Field label="Low Stock Alert">
                      <Input type="number" value={editing.low_stock_alert ?? 5} onChange={(e) => setEditing({ ...editing, low_stock_alert: parseInt(e.target.value) || 5 })} placeholder="e.g. 5" />
                    </Field>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">SKU & Warehouse</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="SKU">
                      <Input value={editing.sku || ""} onChange={(e) => setEditing({ ...editing, sku: e.target.value })} placeholder="SKU-001" />
                    </Field>
                    <Field label="Warehouse Location">
                      <Input value={editing.warehouse_location || ""} onChange={(e) => setEditing({ ...editing, warehouse_location: e.target.value })} placeholder="Warehouse A, Rack 3" />
                    </Field>
                  </div>
                </div>
              </TabsContent>

              {/* ===== SHIPPING ===== */}
              <TabsContent value="shipping" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-3">Shipping & Returns</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Delivery Time">
                      <Input value={editing.delivery_time || ""} onChange={(e) => setEditing({ ...editing, delivery_time: e.target.value })} placeholder="5-7 business days" />
                    </Field>
                    <Field label="Shipping Weight">
                      <Input value={editing.shipping_weight || ""} onChange={(e) => setEditing({ ...editing, shipping_weight: e.target.value })} placeholder="e.g. 10 kg" />
                    </Field>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Field label="Return Policy">
                    <Textarea value={editing.return_policy || ""} onChange={(e) => setEditing({ ...editing, return_policy: e.target.value })} rows={3} placeholder="30-day return policy..." />
                  </Field>
                  <Field label="Warranty">
                    <Input value={editing.warranty || ""} onChange={(e) => setEditing({ ...editing, warranty: e.target.value })} placeholder="e.g. 1 year manufacturer warranty" />
                  </Field>
                </div>
              </TabsContent>

              {/* ===== SEO ===== */}
              <TabsContent value="seo" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-3">SEO Optimization</h3>
                  <div className="space-y-4">
                    <Field label="Meta Title">
                      <Input
                        value={editing.meta_title || ""}
                        onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })}
                        placeholder="SEO-friendly title (max 60 chars)"
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground mt-1">{(editing.meta_title || "").length}/60</p>
                    </Field>
                    <Field label="Meta Description">
                      <Textarea
                        value={editing.meta_description || ""}
                        onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })}
                        placeholder="SEO-friendly description (max 160 chars)"
                        maxLength={160}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">{(editing.meta_description || "").length}/160</p>
                    </Field>
                    <Field label="Focus Keyword">
                      <Input value={editing.focus_keyword || ""} onChange={(e) => setEditing({ ...editing, focus_keyword: e.target.value })} placeholder="e.g. teak wood sofa" />
                    </Field>
                    <Field label="URL Slug">
                      <Input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-generated-from-name" />
                    </Field>
                  </div>
                </div>
              </TabsContent>

              {/* Save/Cancel */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={save}>{isNew ? "Create Product" : "Update Product"}</Button>
              </div>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
