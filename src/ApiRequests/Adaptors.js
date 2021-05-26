// *******************************************
// *                 CONVERT                 *
// *             api.cuki.ir/v201            *
// *                   TO                    *
// *             api.cukim.ir/v1             *
// *******************************************



function getAllRestaurantDataTOGetResData(data){
    let newFoods = camelToUnderArrayOrObj(data["foods"])
    let newResInfo = camelToUnderArrayOrObj(data["restaurantInfo"])

    newFoods["foods_id"] = newFoods["id"]
    newResInfo["info_id"] = newResInfo["id"]
    return {foods :newFoods, restaurantInfo:newResInfo}
}


















function camelToUnderscore(key) {
    return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

function camelToUnderArrayOrObj(originalArray) {
    if(Array.isArray(originalArray)){
        return originalArray.map(eOObj=>{
            let newObj = {};
            for(let camel in eOObj) {
                if(eOObj.hasOwnProperty(camel))
                    newObj[camelToUnderscore(camel)] = eOObj[camel];
            }
            return newObj;
        })
    }
    let newObj = {};
    for(let camel in originalArray) {
        if(originalArray.hasOwnProperty(camel))
            newObj[camelToUnderscore(camel)] = originalArray[camel];
    }
    return newObj;
}

