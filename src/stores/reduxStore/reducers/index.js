import {combineReducers} from "redux";
import reducerRestaurant from "./reducerRestaurant";
import reducerUser from "./reducerUser";
import reducerFrontStates from "./reducerFrontStates";
import reducerTempData from "./reducerTempData";

export const rootReducer =  combineReducers({
    rFrontStates:reducerFrontStates,
    rUserInfo:reducerUser,
    rRestaurantInfo:reducerRestaurant,
    rTempData:reducerTempData
});
