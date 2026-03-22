import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ChevronLeft } from "lucide-react";

interface BlogPost {
  id: string; slug: string; title: string; excerpt: string | null;
  content: string | null; cover_image: string | null; author: string | null;
  category: string | null; tags: string[] | null; meta_title: string | null;
  meta_description: string | null; published_at: string | null;
}

// Simple markdown to HTML (headings, bold, links, paragraphs)
function renderMarkdown(md: string) {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
    .replace(/^/, '<p class="mb-4 leading-relaxed">')
    .concat("</p>");
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      supabase.from("blog_posts").select("*").eq("slug", slug).eq("is_published", true).maybeSingle()
        .then(({ data }) => setPost(data as BlogPost | null));
    }
  }, [slug]);

  if (!post) return (
    <div className="min-h-screen"><Header /><div className="flex items-center justify-center py-20"><p>Loading...</p></div><Footer /></div>
  );

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.excerpt || ""} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <article className="py-12">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm mb-6">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Blog
            </Link>
            {post.category && <Badge variant="secondary" className="mb-4">{post.category}</Badge>}
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
              {post.published_at && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(post.published_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>}
            </div>
            {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full rounded-xl mb-8 aspect-[16/9] object-cover" />}
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || "") }} />
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t flex flex-wrap gap-2">
                {post.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
              </div>
            )}
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
