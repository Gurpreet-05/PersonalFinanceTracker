import { LogOut } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { loggedIn } from "../atoms/atoms";
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/3.jpg'

export function MobileTopBar() {
    const setLoggedIn=useSetRecoilState(loggedIn);
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-slate-200 flex items-center justify-between px-6 z-10">
            <Link to="/">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="" className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-sm"/>
                    <span className="text-xl font-bold text-slate-800 tracking-tight">PFT</span>
                </div>
            </Link>

            <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Log Out"
            >
                <LogOut size={20} />
            </button>
        </div>
    );
}