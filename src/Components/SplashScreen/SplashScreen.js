import React, {useEffect} from "react";
import './css/style.css';
import * as requests from '../../ApiRequests/ApiRequests'
import getComName from "../../functions/getComName";
import * as actions from "../../stores/reduxStore/actions";
import foodsListAdaptor from "../../functions/foodsListAdaptor";
import {useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

function SplashScreen() {
    let history = useHistory();

    useEffect(() => {
        if (getComName().length > 2) {
            requests.getRestaurantFoods((res)=>{
                if(res?.statusCode === 200){
                    actions.setFoodListConverted(foodsListAdaptor(res.data))
                    actions.setFoods(res.data)
                }
            })
            requests.getRestaurantInfo((res)=>{
                if(res?.statusCode === 200){
                    actions.setResInfo(res.data)
                }
            })
        }
    }, [])

    useSelector(state => {
        if(state.rRestaurantInfo.foodListConverted.hasOwnProperty("parts")){
            history.push("/main")
        }
    })

    return (
        <div className='mainSplashScreen'>
            <div className='d-flex h-100 justify-content-center'>
                <div className='splashScreenImage' style={{
                    background: 'url(./img/SplashScreen/splashicon.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}/>
            </div>
        </div>
    )
}

export default SplashScreen




