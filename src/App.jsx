import { NavBar, HeroSection, Footer } from "./components/components";
import { ArticleSection } from "./components/ArticleSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<ViewPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;