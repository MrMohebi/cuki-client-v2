import React from "react";
import './css/style.css';
import * as requests from '../../ApiRequests/ApiRequests'
import foodsListAdaptor from "../../functions/foodsListAdaptor";
import {connect} from 'react-redux';
import * as actions from '../../stores/reduxStore/actions';


class SplashScreen extends React.Component{
    componentDidMount() {
        this.getData();
    }

    goMainPage = (response) =>{

        if(response.hasOwnProperty('statusCode') && response.statusCode === 200){
            this.props.history.push("/t");

            this.props.setFoodListConverted(foodsListAdaptor(response.data.foods))
            setTimeout(()=>{
                console.log(this.props.foodListConverted)
            },1000)
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

const mapStateToProps = (store) => {
    return {
        foodListConverted:store.rRestaurantInfo.foodListConverted
    }
}

const mapDispatchToProps = () => {
    return {
        setFoodListConverted:actions.setFoodListConverted
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);




