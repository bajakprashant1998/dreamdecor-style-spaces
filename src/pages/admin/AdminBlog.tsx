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

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author: string | null;
  category: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string | null;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data as BlogPost[]);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      slug: editing.slug || "",
      title: editing.title || "",
      excerpt: editing.excerpt,
      content: editing.content,
      cover_image: editing.cover_image,
      author: editing.author || "Dream Decor Team",
      category: editing.category,
      tags: editing.tags || [],
      meta_title: editing.meta_title,
      meta_description: editing.meta_description,
      is_published: editing.is_published ?? false,
      published_at: editing.is_published ? new Date().toISOString() : null,
    };

    if (isNew) {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id!);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: isNew ? "Post created!" : "Post updated!" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast({ title: "Post deleted" });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button onClick={() => { setIsNew(true); setEditing({ is_published: false, author: "Dream Decor Team" }); }}>
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4 flex items-center gap-4">
              {p.cover_image && <img src={p.cover_image} alt={p.title} className="w-20 h-14 object-cover rounded" />}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.author} • {p.category}</p>
              </div>
              <Badge variant={p.is_published ? "default" : "secondary"}>{p.is_published ? "Published" : "Draft"}</Badge>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => { setIsNew(false); setEditing(p); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground text-center py-8">No blog posts yet</p>}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{isNew ? "New Blog Post" : "Edit Blog Post"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Title *</Label><Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
                <div><Label>Slug *</Label><Input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Author</Label><Input value={editing.author || ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} /></div>
                <div><Label>Category</Label><Input value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></div>
                <div><Label>Tags (comma separated)</Label><Input value={(editing.tags || []).join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })} /></div>
              </div>
              <div><Label>Cover Image URL</Label><Input value={editing.cover_image || ""} onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })} /></div>
              <div><Label>Excerpt</Label><Textarea value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} /></div>
              <div><Label>Content (Markdown)</Label><Textarea value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={15} className="font-mono text-sm" /></div>
              <div><Label>Meta Title</Label><Input value={editing.meta_title || ""} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} /></div>
              <div><Label>Meta Description</Label><Textarea value={editing.meta_description || ""} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} rows={2} /></div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_published ?? false} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
                <Label>Publish immediately</Label>
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
