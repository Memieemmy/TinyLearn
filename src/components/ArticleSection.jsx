import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = ["Highlight", "Cat", "Inspiration", "General"];

export function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async (category) => {
    setLoading(true);
    try {
      const params = {};
      if (category !== "Highlight") params.category = category;
      const res = await axios.get("https://blog-post-project-api.vercel.app/posts", { params });
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchSearch = async (kw) => {
    if (!kw) return setSearchResults([]);
    try {
      const res = await axios.get("https://blog-post-project-api.vercel.app/posts", {
        params: { keyword: kw },
      });
      setSearchResults(res.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearch(keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest articles</h2>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              disabled={selectedCategory === tab}
              onClick={() => setSelectedCategory(tab)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors
                ${selectedCategory === tab
                  ? "bg-gray-800 text-white border-gray-800 cursor-not-allowed"
                  : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="outline-none text-sm bg-transparent"
          />
          <Search size={16} className="text-gray-400" />
          {searchResults.length > 0 && keyword && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg w-80 z-10">
              {searchResults.map((post) => (
                <div
                  key={post.id}
                  onClick={() => { navigate(`/post/${post.id}`); setKeyword(""); }}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 rounded-2xl"
                >
                  <p className="text-sm font-medium">{post.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab} value={tab}>
                {tab}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-center mt-8 text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {posts.map((post, index) => (
            <ArticleCard key={index} {...post} />
          ))}
        </div>
      )}
    </section>
  );
}