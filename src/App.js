import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import 'bootstrap/dist/css/bootstrap.min.css'
import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import './index.css'
import CategoryPage from "./Components/CategoryPage/Category";
import FoodListPage from "./Components/FoodListPage/FoodListPage";
import BillPage from "./Components/BillPage/BillPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import EachOrderHistory from "./Components/EachOrderDetails/EachOrderHistory";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route exact path='/' component={SplashScreen}/>
        <Route path={['/category','/t','/foodList','/oh']} component={BottomNavBar}/>
        <Route path='/t' component={WelcomePage}/>
        <Route path='/category/:part' component={CategoryPage}/>
        <Route path='/foodList/:part/:category' component={FoodListPage}/>
        <Route path='/b' component={BillPage}/>
        <Route path='/p' component={ProfilePage}/>
        <Route path='/oh' component={EachOrderHistory}/>

      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
