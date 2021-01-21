import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import 'bootstrap'
import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";
import WelcomePage from "./Components/WelcomePage/WelcomePage";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route exact path='/' component={SplashScreen}/>
        <Route path='/t' component={BottomNavBar}/>
        <Route path='/t' component={WelcomePage}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
