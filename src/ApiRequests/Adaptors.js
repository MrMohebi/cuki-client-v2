// *******************************************
// *                 CONVERT                 *
// *             api.cuki.ir/v201            *
// *                   TO                    *
// *             api.cukim.ir/v1             *
// *******************************************



export function getCustomerInfoTOGetCustomerInfo(data){
    let newOrderList = camelToUnderArrayOrObj(data["orderList"])
    for (let i =0; i< newOrderList.length ;i++){
        newOrderList[i]["order_list"] = newOrderList[i]["items"]
        newOrderList[i]["order_table"] = newOrderList[i]["table"]
        newOrderList[i]["ordered_date"] = newOrderList[i]["created_at"]
    }
    data["orderList"] =  newOrderList;
    return data
}

export function getOrderByTrackingIdTOGetOrderByTrackingId(data){
    let newData = camelToUnderArrayOrObj(data)
    for (let i =0; i< newData.length ;i++){
        newData[i]["order_list"] = newData[i]["items"]
        newData[i]["customer_phone"] = newData[i]["user_phone"]
        newData[i]["order_table"] = newData[i]["table"]
        newData[i]["ordered_date"] = newData[i]["created_at"]
    }
    return newData

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

