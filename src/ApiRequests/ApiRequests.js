import $ from 'jquery';
import getReduxStore from "../stores/reduxStore/getRedux";
import * as actions from "../stores/reduxStore/actions"
import getComName from "../functions/getComName";
import * as adaptors from "./Adaptors";

const BASE_API_URL = "https://api.cuki.ir/v201/";
const BASE_PAY_V2_URL = "https://pay.cuki.ir/v2/";


const BASE_API_URL_CUKIM_V1 = "https://api.cukim.ir/api/v1/cuki/"



export const getRestaurantInfo = (callbackFunction)=>{
    $.post(BASE_API_URL_CUKIM_V1+ "getResData" ,{resEnglishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        res.data = adaptors.getAllRestaurantDataTOGetResData(res.data)
        if(res.statusCode === 200){
            actions.restaurantSetData(res.data)
            document.title = res.data.restaurantInfo.english_name;
            document.getElementById('app-name').name = res.data.restaurantInfo.english_name
            document.getElementById('favicon').href = res.data.restaurantInfo['favicon_link']
            document.getElementById('favicon-apple').href = res.data.restaurantInfo['favicon_link']
        }
        callbackFunction(res);
    })
}


export const sendVCode = (callbackFunction,phone)=>{
    $.post(BASE_API_URL+ "sendVCode.add.php" ,{phone:phone}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        if(res.statusCode === 200){

        }
        callbackFunction(res);
    })
}
export const getResByCode = (resCode,callbackFunction)=>{
    $.post(BASE_API_URL + "getResNameByCode.fetch.php",{resCode}).then(res=>{
        callbackFunction(res)
    })
}

export const checkCode = (callbackFunction, phone, vCode)=>{
    $.post(BASE_API_URL+ "login.modify.php" ,{phone:phone,vCode:vCode}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const signUp = (callbackFunction, name, birthday, job)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL+ "signup.modify.php" ,{token,name:name,birthday:birthday,job:job}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}
export const callPager = (table,callbackFunction)=>{
    $.post(BASE_API_URL+ "callPager.add.php" ,{resEnglishName:getComName(),table}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const changeUserInfo = (callbackFunction, token, name, birthday, job)=>{
    $.post(BASE_API_URL+ "changeUserInfo.modify.php" ,{token:token,name:name,birthday:birthday,job:job}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getUserInfo = (callbackFunction)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL+ "getUserInfo.fetch.php" ,{token}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getCustomerInfo = (callbackFunction)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL+ "getCustomerInfo.fetch.php" ,{token, englishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const sendOrder = (callbackFunction,table,address, foodsList, generalDetails = "")=>{
    let token = getReduxStore('token')
    let details =  {general: generalDetails, eachFood: []}
    $.post(BASE_API_URL+ "sendOrder.add.php" ,{englishName:getComName(), token, orders:JSON.stringify(foodsList),details:JSON.stringify(details),deliveryPrice:'0',orderTable:table,address:JSON.stringify(address)}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getPaymentInfoByTrackingId = (callbackFunction, trackingId)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL+ "getPaymentInfoByTrackingId.fetch.php" ,{token, trackingId}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getOrderByTrackingId = (callbackFunction, trackingId)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL+ "getOrderByTrackingId.fetch.php" ,{token, trackingId, englishName:getComName()}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}



export const sendPaymentRequestFood = (callbackFunction, items, amount, trackingId)=>{
    let token = getReduxStore('token')
    let newItems = items.filter(eFood=>eFood.number > 0);
    $.post(BASE_PAY_V2_URL+ "createPayment.php" ,{englishName:getComName(), token, itemType:"food", items:JSON.stringify(newItems), amount, trackingId}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getOpenOrders = (callbackFunction, dToken = null)=>{
    let token = dToken ? dToken : getReduxStore('token')
    $.post(BASE_API_URL+ "getOpenOrders.fetch.php" ,{englishName:getComName(), token}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getCommentsByFoodId = (callbackFunction, foodId, lastOneDate, number)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL+ "getCommentsByFoodId.fetch.php" ,{englishName:getComName(), token, foodId, lastDate:lastOneDate, number}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const sendComment = (callbackFunction, foodId, body)=>{
    let token = getReduxStore('token')
    $.post(BASE_API_URL+ "sendComment.add.php" ,{englishName:getComName(), token, foodId, body}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const getTempToken = (callbackFunction,ip, userAgent, isp="",city="")=>{
    $.post(BASE_API_URL+ "getTempToken.add.php" ,{resEnglishName:getComName(), ip, userAgent, isp, city}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const getIP = (callbackFunction)=>{
    $.getJSON(BASE_API_URL+ "getIpInfo.php").then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}