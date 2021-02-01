import $ from 'jquery';
import getReduxStore from "../stores/reduxStore/getRedux";
import * as actions from "../stores/reduxStore/actions"

const BASE_API_URL = "https://api.cuki.ir/v201/"



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