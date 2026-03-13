import { NavBar, HeroSection, Footer } from "../components/components";
import { ArticleSection } from "../components/ArticleSection";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#EDE9F6]">
      <NavBar />
      <div className="px-6 md:px-[80px] pt-8 pb-16 flex flex-col gap-6">
        <HeroSection />
        <ArticleSection />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;