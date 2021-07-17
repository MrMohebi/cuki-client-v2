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
    for (const eFood of foodList) {
        if(eFood !== null){
            console.log("food update", foodsUpdates)
            if(foodsUpdates.hasOwnProperty(eFood.id)){
                if(foodsUpdates[eFood.id][0] !== eFood["updatedAt"]){
                    foodsNeedToBeUpdate.push(eFood.id)
                }
                eFood["orderTimes"] = foodsUpdates[eFood.id][1];
                newFoodList[eFood.id] = eFood;
            }
        }
    }
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