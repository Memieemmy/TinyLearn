function HeroSection() {
    return (
      <section className="flex items-center justify-center gap-8 mx-4 mt-4 p-12 bg-[#f5f5f0] rounded-3xl">
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
  
  export default HeroSection;