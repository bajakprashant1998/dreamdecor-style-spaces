import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import TurnkeyProjects from "./pages/TurnkeyProjects";
import ProjectDetailPage from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminDesignCategories from "./pages/admin/AdminDesignCategories";
import AdminDesignIdeas from "./pages/admin/AdminDesignIdeas";
import AdminCatalogues from "./pages/admin/AdminCatalogues";
import DesignIdeas from "./pages/DesignIdeas";
import DesignIdeaCategory from "./pages/DesignIdeaCategory";
import DesignIdeaDetail from "./pages/DesignIdeaDetail";
import Catalogue from "./pages/Catalogue";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/turnkey-projects" element={<TurnkeyProjects />} />
              <Route path="/project/:slug" element={<ProjectDetailPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/design-ideas" element={<DesignIdeas />} />
              <Route path="/design-ideas/:categorySlug" element={<DesignIdeaCategory />} />
              <Route path="/design-ideas/:categorySlug/designs/:designSlug" element={<DesignIdeaDetail />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="about" element={<AdminAbout />} />
                <Route path="design-categories" element={<AdminDesignCategories />} />
                <Route path="design-ideas" element={<AdminDesignIdeas />} />
                <Route path="catalogues" element={<AdminCatalogues />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
