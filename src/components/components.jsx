import { Linkedin, Github, Chrome } from "lucide-react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-[120px] py-4 border-b border-gray-200">
      <Link to="/" className="text-xl font-bold">hh.</Link>
      <div className="flex gap-3">
        <Link to="/login" className="px-4 py-2 border border-gray-400 rounded-full text-sm hover:bg-gray-50 transition">Log in</Link>
        <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition">Sign up</Link>
      </div>
    </nav>
  );
}

export function HeroSection() {
  return (
    <section className="flex items-center justify-center gap-8 p-12 bg-[#f5f5f0] rounded-3xl">
      <div className="text-right">
        <h2 className="text-4xl font-bold">Stay Informed, Stay Inspired</h2>
        <p className="text-gray-500 mt-4">Discover a World of Knowledge at Your Fingertips.</p>
      </div>
      <img src="https://placehold.co/200x250" alt="author" className="rounded-2xl" />
      <div>
        <p className="text-sm text-gray-400">Author</p>
        <h3 className="text-xl font-bold">Thompson P.</h3>
        <p className="text-sm text-gray-500 mt-2">A pet enthusiast and freelance writer.</p>
        <p className="text-sm text-gray-500 mt-2">Volunteers at local animal shelter.</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between px-[120px] py-4 bg-[#f5f5f0] rounded-3xl">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Get in touch</span>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-800 text-white rounded-full"><Linkedin size={14} /></button>
          <button className="p-2 bg-gray-800 text-white rounded-full"><Github size={14} /></button>
          <button className="p-2 bg-gray-800 text-white rounded-full"><Chrome size={14} /></button>
        </div>
      </div>
      <a href="#" className="text-sm underline">Home page</a>
    </footer>
  );
}
