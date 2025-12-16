import {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import instance from '../api/axios';

export function TransactionModal({isOpen, onClose, onSuccess, transactionToEdit}){
    const [formData,setFormData]=useState({description:'', amount:'', type:'expense', category:'Food'});
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        if(transactionToEdit){
            setFormData({
                description: transactionToEdit.description,
                amount: transactionToEdit.amount,
                type: transactionToEdit.type,
                category: transactionToEdit.category
            });
        }else{
            setFormData({description:'', amount:'', type:'expense', category:'Food'});
        }
    },[transactionToEdit, isOpen]);

    if(!isOpen) return null;

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const url=transactionToEdit ? `/transactions/${transactionToEdit._id}` : '/transactions';
            const method=transactionToEdit ? 'put' : 'post';
            
            const res=await instance[method](url, formData);

            if(res.status===200 || res.status===201){
                onSuccess();
                onClose();
            }
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">{transactionToEdit ? 'Edit Transaction' : 'New Transaction'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24}/></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" onClick={()=>setFormData({...formData, type:'expense'})} className={`py-2 rounded-lg font-medium transition-colors ${formData.type==='expense'?'bg-red-100 text-red-700 border border-red-200':'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>Expense</button>
                        <button type="button" onClick={()=>setFormData({...formData, type:'income'})} className={`py-2 rounded-lg font-medium transition-colors ${formData.type==='income'?'bg-emerald-100 text-emerald-700 border border-emerald-200':'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>Income</button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                        <input type="number" required placeholder="0.00" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg" value={formData.amount} onChange={(e)=>setFormData({...formData, amount:Number(e.target.value)})}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" value={formData.category} onChange={(e)=>setFormData({...formData, category:e.target.value})}>
                            {['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Health', 'Salary', 'Investment', 'Other'].map(c=><option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <input type="text" required placeholder="What was this for?" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})}/>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors mt-2">{loading ? 'Saving...' : (transactionToEdit ? 'Update Transaction' : 'Save Transaction')}</button>
                </form>
            </div>
        </div>
    );
}