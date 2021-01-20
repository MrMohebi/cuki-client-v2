import {combineReducers} from "redux";
import reducerRestaurant from "./reducerRestaurant";
import reducerUser from "./reducerUser";
import reducerFrontStates from "./reducerFrontStates";
import reducerTempData from "./reducerTempData";

export const rootReducer =  combineReducers({
    rRestaurantInfo:reducerRestaurant,
    rUserInfo:reducerUser,
    rFrontStates:reducerFrontStates,
    rTempData:reducerTempData,
});

export const initsNames2reducerName = {
    __init__RestaurantInfo:'rRestaurantInfo',
    __init__UserInfo:'rUserInfo',
    __init__FrontStates:"rFrontStates",
    __init__TempData:'rTempData',
}