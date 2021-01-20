import React from "react";
import './css/style.css';
import * as requests from '../../ApiRequests/ApiRequests'
import BottomNavBar from "../BottomNavBar/BottomNavBar";

class SplashScreen extends React.Component{

    goMainPage = (response) =>{
        if(response.statusCode === 200){
            this.props.history.push("/main");
        }
    }

    getData = () =>{
        requests.getRestaurantInfo(this.goMainPage());
    }



    render() {
        return(
            <div className='mainSplashScreen'>
                <div className='d-flex h-100 justify-content-center'>
                    <div className='splashScreenImage'/>
                </div>
            </div>
        )
    }
}

export default SplashScreen;