import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Package, MessageSquare, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, products: 0, leads: 0, blogs: 0 });

  useEffect(() => {
    const load = async () => {
      const [p1, p2, p3, p4] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        projects: p1.count || 0, products: p2.count || 0,
        leads: p3.count || 0, blogs: p4.count || 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Projects", count: counts.projects, icon: FolderOpen, color: "text-blue-600" },
    { label: "Products", count: counts.products, icon: Package, color: "text-green-600" },
    { label: "Leads", count: counts.leads, icon: MessageSquare, color: "text-orange-600" },
    { label: "Blog Posts", count: counts.blogs, icon: FileText, color: "text-purple-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
                <Icon className={`h-5 w-5 ${c.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{c.count}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
