import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://blog-post-project-api.vercel.app/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="px-[120px] py-[60px]">
      <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover rounded-3xl" />
      <div className="mt-8">
        <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">{post.category}</span>
        <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
        <p className="text-gray-500 mt-2">{post.description}</p>
        <p className="text-gray-400 mt-2">{post.author} | {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        <div className="mt-8 text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}

export default ViewPostPage;
