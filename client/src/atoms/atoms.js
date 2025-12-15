import { atom, selector } from "recoil";

export const loggedIn=atom({
    key:"loggedIn",
    default:!!localStorage.getItem('token')
})

export const isNewUser=atom({
    key:"isNewUser",
    default:false
})

export const transactions=atom({
    key:"transactions",
    default:[]
})

export const user=atom({
    key:"user",
    default:{ firstName: '', lastName: '', email: '' }
})


export const totalsSelector =selector({
    key: "totalsSelector",
    get: ({get})=>{
        const allTransactions=get(transactions);
        const income=allTransactions
            .filter(t=>t.type==='income')
            .reduce((acc, t)=>acc+t.amount, 0);
            
        const expense=allTransactions
            .filter(t=>t.type==='expense')
            .reduce((acc, t)=>acc+t.amount, 0);

        return {
            income,
            expense,
            balance: income - expense
        };
    }
});