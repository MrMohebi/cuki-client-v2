import Cookies from "js-cookie";
import getComName from "../../functions/getComName";

let ComName = getComName()

const cookieNameOrderList = ComName+"OrderList_001210218"
const cookieNameToken = ComName+"Token_001210218"
const cookieNamePhone = ComName+"Phone_001210218"



export const setCacheToken = (token) =>{
    Cookies.set(cookieNameToken, token)
}

export const setCachePhone = (phone) =>{
    Cookies.set(cookieNamePhone, phone)
}

export const setCacheOrderList = (orderList) =>{
    let draftList = [...orderList]
    Cookies.set(cookieNameOrderList, draftList)
}

export const getCacheOrderList = () =>{
    if(Cookies.get(cookieNameOrderList) !== undefined){
        return [...JSON.parse(Cookies.get(cookieNameOrderList))];
    }
    else{
        return [] ;
    }

}

export const getCacheToken = () =>{
    return Cookies.get(cookieNameToken)
}

export const getCachePhone = () =>{
    return Cookies.get(cookieNamePhone)
}

export const removeCacheToken = () =>{
    Cookies.remove(cookieNameToken)
}