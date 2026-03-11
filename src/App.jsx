import { NavBar, HeroSection, Footer } from "./components/components";
import { ArticleSection } from "./components/ArticleSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="bottom-right" richColors /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<ViewPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;