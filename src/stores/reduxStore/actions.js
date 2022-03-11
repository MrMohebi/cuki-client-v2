import * as actionTypes from './actionTypes'
import {store} from './store'


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


export const deleteFoodFromOrders = id => (
    store.dispatch({
        type: actionTypes.DELETE_FOOD_FROM_ORDERS,
        payload:{
            id
        }
    })
)


export const increaseFoodNumber = id => (
    store.dispatch({
        type: actionTypes.INCREASE_FOOD_NUMBER,
        payload:{
            id
        }
    })
)


export const decreaseFoodNumber = id => (
    store.dispatch({
        type: actionTypes.DECREASE_FOOD_NUMBER,
        payload:{
            id
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


export const setTrackingId = (trackingId) =>{
    store.dispatch({
        type: actionTypes.SET_TRACKING_ID,
        payload:{
            trackingId
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


export const setFoods = (foodList) =>{
    store.dispatch({
        type: actionTypes.SET_RES_FOODS,
        payload:{
            foodList
        }
    })
}

export const setResInfo = (resInfo) =>{
    store.dispatch({
        type: actionTypes.SET_RES_INFO,
        payload:{
            resInfo
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

export const setTableScanned = (table) =>{
    store.dispatch({
        type: actionTypes.SET_TABLE_SCANNED,
        payload:{
            table
        }
    })
}


export const setTempPhone = (phone) =>{
    store.dispatch({
        type: actionTypes.SET_TEMP_PHONE,
        payload:{
            phone
        }
    })
}

export const setIsResOpen = (isResOpen) =>{
    store.dispatch({
        type: actionTypes.SET_IS_RES_OPEN,
        payload:{
            isResOpen
        }
    })
}

export const addClosedBanner = (bannerName) =>{
    store.dispatch({
        type: actionTypes.ADD_CLOSED_BANNER,
        payload:{
            bannerName
        }
    })
}

export const removeClosedBanner = (bannerName) =>{
    store.dispatch({
        type: actionTypes.REMOVE_CLOSED_BANNER,
        payload:{
            bannerName
        }
    })
}
