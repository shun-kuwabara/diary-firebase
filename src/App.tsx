import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Navbar from "./components/Navbar.jsx";
import { useState } from "react";
import Todo from "./components/Todo.jsx";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(localStorage.getItem("isAuth") === "true");
  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />}></Route>
        <Route path="/Todo"  element={<Todo isAuth={isAuth}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
