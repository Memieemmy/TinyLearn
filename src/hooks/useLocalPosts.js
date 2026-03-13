import { useState } from "react";

const KEY = "tl_local_posts";

export function getLocalPosts() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function useLocalPosts() {
  const [localPosts, setLocalPosts] = useState(() => getLocalPosts());

  const save = (posts) => {
    localStorage.setItem(KEY, JSON.stringify(posts));
    setLocalPosts(posts);
  };

  const addPost = (data) => {
    const post = {
      ...data,
      id: "local_" + Date.now(),
      date: new Date().toISOString(),
    };
    save([post, ...localPosts]);
    return post;
  };

  const updatePost = (id, data) => {
    save(localPosts.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const deletePost = (id) => {
    save(localPosts.filter((p) => p.id !== id));
  };

  return { localPosts, addPost, updatePost, deletePost };
}
