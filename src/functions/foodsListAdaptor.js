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
        appetizer: {
            persianName:"",
            englishName:"",
            logo:"",
            status:"",
            rank:"",
            averageColor:"",
            foodList:[{name:"", price:""}, {name:"", price:""}, ]},
        burger: {
            persianName:"",
            englishName:"",
            logo:"",
            status:"",
            rank:"",
            averageColor:"",
            foodList:[{name:"", price:""}, ]},
    },
    coffeeshop:{
        hotDrink:{
            persianName:"",
            englishName:"",
            logo:"",
            status:"",
            rank:"",
            averageColor:"",
            foodList:[{name:"", price:""}, ]},
        cake:{
            persianName:"",
            englishName:"",
            logo:"",
            status:"",
            rank:"",
            averageColor:"",
            foodList:[{name:"", price:""}, ]},
    }
}

// ************************************************************
// ************************************************************
// *******************      main  part       ******************
// ************************************************************
// ************************************************************




export default function foodsListAdaptor (apiFoodsList){
    let final = {
        parts:[],
        partsCategories:{},
    }
    apiFoodsList.map(eFood=>{
        if(final.parts.indexOf(eFood.group.type) === -1){
            // init new food kind
            final.parts.push(eFood.group.type);
            final.partsCategories[eFood.group.type] = []
            final[eFood.group.type] = {};
        }

        if(final.partsCategories[eFood.group.type].indexOf(eFood.group.englishName) === -1){
            // init new food group
            final.partsCategories[eFood.group.type].push(eFood.group.englishName);
            final[eFood.group.type][eFood.group.englishName] = {
                persianName:eFood.group.persianName,
                englishName:eFood.group.englishName,
                logo:eFood.group.logo,
                status:eFood.group.status,
                rank:eFood.group.rank,
                averageColor:eFood.group.averageColor,
                foodList:[],
            }
        }
        // add food
        final[eFood.group.type][eFood.group.englishName].foodList.push(eFood)
    })
    return final;
}


























