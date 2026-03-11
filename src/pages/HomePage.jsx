import { NavBar, HeroSection, Footer } from "../components/components";
import { ArticleSection } from "../components/ArticleSection";

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="px-[120px] pt-[60px] pb-[120px] flex flex-col gap-[80px]">
        <HeroSection />
        <ArticleSection />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;