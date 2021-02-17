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


import {getCacheToken} from "./stores/cache/cacheData"
import * as actions from "./stores/reduxStore/actions"


function App() {
  useSelector((state)=>{
    const cacheToken = getCacheToken()
    if(state.rUserInfo.token !== cacheToken && cacheToken !== undefined && cacheToken.length > 10)
      actions.userSetToken(cacheToken);
  })

  return (
    <React.Fragment>
      <BrowserRouter>
        <Route exact path='/' component={SplashScreen}/>
        <Route path={['/main', '/category', '/bill', '/profile', '/eachOrderHistoryDetails', '/login', '/dongi', '/openOrders', '/eachOpenOrderDetails','/likedFoods', "/payway"]} component={BottomNavBar}/>
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
