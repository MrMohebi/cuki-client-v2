import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {useSelector} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import CukiCode from "./Components/CukiCode/CukiCode";
import * as actions from "./stores/reduxStore/actions"
import isResOpen from "./functions/isResOpen";
import getComName, {getFullName} from "./functions/getComName";


function App() {

    // ********** check res is open or close **********
    useSelector(state => {
        let openTime = state.rRestaurantInfo["openTime"]
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
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
