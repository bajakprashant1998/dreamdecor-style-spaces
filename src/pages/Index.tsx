import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductSection from "@/components/ProductSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import InspirationGallery from "@/components/InspirationGallery";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <HeroBanner />

        <CategoryGrid />

        <ProductSection
          title="Trending Now"
          subtitle="What's Hot"
          filter={(p) => p.badge === "Trending" || p.badge === "New" || p.badge === "Hot Deal"}
        />

        <div className="bg-secondary/30">
          <ProductSection
            title="Bestsellers"
            subtitle="Customer Favorites"
            filter={(p) => p.badge === "Bestseller" || p.rating >= 4.5}
          />
        </div>

        <WhyChooseUs />

        <Testimonials />

        <InspirationGallery />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
