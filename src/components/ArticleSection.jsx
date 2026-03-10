import { Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";

const tabs = ["Highlight", "Cat", "Inspiration", "General"];

const articles = [
  {
    image: "https://placehold.co/400x250",
    category: "Cat",
    title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
    description: "Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey.",
    author: "Thompson P.",
    date: "11 September 2024",
  },
  {
    image: "https://placehold.co/400x250",
    category: "Cat",
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    description: "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string.",
    author: "Thompson P.",
    date: "11 September 2024",
  },
];

export function ArticleSection() {
  return (
    <section className="px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest articles</h2>
      <div className="flex items-center justify-between border border-gray-200 rounded-2xl px-4 py-2">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button key={tab} className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100">
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
          <input type="text" placeholder="Search" className="outline-none text-sm bg-transparent" />
          <Search size={16} className="text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </section>
  );
}