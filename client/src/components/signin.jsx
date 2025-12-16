import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { isNewUser, loggedIn } from '../atoms/atoms.js';
import instance from '../api/axios.js';

export function Signin(){
    const setNewUser=useSetRecoilState(isNewUser);
    const navigate=useNavigate();
    const setloggedIn=useSetRecoilState(loggedIn);

    const [formData, setFormData]=useState({ email: "", password: "" });
    const [error, setError]=useState("");

    const handleChange=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // e.target is the html element that triggers the funcn
    };

    const handleSubmit=async (e)=>{
        e.preventDefault(); // in html , submit pe refresh hota which we prevent with this
        setError("");
        try {
            const res=await instance.post('/auth/login', formData);
            if(res.status===200) {
                const data=res.data;
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                setloggedIn(true);
                navigate('/dashboard');
            } 
        } catch (err) {
            if(err.status===400) setError("Invalid email or password");
            else setError("Application Error: " + err.message);
        }
    };

    return (
        <div className="w-full max-w-sm p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back</h2>
            <p className="text-sm text-slate-500 mb-6">Sign in to access your dashboard</p>

            {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
            <div className="bg-yellow-50 text-yellow-700 p-2 text-xs rounded mb-4">
                Since this is a free demo, the server may take up to 60 seconds to wake up for the first login.
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    name="email" type="email" placeholder="Email Address" onChange={handleChange} required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
                <input 
                    name="password" type="password" placeholder="Password" onChange={handleChange} required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
                
                <button type="submit" className="w-full py-2.5 mt-2 font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors">
                    Sign In
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-slate-600">
                New to PFT?{" "}
                <button 
                    onClick={() => setNewUser(true)}
                    className="font-medium text-emerald-600 hover:underline"
                >
                    Create Account
                </button>
            </div>
        </div>
    );
}