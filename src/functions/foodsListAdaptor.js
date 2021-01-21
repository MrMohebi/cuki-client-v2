// this function will convert foods array response from api to below format :

const apiFoodsArraySample = [
    {
        delivery_time: "2",
        details: "['گوجه خیارشور']",
        discount: "0",
        foods_id: "51",
        group: "burger",
        model3d: null,
        modified_date: "1605626743",
        name: "اسپشیال شیلان",
        order_times: "0",
        photos: null,
        price: "5000",
        status: "in stock",
        thumbnail: "LINK"
    },{
        AndGoesOn:"..."
    }
]
const convertedInfoSample = {
    parts:[
        "notRecognized",
        "restaurant",
        "coffeeshop",
        "..."
    ],
    partsCategories:{
        notRecognized:['appetizer', 'burger', "..."],
        restaurant:['hotDrink', 'cake', "..."],
        coffeeshop:["..."],
        "otherParts":["..."]
    },
    restaurant:{
        appetizer: {persianName:"", foodList:[{name:"", price:""}, {name:"", price:""}, ]},
        burger: {persianName:"", foodList:[{name:"", price:""}, ]},
    },
    coffeeshop:{
        hotDrink:{persianName:"", foodList:[{name:"", price:""}, ]},
        cake:{persianName:"", foodList:[{name:"", price:""}, ]},
    }
}

// ************************************************************
// ************************************************************
// *******************      main  part       ******************
// ************************************************************
// ************************************************************

const restaurantPersianGroups = {
    appetizer:'پیش غذا',
    burger: 'برگر',
    pizza: 'پیتزا' ,
    panini:'پنینی' ,
    main:'غذای اصلی',
    irani: 'ایرانی' ,
    dessert:'دسر' ,
    pasta: 'پاستا',
    drink:"نوشیدنی"
};
const coffeeshopPersianGroups = {
    mohito:"موهیتو",
    hotDrink:"نوشیدنی های گرم",
    cake:"کیک",
    brewed:"دم کرده",
    shake:'شیک'
}


const persianGroups = {
    coffeeshopPersianGroups: {
            mohito:"موهیتو",
            hotDrink:"نوشیدنی های گرم",
            cake:"کیک",
            brewed:"دم کرده",
            shake:'شیک'
        },
    restaurantPersianGroups:{
        appetizer:'پیش غذا',
        burger: 'برگر',
        pizza: 'پیتزا' ,
        panini:'پنینی' ,
        main:'غذای اصلی',
        irani: 'ایرانی' ,
        dessert:'دسر' ,
        pasta: 'پاستا',
        drink:"نوشیدنی"
    }
}


export default function foodsListAdaptor (apiFoodsList, persianNames){

}














