import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Users, FileText, LogOut } from "lucide-react";

const navItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/members", icon: Users, label: "Members" },
  { path: "/admin/posts", icon: FileText, label: "Posts" },
];

function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#EDE9F6]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#4A2E8A] text-white flex flex-col flex-shrink-0">
        <div className="px-5 py-6 border-b border-white/10">
          <p className="text-violet-300 text-xs font-medium">Admin panel</p>
          <h1 className="text-xl font-bold mt-1">TinyLearn</h1>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition
                ${location.pathname === path
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-white/40">Signed in as</p>
            <p className="text-sm text-white font-medium truncate mt-0.5">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition w-full"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
