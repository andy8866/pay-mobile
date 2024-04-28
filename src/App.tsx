import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import Bank from "./bank/Bank";
import AddBank from "./bank/AddBank";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reg" element={<Register />} />
                <Route path="/bank" element={<Bank />} />
                <Route path="/addBank" element={<AddBank />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
