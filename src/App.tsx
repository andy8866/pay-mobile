import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import Bank from "./bank/Bank";
import AddBank from "./bank/AddBank";
import Deposit from "./deposit/Deposit";
import DepositOrder from "./deposit/DepositOrder";
import DepositOrderList from "./deposit/DepositOrderList";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reg" element={<Register />} />
                <Route path="/bank" element={<Bank />} />
                <Route path="/addBank" element={<AddBank />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/depositOrder" element={<DepositOrder />} />
                <Route path="/depositOrderList" element={<DepositOrderList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
