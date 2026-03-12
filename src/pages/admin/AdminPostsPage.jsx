import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Search, Eye, Trash2, FilePlus, ChevronLeft, ChevronRight, X, ImagePlus } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import AdminLayout from "./AdminLayout";

const LIMIT = 8;
const CATEGORIES = ["Highlight", "Cat", "Inspiration", "General"];

// ── New Post Modal ─────────────────────────────────────────────
function NewPostModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", category: "General", author: "" });
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !content) {
      setError("กรุณากรอก Title, Author และ Content");
      return;
    }
    setLoading(true);

    let imageUrl = null;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const filename = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filename, imageFile);
      if (uploadError) {
        setError("อัปโหลดรูปไม่สำเร็จ");
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("post-images").getPublicUrl(filename);
      imageUrl = urlData.publicUrl;
    }

    const { data, error: insertError } = await supabase
      .from("posts")
      .insert([{ ...form, content, image: imageUrl }])
      .select()
      .single();

    setLoading(false);
    if (insertError) {
      setError("บันทึกไม่สำเร็จ");
    } else {
      onAdd(data);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-amber-500 text-xs font-medium">Admin panel</p>
            <h3 className="text-xl font-bold text-gray-900">New Post</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Image Upload */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Cover Image</label>
            <label className="cursor-pointer block">
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} className="w-full h-48 object-cover rounded-xl" />
                  <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <p className="text-white text-sm font-medium">เปลี่ยนรูป</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-gray-400 hover:text-gray-600 transition bg-gray-50">
                  <ImagePlus size={28} />
                  <p className="text-sm">คลิกเพื่ออัปโหลดรูป</p>
                </div>
              )}
            </label>
          </div>

          {/* Title & Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Post title"
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Author *</label>
              <input
                required
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Author name"
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
          </div>

          {/* Description & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Description</label>
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description"
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Markdown Content */}
          <div data-color-mode="light">
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Content (Markdown) *</label>
            <MDEditor
              value={content}
              onChange={setContent}
              height={360}
              preview="live"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const categories = ["All", ...CATEGORIES];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const from = (page - 1) * LIMIT;
      const to = from + LIMIT - 1;

      let query = supabase
        .from("posts")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (filterCategory !== "All") query = query.eq("category", filterCategory);

      const { data, count, error } = await query;
      if (!error) {
        setPosts(data || []);
        setTotalPages(Math.ceil(count / LIMIT) || 1);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [page, filterCategory]);

  const handleDelete = async (id) => {
    await supabase.from("posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCategoryChange = (cat) => {
    setFilterCategory(cat);
    setPage(1);
  };

  const handleAdd = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const filtered = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {showModal && <NewPostModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      <div className="px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
            <p className="text-gray-500 text-sm mt-1">Manage all blog articles</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition"
          >
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
                  <td colSpan="6" className="px-6 py-14 text-center text-gray-400 text-sm">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-14 text-center text-gray-400 text-sm">No posts found</td>
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
                        <p className="text-sm font-medium text-gray-900 max-w-[260px] truncate">{post.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{post.category}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm text-gray-600">{post.author}</p>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString("en-GB", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs px-2.5 py-1 bg-green-100 text-green-600 rounded-full font-medium">Published</span>
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
                          onClick={() => handleDelete(post.id)}
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
            <p className="text-xs text-gray-400">Page {page} of {totalPages}</p>
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
                    ${page === n ? "bg-gray-900 text-white" : "border border-gray-200 hover:bg-gray-50 text-gray-600"}`}
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
