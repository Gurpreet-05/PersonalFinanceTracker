import {RecoilRoot, useRecoilValue} from "recoil";
import {loggedIn} from "./atoms/atoms.js";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { LandingPage } from "./pages/Preview.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Transactions } from "./pages/Transactions.jsx";
import { Settings } from "./pages/Settings.jsx";
import { AppLayout } from "./components/AppLayout.jsx"; 


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
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard"/>:<LandingPage/>}/>

                {isAuthenticated && (
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/transactions" element={<Transactions/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Route>
                )}

                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    )
}