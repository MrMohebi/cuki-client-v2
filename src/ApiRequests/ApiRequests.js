import $ from 'jquery';
import React from "react";

const BASE_API_URL = "https://api.cuki.ir/"



export const getRestaurantInfo = (callbackFunction)=>{
    // let englishName = store.getState().reducerRestaurant.englishName
    //change line below
    $.post(BASE_API_URL+ "getAllRestaurantData.fetch.php" ,{english_name:"englishName"}).then(res=>{
        if(res.statusCode === 200){
            // actions.restaurantSetData(res.data)
        }
        callbackFunction(res);
        return res;
    })
}