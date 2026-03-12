import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search, Eye, Trash2, FilePlus, ChevronLeft, ChevronRight } from "lucide-react";
import AdminLayout from "./AdminLayout";

function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ["All", "Highlight", "Cat", "Inspiration", "General"];

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 8 };
    if (filterCategory !== "All") params.category = filterCategory;
    axios
      .get("https://blog-post-project-api.vercel.app/posts", { params })
      .then((res) => {
        setPosts(res.data.posts || []);
        if (res.data.totalPages) setTotalPages(res.data.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, filterCategory]);

  const handleCategoryChange = (cat) => {
    setFilterCategory(cat);
    setPage(1);
  };

  const filtered = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
            <p className="text-gray-500 text-sm mt-1">Manage all blog articles</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition">
            <FilePlus size={15} />
            New Post
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          {/* Filters */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 flex-wrap">
            <div className="relative flex-1 max-w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm outline-none border border-gray-200 focus:border-gray-400 transition"
              />
            </div>
            <div className="flex gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                    ${filterCategory === cat
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Post</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Category</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Author</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Date</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-14 text-center text-gray-400 text-sm">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-14 text-center text-gray-400 text-sm">
                    No posts found
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.image || "https://placehold.co/40x40"}
                          alt={post.title}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <p className="text-sm font-medium text-gray-900 max-w-[260px] truncate">
                          {post.title}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm text-gray-600">{post.author}</p>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm text-gray-500">
                        {post.date
                          ? new Date(post.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </p>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs px-2.5 py-1 bg-green-100 text-green-600 rounded-full font-medium">
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/post/${post.id}`}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                          title="View"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition
                    ${page === n
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                    }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPostsPage;
