import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  overview: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean | null;
  sort_order: number | null;
  created_at: string | null;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    if (data) setProjects(data as Project[]);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      slug: editing.slug || "",
      title: editing.title || "",
      tagline: editing.tagline,
      location: editing.location,
      area: editing.area,
      type: editing.type || "Residential",
      completion_year: editing.completion_year,
      description: editing.description,
      hero_image: editing.hero_image,
      overview: editing.overview,
      meta_title: editing.meta_title,
      meta_description: editing.meta_description,
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => { setIsNew(true); setEditing({ is_published: true, sort_order: 0, type: "Residential" }); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4 flex items-center gap-4">
              {p.hero_image && (
                <img src={p.hero_image} alt={p.title} className="w-20 h-14 object-cover rounded" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.location} • {p.type}</p>
              </div>
              <Badge variant={p.is_published ? "default" : "secondary"}>
                {p.is_published ? "Published" : "Draft"}
              </Badge>
              <div className="flex gap-2">
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add Project" : "Edit Project"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Title *</Label><Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
                <div><Label>Slug *</Label><Input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="my-project-slug" /></div>
              </div>
              <div><Label>Tagline</Label><Input value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>Location</Label><Input value={editing.location || ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></div>
                <div><Label>Area</Label><Input value={editing.area || ""} onChange={(e) => setEditing({ ...editing, area: e.target.value })} /></div>
                <div><Label>Type</Label><Input value={editing.type || ""} onChange={(e) => setEditing({ ...editing, type: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Completion Year</Label><Input value={editing.completion_year || ""} onChange={(e) => setEditing({ ...editing, completion_year: e.target.value })} /></div>
                <div><Label>Sort Order</Label><Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} /></div>
              </div>
              <div><Label>Hero Image URL</Label><Input value={editing.hero_image || ""} onChange={(e) => setEditing({ ...editing, hero_image: e.target.value })} /></div>
              <div><Label>Short Description</Label><Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} /></div>
              <div><Label>Full Overview</Label><Textarea value={editing.overview || ""} onChange={(e) => setEditing({ ...editing, overview: e.target.value })} rows={5} /></div>
              <div><Label>Meta Title</Label><Input value={editing.meta_title || ""} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} /></div>
              <div><Label>Meta Description</Label><Textarea value={editing.meta_description || ""} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} rows={2} /></div>
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
