import {__init__RestaurantInfo} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import produce from "immer"

export default function reducerRestaurant (state= __init__RestaurantInfo, action) {
    switch (action.type) {
        case actionTypes.SET_FOOD_LIST_CONVERTED:
            return produce(state, draftState =>{
                draftState.foodListConverted = action.payload.foodListConverted;
            });
        case actionTypes.SET_RES_FOODS:
            return produce(state, draftState =>{
                // order foods base on id
                let newFoodList = []
                for(const eFood of action.payload.foodList){
                    if (typeof eFood == "object")
                        newFoodList[eFood.id] = eFood;
                }
                draftState.foods = newFoodList;
            });
        case actionTypes.SET_RES_INFO:
            return produce(state, draftState =>{
                draftState.info = action.payload.resInfo;
            });
        default:
            return state;
    }
}
