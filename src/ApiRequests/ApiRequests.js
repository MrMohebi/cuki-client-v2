import $ from 'jquery';
import getReduxStore from "../stores/reduxStore/getRedux";
import * as actions from "../stores/reduxStore/actions"

const BASE_API_URL = "https://api.cuki.ir/v201/"
const BASE_PAY_URL = "https://pay.cuki.ir/";


export const getRestaurantInfo = (callbackFunction)=>{
    let englishName = getReduxStore('englishName')
    $.post(BASE_API_URL+ "getAllRestaurantData.fetch.php" ,{englishName}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        if(res.statusCode === 200){
            actions.restaurantSetData(res.data)
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


export const checkCode = (callbackFunction, phone, vCode)=>{
    $.post(BASE_API_URL+ "login.modify.php" ,{phone:phone,vCode:vCode}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}

export const signUp = (callbackFunction, token, name, birthday, job)=>{
    $.post(BASE_API_URL+ "signup.modify.php" ,{token:token,name:name,birthday:birthday,job:job}).then(res=>{
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
    let englishName = getReduxStore('englishName')
    $.post(BASE_API_URL+ "getCustomerInfo.fetch.php" ,{token, englishName}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}


export const sendOrder = (callbackFunction,table,address, foodsList)=>{
    let token = getReduxStore('token')
    let englishName = getReduxStore('englishName')
    let details =  {general: '', eachFood: []}
    $.post(BASE_API_URL+ "sendOrder.add.php" ,{englishName, token, orders:JSON.stringify(foodsList),details:JSON.stringify(details),deliveryPrice:'0',orderTable:table,address:JSON.stringify(address)}).then(res=>{
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
    let englishName = getReduxStore('englishName')
    $.post(BASE_API_URL+ "getOrderByTrackingId.fetch.php" ,{token, trackingId, englishName}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}



export const sendPaymentRequestFood = (callbackFunction, items, amount, trackingId)=>{
    let token = getReduxStore('token')
    let englishName = getReduxStore('englishName')
    let newItems = items.filter(eFood=>eFood.number > 0);
    $.post(BASE_PAY_URL+ "createpayment.php" ,{englishName, token, itemType:"food", items:JSON.stringify(newItems), amount, trackingId}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        callbackFunction(res);
    })
}





