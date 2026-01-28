import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

//Todoデータ取得
export const fetchTodos = async () => {
  const data = await getDocs(collection(db, "todos"));
  const todos = data.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .filter((todo) => todo.author.id === auth.currentUser.uid);
  return todos;
};

//Todoステータス
export const saveTodoToFirebase = async (todoText) => {
  await addDoc(collection(db, "todos"), {
    todoText,
    status: "incomplete",
    author: {
      username: auth.currentUser.displayName,
      id: auth.currentUser.uid,
    },
  });
};
//削除機能
export const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};
//完了にする
export const switchComplete = async (id) => {
  await updateDoc(doc(db, "todos", id), { status: "complete" });
};
//未完了に戻す
export const switchIncomplete = async (id) => {
  await updateDoc(doc(db, "todos", id), { status: "incomplete" });
};
