import { useNavigate } from "react-router-dom";

const categoryColors = {
  Dev: { bg: "bg-blue-100", text: "text-blue-700" },
  Ba: { bg: "bg-orange-100", text: "text-orange-700" },
  IBIS: { bg: "bg-violet-100", text: "text-violet-700" },
  Productive: { bg: "bg-green-100", text: "text-green-700" },
  Cat: { bg: "bg-pink-100", text: "text-pink-700" },
  Inspiration: { bg: "bg-yellow-100", text: "text-yellow-700" },
  General: { bg: "bg-gray-100", text: "text-gray-700" },
};

export function ArticleCard({ id, image, category, title, description, author, date, featured }) {
  const navigate = useNavigate();
  const colors = categoryColors[category] || { bg: "bg-gray-100", text: "text-gray-700" };

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (featured) {
    return (
      <div
        className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 h-full flex"
        onClick={() => navigate(`/post/${id}`)}
      >
        <img src={image} alt={title} className="w-64 object-cover flex-shrink-0" />
        <div className="p-6 flex flex-col justify-center">
          <span className={`text-xs px-3 py-1 rounded-full font-medium inline-block w-fit ${colors.bg} ${colors.text}`}>
            {category}
          </span>
          <h3 className="text-2xl font-bold mt-3 leading-snug">{title}</h3>
          <p className="text-gray-500 text-sm mt-2 line-clamp-3">{description}</p>
          <div className="flex items-center gap-2 mt-5">
            <img src="https://placehold.co/24x24" alt={author} className="rounded-full w-6 h-6" />
            <span className="text-sm text-gray-500">{author}</span>
            <span className="text-gray-200">|</span>
            <span className="text-sm text-gray-400">{formattedDate}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col"
      onClick={() => navigate(`/post/${id}`)}
    >
      <img src={image} alt={title} className="w-full h-44 object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <span className={`text-xs px-3 py-1 rounded-full font-medium inline-block w-fit ${colors.bg} ${colors.text}`}>
          {category}
        </span>
        <h3 className="text-base font-bold mt-2 leading-snug">{title}</h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2 flex-1">{description}</p>
        <div className="flex items-center gap-2 mt-3">
          <img src="https://placehold.co/24x24" alt={author} className="rounded-full w-6 h-6" />
          <span className="text-xs text-gray-500">{author}</span>
          <span className="text-gray-200">|</span>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
