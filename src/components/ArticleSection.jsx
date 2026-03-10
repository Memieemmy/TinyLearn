import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import axios from "axios";
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

  const fetchPosts = async (category) => {
    setLoading(true);
    try {
      const params = {};
      if (category !== "Highlight") {
        params.category = category;
      }
      const res = await axios.get("https://blog-post-project-api.vercel.app/posts", { params });
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [selectedCategory]);

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
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
          <input type="text" placeholder="Search" className="outline-none text-sm bg-transparent" />
          <Search size={16} className="text-gray-400" />
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