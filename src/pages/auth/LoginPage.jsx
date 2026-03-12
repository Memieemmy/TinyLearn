import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ADMIN_EMAIL = "admin@tinylearn.com";
const ADMIN_PASSWORD = "admin1234";

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
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="w-[420px] bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 bg-[#f5f5f0] m-4 rounded-xl">
          <p className="text-amber-500 text-sm font-medium mb-1">Admin panel</p>
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
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
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
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-black transition mt-1"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-700 underline">Sign up</Link>
          </p>
          <p className="text-center text-xs text-gray-400 mt-2">
            <Link to="/" className="text-gray-500 underline">← Back to home</Link>
          </p>
        </div>

        {error && (
          <div className="mx-4 mb-4 bg-red-400 text-white rounded-xl px-4 py-3">
            <p className="text-sm font-medium">Your password is incorrect or this email doesn't exist</p>
            <p className="text-xs mt-1 opacity-80">Retry to recorrect password or email</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
