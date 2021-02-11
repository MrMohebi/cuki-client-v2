import * as actionTypes from './actionTypes'
import {store} from './store'


export const userDeleteAllData = () => (
    store.dispatch({
        type: actionTypes.DELETE_USER_ALL_DATA,
    })
)


export const userSetPhone = phone => (
    store.dispatch({
        type: actionTypes.SET_PHONE,
        payload:{
            phone
        }
    })
)

export const userSetToken = token => (
    store.dispatch({
        type: actionTypes.SET_TOKEN,
        payload:{
            token
        }
    })
)


export const restaurantSetData = restaurantData => (
    store.dispatch({
        type: actionTypes.SET_RESTAURANT_DATA,
        payload:{
            restaurantData
        }
    })
)

export const userSetData = userData => (
    store.dispatch({
        type: actionTypes.SET_USER_DATA,
        payload:{
            userData
        }
    })
)




export const addFoodToOrders = food => (
    store.dispatch({
        type: actionTypes.ADD_FOOD_TO_ORDERS,
        payload:{
            food
        }
    })
)



export const deleteFoodFromOrders = foods_id => (
    store.dispatch({
        type: actionTypes.DELETE_FOOD_FROM_ORDERS,
        payload:{
            foods_id
        }
    })
)


export const increaseFoodNumber = foods_id => (
    store.dispatch({
        type: actionTypes.INCREASE_FOOD_NUMBER,
        payload:{
            foods_id
        }
    })
)


export const decreaseFoodNumber = foods_id => (
    store.dispatch({
        type: actionTypes.DECREASE_FOOD_NUMBER,
        payload:{
            foods_id
        }
    })
)


export const userSetCustomerInfo = (customerInfo) =>{
    store.dispatch({
        type: actionTypes.SET_CUSTOMER_DATA,
        payload:{
            customerInfo
        }
    })
}

//
// export const userConvertTrackingIdToOrderObject = (orderObjects) =>{
//     store.dispatch({
//         type: actionTypes.CONVERT_TRACKING_ID_TO_ORDER_OBJECT,
//         payload:{
//             orderObjects
//         }
//     })
// }
//

export const setTrackingId = (trackingId) =>{
    store.dispatch({
        type: actionTypes.SET_TRACKING_ID,
        payload:{
            trackingId
        }
    })
}

export const setMissingUserInfo = (missingUserInfo) =>{
    store.dispatch({
        type: actionTypes.MISSING_USER_INFO,
        payload:{
            missingUserInfo
        }
    })
}

export const setSentVCode = (sentVCode) =>{
    store.dispatch({
        type: actionTypes.SET_V_CODE,
        payload:{
            sentVCode
        }
    })
}



export const setOrderList = (orderList) =>{
    store.dispatch({
        type: actionTypes.SET_ORDER_LIST,
        payload:{
            orderList
        }
    })
}


export const setOpenOrdersListInfo = (openOrdersList) =>{
    store.dispatch({
        type: actionTypes.SET_OPEN_ORDERS_LIST_INFO,
        payload:{
            openOrdersList
        }
    })
}


export const setTour360Photo = (photo) =>{
    store.dispatch({
        type: actionTypes.SET_TOUR360_PHOTO,
        payload:{
            photo
        }
    })
}

export const setFoodListConverted = (foodListConverted) =>{
    store.dispatch({
        type: actionTypes.SET_FOOD_LIST_CONVERTED,
        payload:{
            foodListConverted
        }
    })
}


export const setTempOpenOrderInfo = (orderInfo) =>{
    store.dispatch({
        type: actionTypes.SET_TEMP_OPEN_ORDER_INFO,
        payload:{
            orderInfo
        }
    })
}

export const setTempHistoryOrderInfo = (orderInfo) =>{
    store.dispatch({
        type: actionTypes.SET_TEMP_HISTORY_ORDER_INFO,
        payload:{
            orderInfo
        }
    })
}