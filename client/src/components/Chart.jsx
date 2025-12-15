import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS=['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#6366F1', '#EC4899', '#64748B', '#06B6D4'];

export function Chart({transactions}){
    const processData=()=>{
        const expenses=transactions.filter(t=>t.type==='expense');
        const categoryMap={};

        expenses.forEach(t=>{
            if(categoryMap[t.category]){
                categoryMap[t.category]+=t.amount;
            }else{
                categoryMap[t.category]=t.amount;
            }
        });

        return Object.keys(categoryMap).map(category=>({
            name: category,
            value: categoryMap[category]
        })).sort((a,b)=>b.value-a.value); 
    };

    const data=processData();

    if(data.length===0){
        return (
            <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No expenses to show yet
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
            <h2 className="font-bold text-slate-800 mb-4">Expenses by Category</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry,index)=>(
                            <Cell key={`cell-${index}`} fill={COLORS[index%COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value)=>`₹${value.toLocaleString()}`}
                        contentStyle={{backgroundColor:'white', borderRadius:'8px', border:'1px solid #e2e8f0'}}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}