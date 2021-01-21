import $ from 'jquery';
import getReduxStore from "../stores/reduxStore/getRedux";
import * as actions from "../stores/reduxStore/actions"

const BASE_API_URL = "https://api.cuki.ir/"



export const getRestaurantInfo = (callbackFunction)=>{
    let englishName = getReduxStore('englishName')
    $.post(BASE_API_URL+ "getAllRestaurantData.fetch.php" ,{english_name:englishName}).then(res=>{
        res = (res !== undefined && res !== null) ? res : {}
        if(res.statusCode === 200){
            actions.restaurantSetData(res.data)
        }
        console.log(res)
        callbackFunction(res);
    })
}