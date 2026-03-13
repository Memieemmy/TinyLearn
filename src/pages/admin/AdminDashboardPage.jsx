import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FileText, Users, Eye, TrendingUp } from "lucide-react";
import AdminLayout from "./AdminLayout";

const stats = [
  { label: "Total Posts", value: "120+", icon: FileText, bg: "bg-violet-100", color: "text-violet-600" },
  { label: "Total Members", value: "128", icon: Users, bg: "bg-blue-100", color: "text-blue-600" },
  { label: "Views This Month", value: "8.4k", icon: Eye, bg: "bg-green-100", color: "text-green-600" },
  { label: "Growth", value: "+12%", icon: TrendingUp, bg: "bg-orange-100", color: "text-orange-600" },
];

function AdminDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://blog-post-project-api.vercel.app/posts?page=1&limit=5")
      .then((res) => setPosts(res.data.posts || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, bg, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className={`inline-flex p-2.5 rounded-xl ${bg} ${color} mb-4`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Posts</h3>
            <Link to="/admin/posts" className="text-sm text-[#7C5CBF] hover:text-[#5A3E99] transition">
              View all →
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-6 h-6 border-4 border-[#7C5CBF] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.image || "https://placehold.co/40x40"}
                      alt={post.title}
                      className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[400px]">{post.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{post.category} · {post.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {post.date ? new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : ""}
                    </span>
                    <span className="text-xs px-2.5 py-1 bg-green-100 text-green-600 rounded-full font-medium">
                      Published
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Link
            to="/admin/members"
            className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition group"
          >
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-200 transition">
              <Users size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Manage Members</p>
              <p className="text-sm text-gray-400 mt-0.5">View and manage user accounts</p>
            </div>
          </Link>
          <Link
            to="/admin/posts"
            className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition group"
          >
            <div className="p-3 bg-violet-100 rounded-xl text-violet-600 group-hover:bg-violet-200 transition">
              <FileText size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Manage Posts</p>
              <p className="text-sm text-gray-400 mt-0.5">View, edit and publish articles</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;
