import {__init__RestaurantInfo} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import produce from "immer"

export default function reducerRestaurant (state= __init__RestaurantInfo, action) {
    switch (action.type) {
        case actionTypes.SET_RESTAURANT_DATA:
            return produce(state, draftState =>{
                draftState.foods = action.payload.restaurantData.foods;
                draftState.restaurantInfo = action.payload.restaurantData.restaurantInfo;
            });
        case actionTypes.SET_FOOD_LIST_CONVERTED:
            return produce(state, draftState =>{
                draftState.foodListConverted = action.payload.foodListConverted;
            });
        case actionTypes.SET_RES_ENGLISH_NAME:
            return produce(state, draftState =>{
                draftState.englishName = action.payload.resEnglishName;
            });
        case actionTypes.SET_RES_PARTS:
            return produce(state, draftState =>{
                draftState.resParts = action.payload.resParts;
            });
        default:
            return state;
    }
}
