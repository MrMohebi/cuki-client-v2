import {__init__TempData} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import {produce} from "immer"

export default function reducerTempData (state = __init__TempData, action) {
    switch (action.type) {
        case actionTypes.SET_ORDER_LIST:
            return produce(state, draftState=>{
                draftState.orderList = action.payload.orderList
            });
        case actionTypes.ADD_FOOD_TO_ORDERS:
            return produce(state, draftState=>{
                draftState.orderList = [...draftState.orderList, action.payload.food]
            });

        case actionTypes.DELETE_FOOD_FROM_ORDERS:
            return produce(state, draftState=>{
                draftState.orderList = draftState.orderList.filter(food=> food.foods_id !== action.payload.foods_id)
            });

        case actionTypes.INCREASE_FOOD_NUMBER:
            return produce(state, draftState=>{
                draftState.orderList = draftState.orderList.map(food=> {
                    if(food.foods_id === action.payload.foods_id){
                        food.number += 1;
                        food.totalPrice +=  food.price
                        return food;
                    }else {
                        return food;
                    }
                })
            });

        case actionTypes.DECREASE_FOOD_NUMBER:
            return produce(state, draftState=>{
                draftState.orderList = draftState.orderList.map(food=> {
                    if(food.foods_id === action.payload.foods_id){
                        food.number -= 1;
                        food.totalPrice -= food.price
                        return food;
                    }else {
                        return food;
                    }
                })
            });

        case actionTypes.SET_TRACKING_ID:
            return produce(state, draftState=>{
                draftState.trackingId = action.payload.trackingId
            });

        case actionTypes.SET_OPEN_ORDERS_LIST_INFO:
            return produce(state, draftState=>{
                draftState.openOrdersList = action.payload.openOrdersList;
            });

        case actionTypes.DELETE_USER_ALL_DATA:
            return produce(state, draftState=>{
                draftState.openOrdersList = [];
            });

        case actionTypes.SET_TEMP_OPEN_ORDER_INFO:
            return produce(state, draftState=>{
                draftState.tempOpenOrderInfo = action.payload.orderInfo;
            });

        case actionTypes.SET_TEMP_HISTORY_ORDER_INFO:
            return produce(state, draftState=>{
                draftState.tempHistoryOrderInfo = action.payload.orderInfo;
            });

        case actionTypes.SET_TABLE_SCANNED:
            return produce(state, draftState=>{
                draftState.tableScanned = action.payload.table;
            });

        case actionTypes.SET_TEMP_PHONE:
            return produce(state, draftState=>{
                draftState.tempPhone = action.payload.phone;
            });
        default:
            return state
    }
}
