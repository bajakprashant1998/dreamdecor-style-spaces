import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string; slug: string; title: string; excerpt: string | null;
  cover_image: string | null; author: string | null; category: string | null;
  tags: string[] | null; published_at: string | null;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    supabase.from("blog_posts").select("*").eq("is_published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => { if (data) setPosts(data as BlogPost[]); });
  }, []);

  return (
    <>
      <Helmet>
        <title>Interior Design Blog | Dream Decor Furniture Jamnagar</title>
        <meta name="description" content="Read expert interior design tips, trends, and inspiration from Dream Decor Furniture. Transform your home with our design insights." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-heading font-bold mb-2">Interior Design Blog</h1>
            <p className="text-muted-foreground text-lg mb-10">Expert tips, trends & inspiration for your home</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full">
                    {post.cover_image && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <CardContent className="p-5">
                      {post.category && <Badge variant="secondary" className="mb-3">{post.category}</Badge>}
                      <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
                        {post.published_at && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(post.published_at).toLocaleDateString("en-IN")}</span>}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {posts.length === 0 && <p className="text-center text-muted-foreground py-16">No blog posts yet. Check back soon!</p>}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
