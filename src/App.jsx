import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; 
import Create from "./Create";
import Acceuil from "./Acceuil";
import Navbar from "./Navbar";
import Login from "./Login";
import Inscription from "./Inscription";
import Comment from "./Comment";
import Ami from "./Ami";
import Blog from "./Blog";
import Message from "./Message";
import Reception from "./Reception";

function App() {
    const location = useLocation();
    
    return (
        <>
        {location.pathname !== "/" & location.pathname !=="/Inscription" && <Navbar />}

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Acceuil" element={<Acceuil />} />
            <Route path="/create" element={<Create />} />
            <Route path="/Inscription" element={<Inscription />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/ami" element={<Ami />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/message" element={<Message />} />
            <Route path="/reception" element={<Reception />} />
        </Routes>
        </>
    );
}

export default App;
