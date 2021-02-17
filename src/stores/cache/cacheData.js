import Cookies from "js-cookie";

const cookieNameOrderList = "cukiOrderList_001210218"
const cookieNameToken = "cukiToken_001210218"



export const setCacheToken = (token) =>{
    Cookies.set(cookieNameToken, token)
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


export const removeCacheToken = () =>{
    Cookies.remove(cookieNameToken)
}