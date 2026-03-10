import { Search } from "lucide-react";

const tabs = ["Highlight", "Cat", "Inspiration", "General"];

export function ArticleSection() {
  return (
    <section className="px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest articles</h2>
      <div className="flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm bg-transparent"
          />
          <Search size={16} className="text-gray-400" />
        </div>
      </div>
    </section>
  );
}
