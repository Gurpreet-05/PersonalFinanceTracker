import {RecoilRoot, useRecoilValue} from "recoil";
import {loggedIn} from "./atoms/atoms";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { LandingPage } from "./pages/Preview";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Settings } from "./pages/Settings";
export default function App(){
    return <div className="font-serif bg-navy-100 min-h-screen overflow-hidden">
        <RecoilRoot>
            <Hero></Hero>
        </RecoilRoot>
    </div>
    
}
function Hero(){
    const isAuthenticated=useRecoilValue(loggedIn);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated? <Navigate to="/dashboard"/> : <LandingPage/>} />
                <Route path="/dashboard" element={isAuthenticated? <Dashboard/> : <Navigate to="/"/>}/>
                <Route path="/transactions" element={isAuthenticated? <Transactions/> : <Navigate to="/"/>}/>
                <Route path="/settings" element={isAuthenticated? <Settings/> : <Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    )
}