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
import Tour360 from "./Components/Tour360page/Tour360";


import {getCacheToken, getCachePhone} from "./stores/cache/cacheData"
import * as actions from "./stores/reduxStore/actions"
import * as requests from "./ApiRequests/ApiRequests";
import Banner from "./Components/Banner/Banner";
import isResOpen from "./functions/isResOpen";




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
    const cacheToken = getCacheToken()
    const cachePhone = getCachePhone()
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
      {useSelector(state=>state.rTempData.isResOpen) ?
          null
          :
          <Banner color={'#d62828'} closable={false} text={'رستوران تعطیل است'}/>
      }

      <BrowserRouter>
        <Route exact path='/' component={SplashScreen}/>
        <Route path={['/main', '/category', '/bill', '/profile', '/eachOrderHistoryDetails', '/login', '/dongi', '/openOrders', '/eachOpenOrderDetails','/likedFoods', "/payway", '/vrTour']} component={BottomNavBar}/>
        <Route path='/main' component={WelcomePage}/>
        <Route exact path='/category/:part' component={CategoryPage}/>
        <Route exact path='/category/:part/:category' component={FoodListPage}/>
        <Route path='/bill' component={BillPage}/>
        <Route path='/profile/:part' component={ProfilePage}/>
        <Route path='/eachOrderHistoryDetails' component={EachOrderHistoryDetails}/>
        <Route path='/login' component={LoginVCode}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/payway' component={PayWay}/>
        <Route path='/dongi' component={DongiPage}/>
        <Route path='/openOrders' component={OpenOrders}/>
        <Route path='/eachOpenOrderDetails' component={EachOpenOrderDetails}/>
        <Route path='/likedFoods' component={LikedFoods}/>
        <Route path='/vrTour' component={Tour360}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
