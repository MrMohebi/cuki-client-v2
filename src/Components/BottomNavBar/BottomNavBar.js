import React from "react";
import {FaBeer} from 'react-icons/fa'
import './css/style.css'
class BottomNavBar extends React.Component{
    render() {
        return(
            <div className='bottomNavBarMain'>
                <h3> Lets go for a <FaBeer />? </h3>
            </div>
        )
    }
}
export default BottomNavBar;