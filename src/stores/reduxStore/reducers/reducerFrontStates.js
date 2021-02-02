import {__init__FrontStates} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import produce from "immer"

export default function reducerFrontStates (state = __init__FrontStates, action) {

    switch (action.type) {
        case actionTypes.SET_V_CODE:
            return produce(state, draftState =>{
                draftState.VCodeSent = action.payload.sentVCode;
            });
        case actionTypes.MISSING_USER_INFO:
            return produce(state, draftState =>{
                draftState.missingUserInfo = action.payload.missingUserInfo;
            });
        case actionTypes.SET_TOUR360_PHOTO:
            return produce(state, draftState =>{
                draftState.tour360Photo = action.payload.photo;
            });
        default:
            return state;
    }
}