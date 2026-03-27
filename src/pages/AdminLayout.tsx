import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, FolderOpen, Package, MessageSquare, FileText,
  Info, LogOut, Menu, X, Palette, Layers,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/projects", label: "Projects", icon: FolderOpen },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/design-categories", label: "Design Categories", icon: Palette },
  { path: "/admin/design-ideas", label: "Design Ideas", icon: Layers },
  { path: "/admin/leads", label: "Leads", icon: MessageSquare },
  { path: "/admin/blog", label: "Blog Posts", icon: FileText },
  { path: "/admin/about", label: "About Content", icon: Info },
];

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin-login" replace />;

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r z-50 transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b">
          <Link to="/" className="font-heading font-bold text-lg text-primary">Dream Decor</Link>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
          <p className="text-xs text-muted-foreground mb-2 px-3">{user.email}</p>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-h-screen">
        <header className="sticky top-0 bg-card/80 backdrop-blur-sm border-b z-30 px-4 py-3 lg:hidden flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-bold">Admin Panel</span>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
