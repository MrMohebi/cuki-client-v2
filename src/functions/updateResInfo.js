import * as ls from "../stores/localStorage/localStorage"
import * as requests from "../ApiRequests/ApiRequests";

export default function updateResInfo (resDates){
    updateFoods(resDates.foods)
    updateInfo(resDates.restaurantInfo)
}

function updateFoods(foodsUpdates){
    let foodList = ls.getLSResFoods();
    let newFoodList = []
    let foodsNeedToBeUpdate = []
    for (const eFoodUpdateId in foodsUpdates) {
        if(!foodList.hasOwnProperty(eFoodUpdateId)){
            foodsNeedToBeUpdate.push(eFoodUpdateId)
            continue
        }
        if(foodsUpdates.hasOwnProperty(foodList[eFoodUpdateId].id)){
            if(foodsUpdates[foodList[eFoodUpdateId].id][0] !== foodList[eFoodUpdateId]["updatedAt"]){
                foodsNeedToBeUpdate.push(foodList[eFoodUpdateId].id)
            }
            foodList[eFoodUpdateId]["orderTimes"] = foodsUpdates[foodList[eFoodUpdateId].id][1];
            newFoodList[foodList[eFoodUpdateId].id] = foodList[eFoodUpdateId];
        }
    }
    // for (const eFood of foodList) {
    //     if(eFood !== null){
    //         if(foodsUpdates.hasOwnProperty(eFood.id)){
    //             if(foodsUpdates[eFood.id][0] !== eFood["updatedAt"]){
    //                 foodsNeedToBeUpdate.push(eFood.id)
    //             }
    //             eFood["orderTimes"] = foodsUpdates[eFood.id][1];
    //             newFoodList[eFood.id] = eFood;
    //         }
    //     }
    // }
    console.log(foodsNeedToBeUpdate);
    if(foodsNeedToBeUpdate.length > 0){
        let newFoodsInfoResponse = requests.getFoodById(foodsNeedToBeUpdate)
        if(newFoodsInfoResponse.hasOwnProperty("statusCode") && newFoodsInfoResponse.statusCode === 200){
            newFoodsInfoResponse.data.map(eNewFood=>(
                newFoodList[eNewFood.id] = eNewFood
            ))
        }
    }
    ls.setLSResFoods(newFoodList);
}

function updateInfo(infoUpdateDate){
    let resInfo = ls.getLSResInfo();
    if(infoUpdateDate !== resInfo['updatedAt']){
        requests.getRestaurantInfo((res)=>{
            if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
                ls.setLSResInfo(res.data)
            }
        })
    }
}