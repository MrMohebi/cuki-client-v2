import {store} from "./store";
import {initsNames2reducerName} from "./reducers";
import * as initReducers from "./reducers/__init__Reducers"

export default function getReduxStore(key){
    for(let iName in initsNames2reducerName){
        if(Object.keys(initReducers[iName]).indexOf(key) !== -1){
            return store.getState()[initsNames2reducerName[iName]][key];
        }
    }
    return null;
}
