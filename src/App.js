import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import 'bootstrap'
import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route exact path='/' component={SplashScreen}/>
        <Route path='/t' component={BottomNavBar}/>
        <Route path='/tt' component={BottomNavBar}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
