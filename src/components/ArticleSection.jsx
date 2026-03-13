import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = ["Highlight", "Dev", "Ba", "IBIS", "Productive"];

const tabActiveColors = {
  Highlight: "bg-[#7C5CBF] text-white border-[#7C5CBF]",
  Dev: "bg-blue-500 text-white border-blue-500",
  Ba: "bg-orange-500 text-white border-orange-500",
  IBIS: "bg-violet-500 text-white border-violet-500",
  Productive: "bg-green-500 text-white border-green-500",
};

export function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async (category) => {
    setLoading(true);
    let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (category !== "Highlight") query = query.eq("category", category);
    const { data, error } = await query;
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  const fetchSearch = async (kw) => {
    if (!kw) return setSearchResults([]);
    const { data } = await supabase
      .from("posts")
      .select("id, title")
      .ilike("title", `%${kw}%`)
      .limit(5);
    setSearchResults(data || []);
  };

  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => fetchSearch(keyword), 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <section className="mt-2">
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-800">Latest articles</h2>

        {/* Search - Desktop */}
        <div className="hidden md:flex relative items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm w-64">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search articles..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="outline-none text-sm bg-transparent flex-1 min-w-0"
          />
          {searchResults.length > 0 && keyword && (
            <div className="absolute top-12 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl w-80 z-10 overflow-hidden">
              {searchResults.map((post) => (
                <div
                  key={post.id}
                  onClick={() => { navigate(`/post/${post.id}`); setKeyword(""); }}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                >
                  <p className="text-sm font-medium">{post.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category tabs - Desktop */}
      <div className="hidden md:flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedCategory(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
              selectedCategory === tab
                ? tabActiveColors[tab]
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Category select - Mobile */}
      <div className="flex md:hidden mb-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full bg-white rounded-xl">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab} value={tab}>{tab}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts - Bento Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-52">
          <div className="w-8 h-8 border-4 border-[#7C5CBF] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {posts[0] && (
            <div className="md:col-span-2">
              <ArticleCard {...posts[0]} date={posts[0].created_at} featured />
            </div>
          )}
          {posts[1] && (
            <div>
              <ArticleCard {...posts[1]} date={posts[1].created_at} />
            </div>
          )}
          {posts.slice(2).map((post) => (
            <ArticleCard key={post.id} {...post} date={post.created_at} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-400">No articles found.</p>
      )}
    </section>
  );
}
