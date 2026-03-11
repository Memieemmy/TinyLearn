function NavBar() {
    return (
      <nav className="flex items-center justify-between px-8 py-4 bg-[#f5f5f0] rounded-full mx-4 mt-4">
        <h1 className="text-xl font-bold">hh.</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-400 rounded-full">Log in</button>
          <button className="px-4 py-2 bg-black text-white rounded-full">Sign up</button>
        </div>
      </nav>
    );
  }
  
  export { NavBar };
