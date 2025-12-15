import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { MobileTopBar } from "./MobileTopBar";

export function AppLayout(){
    return (
        <div className="flex min-h-screen bg-slate-50">
            <div className="hidden md:block">
                <Sidebar />
            </div>

            <MobileTopBar /> 
            <MobileNav />
            
            <main className="flex-1 md:ml-64 p-4 pt-20 md:p-8 md:pt-8 pb-24 md:pb-8">
                <Outlet /> 
            </main>
        </div>
    );
}