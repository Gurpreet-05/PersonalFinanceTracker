import { atom } from "recoil";

export const loggedIn=atom({
    key:"loggedIn",
    default:false
})

export const isNewUser=atom({
    key:"isNewUser",
    default:false
})