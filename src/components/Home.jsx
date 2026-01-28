import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Button, Box, Typography } from "@mui/material";
import { fetchTodos, switchComplete } from "../utils/Functions";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
    const initTodos = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const todos = await fetchTodos();
          setTodoList(todos);
        } else {
          const userCredential = await signInAnonymously(auth);
          const todos = await fetchTodos();
          setTodoList(todos);
        }
      });
    };
    initTodos();
  }, []);
  const handDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setPostList(postList.filter((post) => post.id !== id));
  };
  const handleComplete = async (id) => {
    await switchComplete(id);
    const todos = await fetchTodos();
    setTodoList(todos);
  };
  const incompleteTodos = todoList.filter(
    (todo) => todo.status === "incomplete"
  );
  return (
    <Box
      sx={{
        color: "#544b39",
        m: "0 30px",
        fontSize: { xs: "14px", sm: "16px", md: "20px" },
      }}
    >
      {auth.currentUser && (
        <Box
          sx={{
            textAlign: "center",
            mt: "50px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "20px", sm: "24px", md: "28px" },
              fontWeight: "600",
            }}
          >
            {auth.currentUser?.isAnonymous || !auth.currentUser?.displayName
              ? "こんにちは、ゲストさん"
              : `${auth.currentUser.displayName}さんのやること`}
          </Typography>
          {incompleteTodos.map((todo) => {
            return (
              <Box
                key={todo.id}
                sx={{
                  backgroundColor: "#f2f3eb",
                  p: " 10px 30px",
                  m: "30px auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "5px 5px 3px #b4d5c8",
                }}
              >
                <p>{todo.todoText}</p>
                <Button
                  onClick={async () => {
                    handleComplete(todo.id);
                  }}
                  variant="contained"
                  sx={{
                    backgroundColor: "#b4d5c8",
                    color: "#544b39",
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  }}
                >
                  完了
                </Button>
              </Box>
            );
          })}
        </Box>
      )}
      <Box
        sx={{
          mt: "50px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "20px", sm: "24px", md: "28px" },
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          日記
        </Typography>
        {postList.map((post) => {
          return (
            <Box
              key={post.id}
              sx={{
                backgroundColor: "#f2f3eb",
                p: "10px 30px",
                m: "30px auto",
                boxShadow: "5px 5px 3px #b4d5c8",
              }}
            >
              <Box className="postHeader">
                <Typography
                  sx={{
                    fontSize: { xs: "18px", sm: "20px", md: "24px" },
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {post.title}
                </Typography>
              </Box>
              {/*内容*/}
              <Box
                sx={{
                  fontSize: { xs: "14px", sm: "16px", md: "20px" },
                  p: "10px",
                }}
              >
                {post.postText}
              </Box>
              {/*ユーザーネーム・削除ボタン*/}
              <Box
                className="nameAndDeleteButton"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "14px", sm: "16px", md: "24px" },
                    fontWeight: "600",
                  }}
                >
                  @{post.author.username}
                </Typography>
                {post.author.id === auth.currentUser?.uid && (
                  <Button
                    onClick={() => handDelete(post.id)}
                    variant="contained"
                    sx={{
                      backgroundColor: "#b4d5c8",
                      color: "#544b39",
                      fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    }}
                  >
                    削除
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
