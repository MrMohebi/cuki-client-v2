import React from "react";
import './css/style.css'
import { BsHeart,BsHeartFill,BsHouse,BsHouseFill,BsPerson,BsFillPersonFill,BsClockHistory } from "react-icons/bs";
import { IoCartOutline,IoCart } from "react-icons/io5";
import {NavLink} from "react-router-dom";
import 'animate.css/animate.css'
import cartOut from '../../assets/img/navBar/cartHisOut.png'
import {IconButton} from '@material-ui/core';





class BottomNavBar extends React.Component{
    state = {
        iconSize:20,

    }
    x = `../../assets/img/navBar`


    render() {
        return(
            <div className='bottomNavBarMain'>
                <NavLink className='navLinkBottomNav' to={"/t"} activeClassName="animate__animated animate__pulse" >

                        {window.location.pathname === "/t" ?
                            <IconButton className='BottomNavigationIcons'  style={{width:'50px',height:'50px',background:`url(${cartOut})`}}/>
                        :
                            <IconButton className='BottomNavigationIcons'  style={{width:'50px',height:'50px',background:`url(./img/navBar/cartHisOut.png)`}}/>

                        }
                </NavLink>



                {/*{window.location.pathname === "/t"?<IoCartOutline style={{fontSize:this.iconSize}}/>:<IoCart style={{fontSize:this.iconSize}}/>}*/}
                {/*{window.location.pathname === "/t"?<BsClockHistory style={{fontSize:this.iconSize}}/>:null}*/}
                {/*{window.location.pathname === "/t"?<BsHouse style={{fontSize:this.iconSize}}/>:<BsHouseFill style={{fontSize:this.iconSize}}/>}*/}
                {/*{window.location.pathname === "/t"?<BsHeart style={{fontSize:this.iconSize}}/>:<BsHeartFill style={{fontSize:this.iconSize}}/>}*/}
                {/*{window.location.pathname === "/t"?<BsPerson style={{fontSize:this.iconSize}}/>:<BsFillPersonFill style={{fontSize:this.iconSize}}/>}*/}
            </div>
        )
    }
}
export default BottomNavBar;
