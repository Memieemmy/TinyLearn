import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ADMIN_EMAIL = "memieemmy@gmail.com";
const ADMIN_PASSWORD = "1311";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      login({ email, name: "Admin" });
      navigate("/admin/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE9F6] flex items-center justify-center">
      <div className="w-[420px] bg-white rounded-2xl shadow-lg p-8">
        <p className="text-[#7C5CBF] text-sm font-medium mb-1">Admin panel</p>
        <h1 className="text-3xl font-bold mb-6">Log in</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(false); }}
              placeholder="Email"
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#7C5CBF] transition"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Password"
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#7C5CBF] transition"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
              <p className="text-sm font-medium">Email or password is incorrect</p>
              <p className="text-xs mt-0.5 opacity-70">Please try again</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#7C5CBF] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#5A3E99] transition mt-1"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#7C5CBF] font-medium">Sign up</Link>
        </p>
        <p className="text-center text-xs text-gray-400 mt-2">
          <Link to="/" className="text-gray-500 hover:text-[#7C5CBF] transition">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
