import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import CategoryPage from "./Components/CategoryPage/Category";
import FoodListPage from "./Components/FoodListPage/FoodListPage";
import BillPage from "./Components/BillPage/BillPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import EachOrderHistory from "./Components/EachOrderDetails/EachOrderHistory";
import LoginVCode from "./Components/LoginVcode/LoginVCode";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import PayWay from "./Components/PayWay/PayWay";
import DongiPage from "./Components/DongiPage/DongiPage";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route exact path='/' component={SplashScreen}/>
        <Route path={['/category','/main','/profile','/login','/sign','/bill']} component={BottomNavBar}/>
        <Route path='/main' component={WelcomePage}/>
        <Route exact path='/category/:part' component={CategoryPage}/>
        <Route exact path='/category/:part/:category' component={FoodListPage}/>
        <Route path='/bill' component={BillPage}/>
        <Route path='/profile/:part' component={ProfilePage}/>
        <Route path='/orderhistory' component={EachOrderHistory}/>
        <Route path='/login' component={LoginVCode}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/payway' component={PayWay}/>
        <Route path='/dongi' component={DongiPage}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
