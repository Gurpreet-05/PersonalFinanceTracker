import {useEffect, useState} from "react";
import {Plus, ArrowUpRight, ArrowDownRight, Wallet} from "lucide-react";
import {TransactionModal} from "../components/TransactionModal.jsx";
import {Chart} from "../components/Chart.jsx";
import {useRecoilState, useRecoilValue} from "recoil";
import {totalsSelector, transactions as transactionsAtom} from "../atoms/atoms.js";
import instance from "../api/axios.js";
import {Link} from "react-router-dom";

export function Dashboard(){
    const [transactions,setTransactions]=useRecoilState(transactionsAtom);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const totals=useRecoilValue(totalsSelector);

    const fetchTransactions=async()=>{
        try{
            const res=await instance.get('/transactions?frequency=all');
            setTransactions(res.data);
        }catch(err){
            console.error("Failed to load data", err);
        }
    };

    useEffect(()=>{
        fetchTransactions();
    },[]);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500">Welcome back to your financial overview.</p>
                </div>
                <button onClick={()=>setIsModalOpen(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm font-medium">
                    <Plus size={20}/><span className="hidden sm:inline">Add Transaction</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard title="Total Balance" amount={totals.balance} icon={<Wallet className="text-blue-600"/>} bg="bg-blue-50"/>
                <StatCard title="Total Income" amount={totals.income} icon={<ArrowUpRight className="text-emerald-600"/>} bg="bg-emerald-50" textColor="text-emerald-600"/>
                <StatCard title="Total Expenses" amount={totals.expense} icon={<ArrowDownRight className="text-red-600"/>} bg="bg-red-50" textColor="text-red-600"/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-96 flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center flex-shrink-0">
                        <h2 className="font-bold text-slate-800">Recent Activity</h2>
                        <Link to="/transactions" className="font-thin text-emerald-600 hover:underline ">view All Transactions</Link>
                    </div>
                    <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
                        {transactions.length===0?(
                            <div className="p-8 text-center text-slate-500">No transactions yet.</div>
                        ):(
                            [...transactions].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0, 10).map((t)=>(
                                <div key={t._id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${t.type==='income'?'bg-emerald-50 text-emerald-600':'bg-red-50 text-red-600'}`}>
                                            {t.category==='Food'&&'🍔'}
                                            {t.category==='Transport'&&'🚗'}
                                            {t.category==='Salary'&&'💰'}
                                            {t.category==='Utilities'&&'💡'}
                                            {t.category==='Entertainment'&&'🎬'}
                                            {t.category==='Shopping'&&'🛍️'}
                                            {t.category==='Health'&&'🏥'}
                                            {t.category==='Investment'&&'📈'}
                                            {t.category==='Other'&&'📦'}
                                            {!['Food','Transport','Salary','Utilities','Entertainment','Shopping','Health','Investment','Other'].includes(t.category)&&'📄'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{t.description}</p>
                                            <p className="text-xs text-slate-500">{new Date(t.date).toLocaleDateString()} • {t.category}</p>
                                        </div>
                                    </div>
                                    <span className={`font-bold ${t.type==='income'?'text-emerald-600':'text-slate-900'}`}>
                                        {t.type==='income'?'+':'-'}₹{t.amount}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <Chart transactions={transactions} />
                </div>
            </div>
            <TransactionModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onSuccess={fetchTransactions}/>
        </div>
    );
}

function StatCard({title, amount, icon, bg, textColor="text-slate-900"}){
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                <h3 className={`text-2xl font-bold ${textColor}`}>₹{amount.toLocaleString()}</h3>
            </div>
            <div className={`p-3 rounded-lg ${bg}`}>{icon}</div>
        </div>
    );
}