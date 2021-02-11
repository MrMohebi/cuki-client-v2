import React, {useState} from "react";
import './css/style.css';
import * as requests from '../../ApiRequests/ApiRequests'
import foodsListAdaptor from "../../functions/foodsListAdaptor";
import {connect} from 'react-redux';
import * as actions from '../../stores/reduxStore/actions';
import {Snackbar} from "@material-ui/core"



class SplashScreen extends React.Component{
    componentDidMount() {
        this.getData();
    }

    state = {
        openSnackbar: false,
        snackbarMessage:"فکر کنم اینترنتت قطعه :(",
    }

    setOpenSnackbar = (status) =>{
        this.setState({
            openSnackbar:status
        })
    }

    goMainPage = (response) =>{

        if(response.hasOwnProperty('statusCode') && response.statusCode === 200){
            this.props.history.push("/main");
            this.props.setFoodListConverted(foodsListAdaptor(response.data.foods))
        }else{
            this.setOpenSnackbar(true)
        }
    }

    getData = () =>{
        requests.getRestaurantInfo(this.goMainPage);
    }

    render() {
        return(
            <div className='mainSplashScreen'>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.openSnackbar}
                    message={this.state.snackbarMessage}
                />
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




