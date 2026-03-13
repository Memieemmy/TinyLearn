import { Linkedin, Github, Chrome } from "lucide-react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 mx-6 mt-4 sticky top-4 z-50">
      <Link to="/" className="text-xl font-bold text-[#5A3E99]">TinyLearn</Link>
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="px-5 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2 bg-[#7C5CBF] text-white rounded-xl text-sm hover:bg-[#5A3E99] transition"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#7C5CBF] to-[#4A2E8A] rounded-3xl p-12 flex items-center justify-between text-white min-h-[220px]">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#FF7043]/20 rounded-full translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10">
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4 backdrop-blur-sm">
          ✨ Knowledge Hub
        </span>
        <h2 className="text-5xl font-bold leading-tight max-w-md">
          Stay Informed,<br />Stay Inspired
        </h2>
        <p className="text-white/70 mt-4 max-w-xs text-sm">
          Discover a world of knowledge at your fingertips.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-5 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <img
          src="https://placehold.co/72x72/9B72E0/FFFFFF?text=TP"
          alt="author"
          className="rounded-xl w-18 h-18 object-cover"
        />
        <div>
          <p className="text-white/60 text-xs uppercase tracking-widest font-medium">Author</p>
          <h3 className="text-lg font-bold mt-1">Thompson P.</h3>
          <p className="text-white/70 text-sm mt-1">Writer & Knowledge Curator</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between px-8 py-5 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Get in touch</span>
        <div className="flex gap-2">
          <button className="p-2 bg-[#7C5CBF] text-white rounded-xl hover:bg-[#5A3E99] transition">
            <Linkedin size={14} />
          </button>
          <button className="p-2 bg-[#7C5CBF] text-white rounded-xl hover:bg-[#5A3E99] transition">
            <Github size={14} />
          </button>
          <button className="p-2 bg-[#7C5CBF] text-white rounded-xl hover:bg-[#5A3E99] transition">
            <Chrome size={14} />
          </button>
        </div>
      </div>
      <Link to="/" className="text-sm text-[#7C5CBF] font-medium hover:underline">
        Home page
      </Link>
    </footer>
  );
}
