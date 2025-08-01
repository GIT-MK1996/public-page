import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";




export default function App() {
  return (
    
    <BrowserRouter>   {/*browserrouter voor hele routing*/}
        <Routes>  {/*routes voor alle routes */}
          <Route path="/" element={<Dashboard />} /> {/*paths voor naar pagina's*/}
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
    </BrowserRouter>
  );
}