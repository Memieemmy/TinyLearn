import { useState, useEffect } from "react";
import { Search, UserPlus, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "./AdminLayout";

const statusStyle = {
  Active: "bg-green-100 text-green-600",
  Inactive: "bg-gray-100 text-gray-500",
  Pending: "bg-amber-100 text-amber-600",
};

const roleStyle = {
  Editor: "bg-blue-100 text-blue-600",
  Writer: "bg-purple-100 text-purple-600",
  Viewer: "bg-gray-100 text-gray-600",
};

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

function AddMemberModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Viewer", status: "Active" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("members")
      .insert([form])
      .select()
      .single();
    setLoading(false);
    if (!error) {
      onAdd(data);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[420px] shadow-2xl overflow-hidden">
        <div className="bg-[#f5f5f0] px-6 py-5 m-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-amber-500 text-xs font-medium">Admin panel</p>
              <h3 className="text-xl font-bold text-gray-900 mt-0.5">Add Member</h3>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-lg transition">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Full name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
              >
                <option>Viewer</option>
                <option>Writer</option>
                <option>Editor</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-black transition mt-1 disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Member"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function AdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data } = await supabase.from("members").select("*").order("joined", { ascending: false });
      setMembers(data || []);
      setLoading(false);
    };
    fetchMembers();
  }, []);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "All" || m.role === filterRole;
    const matchStatus = filterStatus === "All" || m.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const handleRemove = async (id) => {
    await supabase.from("members").delete().eq("id", id);
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleAdd = (member) => setMembers([member, ...members]);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    await supabase.from("members").update({ status: newStatus }).eq("id", id);
    setMembers(members.map((m) => m.id === id ? { ...m, status: newStatus } : m));
  };

  return (
    <AdminLayout>
      {showModal && <AddMemberModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      <div className="px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Members</h2>
            <p className="text-gray-500 text-sm mt-1">{members.length} members total</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black transition"
          >
            <UserPlus size={15} />
            Add Member
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          {/* Filters */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div className="relative flex-1 max-w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm outline-none border border-gray-200 focus:border-gray-400 transition"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
            >
              <option value="All">All Roles</option>
              <option>Editor</option>
              <option>Writer</option>
              <option>Viewer</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
            >
              <option value="All">All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Member</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Role</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Joined</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-14 text-center text-gray-400 text-sm">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-14 text-center text-gray-400 text-sm">No members found</td>
                </tr>
              ) : (
                filtered.map((member) => (
                  <tr key={member.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 flex-shrink-0">
                          {getInitials(member.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-400">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleStyle[member.role]}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm text-gray-500">
                        {new Date(member.joined).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-3.5">
                      <button
                        onClick={() => handleToggleStatus(member.id, member.status)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${statusStyle[member.status]}`}
                      >
                        {member.status}
                      </button>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleRemove(member.id)}
                          className="text-xs text-red-400 hover:text-red-600 px-2.5 py-1 rounded-lg hover:bg-red-50 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-gray-100">
            <p className="text-xs text-gray-400">Showing {filtered.length} of {members.length} members</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminMembersPage;
