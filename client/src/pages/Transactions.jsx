import {useEffect, useState} from "react";
import {Pencil, Trash2} from "lucide-react";
import {TransactionModal} from "../components/TransactionModal.jsx";
import {useRecoilState} from "recoil";
import {transactions as transactionsAtom} from "../atoms/atoms.js";
import instance from "../api/axios.js";

export function Transactions(){
    const [transactions,setTransactions]=useRecoilState(transactionsAtom);
    const [filter,setFilter]=useState('all');
    const [loading,setLoading]=useState(false);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [editItem,setEditItem]=useState(null);

    const fetchTransactions=async()=>{
        setLoading(true);
        try{
            const res=await instance.get(`/transactions?frequency=${filter}`);
            setTransactions(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };

    const handleEdit=(transaction)=>{
        setEditItem(transaction);
        setIsModalOpen(true);
    };

    const handleDelete=async(id)=>{
        if(!window.confirm("Are you sure you want to delete this?")) return;
        try{
            const res=await instance.delete(`/transactions/${id}`);
            if(res.status===200) setTransactions(transactions.filter(t=>t._id!==id));
        }catch(error){
            console.error("Failed to delete", error);
        }
    };

    useEffect(()=>{
        fetchTransactions();
    },[filter]);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
                <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                    {['all', 'week', 'month', 'year'].map((f)=>(
                        <button key={f} onClick={()=>setFilter(f)} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize ${filter===f?'bg-slate-800 text-white shadow-sm':'text-slate-600 hover:bg-slate-50'}`}>
                            {f==='all'?'All Time':f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {loading?(
                    <div className="p-12 text-center text-slate-500">Loading history...</div>
                ):(
                    <div className="divide-y divide-slate-200">
                        {transactions.map((t)=>(
                            <div key={t._id} className="group flex items-center justify-between p-4 hover:bg-slate-50">
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
                                        <p className="font-bold text-slate-800">{t.description}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{t.category}</span>
                                            <span>{new Date(t.date).toDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className={`font-bold ${t.type==='income'?'text-emerald-600':'text-slate-900'}`}>{t.type==='income'?'+':'-'}₹{t.amount}</p>
                                    </div>
                                    <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button onClick={()=>handleEdit(t)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full " title="Edit"><Pencil size={18}/></button>
                                        <button onClick={()=>handleDelete(t._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full " title="Delete"><Trash2 size={18}/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {transactions.length===0 && <div className="p-12 text-center text-slate-500">No transactions found.</div>}
                    </div>
                )}
            </div>
            <TransactionModal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false); setEditItem(null);}} onSuccess={fetchTransactions} transactionToEdit={editItem}/>
        </div>
    );
}