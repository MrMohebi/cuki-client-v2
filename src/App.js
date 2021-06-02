import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import {useSelector} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import CategoryPage from "./Components/CategoryPage/Category";
import FoodListPage from "./Components/FoodListPage/FoodListPage";
import BillPage from "./Components/BillPage/BillPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import LoginVCode from "./Components/LoginVcode/LoginVCode";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import PayWay from "./Components/PayWay/PayWay";
import DongiPage from "./Components/DongiPage/DongiPage";
import OpenOrders from "./Components/OpenOrdersPage/OpenOrders";
import EachOpenOrderDetails from "./Components/EachOpenOrderDetails/EachOpenOrderDetails";
import EachOrderHistoryDetails from "./Components/EachOrderHistoryDetails/EachOrderHistoryDetails";
import LikedFoods from "./Components/LikedFoodsPage/LikedFoods";
import CukiCode from "./Components/CukiCode/CukiCode";
import ResDetails from "./Components/ResDetails/ResDetails";


import {getLSPhone, getLSToken} from "./stores/localStorage/localStorage";
import * as actions from "./stores/reduxStore/actions"
import * as requests from "./ApiRequests/ApiRequests";
import Banner from "./Components/Banner/Banner";
import isResOpen from "./functions/isResOpen";
import getComName, {getFullName} from "./functions/getComName";


function App() {
  // *****action for cached data*******
  let getOpenOrders=(token)=>{
    requests.getOpenOrders(callbackOpenOrders, token);
  }
  let callbackOpenOrders = (res) =>{
    if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
      actions.setOpenOrdersListInfo(res.data)
    }
  }

  useSelector((state)=>{
    const cacheToken = getLSToken()
    const cachePhone = getLSPhone()
    if(state.rUserInfo.token !== cacheToken && cacheToken !== undefined && cacheToken.length > 10){
      actions.userSetToken(cacheToken);
      getOpenOrders(cacheToken)
    }
    if(state.rUserInfo.phone !== cachePhone && cachePhone !== undefined && cachePhone.length === 11){
      actions.userSetPhone(cachePhone)
    }
  })

  // ********** check res is open or close **********
  useSelector(state=>{
    if(typeof state.rRestaurantInfo.restaurantInfo['open_time'] !== "undefined" && state.rRestaurantInfo.restaurantInfo['open_time'].length > 3){
      let resStatus = isResOpen(JSON.parse(state.rRestaurantInfo.restaurantInfo['open_time']))
      if(resStatus !== state.rTempData.isResOpen){
        actions.setIsResOpen(resStatus)
      }
    }
  })

  return (
    <React.Fragment>

      <BrowserRouter basename={getFullName()}>
        <Route exact path='/'  component={ getComName() === "notSet" ?  CukiCode : SplashScreen}/>
        <Route path={['/main','/resDetails', '/category', '/bill', '/profile', '/eachOrderHistoryDetails', '/login', '/dongi', '/openOrders', '/eachOpenOrderDetails','/likedFoods', "/payway"]} component={BottomNavBar}/>

        {/* is res open banner*/}
        {useSelector(state=>(
            state.rTempData.isResOpen && ((state.rRestaurantInfo.restaurantInfo.status === "active") || (state.rRestaurantInfo.restaurantInfo.status === "open"))  ?
                null
                :
                window.location.pathname === "/" ?
                    null
                    :
                    <Banner color={'#d43737'} closable={false} text={'رستوران تعطیل است'}/>
          ))}

        <Route path='/main' component={WelcomePage}/>
        <Route exact path='/category/:part' component={CategoryPage}/>
        <Route exact path='/category/:part/:category' component={FoodListPage}/>
        <Route path='/bill' component={BillPage}/>
        <Route path='/profile/:part' component={ProfilePage}/>
        <Route path='/resDetails' component={ResDetails}/>
        <Route path='/eachOrderHistoryDetails' component={EachOrderHistoryDetails}/>
        <Route path='/login' component={LoginVCode}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/payway' component={PayWay}/>
        <Route path='/dongi' component={DongiPage}/>
        <Route path='/openOrders' component={OpenOrders}/>
        <Route path='/eachOpenOrderDetails' component={EachOpenOrderDetails}/>
        <Route path='/likedFoods' component={LikedFoods}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
