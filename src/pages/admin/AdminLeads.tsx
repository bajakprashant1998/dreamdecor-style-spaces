import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Phone, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Lead {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  preferred_date: string | null;
  message: string | null;
  source: string | null;
  project_reference: string | null;
  status: string | null;
  created_at: string | null;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (data) setLeads(data as Lead[]);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await supabase.from("leads").delete().eq("id", id);
    toast({ title: "Lead deleted" });
    load();
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    converted: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Leads ({leads.length})</h1>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold">{lead.name}</h3>
                    <Badge className={statusColors[lead.status || "new"] || ""}>{lead.status || "new"}</Badge>
                    {lead.project_reference && <Badge variant="outline" className="text-xs">{lead.project_reference}</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {lead.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {lead.phone}</span>}
                    {lead.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {lead.email}</span>}
                    {lead.preferred_date && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {lead.preferred_date}</span>}
                  </div>
                  {lead.message && <p className="mt-2 text-sm">{lead.message}</p>}
                  <p className="text-xs text-muted-foreground mt-2">{new Date(lead.created_at || "").toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={lead.status || "new"} onValueChange={(v) => updateStatus(lead.id, v)}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => remove(lead.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {leads.length === 0 && <p className="text-muted-foreground text-center py-8">No leads yet</p>}
      </div>
    </div>
  );
}
