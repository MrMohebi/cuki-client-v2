import getComName from "../../functions/getComName";

let ComName = getComName()

const lSNameToken = ComName+"Token_010312"
const lSNamePhone = ComName+"Phone_010312"
const lSNamePager = ComName+"Pager_010312"


export const setLSToken = (token) =>{
    localStorage.setItem(lSNameToken, token)
}
export const getLSToken = () =>{
    let lSToken = localStorage.getItem(lSNameToken)
    return (lSToken !== null && lSToken !== undefined) ? lSToken : ""
}
export const removeCacheToken = () =>{
    localStorage.removeItem(lSNameToken)
}


export const setLSPhone = (phone) =>{
    localStorage.setItem(lSNamePhone, phone)
}
export const getLSPhone = () =>{
    let lSPhone = localStorage.getItem(lSNamePhone)
    return (lSPhone !== null && lSPhone !== undefined) ? lSPhone : ""
}


export const setLSPager = (pagerTimestamp) =>{
    localStorage.setItem(lSNamePager, pagerTimestamp)
}
export const getLSPager = () =>{
    let lSPager = localStorage.getItem(lSNamePager)
    return (lSPager !== null && lSPager !== undefined) ? lSPager : ""
}
