import React from "react";
import {AiOutlineHome, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser} from 'react-icons/ai'
import './css/style.css'
class BottomNavBar extends React.Component{
    render() {
        return(
            <div className='bottomNavBarMain'>
                <AiOutlineHome size={50} />
                <AiOutlineShoppingCart size={50}/>
                <AiOutlineHeart size={50} />
                <AiOutlineUser size={50} />

            </div>
        )
    }
}
export default BottomNavBar;