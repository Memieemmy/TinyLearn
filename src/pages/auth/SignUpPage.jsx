import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    setSubmitted(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="w-[420px] bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 bg-[#f5f5f0] m-4 rounded-xl">
          <p className="text-amber-500 text-sm font-medium mb-1">Admin panel</p>
          <h1 className="text-3xl font-bold mb-6">Sign up</h1>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <p className="text-gray-900 font-semibold">Account created!</p>
              <p className="text-gray-500 text-sm mt-2">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password (min. 8 characters)"
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Confirm password</label>
                <input
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-black transition mt-1"
              >
                Create account
              </button>
            </form>
          )}

          {!submitted && (
            <p className="text-center text-xs text-gray-400 mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-gray-700 underline">Log in</Link>
            </p>
          )}
          <p className="text-center text-xs text-gray-400 mt-2">
            <Link to="/" className="text-gray-500 underline">← Back to home</Link>
          </p>
        </div>

        {error && (
          <div className="mx-4 mb-4 bg-red-400 text-white rounded-xl px-4 py-3">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
