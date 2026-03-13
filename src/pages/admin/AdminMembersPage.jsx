import { useState } from "react";
import { Search, UserPlus, X } from "lucide-react";
import AdminLayout from "./AdminLayout";

const INITIAL_MEMBERS = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", role: "Editor", joined: "2024-01-15", status: "Active" },
  { id: 2, name: "James Wilson", email: "j.wilson@email.com", role: "Writer", joined: "2024-02-20", status: "Active" },
  { id: 3, name: "Emily Chen", email: "emily.c@email.com", role: "Viewer", joined: "2024-03-05", status: "Active" },
  { id: 4, name: "Robert Davis", email: "r.davis@email.com", role: "Writer", joined: "2024-03-12", status: "Inactive" },
  { id: 5, name: "Olivia Martinez", email: "o.m@email.com", role: "Editor", joined: "2024-04-01", status: "Active" },
  { id: 6, name: "William Brown", email: "w.brown@email.com", role: "Viewer", joined: "2024-04-18", status: "Active" },
  { id: 7, name: "Sophia Taylor", email: "s.taylor@email.com", role: "Writer", joined: "2024-05-07", status: "Pending" },
  { id: 8, name: "Noah Anderson", email: "n.anderson@email.com", role: "Viewer", joined: "2024-05-22", status: "Active" },
  { id: 9, name: "Ava Thomas", email: "ava.t@email.com", role: "Writer", joined: "2024-06-03", status: "Active" },
  { id: 10, name: "Liam Jackson", email: "l.jackson@email.com", role: "Viewer", joined: "2024-06-15", status: "Inactive" },
];

const statusStyle = {
  Active: "bg-green-100 text-green-600",
  Inactive: "bg-gray-100 text-gray-500",
  Pending: "bg-amber-100 text-amber-600",
};

const roleStyle = {
  Editor: "bg-blue-100 text-blue-600",
  Writer: "bg-violet-100 text-violet-600",
  Viewer: "bg-gray-100 text-gray-600",
};

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

function AddMemberModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Viewer", status: "Active" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now(), joined: new Date().toISOString().slice(0, 10) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[420px] shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#7C5CBF] text-xs font-medium">Admin panel</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">Add Member</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-xl transition">
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
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#7C5CBF] transition"
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
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#7C5CBF] transition"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#7C5CBF] transition"
            >
              <option>Viewer</option>
              <option>Writer</option>
              <option>Editor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#7C5CBF] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#5A3E99] transition mt-1"
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminMembersPage() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "All" || m.role === filterRole;
    const matchStatus = filterStatus === "All" || m.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const handleRemove = (id) => setMembers(members.filter((m) => m.id !== id));
  const handleAdd = (member) => setMembers([member, ...members]);
  const handleToggleStatus = (id) => {
    setMembers(members.map((m) =>
      m.id === id
        ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" }
        : m
    ));
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
            className="flex items-center gap-2 bg-[#7C5CBF] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#5A3E99] transition"
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
                className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl text-sm outline-none border border-gray-200 focus:border-[#7C5CBF] transition"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#7C5CBF] transition"
            >
              <option value="All">All Roles</option>
              <option>Editor</option>
              <option>Writer</option>
              <option>Viewer</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#7C5CBF] transition"
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
              {filtered.map((member) => (
                <tr key={member.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-semibold text-violet-600 flex-shrink-0">
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
                      onClick={() => handleToggleStatus(member.id)}
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
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-14 text-center text-gray-400 text-sm">
                    No members found
                  </td>
                </tr>
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
