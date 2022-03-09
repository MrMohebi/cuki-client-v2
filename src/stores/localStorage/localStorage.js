import getComName from "../../functions/getComName";
import foodsListAdaptor from "../../functions/foodsListAdaptor";

let ComName = getComName()

const lSNameToken = "generalToken_010313"
const lSNamePhone = "generalPhone_010313"
const lSNamePager = ComName+"Pager_010313"
const lSNameResParts = ComName+"ResParts_020627"
const lSNameResInfo = ComName+"ResInfo_010627"
const lSNameResFoods = ComName+"ResFoods_010627"
const lSNameResFullInfoCategories = ComName+"ResFullInfoCategories_010627"


// -------------------------------------------------------------------------------
export const setLSResFullInfoCategories = (resFullInfoCategories) =>{
    if(typeof resFullInfoCategories !== "string") {resFullInfoCategories = JSON.stringify(resFullInfoCategories)}
    localStorage.setItem(lSNameResFullInfoCategories, resFullInfoCategories)
}
export const getLSResFullInfoCategories = () =>{
    let lSResFullInfoCategories = localStorage.getItem(lSNameResFullInfoCategories)
    if(lSResFullInfoCategories !== undefined && lSResFullInfoCategories !== null) {
        return JSON.parse(lSResFullInfoCategories)
    }else{
        return []
    }
}
// -------------------------------------------------------------------------------
export const setLSResFoods = (resFoods) =>{
    // create category again
    setLSResFullInfoCategories(foodsListAdaptor(resFoods))
    // order foods base on id
    let newFoodList = []
    for(const eFood of resFoods){
        if (typeof eFood == "object")
            newFoodList[eFood.id] = eFood;
    }
    localStorage.setItem(lSNameResFoods, JSON.stringify(newFoodList))
}
export const getLSResFoods = () =>{
    let lSResFoods = localStorage.getItem(lSNameResFoods)
    if(lSResFoods !== undefined && lSResFoods !== null) {
        return JSON.parse(lSResFoods)
    }else{
        return []
    }
}
// -------------------------------------------------------------------------------
export const setLSResInfo = (resInfo) =>{
    if(typeof resInfo !== "string") {resInfo = JSON.stringify(resInfo);}
    localStorage.setItem(lSNameResInfo, resInfo)
}
export const getLSResInfo = () =>{
    let lSResInfo = localStorage.getItem(lSNameResInfo)
    if(lSResInfo !== undefined && lSResInfo !== null) {
        return JSON.parse(lSResInfo)
    }else{
        return {}
    }
}
// -------------------------------------------------------------------------------
export const setLSResParts = (resParts) =>{
    if(typeof resParts !== "string") {resParts = JSON.stringify(resParts);}
    localStorage.setItem(lSNameResParts, resParts)
}
export const getLSResParts = () =>{
    let lSResParts = localStorage.getItem(lSNameResParts)
    if(lSResParts !== undefined && lSResParts !== null) {
        return JSON.parse(lSResParts)
    }else{
        return []
    }
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
