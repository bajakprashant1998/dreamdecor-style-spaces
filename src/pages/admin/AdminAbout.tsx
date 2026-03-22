import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface AboutSection {
  id: string;
  section_key: string;
  title: string | null;
  content: string | null;
  metadata: any;
}

export default function AdminAbout() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [edited, setEdited] = useState<Record<string, AboutSection>>({});
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("about_content").select("*").order("section_key");
    if (data) {
      setSections(data as AboutSection[]);
      const map: Record<string, AboutSection> = {};
      data.forEach((d: any) => { map[d.section_key] = d; });
      setEdited(map);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (key: string) => {
    const section = edited[key];
    if (!section) return;
    const { error } = await supabase.from("about_content")
      .update({ title: section.title, content: section.content, metadata: section.metadata })
      .eq("id", section.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: `"${key}" section updated!` });
  };

  const updateField = (key: string, field: keyof AboutSection, value: any) => {
    setEdited((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">About Page Content</h1>
      <div className="space-y-6">
        {Object.entries(edited).map(([key, section]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="text-lg capitalize">{key} Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={section.title || ""} onChange={(e) => updateField(key, "title", e.target.value)} />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea value={section.content || ""} onChange={(e) => updateField(key, "content", e.target.value)} rows={6} />
              </div>
              <Button onClick={() => save(key)} size="sm"><Save className="h-4 w-4 mr-2" /> Save {key}</Button>
            </CardContent>
          </Card>
        ))}
        {Object.keys(edited).length === 0 && <p className="text-muted-foreground text-center py-8">No about content sections found</p>}
      </div>
    </div>
  );
}
