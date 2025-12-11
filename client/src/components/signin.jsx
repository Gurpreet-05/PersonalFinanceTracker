import { useSetRecoilState } from 'recoil';
import { isNewUser } from '../atoms/atoms'; 

export const Signin = () => {
    const setIsNew = useSetRecoilState(isNewUser);

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-slate-100 mt-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                <p className="text-slate-500 text-sm">Enter your credentials to access your account</p>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                    </div>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                <button 
                    type="button" 
                    className="w-full py-3 bg-navy-700 text-white font-bold rounded-lg hover:bg-navy-900 transition-colors shadow-md"
                >
                    Sign In
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <button 
                    onClick={() => setIsNew(true)} 
                    className="font-bold text-emerald-500 hover:text-emerald-700 hover:underline"
                >
                    Sign up
                </button>
            </div>
        </div>
    );
};