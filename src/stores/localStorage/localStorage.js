import getComName from "../../functions/getComName";

let ComName = getComName()

const lSNameToken = ComName+"Token_010312"
const lSNamePhone = ComName+"Phone_010312"
const lSNamePager = ComName+"Pager_010312"
const lSNameResParts = ComName+"ResParts_020626"
const lSNameResInfo = ComName+"ResInfo_010626"
const lSNameResInfoUpdatedAt = ComName+"ResInfoUpdatedAt_010626"
const lSNameResFoods = ComName+"ResFoods_010626"
const lSNameResFoodsUpdatedAt = ComName+"ResFoodsUpdatedAt_010626"



// -------------------------------------------------------------------------------
export const setLSResFoodsUpdatedAt = (resFoodsUpdatedAt) =>{
    localStorage.setItem(lSNameResFoodsUpdatedAt, resFoodsUpdatedAt)
}
export const getLSResFoodsUpdatedAt = () =>{
    let lSResFoodsUpdatedAt = localStorage.getItem(lSNameResFoodsUpdatedAt)
    return (lSResFoodsUpdatedAt !== null && lSResFoodsUpdatedAt !== undefined) ? lSResFoodsUpdatedAt : ""
}
// -------------------------------------------------------------------------------
export const setLSResFoods = (resFoods) =>{
    if(typeof resFoods !== "string") {resFoods = JSON.stringify(resFoods)}
    localStorage.setItem(lSNameResFoods, resFoods)
}
export const getLSResFoods = () =>{
    let lSResFoods = localStorage.getItem(lSNameResFoods)
    if(lSResFoods !== undefined && lSResFoods !== null) {lSResFoods = JSON.parse(lSResFoods)}
    return (lSResFoods !== null && lSResFoods !== undefined) ? lSResFoods : ""
}
// -------------------------------------------------------------------------------
export const setLSResInfoUpdatedAt = (resInfoUpdatedAt) =>{
    localStorage.setItem(lSNameResInfoUpdatedAt, resInfoUpdatedAt)
}
export const getLSResInfoUpdatedAt = () =>{
    let lSResInfoUpdatedAt = localStorage.getItem(lSNameResInfoUpdatedAt)
    return (lSResInfoUpdatedAt !== null && lSResInfoUpdatedAt !== undefined) ? lSResInfoUpdatedAt : ""
}
// -------------------------------------------------------------------------------
export const setLSResInfo = (resInfo) =>{
    if(typeof resInfo !== "string") {resInfo = JSON.stringify(resInfo);}
    localStorage.setItem(lSNameResInfo, resInfo)
}
export const getLSResInfo = () =>{
    let lSResInfo = localStorage.getItem(lSNameResInfo)
    if(lSResInfo !== undefined && lSResInfo !== null) {lSResInfo = JSON.parse(lSResInfo);}
    return (lSResInfo !== null && lSResInfo !== undefined) ? lSResInfo : ""
}
// -------------------------------------------------------------------------------
export const setLSResParts = (resParts) =>{
    if(typeof resParts !== "string") {resParts = JSON.stringify(resParts);}
    localStorage.setItem(lSNameResParts, resParts)
}
export const getLSResParts = () =>{
    let lSResParts = localStorage.getItem(lSNameResParts)
    if(lSResParts !== undefined && lSResParts !== null) {lSResParts = JSON.parse(lSResParts);}
    return (lSResParts !== null && lSResParts !== undefined) ? lSResParts : ""
}
// -------------------------------------------------------------------------------
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
// -------------------------------------------------------------------------------
export const setLSPhone = (phone) =>{
    localStorage.setItem(lSNamePhone, phone)
}
export const getLSPhone = () =>{
    let lSPhone = localStorage.getItem(lSNamePhone)
    return (lSPhone !== null && lSPhone !== undefined) ? lSPhone : ""
}
// -------------------------------------------------------------------------------
export const setLSPager = (pagerTimestamp) =>{
    localStorage.setItem(lSNamePager, pagerTimestamp)
}
export const getLSPager = () =>{
    let lSPager = localStorage.getItem(lSNamePager)
    return (lSPager !== null && lSPager !== undefined) ? lSPager : ""
}
// -------------------------------------------------------------------------------
