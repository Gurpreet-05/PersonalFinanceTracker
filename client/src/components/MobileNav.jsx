import {Link, useLocation} from 'react-router-dom';
import {LayoutDashboard, CreditCard, Settings} from 'lucide-react';

export function MobileNav(){
    const location=useLocation();

    const getClass=(path)=>{
        return location.pathname===path
            ?"flex flex-col items-center justify-center w-full h-full text-xs font-medium text-emerald"
            :"flex flex-col items-center justify-center w-full h-full text-xs font-medium text-slate-500 hover:text-slate-900";
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around z-50">
            <Link to="/dashboard" className={getClass('/dashboard')}>
                <LayoutDashboard size={24} className="mb-1" />
                <span>Home</span>
            </Link>

            <Link to="/transactions" className={getClass('/transactions')}>
                <CreditCard size={24} className="mb-1" />
                <span>History</span>
            </Link>

            <Link to="/settings" className={getClass('/settings')}>
                <Settings size={24} className="mb-1" />
                <span>Settings</span>
            </Link>
        </div>
    );
}