export default function moreOrderedFoods(userHistoryOrders, allFoodsArray) {
    let foodsNumberLimit = 8

    let allOrderedFoodTimes = {}
    let draftUserHistoryOrders = [...userHistoryOrders]
    let draftAllFoodsArray = [...allFoodsArray]
    draftUserHistoryOrders.map(eachOrder=>{
        JSON.parse(eachOrder['order_list']).map(eachFood=>{
            if(allOrderedFoodTimes[eachFood.id]){
                allOrderedFoodTimes[eachFood.id] += eachFood.number
            }else {
                allOrderedFoodTimes[eachFood.id] = eachFood.number
            }
        })
    })

    let sevenMoreOrdered = Object.keys(allOrderedFoodTimes).sort(function (a, b) {return allOrderedFoodTimes[a] - allOrderedFoodTimes[b]}).reverse()
        .map(eachFoodId=>{
            let foodInFoodsList = draftAllFoodsArray.filter(eachAllFoodId=> parseInt(eachFoodId) === parseInt(eachAllFoodId.foods_id))[0]
            if(foodInFoodsList)
                return foodInFoodsList['foods_id']
            else
                return undefined

    }).filter(eachFoodId=> eachFoodId > 0).slice(0,foodsNumberLimit);


    if(sevenMoreOrdered.length >= foodsNumberLimit){
        return sevenMoreOrdered;
    }else {
        return sevenMoreOrdered.concat(moreOrderedFoodRestaurant(draftAllFoodsArray)).slice(0,foodsNumberLimit)
    }
}


function moreOrderedFoodRestaurant(allFoodsArray) {
    return allFoodsArray.sort((a,b) => {return b.order_times - a.order_times}).filter(eachFood=> eachFood.group.englishName !== "drink" ).slice(0,10).map((eachFood=>{return eachFood.foods_id}))
}