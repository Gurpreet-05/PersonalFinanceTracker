import {useEffect, useState} from "react";
import {LogOut, Trash2, User, Edit2, X, Check} from "lucide-react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {loggedIn, user as userAtom} from "../atoms/atoms.js";
import {useNavigate} from "react-router-dom";
import instance from "../api/axios.js";

export function Settings(){
    const setLoggedIn=useSetRecoilState(loggedIn);
    const navigate=useNavigate();
    const [user,setUser]=useRecoilState(userAtom);
    const [isEditing,setIsEditing]=useState(false);
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState(null);

    const inputClass=`w-full p-2.5 border rounded-lg transition-colors ${isEditing?'bg-white border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500':'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'}`;

    useEffect(()=>{
        const stored=JSON.parse(localStorage.getItem('user'));
        if(stored) setUser({firstName:stored.firstName, lastName:stored.lastName, email:stored.email});
    },[]);

    const handleEditToggle=()=>{
        if(isEditing){
            const stored=JSON.parse(localStorage.getItem('user'));
            setUser({firstName:stored.firstName, lastName:stored.lastName, email:stored.email});
            setMessage(null);
        }
        setIsEditing(!isEditing);
    };

    const handleSave=async()=>{
        setLoading(true);
        setMessage(null);
        try{
            const res=await instance.put('/profile', user);
            if(res.status===200){
                setMessage({type:'success', text:'Profile updated successfully!'});
                setIsEditing(false);
                const oldStorage=JSON.parse(localStorage.getItem('user'));
                localStorage.setItem('user', JSON.stringify({...oldStorage, ...user}));
            }
        }catch(error){
            const errorMsg=error.response?.data?.message||'Update failed';
            setMessage({type:'error', text:errorMsg});
        }finally{
            setLoading(false);
        }
    };

    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoggedIn(false);
        navigate('/');
    };

    const handleDeleteAccount=async()=>{
        if(!window.confirm("Are you sure? This will delete ALL your transactions permanently.")) return;
        try{
            const res=await instance.delete('/profile');
            if(res.status===200) handleLogout();
            else alert("Failed to delete account");
        }catch(e){
            console.error(e);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><User size={20} className="text-slate-400"/>Profile Information</h2>
                    {!isEditing?(
                        <button onClick={handleEditToggle} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"><Edit2 size={16}/> Edit</button>
                    ):(
                        <button onClick={handleEditToggle} className="text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1 transition-colors"><X size={16}/> Cancel</button>
                    )}
                </div>
                <div className="p-6 space-y-4">
                    {message && <div className={`p-3 rounded-lg text-sm ${message.type==='success'?'bg-emerald-50 text-emerald-700':'bg-red-50 text-red-700'}`}>{message.text}</div>}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">First Name</label>
                            <input disabled={!isEditing} value={user.firstName||""} onChange={(e)=>setUser({...user, firstName:e.target.value})} className={inputClass}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Last Name</label>
                            <input disabled={!isEditing} value={user.lastName||""} onChange={(e)=>setUser({...user, lastName:e.target.value})} className={inputClass}/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                        <input disabled={!isEditing} value={user.email||""} onChange={(e)=>setUser({...user, email:e.target.value})} className={inputClass}/>
                    </div>
                    {isEditing && (
                        <div className="flex justify-end pt-2">
                            <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50">
                                {loading ? 'Saving...' : <><Check size={18}/> Save Changes</>}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Account Actions</h2></div>
                <div className="p-6 space-y-4">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"><LogOut size={18}/>Log Out</button>
                    <button onClick={handleDeleteAccount} className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg font-medium hover:bg-red-100 transition-colors"><Trash2 size={18}/>Delete Account</button>
                </div>
            </div>
        </div>
    );
}