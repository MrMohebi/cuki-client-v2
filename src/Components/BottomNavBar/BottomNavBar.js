import React from "react";
import './css/style.css'
import { BsHeart,BsHeartFill,BsHouse,BsHouseFill,BsPerson,BsFillPersonFill,BsClockHistory } from "react-icons/bs";
import { IoCartOutline,IoCart } from "react-icons/io5";
class BottomNavBar extends React.Component{




    iconSize = 20;
    render() {
        return(
            <div className='bottomNavBarMain'>
                {window.location.pathname === "/t"?<IoCartOutline style={{fontSize:this.iconSize}}/>:<IoCart style={{fontSize:this.iconSize}}/>}
                {window.location.pathname === "/t"?<BsClockHistory style={{fontSize:this.iconSize}}/>:null}
                {window.location.pathname === "/t"?<BsHouse style={{fontSize:this.iconSize}}/>:<BsHouseFill style={{fontSize:this.iconSize}}/>}
                {window.location.pathname === "/t"?<BsHeart style={{fontSize:this.iconSize}}/>:<BsHeartFill style={{fontSize:this.iconSize}}/>}
                {window.location.pathname === "/t"?<BsPerson style={{fontSize:this.iconSize}}/>:<BsFillPersonFill style={{fontSize:this.iconSize}}/>}
            </div>
        )
    }
}
export default BottomNavBar;
