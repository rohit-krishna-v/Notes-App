import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import NotFound from "./pages/notFound"
import Register from "./pages/register"
import ProtectedRoute from "./components/ProtecteRoute"

function Logout () {
    localStorage.clear()
    return <Navigate to="/login" />
}

function RegisterandLogout () {
    localStorage.clear()
    return <Register />
}

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute>
                    <Home/>
                </ProtectedRoute>}>
                </Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/logout" element={<Logout/>}></Route>
                <Route path="/register" element={<RegisterandLogout/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App