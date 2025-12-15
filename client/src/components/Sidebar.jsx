import {Link, useLocation} from 'react-router-dom';
import {LayoutDashboard, CreditCard, Settings, UserCircle} from 'lucide-react';
import {useEffect, useState} from 'react';
import logo from '../assets/3.jpg';

export function Sidebar(){
    const location=useLocation();
    const [userName,setUserName]=useState("User");

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        if(user&&user.firstName){
            setUserName(user.firstName);
        }
    },[]);
    
    const getLinkClass=(path)=>{
        const baseClass="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 mb-1";
        const activeClass="bg-emerald-100 text-emerald-700 font-medium";
        const inactiveClass="text-slate-600 hover:bg-slate-100 hover:text-slate-900";

        return location.pathname===path 
            ?`${baseClass} ${activeClass}` 
            :`${baseClass} ${inactiveClass}`;
    };

    return (
        <div className="hidden md:flex w-64 h-screen bg-white border-r border-slate-200 flex-col fixed left-0 top-0">
            <div className="p-6">
                <Link to="/">
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <img src={logo} alt="" className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-sm"/>
                        PFT
                    </h1>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4">
                <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/transactions" className={getLinkClass('/transactions')}>
                    <CreditCard size={20} />
                    <span>Transactions</span>
                </Link>
                <Link to="/settings" className={getLinkClass('/settings')}>
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-slate-100">
                <Link to="/settings" className="flex items-center gap-3 px-2 py-2 hover:bg-slate-50 rounded-lg transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-emerald-600 transition-colors">
                        <UserCircle size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                            {userName}
                        </p>
                        <p className="text-xs text-slate-400">View Profile</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}