export const __init__RestaurantInfo = {
    englishName:"cuki",
    foods: [],
    assets: [],
    comments: [],
    allTableList: [],
    restaurantInfo: [],
    reservedTableList: [],
    foodListConverted:{},
}

export const __init__UserInfo = {
    token: "",
    phone: "",
    name: "",
    birthday: "",
    job: "",
    totalBoughtAll: 0,
    lastLogin: "",
    availableOffCodes: [],
    userOffCodeHistory: {},
    favoritePlaces: [],
    rankRestaurant: "",
    scoreRestaurant: 0,
    orderTimesRestaurant: 0,
    totalBoughtRestaurant: 0,
    orderListRestaurant: [],
    lastOrderRestaurant :"",
    moreOrderedFoods:[]
}

export const __init__FrontStates = {
    missingUserInfo: false,
    sentVCode: false,
    tour360Photo:"",
}


export const __init__TempData = {
    orderList: [],
    trackingId: 0,
    openOrdersTrackingId : [],
    openOrdersInfo:{},  // {"trackingId1": {"orderList": [], "orderTime": 0, ""}, "trackingId2":{} , ...}
}
















