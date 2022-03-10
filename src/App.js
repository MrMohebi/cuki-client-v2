import React, {useEffect} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {useSelector} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import CukiCode from "./Components/CukiCode/CukiCode";
import ResDetails from "./Components/ResDetails/ResDetails";
import * as actions from "./stores/reduxStore/actions"
import * as requests from "./ApiRequests/ApiRequests";
import * as ls from "./stores/localStorage/localStorage"
import isResOpen from "./functions/isResOpen";
import getComName, {getFullName} from "./functions/getComName";
import updateResInfo from "./functions/updateResInfo";


function App() {
    useEffect(() => {
        if (getComName().length > 2) {
            requests.getRestaurantUpdateDates((res) => {
                if (res.hasOwnProperty("statusCode") && res.statusCode === 200)
                    updateResInfo(res.data)
            })
        }
    }, [])


    // *****action for cached data*******
    let getOpenOrders = (token) => {
        requests.getOpenOrders(callbackOpenOrders, token);
    }
    let callbackOpenOrders = (res) => {
        if (res.hasOwnProperty("statusCode") && res.statusCode === 200) {
            actions.setOpenOrdersListInfo(res.data)
        }
    }

    useSelector((state) => {
        const cacheToken = ls.getLSToken()
        const cachePhone = ls.getLSPhone()
        if (state.rUserInfo.token !== cacheToken && cacheToken !== undefined && cacheToken.length > 10) {
            actions.userSetToken(cacheToken);
            if (getComName().length > 2) {
                getOpenOrders(cacheToken)
            }
        }
        if (state.rUserInfo.phone !== cachePhone && cachePhone !== undefined && cachePhone.length === 11) {
            actions.userSetPhone(cachePhone)
        }
    })

    // ********** check res is open or close **********
    useSelector(state => {
        let openTime = ls.getLSResInfo()["openTime"]
        if (typeof openTime !== "undefined") {
            openTime = JSON.parse(openTime)
            let resStatus = isResOpen(openTime)
            if (resStatus !== state.rTempData.isResOpen) {
                actions.setIsResOpen(resStatus)
            }
        }
    })

    return (
        <React.Fragment>
            <BrowserRouter basename={getFullName()}>
                <Route exact path='/' component={getComName() === "" ? CukiCode : SplashScreen}/>
                <Route path='/main' component={WelcomePage}/>
                <Route path='/resDetails' component={ResDetails}/>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
