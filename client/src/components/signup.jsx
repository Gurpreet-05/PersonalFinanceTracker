import { useSetRecoilState } from 'recoil';
import { isNewUser } from '../atoms/atoms';

export const Signup = () => {
    const setIsNew = useSetRecoilState(isNewUser);

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-slate-100 mt-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                <p className="text-slate-500 text-sm">Start tracking your finance today</p>
            </div>

            <form className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                        <input 
                            type="text" 
                            placeholder="John"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                        <input 
                            type="text" 
                            placeholder="Doe"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input 
                        type="password" 
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>

                <button 
                    type="button" 
                    className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-md mt-2"
                >
                    Get Started
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <button 
                    onClick={() => setIsNew(false)} 
                    className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                    Log in
                </button>
            </div>
        </div>
    );
};