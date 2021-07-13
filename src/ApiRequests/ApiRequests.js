import $ from 'jquery';
import getReduxStore from "../stores/reduxStore/getRedux";
import * as ls from "../stores/localStorage/localStorage"
import getComName from "../functions/getComName";
import * as adaptors from "./Adaptors";

const BASE_PAY_URL = "https://api.cukim.ir/api/v1/pay/";
const BASE_API_URL_CUKIM_V1 = "https://api.cukim.ir/api/v1/cuki/"


export const getRestaurantParts = (callbackFunction)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "getResParts" ,{resEnglishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getOffCodes = (callbackFunction)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1+ "getOffCodes" ,{token,resEnglishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getRestaurantFoods = (callbackFunction)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "getResFoods" ,{resEnglishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getRestaurantInfo = (callbackFunction)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "getResInfo" ,{resEnglishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        if(res.statusCode === 200){
            ls.setLSResInfo(res.data)
            document.title = res.data.englishName;
            document.getElementById('app-name').name = res.data.englishName
            document.getElementById('favicon').href = res.data['favicon_link']
            document.getElementById('favicon-apple').href = res.data['favicon_link']
        }
        callbackFunction(res);
    })
}

export const validateOffCode = (offCode,amount,callbackFunction)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1+ "validateOffCode" ,{token,resEnglishName:getComName(),offCode,amount}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getRestaurantUpdateDates = (callbackFunction)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "getResUpdateDates" ,{resEnglishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getFoodById = (foodId)=>{
    if(typeof foodId == "object")
        foodId = JSON.stringify(foodId)
    return $.ajax({method: "POST", url: BASE_API_URL_CUKIM_V1+ "getFoodById", data: { foodId:foodId , resEnglishName:getComName()}, async:false})['responseJSON']
}


export const sendVCode = (callbackFunction,phone)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "sendVCode" ,{phone:phone}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}
export const getResByCode = (resCode,callbackFunction)=>{
    $.post(BASE_API_URL_CUKIM_V1 + "getResENameByCode",{resCode}).then(res=>{
        callbackFunction(res)
    })
}

export const checkCode = (callbackFunction, phone, vCode)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "verifyVCode" ,{phone:phone,vCode:vCode}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const signUp = (callbackFunction, name, birthday, job)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1+ "setUserInfo" ,{token,name:name,birthday:birthday,job:job}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}
export const callPager = (table,callbackFunction)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "callPager" ,{resEnglishName:getComName(),table}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const changeUserInfo = (callbackFunction, token, name, birthday, job)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "setUserInfo" ,{token,name:name,birthday:birthday,job:job}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getUserInfo = (callbackFunction)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1 + "getUserInfo" ,{token}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getCustomerInfo = (callbackFunction)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1 + "getCustomerInfo" ,{token, resEnglishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        res.data = adaptors.getCustomerInfoTOGetCustomerInfo(res.data)
        callbackFunction(res);
    })
}


export const sendOrder = (callbackFunction,table,address, foodsList, generalDetails = "")=>{
    let token = getReduxStore('token')
    let details =  {general: generalDetails, eachFood: []}
    $.post(BASE_API_URL_CUKIM_V1 + "sendOrder" ,{resEnglishName:getComName(), token, items:JSON.stringify(foodsList),details:JSON.stringify(details),deliveryPrice:'0',table:table,address:JSON.stringify(address)}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getPaymentInfoByTrackingId = (callbackFunction, trackingId)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1 + "getPaymentByTrackingId" ,{token, trackingId}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getOrderByTrackingId = (callbackFunction, trackingId)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1 + "getOrderByTrackingId" ,{token, trackingId, resEnglishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        res.data = adaptors.getOrderByTrackingIdTOGetOrderByTrackingId(res.data);
        callbackFunction(res);
    })
}



export const sendPaymentRequestFood = (callbackFunction, items, amount, trackingId)=>{
    let token = getReduxStore('token')
    let newItems = items.filter(eFood=>eFood.number > 0);
    $.post(BASE_PAY_URL + "createLink" ,{resEnglishName:getComName(), token, itemType:"food", items:JSON.stringify(newItems), amount, trackingId}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getOpenOrders = (callbackFunction, dToken = null)=>{
    let token = dToken ? dToken : getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1+ "getOpenOrders" ,{resEnglishName:getComName(), token}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        res.data = adaptors.getOrderByTrackingIdTOGetOrderByTrackingId(res.data);
        callbackFunction(res);
    })
}


export const getCommentsByFoodId = (callbackFunction, foodId, lastOneDate, number)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1+ "getCommentsByFoodId" ,{resEnglishName:getComName(), token, foodId, lastDate:lastOneDate, number}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const sendComment = (callbackFunction, foodId, body)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL_CUKIM_V1+ "sendComment" ,{resEnglishName:getComName(), token, foodId, body}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getTempToken = (callbackFunction,ip, userAgent, isp="",city="")=>{
    $.post(BASE_API_URL_CUKIM_V1+ "getTempToken" ,{resEnglishName:getComName(), ip, userAgent, isp, city}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getIP = (callbackFunction)=>{
    $.getJSON(BASE_API_URL_CUKIM_V1 + "getIpInfo").then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}