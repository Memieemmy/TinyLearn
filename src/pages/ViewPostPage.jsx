import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

function ViewPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reactions, setReactions] = useState(321);
  const [reacted, setReacted] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleReact = () => {
    setReactions(reacted ? reactions - 1 : reactions + 1);
    setReacted(!reacted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copy แล้วค่ะ! 🔗", {
      description: "บันทึกลิงก์ไว้ที่ Clipboard แล้ว",
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const handleShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}`,
    };
    window.open(urls[platform], "_blank");
  };

  const handleSend = () => {
    if (comment.trim()) {
      setComments([...comments, comment.trim()]);
      setComment("");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="px-[120px] py-[60px]">
      <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover rounded-3xl" />
      <div className="mt-8">
        <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">{post.category}</span>
        <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
        <p className="text-gray-500 mt-2">{post.description}</p>
        <p className="text-gray-400 mt-2">
          {post.author} | {new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <div className="mt-8 prose max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      </div>

      {/* Reaction & Share Bar */}
      <div className="mt-10 flex items-center justify-between bg-gray-50 rounded-2xl px-6 py-4">
        <button
          onClick={handleReact}
          className={`flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium transition
            ${reacted ? "bg-yellow-100 border-yellow-400 text-yellow-600" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"}`}
        >
          😄 {reactions}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 border border-gray-300 bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            📋 Copy
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-blue-50 transition text-blue-600 font-bold text-sm"
          >
            f
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-blue-50 transition text-blue-700 font-bold text-xs"
          >
            in
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-sky-50 transition text-sky-500 font-bold text-sm"
          >
            𝕏
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Comment</h3>
        {comments.length > 0 && (
          <div className="mb-4 flex flex-col gap-3">
            {comments.map((c, i) => (
              <div key={i} className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700">
                {c}
              </div>
            ))}
          </div>
        )}
        <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full resize-none outline-none text-sm text-gray-700 min-h-[80px]"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSend}
              className="bg-black text-white text-sm px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPostPage;