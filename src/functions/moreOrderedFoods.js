export default function moreOrderedFoods(userHistoryOrders, allFoodsArray) {
    let foodsNumberLimit = 8

    let allOrderedFoodTimes = {}
    let draftUserHistoryOrders = [...userHistoryOrders]
    let draftAllFoodsArray = [...Object.values(allFoodsArray)]
    draftUserHistoryOrders.map(eachOrder=>{
        return JSON.parse(eachOrder['order_list']).map(eachFood=>{
            if(allOrderedFoodTimes[eachFood.id]){
                allOrderedFoodTimes[eachFood.id] += eachFood.number
            }else {
                allOrderedFoodTimes[eachFood.id] = eachFood.number
            }
            return null
        })
    })

    let sevenMoreOrdered = Object.keys(allOrderedFoodTimes).sort(function (a, b) {return allOrderedFoodTimes[a] - allOrderedFoodTimes[b]}).reverse()
        .map(eachFoodId=>{
            let foodInFoodsList = draftAllFoodsArray.filter(eachAllFoodId=> parseInt(eachFoodId) === parseInt(eachAllFoodId.id))[0]
            if(foodInFoodsList)
                return foodInFoodsList['id']
            else
                return undefined

    }).filter(eachFoodId=> eachFoodId > 0).slice(0,foodsNumberLimit);

    if(sevenMoreOrdered.length >= foodsNumberLimit){
        return sevenMoreOrdered;
    }else {
        return [...new Set(sevenMoreOrdered.concat(moreOrderedFoodRestaurant(draftAllFoodsArray)).slice(0,foodsNumberLimit))]
    }
}


function moreOrderedFoodRestaurant(allFoodsArray) {
    return allFoodsArray.filter(eachFood=> eachFood !== null ).sort((a,b) => {return b["orderTimes"] - a["orderTimes"]}).filter(eachFood=> eachFood.group.englishName !== "drink" ).slice(0,10).map((eachFood=>{return eachFood.id}))
}


export function convertFoodIdToFoodInfo (foodsIdList, foodsList){
    let result = [];
    foodsList.map(eFood=>{
        foodsIdList.map(eFoodId=>{
            if(eFoodId === eFood.id)
                result.push(eFood)
            return null
        })
        return null
    })
    return result
}