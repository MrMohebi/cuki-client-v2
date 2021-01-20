import React from "react";
import {AiOutlineHome,AiOutlineShoppingCart} from 'react-icons/ai'
import './css/style.css'
class BottomNavBar extends React.Component{
    render() {
        return(
            <div className='bottomNavBarMain'>
                <AiOutlineHome size='50px' />
                <AiOutlineShoppingCart size='50px' />

            </div>
        )
    }
}
export default BottomNavBar;