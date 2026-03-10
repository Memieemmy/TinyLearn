import { useState } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import blogPosts from "../data/blogPosts";
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {blogPosts
        .filter((post) => selectedCategory === "Highlight" || post.category === selectedCategory)
        .map((post, index) => (
    <ArticleCard key={index} {...post} />
  ))}
      </div>
    </section>
  );
}