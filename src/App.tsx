import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KeepDiary from "./pages/KeepDiary";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header></Header>
          <Routes>
            <Route path="/" element={<KeepDiary />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
