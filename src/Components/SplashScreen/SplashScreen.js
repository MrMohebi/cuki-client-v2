import React from "react";
import './css/style.css';
import * as requests from '../../ApiRequests/ApiRequests'
import foodsListAdaptor from "../../functions/foodsListAdaptor";

class SplashScreen extends React.Component{
    componentDidMount() {
        this.getData();
    }

    goMainPage = (response) =>{

        if(response.hasOwnProperty('statusCode') && response.statusCode === 200){
            //this.props.history.push("/main");
            console.log("converted:");
            console.log(foodsListAdaptor(response.data.foods));
            console.log(response)

        }
    }

    getData = () =>{
        requests.getRestaurantInfo(this.goMainPage);
    }

    render() {
        return(
            <div className='mainSplashScreen'>
                <div className='d-flex h-100 justify-content-center'>
                    <div className='splashScreenImage' style={{background:'url(./img/SplashScreen/splashicon.png)',backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}/>
                </div>
            </div>
        )
    }
}

export default SplashScreen;