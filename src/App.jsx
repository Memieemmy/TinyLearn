import { NavBar, HeroSection, Footer } from "./components/components";
import { ArticleSection } from "./components/ArticleSection";

function App() {
  return (
    <div className="px-[120px] pt-[60px] pb-[120px] flex flex-col gap-[80px]">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
}

export default App;