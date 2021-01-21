import React from "react";
import './css/style.css';
import * as requests from '../../ApiRequests/ApiRequests'

class SplashScreen extends React.Component{
    componentDidMount() {
        this.getData();
    }

    goMainPage = (response) =>{

        if(response.hasOwnProperty('statusCode') && response.statusCode === 200){
            //this.props.history.push("/main");
            console.log("data was fetch and saved in redux")
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
                    <div className='splashScreenImage'/>
                </div>
            </div>
        )
    }
}

export default SplashScreen;