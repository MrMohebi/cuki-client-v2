import getComName from "../../functions/getComName";

let ComName = getComName()

const lSNameOrderList = ComName+"OrderList_010312"
const lSNameToken = ComName+"Token_010312"
const lSNamePhone = ComName+"Phone_010312"
const lSNamePager = ComName+"Pager_010312"


export const setLSToken = (token) =>{
    localStorage.setItem(lSNameToken, token)
}
export const getLSToken = () =>{
    return localStorage.getItem(lSNameToken)
}
export const removeCacheToken = () =>{
    localStorage.removeItem(lSNameToken)
}


export const setLSPhone = (phone) =>{
    localStorage.setItem(lSNamePhone, phone)
}
export const getLSPhone = () =>{
    return localStorage.getItem(lSNamePhone)
}


export const setLSPager = (pagerTimestamp) =>{
    localStorage.setItem(lSNamePager, pagerTimestamp)
}
export const getLSPager = () =>{
    return localStorage.getItem(lSNamePager)
}
