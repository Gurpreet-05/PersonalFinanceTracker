import {useRecoilValue} from "recoil";
import logo from "../assets/3.jpg";
import {isNewUser} from "../atoms/atoms.js";
import {Signin} from "../components/signin.jsx";
import {Signup} from "../components/signup.jsx";
import desktopPreview from "../assets/desktopPrev.png";
import mobilePreview from "../assets/mobilePrev.png";

export function LandingPage(){
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 mt-10 gap-12 px-6 max-w-7xl mx-auto items-center">
                <div className="order-2 lg:order-1">
                    <Main/>
                </div>
                <div className="order-1 lg:order-2 relative h-[400px] sm:h-[500px] flex items-center justify-center">
                    <img src={desktopPreview} alt="Desktop Dashboard" className="absolute top-10 right-0 w-[85%] rounded-xl shadow-2xl border border-slate-200"/>
                    <div className="absolute bottom-0 left-4 w-[160px] sm:w-[200px] z-10 border-gray-900 bg-gray-900 border-[8px] rounded-[2rem] shadow-2xl">
                        <div className="rounded-[1.5rem] overflow-hidden bg-white aspect-[1/2] ">
                            <img src={mobilePreview} alt="Mobile App" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-slate-900 text-slate-400 py-8 mt-auto font-mono">
                <div className="max-w-5xl mx-auto text-center space-y-3">
                    <p className="text-sm font-medium text-slate-200">Personal Finance Tracker · Built with React, Recoil, Express & MongoDB</p>
                    <p className="text-xs text-slate-500">MIT License · © {new Date().getFullYear()} Gurpreet Singh</p>
                    <div className="flex justify-center gap-6 text-sm mt-4">
                        <a href="https://github.com/Gurpreet-05" target="_blank" className="hover:text-emerald-400 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                            </svg>
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/gurpreet-singh-096a7b286" target="_blank" className="hover:text-emerald-400 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function Main(){
    const isNew=useRecoilValue(isNewUser);
    return (
        <div>
            <div className="flex ml-5 gap-4 mb-6 items-center">
                <img src={logo} alt="" className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-sm"/>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800">Personal Finance Tracker</div>
            </div>
            <hr className="my-4 border-t border-slate-300" />
            <div className="flex flex-col gap-4 mt-10">
                <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 ">
                    Achieve Your <span className="text-emerald-500">Money Goals</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-md">
                    Make smarter financial decisions with PFT. Analyze your spendings, track savings, and visualize your investments in real-time.
                </p>
            </div>
            <div className="mt-10">
                {!isNew ? <Signin/> : <Signup/>}
            </div>
        </div>
    );
}