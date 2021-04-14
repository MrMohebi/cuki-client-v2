import {__init__UserInfo} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import {produce} from "immer"
import {setLSToken, getLSPhone} from "../../localStorage/localStorage";

export default function reducerUser (state = __init__UserInfo, action) {
    if(action.type === actionTypes.SET_TOKEN){
        setLSToken(action.payload.token);
        return produce(state,  stateUser_Draft =>{
            stateUser_Draft.token = action.payload.token
        });
    }else if(action.type === actionTypes.SET_PHONE){
        getLSPhone(action.payload.phone);
        return produce(state, stateUser_Draft =>{
            stateUser_Draft.phone = action.payload.phone
        });
    }else if(action.type === actionTypes.SET_USER_DATA){
        return produce(state, stateUser_Draft =>{
            stateUser_Draft.name = action.payload.userData.name;
            stateUser_Draft.phone = action.payload.userData.phone;
            stateUser_Draft.birthday = action.payload.userData.birthday;
            stateUser_Draft.job = action.payload.userData.job
            stateUser_Draft.totalBoughtAll = action.payload.userData['allTotalBought']
            stateUser_Draft.favoritePlaces = action.payload.userData.favoritePlaces
        });
    }else if(action.type === actionTypes.SET_CUSTOMER_DATA){
        return produce(state, stateUser_Draft =>{
            stateUser_Draft.totalBoughtRestaurant = action.payload.customerInfo['totalBought'];
            stateUser_Draft.orderTimesRestaurant = action.payload.customerInfo['orderTimes'];
            stateUser_Draft.scoreRestaurant = action.payload.customerInfo['score'];
            stateUser_Draft.rankRestaurant = action.payload.customerInfo.rank;
            stateUser_Draft.lastOrderRestaurant = action.payload.customerInfo['lastOrderDate'];
            stateUser_Draft.orderHistoryRestaurant = action.payload.customerInfo['orderList'];
        });
    }else if(action.type === actionTypes.DELETE_USER_ALL_DATA){
        return __init__UserInfo
    } else {
        return state;
    }
}