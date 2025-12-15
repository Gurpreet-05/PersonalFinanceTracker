import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { isNewUser, loggedIn } from '../atoms/atoms.js';
import instance from '../api/axios.js';

export function Signup(){
    const setNewUser=useSetRecoilState(isNewUser);
    const navigate=useNavigate();
    const setloggedIn=useSetRecoilState(loggedIn);

    const [formData, setFormData]=useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [error, setError]=useState("");

    const handleChange=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");

        try{
            const res=await instance.post('/auth/register', formData);

            if (res.status===200) {
                const data=res.data;
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                setloggedIn(true);
                navigate('/dashboard');
            } 
        } catch (err) {
            setError("Application Error: "+ err.message);
        }
    };

    return (
        <div className="w-full max-w-sm p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Create Account</h2>
            <p className="text-sm text-slate-500 mb-6">Start managing your finances today</p>

            {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <input 
                        name="firstName" placeholder="First Name" onChange={handleChange} required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    />
                    <input 
                        name="lastName" placeholder="Last Name" onChange={handleChange} required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    />
                </div>
                <input 
                    name="email" type="email" placeholder="Email Address" onChange={handleChange} required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
                <input 
                    name="password" type="password" placeholder="Password (Min 8 chars)" onChange={handleChange} required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
                
                <button type="submit" className="w-full py-2.5 mt-2 font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
                    Sign Up
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <button 
                    onClick={() => setNewUser(false)} 
                    className="font-medium text-emerald-600 hover:underline"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}