export function ArticleCard({ image, category, title, description, author, date }) {
    return (
      <div className="rounded-2xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-2xl" />
        <div className="py-4">
          <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">{category}</span>
          <h3 className="text-lg font-bold mt-2">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2 mt-3">
            <img src="https://placehold.co/24x24" alt={author} className="rounded-full w-6 h-6" />
            <span className="text-sm text-gray-500">{author}</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-400">{date}</span>
          </div>
        </div>
      </div>
    );
  }