import { useEffect, useState } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

type CreatePostProps = {
  isAuth: boolean;
};

const CreatePost = ({ isAuth }: CreatePostProps) => {
  const [title, setTitle] = useState<string>("");
  const [postText, setPostText] = useState<string>("");

  const navigate = useNavigate();

  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      postText,
      author: {
        username: auth.currentUser?.displayName,
        id: auth.currentUser?.uid,
      },
    });

    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="CreatePost">
      <h1>投稿を作成</h1>

      <input
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="本文"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />

      <button onClick={createPost}>投稿する</button>
    </div>
  );
};

export default CreatePost;
