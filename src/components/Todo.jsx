import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  fetchTodos,
  saveTodoToFirebase,
  deleteTodo,
  switchComplete,
  switchIncomplete,
} from "../utils/Functions";
import "./Todo.css";

const Todo = ({ isAuth }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");
  const navgate = useNavigate();
  //ログインしてなければログイン画面に移動
  useEffect(() => {
    if (!isAuth) {
      navgate("/login");
    }
    getTodos();
  }, []);
  //FirestoreからTODOを取得する
  const getTodos = async () => {
    const todos = await fetchTodos();
    setTodoList(todos);
  };
  //↓追加機能
  const onClickAdd = async () => {
    if (todoText === "") return;
    await saveTodoToFirebase(todoText);
    setTodoText("");
    getTodos();
  };
  //↓削除機能
  const onClickDelete = async (id) => {
    await deleteTodo(id);
    getTodos();
  };
  //↓完了に切替
  const handleComplete = async (id) => {
    await switchComplete(id);
    getTodos();
  };
  //↓未完了に切替
  const handleIncomplete = async (id) => {
    await switchIncomplete(id);
    getTodos();
  };
  const incompleteTodos = todoList.filter(
    (todo) => todo.status === "incomplete"
  );
  const completeTodos = todoList.filter((todo) => todo.status === "complete");
  return (
    <Box
      sx={{
        color: "#544b39",
        fontSize: { xs: "14px", sm: "16px", md: "20px" },
        alignItems: "center",
        p: "50px 30px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "20px", sm: "22px", md: "26px" },
          textAlign: "center",
          fontWeight: 600,
          mb: "10px",
        }}
      >
        ＴＯＤＯリスト
      </Typography>

      <Box
        sx={{
          m: "0,auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          placeholder="やることを入力"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <Button
          onClick={() => {
            onClickAdd();
          }}
          variant="contained"
          sx={{
            backgroundColor: "#b4d5c8",
            color: "#544b39",
            alignItems: "center",
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            p: "5px",
            ml: "20px",
          }}
        >
          追加
        </Button>
      </Box>

      {/*未完了リスト*/}
      <Box
        sx={{
          mt: "20px",
          p: "0 10px 10px",
          border: "solid 3px #b4d5c8",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "22px", md: "26px" },
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          未完了
        </Typography>

        {incompleteTodos.map((todo) => {
          return (
            <Box
              key={todo.id}
              sx={{
                backgroundColor: "#e0e1d6ff",
                p: " 10px 15px",
                m: "10px auto",
              }}
            >
              <Typography sx={{ mb: "10px" }}>{todo.todoText}</Typography>
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

              {todo.author.id === auth.currentUser?.uid && (
                <Button
                  onClick={() => onClickDelete(todo.id)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#b4d5c8",
                    color: "#544b39",
                    ml: "10px",
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  }}
                >
                  削除
                </Button>
              )}
            </Box>
          );
        })}
      </Box>

      {/*完了*/}
      <Box
        sx={{
          mt: "20px",
          p: "0 10px 10px",
          backgroundColor: "#b4d5c8",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "22px", md: "26px" },
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          完了
        </Typography>
        {completeTodos.map((todo) => {
          return (
            <Box
              key={todo.id}
              sx={{
                backgroundColor: "#f2f3eb",
                p: " 10px 15px",
                m: "10px auto",
              }}
            >
              <Typography sx={{ mb: "10px" }}>{todo.todoText}</Typography>
              <Button
                onClick={async () => {
                  handleIncomplete(todo.id);
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#b4d5c8",
                  color: "#544b39",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                }}
              >
                戻す
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Todo;
