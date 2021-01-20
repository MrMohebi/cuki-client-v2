import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import 'bootstrap'


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path='/' component={SplashScreen}/>


      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
