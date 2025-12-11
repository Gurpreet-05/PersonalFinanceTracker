import { RecoilRoot, useRecoilValue } from "recoil"
import logo from "../assets/3.jpg"
import { isNewUser } from "../atoms/atoms"
import { Signin } from "../components/signin";
import { Signup } from "../components/signup";
export function LandingPage(){
    return <div className="grid grid-cols-2 mt-5 gap-8 px-4 h-screen">
        <div className="col-span-2 md:col-span-1"><Main/></div>
        <div className="col-span-2 md:col-span-1"> <img src="" alt="SS here" /> </div>
    </div>
}
function Main(){
    const isNew=useRecoilValue(isNewUser);
    return <div>
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
        <div className="">
            {!isNew? <Signin/>:<Signup/>}
        </div>
    </div>
}